/**
 * InstagramLink — enlace al perfil `@vichisboho` (segunda vía de captura).
 *
 * El DM de Instagram no admite mensaje prellenado por URL, así que el `aria-label`
 * solo promete lo que ocurre de verdad: se abre el perfil en una pestaña nueva.
 *
 * Uso:
 *   <InstagramLink ariaLabel={t('footer.instagramAria')}>{t('footer.instagram')}</InstagramLink>
 */
import { useLang } from '../../i18n/LanguageContext'

export default function InstagramLink({ ariaLabel, children, className = '' }) {
  const { instagramUrl } = useLang()

  return (
    <a
      href={instagramUrl}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
