/**
 * Servidor local que imita a Vercel para las funciones de `api/`.
 *
 *   npm run api        → http://localhost:4242/api/*
 *
 * No necesita Vercel CLI: importa los mismos handlers y los sirve con la firma
 * (req, res) que usa Vercel. Variables: `.env.local` en la raíz; si no existe,
 * cae a `server/.env` (la copia de seguridad del backend antiguo).
 */
import http from 'node:http'
import { existsSync, readFileSync } from 'node:fs'

const readEnvFile = (path) => {
  if (!existsSync(path)) return {}
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()]
      }),
  )
}

const env = { ...readEnvFile('server/.env'), ...readEnvFile('.env.local') }
for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) process.env[key] = value
}

const PORT = Number(process.env.API_PORT ?? 4242)

const { default: checkout } = await import('../api/create-checkout-session.js')
const { default: pricing } = await import('../api/pricing.js')
const { default: webhook } = await import('../api/webhook.js')
const { default: session } = await import('../api/session/[id].js')
const { default: health } = await import('../api/health.js')

const ROUTES = {
  '/api/create-checkout-session': checkout,
  '/api/pricing': pricing,
  '/api/webhook': webhook,
  '/api/health': health,
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks)

  // Vercel: parser JSON activo salvo en las rutas que lo desactivan (webhook).
  if (url.pathname === '/api/webhook') {
    req[Symbol.asyncIterator] = () => (async function* () { yield raw })()
  } else if (raw.length) {
    try {
      req.body = JSON.parse(raw.toString())
    } catch {
      req.body = {}
    }
  }

  req.query = Object.fromEntries(url.searchParams)
  res.status = (code) => ((res.statusCode = code), res)
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  const handler = ROUTES[url.pathname]
  if (handler) return handler(req, res)

  if (url.pathname.startsWith('/api/session/')) {
    req.query = { id: url.pathname.split('/').pop() }
    return session(req, res)
  }

  res.statusCode = 404
  res.end(JSON.stringify({ error: 'not_found' }))
})

server.listen(PORT, () => {
  const key = process.env.STRIPE_SECRET_KEY ?? ''
  console.log(`[api-local] http://localhost:${PORT}/api/health`)
  console.log(`[api-local] Stripe ${key ? 'configurado ✔' : 'SIN configurar'}`)

  // Guardarraíl: si en local hay una clave LIVE, se avisa (cobraría de verdad).
  if (key.startsWith('sk_live_')) {
    console.warn(
      '[api-local] ⚠ CLAVE LIVE detectada en local: cualquier pago será real. ' +
        'Para probar usa sk_test_… en .env.local',
    )
  }
  if (key && !key.startsWith('sk_test_') && !key.startsWith('sk_live_')) {
    console.warn('[api-local] ⚠ La clave no parece de Stripe (debe empezar por sk_test_ o sk_live_).')
  }
})
