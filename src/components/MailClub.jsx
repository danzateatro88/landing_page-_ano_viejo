/**
 * MailClub — bloque 6, sub-bloque B · «Inscríbete al mail club 2027» (CRO §2.7).
 *
 * Tarjeta nube crema con **borde de bucles terracota** (`CloudBlob`), tal y como la
 * dibuja el boceto `IMG_0314.png` y la pide el encargo. Dentro:
 *   `EyebrowPill` «Enero 2027» (rojo maleta) → H3 `mailclub.title` → `mailclub.body`
 *   → **dos botones secundarios**: lista de espera por WhatsApp (`section="mailclub"`)
 *   y DM de Instagram (`instagramUrl`).
 *
 * Reglas que no se pueden romper:
 * - **Es captura, no venta:** ningún botón dice «comprar» y `mailclub.ctaAria` aclara
 *   «no es una compra». Sin formularios, sin campo de email, sin pop-up (§1.5).
 * - El par de etiquetas `buy.eyebrow` («Diciembre 2026») ↔ `mailclub.eyebrow`
 *   («Enero 2027») construye la línea de tiempo: mismo componente, mismo tamaño,
 *   mismo sitio, distinto color (mostaza / rojo).
 * - Contraste: tinta verde sobre crema 7,66:1; la píldora roja se renderiza a 19 px
 *   en Baloo 2 800 para cumplir AA-large (4,48:1).
 * - D-R2-7: los dos botones son secundarios (píldora crema + contorno de garabato),
 *   nunca relleno terracota.
 *
 * Uso: `<MailClub className="lg:col-span-4" />` desde `FooterMailClub`.
 */
import { useLang } from '../i18n/LanguageContext'
import CloudBlob from './ui/CloudBlob'
import EyebrowPill from './ui/EyebrowPill'
import ButtonSecondary from './ui/ButtonSecondary'

export default function MailClub({ className = '' }) {
  const { t, instagramUrl } = useLang()

  return (
    <div className={`relative w-full ${className}`}>
      <CloudBlob frameLoop={18} pad="px-5 py-6 sm:px-6 sm:py-7" className="w-full">
        <div className="flex justify-center">
          <EyebrowPill label={t('mailclub.eyebrow')} tone="rojo" />
        </div>

        <h3
          id="mailclub-title"
          className="mt-4 text-center font-display text-[clamp(1.35rem,5.2vw,1.7rem)] font-bold leading-[1.15] text-tinta"
        >
          {t('mailclub.title')}
        </h3>

        <p className="copy mt-3 text-[20px] leading-[1.45] text-tinta">
          {t('mailclub.body')}
        </p>

        <div className="mt-5 flex flex-col items-stretch gap-3">
          {/* Lista de espera (WhatsApp) — `size="sm"` para que la etiqueta más larga
              (FR «Rejoindre la liste d'attente») quepa en una línea a 375 px. */}
          <ButtonSecondary
            section="mailclub"
            size="sm"
            label={t('mailclub.cta')}
            ariaLabel={t('mailclub.ctaAria')}
            className="w-full"
          />
          {/* Segunda vía: DM de Instagram (misma familia visual, `href` propio). */}
          <ButtonSecondary
            href={instagramUrl}
            size="sm"
            label={t('mailclub.dmCta')}
            ariaLabel={t('mailclub.dmAria')}
            className="w-full"
          />
        </div>
      </CloudBlob>
    </div>
  )
}
