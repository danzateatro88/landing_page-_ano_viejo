# Paleta vigente — `vichisboh*` · «Vichito, el año viejo»

Actualizada el 17 de noviembre de 2026 (cambio C-08: la tinta pasa de marrón a verde).
Los valores viven en `src/index.css`, dentro de `@theme`, y se usan como utilidades de
Tailwind (`text-tinta`, `bg-petroleo`, `border-terracota`…).

| Rol | Token | Valor | Dónde se usa |
|---|---|---|---|
| Fondo principal | `petroleo` | `#1B7A63` | Hero, «Qué trae el kit», retrato de Victoria |
| **Tinta: textos, títulos, bordes y sombras** | **`tinta`** | **`#134E35`** | Todo el texto sobre crema, keylines, sombras duras, líneas |
| Acento estrella | `terracota` | `#F04E0C` | Marcos de bucles, CTA principal, doodles |
| Papel | `crema` | `#F4E2CD` | Nubes, tarjetas, paneles, texto sobre petróleo |
| Festivo | `rojo` | `#B93A30` | Stickers, papel picado, píldora «Enero 2027» |
| Abundancia | `mostaza` | `#E3C93C` | Estrellas, números de los pasos, halo del foco |
| Puente con el separador | `oliva` | `#50664B` | Detalle del billete separador |

**Antes:** la tinta era `#3B2517` (marrón chocolate), como fijaba el encargo original.
Victoria pidió cambiarla al verde de la marca el 17/11/2026. El nombre del token también
cambió (`chocolate` → `tinta`): 39 clases de texto, bordes, keylines y sombras.

## Contrastes verificados (WCAG, calculados)

| Combinación | Ratio | Veredicto |
|---|---|---|
| `tinta` sobre `crema` | **7,66:1** | AA ✔ — el par principal de la página |
| `crema` sobre `tinta` | **7,66:1** | AA ✔ |
| `tinta` sobre `mostaza` | **5,85:1** | AA ✔ |
| `crema` sobre `petroleo` | 4,14:1 | Solo ≥24 px o ≥18,66 px bold (AA-large) |
| `crema` sobre `terracota` | 2,86:1 | **Deuda de marca declarada** en el CTA (keyline + halo) |
| `tinta` sobre `petroleo` | 1,85:1 | **Prohibido** para texto |
| `crema` sobre `rojo` | 4,48:1 | Solo texto grande |

Regla que se mantiene: **ningún texto pequeño va directo sobre petróleo, terracota o las
rayas**; siempre sobre un panel crema opaco.

## Tipografías

| Rol | Familia | Token |
|---|---|---|
| Títulos y botones | Baloo 2 (700/800) | `--font-display` |
| Textos, etiquetas, envíos | Caveat (500/600) manuscrita | `--font-copy` |
| Interfaz y datos | Nunito (400/600) | `--font-body` |
| Reserva elegante | EB Garamond italic (400) | `--font-serif` |
