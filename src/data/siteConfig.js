/**
 * Configuración del negocio — vichisboh* · Kit Ritual Año Viejo 2026.
 *
 * Aquí viven SOLO decisiones de configuración (nunca textos de copy: el copy es
 * trilingüe y vive en `src/i18n/translations.js`). Si una cifra aparece en pantalla,
 * su fuente canónica sigue siendo el diccionario (`buy.shipping`).
 *
 * Regla de negocio nº 1 del encargo: **el precio del kit está pendiente**.
 * `kitPrice` es `null` y mientras lo sea no se renderiza ninguna cifra.
 */

/**
 * Precio del kit. Lo fijó Victoria el 18 de noviembre de 2026: **44 dólares
 * canadienses**. Mientras fuera `null`, la página no mostraba ninguna cifra.
 */
export const kitPrice = { amount: 44, currency: 'CAD' }
// Para cambiar el precio, edita el importe de arriba: el total del panel de
// compra y los enlaces de Stripe se recalculan solos.

/**
 * Disponibilidad de temporada. `'in_stock'` activa la píldora «Disponible».
 *
 * Por defecto `null`: Victoria **no ha confirmado stock** y afirmar «Disponible»
 * sería una invención comercial (regla nº 1 del encargo). Cuando ella lo confirme,
 * basta poner `export const availability = 'in_stock'`.
 */
export const availability = null

/**
 * Forzar el estado del PriceSlot: 'auto' | 'hidden' | 'availability' | 'price'.
 * 'auto' = precio si existe → disponibilidad si hay stock → oculto.
 */
export const priceDisplay = 'auto'

export const siteConfig = {
  kitPrice,
  availability,
  priceDisplay,

  /**
   * Cobro con Stripe.
   *
   * En una web estática no se puede crear una sesión de pago con importe variable
   * (eso exige un servidor con la clave secreta). La vía limpia y segura es **un
   * enlace de pago por forma de entrega**, con el total ya incluido:
   *
   *   kit 44 $ + recogida 0 $     → 44,00 $
   *   kit 44 $ + Montreal 5 $     → 49,00 $
   *   kit 44 $ + Canadá 8,95 $    → 52,95 $
   *
   * Victoria crea esos tres enlaces en su panel de Stripe y los pega aquí.
   * Mientras sigan en `null`, el botón NO deja al cliente sin salida: cae al pedido
   * por WhatsApp con el total y la entrega ya calculados en el mensaje.
   */
  /**
   * Cobro con Stripe.
   *
   * El importe **no se decide en el navegador**: el frontend manda al servidor
   * *qué* quiere (entrega y cantidad), el servidor recalcula el precio con su
   * propio catálogo y crea la sesión de pago (`POST /api/checkout`).
   * Los precios de abajo son solo para pintar la interfaz: si la API responde,
   * mandan los del servidor.
   *
   * El servidor vive en `server/` y se despliega aparte (Render). La URL se
   * configura con `VITE_API_URL`; en desarrollo la proxya Vite.
   */
  checkout: {
    provider: 'stripe',
    endpoint: '/api',
  },

  shipping: {
    pickupFree: true,
    montreal: 5,
    restOfCanada: 8.95,
    freeFrom: 60,
    currency: 'CAD',
  },

  /** Interruptores de contenido acordados en la Puerta 1. */
  content: {
    showDeliveryNote: false, // Victoria retiró la nota de diciembre (18 nov 2026)
    showPackagingNote: false, // Victoria pidió retirar la caja de la nota de empaque (17 nov 2026)
    showPhotoLabels: true, // etiqueta visible «Foto real: …» mientras no hay foto
    showPriceCurrency: true,
  },

  /** Puertas reales del sitio. Son las únicas autorizadas (cero formularios). */
  links: {
    whatsapp: 'https://wa.me/15142968295',
    whatsappPhone: '514-296-8295',
    instagram: 'https://instagram.com/vichisboho',
    instagramHandle: '@vichisboho',
  },

  /** Rasgos de la identidad artesanal que se pueden apagar sin tocar componentes. */
  craft: {
    paperTexture: true,
    tilts: true, // rotaciones sutiles ±2,5° en stickers y doodles
    doodles: true,
  },

  /**
   * Fotos reales pendientes (D9). `src: null` = PhotoSlot dibuja el marcador
   * honesto con su ratio exacto. Nunca stock, nunca IA, nunca ilustración sustituta.
   * Al llegar la foto: `src: '/photos/hero-vichito.jpg'`.
   */
  photos: {
    // Fotos reales entregadas por Victoria el 16-17 nov 2026. Los originales
    // viven en `imagenes/`; en `public/photos/` van optimizadas para web
    // (máx. 1200 px el hero y el retrato; 900 px las piezas) sin recortar.
    hero: { src: '/photos/hero-vichito.jpg', ratio: '4/5' },
    tradition: { src: null, ratio: '3/4' },
    packaging: { src: null, ratio: '16/10' },
    steps: { src: null, ratio: '1/1' },
    buy: { src: null, ratio: '4/5' },
    // Retrato recortado con transparencia: se muestra sobre el papel crema.
    victoria: { src: '/photos/victoria.webp', ratio: '4/5', fit: 'contain' },
    kit: { src: null, ratio: '1/1' },
    kitItems: [
      // [1] El Vichito: recorte real del muñeco tomado de la foto del kit.
      { src: '/photos/kit-vichito.jpg', fit: 'cover' },
      // [2] Los calzones amarillos: ilustración con transparencia → se muestra
      //     completa sobre el papel crema (no se recorta), como un sticker.
      { src: '/photos/kit-stickers.webp', fit: 'contain' },
      { src: '/photos/kit-maleta.webp', fit: 'contain' },
      { src: '/photos/kit-billete.webp', fit: 'contain' },
      { src: '/photos/kit-lapicero.webp', fit: 'contain' },
      { src: '/photos/kit-alcohol.webp', fit: 'contain' },
      { src: '/photos/kit-lentejas.webp', fit: 'contain' },
      // Las tarjetas vienen recortadas con transparencia: sticker sobre el papel.
      { src: '/photos/kit-tarjetas.webp', fit: 'contain' },
    ],
  },
}

export default siteConfig
