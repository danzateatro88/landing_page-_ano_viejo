# Vichito, el año viejo — `vichisboh*`

Landing page del **Kit Ritual Año Viejo 2026**, hecha a mano en Montreal por Victoria.
React 19 + Vite 7 + Tailwind CSS 4. Sin backend, sin base de datos, sin formularios:
la conversión es una conversación por WhatsApp o DM de Instagram.

---

## Arrancar el proyecto

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # genera dist/ listo para publicar
npm run preview    # sirve el build para revisarlo
npm run check:copy # falla si alguien escribe copy literal dentro del JSX
npm run check:console
```

---

## Estructura

```
index.html                     fuentes, <title>, meta, <noscript>
src/
├── App.jsx                    los 8 bloques en orden
├── index.css                  tokens @theme (paleta), textura de papel, foco visible
├── data/siteConfig.js         ⚙️ precio, envíos, interruptores de contenido, fotos
├── i18n/
│   ├── translations.js        ES / EN / FR (114 cadenas por idioma)
│   └── LanguageContext.jsx    useLang() → { t, waUrl, setLang, … }
└── components/
    ├── Navbar.jsx  Hero.jsx  Tradition.jsx  KitContents.jsx
    ├── HowItWorks.jsx  BuySection.jsx  MakerStory.jsx  MailClub.jsx
    ├── FooterMailClub.jsx  SiteFooter.jsx  LanguageSwitch.jsx
    └── ui/                    SquigglyFrame, CloudBlob, StripedBackdrop, Doodle,
                               PhotoSlot, PriceSlot, ShippingLine, Wordmark, botones…
```

Rutas del sitio: `#inicio` (hero) · `#tradicion` · `#kit` · `#como-funciona` ·
`#comprar` · `#victoria` · pie.

---

## Lo que Victoria tiene que tocar

### 1. Las fotos (lo único imprescindible)

En `src/data/siteConfig.js`, cada foto es una entrada con su proporción exacta:

```js
photos: {
  hero: { src: null, ratio: '4/5' },     // el Vichito con el cartel «¡CHAO AÑO VIEJO!»
  victoria: { src: null, ratio: '4/5' }, // Victoria en su taller
  kit: { src: null, ratio: '1/1' },      // las 8 piezas del kit
  …
}
```

Deja los archivos en `public/photos/` y pon `src: '/photos/mi-foto.jpg'`.

Ya está puesta la primera: **`public/photos/hero-vichito.jpg`** (el kit completo, en el hero).
El original sin tocar vive en `imagenes/fotokitcompletoanoviejo.jpeg` (3375×4219); la copia
web pesa ~330 kB y mide 1200×1500, la misma proporción 4:5, sin recorte.
Quedan **9 huecos** por llenar: la tradición (opcional), las 8 piezas del kit y Victoria en el taller.
Mientras `src` sea `null`, la página muestra un marcador honesto («Foto real:» + proporción),
nunca una foto de banco ni una ilustración generada. El texto alternativo de cada foto
ya está escrito en los tres idiomas.

### 2. El precio y el cobro

El kit cuesta **44 $ CAD** desde el 18 de noviembre de 2026:

```js
export const kitPrice = { amount: 44, currency: 'CAD' }
```

El panel de compra suma la entrega y muestra el total. **Ese total es lo que se cobra.**

#### Cobro con Stripe (Vercel Serverless Functions)

El importe **no se decide en el navegador**. Las funciones viven en `api/` (mismo dominio,
sin CORS ni servidor que se duerme):

```
navegador                    api/ (Vercel Function)              Stripe
   │  POST /api/create-checkout-session ─►│
   │  { delivery, lang, quantity }        │  valida contra su catálogo
   │                                      │  recalcula el total
   │                                      │  checkout.sessions.create ──►│
   │  ◄──────── { url } ──────────────────│                             │
   │  redirige a la pasarela ───────────────────────────────────────────►│
```

| Archivo | Endpoint | Qué hace |
|---|---|---|
| `api/create-checkout-session.js` | `POST /api/create-checkout-session` | valida, calcula el total y crea la sesión |
| `api/webhook.js` | `POST /api/webhook` | confirma el pago con firma de Stripe |
| `api/session/[id].js` | `GET /api/session/:id` | resumen de una sesión (pantalla «pago confirmado») |
| `api/pricing.js` | `GET /api/pricing` | precios públicos para pintar la interfaz |
| `api/health.js` | `GET /api/health` | comprobación del despliegue |

**Probar en local** (sin Vercel CLI):

```bash
npm run api     # funciones en http://localhost:4242/api/*
npm run dev     # la web proxya /api a ese puerto
```

Lee los secretos de `.env.local` y, si no existe, de `server/.env` (la copia de seguridad).

**Desplegar en Vercel:** conectar el repo y listo (framework Vite detectado). Añadir en
*Settings → Environment Variables*: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` y
`CLIENT_URL`. El webhook se registra en Stripe como
`https://tudominio.com/api/webhook`. `vercel.json` ya está en la raíz (framework, salida y
duración de las funciones).

### 3. Interruptores de contenido

```js
content: {
  showDeliveryNote: true,   // «Pedidos de diciembre: te confirmo la fecha por WhatsApp»
  showPackagingNote: true,  // nota de la caja kraft con papel picado
  showPhotoLabels: true,    // «Foto real:» en los marcadores (poner false con las fotos)
}
```

### 4. La tipografía de los textos

Los textos narrativos (la tradición, las líneas del kit, los pasos, la historia de Victoria,
el Mail Club) usan **Caveat**, una manuscrita gratuita de Google Fonts. Se cambia en **un solo
sitio**: el token `--font-copy` de `src/index.css`.

```css
--font-copy: 'Caveat', 'EB Garamond', cursive;   /* ← aquí */
```

Si algún día se licencia la fuente **Hibernate** (la manuscrita de Graphicfresh que inspiró el
boceto), deja el `.woff2` en `public/fonts/`, declara el `@font-face` y pon
`--font-copy: 'Hibernate', 'Caveat', cursive`. No hay que tocar ni un componente.
Los títulos siguen en Baloo 2 y lo funcional (botones, envíos, teléfono) en Nunito.

### 5. Los textos

Todo el copy vive en `src/i18n/translations.js`, en tres bloques: `es`, `en`, `fr`.
(El «Hibérnate» del boceto era una muestra de tipografía y ya no se escribe.)
Los textos en español son los de Victoria, **palabra por palabra**: si se cambian,
hay que cambiarlos también en inglés y en francés para que las tres versiones digan lo mismo.

---

## Cómo funciona el idioma

- Español por defecto. `?lang=es`, `?lang=en`, `?lang=fr` fuerzan el idioma; la elección
  del selector se recuerda en el navegador (`localStorage`).
- El cambio es instantáneo: textos, `aria-label`, `<title>`, `og:*` y **el mensaje que se
  abre en WhatsApp** (cada sección tiene el suyo, así Victoria sabe de qué bloque viene cada persona).
- Se conservan siempre los nombres propios **Vichito** y **Año Viejo**; el francés es de Quebec.

---

## Reglas que el código respeta y no conviene romper

1. **Nunca un precio del kit en el código** si Victoria no lo ha fijado.
2. **Nunca un formulario, pop-up o captura de email.** Solo `wa.me/15142968295` e Instagram `@vichisboho`.
3. **Nunca fotos de banco ni generadas con IA**: los contenedores son para las fotos reales.
4. **La foto manda, el texto acompaña**: si un bloque se ve cargado, se recorta el texto, nunca la foto.
5. **El look artesanal es el producto**: marcos de bucles terracota, nubes de papel crema,
   rayas de backing card, tipografías Baloo 2 / Nunito / EB Garamond. Nada de degradados ni sombras difusas.

---

## Verificación técnica

```bash
npm run build      # ✓ 59 módulos · 87,97 kB JS gzip · 7,07 kB CSS gzip
```

Medido en la Puerta 2: condiciones C1–C6 del acta cumplidas, checklist de 22 ítems con
19 ✔ · 3 ⚠ justificadas · 0 ✘, cero errores de consola, una sola `h1`, todos los SVG
decorativos con `aria-hidden`, foco visible verde/mostaza, objetivos táctiles ≥44 px
y sin desbordamiento horizontal de 320 a 1440 px en los tres idiomas.

Informes completos y capturas: `docs/`.
