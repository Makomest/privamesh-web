# Action Plan — privamesh.org (build `d31a88c`)

Score **82/100**, from 71 → 75 → 82. Everything fixable by configuration is done.

---

## Phase 0 — Deploy (now)

### 1. Ship the three commits
`cbf997f`, `045e584`, `d31a88c` are on GitHub and not on the server. Live still serves `lang="en"` on 25 Russian pages, 94 sitemap URLs, no `og:image` on 70 pages, and no `/llms.txt`. **Seven points of score are sitting in the repo.**
```bash
cd ~/privamesh && git pull && npm ci && npm run build && pm2 reload privamesh
```
**Effort:** S

### 2. Verify after deploy
```bash
curl -s https://privamesh.org/ru | grep -o '<html lang="[a-z]*"'      # lang="ru"
curl -s https://privamesh.org/sitemap.xml | grep -c '<loc>'            # 94 -> 63
curl -s https://privamesh.org/llms.txt -o /dev/null -w '%{http_code}'  # 200
curl -s https://privamesh.org/alternatives/wickr | grep -c 'Switch to' # >0
```
Expect Search Console to report the 31 tag archives as deindexed over the following weeks. That is the fix working.
**Effort:** S

### 3. Re-check the 6 duplicate-H1 posts against live
`best-private-messenger-2026`, `privamesh-vs-threema`, `privamesh-vs-simplex` in both locales. They are not in the repo, so no local audit has been able to confirm the fix.
**Effort:** S

---

## Phase 1 — The last thin cluster (Week 1)

### 4. Rewrite the 10 `/guides/*` pages — High
218–273 words each. They already have FAQ blocks and FAQPage schema, so the structure is there and only the body is thin. The `/alternatives/*` template maps directly: a fair framing of the problem, a concrete "how PrivaMesh does it", a comparison or decision table, and who-this-is-not-for. Target 600+.
**Impact:** largest single lever remaining — roughly +6 on Content.
**Effort:** L

### 5. Resolve the head-term cannibalization — High
`/best-private-messaging-apps` (786w) vs `/guides/most-private-messaging-app-2026` (273w) target the same query. Editorial decision, not a code change: pick the canonical target, subordinate or merge the other, and have it link up.
**Effort:** M

### 6. Deepen the 8 glossary pages — Medium
105–152 words. Take each to ~300: a worked example, why it matters to a user, and how PrivaMesh implements it. Add `DefinedTermSet` linking them into one vocabulary while you are in there.
**Effort:** M

---

## Phase 2 — Linking and authority (Weeks 2–3)

### 7. Link the 17 one-inbound pages — Medium
All 10 `/guides/*` and 7 `/glossary/*` detail pages are reachable only from their index. Contextual links inside body copy are worth more than another related-links block, though making the guides index rotate like `/alternatives/*` now does is a cheap start.
**Effort:** M

### 8. Build out E-E-A-T — Medium
Still the weakest signal on the site. Only github.com and x.com are linked sitewide. Cite the X3DH, Double Ratchet and BIP-39 specifications the product is built on, name the people behind it on `/about` (currently 353 words), and link any third-party coverage or review.
**Effort:** M

### 9. Fill or de-index `/news` — Medium
26 words, 4 empty H2s, indexed and in the sitemap.
**Effort:** S

### 10. Emit `SoftwareApplication` sitewide on product pages — Low
Currently on 2 pages; belongs on the home page and every feature page.
**Effort:** S

---

## Phase 3 — Infrastructure (Ongoing)

### 11. Install Python 3.10+ and Chrome
Every audit so far has estimated Performance because no browser is available. This unblocks Lighthouse, real CWV, screenshots, drift baselines and PDF reports.
**Effort:** S

### 12. Measure INP on the home page — Medium
171 KB of HTML, heaviest page on the site, always-on `NetworkBackground` canvas since `32440a1`, and it is the LCP page. Three audits have flagged it; none has measured it.
**Effort:** S once Chrome is installed

### 13. Connect Google Search Console and GA4
Verification tokens are already in the layout metadata. No indexation, ranking or traffic data has been available for any audit.
**Effort:** S

### 14. Add a Content-Security-Policy header; set `poweredByHeader: false` — Medium
Everything else is hardened at the app level.
**Effort:** S

### 15. Decide on the 404 stylesheet flash — Low
Two root layouts means Next renders the not-found boundary outside every layout. Status 404 and `noindex` are intact and the chrome is rebuilt in `not-found.tsx`; only the initial stylesheet link is missing. The proper fix is migrating to `app/[locale]/` with a middleware rewrite — a large change for a Low finding. Recommend accepting it.
**Effort:** S to accept, L to re-architect

### 16. Re-audit against live after Phase 1
Every audit so far has run against a build with 8 fewer blog posts than production.
