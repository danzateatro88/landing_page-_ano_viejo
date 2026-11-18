/**
 * BuySection — bloque 5 · Comprar (el bloque que convierte, CRO §2.6).
 *
 * Composición (boceto `IMG_0314.png`, parte inferior):
 *   `StripedBackdrop` con rayas verticales petróleo/crema + marco de bucles
 *   terracota perimetral → **panel crema sólido** centrado → todo el texto dentro.
 *
 * Condiciones del acta:
 * - **C3 / ítem 20:** ningún texto se apoya en las rayas. Cada nodo de texto tiene
 *   un ancestro con `background-color` crema opaco (`bg-crema` en el panel). Las
 *   franjas quedan como escenografía perimetral (≥ 1,25 × frameLoop de aire).
 * - **C1 / D-R2-7:** el único `ButtonPrimary` de esta mitad de la página. El keyline
 *   tinta 2 px + halo crema 3 px vienen de `.btn-primary`; no se anulan.
 * - **C5 / D-R2-4:** `buy.deliveryNote` va **después del CTA y antes de la línea de
 *   envíos**, dentro del panel crema, Nunito 600 a 15–16 px, ocultable por
 *   `siteConfig.content.showDeliveryNote` (D3 de Victoria).
 * - **Precio pendiente:** `PriceSlot` decide solo. Por defecto
 *   `siteConfig.priceDisplay: 'auto'` + `availability: null` → estado `hidden`: no
 *   renderiza nada, sin hueco fantasma. Victoria aún no ha confirmado stock, y
 *   afirmar «Disponible» sería una invención comercial; cuando lo confirme,
 *   `availability = 'in_stock'` activa la píldora sin tocar el copy. Cero cifras
 *   del kit, cero tachados, cero contadores.
 * - Sin formularios, sin pop-ups, sin email: la puerta es WhatsApp (`section="buy"`).
 *
 * Uso: `<BuySection />` (sin props; todo sale del diccionario y de `siteConfig`).
 */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useLang } from '../i18n/LanguageContext'
import siteConfig from '../data/siteConfig'
import { createCheckoutSession, fetchPricing } from '../lib/checkout'
import StripedBackdrop from './ui/StripedBackdrop'
import SquigglyFrame from './ui/SquigglyFrame'
import EyebrowPill from './ui/EyebrowPill'
import SectionHeading from './ui/SectionHeading'
import PriceSlot from './ui/PriceSlot'
import ButtonPrimary from './ui/ButtonPrimary'
import ShippingLine from './ui/ShippingLine'
import Doodle from './ui/Doodle'

/* Silueta del panel: esquinas asimétricas de nube (nunca un `rounded-lg` simétrico). */
const PANEL_RADII = { borderRadius: '38px 24px 36px 22px / 26px 34px 24px 30px' }

const MONEY = new Intl.NumberFormat('es-CA', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const noop = () => {}

/** Importe con el formato de la tienda: `44 $`, `52,95 $`. */
function formatMoney(value) {
  return `${MONEY.format(Number(value.toFixed(2)))} $`
}

/** Formas de entrega: el importe sale de `siteConfig.shipping`. */
const SHIPPING = siteConfig.shipping ?? {}
const DELIVERY = [
  { id: 'pickup', labelKey: 'buy.deliveryPickup', amount: SHIPPING.pickupFree === false ? Number(SHIPPING.montreal ?? 0) : 0 },
  { id: 'montreal', labelKey: 'buy.deliveryMontreal', amount: Number(SHIPPING.montreal ?? 0) },
  { id: 'rest', labelKey: 'buy.deliveryRest', amount: Number(SHIPPING.restOfCanada ?? 0) },
]

export default function BuySection() {
  const { t, lang, waUrl } = useLang()
  const showDeliveryNote = siteConfig.content?.showDeliveryNote !== false

  // Sin preselección: elegir la entrega es obligatorio antes de pagar, para que
  // nadie pague «recogida» creyendo que era domicilio (pasó el 18 nov 2026).
  const [delivery, setDelivery] = useState(null)
  const [serverPricing, setServerPricing] = useState(null)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')

  // Los precios se piden al servidor (fuente de verdad). Si no hay API —por ejemplo
  // en una vista previa estática— se usan los de `siteConfig`, que son los mismos.
  useEffect(() => {
    const controller = new AbortController()
    fetchPricing(controller.signal).then((pricing) => {
      if (pricing) setServerPricing(pricing)
    })
    return () => controller.abort()
  }, [])

  const { kitAmount, shippingAmount, total, chosen } = useMemo(() => {
    const serverKit = Number(serverPricing?.kit?.amount)
    const kit = Number.isFinite(serverKit) && serverKit > 0
      ? serverKit / 100
      : Number(siteConfig.kitPrice?.amount ?? 0)
    if (!delivery) return { kitAmount: kit, shippingAmount: null, total: null, chosen: false }
    const fromServer = serverPricing?.shipping?.find((item) => item.id === delivery)?.amount
    const option = DELIVERY.find((item) => item.id === delivery) ?? DELIVERY[0]
    const shipping = fromServer != null ? fromServer / 100 : option.amount
    return { kitAmount: kit, shippingAmount: shipping, total: kit + shipping, chosen: true }
  }, [delivery, serverPricing])

  const deliveryLabelKey = !delivery
    ? null
    : delivery === 'pickup'
      ? 'buy.deliveryPickup'
      : delivery === 'montreal'
        ? 'buy.deliveryMontreal'
        : 'buy.deliveryRest'

  const goToCheckout = useCallback(async () => {
    if (!delivery) return
    setPayError('')
    setPaying(true)
    try {
      const { url } = await createCheckoutSession({ delivery, lang, quantity: 1 })
      window.location.assign(url)
    } catch (error) {
      // Si el cobro no está disponible, no se deja al cliente sin salida:
      // se abre el pedido por WhatsApp con el total ya escrito.
      setPaying(false)
      setPayError(error?.code ?? 'checkout_failed')
      const base = waUrl('comprar')
      const summary = `${t('buy.summaryKit')} · ${t(deliveryLabelKey)} · ${t('buy.totalLabel')} ${formatMoney(total)}`
      window.location.assign(`${base}%0A${encodeURIComponent(summary)}`)
    }
  }, [delivery, deliveryLabelKey, lang, t, total, waUrl])

  return (
    <section id="comprar" aria-labelledby="comprar-title" className="relative">
      {/* frameLoop 16 → el marco dibuja sus bucles a ~19 px del borde; el panel
          arranca a 24 px (375) / 40 px (768) / 48 px (1280): las rayas y los
          bucles asoman por el perímetro sin pisar una sola letra (C3). */}
      <StripedBackdrop className="py-12 sm:py-16 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-12">
          <div
            className="paper-dots relative isolate mx-auto w-full max-w-[720px] bg-crema px-7 py-9 text-center text-tinta shadow-[6px_6px_0_0_#134E35] sm:px-10 sm:py-11 md:px-14"
            style={PANEL_RADII}
          >
            {/* Marco de bucles DIBUJADO ENCIMA del panel (pedido de Victoria,
                17 nov 2026), igual que el del hero: el resorte terracota se ve
                por delante del papel, no detrás. */}
            <SquigglyFrame
              variant="rect"
              tone="terracota"
              loop={16}
              strokeWidth={4.4}
              className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            />
            {/* Doodle 1: estrella mostaza pegada como sticker en la esquina del panel
                (decorativo, `aria-hidden`, nunca informa). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-7 right-7 z-20 rotate-[8deg] sm:top-8 sm:right-10"
            >
              <Doodle variant="star" tone="mostaza" size={28} />
            </span>

            <div className="flex justify-center">
              {/* Etiqueta de temporada: par con `mailclub.eyebrow` («Enero 2027»).
                  Mismo tamaño en las dos (19 px) y mismo sitio: arriba del panel. */}
              <EyebrowPill
                label={t('buy.eyebrow')}
                tone="mostaza"
                className="text-[19px]"
              />
            </div>

            <SectionHeading
              id="comprar-title"
              as="h2"
              tone="ink"
              size="lg"
              align="center"
              className="mt-4"
            >
              {t('buy.title')}
            </SectionHeading>

            <p className="copy mt-3 text-[21px] leading-[1.35] text-tinta">
              {t('buy.lead')}
            </p>

            {/* Precio del kit (44 $ desde el 18 nov 2026). */}
            <PriceSlot align="center" className="mt-5" />

            {/* Selector de entrega: tres botones, uno por forma de envío. Cada uno
                suma su importe al total; el total es lo que se cobra en Stripe. */}
            <fieldset className="mt-7 border-0 p-0">
              <legend className="mx-auto mb-3 font-display text-[17px] font-bold text-tinta sm:text-[18px]">
                {t('buy.deliveryTitle')}
              </legend>

              <div className="mx-auto flex max-w-[26rem] flex-col gap-2.5">
                {DELIVERY.map((option) => {
                  const selected = option.id === delivery
                  const amount = option.amount
                  return (
                    <label
                      key={option.id}
                      className={`relative flex cursor-pointer items-center justify-between gap-3 rounded-pill px-5 py-3 text-left transition-colors ${
                        selected
                          ? 'bg-terracota text-crema shadow-[0_2px_0_0_var(--color-tinta)]'
                          : 'bg-crema/70 text-tinta outline-2 outline-tinta/25 hover:outline-tinta/50'
                      } outline`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selected}
                        onChange={() => setDelivery(option.id)}
                        className="sr-only"
                      />
                      <span className="font-display text-[15px] font-bold sm:text-[16px]">
                        {t(option.labelKey)}
                      </span>
                      <span
                        className={`font-body text-[15px] font-bold tabular-nums ${
                          selected ? 'text-crema' : 'text-tinta'
                        }`}
                      >
                        {amount === 0 ? t('buy.deliveryFree') : formatMoney(amount)}
                      </span>
                    </label>
                  )
                })}
              </div>
              {chosen && delivery !== 'pickup' ? (
                <p className="mx-auto mt-3 max-w-[24rem] font-body text-[14px] leading-[1.45] text-tinta/80">
                  {t('buy.addressNote')}
                </p>
              ) : null}
            </fieldset>

            {/* Resumen: kit + entrega = total. El total es el importe que se paga. */}
            <dl className="mx-auto mt-6 max-w-[24rem] space-y-1.5 border-t-2 border-dashed border-tinta/25 pt-4 font-body text-[15px] text-tinta sm:text-[16px]">
              <div className="flex items-baseline justify-between gap-3">
                <dt>{t('buy.summaryKit')}</dt>
                <dd className="font-semibold tabular-nums">{formatMoney(kitAmount)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt>{t('buy.summaryShipping')}</dt>
                <dd className="font-semibold tabular-nums">
                  {!chosen
                    ? '—'
                    : shippingAmount === 0
                      ? t('buy.deliveryFree')
                      : formatMoney(shippingAmount)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t-2 border-tinta/20 pt-2">
                <dt className="font-display text-[17px] font-bold">{t('buy.totalLabel')}</dt>
                <dd className="font-display text-[26px] font-extrabold tabular-nums">
                  {chosen ? formatMoney(total) : '—'}
                </dd>
              </div>
            </dl>

            {/* CTA protagonista: pago con Stripe del total elegido. */}
            <div className="mt-6 flex justify-center">
              <ButtonPrimary
                onClick={chosen ? goToCheckout : noop}
                disabled={paying || !chosen}
                size="lg"
                className="w-full sm:w-[420px]"
                label={
                  !chosen
                    ? t('buy.chooseDelivery')
                    : t('buy.payCta', { total: formatMoney(total) })
                }
                ariaLabel={
                  !chosen
                    ? t('buy.deliveryTitle')
                    : t('buy.payAria', { total: formatMoney(total) })
                }
              />
            </div>

            {/* Refuerzo: qué se está pagando exactamente, por si alguien no vio el
                selector. Evita el error de pagar «recogida» creyendo que era domicilio. */}
            {chosen ? (
              <p className="mx-auto mt-3 max-w-[32rem] font-body text-[14px] font-semibold leading-[1.45] text-tinta">
                {t('buy.payingFor', { delivery: t(deliveryLabelKey) })}
              </p>
            ) : null}

            <p className="mx-auto mt-2 max-w-[32rem] font-body text-[14px] leading-[1.5] text-tinta/80">
              {t('buy.payNote')}
            </p>

            <p className="mx-auto mt-1.5 max-w-[32rem] font-body text-[14px] leading-[1.5] text-tinta/80">
              {t('buy.promoNote')}
            </p>
            {payError ? (
              <p role="status" className="mx-auto mt-2 max-w-[32rem] font-body text-[14px] text-tinta/70">
                {t('buy.payFallback')}
              </p>
            ) : null}

            {/* C5 · D-R2-4: justo debajo del CTA, antes de la línea de envíos. */}
            {showDeliveryNote ? (
              <p className="mx-auto mt-5 max-w-[34rem] font-body text-[15px] font-semibold leading-[1.55] text-tinta sm:text-[16px]">
                {t('buy.deliveryNote')}
              </p>
            ) : null}

            <ShippingLine className="mx-auto mt-4 max-w-[36rem] text-pretty" />

            <p className="mx-auto mt-4 max-w-[34rem] font-body text-[15px] font-semibold leading-[1.5] text-tinta">
              {t('buy.note')}
            </p>

            {/* Doodle 2: ondatas sueltas sobre las rayas, bajo la esquina izquierda
                del panel (nunca bajo una letra: cae fuera del papel crema). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 left-2 rotate-[-6deg] sm:left-4"
            >
              <Doodle variant="squiggle" tone="terracota" size={40} />
            </span>
          </div>
        </div>
      </StripedBackdrop>
    </section>
  )
}
