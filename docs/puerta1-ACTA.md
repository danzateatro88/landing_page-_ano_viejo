# ACTA DE CIERRE — PUERTA 1 (Auditoría documental y de conversión)

**Proyecto:** Landing «Vichito, el año viejo» · Kit Ritual Año Viejo 2026
**Marca:** `vichisboh*` · Hecho a mano en Montreal
**Fecha:** 16 de noviembre de 2026 · faltan **45 días** para el 31 de diciembre
**Orquestador:** Jefe de Proyecto · Fábrica de Software
**Documentos auditados:** `00-brief.md` v2 (240 líneas) · `01-cro.md` v2 (552) · `02-copys.md` v2 (609 líneas, 109 claves)
**Ley del proyecto:** `_contexto-encargo.md` (encargo maestro del cliente)

---

## 1. RESULTADO DE LA DOBLE PUERTA

| Auditoría | Ronda 1 | Ronda 2 (final) |
|---|---|---|
| **Verificador Técnico** | `APROBADO` con 7 MAYORES obligatorias | **`APROBADO`** — 0 bloqueantes, 0 mayores abiertas |
| **Revisor Final QA** | `CAMBIOS REQUERIDOS` (5 mayores, 13 menores, 0 bloqueantes) | **`APROBADO`** — autoriza el paso a Puerta 2 |

### **ESTADO DE LA PUERTA 1: CERRADA — APROBADA POR UNANIMIDAD**

Ronda 1 → ronda 2: **7/7 MAYORES técnicas cerradas** · **5/5 mayores del QA cerradas** (M5 cerrada en texto, con sitio en pantalla garantizado por la condición C5) · **13/13 menores del QA cerrados** · **0 regresiones**.
Ambos auditores emitieron su aprobación **antes** de que se escribiera una línea de código. Se respetó el ALTO OBLIGATORIO: `frontend-dev` **no** ha sido convocado.

---

## 2. QUÉ SE CORRIGIÓ ENTRE LA RONDA 1 Y LA RONDA 2

| # | Hallazgo | Corrección aplicada | Autor |
|---|---|---|---|
| 1 | Subtítulo del hero incumplía AA (crema/petróleo 4,14:1 a 17 px) y el CRO se contradecía | Subtítulo dentro de **píldora crema con texto chocolate (11,35:1)**; contradicción 17 px / ≥24 px eliminada | CRO |
| 2 | El Cierre autorizaba texto directamente sobre las rayas (ningún color cumple AA contra ambas franjas) | **Prohibido texto sobre las rayas**: todo el texto sobre panel crema sólido; rayas solo perimetrales | CRO |
| 3 | Promesa imposible: «página funcional sin JavaScript» | Reformulada a lo viable con CSR: DOM tras hidratar, `<noscript>` con WhatsApp + envíos, `<title>`/meta en el HTML | CRO |
| 4 | La mitigación del CTA se presentaba como suficiente cuando 2,86:1 < 3,0 | **Deuda de marca declarada**, no mitigada: no cumple AA en ningún tamaño; keyline + halo verificables en el CSS real | CRO |
| 5 | H1 francés «le Año Viejo» (falta elisión) | «Vichito, **l'**Año Viejo» | Copy |
| 6 | El bloque Comprar no mostraba el teléfono que el encargo exige ahí | `buy.note` = «WhatsApp 514-296-8295 · DM @vichisboho» en los 3 idiomas | Copy |
| 7 | Dos CTAs primarios rellenos en el mismo viewport (navbar sticky + hero) | Navbar **secundario permanente**: píldora crema, contorno terracota, nunca relleno | CRO |
| 8 | En 375×667 el subtítulo que explica el producto caía bajo el pliegue | Orden móvil: H1 → eslogan → subtítulo → CTA → foto (≈424–448 px de 667) | CRO |
| 9 | «Temporada 2026» vs «Enero 2027» no construían la línea de tiempo | «**Diciembre 2026**» ↔ «Enero 2027», también en el `aria-label` | Copy |
| 10 | Nadie respondía «¿me llega antes del 31?» | `buy.deliveryNote`: «Pedidos de diciembre: te confirmo la fecha por WhatsApp.» (sin prometer plazo) | Copy + Brief |
| 11 | Los 3 pasos del ritual habían perdido texto del encargo | Restituidos «en tus tarjetas», «con el alcohol», «en la billetera» | Copy |
| 12 | Presupuestos de palabras chocaban con los textos oficiales protegidos | Recalibrados: **copy propio (techo duro)** vs **texto de Victoria (protegido)**; máx. 3 líneas por tarjeta | Brief |
| 13 | El CTA del kit estaba a ~3.800 px de la duda | Repetido el **mismo** CTA secundario tras la 4.ª nube (~1.850 px) | CRO |
| 14 | `SiteFooter.jsx` no figuraba en la lista mandatada del encargo | Declarado explícitamente como *chrome* del bloque 7 | CRO |
| 15 | Detalles de idioma: `alt` duplicado, «crayon» (lápiz) por bolígrafo, espacio fino francés, «to call in abundance», «courrier créatif», moneda inconsistente, claves `wa.*` duplicadas | Todos corregidos (ver `02-copys.md` registro v2) | Copy |

---

## 3. PRUEBAS DE NO REGRESIÓN (verificadas por ambos auditores, por separado)

| Prueba | Resultado |
|---|---|
| Textos oficiales de Victoria en ES | **28/28 idénticos carácter a carácter** (incluido el ítem 4 sin punto final) |
| Línea de envíos | Idéntica byte a byte al encargo, con los 4 datos y los 3 importes |
| Prellenados de WhatsApp | **24/24 exactos** contra `encodeURIComponent` (apóstrofos, acentos, 🧡 = `%F0%9F%A7%A1`) |
| Diccionario de claves | **109 claves**, 0 huérfanas, 0 duplicadas, 0 celdas vacías |
| Cero invenciones comerciales | Sin precio de kit, sin plazos, sin testimonios, sin formularios, sin pop-ups; destinos solo `wa.me/15142968295` y `@vichisboho` |
| Contraste WCAG | **12/12 ratios del CRO recalculados y exactos** por las dos auditorías |

---

## 4. CONDICIONES VINCULANTES PARA LA PUERTA 2 (verificables en el código)

| ID | Condición |
|---|---|
| **C1** | El CTA terracota lleva **keyline chocolate 2 px + halo crema 2–3 px** inspeccionables en el DOM. Si es terracota liso con letra crema, la deuda de 2,86:1 pasa de declarada a **fallo** |
| **C2** | El subtítulo del hero es un nodo con **fondo crema y texto chocolate (11,35:1 medido)**. Prohibido `<p>` crema de 17 px directo sobre `#1B7A63` |
| **C3** | **Ningún texto sobre las rayas** en los bloques 5 y 7: todo nodo de texto tiene ancestro crema opaco. Capturas a 375 / 768 / 1280 |
| **C4** | Navbar **secundario en todo el scroll** y **en una fila a 375 px** (logo + ES\|EN\|FR + CTA), sin ocultar selector ni CTA, 44 px de alto |
| **C5** | `buy.deliveryNote` **entre el CTA y la línea de envíos**, ≥15 px, chocolate sobre crema, sin scroll interno, ocultable por `content.showDeliveryNote` |
| **C6** | A 375×667: H1 + eslogan + píldora + CTA completos y **≥150 px de foto** visibles; orden de tabulación = orden visual |

### Decisiones de diseño vinculantes (emitidas por el Verificador Técnico)

- **D-R2-1** Píldora del subtítulo: `CloudBlob` variante píldora + `SquigglyFrame` `pill` superpuesto (`aria-hidden`, `vector-effect="non-scaling-stroke"`). Es contenedor de una frase con padding, no «texto corrido».
- **D-R2-2** `fit-content` con `max-width:100%` en todos los tramos; `width:100%` menos gutters en ≤480. Separación píldora → CTA = 16 px (los 44 px son objetivo táctil, no margen).
- **D-R2-3** El DOM sigue el orden móvil; la foto se coloca por grid en escritorio. El subtítulo nunca queda detrás de la foto en el DOM.
- **D-R2-4** `buy.deliveryNote` bajo la línea de envíos, dentro del panel crema, Nunito 600 a 15–16 px, siempre después del CTA.
- **D-R2-5** **Textos de sistema (los únicos que el diccionario no cubre; no inventar otros):**
  - `<title>`: «Vichito, el año viejo — Kit Ritual Año Viejo 2026 · vichisboh*»
  - `meta description`: «Un ritual colombiano para despedir el año con tus manos. Kit Ritual Año Viejo 2026, hecho a mano en Montreal.»
  - `<noscript>`: «Este sitio necesita JavaScript para verse completo. Escríbeme por WhatsApp al 514-296-8295.» + línea de envíos literal + enlace `https://wa.me/15142968295`
- **D-R2-6** Techos de palabras: rige `00-brief.md §5.1` (bloque 4 = 14/8/17; bloque 5 = ≤17 sin la línea y ≤27 con ella; máx. 3 líneas por tarjeta; envíos hasta 3 líneas, nunca <14 px). **No** `01-cro.md §3.1`.
- **D-R2-7** Relleno terracota **solo** en hero y Comprar. Navbar, kit (×2), pasos y Mail Club en píldora crema/contorno.

### Orden de construcción recomendado al frontend
1. Tokens de color y fuentes → 2. `SquigglyFrame` / `CloudBlob` / `StripedBackdrop` (dibujar primero: condiciona la retícula) → 3. Navbar y Hero con la píldora → 4. Resto de secciones → 5. `PriceSlot` y estados → 6. Pasada de contraste y teclado.

---

## 5. DEUDAS DOCUMENTALES MENORES (9, ninguna bloqueante) — se cierran al abrir la Puerta 2

| ID | Deuda | Dueño | Resolución acordada |
|---|---|---|---|
| D1 | `00-brief.md` dice 14/8/14 en el bloque 4; el conteo real es 14/8/17 | `ux-research` | Corregir cifra y «2 por paso» → «hasta 3 líneas» |
| D2 | Dos techos distintos para el bloque 5 (≤25 y ≤27) | `ux-research` | Unificar en ≤17 / ≤27 |
| D3 | `01-cro.md §3.1` conserva techos viejos (≤9, ≤12, ≤25) | `cro-architect` | Recalibrar y remitir a `00-brief.md §5.1` (D-R2-6) |
| D4 | Residuos «temporada 2026» y `EyebrowPill` en el hero del CRO | `cro-architect` | Sustituir por «Diciembre 2026» y quitar la píldora del hero |
| D5 | Claves `meta.*` y texto del `<noscript>` no entregados por el copy | **CERRADA por esta acta** con D-R2-5 | El frontend usa **exactamente** esas cadenas |
| D6 | Especificación del hero imprecisa (píldora, tramo 481–767 px, «44 px», orden de escritorio) | **CERRADA** con D-R2-1 a D-R2-3 | — |
| D7 | `buy.deliveryNote` sin posición asignada | **CERRADA** con D-R2-4 + condición C5 | — |
| D8 | «10 enlaces» cuando la tabla renderiza 11 | `cro-architect` | Corregir el recuento |
| D9 | Cifras de autoconteo del copy (97 vs 96 caracteres; 8 vs 9 cadenas FR) | `copywriter` | Ajustar el registro de cambios |

---

## 6. DECISIONES QUE SOLO VICTORIA PUEDE TOMAR (13)

| ID | Decisión | ¿Bloquea codificar? | ¿Bloquea publicar? |
|---|---|---|---|
| D1 | Precio del kit | No | No (la página está diseñada sin él) |
| D2 | ¿El alcohol puede viajar a otra provincia? | No | **Sí** |
| D3 | Ratificar «Pedidos de diciembre: te confirmo la fecha por WhatsApp» o fijar fecha real | No | **Sí** |
| D4 | ¿Recorta sus textos del kit a 9 palabras? (recomendación: **no**) | No | No |
| D5 | ¿Quita la última frase del Mail Club? | No | No |
| D6 | «bobettes» o «petites culottes» · «stylo» o «crayon» | No | No |
| D7 | Ratificar el francés de Quebec (tuteo, «Allo») | No | No |
| D8 | Redundancia «Hola, soy Victoria» / «Soy Victoria…» | No | No |
| D9 | **Fotos reales del Vichito, la maleta, los calzones y el billete** | No | **Sí** |
| D10 | Punto de recogida gratis en Montreal | No | Sí (para la línea de envíos) |
| D11 | Pasos largos (14/8/17) o cortos (14/8/14) | No | No |
| D-CTA | Crema sobre terracota (deuda de marca) o `--btn-ink: chocolate` (3,96:1) | No | No |
| D12 | Metadatos finales (D-R2-5 es la propuesta por defecto) | No | Sí, si no se ratifica |

---

## 7. LO QUE NO SE TOCA (declarado apto por las dos auditorías)

1. **Los seis textos oficiales de Victoria en ES** — verificados carácter a carácter, dos veces, por dos auditores.
2. **La arquitectura de 8 bloques** (6 secciones oficiales + navbar + cierre), con el orden del encargo intacto y la desviación trazada y justificada.
3. **Los 24 prellenados de WhatsApp** — instrumentación de Victoria sin analítica.
4. **Los 109 textos del diccionario trilingüe**, con EN y FR siempre ≤ ES y «Vichito» / «Año Viejo» intactos.
5. **El diseño del precio pendiente** (`PriceSlot` de 3 estados, sin hueco fantasma ni «consultar precio»).

---

## 8. VEREDICTO DEL ORQUESTADOR

**PUERTA 1 CERRADA.** Los tres documentos de estrategia, arquitectura y copy están aprobados por unanimidad y son ejecutables sin ambigüedad: las 6 condiciones y las 7 decisiones vinculantes eliminan cualquier hueco de interpretación para `frontend-dev`.

Las 9 deudas documentales restantes son de una línea, no afectan a ninguna decisión de código (D5, D6 y D7 ya quedaron cerradas por esta acta) y se liquidan en el arranque de la Puerta 2. **Ninguna de las 13 decisiones de Victoria impide codificar**; tres de ellas (fotos, alcohol, fecha límite) impiden **publicar** y deben resolverse antes del lanzamiento, no antes de la primera línea de JSX.

**Siguiente fase autorizada:** Puerta 2 — `frontend-dev` construye la arquitectura modular en React (JSX) + Tailwind + Vite, y el entregable vuelve a pasar por el Verificador Técnico y el QA Final con las condiciones C1–C6 como criterio de rechazo.

---

*Acta emitida por el Orquestador · Puerta 1 · 16 de noviembre de 2026*
*Informes fuente: `puerta1-tech.md`, `puerta1-qa.md`, `puerta1-tech-r2.md`, `puerta1-qa-r2.md`*
