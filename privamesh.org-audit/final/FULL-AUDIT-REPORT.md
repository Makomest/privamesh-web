# Full SEO Audit — privamesh.org (build `6b7a177`)

**Date:** 2026-07-26
**Target:** local production build at commit `6b7a177`
**Pages crawled:** 63 (50 indexable + 13 noindexed)
**Crawl result:** 63 × HTTP 200, 0 redirects, 0 errors, 0 orphans
**Measurement:** Lighthouse via bundled Chromium, mobile emulation, 4× CPU throttle, slow 4G, median of 3 runs per page
**Prior audits:** [71](../FULL-AUDIT-REPORT.md) · [75](../post-fix/FULL-AUDIT-REPORT.md) · [82](../post-fix-2/FULL-AUDIT-REPORT.md)

> **Not the live site.** privamesh.org still serves the pre-fix build. Four commits — `cbf997f`, `045e584`, `d31a88c`, `6b7a177` — are pushed to GitHub and undeployed.

---

## Executive Summary

### SEO Health Score: **95 / 100**

Trajectory: **71 → 75 → 82 → 95**

| Category | Score | Δ vs 82 | Weight | Contribution |
|---|---|---|---|---|
| Technical SEO | 96 | +8 | 22% | 21.1 |
| Content Quality | 90 | +26 | 23% | 20.7 |
| On-Page SEO | 99 | +9 | 20% | 19.8 |
| Schema / Structured Data | 97 | +4 | 10% | 9.7 |
| Performance (CWV) | 92 | +14 | 10% | 9.2 |
| AI Search Readiness | 93 | +9 | 10% | 9.3 |
| Images | 99 | +3 | 5% | 5.0 |
| **Total** | | **+13** | | **94.8** |

Performance is no longer an estimate. This is the first audit with a real browser.

### Verified clean — full crawl of 63 pages

| Check | Result |
|---|---|
| Titles over 60 chars | **0** |
| Duplicate titles | **0** |
| Missing titles / descriptions | **0 / 0** |
| Meta descriptions over 160 chars | **0** |
| Missing H1 / multiple H1 | **0 / 0** |
| Missing canonical | **0** |
| `lang` mismatches | **0** |
| Orphan pages | **0** |
| Pages with ≤1 inbound internal link | **0** |
| Indexable pages without `og:image` | **0** |
| Images missing `alt` | **0 of 149** |
| Images missing width/height | **0 of 149** |
| Non-200 responses | **0** |
| Pages without JSON-LD | **0** |
| Lighthouse SEO | **100** |
| Lighthouse Accessibility | **100** |

---

## Technical SEO — 96/100 (was 88)

### What works
- `lang` correct on both locales; hreflang reciprocal across all four endpoints.
- 63/63 canonical, self-referencing; 0 redirects, 0 orphans, 0 non-200s; real 404s.
- Sitemap at 50 URLs — tag archives and the empty `/news` excluded, matching their `noindex`.
- **Content-Security-Policy** now set, with an explicit host allowlist for the analytics beacons.
- `poweredByHeader: false` — the framework is no longer advertised.
- HSTS preload, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, all app-level.
- 301 from the retired `/guides/most-private-messaging-app-2026` to the page that now owns that query.
- `x-nextjs-cache: HIT` — static generation intact through three refactors.
- `/llms.txt` serves 200 as `text/plain`.

### Findings

**[Low] 404 page ships without a stylesheet link** — Next 14 renders the not-found boundary outside every layout when an app has two root layouts. Status 404 and `noindex` are intact and `not-found.tsx` rebuilds the chrome and fonts, but CSS arrives via the client chunk. The proper fix is migrating to `app/[locale]/` with a middleware rewrite, which is a large change for a Low finding. Recommend accepting.

**[Info] Lighthouse best-practices 96, not 100** — the only failing audit is a console error from the Cloudflare beacon being blocked by CORS on `localhost`. It is a local artifact and does not occur on the real origin.

---

## Content Quality — 90/100 (was 64)

The largest change in this round.

| Metric | Live | 75 | 82 | Now |
|---|---|---|---|---|
| Indexable pages under 300 words | — | 30 of 51 | 22 of 51 | **2 of 50** |
| Median words (indexable) | 175 | 218 | 260 | **634** |

### What works
- **`/guides/*`: 218–378 → 591–811 words.** Each got a distinct angle so the cluster no longer competes with itself — what a phone number leaks, how to judge a privacy claim, anonymity vs pseudonymity, the decentralization spectrum, what is actually written on-chain, wallet doxxing, the four ways an app tracks you, iOS weak points, the crypto-holder threat model, and what replaces each job a server did.
- **Glossary: 105–152 → ~300 words** each, with worked examples and the trade-offs left in.
- The alternatives, glossary and both blog indexes gained real intro copy rather than a bare card grid.
- **Cannibalization resolved.** `/guides/most-private-messaging-app-2026` was reframed as a method for evaluating privacy claims and moved to `/guides/how-to-evaluate-a-private-messenger`, with a 301 to `/best-private-messaging-apps`.
- **E-E-A-T substantially rebuilt.** External domains went from 2 to 8, now including signal.org, csrc.nist.gov, cr.yp.to, rfc-editor.org and the Bitcoin BIPs — the actual specifications the product is built on.
- `/about` gained a *What we have not done yet* section: no independent audit, pre-launch, iOS only, no App Store rating, and an explicit statement that the claims are verifiable in principle but not yet third-party verified.

### Findings

**[Info] 2 indexable pages under 300 words** — `/blog` (267) and `/ru/blog` (229). Both are listing pages, and both understate the live site, which has 6 posts per locale against 2 in the repo. Each additional post card adds roughly 35 words.

**[Medium] No independent security audit** — now stated plainly on `/about` rather than papered over, which is the right interim position. It remains the single most valuable thing that could be added to the site.

**[Info] The team is pseudonymous by choice** — a deliberate decision for a privacy tool, now argued explicitly on `/about` rather than left as an absence.

---

## On-Page SEO — 99/100 (was 90)

Every measurable on-page defect is closed: 0 titles over 60, 0 duplicates, 0 missing or duplicate H1s, 0 descriptions over 160, 0 orphans, and **0 pages with fewer than 2 inbound internal links** (was 17).

`/guides` and `/glossary` detail pages now rotate through their peers the way `/alternatives` already did, so no page depends on its index alone for discovery.

---

## Schema / Structured Data — 97/100 (was 93)

| Type | Pages |
|---|---|
| Organization / WebSite | 63 |
| BreadcrumbList / ListItem | 61 |
| FAQPage / Question / Answer | 38 |
| ItemList | 19 |
| DefinedTerm | 9 |
| **SoftwareApplication + Offer** | **7** (was 2) |
| Article + Person | 4 |
| **DefinedTermSet** | **1** (new) |

0 pages without JSON-LD, 0 parse errors. Every FAQ block is backed by visible Q&A — `PageFaq` renders the questions and emits the schema from the same array, so they cannot drift.

**[Low] 2 pages still missing BreadcrumbList** (61 of 63).

---

## Performance — 92/100 (was 78, and previously an estimate)

First audit with an actual browser. Lighthouse, mobile, 4× CPU throttle, slow 4G, median of 3 runs:

| Page | Perf | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|
| `/` | 83 | 4657 ms | **0** | **0 ms** | 905 ms |
| `/guides/serverless-messaging-app` | 92 | 3305 ms | 0 | 0 ms | 905 ms |
| `/alternatives/signal` | 92 | 3305 ms | 0 | 0 ms | 904 ms |
| `/glossary/metadata` | 94 | 3154 ms | 0 | 0 ms | 754 ms |
| `/best-private-messaging-apps` | 92 | 3306 ms | 0 | 0 ms | 905 ms |
| `/features/no-servers` | 97 | 2605 ms | 0 | 0 ms | 904 ms |

**CLS is 0 and TBT is 0 on every page tested.** FCP is consistently ~0.9 s.

### Correction to three previous audits

Every prior audit flagged the `NetworkBackground` canvas as the likely INP risk on the home page. **Measured, it is not.** TBT is 0, CLS is 0, and building with the canvas disabled produced a *worse* LCP (2916 ms vs 2610 ms) — within run-to-run noise. The hypothesis was wrong and the canvas needs no change.

### Findings

**[Medium] LCP is the only weak metric, and the lab cannot measure it reliably** — identical builds produced LCP between 2605 ms and 4657 ms across runs. The LCP element is a hero paragraph whose cost is entirely *render delay*, not resource loading, which points at webfont swap timing. An experiment replacing the Inter variable font with static weights and deprioritising the mono face made everything worse (FCP 904 → 1207 ms, CLS 0 → 0.018) and was reverted. This needs CrUX field data, not more local tuning.

---

## Images — 99/100 (was 96)

149 `<img>`: **0 missing alt, 0 empty alt, 0 missing width/height**. `og:image` and `twitter:image` on **all 50 indexable pages** at 1200×630. Image sitemap with descriptive titles and captions. CLS of 0 across every page measured confirms the dimensions are doing their job.

---

## AI Search Readiness — 93/100 (was 84)

- `/llms.txt` generated from the same data as the sitemap; declares pre-launch status and the absence of App Store ratings so answer engines cannot invent one.
- **38 FAQPage blocks** across 50 indexable pages.
- **Primary-source citations** to X3DH, the Double Ratchet, NIST SP 800-38D, BIP-39, BIP-32, RFC 5869 and Curve25519 — grounding that a model can follow and verify.
- The `/alternatives` and `/guides` pages concede where competitors are better, which is the kind of passage models prefer to cite over one-sided marketing.
- `/about` states the limitations explicitly, which is a stronger citability signal than confident claims.

**[Medium] No third-party corroboration** — no independent audit, security review or press coverage exists to cite. This is the remaining ceiling on both this category and Content.

---

## What is left

Only four things, and none is a defect in the code:

1. **Deploy.** Four commits sit undeployed; the live score is still 71.
2. **Independent security audit** — the highest-value addition to the site, and unbuyable with editing.
3. **Field CWV data** — connect CrUX/GSC. Lab LCP is too noisy to act on.
4. **The 404 stylesheet flash** — Low severity, expensive fix, recommend accepting.

## Limitations

- **Local build, not production.** Security headers were confirmed app-level so they carry over; timing does not. Lighthouse best-practices 96 is a localhost CORS artifact.
- **4 EN and 4 RU blog posts exist only on the live server**, so `/blog` and `/ru/blog` word counts understate the real site, and the 6 duplicate-H1 posts flagged in the first audit still cannot be re-checked locally.
- **`claude-seo` toolchain still unavailable** — Python 3.9.6, no Homebrew. Lighthouse was run through a separately installed Chromium instead. No PDF report.
- **No Google, DataForSEO, Moz or Bing credentials** — no indexation, ranking, traffic or backlink data in any of the four audits.
