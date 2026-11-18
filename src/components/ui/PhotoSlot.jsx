/**
 * PhotoSlot — contenedor de foto real con proporción fija y marcador honesto.
 *
 * Mientras no exista la foto (D9) dibuja un marcador de producción: fondo crema,
 * marco de lápiz discontinuo, el nombre del slot y el ratio exacto. Nunca stock,
 * nunca IA, nunca ilustración genérica. Cuando llegue la imagen:
 *   `src: '/photos/hero-vichito.jpg'` en `src/data/siteConfig.js` (o prop `src`).
 *
 * Proporción fija (`aspect-ratio`) = cero CLS. El hero es la única imagen con
 * `loading="eager"` + `fetchPriority="high"`; el resto va `lazy`.
 *
 * Accesibilidad: con foto, `<img alt={t(altKey)}>`; sin foto, `role="img"` +
 * `aria-label={t(altKey)}`, así el lector de pantalla ya sabe qué foto va ahí.
 *
 * Uso:
 *   <PhotoSlot photoKey="hero" eager />
 *   <PhotoSlot ratio="1/1" labelKey="kit.items.0.title" altKey="kit.items.0.alt" labelMode="short" />
 *   <PhotoSlot ratio="1/1" altKey="kit.items.0.alt" labelMode="ratioOnly" />  // H3 cercano ya lo nombra
 */
import { useLang } from '../../i18n/LanguageContext'
import siteConfig from '../../data/siteConfig'
import SquigglyFrame from './SquigglyFrame'

const RATIOS = {
  '4/5': '4 / 5',
  '3/4': '3 / 4',
  '1/1': '1 / 1',
  '16/9': '16 / 9',
  '16/10': '16 / 10',
  '4/3': '4 / 3',
}

export default function PhotoSlot({
  photoKey = 'hero',
  ratio,
  src,
  labelKey,
  altKey,
  labelMode = 'full',
  frame = true,
  mat = true,
  dashedFrame = false,
  frameLoop = 16,
  eager = false,
  showRatio = true,
  compact = false,
  className = '',
  imgClassName = '',
  fit = 'cover',
}) {
  const { t } = useLang()
  const config = siteConfig.photos?.[photoKey] ?? {}
  const resolvedSrc = src ?? config.src ?? null
  const resolvedRatio = ratio ?? config.ratio ?? '4/5'
  const resolvedLabelKey = labelKey ?? `photo.${photoKey}Label`
  const resolvedAltKey = altKey ?? `photo.${photoKey}Alt`

  const label = t(resolvedLabelKey)
  // Modos del marcador (CRO §9 ítem 12: nunca repetir el título de la tarjeta):
  //   full        → «Foto real: <nombre>» + ratio   (default, slots sueltos)
  //   short       → «Foto real: <nombre>»
  //   prefixRatio → «Foto real:» + ratio            (cuando un H3 cercano ya nombra el objeto)
  //   ratioOnly   → solo ratio
  //   none        → nada
  const showsName = labelMode === 'full' || labelMode === 'short'
  const showsRatio =
    showRatio && (labelMode === 'full' || labelMode === 'prefixRatio' || labelMode === 'ratioOnly')
  const showLabel =
    siteConfig.content.showPhotoLabels &&
    (labelMode === 'full' || labelMode === 'short' || labelMode === 'prefixRatio')

  return (
    <figure className={`relative w-full ${className}`}>
      <div
        className={
          mat
            ? // Paspartú proporcional: ≈ el anillo que dibuja el marco (7 % del lado).
              'relative w-full rounded-[26px] bg-crema p-[clamp(18px,7%,34px)] shadow-[0_3px_0_0_rgba(19,78,53,0.14)]'
            : 'relative w-full rounded-[26px] bg-crema'
        }
      >
        <div
          className={`relative w-full overflow-hidden rounded-[18px] bg-crema ${
            resolvedSrc ? '' : 'paper-dots'
          }`}
          style={{ aspectRatio: RATIOS[resolvedRatio] ?? RATIOS['4/5'] }}
        >
          {resolvedSrc ? (
            <img
              src={resolvedSrc}
              alt={t(resolvedAltKey)}
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : 'auto'}
              decoding={eager ? 'sync' : 'async'}
              className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
            />
          ) : (
            <div
              role="img"
              aria-label={t(resolvedAltKey)}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
                compact ? 'gap-0.5 px-2' : 'gap-1 px-5'
              }`}
            >
              {showLabel ? (
                <p
                  className={`font-body font-semibold whitespace-nowrap text-tinta ${
                    compact ? 'text-[10.5px] leading-none' : 'text-[13px] leading-snug'
                  }`}
                >
                  <span className="font-bold text-tinta">{t('photo.labelPrefix')}</span>
                  {showsName ? ` ${label}` : null}
                </p>
              ) : null}
              {showsRatio ? (
                <span
                  className={`font-display font-bold tracking-[0.18em] text-tinta uppercase ${
                    compact ? 'text-[10px] leading-none' : 'text-[12px]'
                  }`}
                >
                  {resolvedRatio}
                </span>
              ) : null}
            </div>
          )}
        </div>

        {frame ? (
          <SquigglyFrame
            variant="rect"
            tone="terracota"
            strokeWidth={4.2}
            loop={frameLoop}
            dashed={dashedFrame}
          />
        ) : null}
      </div>
    </figure>
  )
}
