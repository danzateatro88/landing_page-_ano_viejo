/**
 * ButtonSecondary — píldora crema con etiqueta de tinta (7,66:1) y contorno
 * de garabato terracota (`SquigglyFrame` variante `pill`).
 *
 * Es la familia de los CTA que conviven con todos los bloques: navbar sticky,
 * Kit (×2), Pasos y Mail Club. Nunca relleno terracota (D-R2-7), nunca CTA
 * principal de una sección. Alto ≥ 46 px, ancho completo opcional en móvil.
 *
 * Uso:
 *   <ButtonSecondary section="kit" label={t('kit.cta')} ariaLabel={t('kit.ctaAria')} />
 */
import { useLang } from '../../i18n/LanguageContext'
import SquigglyFrame from './SquigglyFrame'

const SIZES = {
  xs: 'min-h-[44px] px-3 text-[13px]',
  sm: 'min-h-[44px] px-4 text-[14px]',
  md: 'min-h-[46px] px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-[17px]',
}

export default function ButtonSecondary({
  label,
  ariaLabel,
  section = 'hero',
  href,
  external,
  onClick,
  size = 'md',
  fullWidth = false,
  className = '',
}) {
  const { waUrl } = useLang()
  const url = href ?? waUrl(section)
  const isExternal = external ?? !url.startsWith('#')

  const sharedClass = `relative inline-flex items-center justify-center rounded-pill bg-crema font-display font-bold leading-none text-tinta ${
    SIZES[size] ?? SIZES.md
  } ${fullWidth ? 'w-full' : ''} ${className}`

  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      <SquigglyFrame variant="pill" tone="terracota" strokeWidth={2.2} loop={9} />
    </>
  )

  // Con `onClick` es un botón real (cerrar el aviso, volver al panel).
  if (typeof onClick === 'function') {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={sharedClass}>
        {inner}
      </button>
    )
  }

  return (
    <a
      href={url}
      aria-label={ariaLabel}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={sharedClass}
    >
      {inner}
    </a>
  )
}
