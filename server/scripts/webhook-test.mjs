/**
 * Prueba local del webhook, SIN Stripe CLI ni túneles.
 *
 * Firma un evento `checkout.session.completed` con el mismo
 * `STRIPE_WEBHOOK_SECRET` que usa el servidor y lo envía a /api/webhook.
 *
 *   1. En `server/.env`:  STRIPE_WEBHOOK_SECRET=whsec_local_dev
 *   2. Arranca el servidor:  npm run dev
 *   3. En otra terminal:     npm run webhook:test
 *
 * Si el servidor responde `{ "received": true }` y aparece la línea `[pedido]` en
 * su log, el endpoint está listo. Cuando crees el destino real en Stripe, cambia
 * el `whsec_…` del `.env` por el que te dé el panel.
 */
import fs from 'node:fs'
import path from 'node:path'

import Stripe from 'stripe'

const envPath = path.resolve(process.cwd(), '.env')
const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''
const readEnv = (name) => {
  const inline = process.env[name]
  if (inline) return inline.trim()
  const match = env.match(new RegExp(`^${name}=(.+)$`, 'm'))
  return match ? match[1].trim() : ''
}

const secret = readEnv('STRIPE_WEBHOOK_SECRET')
const port = readEnv('PORT') || '4242'

if (!secret) {
  console.error(
    'Falta STRIPE_WEBHOOK_SECRET. Añade esta línea a server/.env y vuelve a arrancar el servidor:\n' +
      '  STRIPE_WEBHOOK_SECRET=whsec_local_dev',
  )
  process.exit(1)
}

const payload = JSON.stringify({
  id: 'evt_local_test',
  object: 'event',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_local',
      object: 'checkout.session',
      payment_status: 'paid',
      amount_total: 5295,
      currency: 'cad',
      customer_details: { email: 'victoria@ejemplo.com', phone: '+1 514 000 0000' },
      collected_information: {
        shipping_details: {
          name: 'Victoria Henao',
          address: {
            line1: '123 rue Saint-Denis',
            line2: 'App. 4',
            city: 'Montréal',
            postal_code: 'H2X 3K4',
            state: 'QC',
            country: 'CA',
          },
        },
      },
      metadata: {
        product: 'kit-vichito-2026',
        delivery: 'rest',
        quantity: '1',
        lang: 'es',
        total_amount: '5295',
        shipping_amount: '895',
        needs_address: 'yes',
      },
    },
  },
})

const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret })

const response = await fetch(`http://localhost:${port}/api/webhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'stripe-signature': signature },
  body: payload,
})

console.log(`POST /api/webhook → ${response.status}`)
console.log(await response.text())
