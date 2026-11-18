/**
 * CheckoutNotice — la pantalla que aparece al volver de Stripe.
 *
 * Stripe devuelve a `/?checkout=success&delivery=…&session_id=cs_…`.
 *
 * Regla de oro: **no nos fiamos de la URL**. Si hay `session_id`, se pregunta al
 * servidor (`GET /api/session/:id`), que a su vez pregunta a Stripe: solo si Stripe
 * dice `paid` se muestra «pago confirmado». Si no se puede comprobar, se dice
 * «estamos confirmando tu pago» en lugar de celebrar algo que no consta.
 *
 * El mensaje de entrega cambia según lo comprado:
 *   · resto de Canadá → llega en 3 a 5 días
 *   · domicilio Montreal → se entrega el sábado siguiente al pago
 *   · recogida → 2 días después, en 602 12e Ave, H8P 2R5
 */
import { useEffect, useState } from 'react'

import { useLang } from '../i18n/LanguageContext'
import { API_BASE } from '../lib/checkout'
import Doodle from './ui/Doodle'
import SquigglyFrame from './ui/SquigglyFrame'
import ButtonSecondary from './ui/ButtonSecondary'

const MONEY = new Intl.NumberFormat('es-CA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
const formatMoney = (amount, currency = 'cad') =>
  `${MONEY.format(Number(amount ?? 0) / 100)} $ ${String(currency).toUpperCase()}`

const DELIVERY_COPY = {
  pickup: { label: 'buy.deliveryPickup', note: 'thanks.pickupNote' },
  montreal: { label: 'buy.deliveryMontreal', note: 'thanks.montrealNote' },
  rest: { label: 'buy.deliveryRest', note: 'thanks.shippingNote' },
}

export default function CheckoutNotice() {
  const { t, lang } = useLang()
  const [state, setState] = useState(null) // { kind: 'success'|'pending'|'cancel', summary }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const outcome = params.get('checkout')
    if (!outcome) return

    if (outcome === 'cancel') {
      setState({ kind: 'cancel' })
      return
    }

    const sessionId = params.get('session_id')
    const deliveryFromUrl = params.get('delivery')
    if (!sessionId) {
      setState({ kind: 'cancel' })
      return
    }

    let alive = true
    fetch(`${API_BASE}/api/session/${encodeURIComponent(sessionId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((summary) => {
        if (!alive) return
        if (!summary) {
          // Sin API no se puede verificar: se informa con honestidad.
          setState({ kind: 'pending', summary: { delivery: deliveryFromUrl } })
          return
        }
        const paid = summary.paymentStatus === 'paid' || summary.paymentStatus === 'no_payment_required'
        setState({ kind: paid ? 'success' : 'pending', summary })
      })
      .catch(() => alive && setState({ kind: 'pending', summary: { delivery: deliveryFromUrl } }))

    return () => {
      alive = false
    }
  }, [])

  if (!state) return null

  const close = () => {
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, '', url.toString())
    setState(null)
  }

  const summary = state.summary ?? {}
  const delivery = summary.delivery ?? null
  const deliveryCopy = DELIVERY_COPY[delivery] ?? null
  const name = summary.customer?.name?.split(' ')[0] ?? ''

  const title =
    state.kind === 'success'
      ? t('thanks.title')
      : state.kind === 'pending'
        ? t('thanks.pendingTitle')
        : t('thanks.cancelTitle')

  return (
    <section aria-live="polite" className="relative bg-petroleo py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[720px] px-5 sm:px-8">
        <div
          className="paper-dots relative isolate bg-crema px-8 py-8 text-center text-tinta shadow-[6px_6px_0_0_rgba(19,78,53,0.9)] sm:px-12 sm:py-9"
          style={{ borderRadius: '30px 20px 28px 18px / 22px 30px 20px 28px' }}
        >
          <SquigglyFrame
            variant="rect"
            tone="terracota"
            loop={14}
            strokeWidth={4}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-6 z-20 hidden rotate-[9deg] sm:block"
          >
            <Doodle variant="star" tone="mostaza" size={26} />
          </span>

          <h2 className="font-display text-[26px] leading-tight font-extrabold sm:text-[30px]">
            {title}
          </h2>

          {state.kind === 'success' ? (
            <p className="copy mt-2 text-[20px] leading-snug">
              {name ? t('thanks.thanksName', { name }) : t('thanks.thanksPlain')}
            </p>
          ) : null}

          {state.kind === 'pending' ? (
            <p className="mx-auto mt-3 max-w-[26rem] font-body text-[15px] leading-[1.5]">
              {t('thanks.pendingBody')}
            </p>
          ) : null}

          {state.kind === 'cancel' ? (
            <p className="mx-auto mt-3 max-w-[26rem] font-body text-[15px] leading-[1.5]">
              {t('thanks.cancelBody')}
            </p>
          ) : null}

          {state.kind !== 'cancel' && deliveryCopy ? (
            <div className="mt-5 border-t-2 border-dashed border-tinta/25 pt-4">
              <dl className="mx-auto max-w-[24rem] space-y-1 font-body text-[15px]">
                <div className="flex justify-between gap-3">
                  <dt>{t('thanks.summaryDelivery')}</dt>
                  <dd className="font-semibold">{t(deliveryCopy.label)}</dd>
                </div>
                {summary.total ? (
                  <div className="flex justify-between gap-3">
                    <dt>{t('thanks.summaryTotal')}</dt>
                    <dd className="font-display text-[18px] font-extrabold">
                      {formatMoney(summary.total, summary.currency)}
                    </dd>
                  </div>
                ) : null}
              </dl>
              <p className="copy mx-auto mt-3 max-w-[28rem] text-[19px] leading-snug">
                {delivery === 'pickup'
                  ? t('thanks.pickupNote', { place: t('thanks.pickupPlace') })
                  : t(deliveryCopy.note)}
              </p>
              {state.kind === 'success' ? (
                <p className="mt-2 font-body text-[14px] text-tinta/80">{t('thanks.nextNote')}</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6 flex justify-center">
            <ButtonSecondary
              onClick={close}
              size="md"
              label={state.kind === 'cancel' ? t('thanks.cancelCta') : t('thanks.closeCta')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
