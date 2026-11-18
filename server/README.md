# API de checkout — vichisboh*

Servidor mínimo en **Node.js + Express** que crea la sesión de pago de Stripe.
La regla de oro: **el navegador nunca decide el importe**. Envía qué quiere
(entrega y cantidad); el servidor valida contra su propio catálogo y calcula el total.

```
POST /api/checkout   { delivery: "pickup" | "montreal" | "rest", lang: "es"|"en"|"fr", quantity?: 1-5 }
                     → 200 { url }            (URL de Stripe Checkout)
                     → 400 { error }          (parámetros inválidos)
                     → 503 { error }          (sin STRIPE_SECRET_KEY configurada)

GET  /api/pricing   → { kit, shipping[], freeFrom, currency, maxQuantity }
GET  /api/health    → { ok, stripeConfigured, clientUrl, env }
```

## Arrancar en local

```bash
cd server
cp .env.example .env        # pega tu sk_test_…
npm install
npm run dev                 # http://localhost:4242
```

La landing en desarrollo ya proxya `/api` a `http://localhost:4242` (ver `vite.config.js`),
así que no hay que tocar nada más.

## Desplegar en Render

1. **New → Web Service**, repo conectado, *Root Directory*: `server`.
2. Build: `npm install` · Start: `npm start`.
3. Variables de entorno (Environment):
   - `STRIPE_SECRET_KEY` (sk_live_… cuando esté en producción)
   - `CLIENT_URL` = dominio real de la tienda
   - `EXTRA_ALLOWED_ORIGINS` = previews de Vercel, si se usan
   - `STRIPE_WEBHOOK_SECRET` (si se activa el webhook)
4. Copia la URL del servicio (`https://vichito-checkout.onrender.com`) y ponla en el
   frontend como `VITE_API_URL`.

## Seguridad

- La clave secreta **solo** vive en variables de entorno del servidor (`.env` ignorado por git).
- CORS con lista blanca: `CLIENT_URL` + `localhost` + `EXTRA_ALLOWED_ORIGINS`. Cualquier
  otro origen recibe error de CORS.
- Los precios se recalculan siempre en el servidor: si alguien manipula el `POST`, el
  importe cobrado sigue siendo el correcto.
- Límite simple de peticiones por IP (30/minuto) para no exponer la API a abuso.

## Datos de envío (dirección y teléfono)

Cuando la entrega **no** es recogida en el taller, la sesión se crea con:

```js
shipping_address_collection: { allowed_countries: ['CA'] }
phone_number_collection: { enabled: true }
```

Stripe pide entonces **nombre, dirección, apartamento, ciudad, provincia, código postal
y teléfono** antes de pagar, y los devuelve en la sesión y en el webhook
(`collected_information.shipping_details`). Con **«Recogida en Montreal»** no se pide
dirección: solo el teléfono.

El **idioma de la pasarela** sigue al de la tienda: `es-419`, `en-CA` o `fr-CA`
(verificado: con la web en francés, Stripe abre en `fr-CA`).

## Webhook de confirmación (listo, sin CLI ni túneles)

### Probarlo en local sin Stripe CLI

El endpoint ya funciona; para comprobarlo sin instalar nada:

```bash
# server/.env
STRIPE_WEBHOOK_SECRET=whsec_local_dev

npm run dev           # terminal 1
npm run webhook:test  # terminal 2  → firma un evento y lo envía
```

Respuesta esperada: `POST /api/webhook → 200 { "received": true }` y en el log:

```
[pedido] paid · cs_test_local · 1× kit · entrega rest · total 52.95 CAD
[pedido] contacto: victoria@ejemplo.com · tel +1 514 000 0000
[pedido] envío: 123 rue Saint-Denis, App. 4, Montréal H2X 3K4, CA
```

El script usa el SDK oficial para firmar (`generateTestHeaderString`), así que valida
exactamente el mismo camino que usará Stripe en producción.

### Webhook de confirmación — destinos

El webhook avisa al servidor cuando el pago se completa de verdad (el redirect del
navegador puede perderse). Endpoint: **`POST /api/webhook`**, con verificación de firma.

### Qué URL poner como destino

Stripe necesita una URL **pública https**. `localhost` no le sirve. Tres caminos:

| Entorno | Destino | Cómo |
|---|---|---|
| **Local, sin desplegar** | *(no se registra URL)* | `stripe listen --forward-to localhost:4242/api/webhook` → imprime un `whsec_…` que va a `STRIPE_WEBHOOK_SECRET` |
| **Local, con túnel público** | `https://<algo>.trycloudflare.com/api/webhook` | `cloudflared tunnel --url http://localhost:4242` |
| **Servidor desplegado** | `https://<servicio>.onrender.com/api/webhook` | el definitivo, ya en producción |

### Eventos a marcar

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.expired`

### Probar la firma sin Stripe

```bash
curl -X POST localhost:4242/api/webhook -H 'Content-Type: application/json' -d '{}'
# → {"error":"webhook_not_configured"}   (falta el whsec)

curl -X POST localhost:4242/api/webhook -H 'stripe-signature: t=1,v1=deadbeef' -d '{}'
# → {"error":"invalid_signature"} [400]
```

Con firma correcta y un evento `checkout.session.completed` el servidor deja constancia:

```
[pedido] paid · cs_test_… · 1× kit · entrega rest · total 52.95 CAD · victoria@ejemplo.com
```

## Códigos de descuento (los crea Victoria en Stripe)

Las sesiones se crean con `allow_promotion_codes: true`, así que **Checkout muestra el
campo «Añadir código de promoción»** en el paso de pago. El descuento lo calcula y lo
aplica Stripe: la web nunca toca importes.

### Cómo crear un código (panel de Stripe, 2 minutos)

1. **Productos → Cupones → Crear cupón**
   - Tipo: **% de descuento** (ej. 10 %) o **importe fijo** (ej. 5 $ CAD).
   - Duración: *una vez* (lo normal para una promo), *repetido* o *para siempre*.
   - Ámbito: solo el kit. El envío no entra en el descuento.
2. **Cupones → el cupón creado → «Añadir código de promoción»**
   - Código: el texto que escribirá la clienta (`VICHITO10`, `NAVIDAD5`…).
   - Límite de usos, fecha de caducidad y mínimo de compra: opcionales pero recomendables.
3. Listo. No hay que tocar el código: el campo aparece solo en el siguiente pago.

### Detalles que conviene saber

- El descuento se aplica **al kit**, no al envío (Stripe no descuenta el `shipping_rate`).
- Un código agotado o caducado se rechaza en la pasarela con su propio mensaje.
- Los códigos funcionan igual con envío y con recogida.
- En la web aparece una línea: «¿Tienes un código de descuento? Podrás escribirlo en el
  paso de pago», para que la gente sepa que puede usarlo.

### Prueba rápida

Se puede comprobar sin pagar: crear un cupón del 10 %, un código `QA10`, abrir un Checkout
y ver que el campo aparece y recalcula el total. (En la QA de este proyecto se verificó
creando y borrando un cupón temporal: `allow_promotion_codes: true` ✔.)
