/**
 * POST /api/checkout — crea la sesión de pago.
 *
 * Contrato:
 *   { delivery: 'pickup' | 'montreal' | 'rest', lang?: 'es'|'en'|'fr', quantity?: 1..5 }
 *   → 200 { url }            URL de Stripe Checkout
 *   → 400 { error }          parámetros inválidos
 *   → 503 { error }          servidor sin STRIPE_SECRET_KEY
 *
 * El importe **se recalcula aquí** (`quote`), nunca se acepta del cliente.
 */
import { randomUUID } from 'node:crypto'
import Stripe from 'stripe'

import { CLIENT_URL, STRIPE_SECRET_KEY, isStripeConfigured } from './config.js'
import {
  ALLOWED_COUNTRIES,
  CURRENCY,
  KIT,
  LANGS,
  MAX_QUANTITY,
  needsShippingAddress,
  quote,
  shippingOption,
} from './catalog.js'

let stripeClient = null
function stripe() {
  if (!stripeClient && isStripeConfigured) {
    stripeClient = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  }
  return stripeClient
}

const badRequest = (res, error) => res.status(400).json({ error })

export async function createCheckoutSession(req, res) {
  const body = req.body ?? {}
  const delivery = typeof body.delivery === 'string' ? body.delivery : ''
  const lang = LANGS.includes(body.lang) ? body.lang : 'es'
  const quantity = body.quantity === undefined ? 1 : Number(body.quantity)

  // 1 · Validación estricta de lo que llega del navegador.
  const option = shippingOption(delivery)
  if (!option) {
    return badRequest(res, `delivery desconocida: «${delivery}». Valores: pickup, montreal, rest`)
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return badRequest(res, `quantity debe ser un entero entre 1 y ${MAX_QUANTITY}`)
  }

  // 2 · El precio se recalcula SIEMPRE en el servidor.
  const prices = quote({ delivery, quantity })
  if (!prices) return badRequest(res, 'no se pudo calcular el pedido')

  // 3 · Sin clave secreta no se puede cobrar (pero la validación ya se hizo).
  if (!isStripeConfigured) {
    return res.status(503).json({
      error: 'stripe_not_configured',
      message: 'Falta STRIPE_SECRET_KEY en el servidor.',
    })
  }

  // 4 · Sesión de Stripe: kit como producto + entrega como tarifa de envío.
  const withAddress = needsShippingAddress(delivery)

  const sessionParams = {
    mode: 'payment',
    // La pasarela habla el idioma de la tienda: es-419, en-CA o fr-CA.
    locale: lang === 'fr' ? 'fr-CA' : lang === 'en' ? 'en-CA' : 'es-419',
    client_reference_id: randomUUID(),
    line_items: [
      {
        quantity,
        price_data: {
          currency: CURRENCY,
          unit_amount: KIT.amount,
          product_data: {
            name: KIT.names[lang] ?? KIT.names.es,
            description: KIT.descriptions[lang] ?? KIT.descriptions.es,
          },
        },
      },
    ],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: option.names[lang] ?? option.names.es,
          fixed_amount: { amount: prices.shippingAmount, currency: CURRENCY },
        },
      },
    ],
    metadata: {
      product: KIT.id,
      delivery,
      needs_address: withAddress ? 'yes' : 'no',
      quantity: String(quantity),
      lang,
      kit_amount: String(prices.kitAmount),
      shipping_amount: String(prices.shippingAmount),
      total_amount: String(prices.total),
    },
    // La entrega viaja en la URL de vuelta para poder saludar con el mensaje
    // correcto (sábado / 3-5 días / recogida) sin esperar al webhook.
    success_url: `${CLIENT_URL}/?checkout=success&delivery=${delivery}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/?checkout=cancel`,
    // Códigos de descuento: Victoria los crea en su panel de Stripe (Cupones →
    // códigos de promoción) y aquí solo hay que permitir que se puedan escribir.
    // El descuento lo aplica Stripe; nunca lo calcula la web.
    allow_promotion_codes: true,
    // Teléfono: siempre (Victoria coordina la entrega por WhatsApp).
    phone_number_collection: { enabled: true },
    billing_address_collection: 'auto',
  }

  // Domicilio y resto de Canadá: Stripe pide nombre, dirección, ciudad y código
  // postal ANTES de pagar, y los devuelve en la sesión y en el webhook.
  // Recogida en Montreal no pide dirección: se recoge en el taller.
  if (withAddress) {
    sessionParams.shipping_address_collection = {
      allowed_countries: ALLOWED_COUNTRIES,
    }
  }

  try {
    const session = await stripe().checkout.sessions.create(sessionParams, {
      idempotencyKey: randomUUID(),
    })
    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
      quote: {
        delivery,
        quantity: prices.quantity,
        kitAmount: prices.kitAmount,
        shippingAmount: prices.shippingAmount,
        total: prices.total,
        currency: CURRENCY,
      },
    })
  } catch (error) {
    // Nunca se filtra el mensaje crudo de Stripe al navegador.
    console.error('[checkout] stripe error:', error?.message)
    return res.status(502).json({ error: 'stripe_error', message: 'No se pudo crear el pago.' })
  }
}
