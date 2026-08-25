# Action Plan — privamesh.org (post-fix)

Score: **75/100**, up from 71. Phase 1 is done and verified; everything below is what's left.

---

## Phase 0 — Ship what's built (now)

### 1. Deploy the Phase 1 work
All four fixes are verified in the local production build but **uncommitted and undeployed**. Live still serves `lang="en"` on 25 Russian pages, 94 sitemap URLs including 31 tag archives, and no `og:image` on 70 pages. Until this ships, the score on the real site is still 71.
**Effort:** S

### 2. Decide on the 404 stylesheet regression — Low
The two-root-layout change means Next renders the not-found boundary outside every layout, so the 404 ships without a `<link rel="stylesheet">` and flashes unstyled before the client chunk loads. Status, `noindex` and all the chrome are intact, so there is no SEO cost.
Options: accept it; or move to `app/[locale]/` with a middleware rewrite, which restores a single root layout at the cost of touching every route.
**Effort:** S to accept, L to re-architect

---

## Phase 2 — High-Impact Improvements (Weeks 1–2)

### 3. Expand the 8 `/alternatives/*` pages — High
178 words average on commercial-intent pages. Target 600+: feature-by-feature table, a "who should switch / who shouldn't" section, 4–5 question FAQ.
**Effort:** L

### 4. Expand the 10 `/guides/*` pages — High
264 words average. Same target and structure.
**Effort:** L

### 5. Resolve head-term cannibalization — High
`/best-private-messaging-apps` (786w) vs `/guides/most-private-messaging-app-2026` (273w), and `/alternatives/{threema,simplex,whatsapp}` vs their blog counterparts. Pick one canonical target per cluster; the rest link up to it.
**Effort:** M

### 6. Trim the 22 over-length titles — Medium
Drop the `· PrivaMesh` suffix on routes whose own title already exceeds ~48 chars. Worst: `/ru/blog/why-a-messenger-with-servers-can-never-be-fully-private` (78), `/glossary/end-to-end-encryption` (72).
**Effort:** S

### 7. Fix the glossary title grammar — Medium
"What is **a** End-to-end encryption", "What is **a** Metadata". Drop the article or make it agree.
**Effort:** S

### 8. Re-check the duplicate H1s against live — Medium
0 found in this build, but the 6 affected posts aren't in the local content directory. Verify on production after deploying.
**Effort:** S

---

## Phase 3 — Content & Authority (Month 1–2)

### 9. Add FAQPage schema to the 25 money pages — Medium
Still on 14 of 63; absent from every `/features/*`, `/guides/*`, `/alternatives/*`, `/compare/*`.
**Effort:** M

### 10. Link the 19 one-inbound pages — Medium
All 10 `/guides/*`, all 7 `/glossary/*` detail pages, `/alternatives/imessage`, `/alternatives/wickr`. Add contextual cross-links from blog posts and comparison pages.
**Effort:** M

### 11. Build out E-E-A-T — Medium
`/about` 353 words, no named team. Only github.com and x.com linked sitewide. Add named authors with credentials, cite X3DH / Double Ratchet / BIP-39 specifications, link third-party coverage.
**Effort:** M

### 12. Fill or de-index `/news` — Medium
26 words, 4 empty H2s, still indexed and in the sitemap.
**Effort:** S

### 13. Deepen the 8 glossary pages — Low
128 words average. Take to ~300 and add `DefinedTermSet`.
**Effort:** M

### 14. Publish `/llms.txt` — Low
**Effort:** S

---

## Phase 4 — Monitoring & Iteration (Ongoing)

### 15. Install Python 3.10+ and Chrome
Unblocks Lighthouse/CWV, screenshots, drift baselines and PDF reports. Every audit so far has run without them.

### 16. Measure INP on the home page
171 KB of HTML, heaviest page on the site, plus the always-on `NetworkBackground` canvas. Untouched by Phase 1 and still unmeasured.

### 17. Connect Google Search Console + GA4
Verification tokens are already in the layout metadata.

### 18. Add a Content-Security-Policy header; set `poweredByHeader: false`
Everything else is already hardened at the app level.

### 19. Re-audit after deploy
This audit ran against a build with 8 fewer blog posts than production. Re-run against live once Phase 1 ships to get true content and internal-link numbers.
