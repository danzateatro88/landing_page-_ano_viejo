ESTADO: APROBADO

# Puerta 2 — Verificación técnica, **ronda 2** (re-auditoría de correcciones)

**Proyecto:** `vichito-2026/` — Landing «Vichito, el año viejo» · `vichisboh*`
**Build auditado:** `npm run build` del 16-nov-2026 15:33 → `dist/index.html` 3,36 kB + `assets/index-BCR7QkUc.js` 283,57 kB (87,93 kB gzip) + `assets/index-zv7c_Q2C.css` 30,33 kB (6,78 kB gzip), servido en `http://localhost:4400/`.
**Stack medido:** Vite 7.3.8 · React 19 · Tailwind CSS v4 (CSS-first). 59 módulos.
**Fecha:** 16 de noviembre de 2026 · faltan 45 días para el 31 de diciembre.
**Método:** medición por CDP sobre Chrome headless 157 (`getComputedStyle`, `getBoundingClientRect`, `document.fonts`, `performance`, eventos de consola/excepción, Tab real con `Input.dispatchKeyEvent`, capturas 2× con muestreo de píxel en Python/Pillow). 11 cargas ancho × idioma (320/375/390/768/1024/1280 × ES/EN/FR), 6 escenarios de idioma, 29 paradas reales de teclado (15 a 375 + 14 a 1280: a 1280 el 15.º Tab cae en `BODY` al no quedar más controles), 2 builds temporales en `.tmp/r2-temp` (estados `price` y `availability` del `PriceSlot`) y 1 prueba con `localStorage` bloqueado. **No se ha modificado ninguna línea del proyecto**: la copia temporal vive en `.tmp/`, y se comprobó que `src/data/siteConfig.js` sigue con `kitPrice = null`, `availability = null` y `priceDisplay = 'auto'` (líneas 13, 24 y 30).

---

## 1. Veredicto en una línea

**Las ocho correcciones declaradas están cerradas de verdad**: cinco al 100 % (1, 2, 3, 5, 7) y tres con una sola cláusula a medias (4 y 8 dejan **1 px** de desbordamiento a 320 px; 6 deja fuera del anillo global al selector de idioma), **no hay ninguna regresión** en textos, enlaces, idioma, consola, bundle ni estética, **los tres mayores del QA están cerrados** y **C1–C6 se cumplen medidas en el DOM**, incluida la cláusula (c) de C6 que fallaba. Queda **un mayor heredado** que la ola no tocó (el `PhotoSlot 3/4` de Tradición, desviación de `§5.2` sin addendum) y **cuatro menores**. Ninguno bloquea publicar; lo que bloquea sigue siendo de Victoria (fotos, precio, alcohol, fecha de pedidos).

---

## 2. Tabla de cierre de la ronda 1 → ronda 2

### 2.1 Mis 2 MAYORES y 10 MENORES (informe `docs/puerta2-tech.md`)

| ID | Hallazgo (ronda 1) | Estado ronda 2 | Evidencia medida / archivo:línea |
|---|---|---|---|
| **M1** | `?lang=` no forzaba el idioma si había elección guardada | **CERRADO** | `LanguageContext.jsx:111-147`: `readLangFromQuery()` → `SUPPORTED` → `persistLang()` → `localStorage` → ES. Medido: `?lang=fr` con `storage=es` → `<html lang="fr">`, H1 «Vichito, l'Año Viejo», storage reescrito a `fr` (escenario 2). Sin `ReferenceError`: `persistLang` es *function declaration* hoisted y las 11 cargas dan **0 excepciones** |
| **M2** | Bloque 2 (Tradición) no monta el `PhotoSlot 3/4` de `§5.2` | **ABIERTO** (heredado, no bloqueante) | `Tradition.jsx:16-19` (comentario que lo justifica) y `:59-69` (solo `CloudBlob`). Medido: los 10 `role="img"` de la página están en hero (1), kit (8) y Victoria (1); **0 en `#tradicion`**. `photos.tradition` sigue en `siteConfig.js` sin uso. La ola no tocó el archivo (mtime 14:58, anterior a la ola 15:24–15:32) |
| **m1** | Ratio del marcador en terracota/80 a 12 px = 2,4:1 | **CERRADO** | `PhotoSlot.jsx:107-111`: `text-chocolate` `700 12px/19,8px "Baloo 2"`, color computado `rgb(59,37,23)` sobre crema → **11,35:1**. Texto del ratio medido: «4/3» en kit a 375/390 y «1/1» desde 640 |
| **m2** | Foco sobre crema: anillo mostaza 1,31:1; `§8.3` pedía chocolate 3 px | **PARCIAL** | `index.css:100-104`: `:focus-visible { outline: 3px solid chocolate; offset 3; box-shadow 0 0 0 6px mostaza }` → **medido en 12 de 15 paradas** (`outline: rgb(59,37,23) solid 3px`, `box-shadow: rgb(227,201,60) 0 0 0 6px`). **El selector de idioma no hereda ese anillo**: `LanguageSwitch.jsx:68-70` lo sustituye por outline mostaza 3 px + `inset 0 0 0 1,5px chocolate` (utility layer gana a base). En crema la visibilidad la da el hairline chocolate de 1,5 px (11,35:1), no el anillo mostaza (1,31:1) |
| **m3** | «Foto real:» con dos puntos y nada detrás | **CERRADO** | `PhotoSlot.jsx:63-68` (`prefixRatio`) + `:101-111`: en las 8 tarjetas se lee «**Foto real:**» / «**4/3**» (o «1/1»), sin nombre repetido; el H3 de la misma tarjeta nombra el objeto. Medido en las 8: `label.text = "Foto real:"`, `ratioSpan.text = "4/3"` |
| **m4** | A 768 los 3 pasos siguen en 1 columna | **ABIERTO** | `HowItWorks.jsx:54` (`xl:grid-cols-3`). Medido a 768: las 3 tarjetas con `x=32` y `y=3691 / 3892 / 4094` → 1 columna; a 1280: `x=81 / 458 / 835` → 3 columnas. Sin cambios en la ola |
| **m5** | Foto de las nubes del kit a 1280 < 280 px | **ABIERTO** (mejorado 205 → 208,3) | `KitCard.jsx:60-78` (`frameLoop={8}`, `pad="p-4"`). Medido a 1280: tarjeta 292,3 px, foto **208,3 × 208,3**; a 1024: 148,3 px; a 375: 251 px (4/3) |
| **m6** | No existe `SectionDivider` (§5.1/§5.2) | **ABIERTO** | Sigue sin existir: solo onda en el navbar (`Navbar.jsx:55-71`) |
| **m7** | En estado `price` el importe se anuncia dos veces | **CERRADO** | `PriceSlot.jsx:62-79`: los dos nodos visibles («45,00 $CAD», «kit completo») llevan `aria-hidden="true"` y hay **un solo** `.sr-only`. Medido en build temporal: `srOnly = ["Precio del kit: 45,00 dólares canadienses"]`, `ariaHidden = ["45,00 $CAD","kit completo"]` |
| **m8** | Comentario obsoleto del `PriceSlot` en `BuySection` | **CERRADO** | `BuySection.jsx:17-20` ahora dice «`priceDisplay: 'auto'` + `availability: null` → estado `hidden`… sin hueco fantasma»: coincide con la configuración |
| **m9** | 5 claves `meta.*` sin uso | **CERRADO** | `LanguageContext.jsx:185-258` usa las 5: `meta.title`(`:195-197`), `meta.description`(`:199`), `meta.ogLocale`(`:202-205`), `meta.ogAlt`(`:208-211`), `meta.noscript`(`:245-257`, guarda de deriva DEV). Medido en FR: `og:locale=fr_CA`, alternos `es_CA/en_CA`, `og:image:alt` y `description` en francés |
| **m10** | `<title>` y `meta` no cambiaban de idioma | **CERRADO** | Medido: ES «Vichito, el año viejo — Kit Ritual Año Viejo 2026 · vichisboh\*» → FR «Vichito, l'Año Viejo — kit rituel Año Viejo 2026 · vichisboh\*»; 3 `link[rel=alternate][hreflang]` con `?lang=es|en|fr`. Cierra también la D12 del QA, aunque traslada una decisión: el acta D-R2-5 fijaba los textos de sistema **en ES** |

### 2.2 Los 3 MAYORES del QA (`docs/puerta2-qa.md`)

| ID | Hallazgo del QA | Estado ronda 2 | Evidencia medida |
|---|---|---|---|
| **M1** | El CTA intermedio del kit partía el inventario 4×2 a ≥1024 (C6c) | **CERRADO** | `KitContents.jsx:135` (`lg:hidden`). Medido: a 1280 y 1024 → **1 CTA visible del kit** (el 3a mide 0×0 y `display:none`), 8 tarjetas en **4 columnas × 2 filas continuas** (x = 24 / 332 / 641 / 949; fila 1 y=1689–2081, fila 2 y=2113–2505) sin botón en medio; a 768 → 2 CTAs y 2 columnas × 4 filas; a 375 → 2 CTAs y 1 columna × 8. CTA final visible en todos los anchos |
| **M2** | Longitud móvil: kit 4.130 px, página 8.861, compra a 6.855 | **CERRADO** | A 375: `#kit` = **3.292,8 px** (−837,2 = −20,3 %), página **8.024 px** (−837), CTA de Comprar en **y=6.017,4** (−837,6). Foto 4/3 en `<sm` (251×188,3) y 1/1 desde `sm` (248,5 a 768; 208,3 a 1280). Orden del DOM móvil: 4 tarjetas → CTA (y=2.972,2) → 4 tarjetas → CTA (y=4.622) |
| **M3** | Los bucles de las 8 tarjetas caían sobre el verde, no sobre el papel | **CERRADO** | `CloudBlob.jsx:56` (`paperFill = true`) + `:97-103` (span de papel con los 8 radios desplazados por el anillo). Medido en las 8: `paper.rect === card.rect` (335×347,1 a 375; 292,3×391,9 a 1280) y `paper.bg = rgb(244,226,205)` sobre `parentBg = rgb(27,122,99)`. **Muestreo de píxel a 2×** (fila central del borde izquierdo): `8 px petróleo → 4 px crema → 5–7 px terracota → 61 px crema` (tarjeta 1), `8/4/5/647` (tarjeta 8) y `8/8/35/535` a 1280: el trazo está **sobre crema por los dos lados**, no sobre petróleo |

### 2.3 Menores del QA (arrastrados)

| ID | Hallazgo QA | Estado | Evidencia |
|---|---|---|---|
| m1 | Título/`og:*` en español al cambiar de idioma | **CERRADO** | ver m10/m9 arriba |
| m2 | `nav aria-label="vichisboh*"` no informa de qué se navega | **ABIERTO** | `Navbar.jsx:33-34` sigue con `t('brand.wordmark')`; medido `nav.aria-label = "vichisboh*"`. Requiere una 110.ª cadena aprobada por Victoria: es copy, no código |
| m3 | La estrella se montaba sobre «Hibérnate» desde 768 | **CERRADO** | `Hero.jsx:39-44` (`top-1 -right-10`). Medido sin intersección en **320/375/390/414/640/768/1024/1280/1440**: p. ej. 768 tagline `r=154,9` vs estrella `l=162,9` (+8 px); 1280 `r=187,4` vs `l=195,4` (+8 px) |
| m4 | A 320 px el documento desborda 1 px | **ABIERTO** (y mal atribuido) | A 320: `clientWidth=320`, `scrollWidth=321`. **No lo causa el skip-link** (1×1 en `left-3`): lo causa el bloque derecho del navbar, que termina en `right=320,6` (ancho mínimo requerido `16 + 86,2 + 6 + 212,5 (píldora 132 + gap 6 + CTA 74,5) + 16 = 336,7 px` > 320 disponibles, y con `justify-between` el bloque derecho arranca en `x=108,2` y termina en `320,6`). A 360/375/390 el desbordamiento es 0 |

---

## 3. No regresión — medidas exactas (build actual vs. acta y ronda 1)

| Prueba | Medida ronda 2 | Δ vs. ronda 1 |
|---|---|---|
| **Texto oficial de Victoria (ES)** | **11/11** presentes y literales en el DOM: título, «Hibérnate», subtítulo, tradición (310 caracteres / 61 palabras), Victoria ×2, Mail Club, línea de envíos, «Comprar el kit», «¿Qué es el Año Viejo?», «Pide tu kit» | = |
| **16 textos del kit** | **16/16** literales (8 títulos + 8 líneas), ítem 4 **sin punto final** («…todo el año» + «Un lapicero»), verificado `fortuna te acompañe todo el año.` = **no existe** | = |
| **3 pasos** | **3/3** idénticos a `02-copys.md §3.5` (aprobado): «Escribe / lo que sueltas y lo que siembras, con el lapicero, en tus tarjetas.», «Arma…», «Quema / las penas con el alcohol, el 31 a medianoche…». Frente al *encargo crudo* el paso 1 añade una coma y el 3 reorganiza verbo→H3: desviación **declarada en copy v2 (m3)**, no introducida en esta ola (`translations.js` mtime 13:37) | = |
| **Línea de envíos** | Nodo exacto ×2 (Comprar y Cierre), 97 caracteres: `Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $` | = |
| **Cero precio de kit** | 0 nodos de precio; 0 importes de kit. Únicos `$`: `5 $`, `8,95 $`, `60 $` (envíos) dentro del nodo de la línea de envíos | = |
| **Cero formularios/bots/pop-ups** | `form 0 · input 0 · textarea 0 · select 0 · mailto 0 · iframe 0 · [role=dialog] 0 · [aria-modal] 0 · onSubmit 0 · window.open 0 · scripts 1 (bundle) · img 0` | = |
| **Destinos** | 9 × `https://wa.me/15142968295?text=…` + 2 × `https://instagram.com/vichisboho` + 1 × `#contenido`; los 11 externos con `rel="noopener noreferrer"` y `target="_blank"` | = |
| **8 prellenados × 3 idiomas** | 9 enlaces, 8 mensajes distintos por idioma; **coincidencia exacta** con `02-copys.md §6.2` en ES/EN/FR (`wa.nav/hero/kit/steps/buy/victoria/mailclub/footer`); **0 `%25`** (sin doble codificación); `href` = `…/15142968295?text=` + valor | = |
| **Trilingüe en vivo** | ES → FR con clic real: **89 nodos de texto, 66 cambian**; **26 `aria-label`, 25 cambian** (solo «vichisboh\*»); **9/9 prellenados** cambian; `<html lang>` es→fr; `<title>` cambia; idénticos legítimos: marca, `ES/EN/FR`, ratios `4/5`, `4/3`, pasos `1/2/3`, teléfono/@handle y el `<noscript>` | = |
| **ES por defecto** | Carga limpia sin query ni storage → `<html lang="es">`, `title` ES, `localStorage` vacío | = |
| **Claves crudas / placeholders** | 0 textos con forma `hero.*`/`kit.*`…; 0 `{placeholder}` | = |
| **Consola** | **0 mensajes, 0 warnings de React, 0 excepciones** en 11 cargas (320/375/390/768/1024/1280 × ES/EN/FR) + clic de idioma + apertura/cierre de selector | = |
| **`localStorage` bloqueado** | Con `localStorage` lanzando: `?lang=fr` → FR (6 secciones, 8.158 px), clic a ES → ES, **0 excepciones y 0 consola** (la nueva ruta `persistLang` dentro de `detectInitialLang` está protegida) | = (re-probado por el cambio) |
| **Una sola `h1`** | 1 × h1 («Vichito, el año viejo», Baloo 2 800, 33,75 px a 375, **1 línea**, 34,4 px de alto) · 5 × h2 · 12 × h3 · sin saltos de nivel | = |
| **Bundle** | JS **283,57 kB** (87,93 gzip) ≤ 300 kB · CSS 30,33 kB (6,78 gzip) · HTML 3,36 kB. **6 peticiones**: 1 CSS de fuentes + 3 woff2 + JS + CSS (sin imágenes) | +2,24 kB JS (por `syncDocumentHead`) |
| **Dependencias** | `package.json`: solo `react`, `react-dom` (+ `vite`, `tailwindcss`, `@tailwindcss/vite`, `@vitejs/plugin-react`); 0 imports externos en `src/`; URLs del bundle: `wa.me`, `instagram.com`, `fonts.googleapis/gstatic`, namespaces SVG | = |
| **Estética** | **47 SVG, 47 con `aria-hidden="true"`**; **61/61 `path` con stroke llevan `vector-effect="non-scaling-stroke"`** (3 `path` de relleno sin stroke: badge de paso); 2 `repeating-linear-gradient` (solo `#comprar` y `<footer>`), paradas duras 28/56 px; **0 sombras con desenfoque** (todas `x y 0 0`); 0 `backdrop-filter`; 0 degradados de color (solo `paper-dots` radial al 4,3 % y las 2 rayas); trazo terracota `rgb(240,78,12)` confirmado por píxel | = |
| **Paleta** | Solo los 7 hex: `rgb(59,37,23)` 833 · `rgb(244,226,205)` 142 · `rgb(240,78,12)` 54 · `rgb(227,201,60)` 18 · `rgb(185,58,48)` 10 · `rgb(27,122,99)` 5. El `rgb(0,0,0)` que aparece 52 veces es el *default* de `html/head/meta` (sin nodo de texto visible): **0 texto negro renderizado** | = |
| **Tipografías** | `document.fonts.status = loaded`; `check()` = true en Baloo 2 700/800, Nunito 400/600, EB Garamond italic; `display=swap` | = |
| **`prefers-reduced-motion`** | `transition-duration` del `.btn-primary` = **1e-05 s**; `scroll-behavior: auto` | = |
| **Alturas de bloque (ES 375)** | header 56 · hero 778,8 · tradición 596,4 · kit **3.292,8** · cómo funciona 1.079,5 · comprar 560,5 · Victoria 1.266,2 · cierre 393,6 → **8.024** | hero/tradición/pasos/comprar/Victoria/cierre **idénticos** (±0,5 px); solo el kit cambia |

---

## 4. Checklist de aceptación `01-cro.md §9` — 22 ítems (evidencia ronda 2)

| # | Ítem | Estado | Evidencia medida |
|---|---|---|---|
| 1 | Marcos SVG de garabato terracota reutilizables, un componente con variantes | ✔ | `SquigglyFrame` (`rect`/`pill`/`cloud`) en 27 SVG de marco (≥130 px en algún eje): hero (486,7×591,3), 8 nubes del kit (335×347 a 375), 3 pasos, panel de Comprar (375×560), Cierre (375×394), píldora del hero (335×73); 47 `<svg>` en total, bucles = un `path` cerrado, nunca `border-radius` |
| 2 | Nubes orgánicas crema con borde de lápiz terracota | ✔ | `CloudBlob`/`KitCard`/`StepCard`/`MailClub`: `background: rgb(244,226,205)`, radios asimétricos `60px 48px 62px 44px / 52px 62px 48px 58px` (con anillo) o `38px 26px 40px 22px / 30px 40px 26px 36px` (contenido) + marco superpuesto |
| 3 | Rayas verticales petróleo/crema en Comprar y Cierre + textura | ✔ | 2 elementos con `repeating-linear-gradient(88.6deg, rgb(27,122,99) 0 28px, rgb(244,226,205) 28px 56px)`, uno en `#comprar` (375×560,5) y otro en `<footer>` (375×393,6); encima, trama `paper-dots`/`paper-dots-light` (0 peticiones) |
| 4 | Doodles sueltos y `aria-hidden` | ✔ | Estrellas (34×34 / 33×33 / 27×27), subrayados (94×18 / 203×18), espiral (52×52), rayitas (41×17 / 29×29); **47/47 `<svg>` con `aria-hidden="true"`**, 0 SVG sin él |
| 5 | Las tres tipografías cargan | ✔ | Baloo 2 700/800, Nunito 400/600, EB Garamond 400 italic; `document.fonts.check` true en las 5 combinaciones; `font-family` computada del H1 = `"Baloo 2"`, cuerpo `Nunito`, eslogan/firma `EB Garamond` |
| 6 | Trilingüe ES/EN/FR, ES por defecto, `lang` actualizado | ✔ | ES por defecto con storage limpio; `?lang=en|fr` → `en`/`fr`; clic → `lang`, `title`, 66 textos, 25 `aria-label` y 9 prellenados cambian; 0 claves faltantes visibles |
| 7 | Prellenado de WhatsApp por sección **y** por idioma | ✔ | 9 enlaces × 3 idiomas, 8 mensajes distintos, coincidencia exacta con `§6.2`, marcadores `(desde …)` / `(from …)` / `(depuis …)` intactos |
| 8 | Destinos exactos + `rel="noopener noreferrer"` | ✔ | 9 `wa.me/15142968295`, 2 `instagram.com/vichisboho`, 1 `#contenido`; 11 externos con `rel` y `target` correctos |
| 9 | Cero formularios, pop-ups, bots, captura de email | ✔ | `form/input/textarea/select/mailto/iframe/dialog/aria-modal` = 0; 1 solo `<script>`; 0 `onSubmit`, 0 `window.open` |
| 10 | Cero precio del kit; `PriceSlot` de 3 estados por configuración | ✔ | Build entregado: sin nodo de precio ni hueco. Temporal `price`: 1 solo anuncio accesible + importe visible `aria-hidden`. Temporal `availability`: píldora «Disponible» + 1 `.sr-only`, 0 cifras. **Revertido** (`siteConfig.js:13/24/30`) |
| 11 | Línea de envíos literal | ✔ | Nodo exacto de 97 caracteres ×2 (Comprar y Cierre) |
| 12 | Contenedores de foto con proporción fija, etiqueta presente y no duplicada | ⚠ | 10 `role="img"` con `aspect-ratio` fijo: hero 4/5, Victoria 4/5, kit **4/3 en `<sm` y 1/1 desde `sm`**. Etiqueta presente y **no repetida** (kit: «Foto real:» + ratio; hero y Victoria: «Foto real: + nombre»). **Desviación declarada**: el kit ya no es 1/1 a 375 (4/3, cambio de la ola para la longitud); el ítem enumera 4/5, 1/1, 3/4, 16/9 y 4/3 no está en esa lista, aunque la proporción sigue siendo fija y sin CLS |
| 13 | Responsive 375/768/1280 con CTA visible y alcanzable | ⚠ | 0 desbordes en 360/375/390/768/1024/1280 (`scrollWidth = clientWidth`); 1 px a 320. CTA visible en todos los anchos. **Dos desviaciones de `§7`**: los 3 pasos siguen en 1 columna a 768 (`HowItWorks.jsx:54`, m4) y la foto del kit mide 208,3 px a 1280 (< 280, m5) |
| 14 | Objetivos táctiles ≥44 px y foco visible en todos los controles | ⚠ | Todos los objetivos ≥44 px (idioma 3×44×44 = 132; CTA navbar 74,5×44; CTAs 46–58; enlaces 44). Foco: anillo **chocolate 3 px + halo mostaza** medido en 12/15 paradas (las 3 del selector de idioma son la excepción); **el selector de idioma queda fuera** del anillo global (mostaza 1,31:1 + hairline chocolate 1,5 px) |
| 15 | Paleta exacta, sin degradados ni negros puros | ✔ | Solo los 7 hex; 0 texto negro renderizado; 0 degradado de color (las 2 rayas son paradas duras); 0 sombra difusa; 0 blur/glass |
| 16 | Jerarquía semántica: un `h1`, `h2` por sección, `h3` en ítems y pasos | ✔ | 1 h1 → 5 h2 (Tradición, Kit, Cómo funciona, Comprar, Victoria; 5 con `aria-labelledby`) → 12 h3 (8 ítems + 3 pasos + Mail Club); `main`, `nav` y `footer` presentes |
| 17 | Presupuesto de palabras respetado o excepción declarada, sin secciones nuevas | ✔ | 8 bloques (0–7); excepciones protegidas y declaradas (8 ítems del kit, cuerpo del Mail Club, pasos 14/8/17); 0 sección nueva |
| 18 | Sin estética SaaS | ✔ | Sombras duras (`6px 6px 0 0`, `0 3px 0 0`), 0 sombra con blur, 0 glass, 0 librería de iconos, marcos dibujados, papeles con trama, 3 tipografías cálidas |
| 19 | Subtítulo del hero en píldora crema con texto chocolate | ✔ | `<p>` `600 17px/24,65px Nunito`, `color rgb(59,37,23)` dentro de contenedor opaco `rgb(244,226,205)`; bloque 335×73,3 = **2 líneas** (24 de padding + 2×24,65); **11,35:1** |
| 20 | Ningún texto directamente sobre `StripedBackdrop` (bloques 5 **y** 7) | ✔ | 7 nodos en `#comprar` + 5 en `<footer>`: **12/12 con ancestro opaco** (`rgb(244,226,205)`), salvo la píldora mostaza (8,67:1) y el CTA terracota, ambos dentro del panel crema; rayas solo perimetrales |
| 21 | Keyline chocolate + halo crema del CTA primario en el CSS real | ✔ | Computado en los 2 primarios: `rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px`; `background rgb(240,78,12)`; `color rgb(244,226,205)`; `--btn-ink = #f4e2cd`; `font 800 22px "Baloo 2"` |
| 22 | `vector-effect="non-scaling-stroke"` en marcos y nubes | ✔ | **61/61** `path` con stroke; los 3 restantes son rellenos sin stroke (badge de paso). Trazo computado 3,2 px en 375 y 1280 (no engorda) |

**Resultado: 22/22 verificables · 19 ✔ · 3 ⚠ (12, 13, 14) · 0 ✘.**

---

## 5. Condiciones del acta (C1–C6) — medidas ronda 2

| ID | Condición | Medida obtenida | Estado |
|---|---|---|---|
| **C1** | Keyline chocolate 2 px + halo crema; `--btn-ink` crema por defecto | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` · `bg rgb(240,78,12)` · `color rgb(244,226,205)` · `--btn-ink: #f4e2cd` · `800 22px/22px "Baloo 2"` · alto 58 px | **CUMPLE** |
| **C2** | Subtítulo = nodo crema + chocolate, ~11,35:1; prohibido `<p>` crema 17 px sobre petróleo | `<p>` 17 px/600 chocolate `rgb(59,37,23)`; contenedor `rgb(244,226,205)` opaco; **11,35:1**; radio píldora; 2 líneas; marco SVG superpuesto; 0 nodos crema 17 px sobre `#1B7A63` | **CUMPLE** |
| **C3** | Bloques 5 y 7: todo texto con ancestro crema opaco | 7 nodos en `#comprar` + 5 en `<footer>`: 12/12 dentro del panel (`rgb(244,226,205)`), 0 letras sobre franjas; capturas `r2-comprar-375.png`, `r2-footer-375.png` | **CUMPLE** |
| **C4** | Navbar secundario en todo el scroll, una fila a 375, 44 px | Alto 56 px · `bg rgb(27,122,99)` · **una sola fila** (`singleRow: true`) · píldora idioma **132 px** (3 × 44×44) · CTA **74,5×44** crema/chocolate (nunca terracota) · wordmark 16→102,2 · `scrollWidth = 375 = innerWidth` | **CUMPLE** |
| **C5** | `buy.deliveryNote` entre CTA y envíos, ≥15 px, chocolate/crema, ocultable | CTA bottom **6.075,4** → nota top **6.095,4** (+20 px) → envíos top **6.157,9**; nota `600 15px/23,25px` `rgb(59,37,23)` sobre `rgb(244,226,205)`, 2 líneas (46,5 px); guardada por `content.showDeliveryNote` | **CUMPLE** |
| **C6** | 375×667: H1 + eslogan + píldora + CTA completos, ≥150 px de foto, tabulación = orden visual **y el CTA intermedio no parte el inventario** | (a) H1 88→122,4 · eslogan 126,4→150,4 · píldora 170,4→243,7 · CTA 259,7→311,7 · foto desde **367,1** con **299,9 px** visibles. (b) 15 paradas con `top` 7 → 6/6/6/6 → 259,7 → 2.972 → 4.622 → 5.701 → 6.017 → 7.025 → 7.415 → 7.471 → 7.752 → 7.800 (creciente). (c) **1024/1280: 4×2 continuo y 1 solo CTA del kit**; 768: 2×4 y 2 CTAs; 375: 1×8 y 2 CTAs | **CUMPLE** (las tres cláusulas) |

---

## 6. Incidencias nuevas por severidad

### BLOQUEANTES: **ninguna** (0)

### MAYORES: **ninguno nuevo** (1 heredado sigue abierto: M2 de la ronda 1, Tradición sin `PhotoSlot 3/4`, `Tradition.jsx:16-19` — requiere montarlo o registrar la desviación en addendum del acta antes de publicar; no rompe ninguna condición C1–C6)

### MENORES (4)

| # | Incidencia | Archivo:línea | Corrección sugerida | Coste |
|---|---|---|---|---|
| n1 | **1 px de desbordamiento a 320 px** (`scrollWidth 321` / `clientWidth 320`): el bloque derecho del navbar termina en 320,6. La causa **no es el skip-link** (1×1 en `left-3`), como se atribuyó en el QA | `Navbar.jsx:35-51` (contenedor `px-4` + `gap-1.5` + tres hijos `shrink-0`) | Bajo 340 px: `px-3` y `gap-1` (ahorra 8 px) o `nav.ctaShort` desde 360. Solo afecta por debajo del mínimo exigido (375) | 5 min |
| n2 | **El anillo de foco global no llega al selector de idioma**: sus utilidades `focus-visible:outline-[3px]` + `shadow-[inset…]` ganan a `:focus-visible` de `index.css`, así que en crema queda un anillo mostaza de **1,31:1** sostenido por un hairline chocolate de 1,5 px | `LanguageSwitch.jsx:68-70` vs `index.css:100-104` | Sustituir por `focus-visible:outline-[3px] focus-visible:outline-chocolate focus-visible:outline-offset-2` (11,35:1 en crema) y dejar el halo mostaza solo para fondos petróleo | 5 min |
| n3 | Los 3 pasos siguen en 1 columna a 768 (§7 pide 3 columnas) | `HowItWorks.jsx:54` | `md:grid-cols-3` (o addendum que declare la decisión) | 10 min |
| n4 | Foto del kit a 1280 = 208,3 px de ancho útil (< 280 de §7; era 205) | `KitCard.jsx:60-78` | `frameLoop` 8→7 o `lg:gap-x-3`; alternativa: aceptar y documentar «foto manda» en escritorio | 15 min |

**Observaciones sin incidencia (no son defectos, pero conviene registrarlas):**

1. **Alcance real del `paperFill`:** además de las 8 tarjetas, cambia la nube del **Mail Club** (crema sobre petróleo, `victoria` → 335×429), no listada en la declaración. Hero (píldora, `ring = 0`), Tradición y Pasos **no cambian** (papel = fondo de sección, `invisible: true`) y el Cierre no usa `CloudBlob` con relleno: los cuatro bloques que se pidió comprobar están intactos.
2. **Metadatos trilingües:** `title`, `description`, `og:*` y `hreflang` ya cambian de idioma (cierra m10/D12), pero el acta D-R2-5 fijaba los textos de sistema **en ES**. Las cadenas EN/FR existen en el diccionario desde antes de la ola (`translations.js`, mtime 13:37): no es copy nuevo, pero sí una decisión que Victoria debería ratificar.
3. **`nav aria-label`** sigue siendo la marca (QA m2): requiere una cadena nueva aprobada.
4. **Ratios del kit:** `4/3` en `<sm` y `1/1` desde `sm`; el cambio está declarado y medido (−837 px), pero conviene anotarlo en el addendum de `§5.2`.

---

## 7. Riesgos residuales aceptables y recomendaciones de publicación

**Aceptables (no impiden publicar):**

1. **Deuda de contraste del CTA crema sobre terracota (2,86:1)** — declarada en `01-cro.md §8.2` y mitigada con keyline chocolate 2 px (3,96:1) + halo crema 3 px reales. Sigue pendiente la decisión `--btn-ink` de Victoria (D-CTA).
2. **Foco sobre petróleo:** el anillo chocolate mide 2,74:1 sobre `#1B7A63` (<3:1), pero el diseño lleva **doble anillo** y en esa superficie el visible es el halo **mostaza 3,16:1**; sobre crema el visible es el chocolate **11,35:1**. Cada superficie tiene al menos un anillo ≥3:1. El único punto flojo es el selector de idioma (n2).
3. **1 px a 320 px** (n1): por debajo del ancho mínimo exigido (375) y sin impacto en el público real.
4. **Longitud móvil:** 8.024 px (12,0 pantallas) sigue siendo larga, pero el CTA del kit queda a 2.972 y la compra a 6.017: la puerta intermedia ya está a 4,5 pantallas (antes 5,1) y el bloque del kit bajó un 20 %.
5. **Rendimiento:** 6 peticiones (3 woff2 de Google Fonts incluidas) y 87,93 kB gzip de JS. Sin imágenes todavía: el día que lleguen las 10 fotos, **presupuestar ≤ 200 kB por foto y `lazy` + `sizes`** (hoy los `PhotoSlot` ya reservan `aspect-ratio`, así que el CLS seguirá en 0).

**Recomendaciones antes de publicar (por orden):**

1. **Victoria:** las 10 fotos reales con sus `alt` revisados, una para `og:image`, la decisión de precio, la respuesta sobre el alcohol y la fecha de pedidos. Sin fotos la página es correcta pero se ve a medio hacer.
2. **Addendum del acta** (1 párrafo) con tres puntos: Tradición sin `PhotoSlot 3/4` (M2), ratio `4/3` del kit en `<sm`, y metadatos trilingües (D-R2-5 → D12).
3. **n1 + n2** (10 minutos en total) si se quiere el foco y el 320 px impecables; **n3 + n4** son cosméticos y pueden ir en la siguiente pasada.
4. **No tocar** textos, enlaces, prellenados, paleta, marcos ni la retícula del kit: todo lo auditado en esta ronda está en verde.

---

## 8. Evidencia generada (capturas propias, build real)

En `docs/evidencias/` (todas nuevas de esta ronda, salvo donde se indique):

**Página completa:** `r2-full-320-es.png` · `r2-full-375-es.png` · `r2-full-375-en.png` · `r2-full-375-fr.png` · `r2-full-768-es.png` · `r2-full-1280-es.png` · `r2-full-1280-fr.png`
**Primer viewport (C6):** `r2-firstviewport-375-es.png`
**Tarjetas del kit a 2×:** `r2-kit-card-1-375-2x.png` · `r2-kit-card-8-375-2x.png` · `r2-kit-card-1-1280-2x.png` (marco sobre papel, muestreado por píxel)
**Bloques 5 y 7:** `r2-comprar-375.png` · `r2-footer-375.png`
**Detalles 2×:** `r2-detail-hero-tagline.png` · `r2-detail-hero-pill.png` · `r2-detail-tradicion.png` · `r2-detail-paso.png` · `r2-detail-cierre.png` · `r2-detail-kitcard.png` · `r2-detail-victoria.png`
**Foco con Tab real (2×), capturado con el elemento activo verificado (incluye el CTA de Comprar sobre crema y el enlace de WhatsApp del pie):** `r2-focus-skip-375-2x.png` · `r2-focus-lang-375-2x.png` · `r2-focus-nav-cta-375-2x.png` · `r2-focus-hero-cta-375-2x.png` · `r2-focus-comprar-cta-375-2x.png` · `r2-focus-footer-wa-375-2x.png`
**Estado `price` (build temporal, no del entregable):** `r2-price-state-375.png`

Datos crudos de la medición: `.tmp/r2-report.json`, `r2-details.json`, `r2-clouds.json`, `r2-focus.json`, `r2-final.json`, `r2-price.json`.

### Nota de coherencia con el QA de la misma ronda

El informe `docs/puerta2-qa-r2.md` (VEREDICTO: **APROBADO**, escrito en paralelo) coincide en los tres cierres mayores y en las medidas clave: kit 3.293 px, página 8.024 px, compra a y=6.017, 1 solo CTA del kit a 1024/1280, papel crema bajo el trazo en las 8 tarjetas. También coincide en la salvedad del anillo mostaza del selector de idioma (aquí **n2**). Dos aportes de esta medición que el QA no pudo cerrar: el **Tab físico sí se pudo repetir** (29 paradas, anillo medido en 12 de 15 a 375) y el **desbordamiento de 320 px se midió y se atribuyó** (`scrollWidth 321` / `clientWidth 320`, causa navbar, no skip-link).

---

*Verificador Técnico — Puerta 2, ronda 2 · **16 de noviembre de 2026**, Montreal*
*Medido sobre el build de producción servido en `http://localhost:4400/` (Chrome headless 157 por CDP), 11 cargas ancho × idioma, 6 escenarios de idioma, 29 paradas de teclado, 2 builds temporales de configuración y 1 prueba con almacenamiento bloqueado. Código del proyecto sin modificar; copia temporal en `.tmp/r2-temp` (preview 4401 detenido).*
