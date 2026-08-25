# Technical SEO — 88/100 (was 74)

**Weight:** 22%

## What works

- lang correct across both locales: 53 en, 10 ru, 0 mismatches
- hreflang reciprocal on every pair, verified on all four endpoints
- Sitemap down to 51 URLs, tag archives removed, no contradiction with their noindex
- 63/63 canonical, self-referencing
- 63/63 pages 200, 0 redirects, 0 orphans, 404s return 404
- Security headers are app-level not proxy-level: HSTS preload, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy
- x-nextjs-cache: HIT — static generation survived the route-group refactor

## Findings

### [Low] 404 page ships without a stylesheet link

New regression. Next 14 renders the not-found boundary outside every layout once an app has more than one root layout. Status is still 404 with noindex and the chrome was rebuilt inside not-found.tsx (nav, footer, font variables), but CSS arrives via the client chunk rather than initial HTML — brief unstyled flash.

**Fix:** Accept, or move to app/[locale]/ with a middleware rewrite to restore a single root layout.

### [Low] /ru/* misses render the English 404

Same root cause — a RU-specific not-found.tsx would never be reached, so it was removed rather than left as dead code.

**Fix:** Accept, or address together with the item above.

### [Medium] Still no Content-Security-Policy header

Every other security header is present at the app level.

**Fix:** Add a CSP header in next.config.mjs or Caddy.

### [Low] x-powered-by: Next.js still exposed

Unchanged from baseline.

**Fix:** Set poweredByHeader: false in next.config.mjs.

### [Low] No llms.txt

Unchanged from baseline.

**Fix:** Publish /llms.txt.
