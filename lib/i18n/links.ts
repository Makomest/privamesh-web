import { DEFAULT_LOCALE, localePath } from './locales'

/**
 * Pure link helpers, safe for client components: availability comes in as
 * data (from availabilityMap() on the server) rather than from the disk.
 */

export type Availability = Record<string, string[]>

function lookup(avail: Availability, enPath: string): string[] | undefined {
  const clean = enPath.split('#')[0].split('?')[0] || '/'
  if (avail[clean]) return avail[clean]
  const pattern = Object.keys(avail).find(
    (k) => k.endsWith('/*') && clean.startsWith(k.slice(0, -1)),
  )
  return pattern ? avail[pattern] : undefined
}

/** The English path in `locale` if that page exists there, else the English path. */
export function hrefIn(locale: string, enHref: string, avail: Availability): string {
  if (locale === DEFAULT_LOCALE || !enHref.startsWith('/')) return enHref
  return lookup(avail, enHref)?.includes(locale) ? localePath(locale, enHref) : enHref
}

/** Whether the page at this English path is published in `locale`. */
export function existsIn(locale: string, enPath: string, avail: Availability): boolean {
  if (locale === DEFAULT_LOCALE) return true
  return lookup(avail, enPath)?.includes(locale) ?? false
}
