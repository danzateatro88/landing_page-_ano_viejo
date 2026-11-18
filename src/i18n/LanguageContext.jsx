/**
 * Contexto de idioma — ES / EN / FR.
 *
 * Contrato público (lo consumen Navbar, Hero, las 6 secciones y el resto de `ui/`):
 *   const { lang, setLang, t, waUrl, instagramUrl, langs } = useLang()
 *
 *   lang         'es' | 'en' | 'fr'  (por defecto 'es')
 *   t(path, vars) resuelve rutas con puntos, admite índice numérico en arrays
 *                 (`t('kit.items.2.title')`) e interpola `{amount}`. Si la clave
 *                 falta en el idioma activo, cae al ES; en desarrollo avisa por
 *                 `console.warn`; en producción devuelve `''` (nunca la clave cruda).
 *   waUrl(sec)    `https://wa.me/15142968295?text=<wa[sec] del idioma activo>`.
 *                 Sin valor cae a `wa.hero`. Los valores ya vienen codificados en
 *                 `translations.js`: aquí SOLO se concatenan (nunca se re-codifican).
 *   instagramUrl  `https://instagram.com/vichisboho`
 *   langs         ['es', 'en', 'fr'] en el orden del selector
 *
 * Sin dependencias externas. Precedencia del idioma inicial: `?lang=` de la URL →
 * `localStorage['vichito.lang']` (envuelto en try/catch: modo privado) → ES. Un
 * `?lang=` explícito manda y se persiste, para poder compartir enlaces en un idioma
 * concreto. El idioma activo se refleja en `<html lang>`, `<html dir="ltr">`,
 * `document.title`, `meta[name=description]`, `og:title`, `og:description`,
 * `og:locale` (+ `og:locale:alternate`), `og:image:alt` y `link[rel=alternate][hreflang]`.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { dicts, es as esDict, LANGUAGES, FALLBACK_LANG } from './translations'

const STORAGE_KEY = 'vichito.lang'
const DEFAULT_LANG = 'es'
const SUPPORTED = new Set(LANGUAGES)

const WHATSAPP_NUMBER = '15142968295'
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`
const INSTAGRAM_URL = 'https://instagram.com/vichisboho'

/** Respaldo de `waUrl()` si faltara la sección pedida. */
const WA_FALLBACK_SECTION = 'hero'

/**
 * Alias de lectura de espacios de nombres. NO crean claves nuevas: solo permiten
 * que un componente escrito con el nombre corto (`photos`, `howItWorks`) llegue al
 * espacio canónico del diccionario (`photo`, `how`, espejo de 02-copys.md §2).
 */
const NAMESPACE_ALIASES = {
  howItWorks: 'how',
  photos: 'photo',
}

/**
 * Alias de sección para `waUrl()`. Las claves canónicas son `wa.nav`, `wa.hero`,
 * `wa.kit`, `wa.steps`, `wa.buy`, `wa.victoria`, `wa.mailclub`, `wa.footer`
 * (02-copys.md §6.2, m10). Los nombres en español de la v1 (`pasos`, `comprar`,
 * `cierre`) ya no existen como claves, pero se siguen aceptando como entrada.
 */
const SECTION_ALIASES = {
  pasos: 'steps',
  comprar: 'buy',
  cierre: 'footer',
  inicio: 'hero',
}

const IS_DEV =
  typeof import.meta !== 'undefined' &&
  Boolean(import.meta.env && import.meta.env.DEV)

const LanguageContext = createContext(null)

/** Devuelve el valor de una ruta con puntos, o `undefined` si no existe. */
function readPath(source, segments) {
  let node = source
  for (let i = 0; i < segments.length; i += 1) {
    if (node === null || node === undefined) return undefined
    if (Array.isArray(node)) {
      const index = Number(segments[i])
      if (!Number.isInteger(index) || index < 0) return undefined
      node = node[index]
    } else if (typeof node === 'object') {
      node = node[segments[i]]
    } else {
      return undefined
    }
  }
  return typeof node === 'string' ? node : undefined
}

/** Sustituye `{amount}`, `{name}`… por los valores de `vars`. */
function interpolate(text, vars) {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vars[key]
    return value === undefined || value === null ? match : String(value)
  })
}

/** Parte una ruta en segmentos y resuelve el alias del primer espacio de nombres. */
function toSegments(path) {
  const raw = String(path).split('.').filter((s) => s !== '')
  if (raw.length === 0) return raw
  const head = NAMESPACE_ALIASES[raw[0]] || raw[0]
  return [head, ...raw.slice(1)]
}

/** Lee `?lang=` de la URL. Devuelve `null` si no hay valor válido. */
function readLangFromQuery() {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang')
    if (!fromQuery) return null
    const normalized = fromQuery.toLowerCase()
    return SUPPORTED.has(normalized) ? normalized : null
  } catch {
    /* URL no disponible: seguimos con las otras fuentes */
    return null
  }
}

/**
 * Idioma inicial, por orden de precedencia:
 *   1. `?lang=` de la URL  ← una URL explícita manda sobre lo guardado
 *   2. `localStorage['vichito.lang']`
 *   3. ES (idioma por defecto)
 *
 * El `?lang=` se persiste al detectarlo, para que la elección quede coherente
 * entre una visita enlazada y las siguientes. No se toca la URL (`history`): el
 * botón «atrás» del navegador conserva su comportamiento normal.
 */
function detectInitialLang() {
  const fromQuery = readLangFromQuery()
  if (fromQuery) {
    persistLang(fromQuery)
    return fromQuery
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.has(stored)) return stored
  } catch {
    /* almacenamiento bloqueado (modo privado): seguimos sin persistencia */
  }
  return DEFAULT_LANG
}

/** Persiste el idioma sin romper la app si el navegador lo impide. */
function persistLang(next) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* modo privado / cuota llena: la sesión sigue funcionando en memoria */
  }
}

/** Crea la etiqueta `meta` si no existe y devuelve el nodo. */
function ensureMeta(head, selector, attribute) {
  let node = head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    const [, name, value] = /^meta\[(.+?)=["'](.+)["']\]$/.exec(selector) || []
    if (name && value) node.setAttribute(name, value)
    head.appendChild(node)
  }
  return node
}

/**
 * Refleja el idioma activo en el documento. Se ejecuta solo en el cliente
 * (efecto de React), así que el HTML de `index.html` nunca se toca: su `<title>`
 * y sus `og:*` en ES siguen siendo el punto de partida válido —el aprobado en
 * D-R2-5— y este efecto los reescribe al idioma activo en cuanto hay JS.
 *
 * Criterio sobre D-R2-5 (documentado a propósito, no es copy nuevo):
 * - `meta.title`, `meta.description` y `meta.noscript` son las cadenas aprobadas;
 *   D-R2-5 solo las fija en ES, así que EN/FR salen del mismo diccionario, que las
 *   compone con fragmentos ya aprobados (`hero.title`, `hero.subtitle`,
 *   `footer.madeIn`, `buy.shipping`). Sigue pendiente de ratificación (D12).
 * - `meta.noscript` no se pinta en runtime: lo emite `index.html` en ES antes de
 *   que exista JS. Aquí se usa solo como **guarda de deriva** en desarrollo, para
 *   avisar si el bloque estático y el diccionario dejan de coincidir.
 */
function syncDocumentHead(lang, t) {
  const root = document.documentElement
  // ES / EN / FR se escriben de izquierda a derecha: `dir` se fija explícitamente
  // para que un atributo heredado (p. ej. un `dir="rtl"` de una extensión) no lo cambie.
  root.lang = lang
  root.dir = 'ltr'

  const head = document.head
  if (!head) return

  const title = t('meta.title')
  const description = t('meta.description')
  if (title) document.title = title

  ensureMeta(head, 'meta[name="description"]', 'name').setAttribute('content', description)
  ensureMeta(head, 'meta[property="og:title"]', 'property').setAttribute('content', title)
  ensureMeta(head, 'meta[property="og:description"]', 'property').setAttribute('content', description)
  ensureMeta(head, 'meta[property="og:locale"]', 'property').setAttribute(
    'content',
    t('meta.ogLocale'),
  )
  // El alt de la imagen social se declara ya (es el `alt` aprobado de la foto del
  // hero): cuando llegue la imagen real (D9) solo falta añadir `og:image`.
  ensureMeta(head, 'meta[property="og:image:alt"]', 'property').setAttribute(
    'content',
    t('meta.ogAlt'),
  )

  // `og:locale:alternate` con los otros dos idiomas del diccionario.
  head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((node) => node.remove())
  LANGUAGES.filter((code) => code !== lang).forEach((code) => {
    const alternate = document.createElement('meta')
    alternate.setAttribute('property', 'og:locale:alternate')
    alternate.setAttribute('content', dicts[code].meta.ogLocale)
    head.appendChild(alternate)
  })

  // hreflang es / en / fr sobre la URL actual + `?lang=`. Sin URL absoluta
  // inventada: se parte de `window.location.href` y no se navega ni se escribe
  // en el historial.
  head.querySelectorAll('link[data-i18n-hreflang]').forEach((node) => node.remove())
  try {
    const base = new URL(window.location.href)
    LANGUAGES.forEach((code) => {
      const url = new URL(base.href)
      url.searchParams.set('lang', code)
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', code)
      link.setAttribute('href', url.href)
      link.setAttribute('data-i18n-hreflang', code)
      head.appendChild(link)
    })
  } catch {
    /* entorno sin URL navegable (tests, file:): se omiten los hreflang */
  }

  // Guarda de deriva (solo desarrollo): el `<noscript>` de index.html debe seguir
  // contando lo mismo que `meta.noscript`. Sin JS no hay proveedor, y con JS este
  // bloque no se muestra: su sitio es el HTML estático, en ES.
  if (IS_DEV) {
    const noscript = document.querySelector('noscript')
    const norm = (value) => String(value || '').replace(/\s+/g, ' ').trim()
    const expected = norm(t('meta.noscript'))
    if (noscript && expected) {
      const actual = norm(noscript.textContent)
      if (!actual.includes(expected.slice(0, expected.indexOf('. ') + 1))) {
        console.warn(
          '[i18n] El <noscript> de index.html ya no coincide con «meta.noscript» del diccionario.',
        )
      }
    }
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  /** Cambia el idioma, lo persiste y refleja `lang`/`dir` en `<html>`. */
  const setLang = useCallback((next) => {
    if (!SUPPORTED.has(next)) return
    setLangState(next)
    persistLang(next)
    // Reflejo inmediato en el documento (también lo garantiza el efecto de abajo).
    try {
      document.documentElement.lang = next
      document.documentElement.dir = 'ltr'
    } catch {
      /* entorno sin DOM */
    }
  }, [])

  /**
   * Traduce una ruta. El resultado depende solo de `lang`: se memoiza con
   * `useCallback` para no invalidar el contexto en cada render.
   */
  const t = useCallback(
    (path, vars) => {
      if (path === undefined || path === null || path === '') return ''
      const segments = toSegments(path)
      const active = dicts[lang] || dicts[DEFAULT_LANG]
      let value = readPath(active, segments)

      if (value === undefined && lang !== FALLBACK_LANG) {
        value = readPath(dicts[FALLBACK_LANG], segments)
        if (value !== undefined && IS_DEV) {
          console.warn(
            `[i18n] «${path}» no existe en «${lang}»; se usa la versión ${FALLBACK_LANG}.`,
          )
        }
      }

      if (value === undefined) {
        if (IS_DEV) {
          console.warn(
            `[i18n] Clave inexistente: «${path}» (ni en «${lang}» ni en ${FALLBACK_LANG}).`,
          )
        }
        return ''
      }

      return interpolate(value, vars)
    },
    [lang],
  )

  // `<html lang>`/`dir`, título, description, `og:*` y hreflang siguen al idioma
  // activo. Efecto idempotente: solo escribe en el DOM, nunca en el estado, así que
  // no puede provocar un bucle de render ni tocar el historial del navegador.
  useEffect(() => {
    try {
      syncDocumentHead(lang, t)
    } catch {
      /* entorno sin DOM (tests, SSR): el resto del proveedor sigue funcionando */
    }
  }, [lang, t])

  /**
   * URL de WhatsApp con el mensaje ya codificado del idioma activo.
   * `waUrl('comprar')` / `waUrl('cierre')` / `waUrl('pasos')` siguen funcionando
   * por los alias; las claves canónicas son `buy`, `footer` y `steps`.
   */
  const waUrl = useCallback(
    (section = WA_FALLBACK_SECTION) => {
      const active = dicts[lang] || dicts[DEFAULT_LANG]
      const key = SECTION_ALIASES[section] || section
      const value =
        active?.wa?.[key] ??
        active?.wa?.[WA_FALLBACK_SECTION] ??
        esDict.wa[WA_FALLBACK_SECTION]
      return `${WHATSAPP_BASE}${value}`
    },
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      waUrl,
      instagramUrl: INSTAGRAM_URL,
      langs: LANGUAGES,
    }),
    [lang, setLang, t, waUrl],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLang() debe usarse dentro de <LanguageProvider>.')
  }
  return ctx
}

export default LanguageContext
