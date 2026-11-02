import { localesFor } from './messages'
import { getLocale, localePath } from './locales'

/**
 * Every localisable route: its catalog name and its English path. A path
 * ending in /* is a collection (one catalog holds every entry), so all of its
 * entries are available in the same locales.
 */
export const PAGES: { id: string; path: string }[] = [
  { id: 'home', path: '/' },
  { id: 'download', path: '/download' },
  { id: 'pricing', path: '/pricing' },
  { id: 'support', path: '/support' },
  { id: 'privacy', path: '/privacy' },
  { id: 'about', path: '/about' },
  { id: 'security', path: '/security' },
  { id: 'limitations', path: '/limitations' },
  { id: 'architecture', path: '/architecture' },
  { id: 'protocol', path: '/protocol' },
  { id: 'threat-model', path: '/threat-model' },
  { id: 'bug-bounty', path: '/bug-bounty' },
  { id: 'transparency', path: '/transparency' },
  { id: 'changelog', path: '/changelog' },
  { id: 'news', path: '/news' },
  { id: 'privacy-policy', path: '/privacy-policy' },
  { id: 'terms', path: '/terms' },
  { id: 'feature-no-servers', path: '/features/no-servers' },
  { id: 'feature-e2e-encryption', path: '/features/e2e-encryption' },
  { id: 'feature-metadata-protection', path: '/features/metadata-protection' },
  { id: 'feature-seed-phrase-accounts', path: '/features/seed-phrase-accounts' },
  { id: 'feature-duress-code', path: '/features/duress-code' },
  { id: 'best-apps', path: '/best-private-messaging-apps' },
  { id: 'alternatives', path: '/alternatives' },
  { id: 'alternatives-entries', path: '/alternatives/*' },
  { id: 'compare-entries', path: '/compare/*' },
  { id: 'guides', path: '/guides' },
  { id: 'guides-entries', path: '/guides/*' },
  { id: 'glossary', path: '/glossary' },
  { id: 'glossary-entries', path: '/glossary/*' },
  { id: 'blog', path: '/blog' },
]

const BY_ID = new Map(PAGES.map((p) => [p.id, p]))

export function pagePath(id: string): string {
  const p = BY_ID.get(id)
  if (!p) throw new Error(`Unknown page id ${id}`)
  return p.path
}

/**
 * English path → locales it exists in, for the language switcher. Built at
 * request/build time on the server and handed to the client as plain data.
 */
export function availabilityMap(): Record<string, string[]> {
  return Object.fromEntries(PAGES.map((p) => [p.path, localesFor(p.id)]))
}

/**
 * hreflang map for one page: { 'de': '/de/download', 'zh-Hans': '/zh-hans/download', ... }.
 * `enPath` is the concrete English path, which for a collection entry is the
 * entry's own path rather than the /* pattern.
 */
export function hreflangFor(id: string, enPath: string): Record<string, string> {
  return Object.fromEntries(
    localesFor(id).map((code) => [getLocale(code)!.hreflang, localePath(code, enPath)]),
  )
}
