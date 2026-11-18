/**
 * FooterMailClub — bloque 6 · «Victoria + Mail Club 2027» (CRO §2.7).
 *
 * Se compone de dos sub-bloques, en este orden:
 *   A · `MakerStory`  → «Hola, soy Victoria» (retrato + dos líneas oficiales + enlace)
 *   B · `MailClub`    → «Inscríbete al mail club 2027» (nube crema + lista de espera)
 *
 * Fondo: petróleo con trama de papel (`paper-dots-light`) — el respiro oscuro entre
 * las dos zonas rayadas (bloques 5 y 7). Ningún texto pequeño va directo sobre el
 * petróleo: el H2 va a ≥ 24 px, y todo el cuerpo vive en contenedores crema (§8.1).
 *
 * Retícula (§7): 375 → una columna (retrato → texto → nube → botones apilados);
 * 768 → dentro de `MakerStory` el retrato ocupa 5/12 y el texto 7/12, y la nube del
 * Mail Club pasa debajo a ancho contenido; 1280 → retrato+texto 8/12 y nube 4/12.
 *
 * Es un `section` con `aria-labelledby="victoria-title"` (el H2 vive en MakerStory).
 * El H3 del Mail Club cuelga de ese H2: una sola jerarquía h1 → h2 → h3.
 *
 * Uso: `<FooterMailClub />` (bloque completo, sin props).
 */
import MakerStory from './MakerStory'
import MailClub from './MailClub'
import Doodle from './ui/Doodle'

export default function FooterMailClub() {
  return (
    <section
      id="victoria"
      aria-labelledby="victoria-title"
      className="relative overflow-hidden bg-petroleo"
    >
      {/* Textura de papel sobre el petróleo: trama CSS, cero binarios. */}
      <div aria-hidden="true" className="paper-dots-light pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 pt-14 pb-16 md:gap-14 md:px-8 md:pt-20 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:pt-28 lg:pb-28">
        <MakerStory className="lg:col-span-8" />

        {/* En 375 y 768 la nube se centra con ancho contenido; en 1280 ocupa 4/12. */}
        <MailClub className="mx-auto w-full max-w-[560px] lg:col-span-4 lg:max-w-none" />
      </div>

      {/* Doodles sueltos en el margen petróleo (decorativos, `aria-hidden`). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-5 hidden rotate-[-8deg] sm:block"
      >
        <Doodle variant="spiral" tone="mostaza" size={34} />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-5 hidden rotate-[6deg] sm:block"
      >
        <Doodle variant="ticks" tone="mostaza" size={34} strokeWidth={2.4} />
      </span>
    </section>
  )
}
