/**
 * SquigglyFrame — marco de bucles CONTINUOS dibujados a mano (SVG, no un borde CSS).
 *
 * Cómo se construye (v3, corrige el defecto de la ola 1):
 * 1. Se toma la silueta del contenedor (rectángulo redondeado, píldora, nube de
 *    esquinas elípticas) muestreada cada ~3 px.
 * 2. Se **remuestrea por longitud de arco** en un número EXACTO de puntos
 *    equidistantes (`resampleRing`) → todas las cuerdas miden lo mismo, también
 *    la de cierre. De ahí salen bucles iguales de los cuatro lados y esquinas que
 *    cierran: antes el muestreo era irregular y el último tramo quedaba corto.
 * 3. Cada tramo se dibuja como **un arco largo de radio constante** (252°–300°):
 *    un solo `path` cerrado, sin `stroke-dasharray`, con el bucles mirando hacia
 *    fuera. El radio se calcula con la cuerda real (`0,62 × cuerda`), así que el
 *    bucle mide ≈ el paso y se lee como un resorte, no como una línea de puntos.
 * 4. El número de puntos sale de `max(3, round(lado / (2,2 × loop)))` por lado
 *    (mínimo global 12), de modo que en cajas estrechas hay pocos bucles grandes
 *    en vez de muchos diminutos.
 *
 * Reglas (CRO §5.1 y checklist ítem 22):
 * - Decorativo: `aria-hidden="true"`, `pointer-events-none`, `focusable="false"`.
 * - `vector-effect="non-scaling-stroke"`: el trazo no engorda ni se estira.
 * - `viewBox` con la caja REAL medida (ResizeObserver), 1 unidad = 1 px CSS, y
 *   `overflow` del propio SVG: no puede salir ningún fragmento fuera de la caja.
 * - `stroke-dasharray` solo si `dashed` es `true` (marcador de foto pendiente).
 *
 * `loop` = **paso entre centros de bucle** (px). Separación real = 2,2 × `loop`;
 * radio del arco ≈ 0,62 × separación ≈ 1,36 × `loop`; diámetro visible ≈ el paso.
 * Valores recomendados 14–20 (radio ≈ 19–27 px).
 *
 * Uso (capa absoluta; deja el anillo que devuelve `frameInset()` libre):
 *   <div className="relative" style={{ padding: frameInset({ loop: 16 }) }}>
 *     <img … />
 *     <SquigglyFrame variant="rect" loop={16} />
 *   </div>
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const TONES = {
  terracota: 'var(--squiggle-stroke)',
  mostaza: 'var(--color-mostaza)',
  rojo: 'var(--color-rojo)',
  oliva: 'var(--color-oliva)',
  crema: 'var(--color-crema)',
  tinta: 'var(--color-tinta)',
}

/** Paso entre bucles (px) para cada variante. */
export const DEFAULT_LOOP = { rect: 16, pill: 12, cloud: 16 }

/** Proporción radio/cuerda: 0,64 → arcos de ~260° (bucles redondos, no arcos). */
const ARC_PER_CHORD = 0.64

/* --------------------------------------------------------------------------
   Geomería de la silueta (polilíneas cerradas, muestreo fino)
   -------------------------------------------------------------------------- */

const TAU = Math.PI * 2

function roundedRectRing(w, h, radius, sample) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2))
  const pts = []
  const HALF = Math.PI / 2

  const line = (x1, y1, x2, y2) => {
    const length = Math.hypot(x2 - x1, y2 - y1)
    const n = Math.max(1, Math.round(length / sample))
    for (let i = 0; i < n; i += 1) {
      const t = i / n
      pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t])
    }
  }

  const arc = (cx, cy, rr, from, to) => {
    const n = Math.max(2, Math.round((Math.abs(to - from) * rr) / sample))
    for (let i = 0; i < n; i += 1) {
      const angle = from + ((to - from) * i) / n
      pts.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr])
    }
  }

  line(r, 0, w - r, 0)
  arc(w - r, r, r, -HALF, 0)
  line(w, r, w, h - r)
  arc(w - r, h - r, r, 0, HALF)
  line(w - r, h, r, h)
  arc(r, h - r, r, HALF, 2 * HALF)
  line(0, h - r, 0, r)
  arc(r, r, r, 2 * HALF, 3 * HALF)
  return pts
}

function ellipticRectRing(w, h, rx, ry, sample) {
  const [rxTL, rxTR, rxBR, rxBL] = rx
  const [ryTL, ryTR, ryBR, ryBL] = ry
  const pts = []
  const HALF = Math.PI / 2

  const line = (x1, y1, x2, y2) => {
    const length = Math.hypot(x2 - x1, y2 - y1)
    const n = Math.max(1, Math.round(length / sample))
    for (let i = 0; i < n; i += 1) {
      const t = i / n
      pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t])
    }
  }

  const arc = (cx, cy, radX, radY, from, to) => {
    const n = Math.max(2, Math.round((Math.abs(to - from) * Math.max(radX, radY)) / sample))
    for (let i = 0; i < n; i += 1) {
      const angle = from + ((to - from) * i) / n
      pts.push([cx + Math.cos(angle) * radX, cy + Math.sin(angle) * radY])
    }
  }

  line(rxTL, 0, w - rxTR, 0)
  arc(w - rxTR, ryTR, rxTR, ryTR, -HALF, 0)
  line(w, ryTR, w, h - ryBR)
  arc(w - rxBR, h - ryBR, rxBR, ryBR, 0, HALF)
  line(w - rxBR, h, rxBL, h)
  arc(rxBL, h - ryBL, rxBL, ryBL, HALF, 2 * HALF)
  line(0, h - ryBL, 0, ryTL)
  arc(rxTL, ryTL, rxTL, ryTL, 2 * HALF, 3 * HALF)
  return pts
}

function blobRing(w, h, sample) {
  const cx = w / 2
  const cy = h / 2
  const rx = w / 2
  const ry = h / 2
  const n = Math.max(24, Math.round((TAU * Math.max(rx, ry)) / sample))
  const pts = []
  for (let i = 0; i < n; i += 1) {
    const t = (i / n) * TAU
    const wobble =
      1 + 0.045 * Math.sin(3 * t + 1.1) + 0.028 * Math.sin(5 * t + 2.3) + 0.016 * Math.cos(7 * t + 0.4)
    pts.push([cx + Math.cos(t) * rx * wobble, cy + Math.sin(t) * ry * wobble])
  }
  return pts
}

/* --------------------------------------------------------------------------
   Remuestreo uniforme y trazado del resorte
   -------------------------------------------------------------------------- */

/** Devuelve exactamente `count` puntos equidistantes sobre la polilínea cerrada. */
function resampleRing(points, count) {
  const clean = []
  for (const point of points) {
    const previous = clean[clean.length - 1]
    if (!previous || Math.hypot(point[0] - previous[0], point[1] - previous[1]) > 0.01) {
      clean.push(point)
    }
  }
  if (clean.length < 8) return []

  const n = clean.length
  const lengths = new Array(n)
  let total = 0
  for (let i = 0; i < n; i += 1) {
    const a = clean[i]
    const b = clean[(i + 1) % n]
    const d = Math.hypot(b[0] - a[0], b[1] - a[1])
    lengths[i] = d
    total += d
  }
  if (total <= 0) return []

  const step = total / count
  const out = []
  let segment = 0
  let consumed = 0
  for (let k = 0; k < count; k += 1) {
    const target = k * step
    while (consumed + lengths[segment] < target && segment < n - 1) {
      consumed += lengths[segment]
      segment += 1
    }
    const segLength = lengths[segment] || 1
    const t = Math.min(1, Math.max(0, (target - consumed) / segLength))
    const a = clean[segment]
    const b = clean[(segment + 1) % n]
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])
  }
  return out
}

/**
 * Temblor «a mano» para el resorte.
 *
 * El resorte geométrico es perfecto: todos los bucles del mismo radio y a la misma
 * distancia. El del kit (y el de las tarjetas impresas) tiene bucles desiguales,
 * un poco torcidos y con el paso irregular. Esto desplaza cada punto del anillo
 * —a lo largo de la curva y en perpendicular— con un PRNG con semilla, así que
 * el dibujo es idéntico en cada render y no rompe la hidratación.
 *
 * `amount` 0 = geometría perfecta · 1 = trazo claramente suelto.
 */
function handTremor(points, pitch, amount, seed = 7) {
  if (!amount || points.length < 12) return points
  const rand = mulberry32(seed)
  const n = points.length
  return points.map((point, index) => {
    const previous = points[(index - 1 + n) % n]
    const next = points[(index + 1) % n]
    const tx = next[0] - previous[0]
    const ty = next[1] - previous[1]
    const length = Math.hypot(tx, ty) || 1
    const ux = tx / length
    const uy = ty / length
    // desplazamientos: el pulso de la mano va y viene, no es ruido blanco
    const along = Math.sin(index * 1.7 + 0.6) * pitch * 0.11 * amount
    const across = Math.sin(index * 2.3 + 1.9) * pitch * 0.13 * amount
    const wobble = (rand() - 0.5) * pitch * 0.05 * amount
    return [
      point[0] + ux * along - uy * (across + wobble),
      point[1] + uy * along + ux * (across + wobble),
    ]
  })
}

function mulberry32(a) {
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Un solo path cerrado de arcos largos de radio constante (los bucles). */
function coilPath(points) {
  if (points.length < 8) return ''
  const round = (value) => Math.round(value * 100) / 100
  const n = points.length
  let d = `M ${round(points[0][0])} ${round(points[0][1])}`
  for (let i = 1; i <= n; i += 1) {
    const a = points[i - 1]
    const b = points[i % n]
    const chord = Math.hypot(b[0] - a[0], b[1] - a[1])
    const radius = Math.max(chord * ARC_PER_CHORD, chord / 2 + 0.4)
    d += ` A ${round(radius)} ${round(radius)} 0 1 1 ${round(b[0])} ${round(b[1])}`
  }
  return d
}

/** Línea ondulada a mano (píldoras): Catmull-Rom con dos armónicos. */
function wavyPath(points, amplitude) {
  const n = points.length
  if (n < 8) return ''

  let accumulated = 0
  const displaced = points.map((point, index) => {
    const previous = points[(index - 1 + n) % n]
    const next = points[(index + 1) % n]
    if (index > 0) {
      const prevPoint = points[index - 1]
      accumulated += Math.hypot(point[0] - prevPoint[0], point[1] - prevPoint[1])
    }
    const tx = next[0] - previous[0]
    const ty = next[1] - previous[1]
    const length = Math.hypot(tx, ty) || 1
    const nx = ty / length
    const ny = -tx / length
    const phase = accumulated / 33
    const offset = amplitude * Math.sin(phase) + amplitude * 0.45 * Math.sin(phase * 2.17 + 1.3)
    return [point[0] + nx * offset, point[1] + ny * offset]
  })

  const round = (value) => Math.round(value * 100) / 100
  const at = (index) => displaced[(index + n) % n]
  let d = `M ${round(displaced[0][0])} ${round(displaced[0][1])}`
  for (let i = 0; i < n; i += 1) {
    const p0 = at(i - 1)
    const p1 = at(i)
    const p2 = at(i + 1)
    const p3 = at(i + 2)
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2[0])} ${round(p2[1])}`
  }
  return d
}

/* --------------------------------------------------------------------------
   Métricas del anillo
   -------------------------------------------------------------------------- */

/**
 * Tamaño EFECTIVO del bucle: la preferencia del consumidor acotada por la caja.
 * El anillo del marco ronda el 7 % del lado menor (≈ 2,4 × loop), así que ni una
 * tarjeta de 150 px lleva bucles de 40 px ni un hero de 500 px bucles de 5 px.
 * Suelo de 7 px para que el trazo siga leyéndose.
 */
export function effectiveLoop(loop = DEFAULT_LOOP.rect, minSide = 0) {
  const cap = Math.min(Math.max(minSide, 0) * 0.029, 26)
  return Math.max(7, Math.min(loop, cap || loop))
}

/** Radio del arco para un paso dado (0,64 × paso, siempre > paso/2). */
function arcRadiusFor(pitch) {
  return Math.max(pitch * ARC_PER_CHORD, pitch / 2 + 0.4)
}

/** Cuánto sobresale el bucle desde la línea base hacia FUERA. */
function bulgeFor(pitch) {
  const radius = arcRadiusFor(pitch)
  return radius + Math.sqrt(Math.max(radius * radius - (pitch / 2) ** 2, 0))
}

/**
 * Aire que hay que reservar alrededor del contenido (px), por variante.
 * `loop` = paso entre bucles; `strokeWidth` = grosor del trazo.
 */
export function frameInset({ loop = DEFAULT_LOOP.rect, minSide = 0, strokeWidth = 3.2 } = {}) {
  const pitch = 2.2 * effectiveLoop(loop, minSide)
  return Math.ceil(bulgeFor(pitch) + strokeWidth / 2 + 2)
}

/** Nº de bucles por lado, con mínimo 3 (regla de legibilidad). */
function loopsPerSide(side, loop) {
  return Math.max(3, Math.round(side / (2.2 * loop)))
}

/**
 * Construye el path del marco para una caja dada.
 * `radii` (solo `cloud`) = esquinas elípticas del contenedor.
 */
export function buildFramePath({
  variant = 'rect',
  width,
  height,
  loop = DEFAULT_LOOP.rect,
  stroke = 'coil',
  radii,
  strokeWidth = 3.2,
  hand = 0.55,
}) {
  if (width < 24 || height < 24) return ''
  const module = effectiveLoop(loop, Math.min(width, height))
  loop = module

  // Píldora con ondulación (los bucles no caben a 44–56 px de alto).
  if (variant === 'pill' && stroke === 'wobble') {
    const inset = 3.4
    const w = width - inset * 2
    const h = height - inset * 2
    if (w < 16 || h < 10) return ''
    const points = resampleRing(roundedRectRing(w, h, h / 2, 3), Math.max(18, Math.round(w / 5)))
    return wavyPath(points.map(([x, y]) => [x + inset, y + inset]), Math.min(2.4, h * 0.05))
  }

  if (variant === 'cloud' && radii) {
    // El contenedor tiene esquinas elípticas: el marco es la misma silueta.
    let inset = frameInset({ loop, strokeWidth })
    let points = []
    let pitch = 2.2 * loop
    for (let pass = 0; pass < 3; pass += 1) {
      const w = width - inset * 2
      const h = height - inset * 2
      if (w < 40 || h < 32) return ''
      const rx = radii.rx.map((value) => Math.max(2, value + inset))
      const ry = radii.ry.map((value) => Math.max(2, value + inset))
      const ring = ellipticRectRing(w, h, rx, ry, 3)
      const perimeter = ringLength(ring)
      const count = Math.max(16, Math.round(perimeter / (2.2 * loop)))
      points = resampleRing(ring, count).map(([x, y]) => [x + inset, y + inset])
      pitch = perimeter / count
      inset = Math.ceil(bulgeFor(pitch) + strokeWidth / 2 + 2)
    }
    return coilPath(handTremor(points, pitch, hand))
  }

  if (variant === 'cloud') {
    // Nube genérica (sin contenedor al que alinear).
    let inset = frameInset({ loop, strokeWidth })
    let points = []
    let pitch = 2.2 * loop
    for (let pass = 0; pass < 3; pass += 1) {
      const w = width - inset * 2
      const h = height - inset * 2
      if (w < 40 || h < 32) return ''
      const ring = blobRing(w, h, 3)
      const perimeter = ringLength(ring)
      const count = Math.max(16, Math.round(perimeter / (2.2 * loop)))
      points = resampleRing(ring, count).map(([x, y]) => [x + inset, y + inset])
      pitch = perimeter / count
      inset = Math.ceil(bulgeFor(pitch) + strokeWidth / 2 + 2)
    }
    return coilPath(handTremor(points, pitch, hand))
  }

  // rect (y fallback de pill con bucles)
  let inset = frameInset({ loop, strokeWidth })
  let points = []
  let pitch = 2.2 * loop
  for (let pass = 0; pass < 3; pass += 1) {
    const w = width - inset * 2
    const h = height - inset * 2
    if (w < 32 || h < 32) return ''
    const corner = Math.max(16, Math.min(Math.min(w, h) * 0.12, pitch * 1.3))
    const ring = roundedRectRing(w, h, variant === 'pill' ? h / 2 : corner, 3)
    const perimeter = ringLength(ring)
    // Regla de legibilidad: `max(3, round(lado / (2,2 × loop)))` bucles por lado
    // + uno por esquina, para que los vértices cierren con su propio bucle.
    const count = 2 * loopsPerSide(w, loop) + 2 * loopsPerSide(h, loop) + 4
    points = resampleRing(ring, count).map(([x, y]) => [x + inset, y + inset])
    pitch = perimeter / count
    inset = Math.ceil(bulgeFor(pitch) + strokeWidth / 2 + 2)
  }
  return coilPath(handTremor(points, pitch, hand))
}

function ringLength(points) {
  const n = points.length
  let total = 0
  for (let i = 0; i < n; i += 1) {
    const a = points[i]
    const b = points[(i + 1) % n]
    total += Math.hypot(b[0] - a[0], b[1] - a[1])
  }
  return total
}

/* --------------------------------------------------------------------------
   Componente
   -------------------------------------------------------------------------- */

export default function SquigglyFrame({
  variant = 'rect',
  tone = 'terracota',
  strokeWidth = 3.5,
  loop,
  stroke,
  radii,
  dashed = false,
  hand = 0.55,
  className = '',
}) {
  const boxRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useIsomorphicLayoutEffect(() => {
    const node = boxRef.current
    if (!node) return undefined

    const read = () => {
      const { width, height } = node.getBoundingClientRect()
      setSize((previous) =>
        Math.abs(previous.width - width) < 0.5 && Math.abs(previous.height - height) < 0.5
          ? previous
          : { width, height },
      )
    }

    read()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(read)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const loopSize = loop ?? DEFAULT_LOOP[variant] ?? DEFAULT_LOOP.rect
  // Las píldoras usan ondulación (a 44–56 px de alto no caben bucles legibles).
  const strokeKind = stroke ?? (variant === 'pill' ? 'wobble' : 'coil')
  const path = buildFramePath({
    variant,
    width: size.width,
    height: size.height,
    loop: loopSize,
    stroke: strokeKind,
    radii,
    strokeWidth,
    hand,
  })

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
    >
      {path ? (
        <svg
          className="absolute inset-0 h-full w-full overflow-hidden"
          viewBox={`0 0 ${size.width.toFixed(2)} ${size.height.toFixed(2)}`}
          preserveAspectRatio="none"
          fill="none"
          focusable="false"
          aria-hidden="true"
        >
          <path
            d={path}
            stroke={TONES[tone] ?? TONES.terracota}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={dashed ? `${strokeWidth * 1.6} ${strokeWidth * 2.4}` : undefined}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
    </div>
  )
}
