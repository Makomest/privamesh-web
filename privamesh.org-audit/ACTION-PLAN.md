# Action Plan — privamesh.org

Ordered by impact ÷ effort. Score today: **71/100**.

---

## Phase 1 — Critical Fixes (Week 1)

### 1. Fix `lang` on the Russian subtree — Critical
25 pages serve Russian content as `<html lang="en">`.
**Where:** [app/layout.tsx:66](app/layout.tsx#L66)
**Do:** add `app/ru/layout.tsx` that sets `lang="ru"`, or restructure to an `app/[locale]/` segment.
**Effort:** S

### 2. Restore hreflang reciprocity — Critical
`/ru` and `/ru/blog` point at `/` and `/blog`; those EN pages emit no alternates back, so Google drops the cluster.
**Where:** `app/page.tsx`, `app/blog/page.tsx` — pass `languages` into `pageMetadata()` ([lib/seo.ts:41](lib/seo.ts#L41) already builds them, including `x-default`).
**Do:**
```ts
// app/page.tsx
languages: { en: '/', ru: '/ru' }
// app/blog/page.tsx
languages: { en: '/blog', ru: '/ru/blog' }
```
**Effort:** S — the 12 blog posts already do this correctly; copy the pattern.

### 3. Add `og:image` to the 70 pages missing it — High
All 94 pages declare `twitter:card=summary_large_image` but only 24 have an image.
**Do:** add `opengraph-image.tsx` at `app/features/`, `app/guides/`, `app/alternatives/`, `app/glossary/`, `app/blog/tag/`, `app/blog/`, `app/ru/blog/` — or set an explicit default `openGraph.images` in `pageMetadata()` so no route can ship cardless.
**Effort:** M — the second option is one edit to `lib/seo.ts` and covers every future page.

### 4. De-index the tag archives — High
31 tag pages average ~65 words; nine are semantic duplicates of each other.
**Do:** `robots: { index: false, follow: true }` on `/blog/tag/*` and `/ru/blog/tag/*`, and drop them from `app/sitemap.ts`. Or consolidate to ~6 tags with 150+ words of intro copy each.
**Effort:** S

---

## Phase 2 — High-Impact Improvements (Weeks 2–3)

### 5. Resolve the head-term cannibalization — High
`/best-private-messaging-apps` (786w), `/blog/best-private-messenger-2026` (1515w), `/guides/most-private-messaging-app-2026` (273w) all chase the same query.
**Do:** designate `/best-private-messaging-apps` the canonical commercial target. Rewrite the guide as a narrow long-tail page or 301 it into the main one. Have the blog post link up rather than compete.
Same treatment for `/blog/privamesh-vs-{simplex,whatsapp,threema}` vs `/alternatives/{simplex,whatsapp,threema}`.
**Effort:** M

### 6. Expand the 9 `/alternatives/*` pages — High
183 words average on the site's commercial-intent pages. Target 600+: a feature-by-feature table, a "who should switch / who shouldn't" section, and a 4–5 question FAQ block.
**Effort:** L

### 7. Expand the 11 `/guides/*` pages — High
262 words average. Same target and structure as above.
**Effort:** L

### 8. Trim the 30 over-length titles — Medium
Drop the `· PrivaMesh` suffix on routes whose own title already exceeds ~48 chars. Worst: `/ru/blog/privamesh-vs-simplex` at 80 chars.
**Where:** template at [app/layout.tsx:29](app/layout.tsx#L29)
**Effort:** S

### 9. Fix the glossary title grammar — Medium
"What is **a** End-to-end encryption", "What is **a** Metadata" — hardcoded article. Drop the article or make it agree.
**Effort:** S

### 10. Remove the duplicate H1s — Medium
6 pages render their H1 twice (3 EN blog posts + 3 RU). Likely a page-header component plus an MDX `#` heading.
**Effort:** S

---

## Phase 3 — Content & Authority (Month 2)

### 11. Add FAQPage schema to the 28 money pages — Medium
Currently on 14 of 94; absent from every `/features/*`, `/guides/*`, `/alternatives/*`, `/compare/*`.
**Effort:** M

### 12. Strengthen internal linking to the 12 one-inbound pages — Medium
All 10 `/guides/*` plus `/alternatives/imessage` and `/alternatives/wickr` are reachable only from their hub. Add contextual cross-links from the blog posts and comparison pages.
**Effort:** M

### 13. Build out E-E-A-T — Medium
`/about` is 353 words with no named team. Add named authors with credentials, link the cryptographic primitives to their specifications (X3DH, Double Ratchet, BIP-39), and cite any third-party review. Only github.com and x.com are linked off-site today.
**Effort:** M

### 14. Fill or remove `/news` — Medium
26 words, 4 empty H2s, indexed and in the sitemap.
**Effort:** S

### 15. Deepen the 9 glossary pages — Low
142 words average. Take each to ~300 and add `DefinedTermSet` linking them into one vocabulary.
**Effort:** M

### 16. Publish `/llms.txt` — Low
Currently 404. All AI crawlers already get 200s, so this is incremental.
**Effort:** S

---

## Phase 4 — Monitoring & Iteration (Ongoing)

### 17. Install Python 3.10+ and Chrome — infrastructure
Unblocks the full `claude-seo` toolchain: Lighthouse/CWV measurement, screenshots, drift baselines, PDF reports.
**Effort:** S

### 18. Measure Core Web Vitals on the home page — Medium
156 KB of HTML (3× site median) plus a continuously-running canvas animation (`NetworkBackground`, commit `32440a1`) on the LCP page. Unmeasured today; the most likely INP risk on the site.

### 19. Connect Google Search Console + GA4
No indexation, ranking, or traffic data was available for this audit. Verification tokens are already wired in the layout — finish the connection.

### 20. Add a Content-Security-Policy header — Medium
Every other security header is present (HSTS preload, nosniff, frame-options, referrer-policy, permissions-policy). CSP is the one gap, and reputationally it matters on a privacy-branded site. Also set `poweredByHeader: false` to drop `x-powered-by: Next.js`.

### 21. Establish a drift baseline
Re-crawl monthly and diff titles, canonicals, hreflang, and schema coverage against this audit.
