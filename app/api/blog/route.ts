import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { SITE } from '@/lib/site'
import { getPosts, LOCALES, blogBase, translit, type Locale } from '@/lib/posts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Bilingual blog ingestion endpoint for automation (e.g. n8n).
 *
 *   POST /api/blog
 *   Authorization: Bearer <BLOG_INGEST_TOKEN>
 *   Content-Type: application/json
 *
 * Two shapes are accepted:
 *
 *  A) Bilingual (recommended) - one call publishes EN + RU, sharing a slug:
 *     {
 *       "slug": "optional-shared-slug",   // else derived from en.title
 *       "date": "2026-07-05",             // optional, applies to both
 *       "en": { "title": "...", "description": "...", "body": "## md...",
 *               "tags": ["Privacy"], "author": "...", "howto": [...], "video": "..." },
 *       "ru": { "title": "...", "description": "...", "body": "## md...",
 *               "tags": ["Приватность"] }
 *     }
 *
 *  B) Single language (back-compat):
 *     { "lang": "en"|"ru", "title": "...", "description": "...", "body": "...",
 *       "tags": [...], ... }   // lang defaults to "en"
 *
 * EN files go to content/blog/en/<slug>.md, RU to content/blog/ru/<slug>.md.
 * With GITHUB_* env set they are committed to your repo (Vercel redeploys →
 * static posts go live, linked by hreflang). Otherwise written to local disk.
 */

function slugify(s: string) {
  return translit(s)
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function authOk(req: Request) {
  const expected = process.env.BLOG_INGEST_TOKEN
  if (!expected) return false
  const auth = req.headers.get('authorization') || ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const key = req.headers.get('x-api-key') || bearer
  return Boolean(key && key === expected)
}

type LangInput = Record<string, unknown>

function buildFrontmatterFile(input: LangInput, sharedDate?: string) {
  const title = String(input.title ?? '').trim()
  const body = String(input.body ?? input.content ?? '').trim()
  if (!title || !body) return null

  const description = String(input.description ?? '').trim()
  const date = String(input.date ?? sharedDate ?? new Date().toISOString().slice(0, 10))
  const tags = Array.isArray(input.tags) ? input.tags.map(String).slice(0, 8) : []
  const words = body.split(/\s+/).length
  const readingTime = String(
    input.readingTime ?? `${Math.max(1, Math.round(words / 200))} min read`,
  )

  const fm: Record<string, unknown> = { title, description, date, readingTime, tags }
  if (input.author) fm.author = String(input.author)
  if (input.updated) fm.updated = String(input.updated)
  if (input.video) fm.video = String(input.video)
  if (Array.isArray(input.howto)) {
    const steps = (input.howto as { name?: unknown; text?: unknown }[])
      .filter((s) => s && s.name && s.text)
      .map((s) => ({ name: String(s.name), text: String(s.text) }))
      .slice(0, 20)
    if (steps.length) fm.howto = steps
  }
  return { title, content: matter.stringify(body + '\n', fm) }
}

/** List existing posts per locale (for slug dedupe in the workflow). */
export async function GET() {
  return NextResponse.json({
    ok: true,
    posts: {
      en: getPosts('en').map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
      ru: getPosts('ru').map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
    },
  })
}

async function persist(files: { locale: Locale; rel: string; content: string }[]) {
  const gh = {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'main',
  }

  if (gh.token && gh.owner && gh.repo) {
    const headers = {
      Authorization: `Bearer ${gh.token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'privamesh-blog-ingest',
    }
    for (const f of files) {
      const api = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${f.rel}`
      let sha: string | undefined
      const head = await fetch(`${api}?ref=${gh.branch}`, { headers })
      if (head.ok) sha = ((await head.json()) as { sha?: string }).sha
      const put = await fetch(api, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `blog: ${sha ? 'update' : 'add'} ${f.rel}`,
          content: Buffer.from(f.content, 'utf8').toString('base64'),
          branch: gh.branch,
          ...(sha ? { sha } : {}),
        }),
      })
      if (!put.ok) throw new Error(`GitHub ${put.status}: ${await put.text()}`)
    }
    return 'github' as const
  }

  for (const f of files) {
    const abs = path.join(process.cwd(), f.rel)
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, f.content, 'utf8')
  }
  return 'local' as const
}

export async function POST(req: Request) {
  if (!process.env.BLOG_INGEST_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'Server missing BLOG_INGEST_TOKEN' },
      { status: 500 },
    )
  }
  if (!authOk(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const bilingual = payload.en || payload.ru
  const sharedDate = payload.date ? String(payload.date) : undefined

  // Collect per-locale inputs.
  const inputs: Partial<Record<Locale, LangInput>> = {}
  if (bilingual) {
    if (payload.en && typeof payload.en === 'object') inputs.en = payload.en as LangInput
    if (payload.ru && typeof payload.ru === 'object') inputs.ru = payload.ru as LangInput
  } else {
    const lang = (String(payload.lang ?? 'en') as Locale) === 'ru' ? 'ru' : 'en'
    inputs[lang] = payload
  }

  const provided = LOCALES.filter((l) => inputs[l])
  if (provided.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Provide "en" and/or "ru" objects (or top-level title+body).' },
      { status: 400 },
    )
  }

  // Shared slug: explicit, else from EN title, else RU title.
  const slugSource =
    String(payload.slug ?? '') ||
    String((inputs.en as LangInput | undefined)?.title ?? '') ||
    String((inputs.ru as LangInput | undefined)?.title ?? '')
  const slug = slugify(slugSource)
  if (!slug) return NextResponse.json({ ok: false, error: 'Cannot derive slug' }, { status: 400 })

  const files: { locale: Locale; rel: string; content: string }[] = []
  const published: { locale: Locale; url: string }[] = []
  for (const locale of provided) {
    const built = buildFrontmatterFile(inputs[locale] as LangInput, sharedDate)
    if (!built) {
      return NextResponse.json(
        { ok: false, error: `"${locale}" needs both title and body` },
        { status: 400 },
      )
    }
    files.push({ locale, rel: `content/blog/${locale}/${slug}.md`, content: built.content })
    published.push({ locale, url: `${SITE.domain}${blogBase(locale)}/${slug}` })
  }

  try {
    const mode = await persist(files)
    return NextResponse.json({
      ok: true,
      mode,
      slug,
      languages: provided,
      urls: published,
      ...(mode === 'github' ? { note: 'Committed. Vercel will redeploy and publish.' } : {}),
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'Persist failed', detail: String(err) },
      { status: 500 },
    )
  }
}
