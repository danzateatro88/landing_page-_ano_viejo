/**
 * POST /api/webhook — confirmación firmada de Stripe (Vercel Function).
 *
 * Se desactiva el parser de body de Vercel para recibir los **bytes crudos**:
 * la firma se calcula sobre el cuerpo exacto que envió Stripe.
 */
import { STRIPE_WEBHOOK_SECRET } from './_lib/config.js'
import { requireStripe, stripe } from './_lib/stripe.js'

export const config = { api: { bodyParser: false } }

const HANDLED = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.expired',
])

async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body
  const chunks = []
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return Buffer.concat(chunks)
}

function readShipping(session) {
  const shipping =
    session.collected_information?.shipping_details ?? session.shipping_details ?? null
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

/** Deja constancia del pedido en los logs de Vercel. Sin datos de tarjeta. */
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
    `[pedido] ${session.payment_status} · ${session.id} · ${meta.quantity ?? 1}× kit · ` +
      `entrega ${meta.delivery ?? '?'} · ${total.toFixed(2)} ${String(session.currency ?? 'cad').toUpperCase()}`,
  )
  console.log(
    `[pedido] contacto: ${session.customer_details?.email ?? 'sin correo'} · tel ${shipping?.phone || 'sin teléfono'}`,
  )
  console.log(`[pedido] envío: ${address}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: 'webhook_not_configured' })
  }
  if (!requireStripe(res)) return undefined

  const signature = req.headers['stripe-signature']
  if (!signature) return res.status(400).json({ error: 'missing_signature' })

  let event
  try {
    const raw = await readRawBody(req)
    event = stripe().webhooks.constructEvent(raw, signature, STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.error('[webhook] firma inválida:', error?.message)
    return res.status(400).json({ error: 'invalid_signature' })
  }

  if (!HANDLED.has(event.type)) return res.status(200).json({ received: true, ignored: event.type })

  notifyOrder(event.data.object)
  return res.status(200).json({ received: true })
}
