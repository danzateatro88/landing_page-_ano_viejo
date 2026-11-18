# Informe de verificación técnica — PUERTA 1 (fase documental)

**ESTADO: APROBADO** — con 7 correcciones MAYORES obligatorias antes de abrir la Puerta 2. **No hay bloqueantes.** Ninguna regla de negocio inquebrantable del encargo está violada, ningún requisito es técnica ni legalmente imposible con Vite + React + Tailwind, y las tres excepciones de presupuesto están declaradas y trazadas.

Proyecto: `vichito-2026/` · Auditado: `_contexto-encargo.md` (la ley), `00-brief.md`, `01-cro.md`, `02-copys.md`
Rol: Verificador Técnico · Fase: Puerta 1 (documental, sin código)

---

## 1. Resumen ejecutivo

Los tres documentos son sólidos, internamente trazables y honestos en sus propias deudas: declaran las excepciones de presupuesto, la deuda de contraste del CTA y las decisiones que requieren a Victoria. Verifiqué **mecánicamente** las afirmaciones más caras del entregable y se sostienen: los cinco bloques de texto oficial ES son **idénticos carácter a carácter** al encargo (incluido el ítem 4 sin punto final y la línea de envíos literal con sus cuatro datos), los **24 valores `?text=`** de WhatsApp reproducen exactamente `encodeURIComponent`, las **108 claves** del diccionario existen con sus tres idiomas y no hay ninguna clave entregada sin declarar, y los **12 ratios de contraste** de `01-cro.md` §8.1 están calculados correctamente (12/12, comprobados con la fórmula de luminancia relativa).

Los problemas no están en lo que los documentos prometen sino en **cuatro puntos donde se prometen cosas que no se sostienen al implementarlas o al medirlas**: (a) el subtítulo del hero a 17 px crema sobre petróleo incumple AA y contradice la propia autorización del CRO («subtítulos ≥ 24 px»); (b) el bloque Cierre autoriza texto directamente sobre las rayas petróleo/crema, donde el contraste no se puede garantizar; (c) el CRO promete una página «funcional sin JavaScript» que un SPA de React+Vite no puede entregar; (d) la mitigación del CTA crema/terracota se describe como suficiente cuando 2,86:1 tampoco alcanza el umbral de texto grande (3,0:1). A eso se suman siete defectos editoriales localizados (el H1 francés «le Año Viejo» sin elisión, la nota de pedido del bloque 5 sin el teléfono que exige el encargo, un alt con «amarillo amarillo» duplicado, el decimal `8.95` frente a la línea literal, y la jerarquía de dos CTAs primarios simultáneos por el navbar sticky).

Ninguna de esas correcciones exige rehacer estrategia, copy nuevo ni arquitectura: son ediciones puntuales dentro de los documentos actuales (todas de esfuerzo XS–S). Con las siete aplicadas, el paquete queda listo para que `frontend-dev` escriba código contra un contrato sin ambigüedades. Las cuatro decisiones pendientes de Victoria **no bloquean la Puerta 1** (ver §6): son ratificaciones editoriales que pueden resolverse en paralelo a la codificación, siempre que el código implemente el valor por defecto ya documentado y el valor quede en una sola clave.

**Lo que la Puerta 2 no debe dejar pasar:** los ítems 17 y 12 del checklist (§9 del CRO) están mal calibrados tal como están escritos y harán fallar el entregable por razones que la Puerta 1 ya aprobó. Ver §7.

---

## 2. Tabla de verificación del encargo

### 2.1 Violaciones duras (reglas de negocio)

| # | Ítem del encargo | Resultado | Evidencia |
|---|---|---|---|
| A1 | Precio del kit inventado, descuento, «antes/ahora», tachado | ✔ Ausente | Búsqueda de `\$[0-9]`, `%`, `descuento`, `tachad`, `antes/ahora` en los 3 docs: solo aparecen en contexto de **prohibición** (`02-copys.md:17,29`, `01-cro.md:343`). Los únicos importes del corpus son 5 $, 8,95 $ y 60 $ |
| A2 | Cuatro datos de envío correctos y completos | ✔ 4/4 + literal | `02-copys.md:242` y `02-copys.md:480` == `_contexto-encargo.md:31` **byte a byte** (comparación programática: `True`) |
| A3 | Formularios, pop-ups, ManyChat, captura de email | ✔ Ausente | Cero `<form>`/`<input>`/overlay en el corpus; `01-cro.md:75,433`, `02-copys.md:545`. El Mail Club se pide por DM/WhatsApp (`02-copys.md:263`) |
| A4 | Destinos de CTA: solo `wa.me/15142968295` y `@vichisboho` | ✔ 10/10 | `01-cro.md:256,258-268` (tabla de 8 WhatsApp + 2 Instagram), `02-copys.md:546`. Sin pasarelas, sin terceros |
| A5 | Textos oficiales ES palabra por palabra | ✔ 5/5 bloques idénticos | Tradición: `02-copys.md:185` == encargo `:99-102` (diff carácter a carácter: solo separadores de línea). Victoria: `:257-258` == `:138-139`. Mail Club: `:263` == `:142-143`. 8 ítems: `:194-209` == `:109-116` (8/8 títulos y 8/8 líneas, incluido el ítem 4 **sin punto final**). Hero: `:172-174` == `:87-89` |
| A6 | «Vichito» y «Año Viejo» intactos en EN/FR | ✔ | `02-copys.md:172,184,194-209,436-443`. Ausencia verificada de «Old Year» / «Vieille année» fuera de las listas de prohibición (`:16,28,543`) |
| A7 | Fotos reales; nada de stock ni IA | ✔ | `01-cro.md:312,436` (`PhotoSlot`), `02-copys.md:381,385-398` (14 `alt` descriptivos). Cero menciones de banco de imágenes o generación |
| A8 | Testimonios, garantías, sellos, urgencia falsa inventados | ✔ Ausente | `01-cro.md:71`, `00-brief.md:180`, `02-copys.md:27`. Única urgencia: temporada + 31 de diciembre (`02-copys.md:250`) |
| A9 | Paleta exacta de 7 colores, sin rosa/oliva ajeno | ✔ | `01-cro.md:319` (tokens), `:439` (checklist 15). Los 7 HEX coinciden con `_contexto-encargo.md:47-55` |
| A10 | Identidad artesanal (marcos, nubes, rayas, doodles, 3 tipografías) | ✔ Especificada | `01-cro.md:301-316` (15 componentes), `:240-248` (reglas anti-plantilla), `02-copys.md:522` (URL de fuentes) |
| A11 | 6 secciones + navbar, en el orden del encargo | ⚠️ 8 bloques (0–7), desviación **justificada y trazable** | Ver §2.3, fila B1 |
| A12 | Trilingüe ES/EN/FR, ES por defecto, `aria-label` y prellenado que cambian | ✔ | `00-brief.md:153`, `01-cro.md:403`, `02-copys.md:362-375` (10 controles × 3 idiomas), `:436-456` (8 prellenados × 3) |
| A13 | Mobile-first 375 px | ✔ | `01-cro.md:347-365` (tabla responsive completa), `00-brief.md:159-163` |

### 2.2 Coherencia entre documentos

| # | Ítem | Resultado | Evidencia |
|---|---|---|---|
| B1 | ¿El copy cubre exactamente los 8 bloques del CRO? | ✔ 0–7 completos | Bloques 0–7 en `02-copys.md:149-283`; mapa en `01-cro.md:87-96` |
| B2 | ¿Faltan o sobran claves? | ✔ 108/108, 0 huérfanas | Conteo programático: 78 (§3) + 22 (§5) + 8 (§6) = **108**, que coincide con `02-copys.md:57,548`. Cruce declaradas↔entregadas: **0 claves con valores sin declarar**; ninguna declarada sin valor |
| B3 | Número de secciones: ¿6 del encargo vs 8 del CRO? | ⚠️ Desviación justificada, con una consecuencia administrativa | Detalle abajo |
| B4 | Límites de palabras del brief vs copy | ⚠️ 3 excepciones, las 3 declaradas y bien fundadas | Detalle abajo |
| B5 | ¿Las excepciones están justificadas por texto oficial protegido? | ✔ Sí, y lo verifiqué contando | Detalle abajo |
| B6 | Orden de bloques idéntico al del encargo | ✔ | `01-cro.md:15-28`, `00-brief.md:119-130` vs `_contexto-encargo.md:83-147` |
| B7 | Un solo CTA primario por viewport (regla del propio CRO) | ✘ Se contradice con el navbar sticky | Incidencia **MAYOR-07** |
| B8 | «Siete puntos de contacto» (CRO) vs 8 CTAs de WhatsApp entregados | ⚠️ Aritmética del CRO | Incidencia MENOR-09 |

**B3 — Seis secciones + navbar + cierre (8 bloques).** El encargo pide «ESTRUCTURA DE 6 SECCIONES» (`_contexto-encargo.md:79`); el brief añade el bloque 7 «Cierre / pie» (`00-brief.md:128`) y lo justifica en `:130` («el pie es solo el remate operativo… no se añaden secciones nuevas»); el CRO lo formaliza como «seis secciones oficiales + navbar + cierre» (`01-cro.md:28`).
**Veredicto: desviación justificada y trazable, no error.** Las seis secciones narrativas del encargo están todas, en su orden, sin fusiones ni recortes; los bloques 0 y 7 son *chrome* (navegación y pie), no secciones comerciales nuevas, y el pie no introduce contenido nuevo: repite contacto, envíos y marca, exactamente lo que el encargo ya exige mostrar en la sección 5 (`_contexto-encargo.md:133-134`).
**Consecuencia que sí hay que resolver (MENOR-06):** la lista de archivos del encargo (`_contexto-encargo.md:151-153`) tiene 7 componentes de sección y **no contempla el bloque 7**. Sin una decisión explícita, `frontend-dev` inventará el nombre del archivo y la Puerta 2 tendrá que improvisar el criterio.

**B4/B5 — Presupuestos de palabras.** Reconté los siete bloques y los ocho ítems. Los números del copy son correctos (difieren en ±1 solo por cómo se cuenta `@vichisboho` y el teléfono):

| Bloque | Límite brief | ES contado (verificación propia) | Doc declara | Estado |
|---|---|---|---|---|
| Navbar | ≤ 4 | 3 (+ logo y 3 códigos) | 3 | ⚠️ +CTA mandatado por el encargo |
| Hero | ≤ 18 | **18** | 18 | ✔ |
| Tradición | ≤ 70 | **66** | 66 | ✔ |
| Kit (por ítem) | ≤ 9 | 14 / 13 / 11 / 17 / 15 / 9 / 6 / 12 | idéntico | ⚠️ 6 de 8 exceden |
| Cómo funciona | ≤ 12 por paso | 11 / 8 / 11 | idéntico | ✔ |
| Comprar | ≤ 25 | 17 (+ línea de envíos) | 18 | ✔ |
| Victoria | ≤ 30 | **26** | 26 | ✔ |
| Mail Club | ≤ 25 | **30** | 30 | ⚠️ +5 |
| Cierre | ≤ 12 | 6–8 | 8 | ✔ |

Las tres excepciones son de **texto oficial protegido o de estructura mandatada**, nunca de copy propio: 6 ítems del kit exceden porque los títulos y líneas son literalmente los de Victoria (`02-copys.md:321`); el Mail Club excede porque el cuerpo es oficial (`:271`); el navbar excede porque el encargo exige un «CTA rápido» en la barra (`_contexto-encargo.md:80-81`). Ninguna proviene de texto inventado. **Aceptadas.**

**Observación no declarada por el copy (MENOR-01):** el exceso del bloque kit no es solo numérico, es **de líneas**. El encargo exige «una sola línea de texto por elemento» (`_contexto-encargo.md:107-108`) y el brief prohíbe «2 líneas por ítem» (`00-brief.md:143`). Con 343 px útiles y 17 px de cuerpo, el ítem 4 (14 palabras en la línea, ~95 caracteres) ocupa **2–3 líneas** inevitablemente. El copy mitiga con tipografía y 28 px de aire (`02-copys.md:321`) pero no lo declara como conflicto de líneas. Ver §6, decisión E1.

### 2.3 Accesibilidad declarada

| # | Ítem | Resultado | Evidencia |
|---|---|---|---|
| B9 | `alt` para cada foto | ✔ 14/14 | `02-copys.md:385-398`: hero, tradición, 8 ítems, empaque, pasos, compra, retrato |
| B10 | `aria-label` por control, en 3 idiomas | ✔ 16/16 | `02-copys.md:362-375` (10 controles) + `:158,162-164` (grupo y 3 botones de idioma) + `:244` (`availability`) + `:420` (`a11y.skip`) |
| B11 | `alt`/`aria` sin errores de texto | ✘ 1 defecto | **MENOR-01**: «calzoncito amarillo amarillo» (`02-copys.md:388`) |
| B12 | Jerarquía semántica (1 `h1`, `h2` por sección, `h3` ítems) | ✔ Especificada | `01-cro.md:403`, `:440` |

---

## 3. Incidencias por severidad

**BLOQUEANTES: NINGUNO.** No hay violación de regla de negocio, ni contradicción insalvable, ni requisito imposible con el stack mandatado. Las tres auditorías de reglas duras (A1–A10) pasan.

### 3.1 MAYORES (corregir antes de escribir código)

| ID | Archivo:línea | Descripción | Corrección sugerida | Esfuerzo |
|---|---|---|---|---|
| **MAYOR-01** | `01-cro.md:379` + `:365` + `02-copys.md:530` | **El subtítulo del hero incumple AA y el CRO se contradice a sí mismo.** `:379` autoriza crema sobre petróleo solo para «H1/H2, subtítulos **≥ 24 px**»; `:365` fija «subtítulo en máximo 2 líneas **a 17 px**»; `02-copys.md:530` confirma Nunito 600 a 15–18 px. Crema `#F4E2CD` sobre petróleo `#1B7A63` = **4,14:1** < 4,5 → un subtítulo de 17 px/600 **no** califica como texto grande y **falla AA**. Es el texto más leído de la página después del H1 | Elegir una: **(a)** subtítulo dentro de una píldora/nube crema con texto chocolate (11,35:1) — coherente con la identidad artesanal y con el patrón ya usado en el bloque 6; **(b)** subir el subtítulo a ≥ 24 px crema (4,14 ≥ 3,0 → AA-large ✔). Recomiendo (a), que no toca el diseño móvil. Actualizar `:365` y `:379` a la decisión | S |
| **MAYOR-02** | `01-cro.md:190` | **El Cierre autoriza texto directamente sobre las rayas petróleo/crema** («texto chocolate sobre crema o crema sobre petróleo **según franja**»). Sobre un fondo alterno, el texto cruza las dos franjas: no existe un color de texto que cumpla AA contra ambas (crema/petróleo 4,14 ✘; chocolate/crema 11,35 ✔ pero chocolate/petróleo 2,74 ✘). El bloque 5 sí lo resuelve con «panel crema interno» (`:166`); el 7 no | Añadir al Cierre el mismo recurso: **todo texto del pie sobre panel crema sólido** (o petróleo sólido) dentro del marco rayado; las rayas quedan solo como escenografía perimetral. Reformular `:190` y añadir la regla al checklist | XS |
| **MAYOR-03** | `01-cro.md:415` | **Promesa imposible con el stack mandatado:** «página completa funcional sin JavaScript más allá del conmutador de idioma; el contenido debe existir en el DOM». Vite + React (CSR) entrega un `<div id="root">` vacío: sin JS **no hay página**. Ni el encargo ni el brief piden SSR (`_contexto-encargo.md:150`), y añadirlo contradice «solo dependencias estándar» | Reformular: «el contenido se renderiza en el DOM tras hidratar; `index.html` incluye `<noscript>` con la línea de envíos y el enlace a WhatsApp, y el `<title>`/meta están en el HTML» | XS |
| **MAYOR-04** | `01-cro.md:394` | **La mitigación del CTA se presenta como suficiente cuando no lo es.** Dice que la etiqueta a ≥ 20 px «clasifica como texto grande». La clasificación es correcta (≥ 18,66 px bold), pero **el umbral de texto grande es 3,0:1 y crema/terracota = 2,86:1**: sigue fallando AA-large. El keyline de 2 px y el halo crema mejoran la *forma* (no-texto, 4,14:1 ✔), no el contraste del glifo | Reescribir el punto 1 y el cierre de §8.2: «aun clasificando como texto grande, 2,86 < 3,0 → **no cumple AA en ningún tamaño**; es deuda de marca declarada». Y convertir en decisión explícita de Victoria: mantener crema (deuda) o activar `--btn-ink: chocolate` (3,96:1, AA-large ✔) como valor por defecto | XS |
| **MAYOR-05** | `02-copys.md:172` | **El H1 francés está mal escrito:** «Vichito, **le** Año Viejo». En francés, «le» ante vocal elide → «**l'**Año Viejo». El propio documento usa «l'Año Viejo» en `:184` y `:194-209`; la incoherencia cae en el texto más visible de la versión FR | `hero.title` FR = «Vichito, l'Año Viejo». Revisar también `:178` (la nota justifica «the / le», corregir a «the / l'») | XS |
| **MAYOR-06** | `02-copys.md:241` | **La nota de pedido del bloque 5 no muestra el teléfono que exige el encargo.** `_contexto-encargo.md:134` pide literalmente «Nota de pedido: WhatsApp `514-296-8295` o DM Instagram `@vichisboho`». El copy entrega solo «También por DM: @vichisboho»: el número no es visible hasta el pie. Es requisito literal, no preferencia | `buy.note` ES = «WhatsApp 514-296-8295 · También por DM: @vichisboho» (+3 palabras → 20/25 ✔); adaptar EN/FR. Alternativa: añadir el número como `caption` bajo el botón | XS |
| **MAYOR-07** | `01-cro.md:46` + `:260` | **Dos CTAs primarios rellenos en el mismo viewport.** `:46` establece «solo un CTA primario por pantalla visible… dos botones rellenos en el mismo viewport se anulan», pero el CTA del navbar es «**Primario compacto**», relleno terracota y **sticky**: coexiste con el primario del hero y con el del bloque 5 en todo el scroll. La propia regla se rompe en los tres bloques que más importan | Hacer el CTA del navbar **secundario**: píldora crema con texto chocolate y contorno terracota (11,35:1, sin deuda de contraste) o mostrarlo relleno solo tras pasar el hero. Actualizar `:46` y `:260` en consecuencia | S |

### 3.2 MENORES (pulido; ninguno impide codificar)

| ID | Archivo:línea | Descripción | Corrección sugerida | Esfuerzo |
|---|---|---|---|---|
| MENOR-01 | `02-copys.md:388` | Alt con palabra duplicada: «Stickers del calzoncito **amarillo amarillo**» — es una cadena que se lee en voz alta a usuarios de lector de pantalla | «Stickers del calzoncito amarillo, sobre fondo crema.» | XS |
| MENOR-02 | `02-copys.md:184,211,342` | Tipografía francesa: faltan los espacios finos antes de `?` exigidos por la convención («C'est quoi, l'Año Viejo?», «Une question sur le kit?»); el documento sí los usa antes de `:` (`:185`) | «…l'Año Viejo ?», «…sur le kit ?» (con espacio duro `\u00A0` para que no se parta) | XS |
| MENOR-03 | `02-copys.md:242,481,485` | El EN usa `8.95` frente a la línea literal del encargo (`8,95 $`). El checklist de Puerta 2 pide comparar la línea «carácter a carácter» (`01-cro.md:435`): un auditor literal lo marcará | Uniformar `8,95 $` en los tres idiomas (mismo carácter que el encargo) o eximir explícitamente el EN en el checklist | XS |
| MENOR-04 | `01-cro.md:307` vs `02-copys.md:178` | Contradicción: el CRO asigna `EyebrowPill` al Hero, Comprar y Mail Club; el copy decide **no** usarla en el hero por el presupuesto de 18 palabras | Actualizar `01-cro.md:307` (quitar «Hero»). El copy tiene razón: la palabra extra rompe el límite | XS |
| MENOR-05 | `01-cro.md:278` vs `02-copys.md:436-443` | El CRO agrupa `nav`/`hero`/`comprar` con un mismo prellenado «(vengo de la página)», lo que anula el marcador de sección; el copy los diferencia correctamente y cumple `01-cro.md:36-44` | Actualizar la tabla `:276-282` del CRO con los tres textos distintos del copy | XS |
| MENOR-06 | `_contexto-encargo.md:152` vs `01-cro.md:183-192` | El bloque 7 (Cierre) no tiene archivo en la lista mandatada (`FooterMailClub.jsx` cubre el 6). Riesgo de nombre inventado por `frontend-dev` | Añadir a la lista `src/components/SiteFooter.jsx` (bloque 7) y declararlo como adición justificada en el README del proyecto | XS |
| MENOR-07 | `02-copys.md:414` | Las tarjetas del kit muestran «Foto real: {título}» y debajo el `h3` con el **mismo título**: texto visible duplicado 8 veces y +8 etiquetas fuera del presupuesto de palabras | En las tarjetas del kit usar solo el prefijo corto («Foto real») o una etiqueta de 2–3 palabras por ítem; reservar la etiqueta larga para las fotos únicas (hero, tradición, retrato) | S |
| MENOR-08 | `01-cro.md:154` | El subrayado «una línea mostaza» sobre fondo crema es **1,31:1**: prácticamente invisible, no funciona como acento (no incumple, es decorativo, pero no se verá) | Cambiar el subrayado de los pasos a terracota sobre crema (2,86:1, trazo ≥ 3 px) o a chocolate | XS |
| MENOR-09 | `01-cro.md:7,34` | Dice «siete puntos de contacto»; la tabla `:36-44` y `:258-268` entregan **8** WhatsApp (+2 Instagram) | Corregir a ocho | XS |
| MENOR-10 | `01-cro.md:386,190` | Falta en la tabla de contraste el par **Rojo Maleta sobre Petróleo = 1,08:1** (casi invisible), usado como «acento» en el bloque 3 (`:142`) | Añadir la fila: «solo decoración con keyline crema ≥ 3 px; nunca texto ni icono informativo» | XS |
| MENOR-11 | `01-cro.md:311` | El estado inactivo del selector de idioma queda como «contraste atenuado pero legible»: ambiguo y no verificable | Fijar token: `--ink-muted: #5C4A38` sobre crema = **6,66:1** (cómodo para 16 px). Alternativas medidas: `#6B5340` 5,66 · `#7A6450` 4,41 (no usar) | XS |
| MENOR-12 | `02-copys.md:57` | El diccionario no tiene claves de `<title>`, meta description ni Open Graph: la página saldría publicada como «Vite + React» | Añadir 3 claves × 3 idiomas (`meta.title`, `meta.description`, `meta.ogAlt`) y fijarlas en `index.html` + efecto en el idioma activo | S |
| MENOR-13 | `02-copys.md:533` vs `01-cro.md:411` | 5 caras tipográficas frente al objetivo «≤ 4 archivos de fuente» del CRO. El copy ya ofrece la solución (descartar Nunito 600) | Decidir: mantener 5 caras (5 woff2 es aceptable) y corregir `:411`, o descartar Nunito 600. No ambas cosas | XS |
| MENOR-14 | `02-copys.md:230` vs `:439` | La nota de decisión dice «nada de “sin experiencia”» pero el prellenado `wa.steps` sí la usa. No es contradicción de producto (uno es copy de página, el otro es mensaje de WhatsApp) pero se lee como descuido | Aclarar la nota: «sin experiencia» se excluye del copy visible, no del mensaje prellenado | XS |
| MENOR-15 | `_contexto-encargo.md:92` | El encargo escribe «Pie del hero: logo `vichisboho`» (sin asterisco) mientras el wordmark de marca es `vichisboh*` (`:76`). El copy usa el wordmark en todo el sitio | Confirmar con Victoria si el pie del hero es wordmark `vichisboh*` o el handle `@vichisboho`; si es lo segundo, hay que añadir el `@` | XS |
| MENOR-16 | `02-copys.md:246,495` | `price.amountTemplate` EN = `${amount}`: si esa cadena se escribe alguna vez entre backticks o se usa como plantilla, `$` abre interpolación y el importe se pierde | Guardar como cadena simple `'${amount}'` con comillas simples y sustituir con `.replace('{amount}', Intl.NumberFormat(...).format(n))`. Nunca construir el href ni el precio con template literals que contengan esta clave | XS |
| MENOR-17 | `_contexto-encargo.md:121-123` | Los 3 pasos de la sección 4 se **parafrasean** (el paso 3 pierde «con el alcohol» y «en la billetera»; el 1 pierde «en tus tarjetas»). El copy declara protegidos solo hero/tradición/Victoria/Mail Club/kit (`02-copys.md:15`). Si Victoria considera «oficiales» también los pasos, hay incumplimiento | Una línea de Victoria: ¿los pasos son texto protegido o copy editable? Si protegidos, no caben en ≤ 12 palabras y hay que ampliar el presupuesto del bloque | XS |

---

## 4. Verificación de contraste WCAG (recalculada por el verificador)

Fórmula aplicada: luminancia relativa sRGB (canal / 12,92 si ≤ 0,03928; si no, `((c+0,055)/1,055)^2,4`), ratio `(L_claro+0,05)/(L_oscuro+0,05)`. Umbrales WCAG 2.x: AA texto normal **4,5:1**, AA texto grande (≥ 24 px, o ≥ 18,66 px en negrita) **3,0:1**.

### 4.1 Los 12 pares declarados en `01-cro.md` §8.1

| Combinación | Ratio recalculado | Cifra del documento | ¿Coincide? | Veredicto AA (mi criterio) |
|---|---|---|---|---|
| Chocolate `#3B2517` sobre Crema `#F4E2CD` | **11,35:1** | 11,35 | ✔ | **AA ✔ · AAA ✔** |
| Chocolate sobre Mostaza `#E3C93C` | **8,67:1** | 8,67 | ✔ | **AA ✔ · AAA ✔** |
| Oliva `#50664B` sobre Crema | **4,97:1** | 4,97 | ✔ | **AA ✔** (justo) |
| Crema sobre Rojo `#B93A30` | **4,48:1** | 4,48 | ✔ | **Falla AA por 0,02** → solo texto grande (AA-large ✔) |
| Crema `#F4E2CD` sobre Petróleo `#1B7A63` | **4,14:1** | 4,14 | ✔ | **Falla AA normal**; AA-large ✔ (≥ 18,66 px bold / 24 px) |
| Chocolate sobre Terracota `#F04E0C` | **3,96:1** | 3,96 | ✔ | **Falla AA normal**; AA-large ✔ (token alterno del CTA) |
| Mostaza sobre Petróleo | **3,16:1** | 3,16 | ✔ | AA-large ✔; **no texto corrido** (y ✔ como foco no textual ≥ 3:1) |
| Crema sobre Terracota | **2,86:1** | 2,86 | ✔ | **Falla AA y AA-large** → deuda del CTA (MAYOR-04) |
| Terracota sobre Crema | **2,86:1** | 2,86 | ✔ | Solo trazo decorativo |
| Chocolate sobre Petróleo | **2,74:1** | 2,74 | ✔ | Prohibido para texto ✔ |
| Oliva sobre Petróleo | **1,20:1** | 1,20 | ✔ | Prohibido ✔ |
| Terracota sobre Petróleo | **1,45:1** | 1,45 | ✔ | Solo decoración ✔ |

**Resultado: 12/12 cifras correctas.** La tabla de `01-cro.md` §8.1 es exacta, no estimada: eso es poco común y merece decirse.

### 4.2 Pares que faltan en la tabla (los calculé porque los documentos los usan)

| Combinación | Ratio | Dónde se usa | Veredicto |
|---|---|---|---|
| Rojo `#B93A30` sobre Petróleo | **1,08:1** | «stickers rojo maleta solo como acentos» en el bloque 3 (`01-cro.md:142`) | **Invisible**: solo decorativo con keyline crema. **Falta declararlo** (MENOR-10) |
| Mostaza sobre Crema | **1,31:1** | Subrayado mostaza de los pasos (`01-cro.md:154`) | **Invisible**: no funciona como acento (MENOR-08) |
| `#5C4A38` sobre Crema | **6,66:1** | Candidato a token `--ink-muted` (idioma inactivo) | **AA ✔** — recomendado |
| `#7A6450` sobre Crema | 4,41:1 | Candidato alterno | Falla AA por 0,09: **no usar** |
| Petróleo sobre Crema (texto petróleo en panel crema) | **4,14:1** | No usado; aviso por si alguien invierte el patrón | Falla AA normal |

### 4.3 Dónde el sistema de contraste se rompe en la práctica

1. **Subtítulo del hero** (17 px crema/petróleo = 4,14): **falla AA**. Es el hallazgo más importante de esta sección → **MAYOR-01**.
2. **Texto sobre rayas** (Cierre): no existe color que cumpla contra ambas franjas → **MAYOR-02**.
3. **CTA crema/terracota** (2,86): falla incluso AA-large. La mitigación por tamaño **no** la resuelve; el keyline y el halo mejoran la forma, no las letras → **MAYOR-04**. El `aria-label` no compensa para quien ve poco.
4. **Aciertos que hay que conservar:** todo texto pequeño vive en `CloudBlob`/`CloudCard` crema (11,35); el foco es mostaza sobre petróleo (3,16 ✔ ≥ 3:1) y chocolate sobre crema (11,35); los `alt` describen la foto real y no son decorativos; los SVG decorativos van en `aria-hidden` (`01-cro.md:404`).

### 4.4 Cobertura alt / aria-label

| Requisito | Resultado |
|---|---|
| `alt` por cada foto real (13 fotos + 1 opcional) | ✔ 14/14 en `02-copys.md:385-398`, × 3 idiomas |
| `aria-label` por control interactivo | ✔ 16/16 × 3 idiomas (`02-copys.md:158-164,362-375,244,420`) |
| Etiquetas de placeholder visibles | ✔ 7 en `02-copys.md:406-412` |
| Enlace «saltar al contenido» | ✔ `02-copys.md:420` |
| `lang` del documento al cambiar idioma | ✔ especificado (`01-cro.md:403`); recordatorio: el botón EN debería llevar `lang="en"` propio — atributo, no clave de diccionario |

---

## 5. Verificación de viabilidad técnica (React + JSX + Tailwind + Vite, dependencias estándar)

| # | Promesa del documento | Veredicto | Fundamento y riesgo |
|---|---|---|---|
| V1 | `SquigglyFrame` SVG reutilizable con 3 variantes, trazo terracota 3–4 px, sin recortar la foto, conservando proporción (`01-cro.md:301`) | **Viable con condición** | Un `<path>` de garabato escalado con `preserveAspectRatio="none"` deforma el trazo y estira los bucles. **Condición obligatoria:** `vector-effect="non-scaling-stroke"` + viewBox con relación fija, o marcar el marco como `position:absolute; inset:0` con un `viewBox` por relación de aspecto (4/5, 3/4, 1/1, 16/9). Sin eso, el hero y el retrato se verán distintos. Añadir al checklist de Puerta 2 |
| V2 | `CloudBlob` / `CloudCard`: nube orgánica crema con borde de lápiz terracota (`:302,306`) | **Viable** | `border-radius` asimétrico resuelve la forma, pero **no** produce borde de lápiz; se necesita `clipPath` SVG con 2–3 paths pre-dibujados + `stroke` superpuesto. Coste real: 2–3 paths manuales, sin librerías. Riesgo: con `clip-path` el borde no se puede animar con `border`; aceptable |
| V3 | `StripedBackdrop`: rayas verticales anchas petróleo/crema con bordes orgánicos + textura de papel 5–8 % (`:303`) | **Viable con decisión de implementación** | `repeating-linear-gradient` con paradas duras es la vía corta, pero el encargo prohíbe «degradados» (`_contexto-encargo.md:58`) y un revisor literal podría leer `linear-gradient` como violación. **Recomiendo `<pattern>` SVG o franjas con `background-size` + dos colores**, y documentar la elección. Las franjas verticales se obtienen con `90deg` (eje horizontal) — error clásico: `0deg` da franjas horizontales. La textura debe ir en una capa `pointer-events:none; aria-hidden`, nunca sobre fotos |
| V4 | Tres tipografías de Google Fonts en `index.html`, `preconnect` + `display=swap` (`02-copys.md:522`) | **Viable ✔** | URL sintácticamente válida: Baloo 2 (variable, 700/800), Nunito (variable, 400/600), EB Garamond `ital,wght@1,400`. Subconjuntos latin/latin-ext por `unicode-range`. Única nota: son **5 caras** (MENOR-13) |
| V5 | Sistema trilingüe reactivo con ES por defecto, contexto ligero, `lang` actualizado, conserva scroll (`01-cro.md:78,403`) | **Viable ✔** | Contexto + `useState('es')` + `document.documentElement.lang = lang` en un `useEffect`. Para «conservar scroll» basta con no remontar el árbol (no usar `key={lang}` en el `<main>`). Persistencia ligera en `useState` (no hace falta `localStorage`) |
| V6 | Prellenado de WhatsApp por idioma y sección, 24 valores, URL-safe (`02-copys.md:428-458`) | **Viable ✔ y verificado** | Comprobé programáticamente los 24 valores contra `encodeURIComponent`: **24/24 exactos**, incluido el emoji 🧡 como `%F0%9F%A7%A1` y los apóstrofos sin escapar (`I'd`). El `href` resultante es URL-safe. **Riesgo de implementación declarado** (`:458`): si `frontend-dev` vuelve a codificar, el `?text=` llegará con `%25` y el mensaje se romperá. Recomiendo **más robusto**: guardar el texto **legible** y codificar una sola vez al render (`\`https://wa.me/15142968295?text=${encodeURIComponent(msg)}\``), usando la tabla §6.2 como *fixture* de verificación, no como dato |
| V7 | `PriceSlot` configurable con 3 estados y «hidden» por defecto sin hueco (`01-cro.md:327-343`, `02-copys.md:505-513`) | **Viable ✔ con 1 trampa** | Un único objeto de configuración (`kitPrice`, `availability`) resuelve los tres estados sin tocar componentes. **Trampa:** `price.amountTemplate` EN = `${amount}` — si se escribe entre backticks se interpreta como interpolación. Ver MENOR-16. También: `Intl.NumberFormat` con `'es-CA'`/`'fr-CA'`/`'en-CA'` es válido, pero conviene `try/catch` o `'es'`/`'fr-CA'`/`'en-CA'` como fallback |
| V8 | `PhotoSlot` con proporción fija, sin salto de layout, etiqueta visible y alt real (`:312`) | **Viable ✔** | `aspect-ratio` + `object-fit:cover`; el placeholder es un `div` con la etiqueta, sustituible por `<img>` sin tocar el layout. 14 contenedores, 4 relaciones (4/5, 3/4, 1/1, 16/9) |
| V9 | Doodles SVG inline ≤ 2 KB, `aria-hidden`, rotaciones −8°/+8°, máx. 3 por viewport (`:305,246`) | **Viable ✔** | Son 4 primitivas (estrella, espiral, subrayado, rayitas). Sin librerías. El límite «3 por viewport» es criterio visual, no medible automáticamente: que la Puerta 2 no lo trate como ítem binario |
| V10 | Sin dependencias extra, sin vídeo, sin carrusel, sin cookies de terceros (`:410-414`) | **Viable ✔** | Coherente con el stack mandatado (`_contexto-encargo.md:150`) |
| V11 | «Página funcional sin JavaScript más allá del conmutador» (`:415`) | **NO viable** | Contradice el stack CSR → **MAYOR-03**. Reformular la promesa |
| V12 | Fondo con textura «en mosaico < 20 KB» (`:413`) | **Viable con condición** | Requiere un asset de textura **real** (PNG/WebP tileado); no existe todavía. Alternativa sin binarios: `feTurbulence` SVG en un `<filter>` — pesado en móvil gama media, contradeciría `:414`. Recomiendo: textura opcional, y si no llega, sustituir por trama CSS de puntos al 4 % |

**Conclusión de viabilidad:** 9 viables, 3 viables con condición documentada (V1, V3, V12) y 1 no viable como está escrita (V11, que es una frase del documento, no del diseño). **Ningún requisito del encargo es imposible** con React + Tailwind + Vite sin dependencias extra. El punto más frágil, y el que exige más mano de obra real, es el sistema de marcos/nubes SVG (V1+V2): es el corazón de la identidad artesanal y no es «copiar y pegar», es dibujar 4–6 paths. Conviene que `frontend-dev` lo aborde **primero**, antes de las 8 secciones, porque condiciona la retícula.

---

## 6. Riesgos editoriales y las 4 decisiones pendientes de Victoria

**Criterio general:** una decisión abierta **bloquea** la Puerta 1 solo si (i) impide escribir código sin adivinar, o (ii) puede violar una regla dura. Ninguna de las cuatro cumple (i) ni (ii): todas tienen un valor por defecto ya implementable y documentado, y las cuatro son **ratificaciones editoriales**, no decisiones estratégicas. Por tanto: **no bloquean**, y deben cerrarse en una «Fase 1.5» de ratificación antes de **publicar** (no antes de codificar).

| # | Decisión | ¿Bloquea Puerta 1? | Criterio del verificador |
|---|---|---|---|
| E1 | Recortar los 6 ítems del kit que exceden 9 palabras, o mantener el texto completo | **No**, con condición | Mantener el texto oficial (regla de oro 1) es la decisión correcta y no admite discusión: recortar el texto de Victoria es competencia de Victoria, no del copywriter. **Condición:** hay que declarar el conflicto *de líneas* (no solo de palabras) y enmendarlo en el CRO, porque el checklist 17 de Puerta 2 exige «presupuesto respetado» y haría fallar el entregable por algo ya aprobado. Fallback aprobado: máximo 2 líneas por tarjeta, 28 px de aire, tipografía escalonada; y si la tarjeta se ve cargada, **se recorta el aire de la sección, no la foto** |
| E2 | Quitar la última frase del cuerpo del Mail Club (30 → 12 palabras) | **No** | Correcto mantener el texto completo hasta que Victoria lo autorice. La frase «Inscríbete a la lista de espera por DM o WhatsApp» es la que **elimina la ambigüedad** de canal (sin ella, alguien puede buscar un formulario inexistente). Recomiendo **no** recortarla aunque Victoria autorice: el exceso de 5 palabras no daña la página y la frase hace trabajo de conversión. Dejar la propuesta sobre la mesa, con esa objeción escrita |
| E3 | «Bobettes jaunes» vs «petites culottes jaunes» | **No** | Decisión 100 % editorial y local. «Bobettes» es la palabra quebequense de uso real, cálida y coherente con «Allo»; «petites culottes» es más neutro pero más «de manual» y, en Francia, tiene connotación infantil. Recomiendo **bobettes**, y dejar la alternativa en el diccionario como comentario, no como clave nueva. Mismo número de líneas (2 vs 3 palabras) → no afecta al diseño |
| E4 | Ratificar el tuteo del FR y el saludo «Allo» | **No** | Coherente con el encargo («adaptación cultural cálida, cercana, en primera persona») y con el registro quebequense. «Allo» es el saludo informal real en Quebec (no «Bonjour» distante ni «Salut» de manual). Recomiendo ratificar ambos. **Riesgo mínimo a documentar:** en FR conviene revisar que no queden «vous» sueltos: en el corpus no hay ninguno |

**Riesgos de negocio no bloqueantes que conviene poner por escrito para Victoria:**

1. **El Mail Club es un club de *correo*, pero la página no captura correo** (correcto según el encargo). Consecuencia operativa: Victoria recibe DMs y WhatsApps y **tiene que añadir a mano** cada contacto a su lista, en mitad de diciembre. Recomendación: una nota de proceso en el documento de entrega; y que el mensaje prellenado `wa.mailclub` ya diga «lista de espera», para que ella sepa qué hacer al recibirlo (ya lo dice ✔).
2. **Ley 25 (Quebec) / consentimiento:** al no haber formulario, el consentimiento se da en la conversación. Es defendible, pero conviene que Victoria guarde el hilo como prueba. No requiere cambios en la página.
3. **«Gratis desde 60 $» con precio del kit pendiente:** si el kit cuesta menos de 60 $, el umbral de envío gratis nunca se activa (aunque la línea es obligatoria). No es un problema de la página, pero sí una conversación que llegará por WhatsApp: conviene que Victoria tenga la respuesta antes de diciembre.
4. **Envío del alcohol:** el brief ya lo detecta (`00-brief.md:189`). El copy **no promete** plazos ni método ✔ y el paso 3 se queda en lo simbólico ✔. Riesgo asumido correctamente.
5. **El hero depende de una foto que todavía no existe:** si la foto del Vichito con el cartel no llega, el bloque 1 no tiene plan B (el `PhotoSlot` con etiqueta es honesto, pero el hero pierde su argumento). Recomendación: que Victoria confirme la fecha de esa foto antes de congelar el copy del hero.
6. **«Vichito de la abundancia» / alt del ítem 4** cita el texto de la tarjeta rayada: si la tarjeta impresa cambia de texto, hay que actualizar el `alt`. Detalle de mantenimiento, no de Puerta 1.

---

## 7. Recomendaciones para la Puerta 2 (y enmiendas al checklist del CRO)

El checklist de `01-cro.md` §9 (18 ítems) es un buen contrato de aceptación, pero **dos ítems están mal calibrados** y harían fallar el entregable por motivos ya aprobados en esta Puerta 1:

1. **Ítem 17** (`01-cro.md:441`) — «Presupuesto de palabras respetado por bloque (§3.1) y ninguna sección nueva»: imposible de cumplir tal cual (6 ítems del kit y el Mail Club exceden por texto oficial protegido). **Enmienda:** «presupuesto respetado **o excepción declarada en §4.3/§3.7 del copy y aprobada por Victoria**; ninguna sección comercial nueva además de las 6 + navbar + cierre».
2. **Ítem 12** (`:436`) — «contenedores de foto real con etiqueta de placeholder»: tal como está, la etiqueta visible duplica el título en las 8 tarjetas (MENOR-07). **Enmienda:** «etiqueta de placeholder presente y no duplicada; se acepta etiqueta corta por tarjeta».

Añadir tres ítems verificables:

3. **Texto nunca directamente sobre `StripedBackdrop`:** todo texto de los bloques 5 y 7 sobre panel sólido; comprobar el contraste del par efectivo (MAYOR-02).
4. **`vector-effect="non-scaling-stroke"` (o marco por relación de aspecto)** en los SVG de marco y nube: el trazo no se estira al cambiar de tamaño (V1).
5. **Meta del documento en los 3 idiomas:** `<title>` y `description` reales, no «Vite + React» (MENOR-12).

Y dos recordatorios de proceso:

6. **Orden de construcción sugerido:** (1) tokens + fuentes + `translations.js`; (2) `SquigglyFrame`/`CloudBlob`/`StripedBackdrop`; (3) Navbar + Hero; (4) resto; (5) `PriceSlot` y estados; (6) pasada de contraste y teclado. Los marcos primero: condicionan todo lo demás.
7. **Pruebas mínimas de Puerta 2 que yo ejecutaré:** `grep` de `href` (solo 2 dominios), `grep` de `<form|<input|onSubmit`, búsqueda de importes (`/\d+\s*\$|CAD\s*\d/`), los 24 `?text=` abiertos en los 3 idiomas, recorrido con teclado de los 8 bloques a 375/768/1280, y conteo de palabras por bloque contra la tabla de §2.2 de este informe.

---

## 8. Firma

**Verificador Técnico — Puerta 1**
Fecha: 16 de noviembre de 2026
Alcance: auditoría documental de `_contexto-encargo.md`, `00-brief.md`, `01-cro.md`, `02-copys.md`. La verificación de código (JSX/Tailwind, build, DOM) corresponde a la Puerta 2 y no se ha realizado aquí.

**Método:** lectura íntegra de los 1.363 renglones del corpus + verificación programática de las afirmaciones verificables (5 bloques de texto oficial comparados carácter a carácter con el encargo, 24 URLs de WhatsApp contra `encodeURIComponent`, recuento de las 108 claves y de los presupuestos de palabras, cálculo de 17 ratios WCAG con la fórmula de luminancia relativa).

**Veredicto:** `ESTADO: APROBADO` — 0 bloqueantes, 7 MAYORES (todas ediciones puntuales dentro de los documentos actuales), 17 MENORES. Con las 7 MAYORES aplicadas y las 4 decisiones de Victoria ratificadas antes de publicar, el entregable es apto para iniciar la codificación.
