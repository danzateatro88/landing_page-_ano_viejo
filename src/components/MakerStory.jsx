/**
 * MakerStory — bloque 6, sub-bloque A · «Hola, soy Victoria» (CRO §2.7).
 *
 * Contenido: foto real de Victoria en su taller (`PhotoSlot` ratio `4/5`) + H2
 * `victoria.title` + **las dos líneas oficiales** (`victoria.line1`, `victoria.line2`)
 * + el enlace terciario a WhatsApp (`section="victoria"`). Nada más: sin biografía
 * inventada, sin años de experiencia, sin cifras (regla de oro del copy).
 *
 * Contraste (§8.1): el H2 es crema sobre petróleo a ≥ 24 px (AA-large ✔); el cuerpo
 * **nunca** va crema de 17 px sobre petróleo, así que las dos líneas viven dentro de
 * una tarjeta crema sólida con texto de tinta (7,66:1). Es el mismo recurso que el
 * panel de Comprar: contenedor crema + esquinas de nube + sombra dura de sticker.
 *
 * El componente es una sola pieza de retícula (foto + texto) para que el bloque 6 la
 * coloque en sus columnas: en `md` reparte 5/7 dentro de sí misma.
 *
 * Uso: `<MakerStory className="lg:col-span-8" />` desde `FooterMailClub`.
 */
import { useLang } from '../i18n/LanguageContext'
import PhotoSlot from './ui/PhotoSlot'
import SectionHeading from './ui/SectionHeading'
import WhatsAppLink from './ui/WhatsAppLink'
import Doodle from './ui/Doodle'

const CARD_RADII = { borderRadius: '30px 22px 32px 20px / 24px 30px 22px 28px' }

export default function MakerStory({ className = '' }) {
  const { t } = useLang()

  return (
    <div
      className={`grid grid-cols-1 items-center gap-7 md:grid-cols-12 md:gap-8 ${className}`}
    >
      {/* Retrato de taller: proporción vertical 4/5 igual en 375/768/1280. */}
      <div className="relative md:col-span-5">
        <PhotoSlot photoKey="victoria" ratio="4/5" fit="contain" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-3 -left-2 hidden rotate-[-7deg] sm:block"
        >
          <Doodle variant="ticks" tone="mostaza" size={34} strokeWidth={2.4} />
        </span>
      </div>

      <div className="relative md:col-span-7">
        <SectionHeading id="victoria-title" as="h2" tone="light" size="lg">
          {t('victoria.title')}
        </SectionHeading>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 right-0 rotate-[7deg] sm:-top-5 sm:right-4"
        >
          <Doodle variant="star" tone="mostaza" size={26} />
        </span>

        {/* Las dos líneas oficiales sobre crema: tinta verde 7,66:1, nunca crema
            pequeña sobre petróleo. */}
        <div
          className="paper-dots mt-5 bg-crema px-5 py-5 text-tinta shadow-[5px_5px_0_0_#134E35] sm:px-6 sm:py-6"
          style={CARD_RADII}
        >
          <p className="copy text-[21px] leading-[1.4] text-tinta">
            {t('victoria.line1')}
          </p>
          <p className="copy mt-2 text-[21px] leading-[1.4] text-tinta">
            {t('victoria.line2')}
          </p>

          {/* CTA terciario: enlace con subrayado curvo terracota (nunca relleno). */}
          <WhatsAppLink
            section="victoria"
            ariaLabel={t('victoria.ctaAria')}
            className="mt-3 inline-flex min-h-[44px] items-center font-body text-[16px] font-bold text-tinta underline decoration-terracota decoration-2 decoration-wavy underline-offset-[6px]"
          >
            {t('victoria.cta')}
          </WhatsAppLink>
        </div>
      </div>
    </div>
  )
}
