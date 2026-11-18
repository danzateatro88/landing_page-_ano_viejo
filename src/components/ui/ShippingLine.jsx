/**
 * ShippingLine — la línea literal de envíos (`buy.shipping`), una sola frase.
 *
 * Se usa en Comprar y en el Cierre con la MISMA clave: si cambia un importe,
 * cambia en un solo sitio. Chocolate sobre crema (7,66:1). A 375 px puede ocupar
 * hasta 3 líneas y **nunca baja de 14 px**. No se resume ni se trocea en tarjetas.
 *
 * Uso:
 *   <ShippingLine />
 */
import { useLang } from '../../i18n/LanguageContext'

export default function ShippingLine({ className = '', tone = 'ink' }) {
  const { t } = useLang()
  const color = tone === 'light' ? 'text-crema' : 'text-tinta'

  return (
    <p
      className={`font-body text-[14px] leading-[1.55] font-semibold text-balance sm:text-[15px] ${color} ${className}`}
    >
      {t('buy.shipping')}
    </p>
  )
}
