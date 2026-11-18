/**
 * Wordmark — `vichisboh*` en Baloo 2, con la flor-asterisco del logotipo.
 *
 * El texto sale del diccionario (`brand.wordmark`, invariante en los 3 idiomas).
 * Variantes de soporte: píldora crema (navbar), claro sobre petróleo (pie del hero)
 * y tinta (cierre). Nunca se deforma ni se usa como sustituto de un titular.
 *
 * Uso:
 *   <Wordmark variant="pill" size="sm" />
 *   <Wordmark variant="light" size="md" />
 */
import { useLang } from '../../i18n/LanguageContext'

const SIZES = {
  xs: 'text-[13px]',
  sm: 'text-[15px]',
  md: 'text-[20px] sm:text-[22px]',
  lg: 'text-[clamp(1.9rem,7vw,2.75rem)]',
  xl: 'text-[clamp(2.4rem,9vw,3.75rem)]',
}

const VARIANTS = {
  pill: 'rounded-pill bg-crema px-3 py-1 text-tinta outline outline-[1.6px] outline-terracota',
  light: 'text-crema',
  ink: 'text-tinta',
}

export default function Wordmark({
  variant = 'pill',
  size = 'sm',
  as: Tag = 'span',
  className = '',
}) {
  const { t } = useLang()

  return (
    <Tag
      className={`inline-flex items-baseline font-display font-bold leading-none tracking-[0.01em] ${
        VARIANTS[variant] ?? VARIANTS.pill
      } ${SIZES[size] ?? SIZES.sm} ${className}`}
    >
      {t('brand.wordmark')}
    </Tag>
  )
}
