import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'

export type Locale = 'en' | 'ru'
export const LOCALES: Locale[] = ['en', 'ru']

export type HowToStep = { name: string; text: string }

export type Post = {
  slug: string
  locale: Locale
  title: string
  description: string
  date: string
  updated?: string
  author: string
  readingTime: string
  tags: string[]
  howto?: HowToStep[]
  video?: string
}

export const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog')
export const DEFAULT_AUTHOR = 'PrivaMesh Team'
export const PER_PAGE = 9

/** Localized URL prefix for the blog. EN lives at /blog, RU at /ru/blog. */
export function blogBase(locale: Locale): string {
  return locale === 'ru' ? '/ru/blog' : '/blog'
}

function dirFor(locale: Locale) {
  return path.join(BLOG_ROOT, locale)
}

function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

type RawPost = { meta: Post; content: string }

function toMeta(
  slug: string,
  locale: Locale,
  data: Record<string, unknown>,
  content: string,
): Post {
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? DEFAULT_AUTHOR),
    readingTime: String(data.readingTime ?? estimateReadingTime(content)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    howto: Array.isArray(data.howto) ? (data.howto as HowToStep[]) : undefined,
    video: data.video ? String(data.video) : undefined,
  }
}

function readAll(locale: Locale): RawPost[] {
  const dir = dirFor(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data, content } = matter(raw)
      return { meta: toMeta(slug, locale, data, content), content }
    })
    .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
}

export function getPosts(locale: Locale): Post[] {
  return readAll(locale).map((p) => p.meta)
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug)
}

export function getPostContent(locale: Locale, slug: string): RawPost | undefined {
  return readAll(locale).find((p) => p.meta.slug === slug)
}

/** Does a translation of this slug exist in the other locale? (for hreflang) */
export function hasTranslation(slug: string, locale: Locale): boolean {
  return fs.existsSync(path.join(dirFor(locale), `${slug}.md`))
}

const CYR_MAP: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  і: 'i',
  ї: 'yi',
  є: 'ye',
  ґ: 'g',
}

/** Transliterate Cyrillic → Latin so slugs stay ASCII (clean URLs, no routing edge cases). */
export function translit(s: string): string {
  return s
    .toLowerCase()
    .split('')
    .map((c) => (c in CYR_MAP ? CYR_MAP[c] : c))
    .join('')
}

export function slugifyTag(tag: string): string {
  return translit(tag)
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function getAllTags(locale: Locale): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, { tag: string; slug: string; count: number }>()
  for (const p of getPosts(locale)) {
    for (const t of p.tags) {
      const slug = slugifyTag(t)
      const existing = map.get(slug)
      if (existing) existing.count++
      else map.set(slug, { tag: t, slug, count: 1 })
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count)
}

export function getPostsByTag(locale: Locale, tagSlug: string): Post[] {
  return getPosts(locale).filter((p) => p.tags.some((t) => slugifyTag(t) === tagSlug))
}

/** Extract ## / ### headings for a table of contents (matches rehype-slug ids). */
export function extractHeadings(md: string): { id: string; text: string; level: 2 | 3 }[] {
  const slugger = new GithubSlugger()
  const out: { id: string; text: string; level: 2 | 3 }[] = []
  let inFence = false
  for (const line of md.split('\n')) {
    if (/^```/.test(line.trim())) inFence = !inFence
    if (inFence) continue
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const level = m[1].length === 2 ? 2 : 3
    const text = m[2].replace(/[*`_[\]]/g, '').replace(/\(.*?\)/g, '')
    out.push({ id: slugger.slug(text), text, level: level as 2 | 3 })
  }
  return out
}

// ── Back-compat aliases (English default) ───────────────────────────────────
export const POSTS: Post[] = getPosts('en')
