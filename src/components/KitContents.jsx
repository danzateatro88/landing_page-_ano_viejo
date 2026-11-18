/**
 * KitContents — bloque 3 · « Qué trae el kit » (fondo petróleo).
 *
 * Objetivo (CRO §2.4): desactivar «¿me faltará algo?». El inventario ES el
 * argumento de valor, así que la retícula es generosa y nunca un carrusel.
 *
 * Composición:
 *   H2 → 4 nubes · CTA secundario (m13) · 4 nubes · nota de empaque · CTA secundario
 *
 * Decisiones que se ven en el código:
 * - Retícula 1 / 2 / 4 columnas (375 / 768 / 1280): las nubes de una misma fila
 *   comparten alto (CRO §5.1) y el marco de garabato nunca queda por debajo de su
 *   relleno crema gracias al crecimiento interno de `KitCard`.
 * - El CTA del kit sigue apareciendo **dos veces** en el DOM (mismo botón, misma
 *   clave `wa.kit`, ambas secundarias por D-R2-7), pero el intermedio (3a) se oculta a
 *   partir de `lg`: en escritorio el 4×2 se lee de un tirón y el corte partía la
 *   retícula en dos mitades (condición C6). Por debajo de `lg` —columna única o dos
 *   columnas— el bloque mide más de 2.000 px y la duda nace exactamente ahí.
 * - Cero datos duplicados: `useLang().t()` resuelve cadenas y las ocho entradas se
 *   recorren desde el propio diccionario (los textos no se copian aquí).
 * - Nada de texto directo sobre petróleo salvo el H2 (≥ 27 px, AA-large): cada
 *   ítem vive dentro de su nube crema con texto de tinta (7,66:1).
 */
import { useLang } from '../i18n/LanguageContext'
import { dicts, FALLBACK_LANG } from '../i18n/translations'
import siteConfig from '../data/siteConfig'
import SectionHeading from './ui/SectionHeading'
import ButtonSecondary from './ui/ButtonSecondary'
import CloudBlob from './ui/CloudBlob'
import Doodle from './ui/Doodle'
import KitCard from './ui/KitCard'

/* Retícula: **2 tarjetas por fila en móvil** (pedido de Victoria, 16 nov 2026: al
   hacer scroll quiere ver los dos cuadros, no uno), 2 en tableta y 4 en escritorio.
   Mismo contenedor y mismo gap ⇒ las columnas quedan alineadas de la fila 1 a la 2.
   Sin `items-start`: las tarjetas de una fila comparten alto (CRO §5.1). */
const GRID =
  'grid grid-cols-2 items-start gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-4 lg:items-stretch'

/* Desfase de collage: 2 de las 8 nubes bajan 8 px en escritorio (CRO §3.3). */
const OFFSETS = ['', 'lg:translate-y-2', '', '', '', '', 'lg:translate-y-2', '']

/* Papel picado: rectángulos rojos decorativos (`aria-hidden`). Nunca una foto. */
const CONFETTI = [
  { w: 9, h: 4, rotate: -18 },
  { w: 6, h: 6, rotate: 12 },
  { w: 11, h: 3, rotate: 4 },
  { w: 5, h: 5, rotate: -8 },
  { w: 8, h: 4, rotate: 22 },
  { w: 6, h: 3, rotate: -4 },
  { w: 10, h: 4, rotate: 14 },
  { w: 5, h: 5, rotate: -24 },
  { w: 8, h: 3, rotate: 6 },
]

function Confetti() {
  return (
    <span aria-hidden="true" className="flex items-end justify-center gap-1.5">
      {CONFETTI.map((bit, index) => (
        <span
          key={`${bit.w}-${bit.h}-${index}`}
          className="bg-rojo"
          style={{
            width: `${bit.w}px`,
            height: `${bit.h}px`,
            transform: `rotate(${bit.rotate}deg)`,
            borderRadius: '1px',
          }}
        />
      ))}
    </span>
  )
}

export default function KitContents() {
  const { lang, t } = useLang()

  /* Los ocho ítems vienen del diccionario (no se duplica ninguna cadena aquí). */
  const dict = dicts[lang] ?? dicts[FALLBACK_LANG]
  const items = dict?.kit?.items ?? dicts[FALLBACK_LANG].kit.items
  const indexes = items.map((_, index) => index)
  const firstRow = indexes.slice(0, 4)
  const secondRow = indexes.slice(4)

  const kitCta = (
    <ButtonSecondary
      section="kit"
      size="md"
      label={t('kit.cta')}
      ariaLabel={t('kit.ctaAria')}
    />
  )

  return (
    <section
      id="kit"
      aria-labelledby="kit-title"
      className="paper-dots-light relative overflow-x-clip bg-petroleo"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 md:py-20 lg:px-6 lg:py-[112px]">
        {/* H2 sobre petróleo: único texto fuera de nube, y a tamaño AA-large. */}
        <div className="relative mx-auto w-fit max-w-full px-4 text-center">
          <SectionHeading id="kit-title" size="lg" align="center">
            {t('kit.title')}
          </SectionHeading>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.55em] left-0 w-full"
          >
            <Doodle
              variant="underline"
              tone="mostaza"
              size={120}
              strokeWidth={2.4}
              className="w-full"
            />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 -right-5 rotate-[9deg] sm:-right-7"
          >
            <Doodle variant="star" tone="mostaza" size={24} />
          </span>
        </div>

        {/* Fila 1 del inventario (ítems 1–4) */}
        <div className={`mt-7 ${GRID} md:mt-14`}>
          {firstRow.map((index) => (
            <KitCard key={index} index={index} className={OFFSETS[index]} />
          ))}
        </div>

        {/* Sin CTA intermedio: Victoria pidió retirarlo (17 nov 2026) para que el
            inventario se lea de corrido y no se corte a la mitad. Queda el CTA de
            cierre, que sigue visible en todos los anchos. */}
        {/* Fila 2 del inventario (ítems 5–8): mismas columnas que la fila 1 */}
        <div className={`mt-3 ${GRID} md:mt-8`}>
          {secondRow.map((index) => (
            <KitCard key={index} index={index} className={OFFSETS[index]} />
          ))}
        </div>

        {/* Nota de empaque: tira de texto con papel picado, sin foto inventada */}
        {siteConfig.content.showPackagingNote ? (
          <div className="mt-6 flex justify-center md:mt-14">
            <CloudBlob
              className="w-full max-w-[34rem]"
              pad="px-6 py-5 sm:px-8 sm:py-6"
              frameLoop={24}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <Confetti />
                <p className="copy text-[17px] leading-snug text-tinta sm:text-[18px]">
                  {t('kit.packagingNote')}
                </p>
              </div>
            </CloudBlob>
          </div>
        ) : null}

        {/* CTA de cierre del bloque — el único del inventario desde el 17 nov 2026 */}
        <div className="mt-7 flex justify-center md:mt-14">{kitCta}</div>
      </div>
    </section>
  )
}
