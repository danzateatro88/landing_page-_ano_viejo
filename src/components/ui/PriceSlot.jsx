/**
 * PriceSlot — los tres estados del precio pendiente (CRO §6, 02-copys.md §8).
 *
 * Estados, por configuración (`src/data/siteConfig.js`), jamás hardcodeados:
 * - `hidden`       → `kitPrice: null` y sin stock: **no renderiza nada** (ni hueco,
 *                    ni «$—», ni «consultar»). El CTA sube y ocupa ese lugar.
 * - `availability` → píldora mostaza con texto de tinta («Disponible», 5,85:1).
 * - `price`        → número grande Baloo 2 800 + `price.label` + moneda.
 *
 * Prohibido en cualquier estado: cifras del kit, tachados, descuentos, símbolos
 * de moneda sin importe. El importe solo entra por `kitPrice.amount`.
 *
 * Uso:
 *   <PriceSlot />   // lee siteConfig
 */
import { useLang } from '../../i18n/LanguageContext'
import siteConfig from '../../data/siteConfig'

// Sin decimales forzados: «44 $», y «52,95 $» cuando la cifra los lleva.
const AMOUNT_FORMAT = new Intl.NumberFormat('es-CA', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function resolvePriceMode(config = siteConfig) {
  const hasPrice = config.kitPrice != null && config.kitPrice.amount != null
  const hasStock = config.availability === 'in_stock'

  switch (config.priceDisplay) {
    case 'hidden':
      return 'hidden'
    case 'availability':
      return hasStock ? 'availability' : 'hidden'
    case 'price':
      return hasPrice ? 'price' : 'hidden'
    default:
      if (hasPrice) return 'price'
      return hasStock ? 'availability' : 'hidden'
  }
}

export default function PriceSlot({ className = '', align = 'center' }) {
  const { t } = useLang()
  const mode = resolvePriceMode()

  if (mode === 'hidden') return null

  if (mode === 'availability') {
    return (
      <p className={`flex ${align === 'start' ? 'justify-start' : 'justify-center'} ${className}`}>
        <span className="inline-flex items-center rounded-pill bg-mostaza px-4 py-1.5 font-display text-[15px] font-bold text-tinta shadow-[2px_2px_0_0_var(--color-tinta)]">
          {t('price.availabilityLabel')}
          <span className="sr-only">{t('price.availabilityAria')}</span>
        </span>
      </p>
    )
  }

  const amount = AMOUNT_FORMAT.format(Number(siteConfig.kitPrice.amount))
  const currency = siteConfig.kitPrice.currency ?? t('price.currency')

  return (
    <p className={`flex flex-col items-center gap-1 ${className}`}>
      <span
        aria-hidden="true"
        className="font-display text-[clamp(2.5rem,11vw,3.5rem)] font-extrabold leading-none text-tinta"
      >
        {t('price.amountTemplate', { amount })}
        {siteConfig.content.showPriceCurrency ? (
          <span className="ml-2 align-middle font-body text-[13px] font-semibold tracking-[0.12em] text-tinta/70 uppercase">
            {currency}
          </span>
        ) : null}
      </span>
      <span aria-hidden="true" className="font-body text-[15px] font-semibold text-tinta/80">
        {t('price.label')}
      </span>
      {/* Único anuncio para el lector de pantalla: el importe visible queda oculto a AT. */}
      <span className="sr-only">{t('price.ariaTemplate', { amount })}</span>
    </p>
  )
}
