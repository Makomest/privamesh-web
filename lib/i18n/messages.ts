import fs from 'node:fs'
import path from 'node:path'
import { DEFAULT_LOCALE, LOCALES } from './locales'

/**
 * Translation catalogs: messages/<locale>/<page>.json, one file per page or
 * collection. English is the source; every other file is a translation of it.
 *
 * A page exists in a locale exactly when its file does. Nothing falls back to
 * English inside a translated page: a half-translated page is worse for a
 * reader and for search than no page, so a missing file means no route, no
 * hreflang entry and no sitemap line for that locale.
 */

const DIR = path.join(process.cwd(), 'messages')
const cache = new Map<string, unknown>()

function file(locale: string, page: string) {
  return path.join(DIR, locale, `${page}.json`)
}

export function hasMessages(locale: string, page: string): boolean {
  return fs.existsSync(file(locale, page))
}

export function getMessages<T>(locale: string, page: string): T {
  const key = `${locale}/${page}`
  if (!cache.has(key)) {
    const f = file(locale, page)
    if (!fs.existsSync(f)) throw new Error(`No ${page} catalog for ${locale} (${f})`)
    cache.set(key, JSON.parse(fs.readFileSync(f, 'utf8')))
  }
  return cache.get(key) as T
}

/**
 * Russian pages written by hand under app/(ru) before the catalogs existed.
 * They count as published until each one moves to a catalog, at which point
 * its entry here goes and its file under app/(ru) is deleted.
 */
const LEGACY: Record<string, string[]> = {
  ru: [
    'security',
    'architecture',
    'threat-model',
    'feature-duress-code',
    'blog',
  ],
}

/** Locale codes a page is published in, English first. */
export function localesFor(page: string): string[] {
  return LOCALES.map((l) => l.code).filter(
    (c) => c === DEFAULT_LOCALE || hasMessages(c, page) || LEGACY[c]?.includes(page),
  )
}

/** For generateStaticParams in the prefixed tree: every non-English locale that has the page. */
export function prefixedParamsFor(page: string): { locale: string }[] {
  return LOCALES.map((l) => l.code)
    .filter((c) => c !== DEFAULT_LOCALE && hasMessages(c, page))
    .map((locale) => ({ locale }))
}
