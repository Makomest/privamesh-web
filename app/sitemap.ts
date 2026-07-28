import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getPosts, hasTranslation, PER_PAGE } from '@/lib/posts'
import { GLOSSARY } from '@/lib/glossary'
import { ALTERNATIVES } from '@/lib/alternatives'
import { GUIDES } from '@/lib/guides'
import { getUpdates } from '@/lib/updates'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

const STATIC_PATHS: { path: string; priority: number; freq: Freq }[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/privacy-policy', priority: 0.7, freq: 'monthly' },
  { path: '/terms', priority: 0.5, freq: 'monthly' },
  { path: '/privacy', priority: 0.9, freq: 'monthly' },
  { path: '/features/no-servers', priority: 0.9, freq: 'monthly' },
  { path: '/features/e2e-encryption', priority: 0.8, freq: 'monthly' },
  { path: '/features/metadata-protection', priority: 0.8, freq: 'monthly' },
  { path: '/features/seed-phrase-accounts', priority: 0.8, freq: 'monthly' },
  { path: '/features/sol-transfers', priority: 0.7, freq: 'monthly' },
  { path: '/compare/privamesh-vs-signal', priority: 0.8, freq: 'monthly' },
  { path: '/compare/privamesh-vs-telegram', priority: 0.8, freq: 'monthly' },
  { path: '/compare/privamesh-vs-session', priority: 0.7, freq: 'monthly' },
  { path: '/best-private-messaging-apps', priority: 0.9, freq: 'monthly' },
  { path: '/alternatives', priority: 0.8, freq: 'monthly' },
  { path: '/guides', priority: 0.8, freq: 'monthly' },
  { path: '/glossary', priority: 0.7, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'yearly' },
  { path: '/support', priority: 0.6, freq: 'monthly' },
  { path: '/blog', priority: 0.6, freq: 'weekly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entry = (path: string, priority: number, freq: Freq, lastModified: Date = now) => ({
    url: `${SITE.domain}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  })

  const hreflang = { languages: { en: SITE.domain, ru: `${SITE.domain}/ru` } }
  // /news carries robots noindex until the first update is published, so it
  // only belongs in the sitemap once there is something on it.
  const newsEntries = getUpdates().length > 0 ? [entry('/news', 0.7, 'daily')] : []
  const supportHreflang = {
    languages: { en: `${SITE.domain}/support`, ru: `${SITE.domain}/ru/support` },
  }
  const staticEntries = STATIC_PATHS.map((p) => {
    if (p.path === '/') return { ...entry(p.path, p.priority, p.freq), alternates: hreflang }
    if (p.path === '/support')
      return { ...entry(p.path, p.priority, p.freq), alternates: supportHreflang }
    return entry(p.path, p.priority, p.freq)
  })
  const ruLanding = [
    { ...entry('/ru', 0.9, 'weekly'), alternates: hreflang },
    entry('/ru/blog', 0.5, 'weekly'),
    { ...entry('/ru/support', 0.6, 'monthly'), alternates: supportHreflang },
  ]

  const enPosts = getPosts('en')
  const posts = enPosts.map((post) => {
    const base = entry(`/blog/${post.slug}`, 0.6, 'yearly', new Date(post.updated ?? post.date))
    return hasTranslation(post.slug, 'ru')
      ? {
          ...base,
          alternates: {
            languages: {
              en: `${SITE.domain}/blog/${post.slug}`,
              ru: `${SITE.domain}/ru/blog/${post.slug}`,
            },
          },
        }
      : base
  })
  const ruPosts = getPosts('ru').map((post) =>
    entry(`/ru/blog/${post.slug}`, 0.6, 'yearly', new Date(post.updated ?? post.date)),
  )

  // Tag archives are intentionally absent: they carry robots noindex,follow
  // (thin, overlapping listings), so listing them here would contradict that.
  const glossary = GLOSSARY.map((t) => entry(`/glossary/${t.slug}`, 0.6, 'monthly'))
  const alternatives = ALTERNATIVES.map((a) => entry(`/alternatives/${a.slug}`, 0.7, 'monthly'))
  const guides = GUIDES.map((g) => entry(`/guides/${g.slug}`, 0.7, 'monthly'))

  const totalPages = Math.max(1, Math.ceil(enPosts.length / PER_PAGE))
  const paged = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
    entry(`/blog/page/${i + 2}`, 0.4, 'weekly'),
  )

  return [
    ...staticEntries,
    ...newsEntries,
    ...ruLanding,
    ...posts,
    ...ruPosts,
    ...glossary,
    ...alternatives,
    ...guides,
    ...paged,
  ]
}
