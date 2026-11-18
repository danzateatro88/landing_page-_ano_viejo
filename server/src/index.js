/**
 * API de checkout — vichisboh* · «Vichito, el año viejo».
 *
 * Node.js + Express. Tres reglas:
 *  1. Los precios viven aquí; el navegador solo dice *qué* quiere.
 *  2. CORS con lista blanca (dominio oficial, localhost y EXTRA_ALLOWED_ORIGINS).
 *  3. Los secretos, solo en variables de entorno.
 */
import cors from 'cors'
import express from 'express'

import {
  ALLOWED_ORIGINS,
  STRIPE_WEBHOOK_SECRET,
  CLIENT_URL,
  EXTRA_ALLOWED_ORIGINS,
  NODE_ENV,
  PORT,
  isStripeConfigured,
} from './config.js'
import { publicPricing } from './catalog.js'
import { createCheckoutSession } from './checkout.js'
import { handleStripeWebhook } from './webhook.js'
import { getSessionSummary } from './session.js'

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1) // Render/Vercel van detrás de proxy

/* ── CORS estricto y dinámico ─────────────────────────────────────────────── */
app.use(
  cors({
    origin(origin, callback) {
      // Sin cabecera Origin (curl, health checks internos): se permite.
      if (!origin) return callback(null, true)
      const clean = origin.replace(/\/+$/, '')
      if (ALLOWED_ORIGINS.includes(clean)) return callback(null, true)
      return callback(new Error(`Origen no permitido por CORS: ${origin}`))
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
  }),
)

// El webhook de Stripe necesita el cuerpo CRUDO (Buffer) para verificar la firma:
// por eso se registra antes del parser JSON.
app.post('/api/webhook', express.raw({ type: 'application/json', limit: '256kb' }), handleStripeWebhook)

app.use(express.json({ limit: '16kb' }))

/* ── Límite simple por IP (30 peticiones/minuto) ──────────────────────────── */
const WINDOW_MS = 60_000
const MAX_REQUESTS = 30
const hits = new Map()

app.use('/api', (req, res, next) => {
  // Stripe puede mandar ráfagas de eventos: el webhook queda fuera del límite.
  if (req.path === '/webhook') return next()
  const ip = req.ip ?? 'desconocida'
  const now = Date.now()
  const entry = hits.get(ip) ?? { count: 0, reset: now + WINDOW_MS }
  if (now > entry.reset) {
    entry.count = 0
    entry.reset = now + WINDOW_MS
  }
  entry.count += 1
  hits.set(ip, entry)
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'too_many_requests' })
  }
  return next()
})

/* ── Rutas ───────────────────────────────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    stripeConfigured: isStripeConfigured,
    clientUrl: CLIENT_URL,
    env: NODE_ENV,
  })
})

app.get('/api/pricing', (_req, res) => {
  res.json(publicPricing())
})

app.post('/api/checkout', createCheckoutSession)
app.get('/api/session/:id', getSessionSummary)

app.use((_req, res) => res.status(404).json({ error: 'not_found' }))

/* ── Manejo de errores (incluye CORS) ────────────────────────────────────── */
app.use((error, _req, res, _next) => {
  if (String(error?.message ?? '').startsWith('Origen no permitido')) {
    return res.status(403).json({ error: 'cors_not_allowed' })
  }
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'invalid_json' })
  }
  console.error('[api] error:', error?.message)
  return res.status(500).json({ error: 'internal_error' })
})

app.listen(PORT, () => {
  console.log(`[api] escuchando en :${PORT} · entorno ${NODE_ENV}`)
  console.log(`[api] CLIENT_URL = ${CLIENT_URL}`)
  console.log(`[api] Stripe ${isStripeConfigured ? 'configurado ✔' : 'SIN configurar (falta STRIPE_SECRET_KEY)'}`)
  console.log(`[api] webhook ${STRIPE_WEBHOOK_SECRET ? 'con firma ✔' : 'sin STRIPE_WEBHOOK_SECRET (deshabilitado)'}`)
  if (EXTRA_ALLOWED_ORIGINS.length) {
    console.log(`[api] orígenes extra: ${EXTRA_ALLOWED_ORIGINS.join(', ')}`)
  }
})
