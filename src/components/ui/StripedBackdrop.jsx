/**
 * StripedBackdrop — rayas verticales anchas petróleo/crema con textura de papel.
 *
 * Reglas (CRO §5.1, ítem 3 del checklist):
 * - Franjas de 26–56 px, con inclinación mínima (88,6°) para que no parezcan una
 *   caja de CSS: los bordes nunca son perfectamente rectos.
 * - Capa de textura: trama de puntos CSS al ~4,5 %, sin binarios ni `feTurbulence`.
 * - Todas las capas decorativas van `aria-hidden` y `pointer-events-none`.
 * - NUNCA pone texto: el contenido va en un panel crema sólido encima (C3/ítem 20).
 *
 * Uso:
 *   <StripedBackdrop frame><div className="bg-crema …">…</div></StripedBackdrop>
 */
import SquigglyFrame from './SquigglyFrame'

export default function StripedBackdrop({
  children,
  frame = false,
  frameLoop = 18,
  className = '',
}) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* Rayas: paradas duras (sin degradado de color). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(88.6deg, #1B7A63 0 28px, #F4E2CD 28px 56px)',
          backgroundSize: '100% 100%',
        }}
      />

      {/* Textura de papel sobre las rayas (trama CSS, 4,5 % de tinta). */}
      <div
        aria-hidden="true"
        className="paper-dots pointer-events-none absolute inset-0 opacity-90"
      />

      {frame ? <SquigglyFrame variant="rect" tone="terracota" loop={frameLoop} /> : null}

      <div className="relative">{children}</div>
    </div>
  )
}
