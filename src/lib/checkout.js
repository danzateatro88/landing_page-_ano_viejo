/**
 * Cliente de la API de checkout.
 *
 * Regla del proyecto: **el navegador no decide el precio**. Aquí solo se piden
 * los precios al servidor (para mostrarlos) y se le envía *qué* quiere la persona
 * (entrega y cantidad). El importe final lo calcula el servidor y lo cobra Stripe.
 */

/**
 * Base de la API. **Vacío a propósito**: las funciones viven en el mismo dominio
 * (`/api/*` en Vercel). Solo se rellena con `VITE_API_URL` si algún día el backend
 * se separa otra vez.
 */
export const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '') || ''

const url = (path) => `${API_BASE}/api${path}`

/**
 * Precios canónicos del servidor.
 * Devuelve `null` si no hay API, si responde mal o si la forma no es la esperada:
 * una respuesta rara nunca debe romper la página.
 */
export async function fetchPricing(signal) {
  try {
    const response = await fetch(url('/pricing'), { signal, headers: { Accept: 'application/json' } })
    if (!response.ok) return null
    const data = await response.json()
    const valid =
      data &&
      typeof data === 'object' &&
      Number.isFinite(Number(data?.kit?.amount)) &&
      Array.isArray(data.shipping)
    return valid ? data : null
  } catch {
    return null
  }
}

/**
 * Crea la sesión de pago y devuelve la URL de Stripe.
 * Lanza un error si el servidor no puede cobrar (sin clave, Stripe caído…).
 */
export async function createCheckoutSession({ delivery, lang, quantity = 1 }) {
  const response = await fetch(url('/create-checkout-session'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ delivery, lang, quantity }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.url) {
    const reason = data?.error ?? `http_${response.status}`
    const error = new Error(reason)
    error.code = reason
    throw error
  }

  return data
}

export default { API_BASE, fetchPricing, createCheckoutSession }
