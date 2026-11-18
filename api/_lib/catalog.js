/**
 * Catálogo — **la única fuente de verdad de los precios** (Vercel Functions).
 *
 * Igual que en `server/src/catalog.js`, pero aquí sin dependencias del servidor
 * tradicional. El navegador manda *qué* quiere; el importe se recalcula aquí.
 * Los importes van en céntimos (unidad mínima de Stripe).
 */

export const CURRENCY = 'cad'

export const KIT = {
  id: 'kit-vichito-2026',
  amount: 4400, // 44,00 $
  names: {
    es: 'Kit Ritual Año Viejo 2026 · Vichito',
    en: 'Año Viejo Ritual Kit 2026 · Vichito',
    fr: 'Kit rituel Año Viejo 2026 · Vichito',
  },
  descriptions: {
    es: 'Muñeco Vichito, tarjetas del ritual, lentejas, alcohol, lapicero, billete separador y stickers. Hecho a mano en Montreal.',
    en: 'Vichito doll, ritual cards, lentils, alcohol, pen, bookmark banknote and stickers. Handmade in Montreal.',
    fr: 'Poupée Vichito, cartes du rituel, lentilles, alcool, stylo, signet billet et autocollants. Fait main à Montréal.',
  },
}

export const SHIPPING_OPTIONS = [
  {
    id: 'pickup',
    amount: 0,
    names: { es: 'Recogida en Montreal', en: 'Pickup in Montreal', fr: 'Cueillette à Montréal' },
  },
  {
    id: 'montreal',
    amount: 500,
    names: { es: 'Domicilio en Montreal', en: 'Montreal delivery', fr: 'Livraison à Montréal' },
  },
  {
    id: 'rest',
    amount: 895,
    names: { es: 'Resto de Canadá', en: 'Rest of Canada', fr: 'Reste du Canada' },
  },
]

export const FREE_FROM = 6000
export const MAX_QUANTITY = 5
export const LANGS = ['es', 'en', 'fr']
export const ALLOWED_COUNTRIES = ['CA']

export function shippingOption(id) {
  return SHIPPING_OPTIONS.find((option) => option.id === id) ?? null
}

/** Domicilio y resto de Canadá piden dirección; la recogida no. */
export function needsShippingAddress(delivery) {
  return delivery === 'montreal' || delivery === 'rest'
}

/** Total recalculado en el servidor. */
export function quote({ delivery, quantity = 1 }) {
  const option = shippingOption(delivery)
  if (!option) return null
  const kitAmount = KIT.amount * quantity
  const freeShipping = kitAmount >= FREE_FROM
  const shippingAmount = freeShipping ? 0 : option.amount
  return { quantity, kitAmount, shippingAmount, total: kitAmount + shippingAmount, freeShipping }
}

export function publicPricing() {
  return {
    currency: CURRENCY,
    kit: { id: KIT.id, amount: KIT.amount, names: KIT.names },
    shipping: SHIPPING_OPTIONS.map(({ id, amount, names }) => ({ id, amount, names })),
    freeFrom: FREE_FROM,
    maxQuantity: MAX_QUANTITY,
  }
}
