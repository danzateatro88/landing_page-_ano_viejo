/**
 * StepCard — bloque 4 · un paso del ritual en tarjeta nube crema.
 *
 * Anatomía: número hecho a mano (círculo de lápiz mostaza con doble trazo
 * terracota) → H3 con el verbo del paso → **una sola línea** de cuerpo
 * (`how.items[n].line`), máximo 3 líneas a 375 px (D-R2-6).
 *
 * Accesibilidad: el número es un adorno (el orden real lo da el `<ol>` de
 * `HowItWorks`), así que el SVG va `aria-hidden`. El texto del paso se anuncia
 * por el H3 + la línea. Contraste del número: tinta verde sobre mostaza = 5,85:1.
 * El número se pinta con `{index + 1}`, no es copy: no hay texto literal.
 *
 * Uso (lo hace `HowItWorks`, que recorre el diccionario):
 *   <StepCard index={0} />
 */
import { useLang } from '../../i18n/LanguageContext'
import CloudBlob from './CloudBlob'

/** Círculo de garabato con el número del paso (decorativo). */
function StepBadge({ value }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[52px] w-[52px] items-center justify-center"
    >
      <svg
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M28.4 3.6 C41.8 3.2 52.9 13.6 52.5 27.4 C52.1 41.4 41.6 52.7 27.5 52.5 C13.6 52.3 3.4 41.2 3.8 27.6 C4.2 14.2 15.4 4 28.4 3.6 Z"
          fill="var(--color-mostaza)"
        />
        <path
          d="M28.4 3.6 C41.8 3.2 52.9 13.6 52.5 27.4 C52.1 41.4 41.6 52.7 27.5 52.5 C13.6 52.3 3.4 41.2 3.8 27.6 C4.2 14.2 15.4 4 28.4 3.6"
          stroke="var(--color-terracota)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M27.2 6.9 C39.4 6.5 49.2 15.2 49.1 27.6"
          stroke="var(--color-terracota)"
          strokeWidth="1.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative font-display text-[23px] font-extrabold leading-none text-tinta">
        {value}
      </span>
    </span>
  )
}

export default function StepCard({ index = 0, className = '' }) {
  const { t } = useLang()
  const titleKey = `how.items.${index}.title`
  const lineKey = `how.items.${index}.line`

  return (
    <CloudBlob
      as="article"
      pad="px-6 py-7 sm:px-7 sm:py-8"
      frameLoop={12}
      className={`flex flex-col [&>div]:grow [&>div>div]:h-full ${className}`}
    >
      {/* De 375 a 1279 el paso ocupa todo el ancho: número a la izquierda y texto a la
          derecha, para no dejar media nube vacía. A partir de 1280 la retícula pasa a
          tres columnas y el paso vuelve a apilarse (número arriba). */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 xl:flex-col xl:items-start xl:gap-4">
        <StepBadge value={index + 1} />
        <div className="md:flex-1 xl:flex-none">
          <h3 className="font-display text-[clamp(1.35rem,5.4vw,1.6rem)] font-bold leading-tight text-tinta">
            {t(titleKey)}
          </h3>
          <p className="copy mt-2 text-[20px] leading-[1.35] text-tinta md:text-[21px]">
            {t(lineKey)}
          </p>
        </div>
      </div>
    </CloudBlob>
  )
}
