/**
 * EyebrowPill — etiqueta funcional de temporada («Diciembre 2026», «Enero 2027»).
 *
 * Máximo una por bloque y nunca como sustituto de un H2. Contrastes verificados:
 * - `mostaza`: tinta verde sobre mostaza = 5,85:1 (AA y AAA a 15 px).
 * - `rojo`   : crema sobre rojo = 4,48:1 → solo texto grande AA (≥ 18,66 px bold),
 *              por eso este tono se renderiza a 19 px en Baloo 2 800.
 * - `crema`  : tinta verde sobre crema = 7,66:1.
 *
 * Uso:
 *   <EyebrowPill tone="mostaza" label={t('buy.eyebrow')} />
 */
const TONES = {
  mostaza: 'bg-mostaza text-tinta text-[15px]',
  rojo: 'bg-rojo text-crema text-[19px]',
  crema: 'bg-crema text-tinta text-[15px]',
}

export default function EyebrowPill({ label, tone = 'mostaza', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3.5 py-1 font-display font-extrabold leading-none tracking-[0.04em] shadow-[2px_2px_0_0_rgba(19,78,53,0.35)] ${
        TONES[tone] ?? TONES.mostaza
      } ${className}`}
    >
      {label}
    </span>
  )
}
