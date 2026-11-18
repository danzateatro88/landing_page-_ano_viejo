# CONTEXTO MAESTRO DEL ENCARGO — LEER ANTES DE TRABAJAR
Proyecto: Landing page « Vichito, el año viejo » — Kit Ritual Año Viejo 2026
Marca: vichisboh* (vichisboho) · Hecho a mano en Montreal por Victoria
Ruta del proyecto: `vichito-2026/` (documentos en `vichito-2026/docs/`)
Boceto de referencia: `../IMG_0314.png` (boceto artesanal de Victoria)

---

## 1. PRODUCTO
« Vichito, el año viejo » es un **kit ritual colombiano de fin de año**: se arma un
muñeco con ropa vieja, se le cargan las cosas que se quieren soltar y se quema el
31 de diciembre a medianoche, para despedir el año y abrir espacio al que viene.
Es un producto de temporada (diciembre), vendido en Canadá desde Montreal.

Filosofía de la página, inquebrantable:
**Poco texto, muy limpio, mucho aire. El producto y las ilustraciones reales son
los protagonistas.** Si una sección se ve cargada de letras, se recorta texto,
nunca el tamaño de la foto.

## 2. REGLAS DE NEGOCIO INQUEBRANTABLES (CERO ALUCINACIONES COMERCIALES)
1. **PRECIO DEL KIT: PENDIENTE.** Prohibido inventar un precio para el kit
   (nada de `$29.99` ni similares). El diseño debe quedar listo para mostrar
   disponibilidad o dejar un placeholder limpio/oculto hasta que Victoria lo fije
   (por configuración, no hardcodeado).
2. **ENVÍOS — ÚNICOS PRECIOS AUTORIZADOS:**
   - Recogida gratis en Montreal
   - Domicilio en Montreal: `5 $`
   - Resto de Canadá: `8,95 $`
   - Envío gratis en compras desde `60 $`
   Formato en una línea visible:
   `Recogida gratis en Montreal · Domicilio Montreal 5 $ · Resto de Canadá 8,95 $ · Gratis desde 60 $`
3. **CANAL DE CONVERSIÓN: sin formularios, sin pop-ups, sin bots, sin ManyChat.**
   Todos los botones de compra y de lista de espera van **únicamente** a:
   - WhatsApp: `https://wa.me/15142968295` (teléfono visible `514-296-8295`)
   - DM de Instagram: `@vichisboho`
4. **FOTOS REALES, jamás stock ni IA.** El código debe dejar contenedores
   destacados (placeholders bien identificados, con proporciones exactas) para las
   fotos reales: el muñeco Vichito con su cartelito « ¡CHAO AÑO VIEJO! », la
   maletita roja, el calzoncito amarillo y el billete separador.
5. **IDIOMAS: ES (por defecto) / EN / FR (francés de Quebec).** En ES se respetan
   **palabra por palabra** los textos oficiales de Victoria (abajo). En EN y FR:
   adaptación cultural cálida, cercana, en primera persona, con **la misma
   brevedad** (una sola línea por ítem, sin inflar párrafos), conservando los
   nombres propios **"Vichito"** y **"Año Viejo"**.

## 3. PALETA EXACTA (prohibida cualquier otra; NO usar rosa/oliva de otras landings)
| Rol | Nombre | HEX |
|---|---|---|
| Fondo principal y secciones grandes | Verde Petróleo | `#1B7A63` |
| Acento estrella, CTA, titulares destacados, doodles | Naranja Terracota | `#F04E0C` |
| Fondos claros, tarjetas nube, texto sobre petróleo | Crema | `#F4E2CD` |
| Texto oscuro y contornos (nunca negro puro) | Marrón Chocolate | `#3B2517` |
| Acento festivo, stickers, papel picado | Rojo Maleta | `#B93A30` |
| Abundancia, estrellitas, detalles | Amarillo Mostaza | `#E3C93C` |
| Puente visual con el separador Vichito | Oliva Billete | `#50664B` |

## 4. IDENTIDAD VISUAL ARTESANAL (obligatoria)
La página **NO** debe parecer plantilla corporativa: sin líneas rectas rígidas,
sin degradados modernos, sin estética SaaS. Debe verse **100 % hecha a mano**,
replicando el boceto y las tarjetas impresas del kit.
1. **Marcos de garabato (squiggly / hand-drawn loops):** tarjetas y contenedores
   principales con marco dibujado a mano de bucles continuos (resortes/ondas tipo
   lápiz) en `#F04E0C`. Deben existir componentes SVG reutilizables para estos
   bordes y para contenedores tipo "nube orgánica" (blob crema `#F4E2CD` con
   borde de lápiz terracota).
2. **Fondo de rayas verticales artesanales:** secciones destacadas (bloque de
   Compra y cierre) con patrón de rayas verticales anchas alternando
   `#1B7A63` y `#F4E2CD`, bordes ligeramente orgánicos y sutil textura de
   papel/acuarela encima.
3. **Doodles sueltos:** estrellitas, espirales, subrayados curvos y rayitas en
   `#F04E0C` y `#E3C93C` alrededor de títulos y tarjetas.
4. **Tipografías (Google Fonts en `index.html`):**
   - Títulos: **Baloo 2** (700/800), redondeada, cálida, expresiva.
   - Cuerpo y subtítulos: **Nunito** (400/600).
   - Toques elegantes puntuales: **EB Garamond** (Italic/Regular, muy poco).
   - Logo: wordmark `vichisboh*` (con flor-asterisco) en Baloo 2 Bold, reservado
     preferiblemente sobre píldoras/fondos crema o variante clara sobre petróleo.

## 5. ESTRUCTURA DE 6 SECCIONES (según boceto IMG_0314)
**Navegación superior minimalista:** logo `vichisboh*` + selector de idioma limpio
(`ES | EN | FR`) + CTA rápido.

### Sección 1 — HERO (Boceto bloque 1)
- Fondo verde petróleo `#1B7A63`.
- Marco de garabato naranja terracota rodeando la tarjeta/foto protagonista del
  muñeco Vichito con el cartelito « ¡CHAO AÑO VIEJO! ». La foto manda.
- Título (Baloo 2 Bold, crema): **« Vichito, el año viejo »**
- Eslogan: **« Hibérnate »**
- Subtítulo (1 sola línea): **« Un ritual colombiano para despedir el año con tus manos. »**
- CTA principal (botón redondeado `#F04E0C`): **« Comprar el kit »** → WhatsApp con
  mensaje prellenado en el idioma activo.
- Pie del hero: logo `vichisboho`.

### Sección 2 — LA TRADICIÓN (Boceto bloque 2, "explicación tradición")
- Fondo crema `#F4E2CD` (zona de respiro tras el hero oscuro) o contenedor crema
  tipo píldora/nube con borde terracota.
- Título: **« ¿Qué es el Año Viejo? »**
- Texto exacto en ES (voz de Victoria, prohibido alargar):
  > "Te cuento: en Colombia, el 31 de diciembre quemamos el Año Viejo. Armamos un
  > muñequito con ropa vieja, le ponemos adentro todo lo que ya no queremos cargar,
  > y a la medianoche lo quemamos. Es soltar el año que se va para abrirle espacio
  > al que viene. Este kit es para que lo hagas tú, en tu casa, con tus manos."

### Sección 3 — QUÉ TRAE EL KIT (Boceto bloque 3, "fotos de los productos")
- Fondo verde petróleo `#1B7A63`.
- Contenedores orgánicos tipo **nube crema `#F4E2CD` con borde de garabato
  naranja `#F04E0C`** (como las nubes del boceto). Fotos grandes + **una sola
  línea de texto por elemento**:
  1. 🧸 **El bichito del Año Viejo** — el muñequito que vas a quemar con el ritual.
  2. 🩲 **Stickers de los calzones amarillos** — la buena suerte, para que no te falte.
  3. 🧳 **La maleta de viaje** — para que este año traiga muchos viajes.
  4. 💵 **El billete separador** — tu Vichito de la abundancia, para que la fortuna te acompañe todo el año *(referencia visual: tarjeta rayada petróleo/crema "magnetic bookmark - Tu vichito de la abundancia - hecho a mano")*.
  5. 🖊️ **Un lapicero** — para escribir tu lista de intenciones 2027 y tu lista de agradecimientos 2026.
  6. 🔥 **El alcohol** — para quemar las penas con el bichito.
  7. 🫘 **Las lentejas** — para llamar la abundancia.
  8. 📇 **Las tarjetas del ritual** — historia, pasos, y el espacio para tus listas.
- **Nota de empaque destacada:** caja kraft con ventana + papel picado rojo `#B93A30`.

### Sección 4 — CÓMO FUNCIONA (3 pasos ultracortos)
3 tarjetas limpias o pasos numerados con doodles a mano, una línea por paso:
1. **Escribe** lo que sueltas y lo que siembras, con el lapicero en tus tarjetas.
2. **Arma** tu bichito y guárdalo hasta el 31.
3. **El 31 a la medianoche:** quema las penas con el alcohol y guarda tu billete en la billetera.

### Sección 5 — COMPRAR (Boceto bloque inferior rayado)
- Fondo de **rayas verticales petróleo `#1B7A63` / crema `#F4E2CD`** enmarcado por
  borde de bucles de lápiz `#F04E0C` (replica la parte inferior del boceto y el
  backing card del separador).
- Botón grande protagonista: fondo `#F04E0C`, texto crema, Baloo 2 Bold:
  **« Comprar el kit »**.
- Precio del kit: **no mostrar** (listo por prop/configuración para activar cuando
  Victoria lo defina).
- Envíos visibles (línea exacta de arriba).
- Nota de pedido: WhatsApp `514-296-8295` o DM Instagram `@vichisboho`.

### Sección 6 — QUIÉN ES VICTORIA + MAIL CLUB 2027 (cierre corto en bloque rayado/nubes)
**Sub-bloque 1 — « Hola, soy Victoria »** (2 líneas exactas):
> "Soy Victoria, colombiana en Montreal. Hago kits para que crees con tus manos en
> casa — el taller en tu casa."

**Sub-bloque 2 — « Inscríbete al mail club 2027 »** (tarjeta nube crema con borde naranja):
> "El club de correo creativo llega en enero de 2027 — ya casi comienza. Inscríbete
> a la lista de espera por DM o WhatsApp."

Debe quedar visualmente claro que **diciembre = kits de temporada** y
**enero 2027 = Mail Club**, con botón directo a WhatsApp/Instagram y **sin
formularios**.

## 6. REQUISITOS TÉCNICOS (fase de código)
1. Stack: **Vite + React (JSX) + Tailwind CSS**, estructura modular
   (`src/components/Navbar.jsx`, `Hero.jsx`, `Tradition.jsx`, `KitContents.jsx`,
   `HowItWorks.jsx`, `BuySection.jsx`, `FooterMailClub.jsx`, `SquigglyFrame.jsx`,
   `src/i18n/translations.js`). Nunca un único `index.html`.
2. Sistema trilingüe reactivo (contexto ligero), alternando todos los textos,
   `aria-label` y el mensaje prellenado de WhatsApp. ES por defecto.
3. Mobile-first (375 px) impecable. Accesibilidad básica (alt, roles, contraste).
4. La auditoría de la Puerta 2 rechazará cualquier diseño que parezca SaaS
   corporativo.

## 7. DATOS DE CONTACTO AUTORIZADOS
- WhatsApp: `+1 514 296 8295` → `https://wa.me/15142968295`
- Instagram: `@vichisboho` → `https://instagram.com/vichisboho`
- Ciudad: Montreal, Québec, Canadá.
