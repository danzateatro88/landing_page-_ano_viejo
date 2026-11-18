import Stripe from 'stripe'

import { STRIPE_SECRET_KEY, isStripeConfigured } from './config.js'

let client = null

/** Cliente de Stripe perezoso: se crea solo si hay clave. */
export function stripe() {
  if (!client && isStripeConfigured) {
    client = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  }
  return client
}

export function requireStripe(res) {
  if (isStripeConfigured) return true
  res.status(503).json({ error: 'stripe_not_configured' })
  return false
}

/** CORS mínimo: la web y las funciones viven en el mismo dominio. */
export function allowSameOrigin(req, res) {
  const origin = req.headers.origin
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  }
}
