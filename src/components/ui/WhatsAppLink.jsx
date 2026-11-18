/**
 * WhatsAppLink — enlace a `wa.me/15142968295` con el mensaje prellenado del idioma
 * activo para la sección indicada (`waUrl('nav' | 'hero' | 'kit' | 'steps' |
 * 'buy' | 'victoria' | 'mailclub' | 'footer')`).
 *
 * Siempre: pestaña nueva + `rel="noopener noreferrer"` + `aria-label` completo.
 * Es la única puerta de compra/lista de espera del sitio (cero formularios).
 *
 * Uso:
 *   <WhatsAppLink section="footer" ariaLabel={t('footer.whatsappAria')}>{t('footer.whatsapp')}</WhatsAppLink>
 */
import { useLang } from '../../i18n/LanguageContext'

export default function WhatsAppLink({
  section = 'hero',
  ariaLabel,
  children,
  className = '',
}) {
  const { waUrl } = useLang()
  const url = waUrl(section)

  return (
    <a
      href={url}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
