/**
 * Selector de idioma `ES | EN | FR` — píldora crema, nunca un `<select>`.
 *
 * Accesibilidad
 * - `role="group"` + `aria-label` con la cadena aprobada `nav.langGroupAria`
 *   («Elegir idioma» / «Choose language» / «Choisir la langue», 02-copys.md §5.2).
 *   Nota: el contrato de la ola 1 citaba `a11y.languageSwitch`, clave que **no**
 *   existe en el diccionario aprobado (el documento solo define `a11y.skip` para
 *   este grupo). Se usa la clave canónica para no inventar la 110.ª cadena.
 * - Cada opción es un `<button type="button">` con `aria-pressed`, `lang` propio y
 *   `aria-label` completo (`nav.langEsAria` / `nav.langEnAria` / `nav.langFrAria`).
 * - El estado activo lo comunica `aria-pressed` + peso 800 + contorno terracota;
 *   no se añade texto extra («actual», «sel.»).
 *
 * Medidas (condición C4: logo + ES|EN|FR + CTA en una fila a 375 px)
 * - Ancho real del grupo: **132 px** = 3 × 44 px (`h-11 w-11`), sin padding y sin
 *   gap; el `outline` y el `border` viven dentro de la caja (`box-sizing:
 *   border-box`) o fuera del flujo (`outline`), así que no suman ancho.
 *   Comprobado con la aritmética de clases: 3 × 44 = 132 ≤ 132.
 * - Objetivo táctil: 44 × 44 px por opción (WCAG 2.5.5).
 * - Tipografía compacta: Nunito 600 a 13 px (14 px desde `sm`), `leading-none`.
 *
 * Contraste: etiqueta de tinta `#134E35` sobre crema `#F4E2CD` = 7,66:1.
 * Foco visible: anillo mostaza `#E3C93C` de 3 px con 2 px de separación + hairline
 * tinta interior, para que se lea tanto sobre petróleo como sobre crema.
 * `prefers-reduced-motion`: se anula cualquier transición.
 */
import { useLang } from '../i18n/LanguageContext'

const OPTIONS = [
  { code: 'es', labelKey: 'nav.langEs', ariaKey: 'nav.langEsAria' },
  { code: 'en', labelKey: 'nav.langEn', ariaKey: 'nav.langEnAria' },
  { code: 'fr', labelKey: 'nav.langFr', ariaKey: 'nav.langFrAria' },
]

export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang()

  return (
    <div
      role="group"
      aria-label={t('nav.langGroupAria')}
      className={[
        // ancho total fijo: 3 × 44 px = 132 px (C4)
        'inline-flex shrink-0 items-center rounded-full',
        'bg-[#F4E2CD] font-[Nunito] text-[13px] leading-none text-[#134E35]',
        'outline outline-[1.5px] outline-[#F04E0C] sm:text-[14px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {OPTIONS.map(({ code, labelKey, ariaKey }) => {
        const isActive = lang === code
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-label={t(ariaKey)}
            aria-pressed={isActive}
            onClick={() => setLang(code)}
            className={[
              // caja de 44 × 44 px; el borde va dentro (border-box) y no altera el ancho
              'inline-flex h-11 w-11 shrink-0 items-center justify-center',
              'rounded-none border-2 border-transparent',
              'first:rounded-l-full last:rounded-r-full',
              // Foco legible sobre crema: anillo de tinta 3 px (7,66:1) + halo
              // mostaza por fuera (visible sobre petróleo). Mismo patrón que el
              // `:focus-visible` global de `index.css`.
              'focus-visible:z-10 focus-visible:outline focus-visible:outline-[3px]',
              'focus-visible:outline-offset-3 focus-visible:outline-[#134E35]',
              'focus-visible:shadow-[0_0_0_6px_#E3C93C]',
              'motion-safe:transition-colors',
              'motion-reduce:transition-none',
              isActive
                ? 'cursor-default border-[#F04E0C] font-[800]'
                : 'cursor-pointer font-[600] hover:bg-[#E3C93C]/30',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {t(labelKey)}
          </button>
        )
      })}
    </div>
  )
}
