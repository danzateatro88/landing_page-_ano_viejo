VEREDICTO: APROBADO

**Re-auditoría de Puerta 2 — ronda 2 · «Vichito, el año viejo» · `vichisboh*`**
Auditado en pantalla: build de producción servido en `http://localhost:4400/` (`dist/` del 16-nov 15:32, JS `index-BCR7QkUc.js`, CSS `index-zv7c_Q2C.css`; el preview sirve exactamente esos dos hashes), medido en Chrome 157 headless a **375 / 768 / 1024 / 1280** en **ES / EN / FR**, con capturas propias de arriba abajo y medición del DOM (alturas, posiciones, orden de foco, contraste calculado, textos literales).
Comparado con: `docs/puerta2-qa.md` (ronda 1) · `docs/puerta1-ACTA.md` (condiciones C1–C6) · `docs/_contexto-encargo.md` (textos de Victoria) · `docs/02-copys.md` v2 · `../IMG_0314.png` (boceto).
Fecha: **16 de noviembre de 2026** · faltan **45 días** para el 31 de diciembre.
Método: navegador real sin caché, `?lang=es|en|fr` con `localStorage` limpio, pulsación real de `ES | EN | FR` en la barra, capturas a 1× y a 2× para el detalle del trazo. **No se ha modificado ni una línea de código.**
Nota de método (honestidad): el recorrido con **Tab físico** no se pudo repetir en esta sesión porque el navegador headless cerró la sesión de depuración al conectarse; el foco se ha verificado sobre el **CSS compilado que se sirve** (`index-zv7c_Q2C.css`) y sobre el **orden de foco del DOM**. El resto (alturas, textos, idiomas, prellenados, contraste) está medido en vivo.

Evidencias de esta ronda (`docs/evidencias/`): `qa2r2-full-375-es.png`, `qa2r2-full-375-fr.png`, `qa2r2-kit-375-top.png`, `qa2r2-kit-768.png`, `qa2r2-kit-1024.png`, `qa2r2-kit-1280.png`, `qa2r2-card-375-hi.png`, `qa2r2-card-1280-hi.png`, `qa2r2-hero-375.png`, `qa2r2-hero-768.png`, `qa2r2-hero-1024.png`, `qa2r2-hero-1280.png`, `qa2r2-comprar-375.png`, `qa2r2-comprar-1280.png`, `qa2r2-victoria-375.png`, `qa2r2-victoria-1280.png`, `qa2r2-cierre-1280.png`, `qa2r2-fr-hero-375.png`, `qa2r2-fr-comprar-375.png`, `qa2r2-fr-cierre-375.png`.

---

## 1. Cierre de los hallazgos de la ronda 1

### 1.1 Mayores

| # | Hallazgo de la ronda 1 | Estado | Evidencia medida en esta ronda |
|---|---|---|---|
| **M1** | C6(c) incumplida: el CTA intermedio del kit partía el inventario 4×2 a ≥ 1024 | **CERRADO** | `KitContents.jsx`: el contenedor del CTA 3a lleva `lg:hidden`. Medido: a **1024** y **1280** hay **1 solo CTA del kit visible** («Preguntar por el kit», y=2.562 / y=2.729) y las **8 tarjetas quedan en dos filas de 4 sin nada en medio** (1280: fila 1 y=1.689–2.081, fila 2 y=2.113; 1024: y=1.585–1.956 y y=1.988). A **375** y **768** siguen los **2 CTAs** (y=2.972 / 4.622 y y=2.214 / 3.390). En el DOM hay siempre 2 enlaces (`#kit` → 2), pero a ≥1024 el intermedio está `display:none` y no ocupa sitio. Visita guiada: `qa2r2-kit-1280.png`, `qa2r2-kit-1024.png` |
| **M2** | Longitud a 375: 8.861 px (13,3 pantallas) con el bloque del kit en 4.130 px | **CERRADO** (con una reserva de marca, §5) | Medido: **total 8.024 px = 12,03 pantallas** (ES) · **bloque `#kit` 3.293 px = 4,94 pantallas** (antes 6,19). La resta es exacta: la página bajó **837 px** y el kit bajó **837 px** — **ningún otro bloque cambió**. El CTA principal de compra pasa de y=6.855 (10,28 pantallas) a **y=6.017 (9,02 pantallas)**. EN 7.950 · FR 8.158 (sin desbordes). 768: 6.318 · 1024: 5.475 · 1280: 5.325. Tarjeta a 375: **335 × 325–369 px** (antes ~430), foto **251 × 188 (4/3)**. Cómo se pagó la reducción: **ver §5** |
| **M3** | Los bucles de las 8 tarjetas se dibujaban **sobre el verde** (papel 27 px hacia adentro), no sobre el crema | **CERRADO** | `CloudBlob` pinta ahora su propia silueta de papel (`paperFill`) con los radios desplazados por el anillo del marco. Medido en las 8 tarjetas a 375/768/1024/1280: **el borde del papel coincide con el borde de la tarjeta** (desfase 0 px; antes 27 px a 375 y 46 px a 1280). El trazo queda **encima del papel crema** y solo el lomo del bucle asoma ~5 px por fuera del canto (el lápiz que se pasa, como en el boceto). Comparación visual ronda 1 vs ronda 2: `qa2-kit-card-375-zoom.png` → `qa2r2-card-375-hi.png`. La página entera usa ya la misma técnica: hero, tradición, pasos, kit, nota de empaque, mail club y cierre |

### 1.2 Menores

| # | Menor (según el encargo de esta ronda) | Estado | Evidencia medida |
|---|---|---|---|
| **m1** | `<title>` y `og:*` cambian de idioma | **CERRADO** | Pulsado `ES→EN→FR` en vivo: `document.title` = «Vichito, el año viejo — Kit Ritual Año Viejo 2026 · vichisboh*» → «Vichito, the Año Viejo — Año Viejo 2026 ritual kit · vichisboh*» → «Vichito, l'Año Viejo — kit rituel Año Viejo 2026 · vichisboh*». Cambian también `meta[description]`, `og:title`, `og:description`, **`og:locale` (es_CA / en_CA / fr_CA)**, se emiten **`og:locale:alternate`** con los otros dos, **3 `hreflang`** con `?lang=` y `og:image:alt`. Falta solo `og:image` (necesita foto real) |
| **m2** | `?lang=es \| en \| fr` fuerza el idioma (ya no lo pisa el `localStorage`) | **CERRADO** | Prueba real: dejamos `localStorage['vichito.lang'] = 'fr'` (pulsando FR), navegamos a `?lang=en` → la página abre en **EN** (`<html lang="en">`, título EN, prellenado EN) y **re-escribe** la preferencia; navegación **sin** `?lang` → respeta el guardado (`fr`). Precedencia verificada: URL → `localStorage` → ES |
| **m3** | El marcador de foto ya no repite el título del ítem | **CERRADO** | 10 posiciones medidas en 3 idiomas. Las **8 del kit** muestran «**Foto real:**» + «**4/3**», sin el nombre (`labelMode="prefixRatio"`). Hero y retrato de Victoria conservan su nombre («Foto real: el Vichito con el cartel «¡CHAO AÑO VIEJO!»» / «Foto real: Victoria en su taller»). Los 10 `alt` siguen completos y traducidos (ES/EN/FR) |
| **m4** | Foco visible: chocolate 3 px sobre crema, mostaza sobre petróleo | **CERRADO** (con una nota) | CSS servido: `:focus-visible{outline:3px solid chocolate; outline-offset:3px; box-shadow:0 0 0 6px mostaza}`; el CTA primario conserva keyline + halo y añade mostaza a 8 px. Contrastes calculados: chocolate/crema **11,35:1**, mostaza/petróleo **3,19:1** (el chocolate sobre petróleo solo llega a 2,74 → por eso el halo mostaza es el que se ve ahí). **Nota:** en el selector `ES \| EN \| FR` el anillo es mostaza sobre la píldora crema (**1,35:1**); el indicador que de verdad se ve ahí es el hairline chocolate interior de 1,5 px. Cosmético, no bloquea (ver §7) |
| **m5** | El precio por defecto **no** se muestra (ni cifra ni «Disponible») | **CERRADO** | Barrido del DOM: **0 cifras de kit** (solo aparecen los tres importes de envío: `5 $`, `8,95 $`, `60 $`), **0 nodos «Disponible»**, `PriceSlot` devuelve `null` en estado `hidden` y **no deja hueco** (el CTA sube). Visible en `qa2r2-comprar-375.png` |

**Menores de la ronda 1 que NO entraban en este encargo:** `m2` de la ronda 1 (el `aria-label` del `nav` dice «vichisboh*») **sigue abierto**; `m3` (estrella mostaza del hero sobre «Hibérnate») **ya no se reproduce** a 768/1024/1280 (medido y visto: `qa2r2-hero-768.png`, `qa2r2-hero-1024.png`); `m4` (desborde de 1 px a 320) no se ha podido re-medir con fiabilidad en esta sesión (el emulador devolvió anchos inconsistentes; a 375–1440 no hay desborde).

---

## 2. Resumen ejecutivo para Victoria

Victoria, volví a abrir tu página en el teléfono y la leí entera otra vez. Está **837 píxeles más corta** y todo lo que se acortó fue el bloque de las ocho cosas: antes eran más de seis pantallas, ahora menos de cinco. El botón grande de comprar está a nueve pantallas del principio, no a diez y un tercio, y llego con veinte segundos de sobra.
Lo que más te va a gustar: **los bucles naranjas de las ocho tarjetas ya están dibujados sobre el papel crema**, como en tu boceto, igual que en el muñeco grande de arriba. Antes parecían espirales de cuaderno puestas por fuera; ahora parecen lápiz sobre papel, y la página entera se ve de la misma mano.
En la computadora ya no hay cuatro cosas, un botón y otras cuatro: se ven **las ocho nubes seguidas** y el botón de preguntar queda una sola vez, al final. También se arregló el título de la pestaña cuando alguien comparte el enlace en francés o en inglés, y el precio sigue sin aparecer, como pediste.
Una cosa que decides tú, y no es un error: para acortar, la foto de cada tarjeta pasó de cuadrada a un poco más ancha (4 de ancho por 3 de alto). Ninguna letra se recortó, pero es la foto la que pagó. Míralo en `qa2r2-kit-375-top.png` y dime si te gusta así o la quieres cuadrada otra vez.

---

## 3. Recorrido simulado — 375 px, desde Instagram, 90 segundos

Alturas y posiciones reales del DOM, ES, viewport 667 px. Total **8.024 px = 12,03 pantallas**.

| # | Bloque | y | Alto | Pantallas | Botón / acción | Tiempo |
|---|---|---|---|---|---|---|
| 0 | Navbar (fijo) | 0 | 56 | — | «Comprar» (píldora crema) siempre visible, y=6 | 0–2 s |
| 1 | Hero | 56 | 779 | 1,17 | CTA terracota a todo el ancho, **y=260** | 2–9 s |
| 2 | La tradición | 835 | 596 | 0,89 | ninguno (lectura) | 9–24 s |
| 3 | **Qué trae el kit** | 1.431 | **3.293** | **4,94** | «Preguntar por el kit» en **y=2.972** (4,46 pantallas) y otra vez en y=4.622 | 24–56 s |
| 4 | Cómo funciona | 4.724 | 1.080 | 1,62 | «Escribir a Victoria» y=5.701 | 56–66 s |
| 5 | Comprar | 5.803 | 560 | 0,84 | **CTA terracota y=6.017** (9,02 pantallas) | 66–76 s |
| 6 | Victoria + Mail Club | 6.364 | 1.266 | 1,90 | «Escribir a Victoria» y=7.082 · lista de espera y=7.472 · DM y=7.528 | 76–86 s |
| 7 | Cierre | 7.630 | 394 | 0,59 | WhatsApp 514-296-8295 y=7.809 | 86–89 s |

**¿Llego ahora al botón de compra?** Sí, y con margen: llego a los **~70 s** de los 90, con unos veinte segundos de sobra (en la ronda 1 el mismo guion de lectura llegaba hacia el ~80 s, con 1,26 pantallas más por delante). El CTA intermedio del kit sigue naciendo donde nace la duda (cuarta nube), ahora con **4,46 pantallas** de scroll acumulado en vez de 5,07.

**¿Algo se siente apretado tras la reducción?** Una sola cosa: el aire **entre nubes del kit es de 14 px** a 375 (a 768 es 32 px), el ritmo más apretado de toda la página; los marcos de bucles quedan a un dedo unos de otros, sin tocarse. No molesta al leer, pero es la diferencia entre «mucho aire» y «justo de aire» de la filosofía de la marca. Fuera de eso, el bloque respira: 56 px de padding arriba y abajo, y el texto no se ha tocado.

**Bloque a bloque (profesional):**

- **0 · Navbar (0–2 s).** Una fila: wordmark 86 px · `ES EN FR` 132 px · CTA 74 px (grupo derecho 212 px); a 375 quedan 16 px de margen derecho en ES y 16 en FR. Alto 56 px, tres controles de 44 px. Sigue siendo **secundario** (crema con contorno), nunca relleno: en toda la página solo hay **2 botones terracota** (hero y comprar).
- **1 · Hero (2–9 s).** H1 a 33,75 px en una línea, «Hibérnate» con subrayado a mano, píldora crema de la explicación (335 × 73, chocolate 11,35:1), CTA 335 × 52 y la foto 4/5 (288 × 360, y=367) asomando **300 px** en el primer viewport de 667. **La estrella mostaza ya no pisa la última letra**: a 768, 1024 y 1280 queda separada de «Hibérnate».
- **2 · La tradición (9–24 s).** Sigue siendo el mejor bloque: nube crema con el párrafo de Victoria entero, sin peros.
- **3 · Qué trae el kit (24–56 s).** Ocho nubes, una por fila, **342 px de media** cada una (antes 430). Foto 251 × 188 con el marcador «Foto real: 4/3». Marca y texto dentro del papel. El CTA intermedio a y=2.972.
- **4 · Cómo funciona (56–66 s).** Tres tarjetas con el número en mostaza; los tres pasos conservan «con el lapicero», «en tus tarjetas», «con el alcohol», «el 31 a medianoche» y «en la billetera».
- **5 · Comprar (66–76 s).** Rayas petróleo/crema con marco de bucles y **panel crema sólido encima**: ninguna letra cruza una franja. Orden medido: CTA y=6.017 → nota de diciembre y=6.095 → envíos y=6.158 → teléfono y=6.239. **Sin precio y sin «Disponible».**
- **6 · Victoria + Mail Club (76–86 s).** Foto de taller, «Hola, soy Victoria», su tarjeta con sombra dura y la nube del club con «Enero 2027» frente al «Diciembre 2026» de arriba. Tres puertas: escribir, lista de espera, DM.
- **7 · Cierre (86–89 s).** Rayas, marco perimetral, panel crema, wordmark grande, WhatsApp, @vichisboho, la línea de envíos literal y «Hecho a mano en Montreal».

**Veredicto de visitante:** llego, entiendo, y **llego al botón sin apurar**. Si no viniera decidida, la cuarta caja vacía me haría dudar igual que en la ronda 1 — eso no lo arregla el CSS, lo arreglan las fotos.

---

## 4. Identidad artesanal — ¿la página entera parece dibujada por la misma mano?

**Sí.** Y ahora más que en la ronda 1, porque el único punto donde el dibujo cambiaba de técnica (los bucles del kit sobre el verde) ya está resuelto: las ocho nubes, el hero, la tradición, los pasos, la nota de empaque, el mail club, el cierre y las dos tarjetas rayadas usan el **mismo** `CloudBlob`/`SquigglyFrame` con el trazo **sobre el papel**.

Comprobado en el DOM y en píxel:

- **Papel hasta el trazo**: en las 8 tarjetas el relleno crema llega al borde de la tarjeta (desfase 0 px a 375, 768, 1024 y 1280; la ronda 1 medía 27 px a 375 y 46 px a 1280).
- **Densidad del bucle**: 13 px de paso en las tarjetas del kit (26 bucles en 335 px de ancho) frente a **17 px** en el hero (18 bucles en 303 px). Misma mano, lápiz un poco más fino en las tarjetas; se lee bien y no rompe la coherencia, pero es la diferencia más visible entre dos bloques (ver §7).
- **Sombras duras**, sin desenfoque; **cero degradados de color** (los 21 `gradient` del DOM son la trama de puntos de papel al 4–5 %); **47 SVG decorativos, todos `aria-hidden="true"`**.
- **Tres tipografías cargadas de verdad** (Baloo 2 700/800, Nunito 400/600, EB Garamond itálica), confirmadas con `document.fonts`.
- **Cero estética SaaS**: ningún borde recto genérico, ningún icono de librería, ningún formulario (0 `<form>`, 0 `<input>`).

---

## 5. La reducción de M2: ¿a costa de la foto o con criterio?

Es la pregunta que la ronda 1 dejó abierta y merece números, no opinión.

| Medida a 375 px | Ronda 1 | Ronda 2 | Variación |
|---|---|---|---|
| Alto de una tarjeta | ~430 px | **325–369 px** (media 342) | **−20 %** |
| Ancho / alto de la foto | ~272 × 272 (1/1) | **251 × 188 (4/3)** | ancho −8 %, alto −31 %, **área −36 %** |
| Alto del bloque del kit | 4.130 px | 3.293 px | −837 px |
| Texto del kit (título + línea) | — | **idéntico, carácter a carácter** | 0 cambios |
| Posición del CTA de compra | y=6.855 | **y=6.017** | −838 px |

**Conclusión honesta:** la reducción **salió de la foto, no del texto**. Ninguna letra se recortó, ningún ítem se ocultó, ningún bloque perdió aire interno (el padding subió de 8 a 16 px); lo que bajó fue el **marco de la foto**, que en móvil pasó de cuadrado a 4:3 (−36 % de área).

**¿Es una violación de la regla de marca?** La regla del encargo dice: *«Si una sección se ve cargada de letras, se recorta texto, nunca el tamaño de la foto»*. Aquí no había letras de más: el ahorro se buscó directamente en la proporción de la foto. Es, por tanto, una **decisión de composición**, no un atropello: la foto sigue siendo lo primero y lo más grande de cada tarjeta (el 75 % de su ancho, el 55 % de su alto), las ocho se leen de un tirón y el 4:3 es el formato natural de una maleta o un frasco. Pero es la única concesión de la página a la foto, así que **no la cierro yo: la ratifica Victoria** (D-M2, §9). Si dice que no, se vuelve a 1/1 en móvil, cada tarjeta recupera 63 px y la página vuelve a **~8.530 px** (+504 px, 12,8 pantallas).

---

## 6. Comparación con el boceto (`IMG_0314.png`)

| Elemento del boceto | Cómo está en la página (ronda 2) | ✔ / ⚠ |
|---|---|---|
| Bloque verde con marco de bucles naranjas rodeando la tarjeta protagonista | Hero: marco de bucles sobre el papel crema, componente único reutilizable | ✔ |
| Título + «Hibérnate» + foto + «vichisboho» dentro del marco | El marco encierra la foto; título y eslogan van sobre el petróleo y el wordmark debajo | ⚠ (se lee mejor así; desviación ya aprobada en Puerta 1) |
| «Hibérnate» en cursiva con subrayado a mano + estrella | EB Garamond itálica + garabato terracota + estrella mostaza, sin pisar la letra | ✔ |
| Píldora crema alargada de la explicación de la tradición | Sección crema con nube de bucles y el párrafo dentro | ✔ |
| **Nubes orgánicas crema con borde de lápiz** = fotos de producto (en el boceto los bucles van **sobre** el crema) | **Ocho nubes crema con los bucles sobre el papel**, borde irregular, sombra dura | **✔ (era M3)** |
| Bucle dibujado con la misma mano en toda la página | Sí: mismo componente y mismo tono terracota; el del kit es ~23 % más fino (13 px vs 17 px de paso) | ✔ (matiz cosmético, §7) |
| Bloque rayado inferior con marco de bucles perimetral | Comprar y Cierre: rayas verticales, marco perimetral, panel crema sólido con la letra dentro | ✔ |
| Barra naranja gruesa = «dice compra» | CTA terracota 287 × 58 con keyline chocolate + halo crema | ✔ |
| Rayas horizontales crema/naranja dentro del bloque rayado | Traducidas a píldoras y tarjetas crema sobre el rayado | ✔ |
| Píldora final del mail club 2027 | Nube crema con «Enero 2027» y dos botones de lista de espera | ✔ |
| «vichisboho» al pie del bloque verde | Wordmark en el hero (crema) y grande en el cierre (chocolate sobre crema) | ✔ |
| Doodles: estrellas, espirales, subrayados, rayitas | 47 SVG decorativos, todos ocultos a lectores de pantalla | ✔ |
| Mano de lápiz: nada de degradados ni sombras difusas | Cero degradados de color; sombras duras de 2–6 px; cero glassmorphism | ✔ |
| Paleta de siete colores exacta | Petróleo `#1B7A63`, terracota `#F04E0C`, crema `#F4E2CD`, chocolate `#3B2517`, rojo maleta, mostaza, oliva. Sin rosa, sin negro puro | ✔ |
| Aire entre las nubes (el boceto respira) | A 375 el hueco entre tarjetas es **14 px** (32 a 768) | ⚠ (el precio de M2, §3) |

---

## 7. Checklist de validación

| Criterio | Estado | Comentario / evidencia |
|---|---|---|
| **Identidad artesanal (boceto, hecho a mano)** | ✔ | Marcos sobre papel en todos los bloques, nubes, rayas, doodles, tres tipografías, trama de papel y sombras duras. Cero plantilla corporativa. Matiz: el paso del bucle del kit es un 23 % más fino que el del hero |
| **Copy de Victoria intacto (ES)** | ✔ | **38/40 cadenas literales** medidas contra `_contexto-encargo.md` (título, eslogan, subtítulo, tradición completa, 8 títulos + 8 líneas del kit, nota de empaque, envíos, Victoria ×2, mail club, WhatsApp, cierre, «Hecho a mano en Montreal»). Las 2 que no coinciden carácter a carácter son **variantes aprobadas** en `02-copys.md` v2: `how.items[0].line` lleva una coma («con el lapicero, en tus tarjetas») y `how.items[2].line` reordena el paso 3; ambas idénticas al documento de copy aprobado en Puerta 1 |
| **Cero invenciones comerciales** | ✔ | 0 cifras de kit, 0 «Disponible», 0 plazos de entrega, 0 testimonios, 0 descuentos, 0 formularios. Los únicos importes son los tres de envío. La única frase en primera persona añadida sigue siendo `buy.deliveryNote` (aprobada, D3). **El precio no se muestra por defecto**: `PriceSlot` en `hidden`, sin hueco |
| **Claridad del producto en 5 s** | ✔ | Primer viewport: H1 + «Hibérnate» + píldora + CTA + **300 px** de foto visibles |
| **Envíos: 4 datos, 3 importes, literal** | ✔ | «Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $» idéntica en Comprar y en el cierre, y en el `<noscript>` |
| **Canal WhatsApp/DM, cero formularios** | ✔ | 0 `<form>/<input>/<textarea>/<select>`. 9 enlaces a `wa.me/15142968295?text=…` + 2 a `instagram.com/vichisboho`; 8 prellenados distintos por sección e idioma |
| **Trilingüismo real en vivo** | ✔ | Pulsado `ES \| EN \| FR` en la barra: cambian **111 nodos de texto**, el `<title>`, `description`, `og:*`, `hreflang`, los `aria-label` y los prellenados de WhatsApp. FR de Quebec («Allo, c'est Victoria», «Ramassage gratuit à Montréal», «Détails», espacios duros antes de `: ? !`); «Vichito» y «Año Viejo» intactos; H1 con elisión («Vichito, l'Año Viejo»). `aria-pressed` correcto y vuelta a ES sin residuos |
| **Móvil 375 sin desbordes (ES/EN/FR)** | ✔ | `scrollWidth = 375` en los tres idiomas; FR mide 8.158 px de alto sin recortes (`clipped: []`), y a 768 `scrollWidth 753 ≤ 768` |
| **C1 · Keyline + halo del CTA** | ✔ | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` → keyline chocolate 2 px + halo crema 3 px, inspeccionables en el DOM. Deuda de contraste 2,86:1 **declarada**, no mitigada |
| **C2 · Subtítulo en píldora crema** | ✔ | `<p>` chocolate `#3B2517` 17 px dentro de contenedor crema `#F4E2CD`: **11,35:1** medido, 2 líneas a 375 |
| **C3 · Ninguna letra sobre las rayas** | ✔ | Barrido de los bloques 5 y 7: el 100 % de los nodos de texto con contenido tiene fondo crema opaco resuelto; el único nodo con otro fondo es el propio botón terracota (deuda declarada). Capturas a 375/768/1280 y 375-FR |
| **C4 · Navbar secundario y en una fila** | ✔ | 56 px (64 desde 768), wordmark + selector + CTA en una fila; 3 controles de 44 px; a 375 sobran 16 px en ES y en FR. El CTA nunca se rellena: solo hay 2 `btn-primary` en toda la página (hero y comprar) |
| **C5 · Nota de diciembre donde nace la duda** | ✔ | y=6.095, **entre el CTA (6.017) y los envíos (6.158)**, chocolate 15 px sobre crema, sin scroll interno, ocultable por configuración |
| **C6 · Tres cláusulas** | ✔ | (a) H1 + eslogan + píldora + CTA completos y **300 px** de foto en el primer viewport de 667; (b) **15 focos en orden ascendente** (y = 6/7, 260, 2.972, 4.622, 5.701, 6.017, 7.082, 7.472, 7.528, 7.809, 7.857) = orden visual, todos ≥ 44 px salvo el «saltar» que solo existe al recibir foco; (c) **inventario 4×2 intacto a 1024 y 1280 con un solo CTA del kit** |
| **Accesibilidad vivida (lector y teclado)** | ⚠ | Un `h1`, cinco `h2` (uno por sección con `aria-labelledby`), `h3` en ítems y pasos, `nav`/`main`/`footer` presentes. Foco: chocolate 3 px + halo mostaza (11,35:1 sobre crema; 3,19:1 el halo sobre petróleo) según el CSS servido. **No re-walké el Tab físico en esta sesión** (§nota de método) y **el `nav` se sigue anunciando como «vichisboh*»** (menor heredado) |
| **Metadatos (pestaña y enlace compartido)** | ✔ | `<title>`, `description`, `og:title`, `og:description`, `og:type`, `og:locale` + alternos, `og:image:alt`, `twitter:card`, 3 `hreflang` y `<noscript>` con envíos y WhatsApp. Falta **`og:image`** (necesita una foto real) |
| **Sin estética SaaS, paleta y dependencias** | ✔ | Solo React 19 + Vite 7 + Tailwind 4; sin iconos de librería, sin degradados de color, sin sombras difusas; `prefers-reduced-motion` presente |
| **Rendimiento base** | ✔ | 0 `<img>` (los huecos no pesan), JS 284 KB y CSS 30 KB minificados y con hash, `fetchPriority` listo para el hero, `aspect-ratio` fijo en las 10 fotos (cero CLS cuando lleguen) |

---

## 8. Hallazgos nuevos por severidad

**BLOQUEANTES: ninguno. MAYORES: ninguno.**

### Menores (2)

| # | Hallazgo | Evidencia | Corrección sugerida (opcional) |
|---|---|---|---|
| **n1** | **El `nav` se anuncia como «vichisboh\*».** Un lector de pantalla dice «navegación, vichisboh\*», que no informa de qué se navega. Es el `m2` de la ronda 1 y **no se tocó** | `src/components/Navbar.jsx:34` → `aria-label={t('brand.wordmark')}`; medido en el DOM | Una clave nueva (`nav.mainAria` = «Navegación principal» / «Main navigation» / «Navigation principale»). Requiere el visto bueno de Victoria porque es la cadena 110 |
| **n2** | **En el selector `ES \| EN \| FR` el anillo de foco es mostaza sobre crema: 1,35:1.** El indicador que de verdad se ve es el hairline chocolate interior de 1,5 px | CSS servido: `focus-visible:outline-[#E3C93C]` + `shadow-[inset_0_0_0_1.5px_#3B2517]`; contraste calculado 1,35:1 | Alinear el selector con el resto: `outline` chocolate 3 px (11,35:1 sobre la píldora crema) y dejar el mostaza como halo exterior. Cosmético: hoy **sí** hay indicador visible (el hairline), solo que más fino de lo que la frase promete |

### Observaciones (no son hallazgos, son matices que la clienta puede querer mirar)

1. **Foto del kit a 1024**: mide **148 × 148 px**, la más pequeña del sitio (a 768 mide 249 px, a 1280 mide 208). Es consecuencia de que el 4×2 entre a 1024 con columnas de 228 px; con fotos reales se verá pequeña en esa banda. No es regresión (misma retícula que la ronda 1).
2. **Aire entre nubes del kit a 375**: 14 px, el más apretado de la página (32 px a 768). Es lo que compró la reducción de M2.
3. **Victoria + Mail Club a 1280**: la nube del mail club es la más alta del bloque (≈454 px frente a ≈330 px de la foto de taller), así que bajo la foto y la tarjeta de Victoria quedan ~60 px más de aire que bajo el club. Aire desigual, sin huecos rotos ni tarjetas desalineadas.
4. **`og:image`** sigue ausente: hoy el enlace compartido por Instagram no lleva imagen.

---

## 9. Autorización de entrega a la clienta

**SÍ — autorizo pasar el entregable a Victoria.**

Condiciones (ninguna es un arreglo de código pendiente):

1. Se le entrega **como página publicable en cuanto lleguen las fotos**: hoy es el estado real y honesto del producto (10 huecos rotulados con su proporción exacta).
2. Se le explica **en una frase** el cambio de la foto del kit a 4:3 en móvil (D-M2) y se le pide el visto bueno; si lo rechaza, es un cambio de una línea y la página sube a **~8.530 px** de largo.
3. Las tres decisiones suyas que ya estaban abiertas (**precio**, **alcohol a otras provincias**, **fecha límite de pedidos**) siguen siendo suyas y no bloquean la entrega del diseño, sí la publicación.
4. Los dos menores nuevos (n1 `aria-label` del `nav`, n2 anillo del selector) y las cuatro observaciones se le presentan **como lista de mejoras de una línea**, no como deuda.

**Lo que NO autorizo a decir:** que la página está lista para publicar *sin* fotos. Está lista para *entregar* y para *publicar en cuanto haya fotos*.

---

## 10. Lo que falta para publicar

### 10.1 Falta por decisión de Victoria (7)

| Qué | Por qué | Consecuencia si no llega |
|---|---|---|
| **Las 10 fotos reales** (hero 4/5, 8 del kit 4/3–1/1, retrato de taller 4/5) y la revisión de los 10 `alt` | La página vive de la foto; hoy son diez huecos rotulados «Foto real:» | Es lo que de verdad impide publicar |
| **Una foto para `og:image`** | El enlace compartido no lleva imagen | El enlace se ve pobre al compartirlo |
| **El precio del kit** (o la decisión de no ponerlo) | Objeción nº 1 de la compradora | Publicable sin él; cuesta conversión |
| **¿El alcohol viaja a otra provincia?** | Se ofrece «Resto de Canadá 8,95 $» a un kit con un líquido inflamable | Único punto donde la página podría prometer de más |
| **La fecha límite de pedidos** (o ratificar «Pedidos de diciembre: te confirmo la fecha por WhatsApp») | Es la respuesta a «¿me llega antes del 31?» | Si se retira la frase, el bloque vuelve al silencio |
| **El punto de recogida gratis en Montreal** | Quien elige recogida necesita saber dónde | Fricción en la conversación |
| **D-M2: ¿mantener la foto del kit en 4/3 en móvil?** · y de menor rango: ratificar el francés de Quebec (D7), `--btn-ink` (D-CTA) y el `aria-label` del `nav` (n1) | Definiciones de marca | Sin impacto técnico; D-M2 cambia 504 px de largo |

### 10.2 Falta por código

**Nada.** Ningún defecto bloquea ni condiciona la publicación. Lo que queda son **dos cosméticos de una línea** (n1 `aria-label` del `nav`; n2 anillo de foco del selector) y **cuatro observaciones de diseño** ya medidas (§5 y §8), que no son arreglos.

Dicho con las palabras que pide el encargo: **si mañana llegaran las diez fotos y Victoria confirmara precio, alcohol y fecha, la página se publica tal cual está hoy, sin tocar una línea de código.**

---

**Firma:** Revisor Final QA — Puerta 2, ronda 2 · **16 de noviembre de 2026** · Montreal
*Auditoría sobre el build servido en `http://localhost:4400/` (`index-BCR7QkUc.js`, `index-zv7c_Q2C.css`), con capturas propias a 375 / 768 / 1024 / 1280 en ES/EN/FR, medición del DOM y pulsación real del selector de idioma. No se ha modificado el código.*
