/**
 * Catálogo del servidor — **la única fuente de verdad de los precios**.
 *
 * El navegador puede pedir «este kit con esta entrega», pero nunca puede decir
 * cuánto cuesta: aquí se recalcula todo antes de hablar con Stripe.
 * Los importes van en **céntimos** (Stripe trabaja en la unidad mínima).
 */

export const CURRENCY = 'cad'

/** Producto: el Kit Ritual Año Viejo 2026. */
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

/** Formas de entrega autorizadas. El identificador es lo único que llega del cliente. */
export const SHIPPING_OPTIONS = [
  {
    id: 'pickup',
    amount: 0,
    names: { es: 'Recogida en Montreal', en: 'Pickup in Montreal', fr: 'Cueillette à Montréal' },
  },
  {
    id: 'montreal',
    amount: 500, // 5,00 $
    names: { es: 'Domicilio en Montreal', en: 'Montreal delivery', fr: 'Livraison à Montréal' },
  },
  {
    id: 'rest',
    amount: 895, // 8,95 $
    names: { es: 'Resto de Canadá', en: 'Rest of Canada', fr: 'Reste du Canada' },
  },
]

/** Envío gratis a partir de 60 $ (60 000 céntimos). */
export const FREE_FROM = 6000

/** Un pedido puede llevar hasta 5 kits (más que eso, por WhatsApp). */
export const MAX_QUANTITY = 5

export const LANGS = ['es', 'en', 'fr']

/** Países a los que se puede enviar (Stripe pide la dirección solo en estos). */
export const ALLOWED_COUNTRIES = ['CA']

/**
 * ¿Esta entrega necesita dirección y teléfono?
 * Recogida en Montreal no: la persona va al taller. Domicilio y resto de Canadá sí.
 */
export function needsShippingAddress(delivery) {
  return delivery === 'montreal' || delivery === 'rest'
}

export function shippingOption(id) {
  return SHIPPING_OPTIONS.find((option) => option.id === id) ?? null
}

/**
 * Total recalculado en el servidor.
 * Devuelve `{ quantity, kitAmount, shippingAmount, total, freeShipping }`.
 */
export function quote({ delivery, quantity = 1 }) {
  const option = shippingOption(delivery)
  if (!option) return null

  const kitAmount = KIT.amount * quantity
  const freeShipping = kitAmount >= FREE_FROM
  const shippingAmount = freeShipping ? 0 : option.amount

  return {
    quantity,
    kitAmount,
    shippingAmount,
    total: kitAmount + shippingAmount,
    freeShipping,
  }
}

/** Lo que el frontend puede leer (informativo). Nunca incluye secretos. */
export function publicPricing() {
  return {
    currency: CURRENCY,
    kit: { id: KIT.id, amount: KIT.amount, names: KIT.names },
    shipping: SHIPPING_OPTIONS.map(({ id, amount, names }) => ({ id, amount, names })),
    freeFrom: FREE_FROM,
    maxQuantity: MAX_QUANTITY,
  }
}
