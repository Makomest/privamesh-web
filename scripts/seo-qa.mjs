#!/usr/bin/env node
/**
 * SEO QA. Crawls every sitemap URL plus a list of known redirect and 404 cases
 * against a running server and fails the process on any violation, so a
 * regression breaks CI rather than showing up in Search Console weeks later.
 *
 * Usage:
 *   npm run build && npm start &        # or: next start -p 3111
 *   npm run seo:qa                      # defaults to http://localhost:3111
 *   SEO_QA_BASE=https://privamesh.org npm run seo:qa
 *
 * Exit code 0 = all checks pass, 1 = at least one failure.
 */

const BASE = process.env.SEO_QA_BASE || 'http://localhost:3111'
const CANON_HOST = 'https://privamesh.org'

const failures = []
const warnings = []
const fail = (url, msg) => failures.push(`${url} — ${msg}`)
const warn = (url, msg) => warnings.push(`${url} — ${msg}`)

const get = async (path, redirect = 'manual') => {
  const res = await fetch(BASE + path, { redirect, headers: { 'user-agent': 'seo-qa' } })
  const body = res.status >= 200 && res.status < 300 ? await res.text() : ''
  return { status: res.status, location: res.headers.get('location'), body }
}

const all = (html, re) => [...html.matchAll(re)].map((m) => m[1])

/** Attribute and text values arrive HTML-escaped; "&amp;" is one character to
 *  Google, not five, so lengths must be measured on the decoded string. */
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))

/** Canonical path on the live host, whatever base we are testing against. */
const canonicalFor = (path) => CANON_HOST + (path === '/' ? '' : path)

// ---------------------------------------------------------------- sitemap ---
console.log(`SEO QA against ${BASE}\n`)

const sitemapRes = await get('/sitemap.xml')
if (sitemapRes.status !== 200) {
  console.error(`FATAL: /sitemap.xml returned ${sitemapRes.status}`)
  process.exit(1)
}
const sitemapUrls = all(sitemapRes.body, /<loc>([^<]+)<\/loc>/g)
const paths = sitemapUrls.map((u) => u.replace(CANON_HOST, '') || '/')
console.log(`sitemap: ${paths.length} URLs`)

// ------------------------------------------------------------ image sitemap ---
const imgRes = await get('/image-sitemap.xml')
if (imgRes.status === 200) {
  for (const loc of all(imgRes.body, /<image:loc>([^<]+)<\/image:loc>/g)) {
    if (loc.includes('?') || loc.includes('#')) {
      fail('/image-sitemap.xml', `image URL carries a query or hash: ${loc}`)
    }
    if (loc.includes('opengraph-image')) {
      fail('/image-sitemap.xml', `generated OG image is not a stable URL: ${loc}`)
    }
  }
}

// ------------------------------------------------------------- page checks ---
const titles = new Map()
const descs = new Map()
const pages = new Map()
const internalTargets = new Set()

for (const path of paths) {
  const { status, body } = await get(path)
  if (status !== 200) {
    fail(path, `in sitemap but returns ${status}`)
    continue
  }

  const titleTags = all(body, /<title>([^<]*)<\/title>/g)
  const descTags = all(body, /<meta name="description" content="([^"]*)"/g)
  const canonTags = all(body, /<link rel="canonical" href="([^"]*)"/g)
  const robots = (body.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || ''

  if (titleTags.length !== 1) fail(path, `expected exactly 1 <title>, found ${titleTags.length}`)
  if (descTags.length !== 1) fail(path, `expected exactly 1 meta description, found ${descTags.length}`)
  if (canonTags.length !== 1) fail(path, `expected exactly 1 canonical, found ${canonTags.length}`)

  if (robots.includes('noindex')) fail(path, 'noindex page is listed in the sitemap')

  const title = decode(titleTags[0] ?? '')
  const desc = decode(descTags[0] ?? '')
  const canon = canonTags[0] ?? ''

  if (canon && canon !== canonicalFor(path)) fail(path, `canonical points at ${canon}`)
  if (canon.includes('?')) fail(path, 'canonical carries a query string')

  if (title.length > 60) warn(path, `title ${title.length} chars`)
  if (desc && (desc.length < 130 || desc.length > 160)) warn(path, `description ${desc.length} chars`)

  // A description ending in a letter with no terminal punctuation and no
  // ellipsis is the signature of a naive .slice() cutting a word in half.
  if (desc && /[A-Za-zА-Яа-я]$/.test(desc) && !/[.!?…»)]$/.test(desc)) {
    fail(path, `description looks truncated mid-word: "…${desc.slice(-24)}"`)
  }

  if (/Soon on the App Store|Скоро в App Store/i.test(body)) {
    fail(path, 'still contains a pre-launch "Soon on the App Store" string')
  }

  if (title) {
    if (titles.has(title)) fail(path, `duplicate title, also on ${titles.get(title)}`)
    else titles.set(title, path)
  }
  if (desc) {
    if (descs.has(desc)) fail(path, `duplicate description, also on ${descs.get(desc)}`)
    else descs.set(desc, path)
  }

  for (const block of all(body, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block)
    } catch (e) {
      fail(path, `invalid JSON-LD: ${e.message}`)
    }
  }

  const hreflangs = [...body.matchAll(/hrefLang="([a-zA-Z-]+)" href="([^"]+)"/g)].map((m) => ({
    lang: m[1],
    href: m[2],
  }))
  pages.set(path, { hreflangs, robots })

  for (const href of all(body, /href="(\/[^"#?]*)"/g)) internalTargets.add(href)
}

// ------------------------------------------------------- hreflang symmetry ---
for (const [path, { hreflangs }] of pages) {
  if (hreflangs.length === 0) continue
  const self = canonicalFor(path)
  if (!hreflangs.some((h) => h.href === self)) {
    fail(path, 'declares hreflang alternates but does not list itself')
  }
  if (!hreflangs.some((h) => h.lang === 'x-default')) fail(path, 'hreflang set has no x-default')

  for (const h of hreflangs) {
    if (h.lang === 'x-default') continue
    const otherPath = h.href.replace(CANON_HOST, '') || '/'
    const other = pages.get(otherPath)
    if (!other) continue // not in the sitemap; covered by the status check above
    if (!other.hreflangs.some((x) => x.href === self)) {
      fail(path, `hreflang to ${otherPath} is not reciprocal`)
    }
  }
}

// -------------------------------------------------- internal links are alive ---
const checked = new Set()
for (const href of internalTargets) {
  if (checked.has(href)) continue
  checked.add(href)
  if (/\.(png|jpg|svg|ico|xml|txt|webmanifest)$/.test(href)) continue
  const { status } = await get(href)
  if (status === 404) fail('internal link', `${href} returns 404`)
}

// ------------------------------------------------------- redirects and 404s ---
const REDIRECTS = [
  ['/support.html', '/support'],
  ['/privacy-policy.html', '/privacy-policy'],
  ['/terms.html', '/terms'],
  ['/index.html', '/'],
  ['/blog/page/1', '/blog'],
  ['/ru/blog/page/1', '/ru/blog'],
  ['/blog/tag/serverless-chat', '/blog/tag/serverless'],
  ['/guides/most-private-messaging-app-2026', '/best-private-messaging-apps'],
]
for (const [from, to] of REDIRECTS) {
  const { status, location } = await get(from)
  if (status !== 301 && status !== 308) fail(from, `expected a permanent redirect, got ${status}`)
  else if (location && !location.endsWith(to)) fail(from, `redirects to ${location}, expected ${to}`)
}

const { status: notFound } = await get('/definitely-not-a-real-page-xyz')
if (notFound !== 404) fail('/definitely-not-a-real-page-xyz', `expected 404, got ${notFound}`)

// -------------------------------------------------------------------- report ---
console.log(`\nchecked ${paths.length} sitemap pages, ${checked.size} internal links, ${REDIRECTS.length} redirects`)

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`)
  for (const w of warnings) console.log('  ⚠ ' + w)
}

if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):`)
  for (const f of failures) console.log('  ✗ ' + f)
  process.exit(1)
}

console.log('\n✓ SEO QA passed')
