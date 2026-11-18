/**
 * POST /api/webhook — confirmación de Stripe.
 *
 * Stripe firma cada evento con `STRIPE_WEBHOOK_SECRET`; sin esa firma no se acepta
 * nada. Es la única forma fiable de saber que un pago se completó (el redirect del
 * navegador puede no ocurrir: la persona cierra la pestaña, pierde la conexión…).
 *
 * Eventos que interesan:
 *   checkout.session.completed            → pago confirmado
 *   checkout.session.async_payment_succeeded → pago diferido confirmado
 *   checkout.session.expired              → la sesión caducó sin pagar
 *
 * Ojo: aquí NO se puede cobrar nada; solo se registra el pedido confirmado.
 * Para avisar a Victoria (correo/WhatsApp) se añade un `notifyOrder()`.
 */
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, isStripeConfigured } from './config.js'

const HANDLED = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.expired',
])

/**
 * Dirección de entrega, en el formato nuevo y en el antiguo de la API.
 * Stripe la expone como `collected_information.shipping_details` (2024-09+) o
 * `shipping_details` en versiones anteriores.
 */
function readShipping(session) {
  const shipping =
    session.collected_information?.shipping_details ??
    session.shipping_details ??
    session.shipping ??
    null
  if (!shipping) return null
  const address = shipping.address ?? {}
  return {
    name: shipping.name ?? '',
    line1: address.line1 ?? '',
    line2: address.line2 ?? '',
    city: address.city ?? '',
    postalCode: address.postal_code ?? '',
    state: address.state ?? '',
    country: address.country ?? '',
    phone: session.customer_details?.phone ?? '',
  }
}

/**
 * Deja el pedido en el log del servidor (Render lo guarda).
 * **Sin datos de tarjeta**: solo lo necesario para preparar el envío.
 */
function notifyOrder(session) {
  const meta = session.metadata ?? {}
  const total = Number(meta.total_amount ?? session.amount_total ?? 0) / 100
  const shipping = readShipping(session)
  const address = shipping
    ? [shipping.line1, shipping.line2, `${shipping.city} ${shipping.postalCode}`, shipping.country]
        .filter(Boolean)
        .join(', ')
    : 'recogida en el taller (sin dirección)'

  console.log(
    `[pedido] ${session.payment_status} · ${session.id} · ` +
      `${meta.quantity ?? 1}× kit · entrega ${meta.delivery ?? '?'} · ` +
      `total ${total.toFixed(2)} ${String(session.currency ?? 'cad').toUpperCase()}`,
  )
  console.log(
    `[pedido] contacto: ${session.customer_details?.email ?? 'sin correo'} · ` +
      `tel ${shipping?.phone || 'sin teléfono'}`,
  )
  console.log(`[pedido] envío: ${address}`)
}

export function handleStripeWebhook(req, res) {
  if (!isStripeConfigured || !STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: 'webhook_not_configured' })
  }

  const signature = req.headers['stripe-signature']
  if (!signature) return res.status(400).json({ error: 'missing_signature' })

  let event
  try {
    // `req.body` es el cuerpo CRUDO (Buffer): la firma se calcula sobre los bytes.
    event = new Stripe(STRIPE_SECRET_KEY).webhooks.constructEvent(
      req.body,
      signature,
      STRIPE_WEBHOOK_SECRET,
    )
  } catch (error) {
    console.error('[webhook] firma inválida:', error?.message)
    return res.status(400).json({ error: 'invalid_signature' })
  }

  if (!HANDLED.has(event.type)) return res.json({ received: true, ignored: event.type })

  const session = event.data.object
  notifyOrder(session)
  return res.json({ received: true })
}
