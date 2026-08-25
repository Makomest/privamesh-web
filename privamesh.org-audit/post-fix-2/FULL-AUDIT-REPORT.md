# Full SEO Audit — privamesh.org (build `d31a88c`)

**Date:** 2026-07-26
**Target:** local production build (`next build` + `next start`) at commit `d31a88c`
**Pages crawled:** 63 (51 from sitemap + 12 noindexed tag archives found via internal links)
**Crawl result:** 63 × HTTP 200, 0 redirects, 0 errors, 0 orphans
**Prior audits:** [live baseline, 71/100](../FULL-AUDIT-REPORT.md) · [post-Phase-1, 75/100](../post-fix/FULL-AUDIT-REPORT.md)

> **Still not the live site.** privamesh.org serves the pre-fix build. Three commits — `cbf997f`, `045e584`, `d31a88c` — are pushed to GitHub and undeployed. The real-site score remains 71.

---

## Executive Summary

### SEO Health Score: **82 / 100**

Trajectory: **71 → 75 → 82**

| Category | Score | Δ vs 75 | Weight | Contribution |
|---|---|---|---|---|
| Technical SEO | 88 | — | 22% | 19.4 |
| Content Quality | 64 | +12 | 23% | 14.7 |
| On-Page SEO | 90 | +14 | 20% | 18.0 |
| Schema / Structured Data | 93 | +5 | 10% | 9.3 |
| Performance (CWV) | 78* | — | 10% | 7.8 |
| AI Search Readiness | 84 | +11 | 10% | 8.4 |
| Images | 96 | +2 | 5% | 4.8 |
| **Total** | | **+7** | | **82.4** |

\* Still lab-only — no Chrome, no field data.

Every defect class that can be fixed by configuration is now closed. What remains is one content cluster, one editorial decision, and two infrastructure gaps.

### Verified clean

| Check | Result |
|---|---|
| Titles over 60 chars | **0** (was 30 on live) |
| Duplicate titles | 0 |
| Missing titles / descriptions | 0 / 0 |
| Missing H1 | 0 |
| Multiple H1 | **0** (was 6 on live) |
| Missing canonical | 0 |
| `lang` mismatches | **0** (was 25 on live) |
| Indexable pages without `og:image` | **0** (was 70 on live) |
| Images missing `alt` | 0 of 149 |
| Images missing width/height | 0 of 149 |
| Orphan pages | 0 |
| Non-200 responses | 0 |

### Top 5 remaining issues

1. **10 `/guides/*` pages at 218–273 words** — the last thin commercial cluster, and the largest single lever left.
2. **8 glossary pages at 105–152 words** — thinnest section on the site.
3. **Head-term cannibalization, still unresolved** — `/best-private-messaging-apps` (786w) vs `/guides/most-private-messaging-app-2026` (273w).
4. **E-E-A-T unchanged** — `/about` still 353 words with no named team; only two external domains linked sitewide.
5. **Performance still unmeasured** — the 171 KB home page with its always-on canvas has never had an INP reading.

### Top 5 quick wins

1. **Deploy.** Seven points of score are sitting in GitHub.
2. Fill or de-index `/news` (26 words).
3. Link the 17 pages stuck at 1 inbound link.
4. Add a CSP header and set `poweredByHeader: false`.
5. Install Chrome and take the first real CWV measurement.

---

## Technical SEO — 88/100 (unchanged)

### What works
- `lang` correct on both locales: 53 EN pages `en`, 10 RU pages `ru`, 0 mismatches.
- hreflang reciprocal across all four endpoints in both pairs.
- 63/63 canonical, self-referencing, 0 mismatches.
- 63/63 pages return 200; 0 redirects; 0 orphans; 404s return a real 404.
- Sitemap at 51 URLs with tag archives excluded, matching their `noindex`.
- Security headers all app-level (survive any proxy): HSTS preload, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- `x-nextjs-cache: HIT` — static generation intact through two refactors.
- `/llms.txt` serves 200 as `text/plain`.

### Findings

**[Medium] No Content-Security-Policy header** — the one missing control on an otherwise hardened privacy-branded site.

**[Low] `x-powered-by: Next.js` still exposed** — one line in `next.config.mjs`.

**[Low] 404 page ships without a stylesheet link** — Next 14 renders the not-found boundary outside every layout when an app has two root layouts. Status 404 and `noindex` are intact and `not-found.tsx` rebuilds the chrome, but CSS arrives via the client chunk. Fixing it properly means migrating to `app/[locale]/` with a middleware rewrite — a large change for a Low finding.

**[Low] `/ru/*` misses render the English 404** — same root cause.

---

## Content Quality — 64/100 (was 52)

The `/alternatives/*` rewrite landed: 8 pages went from 170–195 words to 626–679, each with a fair "what they get right" section, a named gap, a six-row comparison table, switch-if/stay-if lists and 4 FAQs. Feature and comparison pages also gained FAQ blocks.

| Metric | Live | Post-Phase-1 | Now |
|---|---|---|---|
| Pages under 300 words | 63 of 94 | 42 of 63 | **34 of 63** |
| Indexable pages under 300 words | — | 30 of 51 | **22 of 51** |
| Median words | 175 | 218 | **260** |

### Findings

**[High] 10 `/guides/*` pages at 218–273 words**
`private-messenger-for-crypto` 218, `decentralized-messaging-app` 220, `encrypted-messaging-app-for-iphone` 230, `messaging-app-that-doesnt-track-you` 231, `blockchain-messaging-app` 232, `serverless-messaging-app` 238, `web3-messaging-app` 239, `anonymous-messaging-app` 265, `most-private-messaging-app-2026` 273, `private-messaging-app-without-phone-number` 378.
These already carry FAQ blocks and FAQPage schema, so the structure exists — only the body copy is thin. The `/alternatives/*` treatment maps onto them directly.

**[High] Head-term cannibalization, unresolved**
`/best-private-messaging-apps` (786w) and `/guides/most-private-messaging-app-2026` (273w) still target the same query. This is an editorial decision, not a code change: pick the canonical target and subordinate the other.

**[Medium] 8 glossary pages at 105–152 words**
`cover-traffic` 105, `serverless-messenger` 114, `end-to-end-encryption` 117, `double-ratchet` 120, `forward-secrecy` 128, `metadata` 135, `bip-39-seed-phrase` 146, `stealth-address` 152. Now the thinnest section on the site.

**[Medium] `/news` still 26 words** — 4 empty H2s, indexed, in the sitemap.

**[Medium] E-E-A-T unchanged** — `/about` 353 words, no named team. Only two external domains linked sitewide: github.com (257 links) and x.com (64). No citations to X3DH, Double Ratchet or BIP-39 specifications despite the site being built on them.

**[Info] Section index pages read thin by word count** — `/blog` 131, `/ru/blog` 132, `/alternatives` 219, `/glossary` 260. These are navigational; the count is expected and not a defect.

---

## On-Page SEO — 90/100 (was 76)

### What works
- **0 titles over 60 characters.** Handled centrally in `pageMetadata()`: a page opts out of the `· PrivaMesh` template when its own title is already long. 23 pages take the opt-out, 40 keep the suffix.
- 63/63 titles present, 0 duplicates.
- 63/63 descriptions present, 0 duplicates.
- **0 pages with multiple H1**, 0 missing H1, 0 heading-level skips.
- Glossary grammar fixed — each term now carries an explicit question, so "What is a Metadata" and "What is a End-to-end encryption" are gone.
- `/alternatives/*` inbound links went from 1–2 to 4–5 each after the related-links block was made cyclic.

### Findings

**[Medium] 17 pages at exactly 1 inbound internal link**
All 10 `/guides/*` and all 7 `/glossary/*` detail pages are reachable only from their own index. Both clusters need contextual cross-links from the blog, feature and comparison pages — the same rotation trick used on `/alternatives/*` would help, but real contextual links inside body copy are worth more.

**[Low] 3 meta descriptions over 160 chars** — `/terms` (162), `/best-private-messaging-apps` (164), `/ru/blog/why-a-messenger…` (174).

**[Info] 4 RU tag descriptions under 70 chars** — all on noindexed pages; no longer actionable.

---

## Schema / Structured Data — 93/100 (was 88)

| Type | Pages |
|---|---|
| Organization | 63 |
| WebSite | 63 |
| BreadcrumbList / ListItem | 61 |
| **FAQPage / Question / Answer** | **38** (was 14) |
| ItemList | 19 |
| DefinedTerm | 8 |
| Article + Person | 4 |
| SoftwareApplication + Offer | 2 |

0 pages without JSON-LD, 0 parse errors.

FAQPage now covers 38 of 51 indexable pages. Every block is backed by visible Q&A on the page — the `PageFaq` component renders the questions and emits the schema from the same array, so the two cannot drift.

### Findings

**[Info] The 13 indexable pages without FAQPage are the right ones** — `/privacy-policy`, `/terms`, `/about`, `/news`, the 4 blog posts and the 5 section indexes. FAQ markup would not be appropriate on any of them.

**[Low] `SoftwareApplication` on only 2 pages** — should appear on the home page and every feature page.
**[Low] No `DefinedTermSet`** linking the 8 glossary entries into one vocabulary.
**[Low] 2 pages missing BreadcrumbList.**

---

## Performance — 78/100 (unchanged, low confidence)

- Median HTML 71 KB; heaviest `/` at **171 KB**, then `/best-private-messaging-apps` 122 KB and `/compare/privamesh-vs-signal` 111 KB.
- `x-nextjs-cache: HIT` — full static generation.
- TTFB not meaningful on localhost.

**[Medium] Home page still 171 KB with an always-on canvas** — untouched by any of the three commits. `NetworkBackground` runs continuously during scroll since `32440a1`, and this is the LCP page.

**[Info] No LCP/INP/CLS measurement exists** — no Chrome installed. This category has been an estimate in all three audits.

---

## Images — 96/100 (was 94)

- 149 `<img>`; **0 missing alt, 0 empty alt, 0 missing width/height**.
- `og:image` + `twitter:image` on **all 51 indexable pages** at 1200×630.
- Per-section OG cards; `/guides/[slug]` and `/glossary/[term]` render the page's own title.
- Image sitemap with descriptive titles and captions.

**[Info] 12 tag archives have no `og:image`** — deliberate, they are noindexed.
**[Info] The 5 images without `loading` are `priority` hero images** (`ScreenshotGallery.tsx:32`, `i < 3`) — correct for above-fold LCP images. This was a false positive in the first audit.

---

## AI Search Readiness — 84/100 (was 73)

### What works
- `/llms.txt` live, generated from the same data as the sitemap so new posts, guides and glossary terms appear automatically. Declares pre-launch status and the absence of App Store ratings, so answer engines cannot invent one.
- **38 FAQPage blocks** — a large, directly citable Q&A surface.
- The rewritten `/alternatives/*` pages answer comparison questions the way people actually prompt LLMs, and concede when a competitor is the better choice — the kind of passage models prefer to cite.
- All AI crawlers unblocked; Bing verification wired in.
- RU content declares Russian, so locale attribution is correct.

### Findings

**[Medium] Only two external domains linked sitewide** — github.com and x.com. No citations to the X3DH, Double Ratchet or BIP-39 specifications the product is built on, no third-party coverage, no security audit. This is the weakest remaining grounding signal for a "trust math, not companies" claim.

**[Medium] Thin passages remain on guides and glossary** — 18 pages still lack a self-contained citable passage.

---

## Limitations

- **Local build, not production.** No Caddy, no HTTP/3, no edge cache, no real latency. Security headers were confirmed app-level so they carry over; timing numbers do not.
- **4 EN and 4 RU blog posts exist only on the live server** (created through `/admin`), so content and internal-link figures understate the real site. The 6 duplicate-H1 pages flagged in the first audit are among them and still cannot be re-checked — verify after deploying.
- **`claude-seo` toolchain unavailable** — Python 3.9.6, no Homebrew. No Lighthouse, no screenshots, no PDF report.
- **No third-party data** — no Google, DataForSEO, Moz or Bing credentials, so no indexation, ranking, traffic or backlink data in any of the three audits.
