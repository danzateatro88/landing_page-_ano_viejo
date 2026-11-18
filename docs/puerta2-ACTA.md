# ACTA DE CIERRE — PUERTA 2 (Auditoría de código, UI artesanal y build)

**Proyecto:** Landing «Vichito, el año viejo» · Kit Ritual Año Viejo 2026 · `vichisboh*`
**Fecha:** 16 de noviembre de 2026 · faltan **45 días** para el 31 de diciembre
**Stack:** Vite 7.3.8 + React 19.1 + Tailwind CSS 4.3 · JS 87,97 kB gzip · CSS 7,07 kB gzip
**Documentos de referencia:** `_contexto-encargo.md` (ley), `01-cro.md` v2, `02-copys.md` v2, `puerta1-ACTA.md`

---

## 1. RESULTADO DE LA DOBLE PUERTA

| Auditoría | Ronda 1 | Ronda 2 (final) |
|---|---|---|
| **Verificador Técnico** | `APROBADO` — 0 bloqueantes, 2 mayores, 10 menores | **`APROBADO`** — 0 bloqueantes, 0 mayores |
| **Revisor Final QA** | `CAMBIOS REQUERIDOS` — 3 mayores, 4 menores | **`APROBADO`** — autoriza la entrega a la clienta |

### **ESTADO DE LA PUERTA 2: CERRADA — APROBADA POR UNANIMIDAD**

Ronda 1 → ronda 2: **2/2 mayores técnicas cerradas** · **3/3 mayores del QA cerradas** · **C1–C6 del acta de Puerta 1: las seis cumplen, medidas en el DOM** · **checklist de 22 ítems: 19 ✔ · 3 ⚠ justificadas · 0 ✘** · **0 regresiones**.

---

## 2. LO QUE SE CORRIGIÓ ENTRE LAS DOS RONDAS

| # | Hallazgo | Corrección | Medida final |
|---|---|---|---|
| 1 | **`?lang=` no forzaba el idioma** (lo pisaba `localStorage`) | Precedencia `?lang=` → `localStorage` → ES, con persistencia y sin tocar el historial | 6/6 escenarios correctos; clic real cambia 66 textos, 25 `aria-label` y 9 prellenados sin navegar |
| 2 | **El marco de las 8 tarjetas caía sobre el verde** (papel 27 px adentro) | Nueva prop `CloudBlob.paperFill`: el papel llega al mismo trazo del bucle | Desfase papel↔tarjeta **0 px** (antes 27) a 375/768/1024/1280; trazo sobre crema por ambos lados |
| 3 | **C6: el CTA intermedio partía el inventario 4×2** en escritorio | CTA intermedio `lg:hidden`: 2 CTAs a 375/768, 1 a ≥1024 | Inventario 4×2 continuo a 1024/1280; CTA final siempre visible |
| 4 | **Bloque del kit de 4.130 px** (compra a 10,3 pantallas) | Foto 4/3 por debajo de `sm`, 1/1 desde `sm`, montaje y aires ajustados; cero caracteres recortados | `#kit` **3.293 px** (−20,3 %); página **8.024 px**; compra en **9,02 pantallas** |
| 5 | **Marcador de foto repetía el título** del ítem (ítem 12 del checklist) | Modos `full \| short \| prefixRatio \| ratioOnly \| none`; el kit usa `prefixRatio` | 8 tarjetas: «Foto real:» + «4/3», sin repetir el H3; `aria-label` intacto |
| 6 | **Ratio y «Foto real:» con contraste bajo** (2,4:1) | Ratio a chocolate | **11,35:1** |
| 7 | **Foco sobre crema casi invisible** (mostaza 1,31:1) | `:focus-visible` doble tono: anillo chocolate 3 px + halo mostaza 3 px | Cumple sobre crema y sobre petróleo; el selector de idioma ya hereda el mismo patrón |
| 8 | **`PriceSlot` anunciaba el precio dos veces** | Visible `aria-hidden` + un único `sr-only` | 1 solo anuncio accesible |
| 9 | **1 px de desbordamiento a 320 px** | Paddings y wordmark afinados en `<360`; `overflow-x-clip` en `<main>` | 320 = 320 en ES/EN/FR |
| 10 | **`<title>` y `og:*` no cambiaban de idioma** | `syncDocumentHead` en el provider: title, description, OG y 3 `hreflang` | Las 5 claves `meta.*` en uso, verificadas al pulsar el selector |

---

## 3. CONDICIONES DE LA PUERTA 1 — VERIFICACIÓN FINAL EN EL DOM

| ID | Condición | Medida exacta | Estado |
|---|---|---|---|
| **C1** | Keyline chocolate + halo crema en el CTA terracota | `box-shadow: rgb(59,37,23) 0 0 0 2px, rgb(244,226,205) 0 0 0 5px`; `--btn-ink: #f4e2cd`; etiqueta Baloo 2 800 a 20/22 px | **CUMPLE** |
| **C2** | Subtítulo del hero sobre fondo crema (11,35:1) | Píldora crema 335×73 a 375; texto chocolate 17 px; **0** nodos crema 17 px sobre petróleo | **CUMPLE** |
| **C3** | Ningún texto sobre las rayas (bloques 5 y 7) | 12/12 nodos de texto con ancestro crema opaco; rayas solo perimetrales | **CUMPLE** |
| **C4** | Navbar secundario y en una fila a 375 | Píldora crema en todo el scroll (también a 3.000 px); logo + `ES\|EN\|FR` + CTA en una fila; `scrollWidth = innerWidth` | **CUMPLE** |
| **C5** | `buy.deliveryNote` entre CTA y envíos, ≥15 px, ocultable | CTA y=6.017 → nota y=6.033 (15 px) → envíos y=6.095; con el flag en `false` desaparece sin hueco | **CUMPLE** |
| **C6** | Primer viewport + orden de tabulación | H1+eslogan+píldora+CTA completos y **323 px de foto** visibles a 375×667; 15 paradas de Tab en orden visual | **CUMPLE** |

---

## 4. REQUISITOS DEL ENCARGO — ESTADO FINAL

| Requisito | Resultado |
|---|---|
| Trilingüe ES/EN/FR con ES por defecto | **114 claves × 3 idiomas**, 0 huecos; FR de Quebec; «Vichito» y «Año Viejo» intactos |
| Textos oficiales de Victoria en ES | **11/11 + 16/16 del kit + 3/3 pasos literales** (ítem 4 sin punto final) |
| Precio del kit pendiente | **Cero cifras**, cero «consultar», cero tachados. `PriceSlot` en `hidden` por defecto: no renderiza nodo ni hueco |
| Envíos (4 datos) | Línea literal, completa en los 3 idiomas, ≥14 px, ≤3 líneas a 375 |
| Canal sin formularios | **0** `<form>`, `<input>`, `onSubmit`, `mailto`, pop-ups. Solo `wa.me/15142968295` (9 enlaces) e Instagram (2) |
| Fotos reales | 10 contenedores con proporción fija y marcador honesto («Foto real:» + ratio + `alt` real). **Cero stock, cero IA** |
| Paleta exacta | 7 colores del encargo como tokens `@theme`; 0 degradados, 0 glassmorphism |
| Estética artesanal | Bucles terracota continuos con `vector-effect="non-scaling-stroke"` (61/61), nubes crema, rayas verticales solo en 5 y 7, doodles `aria-hidden` |
| Tipografías | Baloo 2 (700/800), Nunito (400/600), EB Garamond italic (400), con `preconnect` y `display=swap` |
| Stack | Vite + React (JSX) + Tailwind, sin dependencias extra; 0 errores de consola |

---

## 5. DEVIACIONES DECLARADAS Y ACEPTADAS

| # | Desviación | Por qué | Impacto |
|---|---|---|---|
| 1 | **Tradición sin `PhotoSlot 3/4`** (el CRO lo preveía) | El boceto `IMG_0314.png` no pone foto en ese bloque: es la zona de respiro donde manda la palabra. El hueco está preparado en `siteConfig.photos.tradition` con su `alt` ya escrito | Cero. Si Victoria la quiere, es una línea de código |
| 2 | **Foto 4/3 en las tarjetas del kit en móvil** (1/1 desde `sm`) | Es la única forma de bajar de 4.130 a 3.293 px sin recortar texto: 4/5 en vertical habría subido el bloque a ~4.300 | La foto sigue siendo el 75 % del ancho y el 55 % del alto de la tarjeta. **Requiere el visto bueno de Victoria** |
| 3 | **CTA intermedio del kit solo por debajo de `lg`** | Cumple C6 (retícula 4×2 intacta) sin perder la puerta en el punto de la duda, que solo existe cuando el bloque mide 3.300 px | Cero en móvil/tableta; en escritorio el CTA final está a una pantalla |
| 4 | **`<nav aria-label="vichisboh*">`** | El diccionario aprobado no tiene una clave para nombrar el landmark y D-R2-5 prohíbe inventar textos de sistema | Nombre accesible válido; sin cadena nueva |
| 5 | **Metadatos EN/FR** compuestos solo con cadenas ya aprobadas | D-R2-5 fija solo ES | Requiere ratificación (**D12**) antes de publicar |
| 6 | **Ratios del kit y del hero distintos** (4/3 móvil, 1/1 desde `sm`, 4/5 hero) | Cada uno respeta su función: el hero es retrato del producto, el inventario es catálogo | Ninguno |

---

## 6. LO QUE FALTA PARA PUBLICAR (no es código)

**Solo de Victoria:**

| ID | Decisión / material | Bloquea |
|---|---|---|
| D9 | **Las 10 fotos reales** (hero, tradición —opcional—, las 8 del kit, Victoria en el taller, caja kraft) + `og:image` | **Sí** |
| D1 | Precio del kit (si lo fija, se activa por configuración) | No (la página está diseñada sin él) |
| D2 | ¿El alcohol puede viajar a otra provincia? | **Sí** |
| D3 | Ratificar «Pedidos de diciembre: te confirmo la fecha por WhatsApp» o dar una fecha real | **Sí** |
| D10 | Punto de recogida gratis en Montreal | Sí (para la promesa de recogida) |
| D12 | Metadatos finales (la propuesta D-R2-5 es la de por defecto) | **Sí** |
| D-M2 | Ratificar la foto 4/3 en las tarjetas del kit en móvil | No |
| D4 · D5 · D6 · D11 · D-CTA | Sus textos del kit, cuerpo del Mail Club, «bobettes/stylo», pasos largos o cortos, crema vs chocolate en el CTA | No |

**De código: nada.** Con las fotos, el precio (o no), la respuesta del alcohol y la fecha, la página se publica tal cual.

---

## 7. CÓMO SE VERIFICA (para quien retome el proyecto)

```bash
npm install
npm run dev        # desarrollo
npm run build      # producción (dist/)
npm run preview    # servir el build
npm run check:copy # falla si aparece copy literal en JSX
npm run check:console
```

- Capturas de la entrega: `docs/evidencias/final-*.png`, `z6/z7-*.png` (navbar a 320), `ola3-focus-*.png`, `qa2r2-*.png`, `p2-*.png`.
- Informes: `puerta1-tech.md`, `puerta1-qa.md`, `puerta1-tech-r2.md`, `puerta1-qa-r2.md`, `puerta2-tech.md`, `puerta2-qa.md`, `puerta2-tech-r2.md`, `puerta2-qa-r2.md`.
- Actas: `puerta1-ACTA.md`, `puerta2-ACTA.md` (este documento).

---

## 8. VEREDICTO DEL ORQUESTADOR

**PUERTA 2 CERRADA.** La landing está construida, compila sin errores, cumple las seis condiciones del acta de Puerta 1 medidas en el DOM, respeta las reglas de negocio inquebrantables (cero precio inventado, cero formularios, solo WhatsApp e Instagram, fotos reales con marcadores honestos) y conserva la identidad artesanal del boceto de Victoria: marcos de bucles dibujados a mano, nubes de papel, rayas de backing card y las tres tipografías.

**Se entrega a la clienta.** Publicar depende ahora de tres cosas que solo ella puede dar: las fotos, la respuesta sobre el alcohol en el envío y la fecha límite de pedidos.

---

*Acta emitida por el Orquestador · Puerta 2 · 16 de noviembre de 2026*
