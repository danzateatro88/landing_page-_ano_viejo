#!/usr/bin/env node
/**
 * check-copy.mjs — guardarraíl del contrato trilingüe.
 *
 * Todo texto visible viaja por `t('clave')`. Este script recorre `src/` y avisa de:
 *   1. nodos de texto JSX literales (`>texto<`) con palabras;
 *   2. literales en props de texto (`label="…"`, `ariaLabel="…"`, `alt="…"`, `title="…"`).
 *
 * Uso: npm run check:copy   (devuelve 1 si encuentra algo)
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd(), 'src')
const TEXT_PROPS = /(label|ariaLabel|aria-label|alt|title|placeholder)=["']([^"']*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}[^"']*)["']/g

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return /\.(jsx?|mjs)$/.test(entry.name) ? [full] : []
  })
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

const findings = []

for (const file of walk(ROOT)) {
  if (file.endsWith('translations.js')) continue
  const raw = fs.readFileSync(file, 'utf8')
  // `=>` no es un cierre de etiqueta: se elimina para no confundir flechas con texto JSX.
  const source = stripComments(raw).replace(/=>/g, '')
  const lines = source.split('\n')

  lines.forEach((line, index) => {
    // Nodos de texto JSX: >texto con letras< (sin llaves ni etiquetas dentro).
    for (const match of line.matchAll(/>\s*([^<>{}]*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{3,}[^<>{}]*?)\s*</g)) {
      const text = match[1].trim()
      if (!text) continue
      if (/^(https?:|mailto:|#|\/)/.test(text)) continue
      findings.push({
        file,
        line: index + 1,
        kind: 'texto JSX literal',
        text,
      })
    }

    for (const match of line.matchAll(TEXT_PROPS)) {
      findings.push({
        file,
        line: index + 1,
        kind: `prop "${match[1]}" con literal`,
        text: match[2],
      })
    }
  })
}

if (findings.length === 0) {
  console.log('check:copy ✓ 0 textos literales en JSX (todo pasa por t())')
  process.exit(0)
}

console.error(`check:copy ✗ ${findings.length} posible(s) texto(s) hardcodeado(s):`)
for (const finding of findings) {
  console.error(
    `  ${path.relative(process.cwd(), finding.file)}:${finding.line} · ${finding.kind} · «${finding.text}»`,
  )
}
process.exit(1)
