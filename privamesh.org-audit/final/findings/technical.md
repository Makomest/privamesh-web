# Technical SEO — 96/100 (was 88)

**Weight:** 22%

## What works

- lang correct on both locales; hreflang reciprocal across all four endpoints
- 63/63 canonical self-referencing; 0 redirects, 0 orphans, 0 non-200s; real 404s
- Sitemap at 50 URLs — tag archives and empty /news excluded, matching their noindex
- Content-Security-Policy set with an explicit host allowlist for analytics beacons
- poweredByHeader: false — framework no longer advertised
- HSTS preload, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, all app-level
- 301 from the retired /guides/most-private-messaging-app-2026 to the page that owns that query
- x-nextjs-cache: HIT — static generation intact through three refactors
- /llms.txt serves 200 as text/plain

## Findings

### [Low] 404 page ships without a stylesheet link

Next 14 renders the not-found boundary outside every layout when an app has two root layouts. Status 404 and noindex are intact and not-found.tsx rebuilds the chrome and fonts, but CSS arrives via the client chunk.

**Fix:** Accept. The proper fix is migrating to app/[locale]/ with a middleware rewrite — a large change for a Low finding.

### [Info] Lighthouse best-practices 96, not 100

The only failing audit is a console error from the Cloudflare beacon being blocked by CORS on localhost. A local artifact; does not occur on the real origin.

**Fix:** No action.
