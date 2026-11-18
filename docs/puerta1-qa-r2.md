VEREDICTO: APROBADO

**Re-auditoría de Puerta 1 — ronda 2 (verificación de correcciones)** · «Vichito, el año viejo» · `vichisboh*`
Auditado: `docs/00-brief.md` v2 (240 líneas), `docs/01-cro.md` v2 (552), `docs/02-copys.md` v2 (609, 109 claves), contra la ley del encargo `docs/_contexto-encargo.md` y contra mi propio informe de ronda 1 (`docs/puerta1-qa.md`: 5 MAYORES + 13 MENORES).
Rol asumido: **clienta final (Victoria) + comprador de diciembre en Montreal**. Se juzga el efecto en pantalla, no la promesa del registro de cambios.
Fecha: 16 de noviembre de 2026 · Faltan 45 días para el 31 de diciembre.

**Resumen del dictamen:** de los 18 hallazgos de la ronda 1, **17 están cerrados de verdad** (texto corregido, citado y verificado carácter a carácter) y **1 queda parcial**: la línea de diciembre (M5) existe, es honesta y Victoria puede cumplirla, pero **ningún documento le ha asignado un sitio en el bloque Comprar**, y esa colocación es justamente lo que hace que esa frase sirva o no sirva. Lo que se corrigió se lee **mejor**, no peor: el hero ya explica el producto en la primera pantalla, el bloque 3 ya tiene puerta donde nace la duda, y el cierre ya no pone letras sobre las rayas. Aparecen **9 hallazgos nuevos, todos menores**, ninguno bloqueante: son huecos de especificación y de aritmética visual que la Puerta 2 debe cerrar en el código. **Autorizo el paso a `frontend-dev` con seis condiciones verificables** (§7).

---

## Resumen ejecutivo para Victoria

Victoria: volví a leer la página de arriba abajo como la lee tu compradora de diciembre, y esta vez lo que encuentro es bueno, así que te lo digo sin adornos: **tu voz sigue intacta**. Revisé otra vez, letra por letra y no de memoria, tus cinco bloques de texto —el hero, tu explicación del 31, las ocho cosas del kit, «Hola, soy Victoria» y el Mail Club— y están exactamente como los mandaste, hasta el ítem del billete que va sin punto final. Nadie te tocó una coma.

Lo que se arregló se nota en el teléfono. **Ahora, cuando alguien entra desde Instagram, lo primero que lee no es solo «Hibérnate»**: debajo del titular hay una píldora crema con tu frase —«Un ritual colombiano para despedir el año con tus manos»— y justo debajo el botón naranja. Antes esa frase caía por debajo de la pantalla y el muñeco se la comía. Ahora entra, y el muñeco asoma en cuanto bajas un dedo. Además, **el número 514-296-8295 ya se ve en el bloque de compra**, no solo al final; y en el medio de las ocho nubes hay un botón para preguntar, para quien se cansa a la cuarta.

Hay una frase nueva que lleva tu nombre y que quiero que leas con calma: **«Pedidos de diciembre: te confirmo la fecha por WhatsApp.»** La escribimos para contestar la pregunta que todo el mundo hace en diciembre —«¿me llega antes del 31?»— sin prometer una fecha que no es nuestra. Te la leo como si la hubieras escrito tú: la puedes cumplir sola, en tu taller, porque no promete un plazo, no promete un transportista y no dice «mañana contesto»; promete que a cada pedido le vas a decir una fecha por WhatsApp. Eso sí: es la única frase de la página escrita en tu primera persona que **te crea una obligación de respuesta** en tu mes más ocupado. Por eso sigue siendo tuya la última palabra, y también es tuya la de la casilla de al lado: **el precio**. No la inventamos y no la vamos a inventar.

Tres cosas siguen en tus manos y ninguna de las tres es culpa del documento: **el precio**, **si el alcohol puede viajar** a otra provincia (hoy la página ofrece «Resto de Canadá 8,95 $» para un kit que lo lleva dentro) y **hasta qué día tomas pedidos**. Con la línea nueva, la tercera tiene respuesta aunque no tengas la fecha. Con las otras dos, la página se publica igual —pero se publica más honesta si las contestas antes.

Y un detalle de cocina, sin dramatizar: cuando se abra esta página en el navegador, la pestaña tiene que decir algo tuyo, no «Vite + React», y el enlace que mandes por Instagram tiene que mostrar un título y una frase. Eso todavía no está escrito. Son cinco minutos de trabajo del equipo, pero **antes de publicar**, no después.

---

## 1. Cierre de M1–M5 (verificado en el texto, juzgado en pantalla)

| # | Qué pedí en la ronda 1 | Dónde quedó (v2) | Veredicto | Efecto en pantalla |
|---|---|---|---|---|
| **M1** | Teléfono visible en el bloque Comprar | `02-copys.md:247` `buy.note` = «WhatsApp 514-296-8295 · DM @vichisboho» (idéntico en ES/EN/FR); `00-brief.md:151`; orden del bloque en `01-cro.md:234` («…→ envíos → nota de pedido») | **CERRADO** | Bajo el botón del bloque 5 se lee el número en texto real (chocolate sobre crema, 11,35:1). Quien está en computadora sin WhatsApp Web lo copia; quien quiere escribir el lunes lo guarda. Deja de ser un dato que solo existe al final de la página. |
| **M2** | Subtítulo del hero dentro del primer viewport a 375 × 667 y contraste resuelto | `01-cro.md:230` (orden móvil nuevo), `:398` (§7), `:411` (garantía del primer viewport), `:127` (píldora crema + texto chocolate 17 px); `00-brief.md:170` | **CERRADO** | Recalculé la aritmética con las medidas del propio documento: navbar 56 + padding 56 + H1 en 2 líneas (~71) + eslogan 30 + píldora (~75) + CTA 52 + 3 separaciones (16–24) ≈ **384–416 px de 667**. Con la píldora de 3 líneas en FR, ≈ 440. El subtítulo entra con más de 200 px de sobra y **la foto asoma unos 250 px** por debajo del pliegue: se ve el muñeco y el cartel sin bajar. Contraste: chocolate `#3B2517` sobre crema `#F4E2CD` = **11,35:1** (recalculado hoy, no copiado), AA y AAA. El contorno terracota de la píldora es 1,45:1 sobre petróleo, pero es decorativo: la forma se distingue por el relleno crema (4,14:1 no textual ✔). |
| **M3** | «Diciembre 2026» frente a «Enero 2027» | `02-copys.md:242` `buy.eyebrow` = «Diciembre 2026 / December 2026 / Décembre 2026»; `:251` `price.availabilityAria` («…en diciembre de 2026», para que el paralelismo también exista en lector de pantalla); `:268` `mailclub.eyebrow` = «Enero 2027» | **CERRADO** | Dos etiquetas de dos palabras, misma forma, a una pantalla de distancia: **«Diciembre 2026»** arriba del botón, **«Enero 2027»** en la nube del club. La línea de tiempo se arma sola: ahora el kit, después el club. Quedan tres menciones viejas («temporada 2026») **en el CRO** que el frontend podría implementar por error → hallazgo nuevo **N2**. |
| **M4** | «l'Año Viejo» en el H1 francés | `02-copys.md:178` `hero.title` FR = «Vichito, l'Año Viejo»; nota corregida en `:184`; **cero** cadenas entregadas con «le Año» (solo lo cita el registro de cambios, `:584`, para documentar el antes/después) | **CERRADO** | La primera línea que lee un quebequense ya no tiene errata. Elisión correcta y el nombre propio intacto, como estaba bien escrito dos líneas más abajo en la tradición. |
| **M5** | Una línea sobre pedidos de diciembre, honesta, sin prometer plazos | `02-copys.md:248` `buy.deliveryNote` = «Pedidos de diciembre: te confirmo la fecha por WhatsApp.» (+EN/FR); clave declarada en `:101`; razón y coste en `00-brief.md:192-196`; **pero no aparece ni una vez en `01-cro.md`** | **PARCIAL** | El **texto** está cerrado y es honesto: no promete día, no nombra transportista, no dice «llega antes del 31»; desplaza la certeza a la conversación, que es el único sitio donde Victoria puede cumplirla. Lo que falta es **el sitio en la pantalla**: el CRO ordena el bloque 5 como «…→ CTA → envíos → nota de pedido» (`01-cro.md:234`) y no menciona esta línea en §2.6, §3.2 ni en la tabla de CTAs. Si el frontend la coloca en 13 px debajo de los envíos, la frase existirá y no servirá de nada. Se cierra en Puerta 2 con la condición **C5**. |

**Juicio global sobre M1–M5:** cuatro cerrados de verdad, uno cerrado en contenido y abierto en colocación. No hay ninguno revertido ni maquillado.

---

## 2. Cierre de m1–m13

| # | Qué pedí | Dónde quedó | Veredicto | Comentario verificable |
|---|---|---|---|---|
| **m1** | `alt` con «amarillo amarillo» duplicado | `02-copys.md:395` | **CERRADO** | «Stickers del calzoncito amarillo, sobre fondo crema.» Búsqueda mecánica de «amarillo amarillo» en todo el documento: **0 resultados**. |
| **m2** | «stylo» en vez de «crayon» | `:208` («Un stylo»), `:398` («Un stylo de bois»), `:228` y `:403` («avec le stylo») | **CERRADO** (sujeto a D6) | Ninguna cadena FR entregada dice «crayon»; las 5 apariciones que quedan están en las notas que explican la decisión (`:220`, `:313`, `:573`, `:589`, `:605`). El inventario ya no puede mentir sobre el objeto. |
| **m3** | Restituir los pasos del ritual | `:228` «…con el lapicero, **en tus tarjetas**.» · `:232` «…**con el alcohol**, el 31 a medianoche, y guarda tu billete **en la billetera**.» | **CERRADO** | Cotejados los cinco fragmentos contra `_contexto-encargo.md:121-123`, uno a uno: están todos. El alcohol y el billete —los dos objetos que más intrigaban— recuperan su instrucción. Coste declarado: 14 / 8 / 17 palabras por paso. |
| **m4** | Espacio fino antes de «?» en francés | 8 cadenas FR únicas con signo doble (`:190, :191, :217, :248, :255, :394, :401, :415`) | **CERRADO** | Verificado byte a byte: **todas** usan U+00A0 (espacio duro), no espacio simple. Los únicos espacios simples del documento están en el registro de cambios (`:591`), que cita el antes y el después. *(El registro dice «9 cadenas»; son 8 únicas contando `:217`/`:349` y `:255`/`:520` una vez. Detalle sin efecto.)* |
| **m5** | «to call in abundance» | `:213` | **CERRADO** | «to bring abundance». Las dos apariciones restantes del error están en el registro, citándolo. |
| **m6** | «correspondance créative» | `:270` | **CERRADO** | «Le club de correspondance créative arrive en janvier 2027 — ça commence bientôt.» Suena a Quebec, no a calco. |
| **m7** | Promesas de líneas imposibles | `00-brief.md:149` (máx. 3 líneas por tarjeta), `:151` (envíos hasta 3 líneas, ≥ 14 px), `:155` (la tabla del brief prevalece y no se usa para rechazar); `01-cro.md:329, :340, :402`; `02-copys.md:328, :497` | **CERRADO** | El techo de 2 líneas y el «2 líneas en móvil» desaparecieron de los tres documentos. La Puerta 2 ya no puede tumbar el entregable por un requisito mal calculado. **Pero** el patrón reaparece en otro sitio: los pasos (ver **N6**). |
| **m8** | Contradicción navbar/hero (dos primarios) | `01-cro.md:53, :115, :274, :311, :331-332` | **CERRADO** | El CTA del navbar es **secundario en todo el scroll**, «nunca relleno terracota, ni siquiera tras pasar el hero», con píldora crema y texto chocolate (11,35:1, sin deuda). Un solo relleno terracota por viewport: hero o Comprar. En pantalla: el hero recupera el protagonismo. **Coste:** ahora hay tres píldoras crema seguidas en la barra → **N4/N5**. |
| **m9** | Moneda incoherente (prefijo/sufijo, `8.95`/`8,95`) | `:249` (envíos), `:253` (`{amount} $`), `:496` (§7.1), `:506` (§7.2), `:564` (autochequeo) | **CERRADO** | «8,95 $» literal en los tres idiomas, sufijo `$` y coma decimal también en EN; `price.amountTemplate` ya no contiene `${…}` (cierra de paso el MENOR-16 del técnico). |
| **m10** | Deriva de claves de prellenado | `02-copys.md:145, :454, :595`; `01-cro.md:291-293, :297` | **CERRADO** | `02-copys.md §6.2` es canónico con prefijo `wa.*`; la tabla antigua del CRO queda marcada como sustituida y sus claves cortas como obsoletas. La tabla histórica sigue visible (`01-cro.md:299-303`), pero rotulada: aceptable. |
| **m11** | `alt` que asumían fotos | `:393` («…listo para el 31 de diciembre», sin «sentado»), `:405` («Victoria en su taller de Montreal»), `:407` (ficha de producción: revisar los `alt` contra las fotos antes de publicar) | **CERRADO** (se completará con D9) | «sentado» y «rodeada de telas y de kits a medio armar» solo aparecen ya en el registro de cambios, describiendo lo que se quitó. El `alt` dice ahora únicamente lo que es seguro. |
| **m12** | «Llévate tu kit» | `:243` `buy.title` = «Pide tu kit / Ask for your kit / Demande ton kit» | **CERRADO** | El bloque 5 ya no invita a llevarse nada: el único verbo de tienda de la página es el del botón. Se lee más Victoria y no pierde nada de conversión. |
| **m13** | CTA del kit repetido tras la cuarta nube | `01-cro.md:154, :232, :276-277` (filas 3a/3b), `:355` | **CERRADO** | Mismo botón, misma clave `wa.kit`, ambos secundarios. Medido con las proporciones del propio CRO (tarjeta ≈ 415 px a 375): la puerta pasa de ~3.800 px a **~1.850 px** del inicio del bloque, es decir de ~5,7 pantallas a **~2,8**. Juicio de pantalla en §3 (bloque 3). |

**Resultado:** 13/13 menores cerrados. Ninguno fue «cerrado en el registro y abierto en el texto»: cada corrección está en la cadena que se va a implementar, no solo en la tabla de cambios.

---

## 3. Re-recorrido del visitante (v2, móvil 375, llego por Instagram, 90 segundos)

**Bloque 0 — Navbar (0–2 s).** `vichisboh*` en píldora crema, `ES | EN | FR`, y a la derecha una **píldora crema con «Comprar el kit»** en letra chocolate y contorno de garabato terracota. Ya no me grita: el único naranja relleno de la pantalla es el del hero, así que sé cuál es el botón importante.
**⚠ Sigue siendo una puerta, pero la puerta y las otras dos cosas de la barra son del mismo material.** Tres píldoras crema seguidas a 375 px: a primera vista parecen tres botones iguales y ninguno parece *el* botón; lo único que los separa es el contorno terracota, que es el mismo trazo del logo y del selector. Y hay un problema de sitio, no de gusto: logo (~145 px) + tres botones de idioma de 44 px (~145) + CTA (~94 con «Comprar») + separaciones ≈ **400–430 px** frente a los **335 px** útiles (375 menos 20 de margen por lado). No cabe en una fila, y el propio CRO prohíbe esconder el selector o el CTA (`01-cro.md:409`). No es que se pierda: es que se aprieta. Ver **N4/N5** y la condición **C4**.

**Bloque 1 — Hero (2–10 s).** Petróleo, «Vichito, el año viejo», «Hibérnate» en garamond, y debajo **una píldora crema con la frase que explica todo**: «Un ritual colombiano para despedir el año con tus manos». Debajo, el botón naranja a ancho completo. Y asomando por el borde inferior, el muñeco con el cartel «¡CHAO AÑO VIEJO!».
**Aquí está la mejora más grande de la ronda.** Antes, en este teléfono, yo leía un titular y una palabra rara y no sabía qué me vendían hasta bajar. Ahora lo sé en la primera pantalla, y el muñeco sigue ahí para engancharme. La píldora respira: 343 px de ancho, 20 de aire lateral, dos líneas de 17 px, 75 px de alto. No se apelmaza **por sí misma**.
**⚠ Se apelmaza el conjunto:** en el primer viewport hay cuatro formas redondeadas (tres píldoras crema en la barra + la píldora del subtítulo) y un botón. La cuarta —la del subtítulo— es la única que no es navegación, y sin embargo se ve igual que las otras tres. Si en el código no se diferencia (más ancha, contorno más fino, o sin contorno), el hero parecerá una barra de etiquetas. Lo que sí veo claro: la foto ya no manda en la primera pantalla y aun así asoma 250 px, así que el cambio se paga solo.

**Bloque 2 — La tradición (10–32 s).** Crema, aire, tu párrafo. Lo leo entero. «Te cuento: en Colombia, el 31 de diciembre quemamos el Año Viejo…». **Sigo emocionándome aquí y sigue siendo el mejor bloque de la página.** No cambió nada y no debía cambiar. ✔

**Bloque 3 — Qué trae el kit (32–62 s).** Ocho nubes, una por fila, foto cuadrada y una línea. A la cuarta, **aparece un botón de contorno: «Preguntar por el kit»**. Lo toco sin pensarlo, porque en ese momento tengo exactamente esa duda («¿el alcohol viene dentro? ¿de qué tamaño es la maleta?»).
**Gana, y no se siente publicitario.** La razón es la etiqueta: no dice «comprar» ni «llevar», dice *preguntar*; y el estilo (contorno, ancho de columna, sin relleno) no compite con las fotos. Es una mano levantada, no un cartel. Antes la única puerta a mano era la de la barra; ahora está donde nace la pregunta.
**⚠ Dos matices honestos:** (a) en ese punto de la pantalla conviven **dos** botones de la misma familia —el de la barra, que es sticky, y este—, así que conviene que este último sea visiblemente más callado (ancho de columna, sin sombra); (b) en escritorio el CRO lo coloca **tras la cuarta nube de una retícula 4×2** (`01-cro.md:232`), es decir **entre la fila de arriba y la de abajo**: allí el inventario se parte en dos y alguien puede leer «estas cuatro son el kit, las otras cuatro son extras». En móvil no pasa; en escritorio hay que mirarlo.

**Bloque 4 — Cómo funciona (62–72 s).** Tres verbos: Escribe, Arma, Quema. El paso 1 recuperó «en tus tarjetas» y el 3 recuperó «con el alcohol» y «en la billetera». **Ya sé qué hacer con el alcohol y con el billete**, que era mi curiosidad y mi duda de seguridad. ✔
**⚠** La tarjeta 3 es el doble de larga que la 2 (16 palabras de cuerpo frente a 8 en «Arma tu bichito y guárdalo hasta el 31»), y la frase del «y guarda tu billete» encadena dos instrucciones en un tirón. Se entiende, es texto del encargo y no se toca; solo hay que darle a la tarjeta altura suficiente para que no parezca que le falta algo (ver **N6**: serán 4 líneas y no 3).

**Bloque 5 — Comprar (72–85 s).** Rayas, panel crema, píldora **«Diciembre 2026»**, «Pide tu kit», «Me escribes y te contesto yo.», el botón naranja enorme, la línea de envíos en tres líneas y —esto es nuevo— **«WhatsApp 514-296-8295 · DM @vichisboho»** en letra de verdad, no un icono. Y en algún sitio, la línea nueva: «Pedidos de diciembre: te confirmo la fecha por WhatsApp.»
**El número visible cambia el tono del bloque:** deja de ser un embudo y pasa a ser una puerta con nombre y teléfono. La respuesta a «¿me llega antes del 31?» también cambia mi decisión: antes pensaba «si no lo dicen, es que no llega»; ahora pienso «le escribo y me dice».
**⚠ Y aquí está el único hueco real de la v2:** no sé **dónde** va esa frase, porque ningún documento lo dice. Si cae debajo de los envíos en 13 px, no la leo y volvemos al silencio de antes. Tiene que estar pegada al botón, en cuerpo de texto, sin scroll dentro del panel (**C5**).

**Bloque 6 — Victoria + Mail Club (85–92 s).** Te veo en el taller, leo «Hola, soy Victoria», y luego la nube del club con **«Enero 2027»**. Y como arriba leí **«Diciembre 2026»**, ahora sí entiendo la línea de tiempo sin que nadie me la explique: **lo de ahora son kits que se queman el 31; lo de enero es otra cosa.** ✔ Esto era exactamente lo que faltaba.

**Bloque 7 — Cierre (92–100 s).** Rayas, wordmark, WhatsApp, `@vichisboho`, «Hecho a mano en Montreal», y **todo el texto sobre un panel crema** — se acabó el riesgo de letras sobre las franjas. Cierro tranquila. ✔

**Veredicto de visitante (v2):** en 90 segundos ahora **sí** llego a la puerta del bloque 3 y **sí** llego al bloque 5 con el teléfono a la vista. Antes tocaba el botón del navbar o nada. Lo que empeoró es de detalle, no de fondo: la barra tiene demasiadas píldoras iguales y no cabe en una fila a 375 px (**N4/N5**); en escritorio el botón del medio parte el inventario en dos; y la frase de diciembre no tiene sitio asignado. **Ningún empeoramiento toca la voz de Victoria, el contenido ni la conversión.**

---

## 4. Checklist de validación

| Criterio | Estado | Comentario |
|---|---|---|
| **Textos oficiales de Victoria, carácter a carácter (ES)** | ✔ | Verificación programática de las 11 cadenas protegidas (hero ×3, tradición ×2, Victoria ×3, Mail Club ×2, línea de envíos) y de los 16 textos del kit: **11/11 y 16/16 idénticos**. Se conserva el ítem 4 sin punto final y las minúsculas iniciales. |
| **¿Le pusieron palabras en la boca?** | ⚠ | Una sola frase nueva en su primera persona: `buy.deliveryNote` (9 palabras). Las demás correcciones que la tocan son **texto del encargo restituido** (los pasos), no invención. Es honesta y sostenible sola (§1, M5 y §8 D3). |
| **Brevedad / «poco texto, mucho aire»** | ⚠ | Hero 18/18 ✔, tradición 66/70 ✔, Comprar 25/25 con la línea nueva ✔, Victoria 26/30 ✔, cierre 8/12 ✔. Excepciones declaradas: 6 de 8 ítems del kit, cuerpo del Mail Club (30/25) y **pasos 14/8/17** — las tres por texto protegido o mandatado. Ninguna excepción es copy propio. |
| **Claridad del producto en 5 segundos** | ✔ | Ahora sí se sostiene sola: titular + eslogan + **subtítulo visible** + foto que asoma. M2 cerrado. |
| **Precio pendiente: ¿incompleta o misteriosa?** | ⚠ | Bien resuelto técnicamente (tres estados del `PriceSlot`, `hidden` sin hueco). Sigue siendo la objeción nº 1 y la decisión es de Victoria (D1). No impide publicar. |
| **Envíos: 4 datos literales, 3 importes** | ✔ | Línea idéntica al encargo en ES; EN corregido a «8,95 $»; FR correcto. Hasta 3 líneas a 375 px, ≥ 14 px. |
| **Canal único WhatsApp/DM, cero formularios** | ✔ | 8 claves `wa.*`, 10 enlaces, 24 `?text=` intactos (ninguna corrección de la v2 entró en un prellenado). Cero formularios, cero pop-ups, cero email. |
| **Trilingüismo real ES/EN/FR (Quebec)** | ✔ | Elisión correcta (M4), **8 cadenas FR con espacio duro** antes de `: ? !`, «stylo», «correspondance créative», «Allo», tuteo, «bobettes jaunes». EN y FR más cortos o iguales que el ES en todos los ítems (14/11/14 en el más largo). Brevedad mantenida. *Único detalle de estilo:* el CTA del kit en FR es una pregunta («Une question sur le kit ?») frente al infinitivo ES y al imperativo EN: es bueno para Quebec, pero contradice la regla «todos los botones son verbos» (`02-copys.md:355`). No es defecto; conviene declararlo. |
| **Universo artesanal, cero estética SaaS** | ✔ | Marcos, nubes, rayas, doodles, tres tipografías, cero degradados, cero sombras difusas, cero iconos de librería. La textura de papel quedó como **trama CSS opcional** (no exige ningún binario). |
| **Móvil 375 px (documento)** | ⚠ | Orden del hero, CTA del medio, botones ≥ 44 px y CTA sticky: bien. **⚠ Ancho del navbar** (N4) y **densidad de píldoras** (N5): a resolver en pantalla. |
| **Nada de texto sobre las rayas (bloques 5 y 7)** | ✔ | Panel crema sólido obligatorio, franjas perimetrales de 40–56 px, regla general (`01-cro.md:223`) e ítem 20 del checklist. Correcto y verificable. |
| **Contraste** | ⚠ | Recalculados los 9 pares que uso: chocolate/crema 11,35 ✔ · crema/petróleo 4,14 (solo ≥ 24 px) · **crema/terracota 2,86 → deuda declarada, no AA en ningún tamaño** · chocolate/terracota 3,96 (AA-large) · mostaza/chocolate 8,67 ✔. La deuda del CTA está bien contada (2,86 < 3,0) y condicionada al keyline + halo reales (**C1**) y a la decisión D-CTA de Victoria. |
| **Mail Club = lista de espera, no compra** | ✔ | Etiquetas y `aria-label` lo dicen en los tres idiomas («no es una compra»). Y ahora el contraste «Diciembre 2026 / Enero 2027» construye la línea de tiempo. |
| **Cero invenciones comerciales** | ✔ | Solo 5 $, 8,95 $ y 60 $. Cero testimonios, descuentos, contadores. La línea nueva no promete plazo. Única obligación nueva: **responder con una fecha** a cada pedido de diciembre (§8, D3). |
| **Trazabilidad documento → código** | ✔ | Claves canónicas `wa.*`, mapa de archivos con `SiteFooter.jsx` declarado, 22 ítems de aceptación en `01-cro.md §9`. Sin nombres que el frontend tenga que inventar. |
| **Metadatos de la página (pestaña y enlace compartido)** | ✘ | `meta.title` / `meta.description` / `ogAlt` **no existen** en las 109 claves; el CRO los da por dependientes del copy v2 (`01-cro.md:473`) y el copy v2 no los trajo. Hoy la pestaña diría «Vite + React» y el enlace compartido por Instagram saldría sin título. **No bloquea la Puerta 2; bloquea publicar.** → **N8** |

---

## 5. Hallazgos nuevos por severidad

**BLOQUEANTES: ninguno.**
**MAYORES: ninguno.**

### MENORES (9)

| # | Archivo:línea | Hallazgo | Corrección |
|---|---|---|---|
| **N1** | Ausencia en `01-cro.md` (cf. `02-copys.md:248`, `00-brief.md:192`) | **La línea de diciembre no tiene sitio asignado en el bloque 5.** El CRO ordena «eyebrow → H2 → CTA → envíos → nota de pedido» (`:234`) y la define en la tabla de CTAs sin mencionarla (`:279`). Es el residuo que impide dar M5 por cerrado del todo: una frase que existe pero que el frontend puede enterrar. | Añadir al CRO el orden del bloque 5 con `buy.deliveryNote` **entre el CTA y la línea de envíos**, en cuerpo ≥ 15 px. Mientras se añade, se verifica por la condición **C5**. |
| **N2** | `01-cro.md:330, :377, :386` | **Residuos de «temporada 2026»** en el CRO después de que el copy la cambiara a «Diciembre 2026»: sigue en la descripción de `EyebrowPill` (`:330`), en el estado `hidden` del `PriceSlot` (`:377`) y en la justificación de §6.2 (`:386`). En `:330` además se sigue asignando `EyebrowPill` al **hero**, que el copy decidió no usar (`02-copys.md:184`). Riesgo real: el frontend lee el CRO y escribe la etiqueta vieja. | Sustituir las tres menciones y quitar «Hero» de la lista de usos de `EyebrowPill`. (Alineado con el MENOR-04 del técnico, que sigue abierto.) |
| **N3** | `01-cro.md:153, :165, :215-216` | **Presupuestos viejos intactos** donde el copy ya no los cumple: §2.4 «≤ 9 palabras por ítem», §2.5 y §3.1 «≤ 12 palabras por paso» frente a los 14/8/17 reales. El brief declara su prevalencia solo sobre §3.1 (`00-brief.md:155`), así que §2.4 y §2.5 quedan huérfanos y un auditor literal podría marcar incumplimiento. | Una línea en cada apartado: «techo sustituido por `00-brief.md §5.1`; los pasos restituidos son texto del encargo». |
| **N4** | `01-cro.md:397, :409`; `:457` (§8.3, botones de idioma de 44 px) | **El navbar no cabe en una fila a 375 px.** Logo en píldora (~145 px) + selector con tres objetivos de 44 px (~145) + CTA en píldora (~94 con «Comprar», ~137 con «Comprar el kit») + separaciones ≈ **400–430 px** frente a 335 útiles. Y §7 prohíbe ocultar el selector o el CTA, así que la única salida escrita («acortar la etiqueta») ya está gastada. | Resolver en el código con una de estas tres, en este orden: (a) una sola cápsula crema que contenga logo + separador + idiomas (deja dos píldoras y no toca contraste); (b) selector de idioma sin texto redundante y con 40 px de ancho mínimo (bajando el objetivo táctil solo en ancho, nunca en alto); (c) CTA con icono + «Comprar» a 13 px. Verificar a 320, 375 y 390 px. |
| **N5** | `01-cro.md:127` + `:115` + `:112` | **Cuatro formas crema en el primer viewport.** Logo, selector, CTA (tres píldoras crema) y la píldora del subtítulo: la única que no es navegación se ve igual que las otras tres, y el contorno terracota es el mismo trazo en todas. En pantalla el hero puede leerse como una barra de etiquetas y el CTA del navbar perder figura. | Diferenciar la píldora del subtítulo en el código: sin contorno (solo relleno, 4,14:1 no textual basta) o contorno de 1,5 px, y ancho completo menos gutters. Y aplicar N4 para bajar de tres píldoras a dos en la barra. Se juzga en captura a 375. |
| **N6** | `02-copys.md:236` (decisión 1) | **Vuelve el patrón de m7, ahora en los pasos:** «la tarjeta no pasa de 3 líneas a 375 px», pero con el H3 en su propia línea y 13–16 palabras de cuerpo son **4 líneas**. Es la misma clase de promesa que hizo fallar el techo de 2 líneas. | «H3 + hasta 3 líneas de cuerpo» (o «4 líneas en total»). Cambio de una palabra que evita una discusión inútil en Puerta 2. |
| **N7** | `00-brief.md:170`; `01-cro.md:130` | **«La foto es el 70 % del bloque en móvil» ya no es cierto con el orden nuevo:** con ~400 px de texto y botón arriba, la foto de 419 px ocupa **≈ 50 %** del bloque. La frase sobrevive junto al cambio que la contradice, y puede empujar al frontend a agrandar la foto o a recortar el texto. | Reformular: «la foto ocupa la mitad del bloque y es el mayor elemento único; la frase explicativa va primero en móvil (M2)». |
| **N8** | `02-copys.md §2` (109 claves) y `01-cro.md:473` | **Sin `meta.title`, `meta.description` ni `ogAlt`.** El CRO los declara dependientes del copy v2 y el copy v2 no los entregó. Consecuencia visible: la pestaña del navegador y el enlace que se comparte por Instagram saldrían sin título ni frase (y con el `<title>` por defecto de Vite). | Tres claves × tres idiomas (9 cadenas) en el copy, y efecto en `index.html` + al cambiar de idioma. Lo redacta el equipo, lo aprueba Victoria (**D12**). No impide codificar; impide publicar. |
| **N9** | `01-cro.md:230` vs `:398` | **Un solo DOM, dos órdenes.** El CRO pide en móvil «H1 → eslogan → píldora → CTA → foto» y mantiene en escritorio «H1 → eslogan → foto → subtítulo → CTA». Con React hay un único orden de nodos: si se resuelve con `order` de CSS, el orden de tabulación dejará de coincidir con el visual (fallo de accesibilidad real en un hero con botón). | Implementar el orden móvil como orden **del DOM** y resolver el escritorio con retícula (la foto a la columna derecha), no con `order`. Verificable recorriendo con Tab. |

---

## 6. Riesgo comercial abierto con la v2

**¿La página ya responde lo que un comprador de diciembre necesita saber para escribir?** Sí, con una condición: la respuesta a la fecha depende de que la línea nueva esté donde se lee (C5). Con eso, la página contesta qué es, qué trae, cómo se hace, cómo se pide, cuánto cuesta el envío, dónde se recoge gratis y a quién le escribo, con teléfono visible.

**Lo que sigue dependiendo de decisiones de Victoria y su efecto sobre publicar:**

| Depende de | Qué falta | ¿Impide publicar? |
|---|---|---|
| **Precio del kit** | Una cifra. La página está diseñada para leerse sin ella y el `PriceSlot` tiene tres estados. | **No.** Publicable; cuesta conversión en el segmento que no escribe sin cifra. |
| **Alcohol en el envío** | Si puede viajar dentro de Canadá. Hoy se ofrece «Resto de Canadá 8,95 $» para un kit que lo contiene. | **No para codificar; sí para publicar con la conciencia limpia.** Es el único punto donde la página podría prometer algo que no se puede cumplir. Se resuelve con una frase suya o con una regla (solo en mano en Montreal). |
| **Fecha límite real por zona** | La fecha. Mientras no exista, la línea de diciembre hace el trabajo (confirmar por pedido). | **No**, si ratifica la línea (D3). Si la retira, la página vuelve al silencio y la duda se lee como un «no». |
| **Pedidos: ¿misma persona, mismo día?** | Nada nuevo: la línea no obliga a responder el mismo día, pero sí a responder **con una fecha** a cada pedido de diciembre. | **No.** Es carga operativa, no requisito técnico. |
| **Bobettes / stylo (D6)** | Una palabra por idioma. | **No.** Hay valor por defecto en las dos. |
| **Pasos largos o cortos (D11)** | Cuatro palabras. | **No.** La v2 aplica los largos (los del encargo). |
| **Fotos reales (D9)** | Los siete contenedores están reservados con proporción exacta. | **Sí.** La página vive de la foto; los placeholders están bien hechos para codificar, no para publicar. |
| **Punto de recogida en Montreal (D10)** | Barrio o dirección. | **No.** Se resuelve en la conversación, pero es fricción para quien elige «recogida gratis». |
| **Metadatos de la pestaña (N8)** | Nueve cadenas. | **Sí, para publicar.** |
| **D-CTA: crema o chocolate** | Una línea de configuración (`--btn-ink`). | **No.** Con crema hay deuda de contraste declarada; con chocolate desaparece. |

**Conclusión comercial:** nada de lo que falta impide **escribir el código**; tres cosas impiden **publicar** (fotos, metadatos, y la respuesta sobre el alcohol si se quiere honestidad total). Ninguna de las tres exige tocar la estrategia ni el copy de Victoria.

---

## 7. Autorización de paso a Puerta 2

**SÍ — autorizo el paso a `frontend-dev` (Puerta 2).**

Autorizo porque: los 17 hallazgos cerrados lo están **en la cadena que se implementa** y no solo en el registro; los 5 MAYORES de la ronda 1 no han dejado ninguno abierto en contenido; los 9 nuevos son menores, de especificación o de aritmética visual, y ninguno obliga a reescribir un documento antes de codificar; y los textos de Victoria siguen intactos, que era la condición que no se podía negociar.

**Condiciones verificables en el código (no en el documento). Si alguna falla, la Puerta 2 se rechaza:**

- **C1 · Keyline + halo del CTA primario, en el CSS real.** El botón terracota debe tener keyline chocolate de 2 px **y** halo crema de 2–3 px sobre petróleo, inspeccionables en el DOM (clases, `box-shadow`/`outline`/`border`), no solo descritos. Si en el código el botón es terracota liso con letra crema, la deuda de 2,86:1 deja de ser declarada y pasa a ser fallo. Verificar también que `--btn-ink` existe con valor por defecto `crema`.
- **C2 · Contraste del subtítulo del hero.** Nodo real: texto chocolate sobre fondo crema (11,35:1 medido, no heredado). Prohibido `<p>` crema de 17 px directo sobre `#1B7A63`. La píldora ocupa el ancho menos gutters a ≤ 480 px y no se rompe en 4 líneas.
- **C3 · Nada de texto sobre las rayas.** En los bloques 5 y 7, todo nodo de texto tiene un ancestro con fondo crema opaco; ninguna letra cruza una franja. Capturas a 375 / 768 / 1280.
- **C4 · CTA del navbar secundario y en una fila.** Nunca relleno terracota en ningún punto del scroll (incluido tras el hero y en el tramo de Comprar). Y el conjunto logo + idioma + CTA **cabe en una fila a 375 px** sin ocultar el selector ni el CTA (N4), manteniendo 44 px de alto.
- **C5 · La línea de diciembre, visible donde nace la duda.** `buy.deliveryNote` entre el CTA y la línea de envíos, cuerpo ≥ 15 px, chocolate sobre crema, sin scroll dentro del panel, y ocultable por configuración (`content.showDeliveryNote`) para que Victoria pueda retirarla sin tocar código. Es la condición que cierra M5.
- **C6 · Primer viewport y orden de tabulación.** A 375 × 667: H1 + eslogan + píldora + CTA completos y **≥ 150 px de foto** visibles. El orden del DOM coincide con el orden visual (Tab) en móvil y escritorio (N9). Y en el bloque 3, el CTA intermedio va a ancho de columna (no a ancho completo) y **no parte el inventario en dos** en la retícula 4×2 de escritorio.

**Recomendación adicional (no condición):** llevar a la Puerta 2 el checklist de 22 ítems de `01-cro.md §9` en su versión recalibrada (12 y 17 incluidos) y **no reabrir** lo que esta ronda cerró: textos oficiales, línea de envíos, prellenados, orden de bloques y excepciones de presupuesto.

---

## 8. Decisiones que solo Victoria puede tomar (lista cerrada y actualizada)

*Estado: las marcadas «por defecto» ya están aplicadas en la v2; solo falta su palabra.*

| # | Decisión | Qué está en juego | Estado en la v2 |
|---|---|---|---|
| **D1** | **Precio del kit** en CAD | Es la objeción nº 1. Hay tres estados de `PriceSlot` listos. | Abierta. `hidden` por defecto. |
| **D2** | **El alcohol** en el envío | Es un líquido inflamable: ¿viaja dentro de Canadá? ¿Se sustituye, se entrega en mano en Montreal, o se resuelve en la conversación? Hoy se ofrece «Resto de Canadá 8,95 $» a un kit que lo contiene. | Abierta. Único punto donde la página podría prometer de más. |
| **D3** | **La línea «Pedidos de diciembre: te confirmo la fecha por WhatsApp»** | Es la única frase escrita en su primera persona que le crea una obligación de respuesta. La puede cumplir sola; no la obliga a contestar el mismo día; no promete plazo. Si la retira, el bloque vuelve a 16 palabras y la pregunta del 31 se queda sin respuesta. | **Activa por defecto.** Ratificar o retirar. |
| **D4** | ¿Recorta sus textos del kit para entrar en 9 palabras? | Recomendación del QA: **no**. El inventario es el argumento y las palabras son suyas. | Abierta; excepción documentada. |
| **D5** | ¿Quita del Mail Club la última frase («Inscríbete a la lista de espera por DM o WhatsApp»)? | Bajaría el bloque de 30 a 12 palabras. El botón ya lo dice. | **Texto completo por defecto.** |
| **D6** | «Bobettes jaunes» o «petites culottes jaunes»; «stylo» o «crayon» | Dos palabras por idioma. | **«Bobettes jaunes» y «stylo» por defecto** (crayon también significa lápiz). |
| **D7** | Ratificar el francés: tuteo, «Allo», «Décembre 2026» | Es la voz de la marca en su segundo idioma. | Aplicado por defecto; sin ratificar. |
| **D8** | «Hola, soy Victoria» + «Soy Victoria, colombiana en Montreal» (redundancia) | Su texto oficial; si quiere quitar el «Soy Victoria,» inicial, es su decisión. | Sin tocar. |
| **D9** | **Fotos reales** (Vichito con cartel, maleta, calzoncito, billete, caja, retrato de taller) y revisión de los 15 `alt` contra las fotos | Sin fotos no se publica. Los contenedores están reservados con proporción exacta. | Abierta. |
| **D10** | Punto de recogida en Montreal | Quien elige «recogida gratis» necesita saber dónde. | Abierta; hoy se resuelve en la conversación. |
| **D11** | Pasos largos (14/8/17, con «con el alcohol») o cortos (14/8/14) | Cuatro palabras que recuperan el alcohol y el billete. Recomendación del QA: **largos**. | **Largos por defecto** (son los del encargo). |
| **D-CTA** | Etiqueta del CTA en crema (deuda 2,86:1 declarada) o `--btn-ink: chocolate` (3,96:1, AA-large) | Una línea de configuración. Con chocolate la deuda desaparece. | **Crema por defecto.** |
| **D12** | *(nueva)* Texto de la pestaña y del enlace compartido (`meta.title`, `meta.description`, `ogAlt`) | Lo redacta el equipo; Victoria lo aprueba. Sin esto, el enlace que se comparte por Instagram no tiene título. | No existe todavía. |

**Retiradas de la lista anterior (resueltas por defecto, ya no se preguntan):** «Llévate tu kit» → «Pide tu kit» (m12); el techo de 2 líneas por tarjeta (m7); «Temporada 2026» → «Diciembre 2026» (M3); «le Año Viejo» → «l'Año Viejo» (M4); el teléfono en el bloque Comprar (M1); los pasos recortados (m3). **Se mantiene retirada** la propuesta de dividir la línea de envíos en tarjetas (m7 de la ronda 1): la línea sigue literal y entera.

---

## 9. Firma

**Revisor Final QA — Puerta 1, ronda 2**
16 de noviembre de 2026 · Montreal

*Recorrido simulado sobre documento, no sobre código. Todo lo verificado aquí —textos carácter a carácter, espacios duros del francés, contraste recalculado y presupuestos— se comprobó mecánicamente y los números están en el informe. La Puerta 2 vuelve a auditar los mismos puntos en pantalla, a 375 / 768 / 1280 px, con las seis condiciones de §7 como lista de rechazo.*
