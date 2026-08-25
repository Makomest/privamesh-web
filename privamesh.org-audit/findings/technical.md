# Technical SEO — 74/100

**Weight:** 22%

## What works

- HTTPS with HSTS preload (max-age=63072000, includeSubDomains)
- http:// and www. both resolve to canonical host, no redirect chains
- nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy all set
- robots.txt valid with Host + 2 sitemaps; blocks only /admin and /api/
- Canonical on 94/94 pages, self-referencing, 0 mismatches
- 0 noindex pages, 0 non-200s, 0 orphans across 94 URLs
- 404s return real HTTP 404
- Edge cached (x-nextjs-cache: HIT) behind Caddy, HTTP/3 advertised

## Findings

### [Critical] Russian pages declare English as their language

All 25 /ru* URLs serve <html lang="en">. app/layout.tsx:66 hardcodes lang="en" in the single root layout, so the /ru subtree inherits it.

**Fix:** Add app/ru/layout.tsx setting lang="ru", or restructure to an app/[locale]/ segment.

### [Critical] hreflang non-reciprocal on / and /blog

Verified: /ru emits en/ru/x-default alternates pointing at /; / emits no rel=alternate hreflang at all. Same for /blog vs /ru/blog. The 12 blog posts are correct. The sitemap declares xhtml:link alternates for the home URL, conflicting with page markup.

**Fix:** Pass languages:{en:'/',ru:'/ru'} to pageMetadata() in app/page.tsx and {en:'/blog',ru:'/ru/blog'} in app/blog/page.tsx.

### [Medium] No Content-Security-Policy header

All other security headers present; CSP is the only gap on a privacy-branded site.

**Fix:** Add a CSP header in next.config.mjs or Caddy.

### [Low] x-powered-by: Next.js exposed

Response header discloses the framework.

**Fix:** Set poweredByHeader: false in next.config.mjs.

### [Low] No llms.txt

/llms.txt returns 404.

**Fix:** Publish /llms.txt. Ignored by Google Search, read by some AI crawlers.
