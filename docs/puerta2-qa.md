VEREDICTO: CAMBIOS REQUERIDOS

**Auditoría de Puerta 2 — la página real (código, estética artesanal y conversión)** · «Vichito, el año viejo» · `vichisboh*`
Auditado: build de producción en `http://localhost:4400/` (`dist/` del 16-nov 15:09, servido con `vite preview`; JS `index-CF_XltNc.js`, CSS `index-bhZWwSem.css`), comparado con `docs/_contexto-encargo.md`, `docs/01-cro.md` v2 (§9, 22 ítems), `docs/02-copys.md` v2, `docs/puerta1-ACTA.md` (C1–C6, D-R2-1…7) y `../IMG_0314.png` (boceto de Victoria).
Rol asumido: **compradora de diciembre en Montreal que llega por Instagram y no sabe qué es un Año Viejo**, y **Victoria**, artesana, mirando su propia marca.
Fecha: **16 de noviembre de 2026** · faltan **45 días** para el 31 de diciembre.
Método: navegador real sin caché (Chrome headless 375/768/1024/1280, `?lang=es|en|fr` con `localStorage` limpio), capturas propias de arriba a abajo, medición del DOM (alturas, contrastes calculados, orden de tabulación, atributos), recorrido con teclado y pulsación real de `ES | EN | FR`. Evidencias en `docs/evidencias/qa2-*.png`. **No se ha modificado una sola línea de código.**

**Resumen del dictamen:** la página está viva, es de Victoria, se entiende en cinco segundos y cumple **5 de las 6 condiciones del acta**. Falla **C6 en su tercera cláusula**: a partir de 1024 px el botón «Preguntar por el kit» cae **entre la fila 1 y la fila 2** del inventario y parte las ocho nubes en dos grupos. Además hay una desviación artesanal que la clienta va a notar: **los bucles de las ocho tarjetas del kit se dibujan sobre el verde, no sobre el papel crema** como en el boceto (el hero, la tradición, los pasos y el cierre sí lo hacen bien). Y una medición nueva, que nadie había hecho en pantalla: **a 375 px la página mide 8.861 px, 13,3 pantallas**, de las cuales 4.130 son el bloque del kit. Nada de esto toca los textos de Victoria, ni el copy, ni la conversión por WhatsApp/Instagram. Son **tres arreglos pequeños** (uno de retícula, uno de una clase CSS, uno de decisión) y la página queda publicable en cuanto lleguen las fotos.

---

## Resumen ejecutivo para Victoria

Victoria, abrí tu página en un teléfono como el de tu compradora, entré desde Instagram y la leí entera. Lo primero: **tu voz está intacta**. Comparé palabra por palabra tus dieciséis líneas —el título, «Hibérnate», tu explicación del 31, las ocho cosas del kit, los tres pasos, tu presentación y el mail club— y están como las escribiste, hasta el cuarto ítem, el del billete, sin punto final. Nadie te cambió una coma.

Tu visitante ve lo que dibujaste: el verde petróleo, tus marcos de bucles naranjas, las nubes de papel crema, la franja de rayas con el panel encima y el botón naranja grande como una puerta. **En la primera pantalla ya se entiende qué vendes**: el muñeco asoma, una píldora crema explica el ritual y el botón está a un dedo. Quien llega por Instagram con curiosidad, va a escribir.

Dos cosas te van a saltar a la vista. Las **ocho tarjetas del kit son todavía cajas crema vacías**: son los huecos exactos de tus fotos, y mientras no estén la página se siente a medio hacer, porque lo que vende es tu producto. Y en esas ocho tarjetas el bucle naranja quedó **por fuera del papel, sobre el verde**, más «espiral de cuaderno» que el lápiz de tu boceto; en el resto de la página está bien y hay que igualarlo.

En computadora hay que arreglar una cosa antes de publicar: el botón «Preguntar por el kit» quedó **en medio de las ocho nubes** y parece que arriba hay cuatro cosas y abajo otras cuatro. Y siguen en tus manos tres decisiones, ninguna culpa del equipo: **el precio**, **si el alcohol puede viajar** y **hasta qué día tomas pedidos** (la frase «Pedidos de diciembre: te confirmo la fecha por WhatsApp» cubre la tercera; si te compromete, se quita).

---

## 1. Recorrido simulado — 375 px, desde Instagram, en 90 segundos

**Alturas reales medidas en el DOM a 375 px** (`scrollHeight` total = **8.861 px** = **13,3 pantallas** de 667 px; EN 8.768 · FR 8.997, sin desbordes horizontales en los tres idiomas):

| # | Bloque | Alto real (px) | Pantallas | Dónde está el botón | Tiempo estimado |
|---|---|---|---|---|---|
| 0 | Navbar (fijo) | 56 | — | píldora «Comprar» a la derecha, siempre visible (y=6) | 0–2 s |
| 1 | Hero | 779 | 1,17 | CTA terracota a ancho completo en y=260 | 2–9 s |
| 2 | La tradición | 596 | 0,89 | ninguno (bloque de lectura) | 9–29 s |
| 3 | Qué trae el kit | **4.130** | **6,19** | «Preguntar por el kit» en y=3.385 y otra vez en y=5.459 | 29–65 s |
| 4 | Cómo funciona | 1.080 | 1,62 | «Escribir a Victoria» en y=6.539 | 65–76 s |
| 5 | Comprar | 560 | 0,84 | CTA terracota en y=6.855 | 76–86 s |
| 6 | Victoria + Mail Club | 1.266 | 1,90 | «lista de espera» y «DM» en y=8.252 / 8.308 | 86–96 s |
| 7 | Cierre | 394 | 0,59 | WhatsApp 514-296-8295 en y=8.590 | 96–99 s |

**El dato incómodo:** el botón principal de compra está a **6.855 px del inicio, 10,3 pantallas abajo**. A 90 segundos se llega, pero no sobra nada. En escritorio la página baja a 5.421 px y en tablet a 6.454 px: el problema de longitud es exclusivamente móvil.

### Bloque 0 — Navbar (0–2 s)
«vichisboh*» en píldora crema, `ES EN FR` en una segunda píldora y «Comprar» en una tercera con **doble contorno de garabato**. Entra en **una sola fila** y los tres controles miden 44 px de alto. Probado a 320 / 360 / 375 / 390 / 414 px: **no se rompe en ninguno** (a 320 px quedan 6 px entre el selector y el CTA; el documento desborda 1 px, irrelevante porque el mínimo exigido es 375).
Qué siento: que «Comprar» es una puerta y no el botón protagonista — pesa menos que el CTA naranja del hero porque es crema y su letra es de 13 px. ✔
**⚠ Lo único flojo:** el CTA del navbar dice solo «Comprar» a 13 px; a 375 se lee, pero es el elemento más pequeño de la barra y quien tiene poca vista lo va a confundir con una etiqueta.

### Bloque 1 — Hero (2–9 s)
Medido en el primer viewport de 667 px: H1 «Vichito, el año viejo» de 88 a 122, «Hibérnate» en cursiva de 126 a 150, **píldora crema de 335 × 73 px con la frase que lo explica todo** de 170 a 243, **CTA naranja de 335 × 52** de 260 a 312, y la foto **empieza en 367 con 300 px visibles**.
Entiendo qué es en la primera pantalla sin bajar el dedo. La foto asoma un tercio de pantalla: engancha. La píldora es crema con letra chocolate (11,35:1, AA y AAA) y su contorno de garabato terracota es más fino que el de las píldoras de la barra, así que no se confunde con navegación.
**✔ Cumple C2 y la primera mitad de C6.**
**⚠ Dos detalles:** (a) la estrella mostaza se monta sobre la última letra de «Hibérnate» a partir de 768 px; (b) el wordmark «vichisboh*» queda centrado a la página y en escritorio cae bajo el borde izquierdo de la foto: se lee como suelto.
**¿Tocaría WhatsApp aquí?** Sí, si ya vine decidida. Si no, sigo bajando — que es lo correcto.

### Bloque 2 — La tradición (9–29 s)
Crema, papel con trama de puntos, título con subrayado a mano y una nube de bucles con tu párrafo. Lo leo entero, dos veces. Es el mejor bloque de la página y el que hace que alguien que no sabe qué es un Año Viejo lo entienda.
**✔ Sin peros.** Contrastes correctos, aire correcto, 596 px (menos de una pantalla).

### Bloque 3 — Qué trae el kit (29–65 s) ⚠ **el bloque que hay que mirar**
Ocho nubes, una por fila, cada una con una foto cuadrada de 253 px, un título y una línea. A 375 px **cada tarjeta mide ~430 px**: son **seis pantallas y un quinto** para un inventario de ocho cosas. La mitad del recorrido del visitante está aquí.
- **Encuentro la puerta donde nace la duda**: a la cuarta tarjeta aparece «Preguntar por el kit» (y=3.385, 5,1 pantallas). Es una píldora de contorno, más callada que la barra. La tocaría: en ese punto tengo la duda del tamaño de la maleta y de si el alcohol viene dentro. ✔
- **⚠ Lo que me frena:** las ocho cajas están vacías. Ocho rectángulos crema idénticos con la etiqueta «Foto real: 1/1» en el centro. Es honesto y es el estado real (no hay fotos), pero **es aquí donde una visitante curiosa se va**, no en el texto.
- **⚠ Lo artesanal:** el bucle naranja de estas ocho tarjetas está dibujado **sobre el verde, por fuera del papel** (medido: el marco mide 335 px de ancho y el papel crema empieza 27 px más adentro). En el hero y en los pasos el bucle cae sobre el papel crema. Dos técnicas distintas para el mismo dibujo (hallazgo **M3**).
- **⚠ El ritmo del bucle** cambia según la proporción de la tarjeta: a 1024 px los bucles de arriba y abajo son visiblemente más grandes que los de los lados. Se nota el patrón generado.
- La nota de empaque («Caja kraft con ventana + papel picado rojo») está en una nube con confeti: ✔ se entiende como parte del kit, no como sección nueva.

### Bloque 4 — Cómo funciona (65–76 s)
Tres tarjetas numeradas con el número en un círculo mostaza: Escribe / Arma / Quema. Recuperan «con el lapicero, en tus tarjetas», «con el alcohol» y «en la billetera». **Ya sé qué hacer con el alcohol y con el billete**, que era mi duda.
**✔** Ninguna tarjeta se queda corta de alto y el botón «Escribir a Victoria» cierra el bloque sin gritar.
**⚠** La tarjeta 3 es la más larga y su última frase encadena dos instrucciones; se lee, es texto del encargo, no se toca.

### Bloque 5 — Comprar (76–86 s)
Rayas petróleo/crema, marco de bucles en todo el perímetro, **panel crema sólido encima**: ninguna letra cruza una franja. Píldora «Diciembre 2026», «Pide tu kit», «Me escribes y te contesto yo.», el botón naranja de 287 × 58, **«Pedidos de diciembre: te confirmo la fecha por WhatsApp.»** (15 px, chocolate, en medio de las dos cosas), la línea de envíos en tres líneas y el teléfono escrito con letra: «WhatsApp 514-296-8295 · DM @vichisboho».
Orden medido: CTA en 6.855 → nota de diciembre en 6.933 → envíos en 6.995. **✔ C5 cumplida literalmente.**
**La ausencia de precio no me parece un misterio**: leo «Pide tu kit», leo «te contesto yo», leo el teléfono, y entiendo que la conversación es el canal. La línea de envíos con los tres importes y la nota de diciembre hacen el trabajo.
**⚠** Sigue sin haber **precio**, y eso me obliga a escribir antes de saber si puedo pagarlo. No me bloquea; a otra sí.

### Bloque 6 — Victoria + Mail Club (86–96 s)
Foto de taller (vacía hoy), «Hola, soy Victoria», tus dos líneas en una tarjeta con sombra dura, y la nube del club con la píldora **«Enero 2027»** en rojo maleta y dos botones de lista de espera. Como arriba leí «Diciembre 2026», **la línea de tiempo se entiende sola**: ahora kits, en enero otra cosa. Los botones dicen «Entrar a la lista de espera» y «Escribir por DM», y el `aria-label` aclara «no es una compra». ✔
**⚠** Los dos botones son crema con contorno terracota; a 375 quedan uno debajo del otro ocupando casi todo el ancho del panel. Funciona, pero son dos puertas iguales para lo mismo (WhatsApp / DM).

### Bloque 7 — Cierre (96–99 s)
Rayas, marco de bucles, panel crema con el wordmark grande, WhatsApp con subrayado, @vichisboho, la línea de envíos literal y «Hecho a mano en Montreal» en garamond cursiva. Cierro tranquila: **cero letras sobre las rayas**. ✔

**Veredicto de visitante (90 s):** llego al botón del kit a los ~35 s y **lo tocaría**. Si fuera una curiosa sin intención de comprar, me iría en la cuarta caja vacía, hacia el segundo 40. La página **sí es demasiado larga a 375 px**, no por el texto (el texto es corto) sino por la altura de las ocho tarjetas con foto cuadrada.

---

## 2. Comparación con el boceto (`IMG_0314.png`)

| Elemento del boceto | Cómo quedó en la página | ✔ / ⚠ |
|---|---|---|
| Bloque verde con **marco de bucles naranjas** rodeando la tarjeta protagonista | Existe y está en el hero; el componente de marco es único y reutilizable (61 de 64 `path` con `vector-effect="non-scaling-stroke"`) | ✔ |
| El marco encierra **título + «Hibérnate» + foto + «vichisboho»** en una sola tarjeta | El marco encierra **solo la foto**; el título y el eslogan van sobre el petróleo y el wordmark debajo, fuera | ⚠ (se lee bien, pero no es el boceto) |
| Título dentro del marco, en crema | Título sobre petróleo en Baloo 800 crema, 2 líneas a 1280 / 1 línea a 375 | ✔ (jerarquía correcta) |
| «Hibérnate» en cursiva con subrayado a mano | EB Garamond itálica + subrayado de garabato terracota + estrella mostaza | ✔ |
| Píldora crema alargada bajo el hero («explicación tradición») | Sección crema completa con nube de bucles y el párrafo dentro | ✔ |
| **Nubes orgánicas crema con borde de lápiz** = fotos de producto | Ocho tarjetas: rectángulo redondeado (radio 26) con **el bucle por fuera del papel, sobre el verde** | ⚠ **M3** |
| Bloque rayado inferior con marco de bucles (backing card del separador) | Comprar y Cierre: rayas verticales petróleo/crema, marco de bucles perimetral, **panel crema sólido** con la letra dentro | ✔ |
| Barra naranja gruesa = «dice compra» | CTA terracota 287 × 58 con keyline chocolate + halo crema | ✔ |
| Rayas horizontales crema/naranja dentro del bloque rayado | Traducidas a píldoras y tarjetas crema sobre el rayado | ✔ |
| Píldora final «inscríbete al mail club 2027 ya casi comienza» | Nube crema con borde de bucles, píldora «Enero 2027», dos botones de lista de espera | ✔ |
| «vichisboho» al pie del bloque verde | Wordmark en el hero (crema) y grande en el cierre (chocolate sobre crema) | ✔ |
| Doodles sueltos: estrellas, espirales, subrayados, rayitas | 47 SVG decorativos, **todos** `aria-hidden="true"`; estrellas, espirales, subrayados y papel picado | ✔ |
| Mano de lápiz: nada de degradados modernos ni sombras difusas | Cero degradados de color (los únicos `gradient` son la trama de puntos al 4 %); sombras **duras** de 2–6 px sin desenfoque; cero glassmorphism; cero iconos de librería | ✔ |
| Paleta de siete colores | Exacta: petróleo `#1B7A63`, terracota `#F04E0C`, crema `#F4E2CD`, chocolate `#3B2517`, rojo maleta, mostaza, oliva. Sin rosa, sin oliva ajeno, sin negro puro | ✔ |

**Juicio de identidad (siendo dura, como pide el encargo):** la página **no parece una plantilla**. Los marcos, la trama de papel, los subrayados, la tipografía redondeada y las sombras duras construyen un objeto dibujado. Lo que **sí** delata el código es la repetición: el bucle es idéntico, con paso constante, y en las ocho tarjetas del kit quedó del lado equivocado del papel. En el boceto los bucles son irregulares y van **sobre** el crema. Ese es el único punto donde la clienta artesana diría «esto lo hizo una máquina».

---

## 3. Checklist de validación

| Criterio | Estado | Comentario / evidencia |
|---|---|---|
| **Identidad artesanal (boceto, hecho a mano)** | ⚠ | Marcos, nubes, rayas, doodles, tres tipografías, papel con trama y sombras duras: sí. Pero los bucles de las 8 tarjetas del kit caen sobre el verde y no sobre el papel (**M3**), y su paso es uniforme. |
| **Copy de Victoria intacto (ES)** | ✔ | Verificación mecánica contra `_contexto-encargo.md`: **11/11 textos oficiales idénticos** (título, eslogan, subtítulo, tradición, Victoria ×2, Mail Club, línea de envíos ×2 apariciones) y **16/16 textos del kit** (8 títulos + 8 líneas), incluido el ítem 4 sin punto final. Pasos 3/3 con «en tus tarjetas», «con el alcohol» y «en la billetera». |
| **Claridad del producto en 5 s** | ✔ | Primer viewport: H1 + «Hibérnate» + píldora explicativa + CTA completos y 300 px de foto visibles. |
| **Precio pendiente: ¿incompleta o deliberada?** | ⚠ | Cero cifras de kit en el DOM (solo `5 $`, `8,95 $`, `60 $` de envío). `kitPrice: null` → `PriceSlot` en estado `hidden` **sin hueco fantasma**. Se lee deliberado; sigue siendo la objeción nº 1 y la decisión es de Victoria (D1). |
| **Envíos: 4 datos, 3 importes, literal** | ✔ | «Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $» idéntica en Comprar y en el cierre, en 3 líneas, 15 px. |
| **Canal WhatsApp/DM, cero formularios** | ✔ | **0** `<form>`, `<input>`, `<textarea>`, `<select>`. 11 enlaces: 9 a `https://wa.me/15142968295?text=…` y 2 a `instagram.com/vichisboho`; todos con `rel="noopener noreferrer"` y `target="_blank"`. Cero pop-ups, cero email, cero terceros. |
| **Trilingüismo real ES/EN/FR, en vivo** | ✔ | Pulsado `ES|EN|FR` en el navegador: cambian **85 nodos de texto, 24 `aria-label` y los 8 mensajes prellenados de WhatsApp**; `aria-pressed` correcto; `<html lang>` pasa a `en` / `fr`; volver a ES restaura sin residuos. Francés de Quebec («Allo, c'est Victoria», «C'est quoi, l'Año Viejo ?», «Ramassage gratuit à Montréal», tuteo, espacios duros antes de `: ? !`). «Vichito» y «Año Viejo» intactos y el H1 con elisión («Vichito, l'Año Viejo»). Brevedad mantenida (EN y FR nunca más largos que el ES en los ítems). |
| **Móvil 375 px** | ✔ | 0 desbordes horizontales en ES/EN/FR (`scrollWidth = 375`). Navbar en una fila también a 320/360/390/414. Todos los objetivos táctiles ≥ 44 px (único elemento menor: el enlace «saltar» en 1×1, que es `sr-only` hasta recibir foco). |
| **Mail Club = lista de espera de enero 2027** | ✔ | Píldora «Enero 2027» frente a «Diciembre 2026»; botones «Entrar a la lista de espera» / «Escribir por DM»; `aria-label`: «…no es una compra». Ningún formulario. |
| **Cero invenciones comerciales** | ✔ | Sin precio de kit, sin plazos de entrega, sin testimonios, sin stock («Disponible» desactivado por configuración), sin descuentos, sin contadores. La única frase nueva en primera persona de Victoria es `buy.deliveryNote`, aprobada en D3 (no promete día ni transportista). |
| **C1 · Keyline + halo del CTA** | ✔ | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px, rgb(59,37,23) 0 3px 0 2px` en `.btn-primary` → keyline chocolate 2 px + halo crema 2–3 px, inspeccionables. `--btn-ink: #f4e2cd` existe con valor por defecto crema. La deuda 2,86:1 sigue **declarada** (no es fallo mientras el keyline y el halo sean reales). |
| **C2 · Subtítulo del hero en píldora** | ✔ | Nodo real: `<p>` chocolate `#3B2517` 17 px dentro de contenedor crema `#F4E2CD`, radio 999, 335 × 73 px, 2 líneas (3 máx.). Contraste medido 11,35:1. Ningún `<p>` crema suelto sobre petróleo. |
| **C3 · Ninguna letra sobre las rayas** | ✔ | Barrido de contraste de **todos** los nodos de texto: en bloques 5 y 7 el fondo efectivo resuelto es crema opaco en el 100 % de los casos. Capturas a 375 / 768 / 1280 (`qa2-comprar-375.png`, `qa2-comprar-1280.png`, `qa2-full-1280-es.png`). |
| **C4 · Navbar secundario y en una fila** | ✔ | Alto 56 px, logo + `ES EN FR` (132 px) + CTA (74 px) en una fila de 375 (y también a 320, 360, 390, 414). El CTA **nunca** se rellena de terracota en ningún punto del scroll: crema con contorno de garabato y texto chocolate 11,35:1. |
| **C5 · Línea de diciembre donde nace la duda** | ✔ | `buy.deliveryNote` en 15 px, chocolate, peso 600, **entre el CTA (6.855) y los envíos (6.995)**, dentro del panel crema, sin scroll interno; ocultable con `content.showDeliveryNote`. |
| **C6 · Primer viewport y orden de tabulación** | ✘ | (a) ✔ H1 + eslogan + píldora + CTA completos y **300 px** de foto visibles a 375 × 667. (b) ✔ Orden del DOM = orden visual: los 15 focos van 6 → 260 → 3.385 → 5.459 → 6.539 → 6.855 → 8.590, ascendente y sin saltos. (c) ✘ **El CTA intermedio del bloque 3 parte el inventario 4×2 a ≥ 1024 px** (ver **M1**). |
| **Accesibilidad vivida (Tab y lector)** | ✔ | Recorrido real con teclado: `:focus-visible` en los 15 controles con anillo mostaza 3 px + separación (y anillo chocolate sobre crema). El enlace «Saltar al contenido» aparece como píldora crema al primer Tab y apunta a `#contenido`. Un `h1`, cinco `h2` (uno por sección, todas con `aria-labelledby`), `h3` en ítems y pasos, `nav`/`main`/`footer` con nombre. Las 10 fotos son `role="img"` con `aria-label` descriptivo y el texto del marcador no se duplica en el lector. |
| **Se entiende con las imágenes apagadas** | ✔ | Es el estado real de hoy: no hay ni un `<img>` en la página. Todo el contenido es texto; los huecos están rotulados. La página es legible y completa conceptualmente sin una sola foto. |
| **Metadatos (pestaña y enlace compartido)** | ⚠ | `<title>`, `meta description`, `og:title`, `og:description`, `og:type`, `og:locale`, `og:site_name`, `twitter:card` y `<noscript>` con envíos + WhatsApp: **existen** (cierra N8). Faltan `og:image` (necesita una foto real) y que el título se traduzca al cambiar de idioma (**m1**). |
| **Sin estética SaaS, paleta y cero dependencias extra** | ✔ | Sin degradados de color, sin sombras difusas, sin bordes rectos genéricos, sin iconos de librería. Tres fuentes cargadas de verdad (Baloo 2 700/800, Nunito 400/600, EB Garamond 400 italic). Solo React + Vite + Tailwind. `prefers-reduced-motion` presente. |

**Sobre el checklist de 22 ítems de `01-cro.md §9`:** los 22 son verificables en el código entregado salvo el **ítem 20 en su lectura estricta de retícula** (es el mismo asunto que C6/c: el panel crema está bien, la partición del inventario no). Los ítems 12 y 17 se leen en su versión recalibrada y se cumplen (etiqueta corta por tarjeta; presupuesto respetado donde no manda texto protegido).

---

## 4. Hallazgos por severidad

**BLOQUEANTES: ninguno.** La página no tiene nada roto: carga, se navega, cambia de idioma, no desborda, no tiene formularios ni promesas falsas.

### MAYORES (3)

**M1 · C6 incumplida: el CTA intermedio parte el inventario en dos a ≥ 1024 px**
`src/components/KitContents.jsx:127-140` (fila 1 en `:127`, CTA en `:134`, fila 2 en `:137`) con la retícula `lg:grid-cols-4` de `:37-39`.
Medido a 1280: fila 1 entre y=1.689 y 2.100, **CTA en y=2.122**, fila 2 desde y=2.200. A 1024 ocurre lo mismo (bloque de 1.488 px). El visitante lee «cuatro cosas del kit, un botón, otras cuatro cosas» — exactamente lo que la condición C6 prohíbe y lo que el QA de Puerta 1 anticipó (N de §3, «en escritorio el inventario se parte en dos»).
**Corrección recomendada (una sola, pequeña):** en `lg:` renderizar un único `grid` con las ocho tarjetas y sacar el CTA del flujo del inventario, en este orden de preferencia: (a) añadir `lg:hidden` al contenedor del CTA 3a → el botón intermedio se oculta a partir de 1024 (donde las ocho caben casi en una pantalla y la duda no necesita puerta intermedia) y se queda solo el 3b del final; (b) mantener el CTA pero como una fila propia que ocupe las cuatro columnas **con título de separación** (para que no parezca que corta la lista); (c) si se quiere conservar en medio, retícula `lg:grid-cols-8` con las ocho en una sola fila (cambia la composición: no recomendado). Verificar a 1024, 1280 y 1440 que las ocho tarjetas se leen como un solo bloque.

**M2 · Longitud a 375 px: 8.861 px (13,3 pantallas) y la compra a 10,3 pantallas**
`src/components/ui/KitCard.jsx:49-60` (foto `ratio="1/1"` + montaje `p-1.5`) y `src/components/KitContents.jsx:37-39` (una columna hasta 768).
El bloque 3 mide **4.130 px** = 46 % de la página. El CTA principal de compra queda en 6.855 px. Llego en 90 s, pero sin margen, y quien no viene decidida abandona en la cuarta caja vacía.
Esto **no es un defecto de código**: es la consecuencia medida de una decisión de diseño aprobada en Puerta 1 (ocho nubes, una por fila, foto que manda). Por eso lo dejo como hallazgo **para que lo decida el cliente/lead**, con opciones de una línea: (a) aceptar (la puerta intermedia de y=3.385 sostiene la conversión); (b) subir la retícula a **2 columnas desde 520 px** → el bloque baja a ~2.150 px y la compra a ~4.900 px; (c) cambiar el ratio de la foto del kit de `1/1` a `4/5` en móvil → ahorra ~85 px por tarjeta (≈680 px). Cualquiera de las tres se hace sin tocar copy ni componentes nuevos.

**M3 · El marco de las ocho tarjetas del kit se dibuja fuera del papel (desviación artesanal)**
`src/components/ui/KitCard.jsx:42-45` (`pad="p-2 sm:p-2.5"`, `frameLoop={10}`) frente a `src/components/Hero.jsx:59` y al cierre (`SiteFooter.jsx`), donde el crema llega hasta el marco.
Medido a 375: el marco mide 335 px de ancho y **el papel crema empieza 27 px adentro**; a 1280, 281 px de marco y 235 de papel. Resultado: en las ocho tarjetas el bucle naranja queda **sobre el verde** (lectura «espiral de cuaderno»), mientras en el hero, la tradición, los pasos y el cierre cae **sobre el crema** (lectura «trazo a lápiz en el papel», que es la del boceto). En el mismo componente, dos oficios distintos.
**Corrección recomendada:** que el relleno crema ocupe también el anillo del marco en `KitCard` (como en el hero): pintar el contenedor exterior del `CloudBlob` con `bg-crema` y el mismo radio, de modo que los bucles caigan sobre papel. Verificar a 375 / 768 / 1024 / 1280 que las ocho tarjetas usan la misma técnica que el hero. *(Nota menor del mismo hallazgo: el paso del bucle es constante, así que en tarjetas estrechas los bucles de arriba/abajo salen más grandes que los de los lados — a 1024 se nota.)*

### MENORES (4)

| # | Archivo:línea | Hallazgo | Corrección |
|---|---|---|---|
| **m1** | `index.html:10-22` (y ausencia de `meta.*` en `src/i18n/translations.js`) | **El título de la pestaña y los `og:*` no cambian de idioma**: pasando a EN o FR el `<title>` sigue en español («Vichito, el año viejo — Kit Ritual Año Viejo 2026 · vichisboh*») y `og:locale` sigue `es_CA`. El enlace compartido desde la versión francesa sale en español. | Tres claves `meta.title` (o un `document.title` en el efecto de idioma) y `og:locale` alterno. Es la D12 que quedó abierta; hoy el valor por defecto (D-R2-5) es solo ES, así que no es incumplimiento, sí mejora. |
| **m2** | `src/components/Navbar.jsx:33-34` | El `nav` se anuncia con `aria-label="vichisboh*"`: un lector de pantalla dice «navegación, vichisboh*», que no informa de qué se navega. | `aria-label` = «Navegación principal» / «Main navigation» / «Navigation principale» (110.ª cadena; requiere el visto bueno de Victoria). |
| **m3** | `src/components/Hero.jsx:43` | De 768 px en adelante la **estrella mostaza se monta sobre la última letra de «Hibérnate»** y el subrayado casi toca el rasgo descendente. A 375 está limpio. | Bajar el doodle ~6 px o anclarlo con `top` fijo en `md:` y subir el subrayado 2 px. |
| **m4** | `index.html` (viewport 320) | A **320 px** (por debajo del mínimo exigido de 375) el documento desborda **1 px** (`scrollWidth` 321). A 360-414 no ocurre. | Opcional: 4 px menos de `gap` en el navbar bajo `360px`. Sin impacto en el público real. |

**Nota de contraste (no es hallazgo, es deuda declarada):** barrido de **todos** los nodos de texto en los tres idiomas → **3 avisos**: el CTA crema sobre terracota (2,86:1, deuda de marca aceptada en `01-cro.md §8.2`, mitigada con keyline + halo reales) en sus dos apariciones, y el enlace «Saltar al contenido» en su estado oculto (invisible; al recibir foco pasa a crema con texto chocolate 11,35:1). **Cero fallos de contraste en el resto de la página.** Si Victoria elige `--btn-ink: chocolate` (D-CTA), la deuda desaparece.

---

## 5. Lo que ya está listo para producción (no tocar) y lo que falta para publicar

### Listo — no se toca
1. **Los textos de Victoria**: 11 cadenas oficiales + 16 del kit, verificadas carácter a carácter en el DOM.
2. **La arquitectura de 8 bloques** y el orden del encargo, con las seis secciones visibles en el orden correcto.
3. **El sistema trilingüe**: 85 nodos, 24 `aria-label` y 8 prellenados de WhatsApp cambian en caliente; ES por defecto; `lang` correcto; francés de Quebec.
4. **El canal único**: 9 enlaces de WhatsApp con mensaje prellenado por sección + 2 de Instagram; cero formularios, cero pop-ups, cero email.
5. **Los marcos, nubes, rayas, doodles y la paleta** (siete colores exactos, cero degradados, sombras duras, trama de papel).
6. **C1, C2, C3, C4 y C5**: verificadas en el DOM y en captura a 375 / 768 / 1280.
7. **El precio pendiente**: `PriceSlot` en `hidden`, sin hueco, activable por configuración.
8. **La accesibilidad base**: foco visible en los 15 controles, orden de tabulación = orden visual, jerarquía de encabezados, `alt` honestos, página comprensible sin imágenes.
9. **Los metadatos de la pestaña y del enlace** (`<title>`, `description`, `og:*`, `<noscript>` con envíos y WhatsApp).

### Falta para publicar — **de Victoria**
| Qué | Por qué bloquea | Consecuencia si no llega |
|---|---|---|
| **Las fotos reales** (10 posiciones: hero 4/5, 8 del kit 1/1, retrato de taller 4/5) y la revisión de los 10 `alt` | La página vive de la foto; hoy son diez cajas crema rotuladas «Foto real» | Es lo que impide publicar de verdad. Sin fotos, la página se ve a medio hacer |
| **Una foto para `og:image`** | Hoy el enlace compartido por Instagram no lleva imagen | El enlace se ve pobre al compartirlo |
| **El precio del kit** (o la decisión de no ponerlo) | Objeción nº 1 | Publicable sin él, pero cuesta conversión |
| **¿El alcohol viaja a otra provincia?** | Hoy se ofrece «Resto de Canadá 8,95 $» a un kit que lleva un líquido inflamable | Único punto donde la página podría prometer de más |
| **La fecha límite de pedidos** (y ratificar la frase de diciembre) | Es la respuesta a «¿me llega antes del 31?» | Si se retira la frase, el bloque vuelve al silencio |
| **El punto de recogida en Montreal** | Quien elige «recogida gratis» necesita saber dónde | Fricción en la conversación |
| **Ratificar el francés y `--btn-ink`** (D7 y D-CTA) | Definiciones de marca | Sin impacto técnico |

### Falta para publicar — **del código** (3 arreglos, ninguno toca copy)
| Qué | Dónde | Tamaño |
|---|---|---|
| **M1** · No partir el inventario 4×2 en escritorio (C6) | `KitContents.jsx:127-140` | 1 retícula o 1 clase |
| **M3** · Que los bucles del kit caigan sobre el papel crema, como en el hero | `KitCard.jsx:42-45` | 1 clase de fondo + radio |
| **m1 / m2 / m3** · Título por idioma, `nav` con nombre útil, estrella del hero en `md:` | `index.html:10-22`, `Navbar.jsx:33-34`, `Hero.jsx:43` | 3 detalles |

**M2 (longitud) es una decisión, no un arreglo:** aceptarla o aplicar una de las tres opciones medidas en §4.

---

## 6. Veredicto final

**CAMBIOS REQUERIDOS — pequeños, concretos y todos de una línea.** La página es la de Victoria: su voz está intacta, el producto se entiende en el primer scroll, el canal es el suyo (WhatsApp e Instagram, sin formularios), habla tres idiomas de verdad y no promete nada que no pueda cumplir. Cinco de las seis condiciones del acta se cumplen en el código real; **C6 falla en la tercera cláusula** (el botón intermedio parte el inventario en la retícula de cuatro columnas) y hay una desviación artesanal que la clienta notaría (los bucles del kit sobre el verde en vez de sobre el papel).

Con **M1** y **M3** corregidos, y con las fotos, el precio y la respuesta sobre el alcohol en manos de Victoria, **esta página se publica**. No hay que reescribir ni un documento ni una frase.

**Firma:** Revisor Final QA — Puerta 2 · **16 de noviembre de 2026** · Montreal
*Auditoría hecha sobre el build servido en `http://localhost:4400/`, con capturas propias a 375 / 768 / 1024 / 1280 px en ES/EN/FR, medición del DOM y recorrido real con teclado. Evidencias: `docs/evidencias/qa2-full-375-es.png`, `qa2-full-375-fr.png`, `qa2-full-768-es.png`, `qa2-full-1280-es.png`, `qa2-kit-1280-cta-intermedio.png`, `qa2-kit-1024-cta-intermedio.png`, `qa2-kit-card-375-zoom.png`, `qa2-hero-marco-zoom.png`, `qa2-comprar-375.png`, `qa2-comprar-1280.png`, `qa2-victoria-mailclub-375.png`, `qa2-foco-skip.png`, `qa2-foco-cta-hero.png`.*
