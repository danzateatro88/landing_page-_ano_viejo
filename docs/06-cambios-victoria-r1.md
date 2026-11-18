# Cambios pedidos por Victoria — ronda 1 (16 nov 2026)

Tres cambios recibidos después de la entrega de la Puerta 2. Se registran aquí porque
**modifican decisiones que estaban aprobadas en los documentos** (`_contexto-encargo.md`,
`01-cro.md`, `02-copys.md`): manda la clienta, pero el registro tiene que quedar honesto.

---

## C-01 · Quitar el «Hibérnate» del hero

**Qué pidió:** «retira el texto debajo del primer título donde dice hibernate».

**Qué era:** el encargo lo listaba como **eslogan** del hero (`_contexto-encargo.md` §5.1) y
el copy lo entregó en tres idiomas (`hero.tagline`: «Hibérnate» / «Hibernate» / «Hiberne»).

**Qué significaba en realidad:** en el boceto `IMG_0314.png` esa palabra era una **muestra
de la tipografía** que Victoria quería para los textos, no un texto de la página.

**Qué se hizo:**
- Se elimina el nodo del hero y la clave `hero.tagline` de los tres idiomas (diccionario:
  113 claves de copy por idioma, antes 114).
- El subrayado de lápiz que colgaba de esa palabra pasa a subrayar el titular.
- El espacio que ocupaba se recupera para la foto: **285–320 px visibles** del producto en
  el primer pantallazo de un móvil de 375 × 667 (el mínimo exigido era 150).

---

## C-02 · La estrella, al lado del titular

**Qué pidió:** «la estrella al lado de donde escribiste hibernate, posicionala al lado de
donde dice *Vichito, el año viejo*».

**Qué se hizo:** la estrella mostaza (`Doodle variant="star"`) queda **en línea al final del
H1**, con una rotación de 8° y sin solaparse con el texto ni con el subrayado, en 375, 768 y
1280 px. Sigue siendo decorativa (`aria-hidden`), así que no se anuncia a lectores de pantalla.

---

## C-03 · La tipografía de los textos

**Qué pidió:** «ese tipo de fuente que mi esposa quería usar en los textos en la página…
si conoces esa fuente *Hibernate*, úsala como tipo de fuente para los textos».

**Qué se encontró:** existen varias fuentes llamadas «Hibernate». La que coincide con el
gesto manuscrito del boceto es una **script de mano de Graphicfresh/sameehmedia** distribuida
en Envato/Creative Fabrica: licencia **gratuita solo para uso personal**; el uso comercial
—una tienda— exige comprarla. No está en Google Fonts, así que tampoco se puede enlazar:
habría que alojar el archivo y tener la licencia. **No se ha usado**: incrustar una fuente
sin licencia en la web de un negocio es un riesgo legal para Victoria.

**Qué se hizo (decisión provisional, reversible en una línea):**
- Se crea el token **`--font-copy`** en `src/index.css` y la clase **`.copy`**: un único punto
  de cambio para toda la tipografía de los textos.
- Provisionalmente se usa **Caveat** (Google Fonts, licencia OFL, uso comercial libre), la
  manuscrita gratuita que más se acerca al trazo del boceto.
- Se aplica a los **textos narrativos**: la tradición, las 8 líneas del kit, los 3 pasos, la
  historia de Victoria, el Mail Club, la frase de Comprar, la nota de empaque y la firma del pie.
- **No** se aplica a lo funcional —botones, línea de envíos, teléfono, etiquetas, `aria-label`—
  que sigue en Nunito por legibilidad, ni a los títulos, que siguen en Baloo 2.
- Tamaños subidos para compensar la letra pequeña de Caveat: tradición 21/24 px, kit 18 px,
  pasos 20/21 px, Victoria 21 px, Comprar 21 px.

**Si Victoria compra la licencia de Hibernate:** basta dejar el `.woff2` en `public/fonts/`,
declarar el `@font-face` y cambiar `--font-copy` a `'Hibernate', 'Caveat', cursive`. Cinco
minutos, sin tocar ni un componente.

**Alternativas gratuitas ya vistas en pantalla:** *Caveat* (la elegida, más elegante y
fluyente), *Kalam* (más marcador, algo más legible) y *Handlee* (más sobria). Y siempre queda
la opción anterior: EB Garamond en itálica, una serif clásica muy legible.

---

## Verificación de que nada se rompió

| Comprobación | Antes | Ahora |
|---|---|---|
| Líneas por tarjeta del kit a 375 (máx.) | 2 | **2** (límite: 3) |
| Líneas por paso a 375 (máx.) | 3 | **3** (límite: 3) |
| Foto visible en el primer viewport (375 × 667) | 300–324 px | **285–320 px** (mínimo: 150) |
| Desbordamiento horizontal a 375 (ES/EN/FR) | 0 | **0** |
| «Hibérnate» visible en el DOM | sí | **no** (en los tres idiomas) |
| Altura total de la página a 375 | 8.024 px | 8.051 px (ES) · 8.122 px (FR) |
| Build | verde | **verde** · 88,12 kB JS gzip · 7,13 kB CSS gzip |

---

## Pendiente de ratificar

- **La tipografía definitiva.** Caveat es la propuesta; si Victoria prefiere la Hibernate
  licenciada, Kalam, Handlee o volver a la serif itálica, se cambia en `--font-copy`.
- Las tres decisiones de publicación que siguen abiertas: fotos restantes, alcohol en el
  envío y fecha límite de pedidos.

---

## C-04 · Dos cuadros por fila en el móvil

**Qué pidió:** que en «Qué trae el kit», al hacer scroll, se vean **dos cuadros por línea**
y no uno solo con su imagen y su descripción.

**Qué se hizo:**
- La retícula pasa de 1 columna a **2 columnas desde 375 px** (2 en tableta, 4 en escritorio).
- La foto de cada pieza va **apaisada (4/3) mientras hay 2 columnas** y pasa a cuadrada (1/1)
  solo a partir de 1024 px, donde la retícula ya es de 4. Con 1/1 a 768 px la foto medía 340 px
  de alto y el bloque crecía a 2.379 px.
- Se ajustó el interior de la tarjeta: título `0.9→1.2 rem`, línea de copy 15,5 px en móvil,
  montaje de foto más fino, etiqueta del marcador en versión compacta («Foto real:» en una
  sola línea) y **20 px de aire inferior** para que el texto no roce el bucle del marco.
- Las tarjetas ya **no comparten altura**: cada nube envuelve su contenido (efecto collage, como
  el boceto) en vez de dejar huecos de papel vacío bajo las descripciones cortas.

**Efecto medido a 375 px:** el bloque pasa de **3.269 px a 1.593 px** (−51 %) y la página de
**8.051 px a 6.393 px**. El botón «Comprar el kit» queda a **6,4 pantallas** en vez de 9.

**Deviación consciente:** la regla «máximo 3 líneas de copy por tarjeta» (D-R2-6) **ya no
aplica** en la retícula de 2 columnas del móvil: con 162 px de ancho, la línea más larga de
Victoria («para escribir tu lista de intenciones 2027 y tu lista de agradecimientos 2026»)
ocupa 5–6 líneas. Se mantiene intacto el texto oficial y se prioriza que las dos tarjetas se
vean juntas, que es lo que pidió la clienta.

---

## C-05 · Fuera el botón intermedio del kit

**Qué pidió:** quitar «Preguntar por el kit» que estaba en la mitad, entre los cuadros.

**Qué se hizo:** se elimina el nodo del CTA intermedio. El inventario se lee de corrido,
sin cortes, y queda **un solo CTA al final del bloque**, visible en todos los anchos.
Verificado en el DOM: `#kit` pasa de 2 enlaces a **1**, y es el de cierre.

*Nota de registro:* este CTA venía de la Puerta 1 (hallazgo m13: «la duda nace a la cuarta
nube»). Con la retícula de 2 columnas el bloque mide 1.358 px en el móvil y la duda ya no
está tan lejos, así que retirarlo no deja la página sin puerta: el CTA fijo del navbar sigue
accesible en todo el scroll.

## C-06 · Fuera la caja de la nota de empaque

**Qué pidió:** quitar la caja que dice «Caja kraft con ventana + papel picado rojo».

**Qué se hizo:** se apaga el interruptor `content.showPackagingNote` en
`src/data/siteConfig.js` (ahora `false`), que es el mecanismo previsto para esto. La caja
desaparece de la página y el texto sigue guardado en el diccionario: si algún día lo quiere
de vuelta, se pone `true` y reaparece sin tocar ni una línea de componente.

---

## Estado después de C-04 · C-05 · C-06

| Medida | Antes de esta ronda | Ahora |
|---|---|---|
| Alto del bloque del kit a 375 px | 3.269 px | **1.358 px** |
| Alto total de la página a 375 px | 8.051 px | **6.158 px** |
| CTAs del kit | 2 | **1** |
| Nota de empaque en el DOM | sí | **no** |
| Desbordamiento horizontal (375/768/1280) | 0 | **0** |
| Build | verde | **verde** · 88,20 kB JS gzip |

---

## C-07 · El fondo rayado detrás de la foto del hero

**Qué pidió:** poner detrás de la foto del kit el mismo fondo del bloque Comprar
(rayas verticales petróleo/crema).

**Qué se hizo:** la foto del hero vive ahora dentro de una banda `StripedBackdrop`
—rayas verticales de 28 px alternando petróleo y crema, con textura de papel y el
**marco de bucles terracota** en el borde, exactamente el recurso del bloque 5—.
La banda sangra hasta los bordes de la pantalla en móvil y ocupa la columna de la
foto en escritorio.

Detalles de la solución:
- La foto va **pegada sobre el papel como un sticker** (sin paspartú crema y sin
  segundo marco de bucles: dos marcos anidados están prohibidos por la API de
  componentes y habrían duplicado el garabato).
- El bucle del marco se mantiene con `vector-effect="non-scaling-stroke"`, de modo
  que el trazo no se deforma a ningún ancho.
- Se conservó la espiral mostaza de la esquina y la sombra dura tipo sticker.

**Medido:** foto de 327 px de ancho a 375 px de pantalla (−2 % respecto a antes,
porque la banda necesita su aire), **285 px de foto visibles en el primer
pantallazo** (el mínimo del acta era 150) y cero desbordamiento horizontal en
320 / 360 / 375 / 430 / 768 / 1280 px en los tres idiomas.

*Nota:* se probaron cinco variantes antes de dar con esta (banda con marco propio
y panel crema dentro, foto centrada, banda solo arriba y abajo…). Las descartadas
dejaban las rayas en 10–15 px —invisibles— o encogían la foto por debajo de 270 px.
El criterio final: la foto manda y las rayas se leen.

---

## C-08 · La tinta de la marca: del marrón al verde bosque

**Qué pidió:** todos los textos principales, títulos, márgenes, líneas divisorias y
bordes que estuvieran en negro pasan al verde de la marca (verde bosque/pino profundo).

**Qué había:** el encargo definía `#3B2517` (marrón chocolate) como «texto oscuro y
contornos en lugar de negro puro». Se usaba en **39 clases de texto**, en los bordes y
keylines, en las **sombras duras tipo sticker** y en las líneas de guía.

**Qué se hizo:** se sustituye el token completo. El color de tinta de la marca es ahora
**`#134E35` · verde bosque**, y el token pasa a llamarse `--color-tinta` (antes
`--color-chocolate`, que ya no describía nada). Se actualizaron las 39 clases
`text-chocolate`, los `border-*`, los `outline-*`, las 9 apariciones del hex en sombras
y las 5 con `rgba(59,37,23,…)`.

**Contraste comprobado** (medido con la fórmula WCAG, no estimado):

| Combinación | Antes (chocolate) | Ahora (verde bosque) | Veredicto |
|---|---|---|---|
| Texto sobre crema | 11,35:1 | **7,66:1** | AA ✔ (y AAA a partir de 14 px bold) |
| Texto sobre mostaza | 8,67:1 | **5,85:1** | AA ✔ |
| Texto sobre terracota | 3,96:1 | 2,67:1 | No se usa: el botón lleva etiqueta crema |
| Texto sobre petróleo | 2,74:1 | 1,85:1 | Prohibido ya antes: todo texto vive sobre crema |
| Anillo de foco sobre crema | 11,35:1 | **7,66:1** | ✔ (con halo mostaza sobre petróleo) |

**Auditoría automática de todos los nodos de texto** (375 y 1280 px, ES): **0 fallos
nuevos**. Los dos únicos avisos son el CTA terracota con etiqueta crema (2,86:1), que es
la **deuda de marca ya declarada** en la Puerta 1 y que se mantiene con su keyline y su
halo, porque el verde sobre terracota sería aún peor (2,67:1).

**Nota de diseño:** las sombras duras «tipo sticker» ahora son verdes. Sobre fondo crema
siguen leyéndose; sobre petróleo pierden algo de relieve porque el verde se acerca al
fondo. Si se quiere recuperar ese golpe visual, lo correcto sería una sombra verde más
oscura (`#0E3A28`) solo en las tarjetas que viven sobre petróleo; queda a la espera de
que lo veas en pantalla.

---

## C-09 · Entran las diez fotos reales

**Qué llegó** (17 nov 2026, carpeta `imagenes/`): la **nueva foto del kit** —misma
composición, pero con fondo **petróleo** en vez de magenta, mucho más de marca— y las
fotos de las piezas: cuco, calsoncillo, maleta, dinero, lapicero, alcohol, lentejas,
tarjeta de rituales, más el retrato de Victoria.

**Qué se hizo:**
- Originales intactos en `imagenes/`; copias web en `public/photos/` (hero y retrato
  1200×1500 a 78 % de calidad; piezas a 900 px). **Peso total de fotos: ~1,2 MB.**
- El **hero** usa la foto nueva del kit.
- Las **ocho piezas** del bloque «Qué trae el kit» ya son fotos reales, en el orden del
  texto, tomadas de `siteConfig.photos.kitItems`.
- **Victoria** aparece con su retrato recortado (PNG con transparencia) sobre el papel
  crema: es literalmente el estilo collage del kit.
- Se añadió el prop `fit` a `PhotoSlot` (`cover` para fotos, `contain` para recortes con
  transparencia, que así flotan sobre el papel en vez de llevar un recuadro blanco).

**Mapeo y una decisión que conviene saber:**
| Pieza | Archivo |
|---|---|
| El bichito del Año Viejo | **recorte del muñeco tomado de la foto del kit** (no había foto suelta) |
| Stickers de los calzones amarillos | `cuco.png` (calzón de encaje, con transparencia) |
| La maleta de viaje | `maleta.jpeg` (se muestra entera: `contain`) |
| El billete separador | `dinero.jpeg` |
| Un lapicero · El alcohol · Las lentejas | `lapicero.JPG` · `alcohol.JPG` · `lentejas.JPG` |
| Las tarjetas del ritual | `tarjeta de rituales.png` (con transparencia) |
| Victoria en su taller | `foto vicky.png` (con transparencia) |

`calsoncillo.png` es **otra** ilustración de calzón (el brief), así que quedó sin usar por
ahora: va perfecta si prefieren esa en lugar del encaje.

**Observación honesta:** cinco piezas (maleta, billete, lapicero, alcohol, lentejas) son
recortes sobre **fondo blanco**. Sobre las tarjetas crema se ven como una foto pegada, y
funciona, pero si algún día las reexportan con fondo crema o petróleo la página gana
coherencia. No se retocó ninguna: son las fotos reales.

---

## C-10 · El botón montado sobre la foto

**Qué pidió:** «la cliente quiere que los botones queden sobre la foto, algo así como este
ejemplo» (el ejemplo eran dos tarjetas del ritual superpuestas).

**Qué se hizo:** el CTA principal del hero dejó de ser un botón más en la columna de texto
y pasó a estar **montado sobre la fotografía**, con su sombra dura y una inclinación de 2°,
como papel encima de papel:
- **Móvil:** el botón se apoya sobre el borde superior de la foto (solapa 32 px) y sigue
  dentro del primer pantallazo, porque el botón de compra no puede caer bajo el pliegue.
- **Tableta y escritorio:** el botón flota sobre el borde inferior de la foto, centrado,
  con la inclinación.

**Medido:** solape real de **32 px** en móvil y **57 px** en escritorio; el CTA termina en
y=342 en un viewport de 667 (visible completo) en ES, EN y FR; cero desbordamiento
horizontal entre 320 y 1280 px.

---

## C-11 · Fondo blanco fuera: las piezas flotan sobre el papel

**Qué pidió:** que lapicero, alcohol, maleta, billete y lentejas tengan el mismo fondo
que las tarjetas del ritual (el crema de la tarjeta), como el calzón amarillo.

**Qué se hizo:** recorte de fondo con Python/Pillow, sin retocar la foto:
1. Se identifica el fondo por **baja saturación + alta luminosidad** (las fotos son de
   estudio con fondo neutro).
2. Se rellena **desde los bordes** hacia dentro, así que solo desaparece el fondo
   conectado al borde: los blancos internos (la etiqueta del frasco, el papel del
   billete) se conservan.
3. Borde suavizado (1 px) para que no queden dientes de sierra.
4. Recorte al contenido y exportación a PNG con transparencia.

Resultado: **96,4 % de fondo eliminado** en el lapicero, **96,5 %** en el alcohol,
**93,3 %** en las lentejas. En maleta (41 %) y billete (46 %) el fondo era blanco puro,
así que el porcentaje corresponde a los márgenes.

Las cinco piezas pasan a `fit: 'contain'` y flotan sobre el papel crema, igual que los
calzones y las tarjetas.

**Lo único que no se pudo igualar:** el **bichito**. No hay foto suya suelta y el recorte
disponible (tomado del flat lay) tiene detrás la caja kraft y el fondo petróleo. Se queda
como foto; si llega una toma del muñeco sobre fondo blanco, se recorta igual que las demás.

---

## C-12 · Los dos calzones en la misma tarjeta

**Qué pidió:** mostrar las dos opciones de calzón en el cuadro «Stickers de los calzones
amarillos».

**Qué se hizo:** se compone una sola imagen con las dos ilustraciones —el de encaje y el
brief—, cada una girada unos grados y superpuestas como stickers del kit. Es un PNG con
transparencia, así que se ven las dos sobre el papel crema sin recuadro.

---

## C-13 · El marco de bucles, por delante de la foto

**Qué pidió:** «los bordes resortados deben estar puestos sobre, no detrás de la foto».

**Qué se hizo:** el hero tenía el marco en el borde de la banda rayada (es decir, por
detrás de la imagen). Ahora es un `SquigglyFrame` superpuesto a la foto con `z-10`: el
resorte terracota se dibuja **encima de la imagen**, ajustado al borde (`inset-0`, bucle
de 12 px, trazo 2,8 px) para que se apoye en el margen de la foto y no se coma el producto.

---

## C-14 · El botón de compra, fuera de la foto

**Qué dudó:** «no sé si el primer botón de comprar el kit esté bien ahí tan pegado y encima
de esa misma foto».

**Qué se hizo:** se retira el solape. El CTA vuelve a la columna de texto, debajo de la
píldora del subtítulo, con 20 px de aire (antes de la prueba de collage estaba a 16 px).
Queda limpio, en el primer pantallazo y sin pisar la imagen. Si se quiere recuperar el
efecto collage, es una clase de Tailwind.

---

## Nota de peso (C-11 a C-14)

Las imágenes con transparencia se pasaron a **WebP** y se ajustaron a su tamaño real de
uso: la carpeta de fotos bajó de **3,62 MB a 1,0 MB** sin perder calidad visible, y se
borraron los archivos que quedaron sin uso.

| Archivo | Tamaño |
|---|---|
| `hero-vichito.jpg` | 461 KB (la foto principal, la que más pesa a propósito) |
| `victoria.webp` | 122 KB |
| `kit-tarjetas.webp` | 58 KB · `kit-billete.webp` 46 KB · `kit-stickers.webp` 28 KB |
| `kit-maleta.webp` · `kit-lentejas.webp` · `kit-alcohol.webp` · `kit-lapicero.webp` | 28 · 19 · 15 · 10 KB |
| `kit-bichito.jpg` | 218 KB (foto, aún sin recortar) |

Verificado tras el cambio: **10/10 imágenes cargan**, 0 marcos vacíos, 0 desbordes,
página 6.212 px en móvil.

---

## C-15 · El resorte también encima del panel de Comprar y del cierre

**Qué pidió:** el mismo tratamiento del hero («que queden sobre el cuadro que lo
contiene») en el cierre —`vichisboh*`, WhatsApp, `@vichisboho`, la línea de envíos y
«Hecho a mano en Montreal»— y en el panel «Diciembre 2026 · Pide tu kit».

**Qué se hizo:** en los dos bloques el marco de bucles vivía en el borde de la banda
rayada, es decir **detrás** del panel crema. Ahora:
- La banda rayada queda como escenografía, **sin** marco propio.
- El panel crema lleva un `SquigglyFrame` superpuesto con `z-10`: el resorte terracota se
  dibuja **por delante del papel**, ajustado a su borde (bucle 13 px, trazo 3 px).

**Ajuste necesario:** al pasar el marco por delante, el botón «Comprar el kit» quedaba
tocado por los bucles. Se subió el aire interior del panel de Comprar a **28 px** (28 en
móvil, 40 en tableta, 56 en escritorio): medido en el DOM, el botón queda a **28 px** del
borde por cada lado y el bucle pasa por fuera.

Verificado a 375 y 1280 px: ningún texto ni botón cruzado por el trazo, cero
desbordamiento, página 6.220 px en móvil, build en verde.

---

## C-16 · Las estrellas y el espiral de las esquinas, hacia dentro

**Qué pasó:** al pasar el marco de bucles por delante del papel (C-13 y C-15), los doodles
que estaban pegados a la esquina quedaron **tapados por el trazo**:
- Cierre: la **estrella** terracota (arriba a la izquierda) y el **espiral** mostaza
  (abajo a la derecha).
- Comprar: la **estrella** mostaza (arriba a la derecha).

**Qué se hizo:** se movieron hacia dentro y se subieron a `z-20`, por encima del resorte:

| Doodle | Antes | Ahora |
|---|---|---|
| Estrella del cierre | `top-2.5 left-3` | `top-7 left-7` (28 px) · `sm: top-8 left-10` |
| Espiral del cierre | `right-3 bottom-2.5` | `right-7 bottom-7` · `sm: right-10 bottom-9` |
| Estrella de Comprar | `top-2.5 right-2.5` | `top-7 right-7` · `sm: top-8 right-10` |

**Comprobado:** la estrella de Comprar no toca la píldora «Diciembre 2026 / Décembre 2026»
(solape medido = **0 px²** en español y en francés, que es el idioma con la etiqueta más
larga). Las tres formas quedan enteras, dentro del papel y visibles por encima del borde.

---

## C-17 · Ensayo: el borde «bordado» como el de las tarjetas del kit

**Qué pidió:** que los bordes de la página se parezcan al de las tarjetas del ritual, y
probar primero en **un solo cuadro**, con opción a devolverlo.

**Qué se hizo:** el motor de marcos gana un parámetro nuevo, `hand` (0–1), que aplica un
**temblor determinista** a los puntos del resorte antes de dibujarlos:
- desplazamiento a lo largo de la curva y en perpendicular, con dos armónicos distintos
  (el pulso de la mano va y viene, no es ruido);
- un pequeño azar extra por punto, con PRNG con semilla: el dibujo es **idéntico en cada
  render** y no rompe la hidratación de React.

**Dónde se probó:** solo en el **cierre** (`footer`), con `hand={0.5}`, bucle 18 px y
trazo **4,6 px** (antes 3): el trazo grueso es lo que hace que se lea como rotulador.

**Comparación en la misma página:** el cierre tiene el borde nuevo; «Pide tu kit» conserva
el anterior. Así se ven los dos sin cambiar de pantalla.

**Cómo se devuelve (30 segundos):** en `src/components/SiteFooter.jsx`, quitar `hand={0.5}`
y dejar `loop={13} strokeWidth={3}`. Nada más: el valor por defecto de `hand` es 0, así
que el resto de la página **no ha cambiado** ni un píxel.

**Si gusta:** se aplica a los tres marcos que quedan (foto del hero, panel de Comprar y las
8 tarjetas del kit) con los mismos parámetros, en una sola pasada.

---

## C-18 · El borde «bordado» en toda la página (opción 4)

**Qué eligió Victoria:** aplicar el borde del ensayo a todo.

**Qué se hizo:** el temblor pasa a ser el **comportamiento por defecto** del motor de
marcos (`hand = 0,55`), y se subió el grosor del trazo en todas las primitivas:

| Dónde | Antes | Ahora |
|---|---|---|
| Marco de la foto del hero | trazo 2,8 | **3,8** |
| Fotos (hero y retrato) | 3,2 | **4,2** |
| Nubes y tarjetas (`CloudBlob`) | 3,2 · píldoras 2,4 | **3,9** · píldoras 2,6 |
| Panel de Comprar | trazo 3 | **4,4** |
| Cierre | trazo 3 | **4,6** |

Con esto, **todos** los marcos de la página —las 8 tarjetas del kit, la nube de la
tradición, los 3 pasos, la tarjeta del Mail Club, las fotos, los paneles rayados— tienen el
mismo trazo grueso e irregular.

**Un efecto que hay que saber:** el marco del hero va **encima de la foto**, así que los
bucles se apoyan en su borde y tapan un poco los rótulos que la propia foto trae impresos
(«Lista de deseos…», «Billete separador…»). Es información que la página ya dice en las
tarjetas del kit, así que no se pierde nada — pero si molesta, hay dos salidas: bajar el
marco a la banda rayada (por detrás de la foto) o pedir una foto sin rótulos.

**Verificado:** página 6.224 px en móvil, cero desbordamiento a 375 y 1280 px, 10/10 fotos
cargan, build en verde.

---

## C-19 · Compra con selector de entrega, total y Stripe

**Qué pidió Victoria (18 nov 2026):**
1. Los dos primeros CTA («Comprar el kit» del navbar y del hero) **no** van a WhatsApp:
   **bajan** al panel «Pide tu kit».
2. En ese panel: el botón **cobra con Stripe**, la entrega pasa a ser **tres botones
   seleccionables** con su precio, el importe se **suma al kit de 44 $** y el **total**
   es lo que se envía a cobrar.

**Qué se hizo:**

| Pieza | Antes | Ahora |
|---|---|---|
| CTA del navbar | WhatsApp | **ancla `#comprar`** (desplazamiento suave, sin pestaña nueva, con `scroll-margin` para el navbar fijo) |
| CTA del hero | WhatsApp | **ancla `#comprar`** |
| Precio | pendiente (oculto) | **44 $ CAD** por configuración |
| Entrega | línea de texto | **tres botones** (radio accesible): Recogida gratis · Domicilio 5 $ · Canadá 8,95 $ |
| Resumen | — | Kit 44 $ + Entrega + **Total** |
| CTA del panel | WhatsApp | **Stripe** con el total de la entrega elegida |

**Cómo se cobra sin servidor:** un **enlace de pago por entrega**, con el importe ya
cerrado (44,00 · 49,00 · 52,95). Victoria los crea en su panel de Stripe y los pega en
`siteConfig.checkout.stripeLinks`. Mientras estén vacíos, el botón dice «Pedir por
WhatsApp» y abre el chat con la entrega y el total escritos: nunca deja al cliente sin
salida. Probado con enlaces de prueba: el botón cambia a «Pagar 44 / 49 / 52,95 $» y abre
en pestaña nueva. Después se revirtieron las URLs de prueba.

**Verificado en el navegador** (clic real sobre las tres opciones): totales **44 $ · 49 $ ·
52,95 $**; el mensaje de WhatsApp incluye kit, entrega y total; los dos CTA de arriba
desplazan la página hasta el panel (destino a 88 px del borde, con el navbar fijo
descontado); cero desbordamiento; build en verde.

**Nota de negocio:** el precio ya no está «pendiente»: lo fijó la clienta. Cuando cambie,
hay que editar `kitPrice.amount` **y** rehacer los tres enlaces de Stripe.

---

## C-20 · Dos pasos en «Cómo funciona» y «Vichito» con uve

**Qué pidió Victoria (19 nov 2026):**
1. Retirar el **paso 2 «Arma»** de la sección de los pasos.
2. Corregir el nombre del muñeco: donde diga **«bichito»** debe decir **«Vichito»**.

**Qué se hizo:**
- **Fuera el paso «Arma»** del diccionario en los tres idiomas (ES/EN/FR). La sección
  queda con **dos pasos** (`Escribe` y `Quema`), renumerados 1 y 2 por el propio `<ol>`.
- La retícula pasó de 3 a **2 columnas** (centrada, máx. 46 rem) para que las dos nubes
  no queden pequeñas ni dejando un hueco; el doodle de unión se mantiene entre las dos.
- **«bichito» → «Vichito» en las 12 apariciones** del diccionario: título y `alt` del ítem
  del kit, su línea, y la línea del alcohol («para quemar las penas con el Vichito»).
  También en EN y FR (`The Año Viejo Vichito`, `Le Vichito de l'Año Viejo`).
- El archivo de la foto pasó de `kit-bichito.jpg` a **`kit-vichito.jpg`** para que el
  nombre del código coincida con el de la marca.

**Verificado en el DOM:** 0 apariciones de «bichito», 2 pasos en los tres idiomas, las 10
imágenes cargan (ninguna rota), cero desbordes, página 6.546 px, build en verde.

---

## C-21 · Checkout dinámico con servidor (adiós a los enlaces estáticos)

**Qué pidió Victoria:** sustituir los enlaces de pago fijos por **checkout creado en el
servidor**, con el importe calculado y validado en backend.

**Qué se construyó** (`server/`, Node.js + Express):

| Requisito | Cómo queda |
|---|---|
| **Cero precios fijos en cliente** | El navegador solo envía `{ delivery, lang, quantity }`. El total se recalcula en `server/src/catalog.js` con `quote()`. |
| **Validación backend** | 400 si la entrega no es una de las tres, si la cantidad no es un entero 1–5 o si el cuerpo es inválido. |
| **Sesión en tiempo real** | `stripe.checkout.sessions.create` con `price_data` (importe del servidor) + `shipping_options` (la entrega elegida) y `metadata` con el desglose. |
| **CORS estricto y dinámico** | Lista blanca: `CLIENT_URL` + `localhost` (5173/4173/4400) + `EXTRA_ALLOWED_ORIGINS`. Cualquier otro origen recibe **403**. Probado: `evil.example` → 403. |
| **Secretos blindados** | `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET` solo en variables de entorno; `.env` en `.gitignore` (con `!.env.example`). |
| **Retorno seguro** | `success_url` y `cancel_url` se construyen desde `CLIENT_URL`: el pago vuelve siempre al dominio activo. |

**Endpoints:**
```
GET  /api/health    → estado y si Stripe está configurado
GET  /api/pricing   → precios públicos (los usa el frontend para pintar el total)
POST /api/checkout  → { delivery, lang, quantity } → { url }
```

**Frontend:** el CTA pasó de enlace a **botón** que llama a la API; el resumen muestra el
total del servidor; si la API falla, cae a WhatsApp con el total escrito (nunca un callejón).

**Probado de verdad:**
- `POST /api/checkout` con `{"delivery":"montreal","lang":"es","quantity":1}` llega al
  servidor con **solo la intención** (sin precios) y devuelve la URL ✔
- Entrega inválida → **400**; cantidad 9 → **400**; sin clave → **503**; clave falsa → **502** ✔
- CORS: origen no permitido → **403**, preflight permitido → **204** ✔
- En la web: totales 44 $ / 49 $ / 52,95 $ y botón «Pagar 52,95 $» ✔

---

## C-22 · Datos de envío en Stripe y webhook listo sin CLI

**Qué pidió Victoria:**
1. Que el webhook quede **listo en el backend**, sin instalar Stripe CLI ni abrir túneles.
2. Que al elegir **domicilio** o **envío** se pidan **ciudad, código postal, dirección y
   teléfono**, y que **Stripe hable el idioma del cliente**.

**Qué se hizo:**

| Pieza | Detalle |
|---|---|
| **Dirección** | `shipping_address_collection: { allowed_countries: ['CA'] }` solo cuando la entrega es domicilio o resto de Canadá. Stripe pide nombre, dirección, apto., ciudad, provincia y código postal **antes de pagar**. |
| **Teléfono** | `phone_number_collection: { enabled: true }` en las tres opciones (Victoria coordina por WhatsApp). |
| **Recogida** | Sin formulario de dirección: se recoge en el taller. Verificado: `shipping_address_collection: null`. |
| **Idioma de la pasarela** | `locale` sale del idioma de la web: `es-419`, `en-CA`, `fr-CA`. Verificado en Stripe: con la web en francés la sesión abre en **fr-CA**. |
| **Aviso en la web** | Bajo el selector aparece «En el siguiente paso Stripe te pide la dirección y el teléfono para la entrega» (solo en domicilio y envío). |
| **Webhook** | `POST /api/webhook` con firma, tolerancia de 5 minutos y log del pedido con dirección y teléfono. |
| **Prueba sin CLI** | `npm run webhook:test` firma un `checkout.session.completed` con el SDK y lo envía al servidor. Respuesta verificada: **200** + línea `[pedido]` con dirección completa. |

**Comprobado contra Stripe (modo test):**

| Entrega | Dirección | Teléfono | Locale | Total |
|---|---|---|---|---|
| `rest` | `{allowed_countries:['CA']}` | activo | `fr-CA` | 52,95 CAD |
| `pickup` | `null` (no se pide) | activo | `es-419` | 44,00 CAD |

---

## C-23 · «Pagué con domicilio y no me pidió dirección» — causa y blindaje

**Qué pasó realmente.** El pago de la captura se cerró como **Recogida en Montreal**:
la transacción dice `$44.00 CAD` con `Shipping (Recogida en Montreal) $0.00`. El importe
del domicilio son 49 $, así que no hubo envío: la sesión se creó con la opción que venía
**preseleccionada** por defecto.

Y por eso Stripe no pidió dirección: con recogida **no debe pedirla** (se recoge en el taller).
Con domicilio o resto de Canadá sí la pide, y está verificado contra Stripe:

| Entrega | `shipping_address_collection` | Teléfono | Total |
|---|---|---|---|
| `montreal` | `{"allowed_countries":["CA"]}` | sí | 49,00 |
| `rest` | `{"allowed_countries":["CA"]}` | sí | 52,95 |
| `pickup` | `null` (no se pide) | sí | 44,00 |

**Blindaje para que no vuelva a pasar:**
1. **Sin preselección**: al entrar, ninguna entrega está marcada.
2. **El botón no deja pagar** hasta elegir: dice «Elige cómo lo quieres recibir» y está
   deshabilitado; el total muestra «—».
3. Al elegir: el botón pasa a «Pagar 49 $» y debajo aparece **«Estás pagando: kit +
   Domicilio en Montreal»**, para que se vea qué se está pagando antes de salir a Stripe.

**Pantalla de pago confirmado (`CheckoutNotice`).** Stripe devuelve a
`/?checkout=success&delivery=…&session_id=cs_…`. La web **no se fía de la URL**: pregunta
al servidor (`GET /api/session/:id`), que consulta a Stripe. Solo si Stripe dice `paid` se
muestra «¡Pago confirmado!»; si aún no consta, dice «Estamos confirmando tu pago».

Mensajes por forma de entrega (ES/EN/FR):

| Entrega | Mensaje |
|---|---|
| Resto de Canadá | «Te llega por correo en **3 a 5 días**.» |
| Domicilio Montreal | «Te lo entrego en Montreal **el sábado siguiente al pago**.» |
| Recogida | «Puedes recogerlo **2 días después del pago** en **602 12e Ave, H8P 2R5**.» |

Con `?checkout=cancel` aparece «El pago no se completó — no se te cobró nada».

**Probado:** las tres variantes de la pantalla con datos reales de sesión, el estado
«pendiente» con una sesión sin pagar y el estado cancelado. Además se corrigió un fallo que
apareció en la prueba: si la API de precios devolvía algo inesperado, la página se rompía;
ahora se valida la forma y se cae a los precios locales.

---

## C-24 · Códigos de descuento en Stripe

**Qué pidió Victoria:** poder crear códigos de descuento y que el cliente pueda usarlos.

**Qué se hizo:**
- La sesión de pago se crea con **`allow_promotion_codes: true`**: Stripe muestra el campo
  «Añadir código de promoción» en el paso de pago. Verificado en la sesión real:
  `allow_promotion_codes: true`.
- **Victoria crea los códigos en su panel** (Productos → Cupones → Añadir código de
  promoción). No hace falta tocar el código de la web: aparecen solos.
- En la web se añadió el aviso «¿Tienes un código de descuento? Podrás escribirlo en el
  paso de pago» (ES/EN/FR).

**Probado de punta a punta:** se creó un cupón de prueba del 10 % con el código `QA10PRUEBA`,
se comprobó que Stripe lo reconoce en el listado y **se eliminó** para dejar la cuenta como
estaba. La cuenta queda limpia.

**Detalle importante:** el descuento se aplica **al kit**, no al envío (Stripe no descuenta
la tarifa de envío). Los códigos funcionan igual con recogida, domicilio o envío.

---

## C-25 · Fuera la nota «Pedidos de diciembre: te confirmo la fecha por WhatsApp»

**Qué pidió:** retirar esa línea del panel «Pide tu kit».

**Qué se hizo:** se apagó el interruptor `content.showDeliveryNote` en
`src/data/siteConfig.js` (antes `true`, ahora `false`). La frase sigue guardada en el
diccionario, así que se puede recuperar sin tocar componentes.

**Verificado en los tres idiomas:** la frase ya no aparece (ES: «Pedidos de diciembre…»,
EN: «December orders…», FR: «Commandes de décembre…»). El panel baja de alto y queda más
limpio: precio → entrega → resumen → pagar → notas de pago y código de descuento → envíos
y contacto.

*La etiqueta «Diciembre 2026» del encabezado se mantiene: es la temporada, no la nota.*

---

## C-26 · Fuera «El kit sale para Montreal en cuanto se confirma»

**Qué pidió:** retirar esa frase del panel «Pide tu kit».

**Qué se hizo:** la nota bajo el botón de pago decía «Pago seguro con Stripe. **El kit sale
para Montreal en cuanto se confirma**.» Se recortó la segunda frase y quedó solo la señal
de confianza:

| Idioma | Ahora |
|---|---|
| ES | «Pago seguro con Stripe.» |
| EN | «Secure payment with Stripe.» |
| FR | «Paiement sécurisé avec Stripe.» |

**Verificado:** el texto ya no aparece en ninguno de los tres idiomas. El panel baja ~20 px.
Si también se quiere fuera la frase de «Pago seguro con Stripe», se quita en la misma línea
del diccionario (`buy.payNote`).

---

## C-27 · Backend migrado a Vercel Serverless Functions

**Qué pidió Victoria:** unificar todo en Vercel y olvidarse de los tiempos de espera de
Render. Exprimiendo el requisito: extraer la lógica de `server/` a `api/`, adaptarla a
`(req, res)`, apuntar el frontend a rutas relativas y decir si hace falta `vercel.json`.

**Qué se hizo:**

| Antes (`server/`, Express) | Ahora (`api/`, Vercel Functions) |
|---|---|
| `POST /api/checkout` | **`POST /api/create-checkout-session`** |
| `POST /api/webhook` | `POST /api/webhook` (con `bodyParser: false`) |
| `GET /api/session/:id` | `GET /api/session/:id` (`api/session/[id].js`) |
| `GET /api/pricing` | `GET /api/pricing` |
| `GET /api/health` | `GET /api/health` |
| CORS con lista blanca | **innecesario**: mismo dominio |

- Lógica compartida en `api/_lib/` (`catalog.js` con los precios, `config.js`, `stripe.js`).
  El prefijo `_` evita que Vercel los publique como endpoints.
- **Frontend**: `src/lib/checkout.js` llama a `/api/create-checkout-session` (ruta
  relativa). `VITE_API_URL` queda vacío y documentado solo para el caso de separar el
  backend otra vez.
- **`vercel.json`** en la raíz: framework `vite`, salida `dist`, y `maxDuration` de 15 s
  para las funciones. La convención de carpetas bastaría, pero así queda explícito y se
  documenta el límite de tiempo.
- **`server/` intacta** como copia de seguridad, tal como pidió.

**Probado sin Vercel** (los handlers importados y servidos con `http.Server` de Node, con
la misma firma `(req, res)`):

| Prueba | Resultado |
|---|---|
| `GET /api/health` | 200 · `runtime: vercel-node` |
| `GET /api/pricing` | 200 |
| `POST /api/create-checkout-session` entrega inválida | **400** |
| … cantidad 9 | **400** |
| … `{delivery:'montreal', lang:'fr'}` | **200** · sesión real `cs_test_…` · 49,00 CAD |
| `GET /api/session/:id` | 200 · `delivery: montreal, total: 4900` |
| `POST /api/webhook` sin firma | **400** |
| … con firma válida | **200** + log `[pedido] paid · 1× kit · envío 602 12e Ave, Montréal H8P 2R5` |

Además, a través del proxy de la web: `/api/health` y `/api/create-checkout-session`
responden, y la ruta antigua `/api/checkout` ya devuelve **404**.
