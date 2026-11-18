/**
 * HowItWorks — bloque 4 · « Cómo funciona » (fondo crema con trama de papel).
 *
 * Objetivo (CRO §2.5): quitar el miedo a «no saber hacerlo» con dos pasos y ya.
 * El 19 de noviembre de 2026 Victoria retiró el paso intermedio («Arma»): escribir y
 * quemar son el ritual; armar el muñeco va explicado en la tarjeta del kit.
 * Los textos oficiales llegan íntegros desde el diccionario: aquí no se recorta nada.
 *
 * Composición: H2 → 2 pasos (`<ol>`: el orden es semántico, no decorativo) →
 * CTA secundario `wa.steps` centrado. Ningún relleno terracota (D-R2-7).
 *
 * Detalles:
 * - `<ol>` + `<li>` dan la secuencia al lector de pantalla; el número de la tarjeta
 *   es decorativo y va `aria-hidden`.
 * - Las dos nubes comparten alto de fila (`StepCard` crece por dentro): el marco de
 *   garabato nunca queda por debajo de su relleno crema.
 * - Doodles de unión (rayitas) solo entre pasos y solo en escritorio; en móvil se
 *   conserva un solo doodle de titular (máx. 2 por viewport, CRO §7).
 * - Cero textos literales: todo por `t()`; las tres entradas se recorren desde el
 *   diccionario, sin duplicar datos en el componente.
 */
import { useLang } from '../i18n/LanguageContext'
import { dicts, FALLBACK_LANG } from '../i18n/translations'
import SectionHeading from './ui/SectionHeading'
import ButtonSecondary from './ui/ButtonSecondary'
import Doodle from './ui/Doodle'
import StepCard from './ui/StepCard'

export default function HowItWorks() {
  const { lang, t } = useLang()

  const dict = dicts[lang] ?? dicts[FALLBACK_LANG]
  const steps = dict?.how?.items ?? dicts[FALLBACK_LANG].how.items
  const indexes = steps.map((_, index) => index)

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="paper-dots relative overflow-x-clip bg-crema"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 md:py-20 lg:px-12 lg:py-[104px]">
        <div className="relative mx-auto w-fit max-w-full px-4 text-center">
          <SectionHeading id="como-funciona-title" tone="ink" size="lg" align="center">
            {t('how.title')}
          </SectionHeading>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 -right-6 rotate-[6deg] sm:-right-9"
          >
            <Doodle variant="spiral" tone="mostaza" size={30} />
          </span>
        </div>

        <ol className="mx-auto mt-10 grid grid-cols-1 gap-8 md:mt-12 md:max-w-[46rem] md:grid-cols-2 xl:gap-10">
          {indexes.map((index) => (
            <li key={index} className="relative flex">
              <StepCard index={index} className="w-full" />
              {index < indexes.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-10 -right-6 hidden rotate-[84deg] xl:block"
                >
                  <Doodle variant="ticks" tone="terracota" size={20} strokeWidth={2.4} />
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center md:mt-12">
          <ButtonSecondary
            section="steps"
            size="md"
            label={t('how.cta')}
            ariaLabel={t('how.ctaAria')}
          />
        </div>
      </div>
    </section>
  )
}
