/**
 * KitCard — bloque 3 · una nube de papel crema con el borde de garabato dibujado
 * **encima del papel** (M3 de la Puerta 2, como en el boceto IMG_0314).
 *
 * Anatomía (de arriba abajo): foto montada sobre una lámina crema con sombra dura →
 * H3 con el nombre del ítem → **una sola línea** de copy (`kit.items[n].line`).
 *
 * Cómo se consigue el marco sobre el papel (M3):
 * - `CloudBlob` pinta desde la Puerta 2 su silueta de papel (`paperFill`, activo por
 *   defecto) con los mismos 8 radios desplazados por el anillo: el relleno crema llega
 *   hasta el trazo y los bucles quedan **encima del papel**, no sobre el petróleo. La
 *   tarjeta no necesita ningún envoltorio propio.
 * - `pad="px-3 pt-3 pb-6 sm:p-4 sm:pb-6"`: 16 px de aire entre el contenido y la línea de bucles, el mínimo que
 *   exige el acta para que el trazo no pise texto ni foto.
 * - `frameLoop={8}`: bucles finos de lápiz (los del boceto), sin el anillo de 41 px
 *   que dejaba la foto en 120 px de los 281 de la columna.
 * - `mat={false}` + montaje propio: el paspartú por defecto de `PhotoSlot` (`p-6`) se
 *   comía 48 px más de ancho. El montaje son 4 px y una sombra dura de 3 px.
 * - `frame={false}` en el `PhotoSlot`: el único garabato es el de la nube; nunca dos
 *   marcos anidados (CRO §5.1).
 * - `mismo alto de tarjeta en la retícula` (CRO §5.1): la tarjeta crece por dentro
 *   (flex) y las nubes de una fila quedan a la misma altura.
 * - Foto `4/3` por debajo de `sm` y `1/1` desde `sm` (M2): el bloque medía 4.130 px a
 *   375. `PhotoSlot` pinta la proporción en línea, así que el tramo se resuelve con
 *   `matchMedia` — sin duplicar el `PhotoSlot` ni el texto alternativo.
 * - Cero textos literales: todo por `t()`.
 *
 * Uso (lo hace `KitContents`, que recorre el diccionario):
 *   <KitCard index={0} />
 */
import { useSyncExternalStore } from 'react'

import { useLang } from '../../i18n/LanguageContext'
import siteConfig from '../../data/siteConfig'
import CloudBlob from './CloudBlob'
import PhotoSlot from './PhotoSlot'

/* La foto va apaisada (4/3) mientras la retícula es de 2 columnas —es decir,
   hasta 1023 px— y solo pasa a cuadrada (1/1) cuando son 4 columnas en `lg`.
   Con 1/1 a 768 px la foto medía 340 px de alto y el bloque crecía a 2.379 px. */
const WIDE_GRID_QUERY = '(min-width: 1024px)'

function subscribeWide(onChange) {
  const media = window.matchMedia(WIDE_GRID_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const readWide = () => window.matchMedia(WIDE_GRID_QUERY).matches

/** `true` desde `lg` (1024 px). Sin parpadeo: se lee antes del primer pintado. */
function useWideGrid() {
  return useSyncExternalStore(subscribeWide, readWide, () => false)
}

/**
 * Foto real de la pieza `index` (0–7), tomada de `siteConfig.photos.kitItems`.
 * Cada entrada es `{ src, fit }`: `cover` recorta (fotos de producto),
 * `contain` muestra la pieza entera sobre el papel (ilustraciones con alfa).
 */
const itemForIndex = (index) => siteConfig.photos?.kitItems?.[index] ?? null

export default function KitCard({ index = 0, className = '' }) {
  const { t } = useLang()
  const wideGrid = useWideGrid()
  const titleKey = `kit.items.${index}.title`
  const lineKey = `kit.items.${index}.line`
  const altKey = `kit.items.${index}.alt`

  return (
    <CloudBlob
      as="article"
      pad="px-3 pt-3 pb-6 sm:p-4 sm:pb-6"
      frameLoop={8}
      className={`flex flex-col ${className}`}
    >
      {/* Montaje de la foto: 4 px de crema y sombra dura (efecto sticker). */}
      <div className="rounded-[16px] bg-crema p-1 shadow-[0_2px_0_0_rgba(19,78,53,0.16)] sm:rounded-[20px] sm:shadow-[0_3px_0_0_rgba(19,78,53,0.16)]">
        <PhotoSlot
          photoKey="kit"
          src={itemForIndex(index)?.src ?? null}
          fit={itemForIndex(index)?.fit ?? 'cover'}
          ratio={wideGrid ? '1/1' : '4/3'}
          labelKey={titleKey}
          altKey={altKey}
          labelMode="prefixRatio"
          compact
          frame={false}
          mat={false}
          frameLoop={8}
        />
      </div>

      <div className="pt-1 text-center sm:pt-1.5">
        <h3 className="font-display text-[clamp(0.9rem,3.7vw,1.2rem)] font-bold leading-[1.1] text-tinta">
          {t(titleKey)}
        </h3>
        <p className="copy balanced-copy mt-1 text-[15.5px] leading-[1.2] text-tinta sm:mt-1.5 sm:text-[18px] sm:leading-[1.3]">
          {t(lineKey)}
        </p>
      </div>
    </CloudBlob>
  )
}
