/**
 * GET /api/session/:id — resumen público de una sesión de pago.
 * Lo usa la pantalla de «pago confirmado»: la web pregunta aquí (y aquí se
 * pregunta a Stripe) en lugar de fiarse de la URL.
 */
import { requireStripe, stripe, allowSameOrigin } from '../_lib/stripe.js'

const ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]+$/

export default async function handler(req, res) {
  allowSameOrigin(req, res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const { id } = req.query
  if (!ID_PATTERN.test(String(id))) return res.status(400).json({ error: 'invalid_session_id' })
  if (!requireStripe(res)) return undefined

  try {
    const session = await stripe().checkout.sessions.retrieve(String(id))
    const meta = session.metadata ?? {}
    const shipping =
      session.collected_information?.shipping_details ?? session.shipping_details ?? null

    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      status: session.status,
      paymentStatus: session.payment_status,
      delivery: meta.delivery ?? null,
      quantity: Number(meta.quantity ?? 1),
      total: session.amount_total,
      shippingAmount: Number(meta.shipping_amount ?? 0),
      currency: session.currency,
      lang: meta.lang ?? 'es',
      customer: {
        name: session.customer_details?.name ?? '',
        email: session.customer_details?.email ?? '',
        phone: session.customer_details?.phone ?? '',
        city: shipping?.address?.city ?? '',
        postalCode: shipping?.address?.postal_code ?? '',
        line1: shipping?.address?.line1 ?? '',
      },
    })
  } catch (error) {
    console.error('[session] error:', error?.message)
    return res.status(502).json({ error: 'stripe_error' })
  }
}
