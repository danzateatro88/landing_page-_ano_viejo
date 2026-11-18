/** GET /api/health — comprobación rápida del despliegue. */
import { CLIENT_URL, isStripeConfigured, STRIPE_WEBHOOK_SECRET } from './_lib/config.js'
import { allowSameOrigin } from './_lib/stripe.js'

export default function handler(req, res) {
  allowSameOrigin(req, res)
  return res.status(200).json({
    ok: true,
    runtime: 'vercel-node',
    stripeConfigured: isStripeConfigured,
    webhookConfigured: Boolean(STRIPE_WEBHOOK_SECRET),
    clientUrl: CLIENT_URL || '(se deduce del request)',
  })
}
