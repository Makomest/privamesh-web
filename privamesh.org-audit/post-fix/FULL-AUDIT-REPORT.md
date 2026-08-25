# Full SEO Audit — privamesh.org (post-fix build)

**Date:** 2026-07-26
**Target:** local production build (`next build` + `next start`), commit `32440a1` + uncommitted Phase 1 fixes
**Pages crawled:** 63 (51 from sitemap + 12 tag archives discovered via internal links)
**Crawl result:** 63 × HTTP 200, 0 redirects, 0 errors, 0 orphans
**Baseline for comparison:** [../FULL-AUDIT-REPORT.md](../FULL-AUDIT-REPORT.md) — live site, 94 pages, 71/100

> **This is not the live site.** privamesh.org still serves the pre-fix build. This audit scores the working tree.

---

## Executive Summary

### SEO Health Score: **75 / 100** (was 71)

| Category | Score | Δ | Weight | Contribution |
|---|---|---|---|---|
| Technical SEO | 88 | +14 | 22% | 19.4 |
| Content Quality | 52 | — | 23% | 12.0 |
| On-Page SEO | 76 | — | 20% | 15.2 |
| Schema / Structured Data | 88 | — | 10% | 8.8 |
| Performance (CWV) | 78* | — | 10% | 7.8 |
| AI Search Readiness | 73 | +1 | 10% | 7.3 |
| Images | 94 | +12 | 5% | 4.7 |
| **Total** | | **+4** | | **75.1** |

\* Still lab/server-side only — no Chrome, no Lighthouse.

All four Phase 1 items verified fixed. The remaining 25 points are almost entirely **Content Quality** (52) and **On-Page SEO** (76) — Phase 2 and 3 work that no amount of technical polish will move.

### Phase 1 verification

| Fix | Before (live) | After (this build) | Status |
|---|---|---|---|
| RU `lang` | 25 pages `lang="en"` | 53 EN pages `en`, 10 RU pages `ru`, 0 wrong | ✅ |
| hreflang reciprocity | `/` and `/blog` emitted none | all 4 pages in both pairs emit identical en/ru/x-default | ✅ |
| `og:image` | 70 of 94 pages missing | missing only on the 12 noindexed tag archives; 51 distinct images across 51 indexable pages | ✅ |
| Tag archives | 31 indexed, in sitemap | 12 present, all `noindex, follow`, 0 in sitemap | ✅ |

### Top 5 remaining issues

1. **42 of 63 pages still thin (<300 words)** — median 218 words. Unchanged; this is Phase 2/3.
2. **22 titles still exceed 60 characters** — the `· PrivaMesh` suffix.
3. **Head-term cannibalization untouched** — `/best-private-messaging-apps` vs `/guides/most-private-messaging-app-2026` still compete.
4. **FAQPage on 14 of 63 pages** — absent from every `/features/*`, `/guides/*`, `/alternatives/*`, `/compare/*`.
5. **New: the 404 page lost its stylesheet link** — a side effect of the two-root-layout change.

### Top 5 quick wins (unchanged from baseline)

1. Trim the 22 over-length titles.
2. Fix the `What is a End-to-end encryption` article-agreement bug in the glossary title template.
3. Fill or de-index `/news` (still 26 words).
4. Publish `/llms.txt`.
5. Add internal links to the 19 pages sitting at 1 inbound link.

---

## Technical SEO — 88/100 (was 74)

### What works
- **`lang` correct across both locales** — 53 EN pages `lang="en"`, 10 RU pages `lang="ru"`, zero mismatches. Implemented via two root layouts (`app/(en)`, `app/(ru)`) so the site stays statically generated.
- **hreflang reciprocal on every pair.** Verified all four endpoints emit the identical triple:
  `en → https://privamesh.org/blog`, `ru → https://privamesh.org/ru/blog`, `x-default → https://privamesh.org/blog`
- Sitemap down to 51 URLs (63 live-equivalent), tag archives removed, no contradiction with their `noindex`.
- 63/63 canonical, self-referencing (all point at the production domain, correct for a localhost build).
- 63/63 pages 200, 0 redirects, 0 orphans, 404s return 404.
- Security headers are **app-level, not proxy-level** — HSTS preload, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` all present on the bare `next start`.
- `x-nextjs-cache: HIT` — static generation survived the route-group refactor.

### Findings

**[Low] 404 page ships without a `<link rel="stylesheet">`** — *new regression*
Next 14 renders the not-found boundary outside every layout once an app has more than one root layout. Status is still 404 with `noindex`, and `app/(en)/(site)/not-found.tsx` now re-imports `globals.css` and re-renders `SiteShell` (nav, footer, font variables all present), but the stylesheet arrives via the client chunk rather than the initial HTML — brief unstyled flash. No SEO impact.

**[Low] `/ru/*` misses render the English 404** — same root cause; a RU-specific `not-found.tsx` would never be reached, so it was removed rather than left as dead code.

**[Medium] Still no Content-Security-Policy header.**
**[Low] `x-powered-by: Next.js` still exposed.**
**[Low] `/llms.txt` still absent.**

---

## Content Quality — 52/100 (unchanged)

Nothing in Phase 1 touched content. Numbers shift only because this build has 2 EN and 2 RU blog posts on disk versus 6 and 6 live — the four missing posts are the site's longest pages, which is why the median rises to 218 while the long tail looks the same.

### Findings

**[High] 42 of 63 pages under 300 words** — by section:

| Section | Pages | Avg words |
|---|---|---|
| blog tags | 12 | ~64 |
| glossary | 8 | 128 |
| alternatives | 8 | 178 |
| guides | 10 | 264 |

`/alternatives/*` (170–195 words) and `/guides/*` (218–273) remain the thinnest commercial-intent pages.

**[High] Head-term cannibalization untouched** — `/best-private-messaging-apps` (786w) vs `/guides/most-private-messaging-app-2026` (273w), plus `/alternatives/{threema,simplex,whatsapp}` against their blog counterparts.

**[Medium] `/news` still 26 words.**
**[Medium] E-E-A-T unchanged** — `/about` 353 words, still only two external domains linked sitewide (github.com ×257, x.com ×64).

---

## On-Page SEO — 76/100 (unchanged)

### What works
- 63/63 titles present, 0 duplicates.
- 63/63 meta descriptions present, 0 duplicates.
- 63/63 H1 present; **0 pages with multiple H1**, 0 H3-without-H2 skips.

### Findings

**[Medium] 22 titles exceed 60 characters** — worst: `/ru/blog/why-a-messenger-with-servers-can-never-be-fully-private` (78), `/glossary/end-to-end-encryption` (72), `/features/no-servers` (68), `/alternatives` (68), `/glossary` (68).

**[Medium] Glossary title grammar still broken** — "What is **a** End-to-end encryption (E2EE)?", "What is **a** Metadata (in messaging)?".

**[Medium] 19 pages at 1 inbound internal link** — all 10 `/guides/*`, all 7 `/glossary/*` detail pages, `/alternatives/imessage`, `/alternatives/wickr`. Slightly worse-looking than the live crawl only because the 4 missing blog posts carry contextual links.

**[Info] Duplicate H1s not verifiable here** — the 6 affected posts (`best-private-messenger-2026`, `privamesh-vs-threema`, `privamesh-vs-simplex` in both locales) are not in the local content directory. Assume still present until checked against live.

**[Low] 3 meta descriptions over 160 chars; 4 RU tag descriptions under 70** (the latter now moot — those pages are noindexed).

---

## Schema / Structured Data — 88/100 (unchanged)

| Type | Pages |
|---|---|
| Organization | 63 |
| WebSite | 63 |
| BreadcrumbList / ListItem | 61 |
| ItemList | 19 |
| FAQPage / Question / Answer | 14 |
| Article + Person | 4 |
| DefinedTerm | 8 |
| SoftwareApplication + Offer | 2 |

0 pages without JSON-LD, 0 parse errors. The route-group refactor did not disturb any structured data.

**[Medium] FAQPage still on 14 of 63** — absent from all `/features/*`, `/guides/*`, `/alternatives/*`, `/compare/*`.
**[Low] 2 pages missing BreadcrumbList; SoftwareApplication on 2; no DefinedTermSet.**

---

## Performance — 78/100 (unchanged, low confidence)

- Median TTFB 24 ms (localhost, no network — not comparable to the 74 ms measured live).
- Median HTML 68 KB; **home page 171 KB**, still by far the heaviest and still carrying the always-on `NetworkBackground` canvas.
- `x-nextjs-cache: HIT` confirms static generation intact after the refactor.

**[Medium] Home page payload unchanged** — the 19 new `opengraph-image.tsx` files add build-time routes, not page weight, so the LCP/INP risk on `/` is exactly as it was.
**[Info] Still no LCP/INP/CLS measurement** — no Chrome installed.

---

## Images — 94/100 (was 82)

### What works
- **`og:image` + `twitter:image` on all 51 indexable pages**, 1200×630, via 19 new segment-level `opengraph-image.tsx` files built on the existing `ogImage()` helper.
- **51 distinct OG images** — `/guides/[slug]` and `/glossary/[term]` render the page's own title into the card; per-post blog, compare and alternatives cards are untouched.
- 149 `<img>`, **0 missing alt, 0 empty alt, 0 missing width/height**.

### Findings
**[Info] 12 tag archives have no `og:image`** — deliberate; they are `noindex, follow`.
**[Low] 5 images still have no `loading` attribute.**

---

## AI Search Readiness — 73/100 (was 72)

Unchanged except that RU content now declares Russian, which helps locale-aware assistants attribute it correctly.

**[Medium] No `llms.txt`.**
**[Medium] Thin passages still limit citability** — 42 pages lack a self-contained citable passage.
**[Medium] Still only two external domains linked sitewide** — no spec citations, no third-party corroboration.

---

## Limitations

- **Local build, not production.** No Caddy, no HTTP/3, no edge cache, no real network latency. Security headers were confirmed to originate in the app, so those carry over; TTFB numbers do not.
- **Content gap.** 4 EN and 4 RU blog posts exist only on the live server (created through `/admin`), so content-depth and internal-link figures understate the real site. The 6 duplicate-H1 pages are among them and could not be re-checked.
- **`claude-seo` toolchain still unavailable** — Python 3.9.6, no Homebrew. No Lighthouse, no screenshots, no PDF report.
- **No third-party data** — no Google, DataForSEO, Moz or Bing credentials.
