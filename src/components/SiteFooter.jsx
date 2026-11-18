/**
 * SiteFooter — bloque 7 · Cierre (CRO §2.8 y §5.2: el cierre es chrome, no sección).
 *
 * Misma familia rayada que Comprar (firma que se repite) y **todo el texto sobre un
 * panel crema sólido** dentro del marco de bucles terracota: condición C3 / ítem 20
 * (MAYOR-02). Las franjas son perimetrales: no existe color de texto que cumpla AA
 * contra las dos franjas a la vez (crema/petróleo 4,14 ✘; tinta/petróleo 1,85 ✘).
 *
 * Contenido (≤ 12 palabras propias, sin menús ni enlaces inventados):
 *   Wordmark `brand.wordmark` → contacto (`footer.whatsapp` con el número visible +
 *   `footer.instagram`) en un `<address>` → línea de envíos literal (`buy.shipping`,
 *   misma clave que Comprar) → firma `footer.madeIn` en la tipografía de los textos (`.copy`)(la única
 *   segunda aparición de la serif, junto al eslogan del hero).
 *
 * Todos los `aria-label` salen del diccionario (`footer.whatsappAria`,
 * `footer.instagramAria`); las dos únicas puertas son `wa.me/15142968295` e
 * `instagram.com/vichisboho` (condición 8 del checklist). Cero formularios.
 *
 * Uso: `<SiteFooter />` — lo monta `App.jsx` fuera de `<main>`.
 */
import { useLang } from '../i18n/LanguageContext'
import StripedBackdrop from './ui/StripedBackdrop'
import SquigglyFrame from './ui/SquigglyFrame'
import Wordmark from './ui/Wordmark'
import WhatsAppLink from './ui/WhatsAppLink'
import InstagramLink from './ui/InstagramLink'
import ShippingLine from './ui/ShippingLine'
import Doodle from './ui/Doodle'

const PANEL_RADII = { borderRadius: '34px 22px 32px 20px / 24px 32px 22px 30px' }

export default function SiteFooter() {
  const { t } = useLang()

  return (
    <footer className="relative">
      <StripedBackdrop className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-12">
          <div
            className="paper-dots relative isolate mx-auto w-full max-w-[640px] bg-crema px-5 py-7 text-center text-tinta shadow-[5px_5px_0_0_#134E35] sm:px-8 sm:py-8"
            style={PANEL_RADII}
          >
            {/* Marco de bucles encima del panel, como en el hero y en Comprar. */}
            <SquigglyFrame
              variant="rect"
              tone="terracota"
              loop={18}
              strokeWidth={4.6}
              hand={0.5}
              className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            />
            <p className="flex justify-center">
              <Wordmark as="span" variant="ink" size="xl" />
            </p>

            {/* Contacto: dos únicas puertas autorizadas, con número y handle visibles. */}
            <address className="mt-4 flex flex-col items-center gap-1 font-body not-italic sm:flex-row sm:justify-center sm:gap-6">
              <WhatsAppLink
                section="footer"
                ariaLabel={t('footer.whatsappAria')}
                className="inline-flex min-h-[44px] items-center px-1 font-body text-[17px] font-semibold text-tinta underline decoration-terracota decoration-2 decoration-wavy underline-offset-[6px]"
              >
                {t('footer.whatsapp')}
              </WhatsAppLink>

              <InstagramLink
                ariaLabel={t('footer.instagramAria')}
                className="inline-flex min-h-[44px] items-center px-1 font-body text-[17px] font-semibold text-tinta underline decoration-terracota decoration-2 decoration-wavy underline-offset-[6px]"
              >
                {t('footer.instagram')}
              </InstagramLink>
            </address>

            <ShippingLine className="mx-auto mt-2 max-w-[36rem] text-pretty" />

            <p className="copy mt-3 text-[21px] leading-snug text-tinta">
              {t('footer.madeIn')}
            </p>

            {/* Doodles de esquina: metidos hacia dentro para que el marco de
                bucles no los tape (pedido de Victoria, 17 nov 2026). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-7 left-7 z-20 rotate-[-8deg] sm:top-8 sm:left-10"
            >
              <Doodle variant="star" tone="terracota" size={24} />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-7 bottom-7 z-20 rotate-[7deg] sm:right-10 sm:bottom-9"
            >
              <Doodle variant="spiral" tone="mostaza" size={24} />
            </span>
          </div>
        </div>
      </StripedBackdrop>
    </footer>
  )
}
