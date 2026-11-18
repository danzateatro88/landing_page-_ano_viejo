ESTADO: APROBADO

# Informe de Puerta 2 — Verificación técnica de código, UI artesanal y build

**Proyecto:** `vichito-2026/` — Landing «Vichito, el año viejo» · `vichisboh*`
**Stack medido:** Vite 7.3.8 + React 19 + Tailwind CSS v4 (CSS-first, sin `tailwind.config.js`)
**Fecha:** 16 de noviembre de 2026 · faltan 45 días para el 31 de diciembre
**Base de la medición:** build de producción real (`npm run build`) servido en `http://localhost:4400/`, medido por CDP (Chrome headless) en 375×667, 768×900 y 1280×900, en ES/EN/FR. **Ninguna cifra de este informe viene de leer el código: todas salen de `getComputedStyle`, `getBoundingClientRect`, `document.fonts`, eventos de consola y capturas propias.** Aviso de método: la primera tanda de capturas de esta auditoría salió **en francés** porque el perfil de Chrome conservaba `localStorage['vichito.lang']='fr'` y esa elección gana a `?lang=es` (ver M1); se repitieron con el almacenamiento limpio y las válidas son las `p2-*`.

---

## 1. Resumen ejecutivo (lo que medí, no lo que leí)

1. **El build pasa limpio**: `vite build` → exit 0, 59 módulos, 3 ficheros (HTML 3,36 kB · CSS 30,25 kB / 6,76 kB gzip · JS 281,33 kB / **87,11 kB gzip**), **3 peticiones** en total y **0 mensajes de consola y 0 excepciones** en las 9 cargas (ES/EN/FR × 3 anchos). `check:copy` y `check:console` en verde (solo 2 `console.warn` de i18n, no bloqueantes y **gated a `import.meta.env.DEV`**: no llegan a producción).
2. **Las seis condiciones del acta se cumplen, medidas en el DOM**: keyline chocolate 2 px + halo crema 3 px y `--btn-ink:#f4e2cd` (C1); subtítulo en nodo crema con texto chocolate 17 px a **11,35:1** (C2); **los 12 nodos de texto** de los bloques 5 y 7 viven dentro del panel crema opaco, ninguna letra cruza una franja (C3); navbar secundario en todo el scroll y **de una fila a 375 px** en los tres idiomas con `scrollWidth === innerWidth === 375` (C4); `buy.deliveryNote` a 15 px entre el CTA y la línea de envíos y **ocultable por configuración** (C5); a 375×667 se ven H1 + eslogan + píldora + CTA **y 323 px de foto**, con el orden de tabulación igual al visual (C6).
3. **Los 22 ítems del checklist de `01-cro.md §9` son verificables**: 20 en verde y 2 en ámbar (ítems 13 y 14, por detalles de retícula y de foco, no por incumplir una condición).
4. **Los textos oficiales de Victoria están literales en el DOM del build**: 49/49 cadenas presentes literalmente y, además, las 6 cadenas largas verificadas como nodo completo exacto, incluidos los 310 caracteres de la tradición (61 palabras), el ítem 4 **sin punto final**, la línea de envíos exacta ×2 y el cuerpo del Mail Club.
5. **Cero invenciones comerciales y cero formularios**: ningún importe del kit, 0 `<form>`, 0 `<input>`, 0 `mailto:`, 0 ManyChat, 0 pop-ups, 0 iframes, un solo `<script>` (el bundle). Los únicos destinos externos son `wa.me/15142968295` (9 enlaces, 8 secciones) e `instagram.com/vichisboho` (2).
6. **Trilingüe íntegro**: 114 claves × 3 idiomas, 0 faltantes, 0 vacías; solo quedan idénticos entre idiomas los invariantes legítimos (marca, códigos ES/EN/FR, ratios 4/5 y 1/1, numeración de pasos y teléfono/@handle). `aria-label`, `alt` y `<html lang>` cambian; los 8 prellenados de WhatsApp son exactos, sin doble codificación (`%25`), y la elección persiste en `localStorage`.
7. **Resistencia**: con `localStorage` bloqueado la página renderiza y cambia de idioma sin excepciones; si falta una clave del diccionario, `t()` devuelve `''` y **no rompe la UI** (probado con un build temporal al que se le borró `hero.tagline`).
8. **Estética artesanal: aprobada en captura.** Los marcos son bucles continuos dibujados a mano en `#F04E0C` (61/61 trazos con `vector-effect="non-scaling-stroke"` y `viewBox` recalculado a la caja real: 74×44 a 375 y 106×44 a 1280 para el mismo marco), las nubes son crema con borde de lápiz, las rayas verticales petróleo/crema aparecen solo en los bloques 5 y 7, y las tres tipografías cargan de verdad (`document.fonts.check` = true en Baloo 2 800, Nunito 400/600 y EB Garamond italic). No hay degradados de color, ni `shadow-lg` difusa, ni glassmorphism, ni cards grises: sombras duras de sticker y trazo de lápiz.
9. **No hay bloqueantes.** Quedan **2 mayores de bajo coste** (el `?lang=` no fuerza el idioma si ya hay una elección guardada; el bloque Tradición no monta el `PhotoSlot 3/4` que fija `§5.2`) y **10 menores**, todos cosméticos o de especificación. El sitio **no está listo para publicar** por decisiones de Victoria, no por el código: fotos reales (D9), precio (D1), fecha de pedidos (D3) y punto de recogida (D10).

---

## 2. Checklist de aceptación de la Puerta 2 (`01-cro.md §9`) — 22 ítems

| # | Ítem | Estado | Evidencia medida (DOM real / captura) |
|---|---|---|---|
| 1 | Marcos SVG de garabato terracota reutilizables, un componente con variantes | ✔ | `SquigglyFrame` (`rect`/`pill`/`cloud`) en 47 `<svg>` de la página; marcos presentes en hero (486×591), retrato, 8 nubes del kit (335×430 a 375), 3 pasos, sección Comprar y Cierre. Bucles = un solo `path` cerrado de arcos, no `border-radius` |
| 2 | Nubes orgánicas crema con borde de lápiz terracota | ✔ | `CloudBlob`/`KitCard`/`StepCard`/`MailClub`: fondo computado `rgb(244,226,205)`, radios asimétricos (`38px 26px 40px 22px / 30px 40px 26px 36px`) + marco SVG superpuesto |
| 3 | Rayas verticales petróleo/crema en Comprar y Cierre + capa de textura | ✔ | 2 elementos con `repeating-linear-gradient(88.6deg, #1B7A63 0 28px, #F4E2CD 28px 56px)`, uno en `#comprar` y otro en `<footer>`; encima, trama CSS `paper-dots` (4,5 % de tinta, 0 peticiones) |
| 4 | Doodles sueltos (estrella, espiral, subrayado, rayitas) y `aria-hidden` | ✔ | 18 instancias de `Doodle` (star/spiral/underline/ticks/squiggle), todas dentro de `[aria-hidden="true"]`; **0 `<svg>` sin `aria-hidden`** en el DOM |
| 5 | Las tres tipografías cargan (Baloo 2 700/800, Nunito 400/600, EB Garamond italic) | ✔ | `document.fonts.status = loaded`; `check()` = true en las tres; `font-family` computada en H1 = `"Baloo 2"`, cuerpo = `Nunito`, eslogan y firma = `EB Garamond` (2 apariciones, tope respetado); `display=swap` en el `<link>` |
| 6 | Trilingüe ES/EN/FR, ES por defecto, `lang` actualizado | ✔ | Carga limpia → `<html lang="es">`; `?lang=en` → `en`; botones `aria-pressed` true/false correctos; efecto `document.documentElement.lang` |
| 7 | Prellenado de WhatsApp cambia por sección **y** por idioma | ✔ | 9 enlaces `wa.me` por idioma, 8 mensajes distintos (`nav`, `hero`, `kit`×2, `steps`, `buy`, `victoria`, `mailclub`, `footer`), cada uno con su marcador `(desde …)`, idénticos carácter a carácter a `02-copys.md §6.2` |
| 8 | Destinos exactos + `rel="noopener noreferrer"` | ✔ | 9× `https://wa.me/15142968295?text=…`, 2× `https://instagram.com/vichisboho`, 1× `#contenido`; los 11 externos con `rel="noopener noreferrer"` y `target="_blank"` |
| 9 | Cero formularios, pop-ups, bots, captura de email | ✔ | `form:0 · input:0 · textarea:0 · select:0 · [role=dialog]/aria-modal:0 · mailto:0 · manychat:0 · iframes:0`; un único `<script>` (el bundle) |
| 10 | Cero precio del kit en el DOM; `PriceSlot` de 3 estados por configuración | ✔ | Build por defecto: 0 coincidencias de `$`+cifra, 0 nodos de precio, sin hueco fantasma (25 px entre el `lead` y el CTA). Probados los otros dos estados en builds temporales: `availability` → píldora mostaza «Disponible» sin cifra; `price` → «45,00 $» + «kit completo» |
| 11 | Línea de envíos literal | ✔ | Nodo exacto de **97 caracteres** ×2 (Comprar y Cierre): `Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $` |
| 12 | Contenedores de foto con proporción fija, etiqueta presente y no duplicada; nada de stock ni IA | ✔ | 10 `role="img"` con `aspect-ratio` fijo (`4/5` hero y retrato; `1/1` ×8 kit), `alt`/`aria-label` reales y localizados, etiqueta corta «Foto real: …»; ningún `<img>`, `src` de fotos en `null`, 0 `url()` en el CSS |
| 13 | Responsive 375/768/1280 con CTA visible y alcanzable | ⚠ | Los tres anchos correctos, sin desbordes (`scrollWidth === innerWidth` en los 9 casos) y CTA alcanzable en todos. **Dos desviaciones de `§7`**: los 3 pasos siguen en 1 columna a 768 (el `xl:grid-cols-3` entra a 1280) y la foto de las nubes del kit mide **205 px** de ancho útil a 1280 frente a los ≥280 px que fija `§7` |
| 14 | Objetivos táctiles ≥44 px y foco visible en todos los controles | ⚠ | Todos los controles ≥44 px (selector 3×44×44 = 132 px, CTA navbar 44, CTAs 52–62, enlaces 44). Foco visible con Tab en las 14 paradas (anillo mostaza 3 px + hairline chocolate 1,5 px, `outline-offset` 3/6). **Pero sobre crema el anillo de 3 px es mostaza = 1,31:1**; lo que sostiene la visibilidad es el hairline chocolate (11,35:1) y `§8.3` pedía anillo **chocolate** de 3 px sobre crema |
| 15 | Paleta exacta, sin degradados ni negros puros | ✔ | Solo los 7 hex del encargo (`#1b7a63 #f04e0c #f4e2cd #3b2517 #b93a30 #e3c93c #50664b`); el «rayado» son paradas duras, no degradado de color; 0 `#000`; sin rosa ni oliva ajeno |
| 16 | Jerarquía semántica: un `h1`, `h2` por sección, `h3` en ítems y pasos | ✔ | Árbol medido: 1×h1 → 5×h2 (`¿Qué es el Año Viejo?`, `Qué trae el kit`, `Cómo funciona`, `Pide tu kit`, `Hola, soy Victoria`) → 12×h3 (8 ítems + 3 pasos + Mail Club), sin saltos de nivel |
| 17 | Presupuesto de palabras respetado **o excepción declarada**, sin secciones nuevas | ✔ | 8 bloques (0–7), ningún bloque añadido. Excepciones declaradas y protegidas: 8 ítems del kit (6–17 palabras), cuerpo del Mail Club (24) y pasos 14/8/17 — todo texto oficial literal; ningún recorte «para cumplir» |
| 18 | Sin estética SaaS | ✔ | Sombras duras de sticker (`6px 6px 0 0 #3B2517`), cero sombras difusas, cero blur/glass, cero librería de iconos, marcos dibujados, tipografías cálidas. Comparado contra `IMG_0314.png`: respeta la retícula del boceto (nube del hero, óvalo de la tradición, nubes de producto, bloque rayado de compra) |
| 19 | Subtítulo del hero en píldora/nube crema con texto chocolate | ✔ | `<p>` 17 px `rgb(59,37,23)` sobre contenedor **opaco** `rgb(244,226,205)` radio 999 px con marco de garabato superpuesto; fondo efectivo crema → **11,35:1**. No existe ningún `<p>` crema de 17 px directo sobre `#1B7A63` |
| 20 | Ningún texto directamente sobre `StripedBackdrop` (bloques 5 **y** 7) | ✔ | Contención geométrica medida: los **12 nodos de texto** de los dos bloques están dentro del rectángulo del panel crema; el ancestro opaco es el panel (`rgb(244,226,205)`), la píldora mostaza o el CTA terracota, todos dentro del panel. Rayas solo perimetrales (capturas) |
| 21 | Keyline chocolate + halo crema del CTA primario en el CSS real | ✔ | `box-shadow` computado en los 2 primarios: `rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px`; `--btn-ink` = `#f4e2cd` en `:root`; etiqueta Baloo 2 800 a 20 px (hero 375) / 22 px (hero ≥768 y Comprar) |
| 22 | `vector-effect="non-scaling-stroke"` (o `viewBox` por proporción) en marcos y nubes | ✔ | **61 de 61 trazos** con `vector-effect="non-scaling-stroke"` (los 3 `path` restantes son rellenos sin `stroke` del badge de paso); `viewBox` construido con la caja real medida por `ResizeObserver` (1 unidad = 1 px CSS: `0 0 74.47 44` a 375 y `0 0 105.91 44` a 1280 para el mismo marco) y `stroke-width` computado igual al declarado en ambos anchos: el trazo no engorda ni se estira |

**Resultado del checklist: 22/22 verificables · 20 ✔ · 2 ⚠ (ítems 13 y 14) · 0 ✘.**

---

## 3. Condiciones del acta (C1–C6) — medida exacta

| ID | Condición | Medida obtenida en el DOM | Estado |
|---|---|---|---|
| **C1** | Keyline chocolate 2 px **y** halo crema en el CTA terracota; `--btn-ink` con valor por defecto crema | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` · `background: rgb(240,78,12)` · `color: rgb(244,226,205)` · `font: 800 20px/1 "Baloo 2"` (hero 375) y `800 22px` (hero 768/1280, Comprar) · `--btn-ink = #f4e2cd` · halo visible sobre petróleo en captura `p2-focus-cta-hero-375.png` | **CUMPLE** |
| **C2** | Subtítulo del hero = nodo con fondo crema y texto chocolate, ~11,35:1; prohibido `<p>` crema 17 px sobre `#1B7A63` | `<p>` 17 px / 600 · `color: rgb(59,37,23)` · su contenedor (píldora `CloudBlob`) `background: rgb(244,226,205)` opaco (el `<p>` es transparente sobre ese fondo) · ratio medido **11,35:1** · radio 999 px · marco SVG superpuesto (0 nodos crema 17 px sobre petróleo) | **CUMPLE** |
| **C3** | Bloques 5 y 7: ningún nodo de texto sin ancestro crema opaco; ninguna letra cruza una franja | 7 nodos en `#comprar` + 5 en `<footer>`; **12/12 dentro del panel crema** (contención `left/right/top/bottom` verificada) y con ancestro opaco (`#f4e2cd`) salvo la píldora mostaza y el CTA terracota, que están **dentro** del panel; 0 nodos con rayas visibles por debajo; capturas `p2-crop-comprar-*` y `p2-crop-footer-*` | **CUMPLE** |
| **C4** | Navbar secundario en todo el scroll y en una fila a 375 px (logo + ES\|EN\|FR + CTA), sin ocultar nada, 44 px | Alto 56 px (375) / 64 px (768-1280) · `background: rgb(27,122,99)` · CTA `background: rgb(244,226,205)` + `color: rgb(59,37,23)`, **nunca terracota** (también a 3000 px de scroll) · a 375: wordmark 16→102,2 · píldora idioma 132 px (FR 126,2→258,2) · CTA 94,8 px (FR 264,2→359) → una sola fila, todo dentro de 375 · `scrollWidth = 375 = innerWidth` · 0 elementos fuera del viewport · 44 px de alto cada control | **CUMPLE** |
| **C5** | `buy.deliveryNote` entre el CTA y la línea de envíos, ≥15 px, chocolate/crema, ocultable por `content.showDeliveryNote` | Texto 15 px / 600 · `color: rgb(59,37,23)` · fondo `#f4e2cd` · orden vertical: CTA bottom **6912,7** → nota top **6933** → envíos top **6995** · 2 líneas a 375 px (47 px de alto), sin scroll interno · en build temporal con `showDeliveryNote:false`: nota ausente, CTA→envíos 16 px (sin hueco fantasma) | **CUMPLE** |
| **C6** | 375×667: H1 + eslogan + píldora + CTA completos y ≥150 px de foto; tabulación = orden visual | H1 88→122,4 · eslogan 126,4→150,4 · píldora 182,4→231,7 · CTA 259,7→311,7 · foto top 343,7 → **323,3 px visibles** de 667 · orden de tabulación en móvil: skip → ES → EN → FR → CTA navbar → CTA hero → kit ×2 → pasos → Comprar → Victoria → Mail Club ×2 → WhatsApp del pie, con `top` estrictamente creciente; en 1280 el mismo orden con `top` 10 → 5204 | **CUMPLE** |

---

## 4. Incidencias por severidad

### BLOQUEANTES: **ninguno** (0)

No hay ninguna condición del acta incumplida, ningún texto oficial alterado, ningún precio inventado, ningún formulario y ninguna dependencia prohibida.

### MAYORES (2) — recomendadas antes de publicar, ninguna impide la entrega

| ID | Incidencia | Archivo:línea | Corrección sugerida | Esfuerzo |
|---|---|---|---|---|
| **M1** | `?lang=en\|fr` **no fuerza** el idioma cuando el visitante ya tiene una elección guardada: `localStorage` se lee antes que la query. Verificado: con `vichito.lang='fr'` guardado, navegar a `?lang=en` deja `<html lang="fr">` y el H1 «Vichito, l'Año Viejo». Afecta a enlaces compartidos a público EN/FR y al propio protocolo de auditoría (en esta misma auditoría, la primera tanda de capturas «ES» salió en francés) | `src/i18n/LanguageContext.jsx:109-123` (`detectInitialLang`: localStorage antes que `URLSearchParams`) | Invertir la precedencia: `?lang` primero y, si viene, persistirlo; después `localStorage`; después `es`. Dejar comentario de la decisión | 15 min |
| **M2** | El bloque 2 (Tradición) **no monta el `PhotoSlot 3/4`** que el contrato `§5.2` fija para la sección, aunque el hueco existe en configuración (`photos.tradition: { src:null, ratio:'3/4' }`). Desviación no registrada en acta: el bloque queda solo texto a 375/768/1280 | `src/components/Tradition.jsx:16-19` (comentario que la justifica) vs `docs/01-cro.md §5.2` y `§7` | Montar `<PhotoSlot photoKey="tradition" ratio="3/4" />` en 1 columna / 2 columnas (foto 1–5), o registrar la desviación en un addendum del acta antes de entregar | 30 min |

### MENORES (10) — cosméticas o de especificación, no bloquean

| ID | Incidencia | Archivo:línea | Corrección sugerida | Esfuerzo |
|---|---|---|---|---|
| m1 | Etiqueta de ratio del marcador de foto en **terracota/80 a 12 px = 2,4:1** sobre crema (< 4,5:1 AA) | `src/components/ui/PhotoSlot.jsx:96` | Usar chocolate/oliva o subir a 14 px bold con tono oscuro (el resto de la etiqueta ya cumple: chocolate/75 = 5,6:1) | 5 min |
| m2 | Foco sobre crema: el anillo de 3 px es mostaza (**1,31:1** contra crema); `§8.3` prescribe anillo chocolate 3 px sobre crema. La visibilidad real la da el hairline chocolate de 1,5 px | `src/index.css:98-102`, `src/components/LanguageSwitch.jsx:68-70` | Segundo anillo chocolate 2–3 px cuando el control está sobre superficie crema (`:focus-visible` dentro de `bg-crema`) | 20 min |
| m3 | Las 8 tarjetas del kit muestran la etiqueta «**Foto real:**» con dos puntos y sin nada detrás (modo corto). El ítem 12 recalibrado lo acepta, pero se lee a medio escribir | `src/components/ui/PhotoSlot.jsx:89-94` + `src/components/ui/KitCard.jsx:55` | En `labelMode="short"`, imprimir «Foto real» sin `:` o el título corto del ítem | 10 min |
| m4 | A 768 px los 3 pasos siguen **apilados en 1 columna**; `§7` pide 3 columnas con foto `1/1` (la rejilla entra a 1280: `xl:grid-cols-3`) | `src/components/HowItWorks.jsx:54` | Cambiar el punto de ruptura a `md:grid-cols-3` (o declarar la decisión en el acta) | 10 min |
| m5 | Foto de las nubes del kit a 1280: **205 px** de ancho útil (< 280 px de `§7`), consecuencia de 4 columnas + marco `frameLoop={10}` | `src/components/ui/KitCard.jsx:13-21` | Bajar `frameLoop` a 8 o dar a la foto el ancho completo de la tarjeta; alternativa: aceptar y documentar la excepción de «foto manda» en tablet/escritorio | 20 min |
| m6 | No existe `SectionDivider` (§5.1/§5.2 lo lista «entre todas las secciones»): solo hay onda en el navbar; las secciones se tocan a hueso | `src/components/ui/` (ausente) | Añadir la onda SVG de 2–3 px entre bloques (opcional visual) o retirar el componente del catálogo | 30 min |
| m7 | En estado `price`, el precio se anuncia **dos veces** (aria-label del `<p>` + `sr-only` con el mismo texto) | `src/components/ui/PriceSlot.jsx:62-78` | Quitar el `sr-only` duplicado (o el `aria-label`) cuando se active el precio | 5 min |
| m8 | Comentario obsoleto que contradice la configuración: dice que «hoy la configuración muestra la píldora de disponibilidad», pero `availability = null` → estado `hidden` | `src/components/BuySection.jsx:17-19` | Actualizar el comentario al estado real (`hidden` por defecto) | 2 min |
| m9 | 5 claves `meta.*` viven en el diccionario pero **no se usan**: `<title>`/`meta` están fijos en `index.html` (D-R2-5). Doble fuente de verdad para los textos de sistema | `src/i18n/translations.js` (`meta.title/description/ogLocale/noscript/ogAlt`) | Documentar que son referencia, o inyectarlas desde `index.html` en build | 10 min |
| m10 | `<title>` y `meta description` no cambian con el idioma (quedan en ES también en EN/FR) | `index.html:12-30` | Aceptado por D-R2-5 (textos de sistema en ES); si Victoria quiere SEO trilingüe, es una decisión nueva de la Puerta 3 | — |

**Observaciones sin incidencia:** el H1 a 375 mide 33,75 px y cabe en **una** línea (el CRO preveía hasta 3); el eslogan va a 24 px crema sobre petróleo (4,14:1) que `§8.1` autoriza para texto grande; el `<noscript>` está en ES con la línea de envíos literal y la puerta de WhatsApp, como manda D-R2-5.

---

## 5. Pruebas de no regresión

| Prueba | Método | Resultado |
|---|---|---|
| **Copy oficial literal (ES)** | Extracción de las tablas de `02-copys.md` y comparación **nodo completo** contra el DOM del build | **49/49 presentes y literales** (20 de ellas comprobadas además como nodo completo exacto). Tradición: 310 caracteres / 61 palabras idénticas. Victoria línea 1 y 2 exactas. Mail Club título y cuerpo exactos. 8 ítems del kit exactos, **ítem 4 sin punto final** («…todo el año» seguido de «Un lapicero», sin `.`). Línea de envíos exacta **×2**. `buy.deliveryNote`, `buy.note`, `how.items.*`, `kit.packagingNote`, `footer.madeIn`, `nav.cta/ctaShort`, `a11y.skip`: exactas |
| **Cero precio** | Búsqueda de `$`+cifra y de nodos de precio en los 9 escenarios + estados alternos | 0 cifras en el build entregado; `PriceSlot` en `hidden` no renderiza nodo ni deja hueco; los estados `availability` y `price` solo aparecen al cambiar `siteConfig` |
| **Cero formularios / bots / pop-ups** | `querySelectorAll` + barrido del HTML completo | 0 `<form>`, 0 `<input>`, 0 `<textarea>`, 0 `<select>`, 0 `mailto:`, 0 «manychat», 0 `[role=dialog]`, 0 iframes, 1 solo `<script>` (bundle) |
| **i18n** | Cambio por botón, por `?lang` y persistencia; volcado de nodos y atributos | 114 claves × 3 idiomas, 0 ausentes, 0 vacías, 0 huérfanas; ES por defecto; `html lang` cambia; `localStorage['vichito.lang']` escribe y se relee; **únicos nodos idénticos entre idiomas**: `vichisboh*`, `ES`, `EN`, `FR`, `4/5`, `1/1`, `1`,`2`,`3`, `WhatsApp 514-296-8295 (· DM @vichisboho)`, `@vichisboho`; 0 claves crudas y 0 `{placeholder}` visibles |
| **Enlaces de WhatsApp** | Parseo del `?text=` en bruto y `decodeURIComponent` | 9 enlaces × 3 idiomas: 8 mensajes distintos por idioma, **coincidencia exacta** con `§6.2`, **sin `%25`** (sin doble codificación), `target="_blank"` + `rel="noopener noreferrer"` |
| **Consola** | `Runtime.consoleAPICalled` + `Runtime.exceptionThrown` + `Log.entryAdded` en las 9 cargas | **0 mensajes, 0 warnings de React, 0 excepciones** |
| **Build y guardarraíles** | `npm run build`, `check:copy`, `check:console` | Build exit 0 sin warnings; `check:copy ✓`; `check:console ✓` (2 `console.warn` de i18n, DEV-only) |
| **`localStorage` bloqueado (modo privado)** | Script inyectado antes de cargar que lanza al acceder a `localStorage` | La página renderiza (3 hijos en `#root`, H1 presente, 8861 px de alto), `html lang="es"` y el cambio a FR funciona **sin excepciones** |
| **Clave inexistente en el diccionario** | Build temporal con `hero.tagline` borrado | `t()` devuelve `''`, el resto de la página queda intacto (H1, subtítulo, CTA y 6 secciones), 0 excepciones: la UI no se rompe |
| **`prefers-reduced-motion`** | `Emulation.setEmulatedMedia` | `transition-duration` del CTA = **1e-05s**, `scroll-behavior: auto` |
| **Rendimiento** | `performance.getEntriesByType('resource')`, `document.fonts`, `aspect-ratio` | **3 peticiones** (1 CSS de fuentes + CSS + JS), JS 87,11 kB gzip, CSS 6,76 kB gzip; `display=swap`; 10 marcadores de foto con `aspect-ratio` fijo (CLS 0 por imagen); sin vídeo, sin carrusel, sin librerías de scroll |
| **Dependencias** | `package.json` + barrido del bundle | Solo `react`, `react-dom` (+ `vite`, `tailwindcss`, `@vitejs/plugin-react`, `@tailwindcss/vite` en dev); URLs externas del bundle: `wa.me`, `instagram.com`, `fonts.googleapis/gstatic` y namespaces SVG. 0 librerías de iconos, 0 analítica |

---

## 6. Evidencia visual (capturas propias, build real)

Todas en `docs/evidencias/`:

**Página completa, 3 anchos × 3 idiomas**
`p2-full-375-es.png` · `p2-full-375-en.png` · `p2-full-375-fr.png` · `p2-full-768-es.png` · `p2-full-768-en.png` · `p2-full-768-fr.png` · `p2-full-1280-es.png` · `p2-full-1280-en.png` · `p2-full-1280-fr.png`

**Primer viewport real 375×667 (C6)**
`p2-firstviewport-375-es.png` — H1 + «Hibérnate» + píldora del subtítulo + CTA completos y la foto del Vichito empezando con 323 px visibles.

**Detalles de UI artesanal (a 2× para ver el trazo)**
`p2-crop-hero-1280.png` (bucles + píldora) · `p2-crop-comprar-1280.png` y `p2-crop-comprar-375.png` (rayas + panel crema + CTA) · `p2-crop-footer-1280.png` y `p2-crop-footer-375.png` · `p2-crop-kitcard-375.png` y `p2-crop-kitcard-1280.png` · `p2-crop-victoria-1280.png` · `p2-crop-cta-375.png` (keyline + halo) · `p2-crop-langpill-1280.png` · `p2-crop-hero-375.png`.

**Foco visible (teclado real)**
`p2-focus-skip-375.png` · `p2-focus-lang-375.png` (anillo mostaza + cuadro chocolate sobre la píldora crema) · `p2-focus-cta-hero-375.png` (anillo mostaza sobre petróleo) · `p2-focus-secondary-cream-375.png` · `p2-focus-footer-375.png`.

Verificación contra el boceto `../IMG_0314.png`: se reconocen los cinco gestos del dibujo —marco de bucles alrededor de la foto del hero, óvalo/píldora crema para la explicación, nubes crema para las fotos de producto, bloque rayado con botón terracota para «dice compra» y cierre con wordmark y mail club— sin caer en retícula corporativa.

---

## 7. Nota final

El entregable es **técnicamente entregable y publicable en cuanto a código**: cumple las seis condiciones del acta, los 22 ítems del checklist con dos matices, todas las prohibiciones duras, la fidelidad literal de los textos de Victoria y el sistema trilingüe completo, con un build de 3 peticiones y consola limpia. Los dos mayores y los diez menores son de bajo coste y no afectan a la conversión ni a la accesibilidad crítica; los he dejado priorizados para que el equipo los cierre en una sola pasada de 2–3 horas antes de que Victoria dé las fotos reales.

Lo que **sí** impide publicar sigue en manos de Victoria y no del código: las fotos reales del Vichito, la maleta, los calzones y el billete (D9), la ratificación del alcohol (D2), la fecha de pedidos de diciembre (D3), el punto de recogida gratis (D10) y —cuando lo decida— el precio del kit (D1) y el token `--btn-ink` de la deuda de contraste (D-CTA).

---

*Verificador Técnico — Puerta 2 · 16 de noviembre de 2026*
*Mediciones: Chrome headless por CDP sobre `http://localhost:4400/` (build de producción), 9 combinaciones ancho × idioma + 5 builds temporales de configuración en `.tmp/` (sin tocar el código del proyecto).*
