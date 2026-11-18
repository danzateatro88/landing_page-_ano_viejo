/**
 * ButtonPrimary — CTA de relleno terracota. Condición C1 del acta.
 *
 * - Fondo terracota, etiqueta Baloo 2 800 a ≥ 20 px con color `var(--btn-ink)`
 *   (crema por defecto; `#134E35` es el alterno configurable, 3,96:1).
 * - Keyline de tinta de 2 px + halo crema de 3 px, **reales en el CSS**
 *   (`.btn-primary` en `src/index.css`, `box-shadow` inspeccionable en el DOM).
 * - Alto ≥ 52 px, ancho completo en móvil, radio píldora, foco mostaza de 3 px.
 * - Solo dos por página (hero y Comprar). Nunca en el navbar (C4/D-R2-7).
 *
 * Deuda de marca declarada: crema sobre terracota = 2,86:1. La etiqueta es grande
 * por legibilidad y jerarquía, NO por conformidad AA.
 *
 * Uso:
 *   <ButtonPrimary section="hero" label={t('hero.cta')} ariaLabel={t('hero.ctaAria')} />
 */
import { useLang } from '../../i18n/LanguageContext'

const SIZES = {
  md: 'min-h-[52px] px-7 py-3 text-[20px] sm:min-h-[56px] sm:text-[22px]',
  lg: 'min-h-[58px] px-8 py-3.5 text-[22px] sm:min-h-[62px] sm:text-[24px]',
}

export default function ButtonPrimary({
  label,
  ariaLabel,
  section = 'hero',
  href,
  external,
  onClick,
  disabled = false,
  size = 'md',
  fullWidth = false,
  className = '',
}) {
  const { waUrl } = useLang()
  const url = href ?? waUrl(section)
  // Los enlaces internos (#ancla) no abren pestaña: bajan a la sección.
  const isExternal = external ?? !url.startsWith('#')

  const sharedClass = `btn-primary inline-flex items-center justify-center gap-2 rounded-pill font-display font-extrabold leading-none ${
    SIZES[size] ?? SIZES.md
  } ${fullWidth ? 'w-full sm:w-auto' : ''} ${className}`

  // Con `onClick` es un botón real (pago asíncrono); sin él, un enlace.
  if (typeof onClick === 'function') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-busy={disabled || undefined}
        className={`${sharedClass} disabled:cursor-wait disabled:opacity-80`}
      >
        <span>{label}</span>
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
      <span>{label}</span>
    </a>
  )
}
