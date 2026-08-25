# Full SEO Audit — privamesh.org

**Date:** 2026-07-26
**Pages crawled:** 94 (100% of sitemap; crawler discovered 0 URLs outside the sitemap)
**Crawl result:** 94 × HTTP 200, 0 redirects, 0 errors, 0 orphans
**Business type:** Privacy/security consumer app (SaaS-adjacent product marketing site), pre-launch, EN + RU

---

## Executive Summary

### SEO Health Score: **71 / 100**

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 74 | 22% | 16.3 |
| Content Quality | 52 | 23% | 12.0 |
| On-Page SEO | 76 | 20% | 15.2 |
| Schema / Structured Data | 88 | 10% | 8.8 |
| Performance (CWV) | 78* | 10% | 7.8 |
| AI Search Readiness | 72 | 10% | 7.2 |
| Images | 82 | 5% | 4.1 |
| **Total** | | | **71.3** |

\* Lab/server-side only — see Limitations.

The site is technically well built: perfect canonical coverage, clean 200s across every URL, strong security headers, rich sitewide JSON-LD, and 100% image alt coverage. Two things hold the score down: **the Russian locale is broken at the markup level** (wrong `lang`, non-reciprocal hreflang), and **two-thirds of pages are thin** — 63 of 94 pages are under 300 words, with a site median of 175 words.

### Top 5 Critical / High Issues

1. **All 25 Russian pages declare `<html lang="en">`** — Russian content served under an English language declaration. Blocks correct locale targeting.
2. **hreflang is non-reciprocal for `/` ↔ `/ru` and `/blog` ↔ `/ru/blog`** — the RU pages point at the EN pages, but the EN pages emit no `alternate` tags at all. Google discards non-reciprocal hreflang clusters.
3. **70 of 94 pages have no `og:image`** while all 94 declare `twitter:card=summary_large_image` — every share of a feature, guide, glossary, or tag page renders a blank/degraded card.
4. **63 of 94 pages are thin (<300 words)** — 31 tag pages at ~60–70 words, 9 glossary pages at 106–152, 9 alternatives pages at 170–195.
5. **Keyword cannibalization on the primary head term** — `/best-private-messaging-apps` (786w), `/blog/best-private-messenger-2026` (1515w), and `/guides/most-private-messaging-app-2026` (273w) all target the same "best/most private messenger 2026" intent.

### Top 5 Quick Wins

1. Set `lang` from the route locale in `app/layout.tsx:66` — one-line-ish fix, unblocks all RU pages.
2. Add `languages` to the `pageMetadata()` call on the EN home and EN `/blog` — restores hreflang reciprocity for the two broken pairs.
3. Add an `opengraph-image.tsx` at the `app/features/`, `app/guides/`, `app/alternatives/`, `app/glossary/`, and `app/blog/tag/` segment level — fixes 70 blank social cards.
4. Trim 30 titles now over 60 characters — the `· PrivaMesh` template suffix is pushing otherwise-fine titles into truncation.
5. Publish `/llms.txt` and fill `/news` (currently 26 words) — cheap AI-citability and freshness signals.

---

## Technical SEO — 74/100

### What works
- HTTPS everywhere; `http://` and `www.` both resolve to `https://privamesh.org/` with no redirect chains.
- `strict-transport-security: max-age=63072000; includeSubDomains; preload`
- `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`, `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- `robots.txt` valid, declares `Host` and both sitemaps, blocks only `/admin` and `/api/`.
- Two sitemaps (94 URLs + image sitemap with captioned screenshots); every sitemap URL returns 200.
- 404s return a real HTTP 404.
- Canonical present on 94/94 pages, self-referencing on 94/94, zero mismatches.
- Zero `noindex` pages; zero redirect hops in the crawl.
- Edge-cached (`x-nextjs-cache: HIT`, `s-maxage=31536000, stale-while-revalidate`) behind Caddy with HTTP/3 advertised.

### Findings

**[Critical] Russian pages declare English as their language**
All 25 `/ru*` URLs serve `<html lang="en">`. Source: [app/layout.tsx:66](app/layout.tsx#L66) hardcodes `lang="en"` in the single root layout, so the `/ru` subtree inherits it.
*Fix:* derive locale from the route — either split into a `[locale]` segment group, or set `lang` in a RU-specific layout at `app/ru/layout.tsx`.

**[Critical] hreflang non-reciprocal on the two most important pairs**
14 pages emit hreflang. Verified directly:
- `https://privamesh.org/ru` → `en → https://privamesh.org`, `ru → https://privamesh.org/ru`, `x-default → https://privamesh.org`
- `https://privamesh.org/` → **no `rel=alternate hreflang` tags at all** (only canonical + RSS)
- Same asymmetry for `/blog` (none) vs `/ru/blog` (full set)

The 12 blog *posts* are correctly reciprocal. `lib/seo.ts` only emits `languages` when the caller passes them — the EN home and EN blog index don't. Note the sitemap *does* declare `xhtml:link` alternates for the home URL, which conflicts with the page markup.
*Fix:* pass `languages: { en: '/', ru: '/ru' }` to `pageMetadata()` in `app/page.tsx`, and `{ en: '/blog', ru: '/ru/blog' }` in `app/blog/page.tsx`.

**[Medium] No Content-Security-Policy header**
All other security headers are present; CSP is the gap. Not a ranking factor, but it's the one missing control on an otherwise hardened privacy-branded site — reputational for this niche.

**[Low] `x-powered-by: Next.js` exposed** — set `poweredByHeader: false` in `next.config.mjs`.

**[Low] No `llms.txt`** — returns 404. Ignored by Google Search, but read by some AI crawlers.

---

## Content Quality — 52/100

### What works
- 6 EN + 6 RU long-form blog posts, 1162–1515 words, the strongest assets on the site.
- `/privacy` (774w), `/best-private-messaging-apps` (786w), home (848w) have real depth.
- Heading structure is disciplined: 0 pages missing an H1, 0 H3-without-H2 skips, average 6.8–15 H2s per section.
- `Person` schema on all 12 articles — a genuine E-E-A-T signal most competitor sites skip.

### Findings

**[High] 63 of 94 pages under 300 words; site median 175 words**

| Section | Pages | Avg words |
|---|---|---|
| blog tags (EN+RU) | 31 | ~70 |
| glossary | 9 | 142 |
| alternatives | 9 | 183 |
| guides | 11 | 262 |
| blog | 25 | 325 |
| compare | 3 | 432 |
| features | 5 | 486 |

The `/alternatives/*` and `/guides/*` sections are the commercial-intent pages and are also the thinnest non-tag content. `/alternatives/whatsapp` is 170 words.

**[High] 31 near-empty tag pages are indexable**
`/blog/tag/*` and `/ru/blog/tag/*` average ~65 words and exist to list 1–2 posts each. Nine EN tags are semantic duplicates of each other (`serverless` / `serverless-messaging` / `serverless-messenger`; `private-messenger` / `private-messaging` / `encrypted-messenger` / `encrypted-chat`). All are in the sitemap at full crawl priority.
*Fix:* `noindex, follow` the tag archives, or consolidate to ~6 tags with real intro copy.

**[High] Head-term cannibalization**
Three pages compete for the same query cluster:
- `/best-private-messaging-apps` — 786w
- `/blog/best-private-messenger-2026` — 1515w
- `/guides/most-private-messaging-app-2026` — 273w

Title-overlap analysis also flags `/blog/privamesh-vs-simplex` ↔ `/alternatives/simplex`, `/blog/privamesh-vs-whatsapp` ↔ `/alternatives/whatsapp`, `/blog/privamesh-vs-threema` ↔ `/alternatives/threema`, and `/` ↔ `/privacy` (Jaccard 0.60).
*Fix:* pick one canonical target per cluster; convert the others into supporting pages that link up to it.

**[Medium] `/news` is 26 words** with 4 H2s and no items — an empty shell in the sitemap.

**[Medium] Weak sitewide E-E-A-T surface** — `/about` is 353 words, no named team, no external corroboration. For a privacy/crypto product this is the trust-critical page; only 2 external domains are linked sitewide (github.com ×381, x.com ×95).

---

## On-Page SEO — 76/100

### What works
- 94/94 titles present, **0 duplicates**.
- 94/94 meta descriptions present, **0 duplicates**.
- 94/94 H1 present.
- Internal linking is healthy: 2191 unique internal edges, **0 orphan pages**.

### Findings

**[Medium] 30 titles exceed 60 characters** — worst offenders:
| Len | URL |
|---|---|
| 80 | `/ru/blog/privamesh-vs-simplex` |
| 78 | `/ru/blog/why-a-messenger-with-servers-can-never-be-fully-private` |
| 73 | `/blog/privamesh-vs-threema` |
| 72 | `/ru/blog/privamesh-vs-threema` |
| 72 | `/glossary/end-to-end-encryption` |
| 71 | `/ru/blog/best-private-messenger-2026` |

The `%s · PrivaMesh` template in [app/layout.tsx:29](app/layout.tsx#L29) adds 12 characters. Drop the suffix on long-titled routes.

**[Medium] Grammar error in the glossary title template** — "What is **a** End-to-end encryption (E2EE)?", "What is **a** Metadata (in messaging)?". Article/noun agreement is broken by a hardcoded `a`.

**[Medium] 6 pages render duplicate H1s** — identical text twice on `/blog/best-private-messenger-2026`, `/blog/privamesh-vs-threema`, `/blog/privamesh-vs-simplex` and their RU counterparts. Likely both a page-header component and an MDX `# heading`.

**[Medium] 12 commercial pages have only 1 inbound internal link**
`/alternatives/imessage`, `/alternatives/wickr`, and all 10 `/guides/*` pages are reachable from their hub only. Contrast with the 41 pages at ≤2 inbound, of which 29 are tag pages.

**[Low] 3 meta descriptions over 160 chars** (`/terms` 162, `/best-private-messaging-apps` 164, `/ru/blog/why-a-messenger…` 174).
**[Low] 6 RU tag descriptions under 70 chars**, all built from the same `Статьи про {tag} - ...` template.

---

## Schema / Structured Data — 88/100

### What works
Sitewide and richly implemented — 0 pages without JSON-LD, 0 parse errors.

| Type | Pages |
|---|---|
| Organization | 94 |
| WebSite | 94 |
| BreadcrumbList / ListItem | 92 |
| ItemList | 42 |
| FAQPage / Question / Answer | 14 |
| Article + Person | 12 |
| DefinedTerm | 8 |
| SoftwareApplication + Offer + UnitPriceSpecification | 2 |

### Findings

**[Medium] FAQPage on only 14 of 94 pages** — absent from all 5 `/features/*`, all 11 `/guides/*`, all 9 `/alternatives/*`, and all 3 `/compare/*`. These are exactly the pages where FAQ blocks earn AI Overview and PAA placement.

**[Low] 2 pages missing BreadcrumbList** (of 94).

**[Low] `SoftwareApplication` on only 2 pages** — the app entity should appear on the home page and every feature page, not just two.

**[Low] `DefinedTerm` present but no `DefinedTermSet`** linking the 8 glossary entries into one vocabulary.

---

## Performance — 78/100 (low confidence)

### Measured (server-side)
- Median TTFB across 94 pages: **74 ms**; slowest: home at 280 ms.
- Median HTML payload: **53 KB**; home: **156 KB** (largest on the site).
- `x-nextjs-cache: HIT`, `s-maxage=31536000, stale-while-revalidate` — full-page edge caching working.
- HTTP/2 with `alt-svc: h3` advertised.

### Findings

**[Medium] Home page HTML is 156 KB** — nearly 3× the site median, and it's the page carrying `NetworkBackground` (an animated canvas that the recent commit `32440a1` made run continuously during scroll). Canvas animation on the LCP page is the most likely INP/CLS risk on the site.

**[Info] No field or lab CWV data collected** — see Limitations. LCP, INP, and CLS are unmeasured; the 78 is inferred from payload and TTFB only.

---

## Images — 82/100

### What works
- 211 `<img>` elements across 94 pages.
- **0 missing `alt`**, **0 empty `alt`** — full accessibility coverage.
- **0 missing `width`/`height`** — CLS from images is structurally prevented.
- Image sitemap present with descriptive `<image:title>` and `<image:caption>` per screenshot.

### Findings

**[High] 70 of 94 pages have no `og:image`, yet all 94 declare `twitter:card=summary_large_image`**
Verified on `/features/no-servers`: `og:title`, `og:description`, `og:url`, `twitter:card` all present — no `og:image`, no `twitter:image`.
Next's file-convention `opengraph-image.tsx` exists at only 5 segments: `app/`, `app/blog/[slug]/`, `app/compare/[slug]/`, `app/alternatives/[slug]/`, `app/ru/blog/[slug]/`. It does not cascade to sibling segments, so `/features/*`, `/guides/*`, `/glossary/*`, `/blog/tag/*`, `/about`, `/news`, `/privacy`, `/terms`, and both `/blog` indexes ship cardless.

**[Low] 5 images have no `loading` attribute** (of 211).

---

## AI Search Readiness — 72/100

### What works
- **Every AI crawler tested returns 200**: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, bingbot. `robots.txt` blocks none of them.
- Bing verification token (`msvalidate.01`) hardcoded in the layout — Copilot/DuckDuckGo indexing path is live.
- 14 FAQPage blocks + 8 DefinedTerm glossary entries = directly citable Q&A and definition passages.
- Comparison pages (`vs Signal`, `vs Telegram`, `vs Session`, `vs Threema`, `vs SimpleX`, `vs WhatsApp`) match how users actually prompt LLMs.

### Findings

**[Medium] No `llms.txt`** (404).
**[Medium] Thin passages limit citability** — LLMs cite self-contained passages; 63 pages don't have enough substance to form one.
**[Medium] Almost no external corroboration** — only github.com and x.com are linked sitewide. No citations to the cryptographic primitives claimed (X3DH, Double Ratchet, BIP-39), no third-party coverage, no audit references. Weak grounding for a "trust math, not companies" claim.

---

## Limitations

- **`claude-seo` toolchain unavailable.** The skill's helper scripts (`render_page.py`, `google_report.py`, `drift_history.py`, `google_auth.py`, `backlinks_auth.py`) require Python ≥3.10. This machine has Python 3.9.6 only, with no Homebrew. All analysis above was performed inline with `curl` + a custom Node crawler.
- **No Core Web Vitals.** No Chrome and no Playwright browsers installed → no Lighthouse, no field data, no screenshots. LCP/INP/CLS are unmeasured.
- **No PDF report.** `google_report.py` shares the Python 3.10 requirement.
- **No third-party data.** Google (CrUX/GSC/GA4), DataForSEO, Moz, and Bing Webmaster credentials were not detected, so no indexation status, ranking, traffic, or backlink data is included.
- Analysis is based on server-rendered HTML. Next.js SSR was confirmed (home ships 848 words of body text in the raw response), so JS-rendering risk is low.
