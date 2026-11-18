/**
 * Navbar — bloque 0. Condición C4 del acta.
 *
 * - Wordmark en píldora crema + selector `ES | EN | FR` + CTA rápido **secundario**
 *   (crema con contorno terracota, jamás relleno terracota en ningún punto del scroll).
 * - Todo en UNA fila a 375 px, sin ocultar selector ni CTA. Presupuesto de ancho en
 *   343 px útiles (375 − 2 × 16 de padding):
 *     wordmark ≈ 84 px · selector 132 px fijos · CTA corto ≈ 72–88 px · gaps 2 × 6 px
 *     → ≈ 300 px, con 40 px de holgura incluso en FR.
 *   Por debajo de 420 px el CTA usa `nav.ctaShort` (la etiqueta se acorta, nunca
 *   desaparece) y recupera `nav.cta` en cuanto hay sitio.
 * - Sticky con fondo petróleo sólido (sin blur: no es SaaS) y separación inferior
 *   por onda SVG terracota de 2,4 px, nunca una línea recta.
 * - Primer foco del documento: skip-link visible al recibir foco.
 */
import { useLang } from '../i18n/LanguageContext'
import ButtonSecondary from './ui/ButtonSecondary'
import LanguageSwitch from './LanguageSwitch'
import Wordmark from './ui/Wordmark'

export default function Navbar() {
  const { t } = useLang()

  return (
    <header className="sticky top-0 z-50 bg-petroleo">
      <a
        href="#contenido"
        className="sr-only absolute top-2 left-3 focus:not-sr-only focus:z-[60] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-pill focus:bg-crema focus:px-4 focus:font-display focus:text-[15px] focus:font-bold focus:text-tinta"
      >
        {t('a11y.skip')}
      </a>

      <nav
        aria-label={t('brand.wordmark')}
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-1 px-3 min-[360px]:gap-1.5 min-[360px]:px-4 sm:gap-3 sm:px-6 md:h-16"
      >
        <Wordmark variant="pill" size="xs" className="shrink-0 max-[359px]:px-2 max-[359px]:text-[11px]" />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageSwitch />
          <ButtonSecondary
            href="#comprar"
            size="xs"
            className="max-[359px]:px-2 max-[359px]:text-[12px]"
            label={
              <>
                <span className="min-[420px]:hidden">{t('nav.ctaShort')}</span>
                <span className="hidden min-[420px]:inline">{t('nav.cta')}</span>
              </>
            }
            ariaLabel={t('nav.ctaAria')}
          />
        </div>
      </nav>

      {/* Onda de separación: 2,4 px de terracota, siempre curva. */}
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[6px] w-full"
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 4 C 25 0, 50 6, 75 3.5 S 125 0.5, 150 3.5 S 200 6, 225 3 S 275 0.5, 300 3.5 S 350 6, 375 3 S 425 0.5, 450 3.5 S 500 6, 525 3 S 575 0.5, 600 3.5 S 650 6, 675 3 S 725 0.5, 750 3.5 S 800 6, 825 3 S 875 0.5, 900 3.5 S 950 6, 975 3 S 1025 0.5, 1050 3.5 S 1100 6, 1125 3 S 1175 0.5, 1200 3.5"
          stroke="var(--color-terracota)"
          strokeWidth="2.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  )
}
