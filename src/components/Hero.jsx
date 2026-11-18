/**
 * Hero — bloque 1. Condiciones C2 y C6, decisiones D-R2-1/2/3.
 *
 * Orden del DOM (= orden móvil, orden de tabulación):
 *   H1 (con su estrella) → subtítulo en píldora crema → CTA primario → foto → wordmark.
 *   El «Hibérnate» del boceto no se escribe: era la muestra de la tipografía.
 * El subtítulo es un nodo con fondo crema y texto de tinta (7,66:1): nunca `<p>`
 * crema de 17 px sobre `#1B7A63` (condición C2).
 *
 * Composición de escritorio: grid 12 columnas, texto 1–6 y foto 7–11 con sangrado
 * hacia el borde derecho. La foto NO se adelanta en el DOM (D-R2-3).
 *
 * Alturas a 375 × 667: navbar 56 + padding 32 + H1 ≈ 68 + píldora ≈ 74
 * + 16 de separación + CTA 52 ≈ **336 px**; la foto empieza antes del pliegue y deja
 * ver ≥ 150 px. La píldora → CTA son exactamente 16 px (D-R2-2).
 */
import { useLang } from '../i18n/LanguageContext'
import Doodle from './ui/Doodle'
import CloudBlob from './ui/CloudBlob'
import ButtonPrimary from './ui/ButtonPrimary'
import PhotoSlot from './ui/PhotoSlot'
import StripedBackdrop from './ui/StripedBackdrop'
import SquigglyFrame from './ui/SquigglyFrame'
import Wordmark from './ui/Wordmark'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="hero" className="relative overflow-hidden bg-petroleo text-crema">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-5 pt-8 pb-6 md:grid-cols-12 md:gap-6 md:px-8 md:pt-12 lg:gap-8 lg:pt-16 lg:pb-10">
        {/* Columna de texto — orden móvil primero */}
        <div className="relative md:col-span-6 md:col-start-1">
          {/* El H1 con la estrella al lado (pedido de Victoria, 16 nov 2026) y el
              subrayado de lápiz debajo del título. Aquí ya no se escribe el
              «Hibérnate» del boceto: en el boceto esa palabra era una muestra de
              la tipografía, no un texto de la página. */}
          <div className="relative w-fit">
            <h1 className="font-display text-[clamp(2rem,9vw,4.25rem)] font-extrabold leading-[1.02] text-crema md:text-[clamp(2.5rem,6.2vw,4.25rem)]">
              {t('hero.title')}
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block translate-y-[-0.12em] rotate-[8deg] align-baseline"
              >
                <Doodle variant="star" tone="mostaza" size={30} />
              </span>
            </h1>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[0.42em] left-0 w-[96%] text-terracota"
            >
              <Doodle
                variant="underline"
                tone="terracota"
                size={120}
                strokeWidth={2.4}
                className="w-full"
              />
            </span>
          </div>

          <CloudBlob
            variant="pill"
            pad="px-5 py-3 sm:px-6"
            className="mt-6 w-full max-w-full min-[481px]:w-fit"
          >
            <p className="balanced-copy font-body text-[17px] font-semibold leading-[1.45] text-tinta">
              {t('hero.subtitle')}
            </p>
          </CloudBlob>

          {/* El CTA va en el flujo, debajo de la píldora: Victoria dudó del botón
              montado sobre la foto (17 nov 2026) y se retiró ese solape. */}
          <div className="mt-5">
            <ButtonPrimary
              href="#comprar"
              fullWidth
              label={t('hero.cta')}
              ariaLabel={t('hero.ctaAria')}
            />
          </div>

        </div>

        {/* Foto protagonista sobre el mismo fondo rayado del bloque Comprar
            (pedido de Victoria, 17 nov 2026): rayas verticales petróleo/crema con
            marco de bucles terracota, y la foto sobre lámina crema.
            Sin marco propio en `PhotoSlot`: dos marcos anidados están prohibidos
            (API §5.1); el único bucle es el del fondo. */}
        <div className="relative md:col-span-6 md:col-start-7 lg:col-span-5">
          <div className="relative lg:w-[calc(100%+2.5vw)]">
            {/* Rayas de fondo (las mismas del bloque Comprar) y la foto con su
                marco de bucles encima: el bucle va sobre el papel, no sobre las
                rayas, así que nunca hay dos marcos anidados. */}
            <StripedBackdrop className="-mx-5 px-6 py-6 sm:-mx-8 sm:px-7 sm:py-7 md:mx-0 md:px-8 md:py-8">
              {/* La foto con el marco de bucles DIBUJADO ENCIMA (pedido de Victoria,
                  17 nov 2026): el resorte terracota se ve por delante de la imagen,
                  como en el boceto, no detrás. */}
              <div className="relative mx-auto w-full">
                <div className="overflow-hidden rounded-[10px] shadow-[5px_5px_0_0_rgba(19,78,53,0.45)]">
                  <PhotoSlot photoKey="hero" ratio="4/5" eager frame={false} mat={false} />
                </div>
                <SquigglyFrame
                  variant="rect"
                  tone="terracota"
                  loop={11}
                  strokeWidth={3.4}
                  className="pointer-events-none absolute -inset-1.5 z-10 sm:-inset-2"
                />
              </div>
            </StripedBackdrop>
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-3 hidden rotate-[-6deg] md:block"
            >
              <Doodle variant="spiral" tone="mostaza" size={44} />
            </span>
          </div>
        </div>
      </div>

      <div className="pb-8 text-center md:pb-10">
        <Wordmark variant="light" size="md" className="opacity-95" />
      </div>
    </section>
  )
}
