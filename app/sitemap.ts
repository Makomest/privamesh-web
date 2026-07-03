import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getPosts, getAllTags, hasTranslation, PER_PAGE } from '@/lib/posts'
import { GLOSSARY } from '@/lib/glossary'
import { ALTERNATIVES } from '@/lib/alternatives'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

const STATIC_PATHS: { path: string; priority: number; freq: Freq }[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/privacy', priority: 0.9, freq: 'monthly' },
  { path: '/features/no-servers', priority: 0.9, freq: 'monthly' },
  { path: '/features/e2e-encryption', priority: 0.8, freq: 'monthly' },
  { path: '/features/metadata-protection', priority: 0.8, freq: 'monthly' },
  { path: '/features/seed-phrase-accounts', priority: 0.8, freq: 'monthly' },
  { path: '/features/sol-transfers', priority: 0.7, freq: 'monthly' },
  { path: '/compare/privamesh-vs-signal', priority: 0.8, freq: 'monthly' },
  { path: '/compare/privamesh-vs-telegram', priority: 0.8, freq: 'monthly' },
  { path: '/compare/privamesh-vs-session', priority: 0.7, freq: 'monthly' },
  { path: '/alternatives', priority: 0.8, freq: 'monthly' },
  { path: '/glossary', priority: 0.7, freq: 'monthly' },
  { path: '/about', priority: 0.6, freq: 'yearly' },
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
  const staticEntries = STATIC_PATHS.map((p) =>
    p.path === '/'
      ? { ...entry(p.path, p.priority, p.freq), alternates: hreflang }
      : entry(p.path, p.priority, p.freq),
  )
  const ruLanding = [
    { ...entry('/ru', 0.9, 'weekly'), alternates: hreflang },
    entry('/ru/blog', 0.5, 'weekly'),
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

  const tags = getAllTags('en').map((t) => entry(`/blog/tag/${t.slug}`, 0.5, 'weekly'))
  const ruTags = getAllTags('ru').map((t) => entry(`/ru/blog/tag/${t.slug}`, 0.4, 'weekly'))
  const glossary = GLOSSARY.map((t) => entry(`/glossary/${t.slug}`, 0.6, 'monthly'))
  const alternatives = ALTERNATIVES.map((a) => entry(`/alternatives/${a.slug}`, 0.7, 'monthly'))

  const totalPages = Math.max(1, Math.ceil(enPosts.length / PER_PAGE))
  const paged = Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
    entry(`/blog/page/${i + 2}`, 0.4, 'weekly'),
  )

  return [
    ...staticEntries,
    ...ruLanding,
    ...posts,
    ...ruPosts,
    ...tags,
    ...ruTags,
    ...glossary,
    ...alternatives,
    ...paged,
  ]
}
