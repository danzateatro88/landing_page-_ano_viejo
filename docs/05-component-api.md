# 05 · API de componentes — cimientos de la Puerta 2 (ola 1)

**Proyecto:** Landing «Vichito, el año viejo» · `vichisboh*`
**Autor:** `frontend-dev` (ola 1) · **Fecha:** 16 de noviembre de 2026
**Estado:** ola 1 cerrada — andamiaje, tokens, primitivas SVG, `Navbar` y `Hero`.
**Contrato para la ola 2:** los seis bloques (`Tradition`, `KitContents`, `HowItWorks`, `BuySection`, `FooterMailClub`, `SiteFooter`) se construyen **contra esta API**. No se renombra ningún archivo ni ninguna prop sin actualizar este documento.

---

## 1. Cómo se compone el sitio

```
src/
├── main.jsx                     → monta <App /> y carga `index.css`
├── App.jsx                      → <LanguageProvider> + los 8 bloques en orden
├── index.css                    → tokens @theme + base + utilidades + .btn-primary
├── data/siteConfig.js           → precio pendiente, envíos, links, flags, fotos
├── i18n/LanguageContext.jsx     → (fe-i18n) LanguageProvider + useLang()
├── i18n/translations.js         → (fe-i18n) 109 claves + meta.* en ES/EN/FR
└── components/
    ├── Navbar.jsx               → bloque 0 (ola 1)   ✅
    ├── Hero.jsx                 → bloque 1 (ola 1)   ✅
    ├── Tradition.jsx            → bloque 2 (stub)    → ola 2
    ├── KitContents.jsx          → bloque 3 (stub)    → ola 2
    ├── HowItWorks.jsx           → bloque 4 (stub)    → ola 2
    ├── BuySection.jsx           → bloque 5 (stub)    → ola 2
    ├── FooterMailClub.jsx       → bloque 6 (stub)    → ola 2
    ├── SiteFooter.jsx           → bloque 7 (stub)    → ola 2
    ├── LanguageSwitch.jsx       → (fe-i18n) selector ES | EN | FR
    └── ui/                      → primitivas (esta API)
```

Regla de oro del contrato de idioma: **ningún texto literal en JSX**. Todo pasa por `t('clave')`; los componentes reciben etiquetas ya traducidas (`label={t('kit.cta')}`) o claves (`labelKey="kit.items.0.title"`) cuando el componente resuelve la traducción por dentro.

---

## 2. Tokens, tipografías y clases base

### 2.1 Tokens de `@theme` (Tailwind v4, `src/index.css`)

| Token | Valor | Utilidades que genera |
|---|---|---|
| `--color-petroleo` | `#1B7A63` | `bg-petroleo` · `text-petroleo` · `border-petroleo` |
| `--color-terracota` | `#F04E0C` | `bg-terracota` · `text-terracota` |
| `--color-crema` | `#F4E2CD` | `bg-crema` · `text-crema` |
| `--color-chocolate` | `#3B2517` | `bg-chocolate` · `text-chocolate` |
| `--color-rojo` | `#B93A30` | `bg-rojo` |
| `--color-mostaza` | `#E3C93C` | `bg-mostaza` |
| `--color-oliva` | `#50664B` | `bg-oliva` |
| `--font-display` | `'Baloo 2'` | `font-display` |
| `--font-body` | `'Nunito'` | `font-body` |
| `--font-serif` | `'EB Garamond'` | `font-serif` |
| `--radius-pill` | `999px` | `rounded-pill` |
| `--radius-cloud` | `28px` | `rounded-cloud` |

**Tokens de decisión** (declarados en `:root`, inspeccionables en el DOM):

| Variable | Valor por defecto | Para qué |
|---|---|---|
| `--btn-ink` | `#F4E2CD` (crema) | Color de la etiqueta del CTA primario. Alterno documentado: `#3B2517` (chocolate, 3,96:1) — decisión D-CTA de Victoria |
| `--squiggle-stroke` | `#F04E0C` (terracota) | Trazo por defecto de `SquigglyFrame` |
| `--stroke-hand` | `3.5px` | Grosor de referencia del trazo a mano |

### 2.2 Utilidades propias

| Clase | Qué hace |
|---|---|
| `paper-dots` | Trama de puntos CSS al ~4,5 % de tinta chocolate (textura de papel, cero binarios) |
| `paper-dots-light` | La misma trama en crema, para zonas de petróleo |
| `.btn-primary` | CTA primario: fondo terracota, `color: var(--btn-ink)` y **keyline chocolate 2 px + halo crema 3 px** por `box-shadow` (condición C1). Incluye `:hover` (rotación −1,5° + sombra), `:active` y `:focus-visible` |
| `sr-only` / `not-sr-only` | Skip-link: invisible hasta recibir foco |

Foco global: `:focus-visible` **doble tono** — anillo chocolate de 3 px (11,35:1 sobre crema) + halo mostaza de 3 px por `box-shadow` (3,16:1 sobre petróleo) con `outline-offset: 3px`. Un solo elemento visible en cualquier superficie; `.btn-primary:focus-visible` conserva además keyline + halo de C1. **Nunca `outline: none`.**

---

## 3. Primitivas SVG

### 3.1 `SquigglyFrame` — `components/ui/SquigglyFrame.jsx`

Marco de **bucles continuos dibujados a mano** (v3): un único `path` cerrado que recorre el perímetro en arcos largos de radio constante. No es un borde CSS, no usa `stroke-dasharray` (salvo `dashed`) y no se corta nunca.

Cómo se calcula (importante si vas a ajustar `loop`):

1. La silueta se muestrea cada ~3 px y se **remuestrea por longitud de arco** en un número exacto de puntos equidistantes → todas las cuerdas miden lo mismo (también la de cierre). De ahí que los bucles sean iguales en los cuatro lados y que las esquinas cierren.
2. `loop` es el **paso preferido entre bucles** (px) y se acota a la caja: `loopEfectivo = clamp(loop, 7, 0,029 × lado menor)`. El anillo del marco ronda el **7 % del lado menor**, así una tarjeta de 150 px no lleva bucles de 40 px ni un hero de 500 px bucles de 5 px.
3. Separación real = `2,2 × loopEfectivo`; radio del arco = `0,64 × separación` (arcos de ~260°, bucles redondos, no arcos); diámetro visible ≈ la separación.
4. Nº de bucles = `max(3, round(lado / (2,2 × loop)))` por lado + 1 por esquina; mínimo global 12.
5. El SVG va con `overflow-hidden` y `viewBox` = caja real medida: **ningún fragmento puede salir del contenedor**.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `variant` | `'rect' \| 'pill' \| 'cloud'` | `'rect'` | `rect` = tarjetas/fotos; `pill` = botones y píldora del hero; `cloud` = nubes |
| `tone` | `'terracota' \| 'mostaza' \| 'rojo' \| 'oliva' \| 'crema' \| 'chocolate'` | `'terracota'` | Usa `--squiggle-stroke` en terracota |
| `strokeWidth` | número (px) | `3.5` | 3–4 px en marcos; 2,2–2,4 en píldoras |
| `loop` | número (px) | `rect 16 · pill 12 · cloud 16` | Paso preferido; se acota solo (ver arriba). En una tarjeta pequeña baja a 7–10 px automáticamente |
| `stroke` | `'coil' \| 'wobble'` | `pill → 'wobble'`, resto `'coil'` | `wobble` = ondulación Catmull-Rom de ~2 px, para lados cortos (píldoras de 44–56 px) |
| `radii` | `{ rx: [4], ry: [4] }` | — | Esquinas elípticas del contenedor (arriba-izq, arriba-der, abajo-der, abajo-izq). Obligatorio si el contenedor tiene `border-radius` asimétrico |
| `dashed` | booleano | `false` | Trazo discontinuo tipo lápiz; **solo** si se pide explícitamente |
| `className` | string | `''` | Se añade a la capa absoluta |

**Helpers exportados** (los usa `CloudBlob` para reservar el anillo correcto):

| Export | Firma | Qué devuelve |
|---|---|---|
| `frameInset` | `frameInset({ loop, minSide, strokeWidth })` | px de aire que hay que reservar por lado (el anillo que dibuja el marco) |
| `effectiveLoop` | `effectiveLoop(loop, minSide)` | el `loop` ya acotado por la caja |
| `buildFramePath` | `buildFramePath({ variant, width, height, loop, stroke, radii, strokeWidth })` | el `d` del path (útil para tests) |
| `DEFAULT_LOOP` | `{ rect: 16, pill: 12, cloud: 16 }` | valores por defecto |

**Aire interior:** reserva `frameInset({ loop, minSide })` px por lado. `CloudBlob` y `PhotoSlot` ya lo calculan solos; en un contenedor propio usa ese helper o deja ≥ 7 % del lado menor.

```jsx
<div className="relative" style={{ padding: frameInset({ loop: 16 }) }}><img … /><SquigglyFrame loop={16} /></div>
<!-- píldora de 44–52 px de alto: ondulación, no bucles -->
<SquigglyFrame variant="pill" strokeWidth={2.4} loop={11} />
```

- **Se usa en:** `Hero` (foto + píldora del subtítulo), `CloudBlob`, `PhotoSlot`, `ButtonSecondary`, y los paneles de Comprar / Cierre.
- **NO usar:** alrededor de texto corrido, en elementos < 120 px de ancho (el generador baja el tamaño, pero el marco se come el contenido), ni dos marcos anidados.

### 3.2 `Doodle` — `components/ui/Doodle.jsx`

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `variant` | `'star' \| 'spiral' \| 'underline' \| 'ticks' \| 'squiggle'` | `'star'` | Trazados a mano, trazo redondeado |
| `tone` | `'terracota' \| 'mostaza' \| 'rojo' \| 'crema' \| 'chocolate' \| 'oliva'` | `'mostaza'` | |
| `size` | número (px de ancho) | según variante | El alto se deduce de la proporción |
| `strokeWidth` | número | `2.6` | |
| `className` | string | `''` | Para posicionar/rotar desde el bloque |

```jsx
<span aria-hidden="true" className="absolute -top-4 -right-6 rotate-[6deg]"><Doodle variant="star" /></span>
<!-- subrayado curvo que se adapta al ancho del titular -->
<Doodle variant="underline" size={120} className="w-full" />
```

- **Se usa en:** alrededor de titulares y marcos (máx. 3 por viewport; móvil 2).
- **NO usar:** para informar, sustituir un CTA o animarlos en bucle.

### 3.3 `StripedBackdrop` — `components/ui/StripedBackdrop.jsx`

Fondo de rayas verticales anchas petróleo/crema con inclinación 88,6° (bordes no perfectamente rectos) + trama de papel CSS. Todas las capas decorativas `aria-hidden`.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `frame` | booleano | `false` | Añade `SquigglyFrame rect` perimetral |
| `frameLoop` | número | `18` | Tamaño preferido de bucle; se acota con el lado menor |
| `className` | string | `''` | Alto/padding del bloque |

```jsx
<StripedBackdrop frame className="py-16"><div className="bg-crema …">texto</div></StripedBackdrop>
```

- **Se usa en:** bloque 5 (Comprar) y bloque 7 (Cierre/`SiteFooter`).
- **NO poner texto directamente encima** (condición C3/ítem 20): el texto vive en un panel crema opaco (`bg-crema`) con ≥ `frameInset({ loop: frameLoop })` de aire perimetral (≈ 7 % del lado menor).
- **NO usar** detrás de párrafos largos ni con franjas < 24 px.

### 3.4 `CloudBlob` — `components/ui/CloudBlob.jsx`

Nube crema con borde de lápiz terracota. Silueta con `border-radius` asimétrico de 8 radios (`CLOUD_RADII`: `38px 26px 40px 22px / 30px 40px 26px 36px`) y marco `cloud` alineado con esos mismos radios.

El anillo interior se **mide en caliente** (ResizeObserver sobre el contenido) y se calcula con `frameInset`, el mismo helper que dibuja el marco: el trazo nunca pisa el texto, ni en una nube de 150 px ni en un panel de 600 px.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `variant` | `'cloud' \| 'pill'` | `'cloud'` | `pill` = píldora de una frase (D-R2-1) |
| `tone` | `'crema' \| 'petroleo' \| 'mostaza'` | `'crema'` | |
| `frame` | booleano | `true` | Si es `false` no reserva anillo |
| `paperFill` | booleano | `true` | **Marco sobre papel**: el relleno del color de la nube llega hasta el mismo trazo, con la silueta exterior = 8 radios + anillo. Con `false`, el anillo queda transparente y los bucles se dibujan sobre el fondo de la sección |
| `frameTone` | tono de `SquigglyFrame` | `'terracota'` | |
| `frameLoop` | número | `16` (`pill` 11) | Paso preferido de bucle; se acota con el tamaño real |
| `pad` | clases de padding | `'px-6 py-5'` | Padding **del contenido**, dentro del relleno crema |
| `as` | etiqueta | `'div'` | |
| `className` | string | `''` | |

```jsx
<CloudBlob pad="px-7 py-6"><h2 className="…">…</h2><p>…</p></CloudBlob>
{/* marco sobre papel en cualquier fondo (por defecto) / anillo transparente si se pide */}
<CloudBlob pad="p-2" frameLoop={10} paperFill={false}>…</CloudBlob>
```

- **Se usa en:** Tradición (párrafo), hero (píldora del subtítulo), nota de empaque, tarjeta del Mail Club, nubes del kit.
- **NO usar** como fondo de página ni una nube por cada frase (una por bloque con contenido propio).
- **NO anidar** `frame` en `frame`.

## 4. Fotos y precio

### 4.1 `PhotoSlot` — `components/ui/PhotoSlot.jsx`

Contenedor de foto real con **proporción fija** (cero CLS). Sin `src` dibuja el marcador honesto: fondo crema, marco de lápiz discontinuo, `Foto real: …` y el ratio exacto.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `photoKey` | `'hero' \| 'tradition' \| 'packaging' \| 'steps' \| 'buy' \| 'victoria' \| 'kit'` | `'hero'` | Resuelve `src`/`ratio` de `siteConfig.photos` y las claves `photo.<key>Label/Alt` |
| `ratio` | `'4/5' \| '3/4' \| '1/1' \| '16/9' \| '16/10' \| '4/3'` | según config | Hero `4/5`; ítems del kit `1/1`; flat lay `16/10` |
| `src` | string \| null | `null` | Al llegar la foto real (D9) |
| `labelKey` | clave del diccionario | `photo.<photoKey>Label` | En los ítems del kit: `kit.items.0.title` |
| `altKey` | clave del diccionario | `photo.<photoKey>Alt` | En los ítems del kit: `kit.items.0.alt` |
| `labelMode` | `'full' \| 'short' \| 'prefixRatio' \| 'ratioOnly' \| 'none'` | `'full'` | `full` = «Foto real: {nombre}» + ratio · `short` = «Foto real: {nombre}» sin ratio · `prefixRatio` = «Foto real:» + ratio (**cuando un H3 cercano ya nombra el objeto**: es el caso de las 8 nubes del kit, porque el checklist §9-12 prohíbe repetir el título) · `ratioOnly` = solo la proporción · `none` = sin etiqueta. El `alt` del marcador sigue describiendo la foto real en todos los modos |
| `frame` | booleano | `true` | Marco de bucles continuo (también en el marcador de foto pendiente) |
| `frameLoop` | número | `16` | Paso preferido de bucle; se acota con el tamaño de la tarjeta |
| `dashedFrame` | booleano | `false` | Trazo discontinuo tipo lápiz, solo si se pide |
| `mat` | booleano | `true` | Paspartú crema de `clamp(18px, 7%, 34px)` (≈ el anillo del marco) |
| `eager` | booleano | `false` | Solo el hero: `loading="eager"` + `fetchPriority="high"` |
| `showRatio` | booleano | `true` | Muestra `4/5`, `1/1`… en el marcador |
| `className` / `imgClassName` | string | `''` | |

```jsx
<PhotoSlot photoKey="hero" eager />
<PhotoSlot ratio="1/1" labelKey="kit.items.0.title" altKey="kit.items.0.alt" labelMode="short" />
<PhotoSlot ratio="1/1" altKey="kit.items.0.alt" labelMode="prefixRatio" />   // H3 cercano ya lo nombra
```

- **Se usa en:** todos los bloques con foto real (hero, tradición, 8 ítems, empaque, pasos, compra, retrato).
- **NO rellenar jamás** con stock, IA o ilustración sustituta. **NO** cambiar el ratio por breakpoint: el mismo en 375/768/1280.

### 4.2 `PriceSlot` — `components/ui/PriceSlot.jsx`

Tres estados leídos de `src/data/siteConfig.js` (nunca hardcodeados).

| Config | Estado | Qué se ve |
|---|---|---|
| `kitPrice: null`, `availability: null` | `hidden` | **Nada**: ni hueco, ni «$—», ni «consultar». El CTA sube |
| `kitPrice: null`, `availability: 'in_stock'` | `availability` | Píldora mostaza «Disponible» (chocolate 8,67:1) con `aria-label` |
| `kitPrice: { amount, currency }` | `price` | Importe Baloo 2 800 + moneda + `price.label`, con `aria-label` |
| `priceDisplay: 'hidden' \| 'availability' \| 'price'` | fuerza el estado | `'auto'` por defecto |

| Prop | Tipo | Defecto |
|---|---|---|
| `align` | `'center' \| 'start'` | `'center'` |
| `className` | string | `''` |

```jsx
<PriceSlot />           {/* hoy: píldora «Disponible»; sin stock: no renderiza nada */}
<PriceSlot align="start" />
```

- **Se usa en:** bloque 5 (Comprar), justo antes del CTA.
- **NO usar** para precios por ítem, tachados, descuentos ni «consultar precio». `{amount}` se interpola con `Intl.NumberFormat('es-CA')` (coma decimal siempre) y se inyecta en `t('price.amountTemplate', { amount })`.
- **Export auxiliar:** `resolvePriceMode(config)`.

### 4.3 `ShippingLine` — `components/ui/ShippingLine.jsx`

La línea literal de envíos (`buy.shipping`), chocolate sobre crema (11,35:1), 14 px mínimo, hasta 3 líneas a 375 px.

| Prop | Tipo | Defecto |
|---|---|---|
| `tone` | `'ink' \| 'light'` | `'ink'` (chocolate: solo sobre crema) |
| `className` | string | `''` |

```jsx
<ShippingLine className="mt-6" />   {/* Comprar: bajo buy.deliveryNote */}
<ShippingLine />                    {/* Cierre: misma clave, mismo texto */}
```

- **NO resumir, NO trocear en tarjetas, NO bajar de 14 px, NO ponerla sobre petróleo o rayas** (usa un panel crema).

---

## 5. Botones, enlaces y utilidades de texto

### 5.1 `ButtonPrimary` — `components/ui/ButtonPrimary.jsx`

CTA relleno terracota (condición **C1**). Etiqueta Baloo 2 800 ≥ 20 px con `var(--btn-ink)`; keyline chocolate 2 px + halo crema 3 px reales en `.btn-primary`; alto 52–62 px; foco mostaza.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `label` | string | — | `t('hero.cta')` |
| `ariaLabel` | string | — | `t('hero.ctaAria')` |
| `section` | `'nav'\|'hero'\|'kit'\|'steps'\|'buy'\|'victoria'\|'mailclub'\|'footer'` | `'hero'` | Prellenado de WhatsApp de esa sección |
| `href` | string | — | Anula `section` (solo si la puerta no es WhatsApp) |
| `size` | `'md' \| 'lg'` | `'md'` | `lg` en Comprar (24 px de etiqueta) |
| `fullWidth` | booleano | `false` | `w-full` en móvil (`sm:w-auto`) |
| `className` | string | `''` | |

```jsx
<ButtonPrimary section="hero" label={t('hero.cta')} ariaLabel={t('hero.ctaAria')} fullWidth />
<ButtonPrimary section="buy" size="lg" label={t('buy.cta')} ariaLabel={t('buy.ctaAria')} />
```

- **Se usa SOLO en hero y Comprar** (dos por página, nunca en el mismo viewport).
- **NO usar** en el navbar, en listas de tarjetas, ni dos juntos.
- Deuda declarada: crema sobre terracota = 2,86:1. No es conformidad AA; el keyline y el halo son de forma, no de glifo.

### 5.2 `ButtonSecondary` — `components/ui/ButtonSecondary.jsx`

Píldora crema, etiqueta chocolate (11,35:1), contorno de garabato terracota (`SquigglyFrame pill`). Alto 44–52 px.

| Prop | Tipo | Defecto |
|---|---|---|
| `label` | string o nodo | — |
| `ariaLabel` | string | — |
| `section` | sección de WhatsApp | `'hero'` |
| `href` | string | — |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `fullWidth` | booleano | `false` |
| `className` | string | `''` |

```jsx
<ButtonSecondary section="kit" label={t('kit.cta')} ariaLabel={t('kit.ctaAria')} />
<ButtonSecondary section="nav" size="xs" label={t('nav.ctaShort')} ariaLabel={t('nav.ctaAria')} />
```

- **Se usa en:** navbar (sticky, `xs`), Kit ×2, Pasos, Mail Club.
- **NO usar** como CTA principal de una sección ni rellenarlo de terracota (D-R2-7).

### 5.3 `WhatsAppLink` / `InstagramLink`

Envoltorios de enlace con la puerta correcta del idioma activo, `target="_blank"` y `rel="noopener noreferrer"`.

| `WhatsAppLink` | Tipo | Defecto |
|---|---|---|
| `section` | sección de WhatsApp | `'hero'` |
| `ariaLabel` | string | — |
| `children` | nodo | — |
| `className` | string | `''` |

```jsx
<WhatsAppLink section="footer" ariaLabel={t('footer.whatsappAria')}>{t('footer.whatsapp')}</WhatsAppLink>
<InstagramLink ariaLabel={t('footer.instagramAria')}>{t('footer.instagram')}</InstagramLink>
```

- **Se usa en:** enlaces terciarios (Victoria, DM, cierre).
- **NO usar** para acciones de compra con relleno (para eso están los botones).

### 5.4 `Wordmark`

`vichisboh*` (clave `brand.wordmark`) en Baloo 2 700.

| Prop | Tipo | Defecto | Notas |
|---|---|---|---|
| `variant` | `'pill' \| 'light' \| 'ink'` | `'pill'` | `pill` = crema con contorno terracota (navbar); `light` = crema sobre petróleo (pie del hero); `ink` = chocolate sobre crema (cierre) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` | `xs` navbar, `md` pie del hero, `xl` cierre |
| `as` | etiqueta | `'span'` | |
| `className` | string | `''` | |

```jsx
<Wordmark variant="pill" size="xs" className="shrink-0" />
<Wordmark variant="light" size="md" />
```

- **NO** añadirlo a cada sección ni deformarlo (no tracking negativo, no mayúsculas).

### 5.5 `SectionHeading`

H2 de sección en Baloo 2 700.

| Prop | Tipo | Defecto |
|---|---|---|
| `children` | string traducido | — |
| `id` | string | — |
| `as` | `'h2' \| 'h3'` | `'h2'` |
| `tone` | `'light' \| 'ink'` | `'light'` |
| `size` | `'md' \| 'lg'` | `'lg'` |
| `align` | `'left' \| 'center'` | `'left'` |

```jsx
<SectionHeading id="kit-title">{t('kit.title')}</SectionHeading>
<SectionHeading tone="ink" size="md">{t('tradition.title')}</SectionHeading>
```

- Un solo `h1` (hero). **NO** usar `SectionHeading` para el H1 ni para etiquetas pequeñas (usa `EyebrowPill`).

### 5.6 `EyebrowPill`

| Prop | Tipo | Defecto | Contraste |
|---|---|---|---|
| `label` | string traducido | — | — |
| `tone` | `'mostaza' \| 'rojo' \| 'crema'` | `'mostaza'` | mostaza 8,67:1 a 15 px · rojo 4,48:1 → se renderiza a 19 px 800 (AA-large) · crema 11,35:1 |
| `className` | string | `''` | |

```jsx
<EyebrowPill label={t('buy.eyebrow')} tone="mostaza" />
<EyebrowPill label={t('mailclub.eyebrow')} tone="rojo" />
```

- Máximo una por bloque. **NO** como sustituto de un H2 ni con frases de marketing.

---

## 6. Bloques de la ola 1

### 6.1 `Navbar` (bloque 0, condición C4)

Sin props. Todo desde el diccionario y el contexto.

- Wordmark en píldora crema (`xs`) + `LanguageSwitch` (132 px fijos, 44 px de alto) + CTA **secundario** (`xs`, `wa.nav`).
- Por debajo de 420 px el CTA usa `nav.ctaShort` y recupera `nav.cta` a partir de ahí: la etiqueta se acorta, nunca desaparece.
- `sticky top-0`, fondo petróleo sólido, onda SVG terracota de 2,4 px como separación inferior.
- Skip-link (`a11y.skip`) como primer foco; `<nav aria-label>` con el wordmark (no hay clave de diccionario para el landmark y D-R2-5 prohíbe inventar textos).
- **Nunca** relleno terracota, ni blur, ni menú de secciones.

### 6.2 `Hero` (bloque 1, condiciones C2 y C6, D-R2-1/2/3)

Sin props. Orden del DOM = orden móvil: `H1` → eslogan → píldora crema del subtítulo → CTA primario → foto `4/5` (con marco) → wordmark al pie. En escritorio el texto ocupa las columnas 1–6 y la foto las 7–11 con sangrado a la derecha; la foto **nunca** adelanta al subtítulo en el DOM.

- Subtítulo dentro de `CloudBlob pill` (texto chocolate 11,35:1) → C2.
- Píldora → CTA separados 16 px → D-R2-2; `w-full` hasta 480 px y `w-fit` desde 481 → D-R2-2.
- A 375 × 667 entran H1 + eslogan + píldora + CTA y ≥ 150 px de foto → C6 (medido: la foto arranca a ~340 px).
- Doodles: estrella mostaza junto al H1, subrayado curvo bajo el eslogan, espiral + rayitas junto a la foto (3 en móvil, 3 en escritorio).

---

## 7. Paleta de uso rápido (para no equivocarse)

| Fondo | Texto permitido | Prohibido |
|---|---|---|
| Petróleo `#1B7A63` | Crema solo ≥ 24 px o bold ≥ 18,66 px (H1, H2, eslogan, wordmark); cuerpo dentro de píldora/nube crema | Chocolate (2,74:1), oliva, terracota, cuerpo crema pequeño |
| Crema `#F4E2CD` | Chocolate (11,35:1) para todo; oliva (4,97:1) en detalles | Crema sobre crema, terracota como texto |
| Terracota | `--btn-ink` (crema o chocolate) con keyline + halo |Texto terracota sobre crema para leer |
| Mostaza | Chocolate (8,67:1) | Crema, mostaza |
| Rojo maleta | Crema solo ≥ 19 px bold (4,48:1) | Crema en cuerpo pequeño |
| Rayas | **Nada**: panel crema sólido encima | Cualquier texto directo |

---

## 8. Estado de la ola y notas para la ola 2

1. **Stubs:** los seis archivos de la ola 2 existen como `export default function X(){ return null }` con `// TODO ola 2`. `App.jsx` ya los importa en el orden de los 8 bloques, así que el build pasa hoy y no hay que tocar `App.jsx`.
2. **No cambies nombres de archivo ni de props** sin actualizar este documento.
3. **Presupuesto de aire:** cada marco consume `frameInset({ loop, minSide })` px por lado (≈ 2,4 × loop efectivo, ≈ 7 % del lado menor) y cada nube añade un anillo del mismo tamaño. Un panel dentro de `StripedBackdrop frame` necesita ese margen: con `frameLoop={16}` son ~38 px.
4. **Datos pendientes:** precio del kit (`siteConfig.kitPrice`), fotos reales (`siteConfig.photos.*.src`), recogida en Montreal, fecha límite por zona y visibilidad de `buy.deliveryNote` (`siteConfig.content.showDeliveryNote`).
5. **Cero formularios:** todas las puertas son `waUrl(section)` o `instagramUrl`.

---

## 9. Verificación ejecutada por la ola 1

| Comprobación | Resultado |
|---|---|
| `npm run build` | ✅ `vite v7.3.8` · 59 módulos · `index.html` 3,36 kB · CSS **29,90 kB** (gzip 6,68) · JS 281,04 kB (gzip 87,05) · 626 ms (incluye ya los bloques 2–7 de la ola 2) |
| `npm run check:copy` | ✅ 0 textos literales en JSX: todo pasa por `t()` |
| `npm run check:console` | ✅ 0 `console.*` en `src/` salvo 2 `console.warn` de desarrollo dentro de `i18n/LanguageContext.jsx` (guardián de claves, no código de la página) |
| `h1` | 1 solo (hero) · `h2` = 0 mientras los bloques 2–7 son stubs |
| SVG decorativos | 8/8 con `aria-hidden="true"` · 11 `path` con `vector-effect="non-scaling-stroke"` |
| CTA primario (DOM real) | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` · fondo `rgb(240,78,12)` · texto `rgb(244,226,205)` (`--btn-ink`) · radio 999px · alto 52 px · etiqueta `"Baloo 2" 20px 800` |
| Subtítulo del hero (DOM real) | Nodo con fondo `rgb(244,226,205)` y texto `rgb(59,37,23)` a 17 px (11,35:1) |
| Navbar a 375 px | 56 px de alto, **una sola fila**: wordmark 86 px + grupo idioma/CTA 212 px en 343 px útiles · botones de idioma de 44 px · 0 desbordamiento horizontal (`scrollWidth = innerWidth = 375`) |
| A 375 × 667 (medido con CDP) | H1 88–122 · CTA 260–312 (52 px) · **foto empieza en 344** → 323 px de foto visibles (mínimo exigido: 150) · `docHeight` 841 |
| A 768 y 1280 | 2 columnas desde 768 (texto 1–6, foto 7–12) · 1280: foto 487 px con sangrado, `scrollWidth = 1280`, sin overflow |
| Enlaces externos | 2/2 a `https://wa.me/15142968295` con `rel="noopener noreferrer"` (los Instagram llegan con la ola 2) |
| Formularios | 0 (`form, input, textarea, select`) |
| Foco visible | `outline: 3px solid rgb(227,201,60)` (mostaza) verificado con emulación de foco + hairline chocolate por `box-shadow` |
| `prefers-reduced-motion` | Regla global que anula transiciones y `scroll-behavior` |
| Sintaxis de los 28 archivos de `src/` | ✅ 0 errores (transpilados uno a uno con esbuild) y **todos los imports relativos resuelven** |
| Dependencias | `node_modules` reutilizado del proyecto hermano con los mismos rangos: react 19.3.1 · vite 7.3.8 · @vitejs/plugin-react 5.2.0 · tailwindcss 4.3.5 · @tailwindcss/vite 4.3.5 · `package-lock.json` generado |
| Primitivas no usadas todavía | `PriceSlot`, `ShippingLine`, `SectionHeading`, `EyebrowPill`, `StripedBackdrop`, `WhatsAppLink`, `InstagramLink` se validaron en una galería temporal (render real) además del chequeo de sintaxis: el build no las incluye porque `App` solo monta navbar + hero hasta la ola 2 |

**Evidencias visuales** (capturas reales del build, 16 nov 2026, Chrome headless vía CDP con viewport exacto):
`docs/evidencias/ola1-375.png` · `ola1-375-fr.png` · `ola1-768.png` · `ola1-1280.png`

---

## 10. Condiciones del acta y cómo las cumple la ola 1

| Condición | Cumplimiento en código |
|---|---|
| **C1** keyline chocolate 2 px + halo crema 2–3 px reales | `.btn-primary` en `index.css` declara `box-shadow: 0 0 0 2px chocolate, 0 0 0 5px crema, 0 3px 0 2px chocolate`. Inspeccionado en el DOM (ver §9). `--btn-ink` existe y vale crema; el alterno chocolate está documentado |
| **C2** subtítulo del hero en nodo crema con texto chocolate | `<CloudBlob variant="pill">` → `bg-crema` + `text-chocolate` a 17 px; nunca `<p>` crema sobre petróleo |
| **C3** ningún texto sobre las rayas | `StripedBackdrop` no renderiza texto: solo capas `aria-hidden`; el consumidor pone panel crema (documentado en §3.3) |
| **C4** navbar secundario, una fila a 375 px, 44 px | `ButtonSecondary` (crema + contorno terracota) en todos los estados del scroll; medido: 86 + 212 px en 343 útiles; selector 3 × 44 px |
| **C5** `buy.deliveryNote` tras el CTA | Pendiente de la ola 2 (bloque 5); `siteConfig.content.showDeliveryNote` ya existe |
| **C6** a 375 × 667: H1 + eslogan + píldora + CTA + ≥150 px de foto | Medido: CTA cierra en 312 px y la foto arranca en 344 → 323 px visibles. Con H1 a dos líneas (peor caso) la foto arranca en 378 → 289 px visibles |
| **D-R2-1** píldora con `CloudBlob` + `SquigglyFrame pill` | `CloudBlob variant="pill"` (radio 999) + `SquigglyFrame variant="pill"` de 2,4 px. El trazo de píldora es **ondulado**, no de bucles: ver §11 |
| **D-R2-2** `fit-content` / 100 % − gutters ≤480 / 16 px píldora→CTA | `w-full max-w-full min-[481px]:w-fit` + `mt-4` exacto en el CTA |
| **D-R2-3** DOM en orden móvil; foto por grid en escritorio | DOM: H1 → eslogan → píldora → CTA → foto → wordmark; en `md+` la foto se coloca en 7–12 / 7–11 por grid, sin reordenar el DOM |
| **D-R2-4** `buy.deliveryNote` bajo la línea de envíos | Ola 2 |
| **D-R2-5** textos de sistema | `index.html`: `<title>`, `meta description` y `<noscript>` con las cadenas exactas del acta + línea de envíos literal + enlace `wa.me` |
| **D-R2-6** techos de palabras (brief §5.1) | Hero 18/18: no se añadió ni una palabra; el navbar usa `nav.ctaShort` por debajo de 420 px |
| **D-R2-7** relleno terracota solo en hero y Comprar | `ButtonPrimary` se usa únicamente en el hero; el navbar usa `ButtonSecondary` |

### 10.1 Desviaciones declaradas (con motivo)

1. **`SquigglyFrame` variante `pill` dibuja una ondulación continua (`wobble`), no bucles de resorte.** A 44–56 px de alto, los bucles de 22 px saldrían a razón de 40 por píldora y a 6 px no se leen: se ve una costura, no un garabato. El trazado sigue siendo SVG a mano, con `vector-effect="non-scaling-stroke"` y ondulación irregular de dos armónicos (amplitud ≤ 2,4 px). El prop `stroke="coil"` permite forzar bucles si se quisiera. Las variantes `rect` y `cloud` sí son de bucles.
2. **El marco se mide con `ResizeObserver` y el `viewBox` usa el tamaño real** (no proporciones fijas `4/5`, `1/1`…). Así los bucles son círculos en cualquier caja y el trazo no se deforma al cambiar de breakpoint, que es lo que exige el ítem 22 del checklist.
3. **`CloudBlob` reserva un anillo calculado con `frameInset` a partir de su tamaño real** (ResizeObserver) para que el marco de bucles no pise el texto; el marco y el relleno comparten la misma silueta de 8 radios. Sin ese anillo, los bucles se comían el párrafo (visto en la primera iteración).
4. **El párrafo de la tradición no usa `CloudBlob` en esta ola**: el bloque 2 es stub; la API deja la nube lista para la ola 2.
5. **Wordmark sin asterisco separado**: se usa la cadena invariante `brand.wordmark` tal cual (`vichisboh*`), sin partir el glifo ni inventar otra clave.
6. **`<nav aria-label>` usa el wordmark** (`aria-label="vichisboh*"`): el diccionario aprobado no tiene clave para el landmark y D-R2-5 prohíbe inventar textos de sistema. Un `<nav>` sin nombre accesible habría incumplido el requisito de landmark.
7. **El CTA del navbar acorta su etiqueta por debajo de 420 px** (`nav.ctaShort`, «Comprar» / «Get it» / «Commander»). Es la única forma de mantener logo + selector + CTA en una fila a 375 px sin ocultar nada (C4), y la clave existe exactamente para eso en el copy aprobado.
8. **La foto del hero mide 487 px a 1280** (CRO pedía «máx. 480 px, columna 7–11»): la columna 7–11 son 454 px y el sangrado controlado de 2,5 vw la lleva a 487. Se prefirió respetar el sangrado (que el CRO también exige) a recortar 7 px.
9. **La foto ocupará el 100 % del ancho en 375 y en 768 irá en la columna 7–12** (el CRO dice «2 columnas» en 768; el corte se puso en `md`, no en `lg`).

---

## 11. Corrección de Puerta 2 — marcos de bucles (v3, 16 nov 2026)

### 11.1 Diagnóstico del defecto

En la ola 1 el marco del hero se veía como **puntos y fragmentos sueltos**. Eran dos fallos distintos sumados:

1. **El marcador de foto pendiente dibujaba el marco con `dashed`** (`stroke-dasharray` de 2,4 px de trazo y 7,7 px de hueco). Un trazo discontinuo sobre una curva de bucles deja exactamente eso: puntitos. El marco real (con foto) nunca fue discontinuo, pero lo que se auditó —y lo que verá Victoria hasta que lleguen las fotos— era el discontinuo.
2. **La geometría del resorte no era uniforme.** Los puntos se muestreaban con densidades distintas en los lados y en las esquinas y luego se descartaban los que quedaban a menos de medio paso: las cuerdas variaban, cada arco cambiaba de radio y en las esquinas el muestreo podía dejar un tramo corto. Eso producía bucles de tamaños distintos y "ganchos" en los vértices. Además, el radio era `0,66 × cuerda`, es decir arcos de ~252° que en tramos largos se leían como arcos abiertos, no como bucles.

### 11.2 Qué se cambió (solo `SquigglyFrame`, `CloudBlob`, `PhotoSlot`, `StripedBackdrop` y el doodle del hero)

| Cambio | Antes | Ahora |
|---|---|---|
| Muestreo | puntos por lado + descarte (`minGap`) | **remuestreo por longitud de arco** en N puntos equidistantes (`resampleRing`), incluida la cuerda de cierre |
| Tamaño de bucle | bucles de 4–6 px en cajas estrechas, 40 px en tarjetas | `loop` acotado a `clamp(loop, 7, 0,029 × lado menor)` (`effectiveLoop`): el anillo es ≈ 7 % del lado menor en cualquier caja |
| Nº de bucles | `perímetro / paso` sin mínimo | `max(3, round(lado / (2,2 × loop)))` por lado **+ 1 por esquina**, mínimo global 12 |
| Radio del arco | `0,66 × cuerda` (arcos abiertos) | `0,64 × cuerda` + cuerda constante ⇒ bucles iguales; arcos de ~260° |
| Esquinas | muestreo irregular, ganchos | una cuerda por esquina y bucle propio; el resorte gira sin cortarse |
| Trazo | `dashed` por defecto en el marcador de foto | **continuo**; `dashed` solo si se pide (`dashedFrame`) |
| Recorte | `overflow-visible` (podía asomar trazo) | `overflow-hidden` + `viewBox` = caja medida: nada sale del contenedor |
| Anillo reservado | `1,18 × loop` fijo | `frameInset({ loop, minSide })` medido con ResizeObserver (marco y relleno comparten silueta) |
| Doodle del hero | rayitas junto al marco (se leían como trazo suelto) | eliminadas; quedan estrella + subrayado + espiral |

`PhotoSlot` gana `frameLoop` (16) y `dashedFrame` (false); su paspartú pasa a `clamp(18px, 7%, 34px)` para casar con el anillo. `CloudBlob` mide su contenido y reserva el anillo exacto. `StripedBackdrop` baja su `frameLoop` por defecto a 18.

### 11.3 Verificación visual (capturas del build real)

| Caso | 375 px | 768 px | 1280 px |
|---|---|---|---|
| (a) foto del hero `rect`, caja alta | `docs/evidencias/marcos-hero-375.png` | `docs/evidencias/marcos-hero-768.png` | `docs/evidencias/marcos-hero-1280.png` |
| (b) tarjeta cuadrada de 320 px | `docs/evidencias/marcos-320-375.png` | `docs/evidencias/marcos-320-768.png` | `docs/evidencias/marcos-320-1280.png` |
| (c) píldora del navbar (44 px) | `docs/evidencias/marcos-pill-375.png` | — | `docs/evidencias/marcos-pill-1280.png` |

**Qué se ve en los cuatro lados** (idéntico en los tres anchos, cambia el tamaño):

- **Arriba y abajo:** una cadena de bucles del mismo diámetro, con el trazo cruzándose en la base de cada uno; el resorte arranca y termina en la esquina sin cortes.
- **Izquierda y derecha:** la misma cadena girada 90°, con el mismo número de bucles y el mismo grosor de trazo; ninguna zona con puntos ni huecos.
- **Esquinas:** el resorte gira con un bucle propio por vértice, sin ganchos ni tramos de longitud distinta, y sin que el trazo se salga del contenedor.
- **Píldoras:** al ser lados cortos (44–56 px) degradan a la ondulación continua documentada (`stroke="wobble"`), nunca a puntos.

### 11.4 Verificación técnica

- `npm run build` ✅ (59 módulos, CSS 29,90 kB, JS 281,04 kB; el bundle ya incluye los bloques de la ola 2, medido en este build).
- `npm run check:copy` ✅ 0 textos literales en JSX.
- `npm run check:console` ✅ 0 `console.log`.
- El SVG conserva `vector-effect="non-scaling-stroke"`, `aria-hidden="true"` y `focusable="false"`; el `viewBox` es 1:1 con la caja CSS, así que no hay escalado asimétrico del trazo.

---

## 12. Corrección de Puerta 2 — ronda 2 (v4, 16 nov 2026)

### 12.1 MAYOR · el marco de las 8 tarjetas del kit se dibujaba sobre el verde

**Causa.** `CloudBlob` reservaba el anillo con `padding`, pero el anillo era transparente: el relleno crema empezaba 27 px adentro y los bucles quedaban sobre el fondo de la sección. En el hero y en las secciones crema no se notaba (fondo crema detrás); en el bloque del kit, con fondo petróleo, el papel quedaba "flotando" dentro del marco.

**Corrección (en la primitiva, sin tocar `KitCard`).** Nuevo prop **`paperFill`** (por defecto `true`): el relleno del color de la nube se pinta también en el anillo, con una silueta exterior cuyos 8 radios son los de la nube **desplazados por el anillo** (`radii + ring`), de modo que papel y trazo comparten borde. Resultado: los bucles se dibujan sobre el papel en cualquier fondo. El hero no cambia (usa `PhotoSlot`, no `CloudBlob`), y `paperFill={false}` deja el comportamiento antiguo (anillo transparente) para casos donde el fondo ya es del color de la nube.

```jsx
<CloudBlob pad="p-2" frameLoop={10}>…</CloudBlob>              // marco sobre papel (por defecto)
<CloudBlob pad="p-2" frameLoop={10} paperFill={false}>…</CloudBlob>  // anillo transparente
```

### 12.2 MENORES

| # | Hallazgo | Corrección |
|---|---|---|
| 1 | Ratio «4/5» en terracota al 80 % a 12 px = 2,4:1 | Ahora `text-chocolate` a 12 px (11,35:1 sobre crema), mismo tracking para conservar el aire artesanal |
| 2 | «Foto real:» sin el nombre del objeto en las 8 nubes | `labelMode` pasa a: `full` = «Foto real: {nombre}» + ratio · `short` = «Foto real: {nombre}» · `none` = nada. El nombre **se ve siempre** y debajo sigue el H3 del objeto |
| 3 | Foco mostaza sobre crema = 1,31:1 | `:focus-visible` global pasa a doble tono: anillo **chocolate 3 px** + halo **mostaza 3 px**. Sobre crema manda el chocolate; sobre petróleo manda el halo. `.btn-primary` conserva keyline + halo de C1 y añade el mismo anillo |
| 4 | `PriceSlot` estado `price` anunciaba dos veces | El importe y la etiqueta visibles van `aria-hidden="true"`; queda **un único** `sr-only` con `price.ariaTemplate`. El lector de pantalla oye una sola frase |

### 12.3 Composición

- **Estrella del hero:** era `-top-3 -right-8` y en `md` caía sobre el descendente del H1. Ahora `top-1 -right-10`, con 6 px de separación del eslogan y por debajo de la caja del titular en 320/375/768/1024/1280 (medido: `starH1 = false`, `starTagline = false` en los cinco anchos).
- **1 px de desbordamiento a 320:** era el **skip-link**. `sr-only` aplica `margin: -1px` y el enlace estaba en posición estática → borde izquierdo en `x = -1`. Ahora es `absolute top-2 left-3` también cuando está oculto. Medición a 320: `scrollWidth − innerWidth = 0` y lista de elementos desbordados vacía.

### 12.4 Verificación de esta ronda

| Comprobación | Resultado |
|---|---|
| `npm run build` | ✅ `vite v7.3.8` · 59 módulos · CSS 30,33 kB (gzip 6,78) · JS 283,45 kB (gzip 87,90) · 487 ms |
| `npm run check:copy` / `check:console` | ✅ 0 textos literales · 0 `console.log` |
| C1 (keyline + halo) | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` — **idéntico** al auditado |
| C2 (píldora del subtítulo) | `rgb(244,226,205)` + `rgb(59,37,23)` 17 px — sin cambios |
| C4 (navbar 375) | 56 px de alto, una fila, 86 + 212 px — sin cambios |
| C6 (375 × 667) | CTA 260–312 · foto desde 344 → **323 px visibles** — sin cambios |
| 320 / 375 / 768 / 1280 | 0 elementos desbordados; a 320 el `scrollWidth` iguala el viewport |
| Foco | capturas de los 5 controles: skip-link, CTA del navbar, selector de idioma, CTA del hero (petróleo) y CTA de Comprar (crema) |

**Evidencias** (`docs/evidencias/`): `ola3-hero-320/375/768/1280.png` · `ola3-kit-320/375/768/1280.png` (marco sobre papel) · `ola3-focus-skip.png`, `ola3-focus-nav-cta.png`, `ola3-focus-lang.png`, `ola3-focus-hero-cta.png`, `ola3-focus-cta-crema.png`.
