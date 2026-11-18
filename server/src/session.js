/**
 * GET /api/session/:id — resumen público de una sesión de pago.
 *
 * Lo usa la pantalla de «pago confirmado»: la web pregunta a Stripe (a través del
 * servidor) si el pago se completó de verdad, en lugar de fiarse de la URL.
 * Devuelve solo lo imprescindible: nada de tarjeta, nada de secretos.
 */
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY, isStripeConfigured } from './config.js'

let stripeClient = null
function stripe() {
  if (!stripeClient && isStripeConfigured) {
    stripeClient = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  }
  return stripeClient
}

const ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]+$/

export async function getSessionSummary(req, res) {
  if (!isStripeConfigured) {
    return res.status(503).json({ error: 'stripe_not_configured' })
  }

  const { id } = req.params
  if (!ID_PATTERN.test(id)) return res.status(400).json({ error: 'invalid_session_id' })

  try {
    const session = await stripe().checkout.sessions.retrieve(id)
    const meta = session.metadata ?? {}
    const shipping =
      session.collected_information?.shipping_details ?? session.shipping_details ?? null

    return res.json({
      status: session.status, // open | complete | expired
      paymentStatus: session.payment_status, // paid | unpaid | no_payment_required
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
