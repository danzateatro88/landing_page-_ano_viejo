# Arquitectura de conversión (CRO) — `vichisboh*` · « Vichito, el año viejo »

**Kit Ritual Año Viejo 2026** · Landing page trilingüe ES/EN/FR · Hecho a mano en Montreal
Documento de Fase 2 (Arquitecto CRO). Fuente de verdad: `docs/_contexto-encargo.md` y `docs/00-brief.md`.
No contiene código ni copy final: contiene estructura, jerarquía, CTAs, componentes, retícula y criterios verificables.

> **Versión: v2 — correcciones de Puerta 1 aplicadas.** Esta versión incorpora las 7 incidencias MAYORES de `docs/puerta1-tech.md` y los hallazgos M2, m7, m8, m10 y m13 de `docs/puerta1-qa.md`, más la recalibración del checklist de §9 y el mapa de archivos de §5.2. Registro completo al final del documento (§11). Nada de lo que las auditorías declararon apto (§6 del QA) se ha tocado: los 8 bloques, sus textos de CTA, la paleta, las 3 tipografías y los presupuestos de copy siguen intactos.

**Tesis de conversión en una línea:** no vendemos con un botón de pago sino abriendo una conversación ya escrita; la página repite esa única puerta **ocho veces** (ocho claves de prellenado, nueve apariciones del botón en pantalla), **siempre en el idioma activo** y **siempre con un mensaje prellenado distinto según la sección**, de modo que Victoria sepa qué bloque vendió sin instalar analítica.

---

## 1. Estrategia de conversión

### 1.1 La página como ritual en seis tiempos

El producto es un ritual de cierre de año; la página imita su estructura emocional. Cada bloque cumple una función AIDA concreta y no se puede intercambiar con otro sin romper la secuencia.

| Tiempo | Bloque | Función AIDA | Estado emocional buscado | Salida del bloque |
|---|---|---|---|---|
| — | 0 · Navbar | Puerta permanente | «Estoy en un taller, no en una tienda» | CTA rápido + idioma a un toque |
| 1 | 1 · Hero | **Atención** | Curiosidad cálida | Clic a WhatsApp o scroll a la tradición |
| 2 | 2 · La tradición | **Interés** | Reconocimiento o descubrimiento | Scroll al inventario |
| 3 | 3 · Qué trae el kit | **Deseo (valor)** | Confianza y abundancia ordenada | Scroll a los pasos |
| 4 | 4 · Cómo funciona | **Deseo (capacidad)** | «Esto lo puedo hacer» | Clic temprano a WhatsApp |
| 5 | 5 · Comprar | **Acción** | Urgencia tranquila, cero presión | Clic a WhatsApp (métrica principal) |
| 6 | 6 · Victoria + Mail Club | Pertenencia y **siembra** | Cercanía + segunda oportunidad | Lista de espera 2027 (no compra) |
| 7 | 7 · Cierre | Remate operativo | Calma, «esto está bien hecho» | Contacto y envíos recordados |

**Regla estructural:** seis secciones oficiales + navbar + cierre. **No se añaden secciones** (ni testimonios, ni FAQ, ni «sobre el envío», ni banner de cookies con CTA): el orden del encargo es el orden de la página y la auditoría de Puerta 2 rechaza cualquier bloque nuevo.

### 1.2 La micro-conversión única y su repetición estratégica

Una sola conversión: **abrir WhatsApp con mensaje prellenado** (`https://wa.me/15142968295`). Segunda micro-conversión, de menor peso: **abrir el DM de `@vichisboho`**. Nunca hay formulario, pop-up, chat-bot, ManyChat ni carrito.

La página aplica el principio **«cada sección puede terminar en el mismo toque»**: **ocho puntos de contacto** —uno por cada clave de prellenado que entrega `02-copys.md §6.2`—, cada uno con prellenado distinto (marcador de sección + idioma activo), sin obligar a volver arriba.

| # | Punto de toque | Sección | Prellenado (clave canónica) | Intención declarada |
|---|---|---|---|---|
| 1 | Navbar | Persistente | `wa.nav` | Intención inmediata, sin leer |
| 2 | Hero | 1 | `wa.hero` | Compra decidida desde el reconocimiento |
| 3 | Kit | 3 | `wa.kit` | Duda sobre el contenido, no sobre el precio |
| 4 | Pasos | 4 | `wa.steps` | «¿Puedo hacerlo yo?» |
| 5 | Comprar | 5 | `wa.buy` | Decisión madura (métrica principal) |
| 6 | Victoria | 6 | `wa.victoria` | Contacto humano, sin intención de compra |
| 7 | Mail Club | 6 | `wa.mailclub` | Llegó tarde / no compra hoy |
| 8 | Cierre | 7 | `wa.footer` | Recordó el contacto al final |

**Aritmética corregida (v2):** **8 claves de prellenado = 8 puntos de contacto**, más **9 apariciones reales del botón** en pantalla, porque el CTA secundario del bloque 3 aparece **dos veces** (tras la cuarta nube y al final del bloque, ver §4.1 filas 3a y 3b): reutiliza `wa.kit`, no crea clave nueva. La versión v1 decía «siete» y omitía el punto de contacto de Victoria, que el copy sí entrega.

**Jerarquía de pesos:** solo hay **un CTA primario por pantalla visible** (relleno terracota). Los demás son secundarios (contorno o píldora crema) o terciarios (enlace con subrayado dibujado). Dos botones rellenos en el mismo viewport se anulan entre sí.

**Corolario obligatorio (v2, resuelve MAYOR-07/m8):** el CTA del navbar es **sticky y convive con todos los bloques**, así que **nunca puede ser relleno terracota**: se especifica como **secundario** (píldora crema, texto chocolate, contorno de garabato terracota, 11,35:1, sin deuda de contraste) durante todo el scroll, incluido el hero. Un único relleno terracota por viewport: el del hero (bloque 1) o el de Comprar (bloque 5). El navbar no compite con ninguno de los dos.

### 1.3 Mapa de objeciones: qué neutraliza cada bloque y en qué orden

| Bloque | Objeción del brief | Cómo la neutraliza (sin texto extra) |
|---|---|---|
| 1 · Hero | «¿Qué es esto?» | Foto real del Vichito con el cartel «¡CHAO AÑO VIEJO!» dentro de marco de garabato: se entiende antes de leer |
| 2 · Tradición | «¿Es fiel a la tradición o decorativo?» | Voz de Victoria en primera persona + foto del muñeco armado con ropa vieja |
| 3 · Kit | «¿Me faltará algo?» | Ocho nubes con ocho fotos: el inventario *es* el argumento de valor |
| 4 · Pasos | «No saber hacerlo» / «¿es seguro?» | Tres pasos ultracortos; el paso 3 queda en clave simbólica, sin instrucciones técnicas de fuego |
| 5 · Comprar | «¿Por qué no veo el precio?» / «¿cuánto tarda?» | Línea de envíos exacta + disponibilidad de temporada + CTA en el lugar del número |
| 6 · Victoria | «¿Quién está detrás?» | Retrato de taller + Mail Club como puerta honesta si no compra |
| 7 · Cierre | «¿Cómo los contacto?» | WhatsApp visible, `@vichisboho`, línea de envíos y año |

**Orden de objeciones elegido a propósito:** identidad → legitimidad → completitud → capacidad → transacción → autoría. Se resuelve «qué es» antes de «cuánto», y «quién lo hace» **después** de la decisión y **antes** del cierre, que es justo donde aparece la duda de confianza.

### 1.4 Por qué el orden actual no se mueve

1. **El hero no puede empezar por el precio:** el precio está pendiente por configuración; cualquier bloque que lo lidere nace mutilado.
2. **La tradición va segunda y en crema:** es el respiro tras un hero oscuro (contraste de valor, no de color) y el único párrafo largo autorizado. Subirla antes del producto retrasa el reconocimiento del segmento A.
3. **El inventario antes de los pasos:** sin inventario, el paso 1 («escribe con el lapicero») no tiene referente; el kit completo justifica que el ritual sea posible en casa.
4. **Los pasos antes de comprar:** el miedo a «no saber hacerlo» es la última fricción cognitiva; se cierra justo antes del botón.
5. **Victoria después de Comprar:** quien ya decidió ve el toque humano como confirmación; quien no decidió encuentra aquí la alternativa (Mail Club 2027) y el motivo para escribir igual.
6. **El cierre no vende:** solo remata contacto, envíos y marca. Un segundo bloque comercial al final diluye el CTA protagonista del bloque 5.

**Descartado explícitamente:** testimonios y prueba social (no existen), contadores de stock o cuenta atrás (prohibido inventar urgencia), pop-up de descuento, chat flotante, banner de envío gratis fijo, cualquier sección «FAQ» que reemplace la conversación. Tampoco se duplica el bloque Comprar: el cierre repite datos, no el botón gigante.

### 1.5 Reglas de conversión no negociables (para todas las fases)

- Sin formularios, sin pop-ups, sin bots, sin captura de email: **el Mail Club también se pide por WhatsApp/DM**.
- Sin cifras de precio del kit. Únicos importes: los cuatro de envío, en una sola línea literal.
- Sin fotos de stock ni generadas: contenedores con proporción fija y etiqueta de placeholder.
- El idioma cambia **textos, `aria-label` y prellenado de WhatsApp** a la vez; ES por defecto.
- La foto manda: si un bloque se ve cargado, se recorta texto, **nunca** el tamaño de la imagen.

---

## 2. Mapa de bloques numerados

### 2.0 Vista general

| Bloque | Nombre | Fondo / paleta dominante | Protagonista visual | Ritmo vertical (desktop) |
|---|---|---|---|---|
| 0 | Navbar | Petróleo `#1B7A63` + píldora crema | Wordmark `vichisboh*` + selector de idioma | 64 px fijo, sticky |
| 1 | Hero | Petróleo `#1B7A63` | Foto real del Vichito + cartel, en marco terracota | 112 px arriba / 96 px abajo |
| 2 | La tradición | Crema `#F4E2CD` | Foto del Vichito armado con ropa vieja | 128 px / 128 px |
| 3 | Qué trae el kit | Petróleo `#1B7A63` | Ocho nubes crema con ocho fotos reales | 112 px / 120 px |
| 4 | Cómo funciona | Crema `#F4E2CD` | Tarjetas con doodles numerados (+ foto opcional de manos) | 104 px / 104 px |
| 5 | Comprar | Rayas verticales petróleo/crema + panel crema | Botón terracota protagonista | 120 px / 120 px |
| 6 | Victoria + Mail Club | Petróleo + nube crema | Retrato de taller de Victoria + tarjeta nube | 112 px / 112 px |
| 7 | Cierre | Rayas petróleo/crema (perimetrales) + panel crema | Wordmark + doodles sueltos | 72 px / 64 px |

**Ritmo cromático intencional:** oscuro → claro → oscuro → claro → rayas → oscuro/crema → rayas. Ninguna sección reproduce el fondo de la anterior completa, salvo el cierre respecto de Comprar (misma familia rayada, como firma que se repite).

### 2.1 Bloque 0 · Navbar

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Que WhatsApp esté a un toque en cualquier punto del scroll y que el idioma sea evidente |
| Protagonista visual | Wordmark `vichisboh*` (Baloo 2 Bold, flor-asterisco) sobre píldora crema; selector `ES \| EN \| FR` en píldora crema contigua |
| Fondo y paleta | Petróleo sólido; separación inferior mediante **onda SVG terracota de 2–3 px**, nunca una línea recta de 1 px |
| Composición | 3 zonas: logo (izq.) · selector (centro-derecha) · CTA rápido (der.). Sin menú de secciones |
| CTA rápido (v2) | **Secundario, siempre**: píldora crema `#F4E2CD`, etiqueta chocolate `#3B2517` (11,35:1, sin deuda), contorno de garabato terracota 2,5 px con `vector-effect="non-scaling-stroke"`, alto 44–48 px, Baloo 2 700. **Nunca relleno terracota en ningún punto del scroll** (MAYOR-07): es el único CTA que coexiste con todos los bloques y no puede robarle el protagonismo al del hero ni al de Comprar |
| Ancho y ritmo | Ancho completo, alto 64 px desktop / 56 px móvil; sticky con fondo sólido (sin blur ni sombra difusa: no es SaaS) |
| Presupuesto | ≤ 4 palabras visibles |

### 2.2 Bloque 1 · Hero

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Entender el producto en 5 segundos y tocar «Comprar el kit» (o hacer scroll) |
| Protagonista visual | Foto real del **muñeco Vichito con el cartel «¡CHAO AÑO VIEJO!»** dentro de `SquigglyFrame` terracota; opcional segundo detalle (maletita roja) como sticker pequeño solapado |
| Proporción de foto | `4/5` vertical (retrato) en los tres breakpoints; 375 px: ancho completo del contenedor; 1280 px: máx. 480 px de ancho, columna 7–11 |
| Fondo y paleta | Petróleo `#1B7A63`; texto crema `#F4E2CD` (**solo H1 y eslogan**); acentos terracota `#F04E0C` (marco, doodles, botón); estrellitas mostaza `#E3C93C` |
| Subtítulo (v2, MAYOR-01) | **Dentro de una píldora crema** `#F4E2CD` con texto chocolate `#3B2517` (11,35:1, AA y AAA): la píldora es una nube-píldora con `radius-pill` 999 px y contorno de garabato terracota 2,5 px (`SquigglyFrame` variante `pill`, `aria-hidden`), padding 12 px / 20 px en 375 y 12 px / 24 px en escritorio, ancho `fit-content` en escritorio (alineada al bloque de texto) y `100 %` del ancho menos gutters en ≤ 480 px. Nunito 600 a 17 px (clamp 16–18 px), `line-height` 1,5: **2 líneas en ES/EN y hasta 3 en FR** dentro de la píldora. Así el subtítulo **nunca** queda crema sobre petróleo a 17 px (4,14:1, falla AA) |
| Ancho y ritmo | Contenedor máx. 1200 px; padding superior 112/96 px; en 1280 la foto rompe la retícula hacia el borde derecho (sangrado controlado) |
| Presupuesto | ≤ 18 palabras (título + eslogan + subtítulo + CTA) |
| Nota | La foto es el 70 % del área visual del bloque en móvil, pero **no** es lo primero: en ≤ 480 px el orden es H1 → eslogan → subtítulo (píldora) → CTA → foto (ver §3.2 y §7, M2). Jamás texto encima de la foto |

### 2.3 Bloque 2 · La tradición

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Que el ritual se entienda y se desee; llegar al final del párrafo y seguir bajando |
| Protagonista visual | Foto real del **Vichito armado con ropa vieja** (segunda toma, distinta del hero) |
| Proporción de foto | `3/4` vertical; en 375 px va arriba del texto a ancho completo (no a la derecha) |
| Fondo y paleta | Crema `#F4E2CD` full-bleed = zona de respiro; cuerpo en chocolate `#3B2517`; el párrafo puede vivir dentro de `CloudBlob` crema con borde de lápiz terracota |
| Ancho y ritmo | Texto máx. 62 ch; 128 px de padding vertical; columna de texto 6–11, foto 1–5 con 24 px de gap |
| Presupuesto | ≤ 70 palabras (el párrafo oficial, intacto) |
| Nota | Único bloque con párrafo largo permitido. Sin viñetas, sin cifras, sin «sabías que…» |

### 2.4 Bloque 3 · Qué trae el kit

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Desactivar «¿me faltará algo?» y justificar el valor del conjunto; producir clics a WhatsApp al salir del bloque |
| Protagonista visual | **Ocho `CloudCard`** (nube crema, borde de garabato terracota) con una foto real cada una: bichito, stickers de calzoncito amarillo, maletita roja, billete separador, lapicero, alcohol, lentejas, tarjetas del ritual |
| Proporción de foto | `1/1` cuadrada uniforme en las 8 tarjetas (uniformidad = orden, no plantilla); tarjeta de empaque kraft + papel picado rojo `16/9` (móvil `4/3`) a ancho completo |
| Fondo y paleta | Petróleo `#1B7A63`; nubes crema; marco terracota; stickers mostaza y rojo maleta `#B93A30` solo como acentos |
| Ancho y ritmo | Retícula 4 columnas en 1280 / 2 en 768 / 1 en 375; gap 24–28 px; padding vertical 112/120 px |
| Presupuesto | ≤ 9 palabras por ítem (nombre + una línea) |
| Nota | **Nunca carrusel**: el inventario es el argumento y un carrusel lo esconde. Una persona por fila en móvil. El bloque mide 3,5–4 pantallas a 375 px: el CTA secundario **se repite tras la cuarta nube** (mismo botón, misma clave `wa.kit`, fila 3b de §4.1), no solo al final |

### 2.5 Bloque 4 · Cómo funciona

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Quitar el miedo a «no saber hacerlo»: tres pasos y ya; captar clics de decisión madura |
| Protagonista visual | Tres `StepBadge` (número en círculo de garabato terracota) + doodles; foto opcional de **manos escribiendo las tarjetas** `1/1` (solo ≥768 px) |
| Proporción de foto | `1/1` si se usa; en 375 px se oculta la foto de apoyo y se conservan los doodles |
| Fondo y paleta | Crema `#F4E2CD`; números y doodles terracota; texto chocolate; una línea mostaza de subrayado curvo por paso |
| Ancho y ritmo | 3 columnas ≥768 px, apiladas en 375; tarjetas con aire interno generoso (28 px) y sin bordes rectos |
| Presupuesto | ≤ 12 palabras por paso |
| Nota | El paso 3 se queda en lo simbólico: nada de instrucciones de fuego, balcón ni municipio |

### 2.6 Bloque 5 · Comprar (protagonista de la página)

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Abrir WhatsApp con prellenado: la métrica principal del sitio |
| Protagonista visual | **Botón terracota enorme** (único bloque donde el elemento dominante es el CTA y no la foto); `StripedBackdrop` petróleo/crema como escenografía |
| Proporción de foto | Sin foto obligatoria; contenedor opcional `4/5` de la caja kraft cerrada, sangrado 6 px dentro del marco de bucles |
| Fondo y paleta | Rayas verticales anchas `#1B7A63` / `#F4E2CD` enmarcadas por borde de bucles terracota; panel crema interno para garantizar contraste del texto; botón terracota con etiqueta crema |
| Ancho y ritmo | Panel central máx. 720 px; padding 120 px vertical; CTA de 56–64 px de alto (móvil: ancho completo) |
| Presupuesto | ≤ 25 palabras + línea de envíos exacta |
| Nota | Aquí vive el `PriceSlot` (ver §6). Sin precio, el CTA ocupa el lugar del número |

### 2.7 Bloque 6 · Victoria + Mail Club 2027

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Dar cara humana y capturar a quien no compra hoy en la **lista de espera** del Mail Club (no es compra) |
| Protagonista visual | Retrato real de **Victoria en el taller** `4/5` en `SquigglyFrame` + tarjeta `CloudCard` del Mail Club con borde naranja y doodles de enero |
| Proporción de foto | `4/5` vertical; 375 px ancho completo; 1280 px columna 1–4 |
| Fondo y paleta | Petróleo de base; sub-bloque Mail Club sobre nube crema con borde terracota; etiquetas de temporada (mostaza para diciembre, rojo maleta para enero) |
| Ancho y ritmo | Dos sub-bloques apilados con 64–80 px entre ellos; padding 112 px vertical |
| Presupuesto | ≤ 30 palabras (Victoria) + ≤ 25 palabras (Mail Club) |
| Nota | Debe quedar visualmente obvio: **diciembre 2026 = kits de temporada**, **enero 2027 = Mail Club**. Dos botones como máximo |

### 2.8 Bloque 7 · Cierre

| Atributo | Especificación |
|---|---|
| Objetivo de conversión | Recordar la puerta de salida y cerrar con marca; repetir envíos y contacto |
| Protagonista visual | Wordmark grande `vichisboh*` + doodles sueltos (estrella, espiral) |
| Proporción de foto | Ninguna (no alargar la página) |
| Fondo y paleta | Rayas petróleo/crema **solo como escenografía perimetral** dentro del marco de bucles terracota; **todo el texto del cierre vive sobre un panel crema sólido** `#F4E2CD` con texto chocolate `#3B2517` (11,35:1) (v2, MAYOR-02) |
| Ancho y ritmo | Compacto: 72/64 px de padding; una sola fila de datos (contacto · envíos · ciudad) |
| Presupuesto | ≤ 12 palabras |
| Nota | (v2) **Prohibido texto directamente sobre las rayas.** No existe color de texto que cumpla AA contra las dos franjas a la vez (crema/petróleo 4,14 ✘; chocolate/petróleo 2,74 ✘), así que se aplica el mismo recurso que en el bloque 5: panel crema sólido, esquinas de nube, ancho máx. 640 px centrado dentro del `SquigglyFrame`; las franjas asoman 40–56 px por el perímetro como escenografía. Las rayas nunca pasan por detrás de una letra |

---

## 3. Jerarquía visual por bloque

### 3.1 Niveles tipográficos y dominancia

| Bloque | H1 / H2 / H3 | Pesos | Elemento que domina la mirada | Presupuesto de palabras |
|---|---|---|---|---|
| 0 | — (wordmark, no heading) | Baloo 2 700 | Wordmark en píldora crema | ≤ 4 |
| 1 | **H1** « Vichito, el año viejo » · eslogan «Hibérnate» (EB Garamond Italic) · subtítulo (**píldora crema + texto chocolate**, v2) | Baloo 2 800 desc. / 700 móvil | **La foto** (más peso que el H1: área × contraste) | ≤ 18 |
| 2 | **H2** « ¿Qué es el Año Viejo? » · párrafo oficial | Baloo 2 700 / Nunito 400 | **La foto** del muñeco armado; el H2 es segunda parada | ≤ 70 |
| 3 | **H2** nombre de sección · **H3** nombre de cada ítem + 1 línea | Baloo 2 700 / Baloo 2 600 ítems, Nunito 400 línea | **La retícula de 8 fotos** | ≤ 9 × ítem |
| 4 | **H2** + 3 × **H3** numerados | Baloo 2 700 / 600 | **Los números** (badges terracota grandes) | ≤ 12 × paso |
| 5 | **H2** breve + CTA como «titular visual» | Baloo 2 700 / Baloo 2 800 en botón | **El botón terracota** | ≤ 25 + envíos |
| 6 | **H2** « Hola, soy Victoria » · **H3** « Inscríbete al mail club 2027 » | Baloo 2 700 / 600 | **El retrato** y, abajo, la nube del Mail Club | ≤ 30 + ≤ 25 |
| 7 | — | Baloo 2 700 wordmark | Wordmark + dispersión de doodles | ≤ 12 |

**Regla de dominancia:** en los bloques con foto (1, 2, 3, 6) el contenedor de imagen pesa más que el titular en área, contraste y posición. El titular es el *segundo* punto de parada; en el bloque 5 se invierte la regla porque el CTA es la fotografía de la decisión.

**Regla de color de texto (v2):** ningún texto del sitio se apoya directamente sobre un fondo de rayas o sobre un fondo de dos colores. Donde hay rayas (bloques 5 y 7) el texto vive en panel crema sólido. El único texto crema sobre petróleo es el que alcanza AA-large (H1 de hero, H2, eslogan) o está dentro de píldora/nube crema.

### 3.2 Orden de lectura

| Bloque | Desktop (1280) | Móvil (375) |
|---|---|---|
| 0 | logo → idioma → CTA | logo → idioma → CTA (compacto) |
| 1 | H1 → eslogan → foto → subtítulo (píldora) → CTA → pie del hero | **H1 → eslogan → subtítulo (píldora) → CTA ancho completo → foto → pie del hero** (v2, M2) |
| 2 | foto izq. → H2 → párrafo → (sin CTA; deriva al kit) | H2 → foto → párrafo |
| 3 | H2 → 8 nubes (4×2) con **CTA secundario tras la 4.ª** → nota de empaque → CTA secundario | H2 → 8 nubes (1 por fila) con **CTA secundario tras la 4.ª** → empaque → CTA secundario |
| 4 | H2 → 3 columnas → CTA secundario | H2 → paso 1 → paso 2 → paso 3 → CTA secundario |
| 5 | panel: eyebrow disponibilidad → H2 → CTA → envíos → nota de pedido | mismo orden, todo centrado y apilado |
| 6 | retrato + «Hola, soy Victoria» → nube Mail Club → 2 botones | retrato → texto → nube → botones apilados |
| 7 | wordmark → contacto → envíos (todo sobre panel crema) | idéntico, apilado |

**Por qué cambia el orden móvil del hero (M2):** con la foto `4/5` (419 px) entre el eslogan y el subtítulo, el subtítulo caía por debajo del pliegue en 375 × 667 y la única frase que explica el producto se perdía en la primera pantalla. El orden nuevo lo garantiza con holgura: navbar 56 + padding 56 + H1 (3 × 34 px × 1,05 ≈ 107) + eslogan 30 + píldora del subtítulo ≈ 75 + CTA 52, más 16–24 px entre grupos ≈ **430 px**, por debajo de los 667 del iPhone SE. **La composición de escritorio no cambia**: la foto sigue siendo la protagonista a la derecha, con sangrado al borde.

### 3.3 Retícula y ritmo

| Token | Valor | Uso |
|---|---|---|
| `container-max` | 1200 px (texto de lectura 62–68 ch; panel Comprar 720 px) | Todos los bloques |
| `gutter` | 20 px (375) · 32 px (768) · 48 px (1280) | Márgenes laterales |
| `grid` | 12 columnas, gap 24 px (móvil 4 columnas, gap 16 px) | Composición |
| `space-section` | 56 px (375) · 88 px (768) · 112–128 px (1280) | Padding vertical entre bloques |
| `space-block` | 24 px (375) · 32 px (768) · 48 px (1280) | Separación interna entre grupos |
| `space-title-body` | 16–20 px | Título → párrafo |
| `radius-card` | 28 px con esquinas asimétricas (nube) | Tarjetas |
| `radius-pill` | 999 px | Botones, píldoras, logos |
| `touch` | mínimo 44 × 44 px; CTA 52–64 px de alto | Todos los controles |

**Cómo se rompe la rigidez de la retícula (obligatorio, no opcional):**

- **Rotaciones sutiles:** −2,5° a +2,5° aplicadas a stickers, marcos y doodles, nunca al texto corrido (máx. 3 elementos rotados por viewport).
- **Formas orgánicas:** nubes con `blob` de 2–3 radios distintos; esquinas 28/36/20/32 px; nunca `rounded-lg` simétrico en el contenedor principal.
- **Bordes de garabato SVG** en lugar de `border` recto: `SquigglyFrame` como marco de tarjetas, y onda SVG como separador horizontal.
- **Desfases:** 2 de los 8 elementos del kit puede ir 8–12 px desplazados verticalmente para que la retícula respire como collage impreso.
- **Superposición de doodles** sobre marcos (estrella en una esquina, espiral bajo un título) con `aria-hidden`.
- **Textura de papel** al 5–8 % de opacidad sobre zonas grandes de color, jamás sobre fotos.
- **Prohibido como recurso de rotura:** degradados, sombras difusas, glassmorphism, iconos de librería, ilustraciones vectoriales que no imiten lápiz.

---

## 4. Flujo de CTAs

### 4.1 Tabla de CTAs por bloque

Todos los destinos de compra/lista de espera: `https://wa.me/15142968295?text=<prellenado codificado>` o `https://instagram.com/vichisboho`. Ventana nueva con `rel="noopener noreferrer"`.

| # | Bloque | Texto ES del CTA | Posición | Estilo | Destino | Objetivo | Jerarquía |
|---|---|---|---|---|---|---|---|
| 1 | Navbar | « Comprar el kit » | Derecha, siempre visible (sticky) | **Píldora crema `#F4E2CD`, texto chocolate `#3B2517` (11,35:1), contorno de garabato terracota 2,5 px**, Baloo 2 700, alto 44–48 px. **Nunca relleno terracota**, ni siquiera tras pasar el hero | WhatsApp `wa.nav` | Capturar intención inmediata | **Secundario** (v2, MAYOR-07) |
| 2 | Hero | « Comprar el kit » | Bajo el subtítulo, alineado al bloque de texto | Píldora terracota, crema, Baloo 2 800, alto 56 px (móvil: ancho completo) | WhatsApp `wa.hero` | Compra decidida por reconocimiento | **Primario** (único relleno del primer viewport) |
| 3a | Kit | « Preguntar por el kit » | **Tras la cuarta nube**, a ancho de columna centrado (v2, m13) | Contorno terracota, texto chocolate sobre crema, alto 52 px | WhatsApp `wa.kit` | Resolver la duda **en el punto donde nace** (~2 pantallas antes que 3b) | Secundario |
| 3b | Kit | « Preguntar por el kit » (mismo botón, misma clave) | Cierre del bloque, centrado bajo las nubes | Contorno terracota, texto chocolate sobre crema, alto 52 px | WhatsApp `wa.kit` | Cerrar la duda al terminar el inventario | Secundario |
| 4 | Cómo funciona | « Escribir a Victoria » | Tras el paso 3, centrado | Contorno terracota sobre crema, texto chocolate | WhatsApp `wa.steps` | Validar «¿puedo hacerlo?» | Secundario |
| 5 | Comprar | « Comprar el kit » | Centro del panel, inmediatamente tras el `PriceSlot` | Píldora terracota, crema, Baloo 2 800, 20–24 px, alto 64 px, ancho máx. 420 px | WhatsApp `wa.buy` | **Conversión principal** | **Primario protagonista** |
| 6a | Victoria | « Escribir a Victoria » | Bajo las dos líneas de presentación | Enlace terciario subrayado dibujado | WhatsApp `wa.victoria` | Contacto humano | Terciario |
| 6b | Mail Club | « Entrar a la lista de espera » | Dentro de la nube del Mail Club | Contorno terracota sobre crema, alto 52 px | WhatsApp `wa.mailclub` (**lista de espera, no compra**) | Sembrar enero 2027 | Secundario |
| 6c | Mail Club | « Escribir por DM » | A la derecha/debajo de 6b | Enlace terciario | Instagram `@vichisboho` | Segunda vía de captura | Terciario |
| 7 | Cierre | « WhatsApp 514-296-8295 » + « @vichisboho » | Fila de datos del pie (sobre panel crema) | Enlaces texto con subrayado curvo | WhatsApp `wa.footer` / Instagram | Remate operativo | Terciario |

**Recuento (v2, aritmética corregida):** **8 WhatsApp + 2 Instagram = 10 enlaces** repartidos en **8 claves de prellenado** (`wa.nav`, `wa.hero`, `wa.kit`, `wa.steps`, `wa.buy`, `wa.victoria`, `wa.mailclub`, `wa.footer`) y **9 apariciones del botón de WhatsApp** en pantalla, porque `wa.kit` aparece dos veces (3a y 3b). Las claves citadas son las **canónicas de `02-copys.md §6.2`** (prefijo `wa.`).

**Reparto de jerarquía (v2):** relleno terracota solo en 2 (hero) y 5 (Comprar), que **nunca coinciden en el mismo viewport**; píldora crema/contorno en 1, 3a, 3b, 4 y 6b; enlaces terciarios en 6a, 6c y 7. El navbar es el único control visible junto al hero y junto a Comprar, y por eso es secundario: la regla «un solo CTA primario por pantalla» se cumple en todo el scroll.

**Nota de idioma:** los textos EN/FR se adaptan en la fase de copy con **la misma brevedad y el mismo número de palabras**; ningún microcopy de botón ni ítem de una línea debe ocupar dos líneas donde el ES ocupa una. **Excepciones admitidas (v2):** el subtítulo del hero dentro de la píldora (2 líneas en ES/EN, hasta 3 en FR) y la línea de envíos (hasta 3 líneas a 375 px, nunca por debajo de 14 px). Los nombres propios «Vichito» y «Año Viejo» se conservan en los tres idiomas.

### 4.2 Prellenado de WhatsApp por sección e idioma — **TABLA SUSTITUIDA (v2, m10)**

> ⚠️ **Nota de deriva documental (v2).** La tabla de esta §4.2 es **anterior** a la del copy y **queda sustituida** por **`02-copys.md §6.2`**, que es la fuente canónica. Las claves de prellenado canónicas llevan **prefijo `wa.`**: `wa.nav`, `wa.hero`, `wa.kit`, `wa.steps`, `wa.buy`, `wa.victoria`, `wa.mailclub`, `wa.footer`. Los textos de abajo se conservan solo como **referencia histórica del criterio** (saludo + intención + marcador de sección + producto); **no** se implementan y **no** se citan en el código. Además, esta tabla agrupaba `nav`/`hero`/`comprar` en un mismo mensaje, lo que anulaba el marcador de sección; el copy los diferencia correctamente. Si hay discrepancia, gana `02-copys.md §6.2`.

Estructura obligatoria: saludo + intención + marcador de sección + nombre del producto, siempre en el idioma activo y codificado con `encodeURIComponent`.

| Clave (histórica; la canónica es `wa.*` de `02-copys.md §6.2`) | ES (referencia; EN/FR se adaptan en copy) |
|---|---|
| `nav` · `hero` · `comprar` | «Hola Victoria, quiero el Kit Ritual Año Viejo 2026 🧡 (vengo de la página)» |
| `kit` | «Hola Victoria, tengo una pregunta por lo que trae el kit del Año Viejo 2026.» |
| `pasos` | «Hola Victoria, quiero saber si puedo armar mi Vichito sin experiencia.» |
| `mailclub` | «Hola Victoria, quiero entrar a la lista de espera del Mail Club 2027.» |
| `victoria` · `cierre` | «Hola Victoria, te escribo desde la página del Vichito.» |

El marcador de sección es la única instrumentación de medición: llega escrito a la conversación (ver brief §1.3). No hay píxeles ni eventos.

### 4.3 Reglas de estilo y comportamiento de botones

- **Primario:** fondo `#F04E0C`, etiqueta crema `#F4E2CD`, radio píldora, borde chocolate de 2 px tipo garabato + sombra dura desplazada 3 px (efecto sticker, no sombra difusa), `font-weight` 800, etiqueta ≥ 20 px. **Máximo dos en toda la página** (hero y Comprar) y nunca simultáneos en el mismo viewport. Etiqueta crema sobre terracota = 2,86:1 → **deuda de marca declarada** (§8.2), no «cumple por tamaño».
- **Sobre petróleo:** el primario lleva **halo/contorno crema de 2–3 px** alrededor de la píldora para que la forma se distinga del fondo (terracota vs petróleo = 1,45:1, ver §8). El halo mejora la **forma**, no el contraste del glifo: ambas cosas se declaran por separado.
- **Secundario:** fondo crema, texto chocolate (11,35:1), contorno de garabato terracota 2,5 px; nunca dos rellenos terracota en el mismo viewport. **El CTA del navbar pertenece a esta familia en todo el scroll** (v2, MAYOR-07): es el control que acompaña a todos los bloques y no puede ser el protagonista de ninguno.
- **Terciario:** texto chocolate sobre crema (o crema sobre petróleo a ≥ 24 px) con subrayado curvo terracota dibujado; el subrayado es decorativo, no el único indicador.
- **Estados:** `hover` = rotación −1,5° + desplazamiento de 2 px de la sombra (sin cambio de color); `active` = sombra a 0; `focus-visible` = anillo de 3 px mostaza con 3 px de separación; `disabled` no existe (no hay estados de compra bloqueados).
- **Prohibido en hover/interacción:** zoom de imagen, cambios de opacidad que reduzcan contraste, animaciones de más de 200 ms.

---

## 5. Componentes, sistema visual reutilizable y mapa de archivos

### 5.1 Catálogo de componentes

| Componente | Rol | Dónde se usa | Regla de uso | Cuándo NO usarlo |
|---|---|---|---|---|
| `SquigglyFrame` | Marco de bucles dibujados a mano (SVG, variantes: píldora, rectángulo, nube; trazo terracota 3–4 px) | Hero, retrato Victoria, panel Comprar, subtítulo del hero (variante píldora), tarjetas | Acompaña siempre a una foto, a una píldora o a un panel completo; conserva la proporción del contenido (no recorta); decorativo → `aria-hidden`; **obligatorio `vector-effect="non-scaling-stroke"`** y un `viewBox` por relación de aspecto, o el trazo se estira al redimensionar (V1) | Nunca alrededor de texto corrido, ni en elementos pequeños < 120 px, ni dos anidados |
| `CloudBlob` | Contenedor nube orgánico crema con borde de lápiz terracota | Tradición, tarjeta Mail Club, fondo de pasos, **píldora del subtítulo del hero** | Una nube por bloque con contenido propio; esquinas asimétricas; `border-radius` asimétrico para la forma + `stroke` SVG superpuesto (o `clipPath` con 2–3 paths) para el borde de lápiz; sin sombra; `vector-effect="non-scaling-stroke"` | No usar como fondo de toda la página ni repetido en carrusel |
| `StripedBackdrop` | Fondo de rayas verticales anchas petróleo/crema + capa de textura | Comprar y Cierre | Solo en bloques que enmarcan una acción o el remate; franjas de 40–56 px, onduladas; **siempre con panel crema sólido encima para el texto: ningún texto se apoya en las rayas** (v2, MAYOR-02); franjas con `repeating-linear-gradient(90deg, …)` de paradas duras o `<pattern>` SVG, nunca degradado de color | Nunca detrás de párrafos largos ni en móvil con franjas < 24 px (fatiga visual) |
| `PaperTexture` | Capa de textura de papel/acuarela al 4–8 % — **opcional** (v2, V12) | Zonas grandes de color y rayas | **Por defecto: trama CSS de puntos** (`radial-gradient` de 1–2 px) al 4 % de opacidad, sin ningún asset. Si algún día llega una textura real tileada (< 20 KB), se sustituye la trama por ese asset, sin tocar el componente; prohibido `feTurbulence` (caro en móvil de gama media). `pointer-events: none`, `aria-hidden`, nunca sobre fotos | No usar para "arreglar" un bloque pobre: no aporta contraste |
| `Doodle` (Star, Spiral, CurvedUnderline, Ticks) | Doodles sueltos terracota/mostaza | Alrededor de títulos, marcos, botones, cierre | Máx. 3 por viewport; rotación −8° a +8°; `aria-hidden` | No aclarar información ni sustituir un CTA; no animarlos en bucle |
| `CloudCard` | Tarjeta nube crema con foto + una línea (ítem del kit) | Bloque 3, Mail Club | Foto `1/1` arriba, nombre + 1 línea; **máx. 3 líneas por tarjeta a 375 px** (v2, m7: 6 de los 8 textos oficiales son de 11–17 palabras y no caben en 2); mismo alto de tarjeta en la retícula | No añadir segunda línea, precio por ítem ni botón propio por tarjeta |
| `EyebrowPill` | Píldora pequeña con etiqueta funcional («temporada 2026», «enero 2027», «hecho a mano») | Hero, Comprar, Mail Club | Máximo una por bloque; texto ≤ 4 palabras; contraste verificado en §8 | No usar como sustituto de un H2 ni para frases de marketing |
| `ButtonPrimary` | CTA relleno terracota | **Hero y Comprar solo** (v2, MAYOR-07: fuera del navbar) | Uno por viewport; etiqueta Baloo 2 800 ≥ 20 px; halo crema + keyline chocolate sobre petróleo (§8.2) | Nunca en listas de tarjetas ni dos juntos (anulan jerarquía) |
| `ButtonSecondary` | CTA en píldora crema sobre petróleo o contorno sobre crema | **Navbar (sticky)**, Kit (×2), Pasos, Mail Club | Píldora crema + texto chocolate (11,35:1) + contorno de garabato terracota 2,5 px; mismo alto que el primario; **sin deuda de contraste** | No usarlo como CTA principal de una sección |
| `LinkTertiary` | Enlace con subrayado curvo | Victoria, DM, Cierre | Texto ≥ 16 px, subrayado decorativo; la palabra misma indica el destino | No usar para acciones de compra |
| `LanguageSwitch` | Selector ES \| EN \| FR (tres botones en píldora crema, no un `<select>`) | Navbar | Activo en chocolate sobre crema, inactivo con contraste atenuado pero legible; `aria-pressed`; conserva scroll | No lo conviertas en menú desplegable ni lo escondas en móvil |
| `PhotoSlot` | Contenedor de foto real con proporción fija (`4/5`, `1/1`, `3/4`, `16/9`), etiqueta visible de qué foto va ahí y `alt` real | Todos los bloques con imagen | Reserva el espacio exacto (sin salto de layout); fondo crema o petróleo con etiqueta "Foto real: …" hasta que exista la imagen | Jamás rellenarlo con stock, IA, ilustración sustituta ni icono genérico |
| `PriceSlot` | Slot de precio por configuración (ver §6) | Comprar | Tres estados; por defecto oculto sin hueco | No mostrar precios por ítem, ni "consultar", ni comparativas |
| `StepBadge` | Número en círculo de garabato terracota | Cómo funciona | 1–3, mismo tamaño; el número es decorativo, el paso se anuncia en el H3 | No lo uses como viñeta genérica del kit |
| `SectionDivider` | Onda SVG entre bloques | Entre todas las secciones | 2–3 px terracota o chocolate sobre crema; siempre curva | Nunca línea recta de 1 px ni `<hr>` por defecto |
| `Wordmark` | `vichisboh*` en Baloo 2 Bold con flor-asterisco | Navbar, pie del hero, cierre | Sobre píldora/fondo crema o variante clara sobre petróleo; tamaño mínimo legible | No añadirlo a cada sección ni deformarlo |
| `ShippingLine` | Línea única de envíos exacta | Comprar, Cierre | Texto literal del encargo: una sola frase, sin partir en tarjetas. **A 375 px puede ocupar hasta 3 líneas, nunca menos de 14 px** de cuerpo (v2, m7: ~96 caracteres no caben en 2 líneas) | No dividirla en tarjetas ni resumirla ("envíos desde 5 $") |

**Tokens nombrados (para frontend):** `--petroleo`, `--terracota`, `--crema`, `--chocolate`, `--rojo`, `--mostaza`, `--oliva`; `--radius-pill`, `--radius-cloud`; `--stroke-hand` (3 px); `--space-section`, `--space-block`; `--rotate-tilt` (−2,5° / +2,5°); `--btn-ink` (valor por defecto `--crema`; alterno `--chocolate`, ver §8.2). Nada de tokens de color fuera de la paleta del encargo.

### 5.2 Mapa de archivos (contrato para `frontend-dev`)

**Decisión (v2, resuelve MINOR-06 del técnico):** el bloque 7 (**Cierre**) se implementa en **`src/components/SiteFooter.jsx`**.

**Por qué:** la lista mandatada del encargo (`_contexto-encargo.md` §5.1, 8 archivos) cubre `Navbar.jsx`, `Hero.jsx`, `Tradition.jsx`, `KitContents.jsx`, `HowItWorks.jsx`, `BuySection.jsx`, `FooterMailClub.jsx` (bloque 6), `SquigglyFrame.jsx` y `src/i18n/translations.js`. El bloque 7 **no** aparece porque el encargo describe **6 secciones** comerciales, y el cierre es *chrome* —no una sección nueva—: repite contacto, envíos y marca, exactamente lo ya mandatado en la sección 5 del encargo. Necesita archivo propio porque `FooterMailClub.jsx` es el bloque 6 (Victoria + Mail Club) y **no** debe mezclarse con el pie, y porque el cierre tiene reglas propias de contraste (panel crema sobre rayas, §2.8). Nombre inventado = riesgo de que la Puerta 2 improvise el criterio; por eso se fija aquí.

| Archivo | Bloque | Contenido mínimo |
|---|---|---|
| `src/components/Navbar.jsx` | 0 | wordmark, `LanguageSwitch`, `ButtonSecondary` sticky |
| `src/components/Hero.jsx` | 1 | H1, eslogan, píldora del subtítulo (`CloudBlob` píldora), `ButtonPrimary`, `PhotoSlot` `4/5` |
| `src/components/Tradition.jsx` | 2 | H2 + párrafo oficial en `CloudBlob`, `PhotoSlot` `3/4` |
| `src/components/KitContents.jsx` | 3 | 8 `CloudCard`, nota de empaque, CTA secundario **×2** (tras la 4.ª nube y al final) |
| `src/components/HowItWorks.jsx` | 4 | 3 `StepBadge` + CTA secundario |
| `src/components/BuySection.jsx` | 5 | `StripedBackdrop` + panel crema, `PriceSlot`, `ButtonPrimary`, `ShippingLine`, nota de pedido |
| `src/components/FooterMailClub.jsx` | 6 | retrato Victoria, nube Mail Club, CTA lista de espera + DM |
| **`src/components/SiteFooter.jsx`** | **7** | **wordmark, contacto, envíos y ciudad sobre panel crema dentro del marco rayado — adición justificada, no sección nueva** |
| `src/components/SquigglyFrame.jsx` | — | marco de garabato con variantes `pill` / `rect` / `cloud`, `vector-effect="non-scaling-stroke"` |
| `src/components/CloudBlob.jsx` | — | nube crema con borde de lápiz (usada también por la píldora del subtítulo) |
| `src/components/StripedBackdrop.jsx` | — | rayas + capa de textura opcional |
| `src/components/ui/` (`ButtonPrimary`, `ButtonSecondary`, `LinkTertiary`, `Doodle`, `PhotoSlot`, `PriceSlot`, `ShippingLine`, `SectionDivider`, `Wordmark`, `EyebrowPill`, `StepBadge`, `PaperTexture`) | — | primitivas de §5.1 |
| `src/i18n/translations.js` | — | diccionario de `02-copys.md` + claves `wa.*` de §6.2 |
| `src/config.js` | — | `kitPrice`, `availability`, `--btn-ink` (tokens de decisión, §6 y §8.2) |

---

## 6. Manejo del precio pendiente

El precio del kit **no existe todavía** y está prohibido inventarlo. El bloque Comprar se diseña para leerse completo **sin número**.

### 6.1 Estados del `PriceSlot` (por configuración, nunca hardcodeado)

| Estado | Disparador de configuración | Qué se renderiza | Qué ocupa el lugar de honor |
|---|---|---|---|
| `hidden` (**por defecto**) | `kitPrice: null` | **Nada**: ni hueco, ni «$—», ni texto de relleno. El CTA sube y queda donde iría el número | El CTA terracota + `EyebrowPill` «temporada 2026» + línea de envíos |
| `availability` | `kitPrice: null`, `availability: 'in_stock'` | Píldora mostaza con texto chocolate «Disponible» (8,67:1) | La píldora como confirmación, a la misma altura que el número |
| `price` | `kitPrice: { amount, currency: 'CAD' }` | Número en Baloo 2 800 (≥ 40 px) con etiqueta «kit completo» y moneda, sobre panel crema | El número; el CTA inmediatamente debajo, sin perder tamaño |

### 6.2 Decisiones de CRO

1. **Sin hueco reservado.** Un hueco vacío se lee como página rota. El estado `hidden` no deja espacio fantasma: es el estado normal del diseño, no un fallo.
2. **Nunca «consultar precio»** en mayúsculas ni con signos: grita que algo se esconde. Si se necesita una frase, es conversacional y va en el microcopy del CTA, no en el slot.
3. **La certeza operativa sustituye a la cifra:** la línea literal de envíos (`Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $`) da cuatro datos exactos en una línea. El visitante no sabe cuánto cuesta el kit, pero sí sabe que no habrá sorpresas de envío, que hay recogida gratis y que a partir de 60 $ el envío desaparece.
4. **La disponibilidad por temporada también es información:** «temporada 2026» comunica escasez real (producción de una persona en diciembre), sin contadores ni falsas urgencias.
5. **El CTA es el protagonista del bloque, no un premio de consolación:** el ojo espera un número donde encuentra un botón grande; eso reencuadra la ausencia de precio como invitación a conversar.
6. **Si alguien pregunta el precio, la respuesta es una conversación**, no una sección: por eso no hay acordeón de precios ni nota al pie.
7. **Prohibido en cualquier estado:** cifras del kit, tachados, descuentos, «precio de lanzamiento», símbolos de moneda sin importe, y cualquier promesa de plazo de entrega por zona.

---

## 7. Especificación responsive

| Elemento | 375 px (base, mobile-first) | 768 px | 1280 px |
|---|---|---|---|
| Navbar | 56 px; logo + idioma + CTA compacto **en píldora crema (secundario)**; la etiqueta puede acortarse, **nunca desaparecer** | 64 px; etiqueta completa, misma píldora crema | 64 px; etiqueta completa, misma píldora crema |
| Hero | 1 columna (**v2, M2**): H1 → eslogan → **subtítulo en píldora crema** → CTA ancho completo → **foto `4/5` full-width** | 2 columnas: texto 1–6, foto 7–12 | foto 480 px sangrando a la derecha, texto 1–6 (sin cambios: la foto sigue mandando) |
| Tradición | 1 columna: H2 → foto `3/4` → párrafo (62 ch) | 2 columnas (foto 1–5) | 2 columnas con 128 px de aire arriba/abajo |
| Kit | 1 nube por fila; tarjeta empaque `4/3` | 2 columnas (gap 20) | 4 columnas (gap 28), 2 filas + empaque a ancho completo |
| Cómo funciona | 3 pasos apilados, sin foto de apoyo, doodles conservados | 3 columnas con foto `1/1` | 3 columnas, tarjetas más altas y aire interno 28 px |
| Comprar | Panel a ancho completo menos gutters; CTA 100 % de ancho, 64 px de alto; **envíos hasta 3 líneas, nunca por debajo de 14 px** (v2, m7) | Panel máx. 600 px centrado | Panel 720 px; CTA 420 px centrado |
| Victoria + Mail Club | Retrato full-width → texto → nube → botones apilados | Retrato 1–5, texto 6–12; nube a ancho completo | Retrato 1–4, texto 5–8; nube 9–12 |
| Cierre | Fila de datos apilada, **todo sobre panel crema sólido** dentro del marco rayado (v2, MAYOR-02) | 2 filas, mismo panel crema | 1 fila de 3 datos, panel crema máx. 640 px |
| Doodles | Máx. 2 visibles por viewport | 3 | 3–4, incluidos los de borde |
| Tipo | H1 `clamp(2rem, 9vw, 4.25rem)`, H2 `clamp(1.6rem, 6vw, 2.75rem)`, cuerpo 17 px/1.65 | H1 ~3rem | H1 4,25rem, cuerpo 18 px |

**Qué se apila:** todo el contenido de dos columnas, los 8 ítems del kit, los 3 pasos, los botones del Mail Club.
**Qué se oculta:** solo lo secundario — foto de apoyo de los pasos, doodles periféricos sobrantes, miniaturas del hero, la segunda fila del pie. **Nunca** se oculta: selector de idioma, CTA del navbar, CTA del hero, CTA de Comprar, línea de envíos ni el precio (cuando se active).
**Tamaño mínimo de foto:** hero ≥ 343 × 429 px (375 menos gutters); nubes del kit ≥ 280 px de ancho con `1/1`; retrato ≥ 343 × 429 px; ninguna foto por debajo de 280 px de ancho útil.
**Legibilidad del hero en móvil (v2, reescrito):** nada de texto sobre la foto; H1 en máximo 3 líneas con `line-height` 1,05; **subtítulo dentro de la píldora crema con texto chocolate** a 17 px (2 líneas en ES/EN, hasta 3 en FR) — nunca crema sobre petróleo a ese tamaño (MAYOR-01); CTA a 44 px o más del borde inferior de la píldora; el **primer viewport a 375 × 667 muestra H1 + eslogan + subtítulo + CTA completos** (≈ 430 px de los 667 disponibles) y la foto arranca inmediatamente después. El primer viewport nunca es solo el navbar ni deja el subtítulo fuera de pantalla (M2).

---

## 8. Accesibilidad y rendimiento como decisiones de diseño

### 8.1 Contraste real de la paleta (calculado, no estimado)

| Combinación | Ratio | AA texto normal (4,5) | AA texto grande (3,0) | Uso autorizado |
|---|---|---|---|---|
| Chocolate `#3B2517` sobre Crema `#F4E2CD` | **11,35:1** | ✔ | ✔ (AAA) | Cuerpo, párrafos, etiquetas de botón secundario |
| Chocolate sobre Mostaza `#E3C93C` | **8,67:1** | ✔ | ✔ (AAA) | Píldora «Disponible», stickers con texto |
| Oliva `#50664B` sobre Crema | **4,97:1** | ✔ | ✔ | Detalles y separadores con texto, cita del billete |
| Crema sobre Rojo `#B93A30` | **4,48:1** | ✘ (por 0,02) | ✔ | Solo texto grande (≥ 24 px) o franjas de papel picado; no cuerpo |
| Crema sobre Petróleo `#1B7A63` | **4,14:1** | ✘ | ✔ | Solo H1/H2, eslogan y etiquetas ≥ 24 px (o ≥ 18,66 px en negrita). **El subtítulo del hero NO va directo sobre petróleo**: vive en píldora crema con texto chocolate (11,35:1). El cuerpo pequeño nunca va directo sobre petróleo (v2, MAYOR-01) |
| Chocolate sobre Terracota `#F04E0C` | **3,96:1** | ✘ | ✔ | Token alterno de etiqueta de CTA (`--btn-ink: chocolate`) |
| Mostaza sobre Petróleo | **3,16:1** | ✘ | ✔ | Doodles, estrellas y focos (decorativos); no texto corrido |
| Crema sobre Terracota | **2,86:1** | ✘ | ✘ | **Deuda declarada** del CTA primario (ver 8.2) |
| Terracota sobre Crema | 2,86:1 | ✘ | ✘ | Solo trazos decorativos (marcos, subrayados) |
| Chocolate sobre Petróleo | 2,74:1 | ✘ | ✘ | Prohibido para texto: usar crema |
| Oliva sobre Petróleo | 1,20:1 | ✘ | ✘ | Prohibido |
| Terracota sobre Petróleo | 1,45:1 | ✘ | ✘ | Solo decoración `aria-hidden` (marcos, doodles), con trazo ≥ 3 px |

**Consecuencia de diseño:** todo texto pequeño sobre petróleo vive dentro de `CloudBlob`/`CloudCard`/píldora crema (11,35:1). El petróleo solo sostiene titulares grandes y etiquetas; el cuerpo nunca va directo sobre él.

**Dos consecuencias añadidas en v2:**

1. **Subtítulo del hero (MAYOR-01):** se resuelve por la opción (a) — píldora crema con texto chocolate —, no subiéndolo a 24 px. Razones: (i) el subtítulo es una frase de 10–12 palabras y a 24 px competiría con el H1 y rompería las 18 palabras de presupuesto visual del hero; (ii) la píldora es el mismo lenguaje artesanal que la nube del Mail Club y la píldora del wordmark, así que refuerza identidad en vez de añadir un parche; (iii) no toca la composición de escritorio (foto protagonista a la derecha) ni el orden móvil nuevo. A 375 px la píldora ocupa el ancho menos gutters (343 px), con 20 px de padding lateral: quedan 303 px de texto útil, suficientes para 2 líneas de 17 px.
2. **CTA del navbar (MAYOR-07):** al ser píldora crema con texto chocolate, su etiqueta cumple **11,35:1 sin deuda**. Es la única forma de tener un CTA siempre visible sin romper «un primario por viewport».

### 8.2 El CTA primario: **deuda de marca declarada** (no «cumple por tamaño»)

**El dato, sin maquillaje (v2, MAYOR-04):** crema `#F4E2CD` sobre terracota `#F04E0C` = **2,86:1**. El umbral de texto grande AA es **3,0:1**, así que **el CTA primario no cumple AA en ningún tamaño**: subir la etiqueta a 20 px, 24 px o 40 px no cambia el ratio. La etiqueta a ≥ 20 px en Baloo 2 800 se mantiene por legibilidad real y jerarquía, **no** como argumento de conformidad.

Se mantiene la identidad de la casa (botón terracota con letra crema, mandato del encargo) y se declara **deuda de marca**, con estas condiciones:

1. **Etiqueta en Baloo 2 800 ≥ 20 px** — decisión de legibilidad y jerarquía, no de contraste. Prohibido usarla como justificación de AA.
2. **Keyline chocolate de 2 px** dibujado alrededor de la píldora, más contorno de glifo muy sutil (efecto sello de lápiz). Mejora el **borde de la forma** y la silueta de las letras; **no** cambia el ratio del glifo. Su valor es que la etiqueta no se «derrame» en el fondo.
3. **Halo crema de 2–3 px** alrededor de la píldora cuando el botón está sobre petróleo: la **forma** pasa de 1,45:1 a 4,14:1 (contraste no textual ✔). De nuevo: forma, no glifo.
4. **Condición verificable en la Puerta 2:** el keyline chocolate y el halo crema deben existir **en el CSS real** (clases/atributos inspeccionables en el DOM, no solo descritos aquí). Si en el código el botón es terracota liso con letra crema sin keyline ni halo, la deuda deja de ser «declarada» y pasa a ser **fallo** (posición ratificada por el QA en `puerta1-qa.md`, nota final de §5).
5. **Decisión explícita de Victoria (D-CTA, nueva):** (A) **mantener crema** como está → deuda aceptada y visible, coherencia de marca total; o (B) **activar `--btn-ink: chocolate`** (3,96:1, cumple AA-large con etiqueta ≥ 20 px en Baloo 2 800) con una línea de configuración. Ambas opciones están implementadas por token `--btn-ink` desde el día uno; el valor por defecto es **crema** hasta que Victoria decida. Si elige (B), la deuda **desaparece** y el checklist de §9 pasa en verde sin excepción.
6. **Lo que no se hace:** no se cambia el terracota del fondo del botón, no se añade sombra interna blanca, no se agranda la letra para «ganar» el umbral, y no se esconde la deuda en una nota al pie. La deuda se publica en la entrega a Victoria y viaja al informe de Puerta 2.

### 8.3 Foco, tamaño táctil e hitos semánticos

- **Foco visible:** anillo de 3 px mostaza con 3 px de separación sobre fondos petróleo (3,16:1 ≥ 3:1 no textual) y anillo de 3 px chocolate sobre crema (11,35:1). Nunca `outline: none`.
- **Objetivo táctil:** mínimo 44 × 44 px; CTAs 52–64 px de alto; separación mínima de 8 px entre controles; el selector de idioma usa botones de 44 px, no texto diminuto.
- **Semántica:** un solo `<h1>` (hero), `<h2>` por sección, `<h3>` en ítems y pasos; `lang` actualizado en el contenedor raíz al cambiar de idioma; `alt` descriptivo y real en cada `PhotoSlot` (describe la foto que va a ir, se sustituye al recibirla); `aria-label` de los CTAs traducido («Escribir a Victoria por WhatsApp»).
- **`aria-hidden="true"` obligatorio** en: todos los SVG decorativos (`SquigglyFrame`, `Doodle`, `SectionDivider`, `PaperTexture`, `StripedBackdrop`, `StepBadge` si el número se repite en el H3), y en las etiquetas visuales duplicadas.
- **Movimiento:** solo rotaciones de entrada ≤ 200 ms; `prefers-reduced-motion` las desactiva; nada parpadea, nada se mueve en bucle.
- **Contenido no textual:** los marcos y doodles no transmiten información; la etiqueta de temporada y la de envíos siempre son texto real, no imagen.

### 8.4 Rendimiento como decisión de diseño

- **Sin dependencias extra:** React + Vite + Tailwind; SVG inline dibujados a mano (≤ 2 KB cada uno), sin librerías de iconos ni de animación.
- **Fuentes:** Baloo 2 y Nunito con `preconnect` + `display=swap`, subconjunto latin + latin-ext; EB Garamond solo Italic, con un máximo de dos apariciones por página. Objetivo: ≤ 4 archivos de fuente.
- **Imágenes:** el hero es el único `fetchpriority="high"`; el resto `loading="lazy"`; `width`/`height` o `aspect-ratio` fijos en cada `PhotoSlot` para cero salto de layout; formatos modernos al llegar las fotos reales.
- **Texturas (v2, V12):** la textura de papel es **opcional**. Por defecto se usa una **trama CSS de puntos al 4 %** de opacidad (cero peticiones, cero KB); **no existe hoy ningún asset real** y el documento no debe exigirlo. Si algún día llega una textura tileada real de **< 20 KB**, se sustituye la trama sin tocar componentes. Prohibido inventar binarios, prohibido `feTurbulence` en `<filter>` (caro en gama media), prohibido generar imágenes de "papel" con IA. Rayas y marcos son SVG/CSS, no imágenes.
- **Sin vídeo, sin carrusel, sin librería de scroll, sin cookies de terceros:** menos peticiones y ninguna animación pesada en un móvil de gama media.
- **Presupuesto de arranque (v2, MAYOR-03 — promesa reformulada a lo viable con CSR):** el sitio es una SPA de React + Vite, así que **sin JavaScript no hay página**: no se promete «funcional sin JS» ni se introduce SSR (contradiría el stack mandatado). Lo que sí se garantiza:
  1. **Contenido renderizado en el DOM tras hidratar**: texto real en nodos de texto (nada de `innerHTML` con plantillas, nada de contenido cargado por `fetch` después del primer render). El copy viaja en el bundle de `translations.js`, no en una petición aparte.
  2. **`<noscript>` en `index.html`** con el mensaje de reserva y las dos puertas reales: la **línea de envíos literal** y el **enlace a `https://wa.me/15142968295`**. Se escribe en ES (idioma por defecto) y se puede traducir por JS.
  3. **`<title>` y `meta description` en el HTML** de `index.html`, no inyectados por JS: hoy no existen en el diccionario (ver MENOR-12 de `puerta1-tech.md`, depende de `02-copys.md` v2) y deben ser reales, nunca «Vite + React».
  4. **Sin renderizado diferido ni `lazy` de contenido**: las 8 nubes, los 3 pasos y el pie están en el primer render; solo las imágenes fuera del hero se difieren (`loading="lazy"`).

---

## 9. Checklist de aceptación de la Puerta 2

Verificable en el código y en pantalla por `tech-verifier` y `qa-final`.

| # | Ítem comprobable | Cómo se verifica |
|---|---|---|
| 1 | Existen marcos SVG de garabato terracota `#F04E0C` reutilizables (componente único con variantes) | Buscar el componente de marco y sus usos en hero, retrato, panel Comprar |
| 2 | Existen nubes orgánicas crema `#F4E2CD` con borde de lápiz terracota | Inspeccionar `CloudBlob`/`CloudCard` y sus instancias |
| 3 | Fondo de rayas verticales petróleo/crema en Comprar y Cierre, con capa de textura (**trama CSS por defecto; el asset real es opcional**, v2/V12) | Verificar `StripedBackdrop` y las dos secciones; si hay textura, que sea CSS o un tile real < 20 KB |
| 4 | Doodles sueltos (estrella, espiral, subrayado curvo, rayitas) presentes y en `aria-hidden` | Inspección de SVG + atributos |
| 5 | Las tres tipografías cargan: Baloo 2 (700/800), Nunito (400/600), EB Garamond (Italic), vía Google Fonts | Revisar `index.html` y los estilos aplicados |
| 6 | Trilingüe ES/EN/FR con **ES por defecto** y `lang` actualizado | Cambiar idioma y comprobar textos y atributo `lang` |
| 7 | El prellenado de WhatsApp cambia por **sección** y por **idioma** | Abrir cada CTA en los 3 idiomas y leer el `?text=` |
| 8 | Destinos exactos: `https://wa.me/15142968295` y `@vichisboho` únicamente; `rel="noopener noreferrer"` | Revisar todos los `href` del proyecto |
| 9 | **Cero formularios, cero pop-ups, cero bots, cero captura de email** | Buscar `<form>`, `<input>` (salvo nada), overlays y scripts de terceros |
| 10 | **Cero precio del kit** en el DOM; `PriceSlot` funciona por configuración con los tres estados | Buscar importes y probar `kitPrice: null` |
| 11 | Línea de envíos **literal**: `Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $` | Comparar carácter a carácter en Comprar y Cierre |
| 12 | Contenedores de foto real con proporción fija (`4/5`, `1/1`, `3/4`, `16/9`), etiqueta de placeholder **presente y no duplicada** (se acepta etiqueta corta, p. ej. «Foto real» sin repetir el `h3`); ningún stock ni IA. **Recalibrado v2:** se aprueba la etiqueta corta por tarjeta; no se exige la etiqueta larga en las 8 nubes | Inspeccionar `PhotoSlot` y los assets; comprobar que la etiqueta no repite el título en las tarjetas |
| 13 | Responsive correcto a 375 / 768 / 1280, con el CTA visible y alcanzable en los tres | Redimensionar y recorrer los 8 bloques |
| 14 | Objetivos táctiles ≥ 44 px y foco visible en todos los controles (idioma y CTAs) | Recorrer con teclado y medir |
| 15 | Paleta exacta: siete colores autorizados, sin rosa, sin oliva ajeno, sin degradados, sin negros puros | Revisar tokens/estilos y capturas |
| 16 | Jerarquía semántica: un `h1`, `h2` por sección, `h3` en ítems y pasos | Inspeccionar el árbol de encabezados |
| 17 | Presupuesto de palabras **respetado o excepción declarada y aprobada** (§3.1 + las excepciones de texto oficial protegido: 6 ítems del kit y el cuerpo del Mail Club, `02-copys.md §4.3`), y ninguna sección nueva añadida. **Recalibrado v2:** el presupuesto literal no se exige donde manda el texto oficial de Victoria; prohibido «recortar para cumplir» | Contar textos y listar bloques 0–7; para las excepciones, comprobar que son texto oficial literal y no copy inventado |
| 18 | Sin estética SaaS: sin sombras difusas, sin glassmorphism, sin bordes rectos genéricos, sin iconos de librería | Revisión visual contra el boceto `IMG_0314.png` |
| 19 | **Subtítulo del hero dentro de píldora/nube crema con texto chocolate, o bien ≥ 24 px si va crema sobre petróleo** (MAYOR-01) | Inspeccionar `Hero.jsx`: el subtítulo no puede ser un `<p>` crema de 17 px directo sobre `#1B7A63`; medir el texto y el fondo reales del nodo |
| 20 | **Ningún texto directamente sobre `StripedBackdrop`**: paneles crema sólidos en bloques 5 **y** 7 (MAYOR-02) | Inspeccionar el DOM: cada nodo de texto de Comprar y Cierre tiene un ancestro con fondo `#F4E2CD` opaco; comprobar el par de contraste efectivo y que las rayas no cruzan ninguna letra |
| 21 | **Keyline chocolate + halo crema del CTA primario presentes en el CSS real** (condición del QA a la deuda declarada) | Inspeccionar el botón terracota en el DOM/CSS: `outline`/`border`/`box-shadow` chocolate y aro crema visibles, no solo descritos en el documento; si falta, la deuda pasa a fallo |
| 22 | **`vector-effect="non-scaling-stroke"`** (o marco por relación de aspecto con `viewBox` propio) en los SVG de marco y nube | Inspeccionar los `<path>` de `SquigglyFrame`/`CloudBlob` y redimensionar de 375 a 1280: el trazo no debe engordar ni estirarse (V1) |

**Puerta 2 aprueba solo si los 22 ítems son verificables en el código entregado.** Cualquier ítem no comprobable se marca como incidencia, no como "pendiente de criterio".

**Cambios del checklist en v2:** ítems **12** y **17 recalibrados** (harían fallar el entregable por motivos ya aprobados en la Puerta 1: etiqueta duplicada del placeholder y presupuesto literal frente a texto oficial protegido); ítem **3** ajustado a la textura opcional; **cuatro ítems nuevos** —19 subtítulo en píldora (MAYOR-01), 20 nada de texto sobre rayas (MAYOR-02), 21 keyline + halo en CSS real (condición del QA), 22 `non-scaling-stroke` (V1)—. De 18 a 22, sin tocar el contenido de los ítems 1, 2, 4–11, 13–16 y 18.

---

## 10. Traspaso a las fases siguientes

- **Copywriter:** respetar los presupuestos de §3.1; entregar textos por bloque con el mismo número de líneas en ES/EN/FR; microcopys de CTA y prellenados **canónicos de `02-copys.md §6.2`** (prefijo `wa.`; la tabla de §4.2 de este documento está sustituida); nunca inventar precio, prueba social ni plazos de entrega. Pendiente de v2 del copy: `meta.title` / `meta.description` / `ogAlt` (MENOR-12 del técnico) y el teléfono visible en `buy.note` (MAYOR-06/M1).
- **Frontend:** componentes de §5.1 con sus reglas de uso **y el mapa de archivos de §5.2 — incluido `src/components/SiteFooter.jsx` para el cierre: no se inventa ningún otro nombre de archivo**; tokens y retícula de §3.3; estados del `PriceSlot` de §6; comportamiento responsive de §7 (orden móvil del hero en §3.2); **deuda de contraste del CTA de §8.2 con keyline + halo reales en el CSS**, token `--btn-ink` por configuración; **`vector-effect="non-scaling-stroke"`** en los SVG de marco/nube; **textura opcional** (trama CSS por defecto, §8.4); `<noscript>` con envíos y WhatsApp en `index.html`.
- **Verificador y QA:** checklist de §9 (**22 ítems** en v2) como lista de comprobación literal, más revisión visual de que la página parece dibujada a mano y no una plantilla. Los ítems 12 y 17 se leen **en su versión recalibrada**: no exigen etiqueta larga en las tarjetas ni presupuesto literal donde manda el texto oficial protegido.

---

## 11. Registro de cambios v2 (Puerta 1)

**Versión v2 del documento — correcciones de la Puerta 1 aplicadas** sobre `01-cro.md` v1 (452 líneas). Fuentes: `docs/puerta1-tech.md` (7 MAYORES, 0 bloqueantes) y `docs/puerta1-qa.md` (dictamen CAMBIOS REQUERIDOS: M2 y m7–m13 dentro de este documento). Ninguna corrección tocó los 8 bloques, ni los textos de CTA (los fija el copy), ni la paleta, ni las 3 tipografías, ni los presupuestos aprobados, ni se inventó precio, plazo, formulario o prueba social.

| ID del hallazgo | Qué cambió | Línea(s) v2 | Estado |
|---|---|---|---|
| **MAYOR-01** | Subtítulo del hero: se elige la **opción (a)**, píldora/nube crema con texto chocolate (11,35:1). Se especifica forma (nube-píldora, radio 999 px, contorno de garabato terracota 2,5 px, padding 12/20 px en 375 y 12/24 px en escritorio, ancho `fit-content` → 100 % en ≤ 480 px, 2 líneas ES/EN y hasta 3 en FR) y se corrigen las dos afirmaciones contradictorias de v1. Se añade la regla «texto crema sobre petróleo solo ≥ 24 px o bold ≥ 18,66 px» y el ítem 19 del checklist | 127, 130, 230, 411, 425, 438, 502 | APLICADO |
| **MAYOR-02** | Cierre: **todo el texto sobre panel crema sólido** dentro del marco rayado; las franjas quedan como escenografía perimetral (40–56 px, nunca detrás de una letra). Reformulada la fila de paleta del bloque 7, añadida nota y regla general en §3.1, fila del Cierre en §7 y **ítem 20** del checklist | 199–202, 223, 326, 404, 503 | APLICADO |
| **MAYOR-03** | Promesa «funcional sin JavaScript» reformulada a la versión viable con CSR: contenido en el DOM tras hidratar, `<noscript>` con la línea de envíos y el enlace de WhatsApp, `<title>`/meta reales en el HTML. Sin SSR | 470–475 | APLICADO |
| **MAYOR-04** | §8.2 reescrita como **deuda de marca declarada**: 2,86:1 < 3,0:1 → **no cumple AA en ningún tamaño**; se retira el argumento «≥ 20 px clasifica como texto grande». Condición verificable en la Puerta 2 (keyline + halo en el CSS real, **ítem 21**), decisión explícita de Victoria entre mantener crema (deuda) o activar `--btn-ink: chocolate` (3,96:1, AA-large) | 443–453, 504 | APLICADO CON CONDICIÓN (decisión D-CTA de Victoria y verificación en Puerta 2) |
| **MAYOR-07** | CTA del navbar convertido en **secundario permanente** (píldora crema, texto chocolate 11,35:1, contorno terracota 2,5 px): nunca relleno terracota, ni siquiera tras el hero, porque convive con todos los bloques. Actualizadas la regla de jerarquía, la fila del navbar, la tabla de CTAs, `ButtonPrimary`/`ButtonSecondary` y §4.3. **Se descarta la variante «relleno terracota después de pasar el hero»**: en el tramo de Comprar coincidiría con el primario protagonista y volvería a romper la regla; mantenerlo secundario es la única solución estable en todo el scroll | 53, 115, 274, 311, 331–332 | APLICADO |
| **M2** (QA) | Orden móvil del hero **H1 → eslogan → subtítulo (píldora) → CTA ancho completo → foto** en §3.2 y §7, con la justificación aritmética (~430 px de 667) y la garantía de que el subtítulo entra en el primer viewport. **La composición de escritorio no cambia** | 130, 230, 238, 398, 411 | APLICADO |
| **m7** (QA) | De «2 líneas máximo por tarjeta» a **máx. 3 líneas** a 375 px (`CloudCard`), y de «envíos en 2 líneas» a **hasta 3 líneas, nunca por debajo de 14 px** (`ShippingLine` y §7) | 329, 340, 402 | APLICADO |
| **m8** (QA) | Contradicción navbar/hero resuelta por MAYOR-07; revisadas **todas** las menciones de jerarquía (tesis, §1.2, §2.1, §2.2, §4.1, §4.3, §5.1, §7, §9) para que el navbar sea secundario en todas | 53, 115, 274, 311, 331 | APLICADO |
| **m10** (QA) | §4.2 marcada como **TABLA SUSTITUIDA**: las claves canónicas son las de `02-copys.md §6.2` con prefijo `wa.` (`wa.nav`, `wa.hero`, `wa.kit`, `wa.steps`, `wa.buy`, `wa.victoria`, `wa.mailclub`, `wa.footer`). La tabla no se borra: queda como referencia histórica. Las claves de §1.2 y §4.1 se actualizan a `wa.*` | 36–49, 274–282, 291–300 | APLICADO |
| **m13** (QA) | CTA secundario «Preguntar por el kit» **repetido tras la cuarta nube** (filas 3a y 3b de §4.1): no es sección nueva, es el mismo botón y la misma clave `wa.kit`. Documentado en §2.4 y §3.2: pasa a **2 apariciones, ambas secundarias** | 154, 232, 276–277 | APLICADO |
| **Checklist §9** | Recalibrados los ítems **12** (etiqueta de placeholder no duplicada; se acepta etiqueta corta) y **17** (presupuesto respetado **o excepción declarada** por texto oficial protegido); ítem 3 ajustado a la textura opcional; **4 ítems nuevos (19–22)**: subtítulo en píldora, nada de texto sobre rayas, keyline + halo en CSS real, `non-scaling-stroke`. De 18 a 22 ítems | 486, 495, 500, 502–505, 509 | APLICADO |
| **`SiteFooter.jsx`** | Nueva **§5.2 Mapa de archivos**: el bloque 7 (Cierre) se implementa en `src/components/SiteFooter.jsx`, con la justificación (el encargo lista 8 archivos y no incluye el cierre; el cierre es *chrome*, no sección nueva; `FooterMailClub.jsx` es el bloque 6 y no debe mezclarse) y la tabla archivo → bloque para que frontend no improvise | 344–365 | APLICADO |
| **Aritmética del CTA** | «Siete puntos de contacto» → **ocho**, con la tabla de §1.2 completada (faltaba el punto de contacto de Victoria) y el recuento explícito: **8 claves `wa.*` + 2 enlaces de Instagram = 10 enlaces**, **9 apariciones** del botón de WhatsApp porque `wa.kit` sale dos veces (m13) | 9, 36–49, 285–287 | APLICADO |
| **V12 · textura de papel** | Textura declarada **opcional**: por defecto **trama CSS de puntos al 4 %** (cero peticiones), sin binarios inventados y sin `feTurbulence`; si llega un tile real < 20 KB se sustituye sin tocar componentes. Alineado en §8.4, §5.1 (`PaperTexture`) y ítem 3 del checklist | 326–327, 468, 486 | APLICADO |

**Decisiones nuevas que el frontend debe conocer (resumen):**

1. **Navbar = secundario permanente** (píldora crema). No hay ningún estado en el que se rellene de terracota.
2. **Subtítulo del hero = píldora crema** con contorno de garabato terracota, texto chocolate 17 px; en ≤ 480 px ocupa el ancho menos gutters.
3. **Cierre (`SiteFooter.jsx`) = panel crema sólido** sobre el marco rayado; el bloque 5 hace lo mismo con su panel.
4. **Dos apariciones del CTA del kit** (tras la 4.ª nube y al final), misma clave `wa.kit`, mismo estilo.
5. **`vector-effect="non-scaling-stroke"`** obligatorio en marcos y nubes.
6. **Textura opcional** (trama CSS por defecto).
7. **`--btn-ink`** existe desde el día uno con valor por defecto crema; `chocolate` es el alterno que elimina la deuda de contraste.

**Dependencias de otros documentos (no bloquean la Puerta 2):** el **teléfono visible en el bloque 5** (`buy.note`) y las claves **`meta.title`/`meta.description`/`ogAlt`** dependen de **`02-copys.md` v2** (MAYOR-06/MENOR-12 y M1 del QA). «Diciembre 2026» como etiqueta del bloque 5 (M3 del QA) también depende de `02-copys.md` v2. Este documento ya prescribe el hueco y la regla; el texto lo pone el copy.
