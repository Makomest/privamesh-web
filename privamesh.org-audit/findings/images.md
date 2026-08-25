# Images — 82/100

**Weight:** 5%

## What works

- 211 img elements, 0 missing alt, 0 empty alt
- 0 images missing width/height — CLS from images structurally prevented
- Image sitemap with descriptive image:title and image:caption per screenshot

## Findings

### [High] 70 of 94 pages have no og:image

All 94 pages declare twitter:card=summary_large_image. Verified on /features/no-servers: og:title, og:description, og:url and twitter:card present, no og:image or twitter:image. Next's opengraph-image.tsx exists at only 5 segments (app/, blog/[slug], compare/[slug], alternatives/[slug], ru/blog/[slug]) and does not cascade to siblings, so /features/*, /guides/*, /glossary/*, /blog/tag/*, /about, /news, /privacy, /terms and both blog indexes ship cardless.

**Fix:** Add segment-level opengraph-image.tsx, or set a default openGraph.images in lib/seo.ts so no route can ship without one.

### [Low] 5 images have no loading attribute

Of 211 total.

**Fix:** Add loading="lazy" to below-fold images.
