# Technical SEO — 88/100 (was 88)

**Weight:** 22%

## What works

- lang correct on both locales: 53 en, 10 ru, 0 mismatches
- hreflang reciprocal across all four endpoints in both pairs
- 63/63 canonical, self-referencing, 0 mismatches
- 63/63 pages return 200, 0 redirects, 0 orphans, 404s return a real 404
- Sitemap at 51 URLs with tag archives excluded, matching their noindex
- Security headers all app-level: HSTS preload, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy
- x-nextjs-cache: HIT — static generation intact through two refactors
- /llms.txt serves 200 as text/plain

## Findings

### [Medium] No Content-Security-Policy header

The one missing control on an otherwise hardened privacy-branded site.

**Fix:** Add a CSP header in next.config.mjs or Caddy.

### [Low] x-powered-by: Next.js still exposed

Response header discloses the framework.

**Fix:** Set poweredByHeader: false in next.config.mjs.

### [Low] 404 page ships without a stylesheet link

Next 14 renders the not-found boundary outside every layout when an app has two root layouts. Status 404 and noindex are intact and not-found.tsx rebuilds the chrome, but CSS arrives via the client chunk.

**Fix:** Accept, or migrate to app/[locale]/ with a middleware rewrite — a large change for a Low finding.

### [Low] /ru/* misses render the English 404

Same root cause as above.

**Fix:** Accept, or address with the item above.
