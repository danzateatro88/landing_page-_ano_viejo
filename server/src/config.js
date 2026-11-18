/**
 * Configuración del servidor: **todo por variables de entorno**.
 * Nada de secretos en el código ni en el repositorio.
 */
import 'dotenv/config'

const asNumber = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && value !== '' && value !== undefined ? parsed : fallback
}

export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const PORT = asNumber(process.env.PORT, 4242)

/** Clave secreta de Stripe (sk_test_… / sk_live_…). Sin ella, la API responde 503. */
export const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY ?? '').trim()

/** Firma del webhook (opcional). Si existe, se acepta el endpoint de webhooks. */
export const STRIPE_WEBHOOK_SECRET = (process.env.STRIPE_WEBHOOK_SECRET ?? '').trim()

/** Dominio público de la tienda: a dónde vuelve la persona tras pagar o cancelar. */
export const CLIENT_URL = (process.env.CLIENT_URL ?? 'http://localhost:5173').replace(/\/+$/, '')

/** Orígenes adicionales permitidos por CORS (previews, dominios antiguos…). */
export const EXTRA_ALLOWED_ORIGINS = (process.env.EXTRA_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean)

/**
 * Lista blanca de CORS: el dominio de la tienda + localhost de desarrollo +
 * los extra que se configuren. Cualquier otro origen se rechaza.
 */
export const ALLOWED_ORIGINS = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:4400',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:4400',
  ...EXTRA_ALLOWED_ORIGINS,
]

export const isStripeConfigured = Boolean(STRIPE_SECRET_KEY)
