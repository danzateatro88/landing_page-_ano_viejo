ESTADO: APROBADO

# Informe de verificación técnica — PUERTA 1, RONDA 2

**Proyecto:** `vichito-2026/` · Landing «Vichito, el año viejo» · `vichisboh*`
**Auditado:** `docs/00-brief.md` v2 (240 líneas) · `docs/01-cro.md` v2 (552) · `docs/02-copys.md` v2 (609), contra la ley `docs/_contexto-encargo.md` y los informes `docs/puerta1-tech.md` (ronda 1) y `docs/puerta1-qa.md`.
**Rol:** Verificador Técnico · **Fase:** Puerta 1 documental, ronda 2 (verificación de correcciones)
**Fecha:** 16 de noviembre de 2026
**Método:** lectura íntegra de los 1.401 renglones del corpus + verificación programática (28 textos oficiales comparados carácter a carácter, 24 valores `?text=` contra `encodeURIComponent`, recuento y cruce de las 109 claves, recálculo de 12 ratios WCAG, reconteo de presupuestos y de caracteres, barrido de rastros de la v1).

---

## 1. Resumen ejecutivo

**Las siete MAYORES de la ronda 1 están cerradas de fondo, no de promesa**, y los nueve hallazgos del QA que me tocaban también. El cierre no rompió nada de lo que ya estaba bien: los **28 textos oficiales ES siguen idénticos carácter a carácter** (incluido el ítem 4 sin punto final, las minúsculas iniciales de las líneas y la línea de envíos literal), los **24 `?text=` siguen reproduciendo exactamente `encodeURIComponent`** (emoji `%F0%9F%A7%A1`, apóstrofos sin escapar), las **109 claves cuadran** (79 + 22 + 8, cero huérfanas, cero duplicadas) y **no reapareció ni un precio, ni un formulario, ni un plazo, ni una prueba social**.

Encontré **0 bloqueantes y 0 MAYORES nuevas**. Sí hay **9 MENORES nuevas**, y tres de ellas importan más de lo que su etiqueta sugiere porque son cifras que la Puerta 2 va a usar como criterio: el brief v2 declara **14 / 8 / 14** palabras en el bloque 4 cuando el texto restituido da **14 / 8 / 17** (el copy acierta), el brief se contradice con su propia tabla sobre el techo del bloque 5 (**25 vs 27**) y el CRO conserva tres veces la etiqueta vieja **«temporada 2026»** que el copy ya sustituyó por «Diciembre 2026». Ninguna cambia una sola cadena del diccionario ni obliga a reescribir estrategia: son ediciones de una línea, y las dejo con corrección exacta y con **siete decisiones vinculantes** para que `frontend-dev` no tenga que elegir nada.

**Veredicto:** los documentos v2 son aptos para que empiece la codificación. Lo que sigue abierto es de precisión documental y de piezas de sistema (`<title>`, meta, `<noscript>`) que el CRO exige y que el copy v2 no entregó: eso viaja a la Puerta 2 como condición verificable, no como bloqueo.

---

## 2. Cierre de las 7 MAYORES de la ronda 1

| ID | Dónde se corrigió | Qué verifiqué de fondo (no la promesa) | Veredicto |
|---|---|---|---|
| **MAYOR-01** Subtítulo del hero incumplía AA y el CRO se contradecía | `01-cro.md:127` (spec de la píldora), `:213`, `:230`, `:238`, `:398`, `:411`, `:425`, `:438`, `:502` (ítem 19), `:527`, `:545` | La píldora crema con texto chocolate **está especificada de verdad**: `#F4E2CD` + `#3B2517` (11,35:1, AA y AAA), radio 999 px, contorno terracota 2,5 px `aria-hidden`, padding 12/20 en 375 y 12/24 en escritorio, `fit-content` → 100 % en ≤480 px, Nunito 600 a 17 px, 2 líneas ES/EN y hasta 3 FR. **La contradicción 17 px vs ≥24 px desapareció**: barrí el documento y ya no existe ninguna línea que autorice crema sobre petróleo para subtítulos; `:425` reserva el crema/petróleo (4,14:1) a H1/H2/eslogan/etiquetas ≥24 px y añade, en la misma celda, «El subtítulo del hero NO va directo sobre petróleo». `:502` (ítem 19) lo vuelve comprobable en el DOM. El copy es coherente (`02-copys.md:541`: Nunito 600, 15–18 px) | **CERRADO** |
| **MAYOR-02** Cierre con texto sobre las rayas | `01-cro.md:199`, `:202`, `:223`, `:326`, `:404`, `:503` (ítem 20) | `:202` lo prohíbe con esas palabras: «**Prohibido texto directamente sobre las rayas**», y da la razón aritmética (crema/petróleo 4,14 ✘, chocolate/petróleo 2,74 ✘) más el recurso: panel crema sólido, esquinas de nube, 640 px, franjas asomando 40–56 px «como escenografía». `:223` lo eleva a regla general de color de texto para todo el sitio; `:326` lo mete dentro del componente (`StripedBackdrop` «siempre con panel crema sólido encima») y `:503` lo convierte en ítem de checklist que exige comprobar el ancestro con fondo opaco. No queda ninguna autorización de texto «según franja» (grep: 0 resultados) | **CERRADO** |
| **MAYOR-03** «Funcional sin JavaScript» era imposible con Vite+React | `01-cro.md:470–475`, `:529` | La promesa está **retirada y sustituida por lo viable**: «sin JavaScript no hay página… no se promete «funcional sin JS» ni se introduce SSR». Se garantiza contenido en nodos de texto tras hidratar, `<noscript>` con la línea de envíos y el enlace de WhatsApp, `<title>`/meta en el HTML y cero renderizado diferido. Coherente con el stack mandatado. **Reserva:** el punto 3 remite a claves `meta.*` que el copy v2 **no entregó** → queda como MENOR-05 de este informe, no como reapertura | **CERRADO** (con reserva documentada) |
| **MAYOR-04** La mitigación del CTA se presentaba como suficiente | `01-cro.md:443`, `:447–452`, `:451` (D-CTA), `:428`, `:504` (ítem 21), `:530` | `:443` dice literalmente lo que faltaba: «**el CTA primario no cumple AA en ningún tamaño**: subir la etiqueta a 20 px, 24 px o 40 px no cambia el ratio», y separa forma (keyline/halo) de glifo. `:451` añade la decisión explícita de Victoria: (A) mantener crema = deuda, o (B) `--btn-ink: chocolate` (3,96:1, AA-large). `:504` convierte el keyline + halo en condición verificable en el CSS real. Recálculo independiente: crema/terracota **2,86:1** < 3,0 → confirmado, falla AA y AA-large | **CERRADO** (deuda declarada, con condición en Puerta 2) |
| **MAYOR-05** H1 francés «le Año Viejo» | `02-copys.md:178`, `:184`, `:561`, `:584` | `hero.title` FR = «Vichito, **l'**Año Viejo». Grep de «le Año» en los tres documentos: **0 resultados**. La nota de `:184` justifica «the / l'». Coherente con `tradition.title` y `kit.items[0].title`, que ya usaban «l'Año» | **CERRADO** |
| **MAYOR-06** Bloque 5 sin el teléfono visible | `02-copys.md:247`, `:257`, `:562`, `:585` | `buy.note` = «WhatsApp **514-296-8295** · DM @vichisboho» en los tres idiomas, dentro del bloque 5. Cumple el requisito literal («Nota de pedido: WhatsApp 514-296-8295 o DM Instagram @vichisboho», `_contexto-encargo.md:134`). Cabe en presupuesto (ver §3.5) | **CERRADO** |
| **MAYOR-07** Dos primarios rellenos en el mismo viewport | `01-cro.md:53`, `:115`, `:274`, `:311`, `:331–332`, `:397`, `:544`, `:531` | El CTA del navbar es **secundario en todo el scroll**: píldora crema, texto chocolate (11,35:1), contorno terracota 2,5 px, 44–48 px de alto, «**Nunca relleno terracota en ningún punto del scroll**». `:331–332` lo consagra en el catálogo (`ButtonPrimary` «fuera del navbar») y `:397` en la tabla responsive. La regla «un primario por viewport» se cumple ahora también en el primer viewport. La variante «relleno tras pasar el hero» está descartada con motivo en `:531` | **CERRADO** |

**Resultado: 7/7 CERRADO.** Ninguna corrección tocó los textos de Victoria, la paleta, las tres tipografías ni las reglas duras.

---

## 3. Cierre de los 9 hallazgos del QA que me afectan

| ID | Dónde se corrigió | Verificación | Veredicto |
|---|---|---|---|
| **M1** teléfono en el bloque 5 | `02-copys.md:247`, `:257` (decisión 4), `:562` | Número visible en ES/EN/FR; el `aria-label` del CTA no se usa como sustituto del texto visible | **CERRADO** |
| **M2** orden móvil del hero | `01-cro.md:130`, `:230`, `:238`, `:398`, `:411`, `:532` | Orden en ≤480 px: **H1 → eslogan → subtítulo (píldora) → CTA ancho completo → foto**. La aritmética se sostiene (recalculada: 424–448 px de los 667 del iPhone SE; en FR, con 3 líneas de píldora, 449–473). Escritorio sin cambios en la composición (foto 7–11 sangrando) | **CERRADO** |
| **M3** paralelismo de temporadas | `02-copys.md:242`, `:251`, `:268`, `:586`; `01-cro.md:190` | `buy.eyebrow` = «Diciembre 2026 / December 2026 / Décembre 2026» y el `aria-label` de stock pasa a «Kit disponible en diciembre de 2026»: el paralelismo también existe en lector de pantalla. **Residuo:** el CRO conserva «temporada 2026» en tres líneas → MENOR-04 de este informe | **CERRADO** (residuo en el CRO, nueva MENOR-04) |
| **M4** elisión francesa | `02-copys.md:178`, `:184`, `:561` | «l'Año Viejo»; ninguna cadena FR dice «le Año» | **CERRADO** |
| **m7** promesas de líneas imposibles | `01-cro.md:329`, `:340`, `:402`; `02-copys.md:328`, `:497`, `:598`; `00-brief.md:149`, `:151` | De «2 líneas máx.» a **3 líneas por tarjeta** (`CloudCard`) y de «envíos en 2 líneas» a **hasta 3 líneas, nunca por debajo de 14 px**. La promesa nueva es sostenible (97 caracteres a 375 px dan 3 líneas). **Nueva instancia del mismo error** en el bloque 4 del brief («2 por paso») → MENOR-01 | **CERRADO** (nueva instancia en MENOR-01) |
| **m8** contradicción de CTAs | `01-cro.md:51`, `:53`, `:287`, `:311`, `:331`, `:534` | Contradicción resuelta por MAYOR-07: navbar secundario en todas las menciones (tesis, §1.2, §2.1, §4.1, §4.3, §5.1, §7, §9). Navegación por grep: cero rastros de «Primario compacto» | **CERRADO** |
| **m10** deriva de claves | `01-cro.md:291–300`, `:285`; `02-copys.md:145`, `:454`, `:595` | §4.2 del CRO marcada **TABLA SUSTITUIDA** y remitida a `02-copys.md §6.2`; claves canónicas `wa.*` en §1.2 y §4.1 (8/8 correctas); claves cortas declaradas obsoletas. Cruce programático: **0 claves citadas que no existan en el diccionario** | **CERRADO** |
| **m13** CTA del kit | `01-cro.md:154`, `:232`, `:276–277`, `:536` | El mismo botón, la misma clave `wa.kit`, **dos apariciones** (tras la cuarta nube y al cierre del bloque). No es sección nueva: no añade claves ni secciones, y ambas son secundarias | **CERRADO** |
| **m3** pasos restituidos | `02-copys.md:228`, `:232`, `:236`, `:560`, `:590`; `00-brief.md:150` | Vuelven «con el lapicero, **en tus tarjetas**», «**con el alcohol**», «el 31 a medianoche» y «guarda tu billete **en la billetera**». Conteo verificado: **14 / 8 / 17** ES · 15 / 9 / 18 EN · 16 / 7 / 16 FR. El paso 3 sigue en clave simbólica (sin instrucciones de fuego) | **CERRADO** (cifra del brief mal: MENOR-01) |

---

## 4. Prueba de no regresión

| Prueba | Método | Resultado |
|---|---|---|
| **Textos oficiales ES idénticos al encargo** | Comparación carácter a carácter (Python, sin normalizar espacios) de 28 cadenas: hero (título, eslogan, subtítulo), tradición (título + párrafo de 61 palabras), 8 títulos + 8 líneas del kit, «Hola, soy Victoria» + 2 líneas, Mail Club (título + cuerpo), línea de envíos, CTA | **28/28 idénticas.** Se conserva el ítem 4 **sin punto final**, las líneas en minúscula inicial y los guiones largos. **Cero deriva** |
| **24 valores `?text=`** | `quote()` con el juego seguro de `encodeURIComponent` (`!~*'()-_.`) contra los 24 valores de §6.2, contrastados además con la lectura legible de §6.1 | **24/24 exactos.** Emoji `%F0%9F%A7%A1`, apóstrofos `I'd` sin escapar, acentos `%C3%B1`/`%C3%A9`. Ninguna corrección de la v2 recodificó nada |
| **Claves: 109 declaradas vs filas reales** | Expansión de rangos (`kit.items[0..7]`, `how.items[0..2]`, `photo.*Label/Alt`) y cruce §2 ↔ §3 ↔ §5 ↔ §6 | **109 = 79 (§3) + 22 (§5) + 8 (§6).** 0 huérfanas, 0 duplicadas, 0 celdas vacías. Las 16 filas de §6 son las 8 claves repetidas en §6.1/§6.2 (lectura legible + valor codificado): intencional y declarado |
| **Cero invenciones comerciales** | Barrido de importes, formularios, plazos, testimonios, stock, descuentos | **OK.** 13 líneas con importes, todas la línea de envíos o sus citas (5 $ / 8,95 $ / 60 $). 0 `<form>`, 0 `<input>` real, 0 pop-ups, 0 testimonios, 0 cifras de clientes, 0 cuenta atrás. «Diciembre 2026» es etiqueta de temporada; `buy.deliveryNote` **no promete fecha** |
| **Presupuesto bloque 5** (recálculo) | Desglose sobre las cadenas reales, con las dos convenciones | **16 / 25 = correcto.** Etiqueta 2 + título 3 + lead 6 + CTA 3 + nota 2 = 16; + `buy.deliveryNote` 9 = **25** (los 9 salen: Pedidos·de·diciembre·te·confirmo·la·fecha·por·WhatsApp). Con teléfono y `@handle` como tokens: 18 / **27**. Techo del brief v2: ≤17 / **≤27** → **cabe, pero sin margen** (27 = 27) |
| **Presupuesto bloque 4** (recálculo) | Título + línea por paso, sobre las cadenas reales | **14 / 8 / 17 = correcto**, no 14/8/14. Paso 3: «las penas con el alcohol, el 31 a medianoche, y guarda tu billete en la billetera» = 16 + «Quema» = 17. **El brief v2 se equivoca**, no el copy (MENOR-01) |
| **Tipografía francesa** | Conteo de U+00A0 antes de `:` `?` `!` y búsqueda de espacios normales | **8 cadenas** con espacio duro y **ninguna** FR sin él. Los dos `!` «sin espacio» son los del cartel español «¡CHAO AÑO VIEJO!», que no lo necesitan. El documento declara «9 cadenas»: el trabajo está completo, la cifra está alta por una |
| **Contraste** | Recálculo de los 12 pares con luminancia relativa sRGB | **12/12 exactos.** Confirmado 2,86:1 crema/terracota (< 3,0 → falla AA y AA-large) y 11,35:1 chocolate/crema de la píldora |

---

## 5. Incidencias nuevas por severidad

**BLOQUEANTES: ninguna. MAYORES: ninguna.**

### MENORES (9) — ninguna cambia una cadena del diccionario; las tres primeras son las que conviene cerrar antes de la Puerta 2

| ID | Archivo:línea | Hallazgo | Corrección |
|---|---|---|---|
| **MENOR-01** | `00-brief.md:150` (y `:155`) | El bloque 4 declara «**14 / 8 / 14**» y «2 por paso» **mientras enumera** «con el alcohol» como texto restituido. Con ese texto el conteo real es **14 / 8 / 17** y el paso 3 ocupa **3 líneas** a 375 px (83 caracteres). Como el brief «prevalece» sobre `§3.1` del CRO, la cifra errónea haría que la Puerta 2 marque un incumplimiento que no existe. Es la misma clase de error que m7 | «14 / 8 / **17**» y «hasta **3** líneas en el paso 3» (o aprobar la variante corta D11 de `02-copys.md:603`) |
| **MENOR-02** | `00-brief.md:196` | «+9 palabras… de 17–18 propias a ~27 **frente al techo de 25**» contradice la tabla del propio brief (`:151`: «con `buy.deliveryNote`: **≤ 27**, excepción declarada»). Dos techos distintos para la misma línea, a 130 renglones de distancia | «frente al techo de **27**» |
| **MENOR-03** | `01-cro.md:153`, `:165`, `:177`, `:216–217`, `:500` | Los techos de `§3.1` y de las fichas por bloque **no se recalibraron**: siguen `≤ 9` por ítem, `≤ 12` por paso y `≤ 25` en Comprar, mientras el brief v2 fija 3 líneas, 14/8/17 y ≤17/≤27. La precedencia está declarada (`00-brief.md:155`), pero el ítem 17 del checklist cita `§3.1` como referencia: quien audite con el CRO contará con la tabla vieja | Nota de una línea en `§3.1`: «techos vigentes: `00-brief.md §5.1`» |
| **MENOR-04** | `01-cro.md:330`, `:377`, `:386` | El CRO conserva **«temporada 2026»** tres veces (ejemplos de `EyebrowPill`, estado `hidden` del `PriceSlot`, y la urgencia de `§6.2`) cuando el copy v2 ya fijó `buy.eyebrow` = «Diciembre 2026» (M3). Riesgo real: el frontend teclea la etiqueta vieja. Además `:330` sigue listando el **Hero** como uso de `EyebrowPill`, que el copy descarta (`02-copys.md:184`) | Sustituir por «Diciembre 2026» y quitar «Hero» de la lista de usos |
| **MENOR-05** | `01-cro.md:472–473`, `:515`, `:552` vs `02-copys.md` | El CRO exige `<title>`, `meta description` y `<noscript>` reales y remite a claves `meta.title` / `meta.description` / `ogAlt` «pendientes de `02-copys.md` v2»: **el copy v2 no las entregó** (los 109 no las incluyen) y el «mensaje de reserva» del `noscript` no está redactado en ningún documento. Sin esto, el frontend **redacta copy no aprobado** y la página se publica con lo primero que se le ocurra | Usar las cadenas vinculantes de §6 (D-R2-5) o añadir 4 claves en una v3 del copy. La Puerta 2 debe comprobar que `<title>` no dice «Vite + React» |
| **MENOR-06** | `01-cro.md:127` vs `:324`, `:325`, `:230`, `:411` | La especificación del hero tiene cuatro imprecisiones que obligan a elegir: (a) `:127` dibuja la píldora con contorno de `SquigglyFrame` variante `pill` mientras `:324` prohíbe ese marco «alrededor de texto corrido» y `:325` asigna la píldora a `CloudBlob` — ¿qué componente la dibuja?; (b) no se define el ancho entre 481 y 767 px (`fit-content` en escritorio, 100 % en ≤480); (c) «CTA a **44 px** o más del borde inferior de la píldora» se lee como separación y no como objetivo táctil; (d) `:230` mantiene en escritorio el orden «H1 → eslogan → **foto** → subtítulo», herencia de la v1, que en una retícula de dos columnas solo se sostiene reordenando por CSS | Resuelto en §6 (D-R2-1 a D-R2-3) |
| **MENOR-07** | `01-cro.md` (0 menciones) + `02-copys.md:101`, `:248` | `buy.deliveryNote` **existe en el copy pero el CRO no la menciona ni una vez**: no hay posición, cuerpo tipográfico ni comportamiento visual prescritos para la única línea de copy nueva de la v2. El brief solo dice «una sola línea en el bloque 5». El frontend decide dónde ponerla en el bloque más importante de la página | Resuelto en §6 (D-R2-4) |
| **MENOR-08** | `01-cro.md:285` | «**8 WhatsApp + 2 Instagram = 10 enlaces**»: la tabla `§4.1` renderiza **11** (9 apariciones de WhatsApp —`wa.kit` va dos veces— + 2 de Instagram, en 6c y 7). La aritmética mezcla destinos distintos (10) con enlaces en pantalla (11) | «10 destinos distintos / 11 enlaces renderizados» |
| **MENOR-09** | `02-copys.md:497`, `:561`, `:591`, `:47`, `:558` | Cifras de autoconteo del copy, todas inocuas pero citadas como prueba: la línea de envíos mide **97** caracteres, no 96 (el cálculo de 3 líneas no cambia); «**9** cadenas FR con signo doble» son **8**; el bloque Victoria declara **26** palabras incluyendo su CTA mientras el Mail Club declara **30** excluyendo los suyos (con una sola convención: 23/26 y 30/38) | Corregir las tres cifras o quitar los números absolutos |

### MENORES heredadas de la ronda 1 que siguen abiertas (no eran obligatorias)

`01-cro.md:163` subrayado mostaza de los pasos = **1,31:1** (invisible; pasar a terracota ≥ 3 px) · `:419–432` falta la fila **rojo/petróleo = 1,08:1** que el bloque 3 usa como acento · `:334` el estado inactivo del selector sigue «atenuado pero legible» sin token (`--ink-muted: #5C4A38` = 6,66:1) · `:466` «≤ 4 archivos de fuente» frente a **5 caras** (`02-copys.md:544`) · `_contexto-encargo.md:92` «logo `vichisboho`» sin asterisco frente al wordmark `vichisboh*`.

---

## 6. ¿Puede empezar `frontend-dev`? Decisiones vinculantes de la ronda 2

Sí. Para que no haya que adivinar nada, estas siete decisiones quedan fijadas por el verificador y prevalecen sobre cualquier ambigüedad de los documentos:

- **D-R2-1 · Píldora del subtítulo.** La dibuja `CloudBlob` en variante píldora (relleno crema, radio 999 px, texto chocolate 17 px); el contorno de garabato terracota 2,5 px es un `SquigglyFrame` `pill` superpuesto, `aria-hidden`, `vector-effect="non-scaling-stroke"`. Es **contenedor de una frase con padding**, no «texto corrido»: la prohibición de `§5.1` se lee como «nunca alrededor de párrafos».
- **D-R2-2 · Ancho y aire.** `fit-content` con `max-width:100%` en **todos** los tramos (también 481–767 px) y `width:100%` menos gutters en ≤480. Separación píldora → CTA = **16 px**; los 44 px son el objetivo táctil del botón, no un margen.
- **D-R2-3 · Orden del hero.** El DOM sigue el orden móvil (H1 → eslogan → píldora → CTA → foto) y en escritorio la foto se coloca por grid en 7–11 con sangrado: el subtítulo **nunca** queda detrás de la foto en el DOM. El orden de la fila de escritorio en `§3.2` se lee como composición por columnas, no como orden de lectura.
- **D-R2-4 · `buy.deliveryNote`.** Va **debajo de la línea de envíos**, dentro del panel crema, Nunito 600 a 15–16 px, siempre **después** del CTA y jamás dentro del botón. Se controla con `content.showDeliveryNote` (por defecto `true`); al ocultarla, el bloque vuelve a 16 palabras sin tocar nada más.
- **D-R2-5 · Textos de sistema** (los únicos que el diccionario no cubre; no inventar otros). `<title>`: «Vichito, el año viejo — Kit Ritual Año Viejo 2026 · vichisboh*». `meta description`: «Un ritual colombiano para despedir el año con tus manos. Kit Ritual Año Viejo 2026, hecho a mano en Montreal.» `<noscript>`: «Este sitio necesita JavaScript para verse completo. Escríbeme por WhatsApp al 514-296-8295.» + la línea de envíos literal + el enlace `https://wa.me/15142968295`. Todo se compone de cadenas ya aprobadas (H1, subtítulo oficial, `footer.madeIn`, envíos, teléfono) más una frase funcional de una línea.
- **D-R2-6 · Techos de palabras en la Puerta 2.** Rige la tabla de `00-brief.md §5.1`, **no** `§3.1` del CRO: bloque 4 = 14/8/17 como máximo; bloque 5 = ≤17 sin la línea y ≤27 con ella; 3 líneas por tarjeta; envíos hasta 3 líneas y nunca por debajo de 14 px.
- **D-R2-7 · Jerarquía de CTA.** Relleno terracota **solo** en hero y Comprar; navbar, kit (×2), pasos y Mail Club en píldora crema/contorno. Ningún estado del navbar se rellena de terracota.

---

## 7. Riesgos residuales aceptables (y por qué los acepto)

1. **La píldora del subtítulo puede leerse como botón.** Es una forma rellena crema con contorno, y justo debajo hay otra píldora que *sí* es un botón. *Aceptable con condición:* texto alineado a la izquierda, sin sombra ni hover, radio de nube asimétrico antes que píldora perfecta en móvil, y contorno a 2–2,5 px. Es el precio de tener AA en el texto más leído; la alternativa (subirlo a 24 px) rompía el hero.
2. **El CTA del navbar pierde protagonismo al volverse secundario.** El encargo pide «CTA rápido» y sigue siéndolo: píldora crema sobre petróleo (forma 4,14:1, etiqueta 11,35:1), sticky, 44–48 px. Gana la regla «un primario por viewport», que era la contradicción de fondo.
3. **Dos CTA del kit iguales.** No se anulan: son la misma affordance repetida a ~2 pantallas de distancia, ambas secundarias y con la misma clave `wa.kit`. El riesgo existiría si una fuera rellena.
4. **U+00A0 en lugar del fino U+202F.** Tipográficamente el fino es la recomendación de la Imprimerie nationale, pero U+00A0 tiene soporte universal en fuentes y evita el «tofu» en gamas medias. La función (no partir el signo) se cumple igual. *Aceptable;* si Victoria quiere refinarlo, es un `replace` global sin coste.
5. **`buy.deliveryNote` deja el bloque 5 en el techo** (25/25 y 27/27 con teléfono y handle). Cabe, pero **sin margen**: cualquier palabra futura lo rompe. Y crea una expectativa de respuesta («te confirmo la fecha»): si Victoria no contesta rápido en diciembre, se vuelve en su contra. Sigue siendo D3 y debe ratificarse **antes de publicar**, no antes de codificar.
6. **Textura por trama CSS al 4 %.** Cero peticiones y cero binarios: correcto. A 1–2 px y 3× de densidad puede volverse invisible; si no se ve, mejor quitarla que subirla (una textura perceptible empieza a competir con la foto).
7. **«DM @vichisboho» frente a «DM Instagram @vichisboho»** del encargo. El `@handle` es inequívoco y los `aria-label` nombran Instagram. Añadir «Instagram» no rompe el presupuesto (17/26 bajo el techo 17/27) pero lo deja al límite: lo dejo a criterio de Victoria, sin marcarlo como incidencia.
8. **Riesgos de negocio ya declarados**: precio pendiente (D1), envío del alcohol (D2), fecha límite por zona (D3), fotos reales (D9), `alt` a revisar contra las fotos (m11/D9), punto de recogida (D10). Nada de esto lo puede resolver un documento.

**Recomendaciones para la Puerta 2:** (1) auditar con los **22 ítems** de `§9`, leyendo los ítems 12 y 17 en su versión recalibrada y aplicando D-R2-6; (2) comprobar en el CSS real el **keyline chocolate + halo crema** del botón terracota (ítem 21) —si faltan, la deuda pasa a fallo—; (3) verificar que **ningún nodo de texto** de los bloques 5 y 7 carece de ancestro crema opaco (ítem 20); (4) revisar `vector-effect` y el trazo a 375 y 1280 (ítem 22); (5) abrir los 8 CTA en los 3 idiomas y comparar el `?text=` con `§6.2`; (6) `grep` de `href` (solo dos dominios), de `<form|<input|onSubmit` y de importes `/\d+\s*\$|CAD\s*\d/`; (7) recorrido con teclado y a 375/768/1280; (8) comprobar `<title>`, meta y `<noscript>` reales; (9) construir en este orden: tokens y fuentes → `SquigglyFrame`/`CloudBlob`/`StripedBackdrop` → navbar y hero (con la píldora) → resto → `PriceSlot` y estados → pasada de contraste y teclado.

---

## 8. Firma

**Verificador Técnico — Puerta 1, ronda 2**
16 de noviembre de 2026 · Montreal

Alcance: verificación documental de las correcciones v2. La verificación de código (JSX, Tailwind, build, DOM) corresponde a la Puerta 2 y no se ha realizado aquí. No he reescrito ningún documento: he auditado y reportado.

**Veredicto:** `ESTADO: APROBADO` — 0 bloqueantes, 0 MAYORES abiertas, **7/7 MAYORES de la ronda 1 cerradas**, **9/9 hallazgos del QA cerrados**, **0 regresiones** en textos oficiales, `?text=`, claves, importes y presupuestos. 9 MENORES nuevas (todas de una línea, detalladas en §5) y 5 heredadas. Con las decisiones D-R2-1 a D-R2-7 de §6, el frontend puede codificar sin adivinar nada.
