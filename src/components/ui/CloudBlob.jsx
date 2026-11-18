/**
 * CloudBlob — contenedor nube orgánico crema con borde de lápiz terracota.
 *
 * Cómo se dibuja (y por qué no es `border` + `border-radius` a secas):
 * - La silueta se compone con un `border-radius` asimétrico de 8 radios
 *   (`CLOUD_RADII`), nunca un `rounded-lg` simétrico.
 * - El borde es `SquigglyFrame variant="cloud"` con esos MISMOS radios: el marco
 *   es la silueta desplazada hacia fuera, de modo que los bucles abrazan la nube
 *   sin esquinas descuadradas.
 * - El contenedor reserva un anillo calculado con `frameInset` a partir del
 *   ancho exterior: no depende de la altura ni del contenido que ese anillo rodea.
 *   Así el trazo nunca pisa el texto, ni en una tarjeta de 150 px ni en un panel
 *   de 600 px (el anillo se adapta, no hay un valor fijo que se rompa).
 * - Sin sombra difusa: nada de SaaS. Decorativo → `aria-hidden` en el SVG.
 * - `paperFill` (por defecto `true`): el relleno del color de la nube llega hasta
 *   el MISMO trazo del marco, así los bucles se dibujan **sobre el papel** y no
 *   sobre el fondo de la sección (el defecto que se veía en las tarjetas del kit).
 *   La silueta exterior usa los mismos 8 radios desplazados por el anillo, de modo
 *   que el papel y el marco comparten borde.
 *
 * Variantes:
 * - `cloud`: nube para párrafos, tarjetas y nota de empaque.
 * - `pill`:  píldora de una frase (la que exige D-R2-1 para el subtítulo del hero).
 *
 * Uso:
 *   <CloudBlob pad="px-6 py-5"><p>…</p></CloudBlob>
 *   <CloudBlob variant="pill" pad="px-5 py-3"><p>…</p></CloudBlob>
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import SquigglyFrame, { frameInset } from './SquigglyFrame'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* Esquinas: arriba-izq, arriba-der, abajo-der, abajo-izq (x / y). */
export const CLOUD_RADII = {
  rx: [38, 26, 40, 22],
  ry: [30, 40, 26, 36],
}

const CLOUD_BORDER = '38px 26px 40px 22px / 30px 40px 26px 36px'
const TONES = {
  crema: 'bg-crema text-tinta',
  petroleo: 'bg-petroleo text-crema',
  mostaza: 'bg-mostaza text-tinta',
}

export default function CloudBlob({
  children,
  variant = 'cloud',
  tone = 'crema',
  frame = true,
  frameTone = 'terracota',
  frameLoop,
  paperFill = true,
  pad = 'px-6 py-5',
  className = '',
  as: Tag = 'div',
}) {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)

  const isPill = variant === 'pill'
  const loop = frameLoop ?? (isPill ? 11 : 16)
  const strokeWidth = isPill ? 2.6 : 3.9

  useIsomorphicLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return undefined
    const read = () => {
      const next = node.getBoundingClientRect().width
      setWidth((previous) => (Math.abs(previous - next) < 0.5 ? previous : next))
    }
    read()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(read)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // El ancho exterior limita por arriba el lado menor usado para dibujar el marco.
  const ring = isPill || !frame ? 0 : frameInset({ loop, minSide: width, strokeWidth })

  // Silueta de papel: los mismos radios de la nube desplazados por el anillo, para
  // que el relleno llegue exactamente al trazo (marco sobre papel).
  const paperRadius = {
    borderRadius: `${CLOUD_RADII.rx.map((value) => value + ring).join('px ')}px / ${CLOUD_RADII.ry
      .map((value) => value + ring)
      .join('px ')}px`,
  }

  return (
    <Tag ref={containerRef} className={`relative ${className}`}>
      {ring && paperFill ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${TONES[tone] ?? TONES.crema}`}
          style={paperRadius}
        />
      ) : null}
      <div style={ring ? { padding: `${ring}px` } : undefined}>
        <div
          className={`relative ${TONES[tone] ?? TONES.crema} ${pad}`}
          style={{ borderRadius: isPill ? 'var(--radius-pill)' : CLOUD_BORDER }}
        >
          {children}
        </div>
      </div>
      {frame ? (
        <SquigglyFrame
          variant={variant}
          tone={frameTone}
          strokeWidth={strokeWidth}
          loop={loop}
          radii={isPill ? undefined : CLOUD_RADII}
        />
      ) : null}
    </Tag>
  )
}
