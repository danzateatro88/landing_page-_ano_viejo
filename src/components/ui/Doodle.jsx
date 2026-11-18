/**
 * Doodle — estrellita, espiral, subrayado curvo y rayitas dibujadas a mano.
 *
 * Decoración pura: `aria-hidden="true"`, nunca informa ni sustituye un CTA.
 * Reglas del CRO §5.1: máximo 3 por viewport y rotaciones sutiles (−8° a +8°;
 * el sistema artesanal limita a ±2,5° el texto, los doodles pueden ir algo más).
 *
 * Uso típico:
 *   <span className="absolute -top-4 right-2 rotate-6"><Doodle variant="star" tone="mostaza" /></span>
 */

const TONES = {
  terracota: 'var(--color-terracota)',
  mostaza: 'var(--color-mostaza)',
  rojo: 'var(--color-rojo)',
  crema: 'var(--color-crema)',
  tinta: 'var(--color-tinta)',
  oliva: 'var(--color-oliva)',
}

const SHAPES = {
  /* Estrella de 5 puntas con radios desiguales: se ve trazada, no calculada. */
  star: {
    viewBox: '0 0 40 40',
    width: 40,
    height: 40,
    paths: [
      'M20.5 4.2 C21.6 9.6 23 12.9 24.9 14.6 C26.8 16.2 30.4 16.4 36.1 15.9 C31.4 18.9 28.9 21.2 27.7 23.3 C26.4 25.4 26.7 28.9 28.4 34.6 C24.4 30.7 21.7 28.6 19.8 28.6 C17.8 28.6 14.7 30.6 10.1 34.8 C11.9 29.3 12.3 25.9 11.1 23.6 C9.9 21.4 7.1 19 3.4 16.1 C8.8 16.3 12.4 15.9 14.3 14.2 C16.2 12.5 17.6 9.1 18.6 4.1 Z',
    ],
  },
  /* Espiral de resorte: dos vueltas y media hacia dentro. */
  spiral: {
    viewBox: '0 0 40 40',
    width: 40,
    height: 40,
    paths: [
      'M38 19.2 C37.6 27.9 30.8 34.6 22.2 35 C13.6 35.4 6.4 29 5.9 20.4 C5.4 11.9 11.6 4.4 19.9 3.9 C27.6 3.5 34 9.1 34.8 16.5 C35.6 23.6 30.6 29.4 23.4 30.2 C17.1 30.9 11.6 26.4 10.9 20.2 C10.2 14.4 14.2 9.3 20 8.7 C25.2 8.2 29.6 11.9 30.1 17',
    ],
  },
  /* Subrayado curvo: el trazo de dos tiempos que se cae al final. */
  underline: {
    viewBox: '0 0 120 18',
    width: 120,
    height: 18,
    preserve: 'none',
    paths: [
      'M3.5 11.2 C16 4.6 27 15.4 40 9.8 C52 4.6 63 14.6 76 10.4 C89 6.2 101 12.2 116.5 8.4',
      'M12 15.4 C30 11.8 62 16 96 12.6',
    ],
  },
  /* Rayitas: tres trazos cortos con inclinaciones distintas. */
  ticks: {
    viewBox: '0 0 34 16',
    width: 34,
    height: 16,
    paths: ['M2.5 11.5 L8.5 4.5', 'M14 13.2 L17.8 3.2', 'M23.5 12.8 L30.5 6'],
  },
  /* Ondita suelta para rellenar aire cerca de un marco. */
  squiggle: {
    viewBox: '0 0 44 14',
    width: 44,
    height: 14,
    paths: ['M2 8.4 C6 3.4 10 12.4 14 7.6 C18 2.8 22 11.6 26 7.2 C30 2.8 34 11 38 7.6 C40 5.9 41.6 6.2 42.6 7.4'],
  },
}

export default function Doodle({
  variant = 'star',
  tone = 'mostaza',
  size,
  strokeWidth = 2.6,
  className = '',
}) {
  const shape = SHAPES[variant] ?? SHAPES.star
  const width = size ?? shape.width
  const height = size ? (size * shape.height) / shape.width : shape.height

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={width}
      height={height}
      viewBox={shape.viewBox}
      preserveAspectRatio={shape.preserve ?? 'xMidYMid meet'}
      fill="none"
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {shape.paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke={TONES[tone] ?? TONES.terracota}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
