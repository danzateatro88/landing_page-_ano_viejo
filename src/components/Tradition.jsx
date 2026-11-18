/**
 * Tradition — bloque 2 · « La tradición » (fondo crema, zona de respiro).
 *
 * Es el único bloque de la página donde **manda la palabra**: el párrafo oficial
 * de Victoria (texto literal, sin tocar una coma) es el protagonista y todo lo
 * demás se aparta. Sin CTA (CRO §2.3: aquí no se vende, se explica).
 *
 * Composición: H2 centrado con subrayado curvo + estrellita → párrafo dentro de una
 * nube crema con borde de garabato terracota (`CloudBlob`), a ancho de lectura
 * cómodo (≤ 68 caracteres por línea en escritorio) y Nunito 400 a 17–18 px sobre
 * de tinta verde (7,66:1, AAA).
 *
 * Detalles:
 * - Ningún texto directo sobre crema salvo el propio contenido (tinta).
 * - Los dos doodles van `aria-hidden`: decoración, nunca información.
 * - Sin foto propia: con las fotos reales aún pendientes (D9), un `3/4` vacío sería
 *   el elemento más pesado de un bloque que debe latir por el texto. El hueco de la
 *   segunda toma del Vichito queda reservado por configuración (`siteConfig.photos`).
 */
import { useLang } from '../i18n/LanguageContext'
import CloudBlob from './ui/CloudBlob'
import Doodle from './ui/Doodle'
import SectionHeading from './ui/SectionHeading'

export default function Tradition() {
  const { t } = useLang()

  return (
    <section
      id="tradicion"
      aria-labelledby="tradicion-title"
      className="paper-dots relative bg-crema"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[128px]">
        <div className="relative mx-auto w-fit max-w-full">
          <SectionHeading id="tradicion-title" tone="ink" size="lg" align="center">
            {t('tradition.title')}
          </SectionHeading>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.55em] left-0 w-full"
          >
            <Doodle
              variant="underline"
              tone="terracota"
              size={120}
              strokeWidth={2.4}
              className="w-full"
            />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 -right-5 hidden rotate-[8deg] sm:block sm:-right-8"
          >
            <Doodle variant="star" tone="mostaza" size={26} />
          </span>
        </div>

        <div className="mt-9 flex justify-center md:mt-12">
          <CloudBlob
            className="w-full max-w-[39rem]"
            pad="px-4 py-6 sm:px-9 sm:py-8"
            frameLoop={19}
          >
            <p className="copy mx-auto max-w-[54ch] text-[21px] leading-[1.55] text-tinta md:text-[24px]">
              {t('tradition.body')}
            </p>
          </CloudBlob>
        </div>
      </div>
    </section>
  )
}
