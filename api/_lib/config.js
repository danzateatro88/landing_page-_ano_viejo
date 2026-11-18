/**
 * Configuración de las funciones — todo por variables de entorno de Vercel.
 * Ningún secreto en el repositorio.
 */

export const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY ?? '').trim()
export const STRIPE_WEBHOOK_SECRET = (process.env.STRIPE_WEBHOOK_SECRET ?? '').trim()
export const isStripeConfigured = Boolean(STRIPE_SECRET_KEY)

/** Dominio fijo de la tienda; si no está, se deduce del propio request. */
export const CLIENT_URL = (process.env.CLIENT_URL ?? '').trim().replace(/\/+$/, '')

/**
 * De dónde viene la petición, para construir success_url / cancel_url.
 * Preferimos CLIENT_URL (producción) y caemos al origen real de la petición
 * (previews de Vercel, vercel dev, localhost).
 */
export function resolveClientUrl(req) {
  if (CLIENT_URL) return CLIENT_URL
  const proto = (req.headers['x-forwarded-proto'] ?? 'http').split(',')[0].trim()
  const host = (req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost:3000')
    .split(',')[0]
    .trim()
  return `${proto}://${host}`
}
