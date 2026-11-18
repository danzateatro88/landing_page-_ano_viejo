/**
 * POST /api/create-checkout-session — Vercel Serverless Function.
 *
 * Contrato: { delivery: 'pickup'|'montreal'|'rest', lang?: 'es'|'en'|'fr', quantity?: 1..5 }
 * Respuesta: 200 { url, sessionId, quote } · 400 { error } · 503 · 502
 *
 * El importe **se recalcula aquí**; el navegador nunca lo decide.
 */
import {
  ALLOWED_COUNTRIES,
  KIT,
  LANGS,
  MAX_QUANTITY,
  needsShippingAddress,
  quote,
  shippingOption,
} from './_lib/catalog.js'
import { resolveClientUrl } from './_lib/config.js'
import { allowSameOrigin, requireStripe, stripe } from './_lib/stripe.js'
import { CURRENCY } from './_lib/catalog.js'
import { randomUUID } from 'node:crypto'

export default async function handler(req, res) {
  allowSameOrigin(req, res)

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body ?? {})
  const delivery = typeof body.delivery === 'string' ? body.delivery : ''
  const lang = LANGS.includes(body.lang) ? body.lang : 'es'
  const quantity = body.quantity === undefined ? 1 : Number(body.quantity)

  const option = shippingOption(delivery)
  if (!option) {
    return res
      .status(400)
      .json({ error: `delivery desconocida: «${delivery}». Valores: pickup, montreal, rest` })
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return res.status(400).json({ error: `quantity debe ser un entero entre 1 y ${MAX_QUANTITY}` })
  }

  const prices = quote({ delivery, quantity })
  if (!prices) return res.status(400).json({ error: 'no se pudo calcular el pedido' })
  if (!requireStripe(res)) return undefined

  const withAddress = needsShippingAddress(delivery)
  const clientUrl = resolveClientUrl(req)

  const params = {
    mode: 'payment',
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
    allow_promotion_codes: true,
    phone_number_collection: { enabled: true },
    billing_address_collection: 'auto',
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
    success_url: `${clientUrl}/?checkout=success&delivery=${delivery}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/?checkout=cancel`,
  }

  if (withAddress) {
    params.shipping_address_collection = { allowed_countries: ALLOWED_COUNTRIES }
  }

  try {
    const session = await stripe().checkout.sessions.create(params, {
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
    console.error('[checkout] stripe error:', error?.message)
    return res.status(502).json({ error: 'stripe_error', message: 'No se pudo crear el pago.' })
  }
}

function safeJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}
