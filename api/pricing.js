/** GET /api/pricing — precios públicos para pintar la interfaz. */
import { publicPricing } from './_lib/catalog.js'
import { allowSameOrigin } from './_lib/stripe.js'

export default function handler(req, res) {
  allowSameOrigin(req, res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300')
  return res.status(200).json(publicPricing())
}
