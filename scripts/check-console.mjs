#!/usr/bin/env node
/**
 * check-console.mjs — guardarraíl de consola.
 *
 * Falla (exit 1) si hay `console.log` en el código de la página: el copy y los
 * errores no se depuran en producción. Los `console.warn/error` se listan como
 * aviso informativo (los usa el guardián de claves de `i18n/LanguageContext.jsx`
 * en desarrollo) y no bloquean.
 *
 * Uso: npm run check:console
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.cwd(), 'src')

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return /\.(jsx?|mjs)$/.test(entry.name) ? [full] : []
  })
}

const logs = []
const others = []

for (const file of walk(ROOT)) {
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, index) => {
    const where = `${path.relative(process.cwd(), file)}:${index + 1}`
    if (/console\.log\s*\(/.test(line)) logs.push(`${where} · ${line.trim()}`)
    else if (/console\.(debug|info|warn|error)\s*\(/.test(line)) {
      others.push(`${where} · ${line.trim()}`)
    }
  })
}

if (others.length > 0) {
  console.log(`check:console · aviso: ${others.length} console.* no bloqueante(s):`)
  for (const item of others) console.log(`  ${item}`)
}

if (logs.length === 0) {
  console.log('check:console ✓ 0 console.log')
  process.exit(0)
}

console.error(`check:console ✗ ${logs.length} console.log:`)
for (const item of logs) console.error(`  ${item}`)
process.exit(1)
