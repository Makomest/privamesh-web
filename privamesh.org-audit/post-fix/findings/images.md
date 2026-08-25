# Images — 94/100 (was 82)

**Weight:** 5%

## What works

- og:image + twitter:image on all 51 indexable pages at 1200x630
- 51 distinct OG images — /guides/[slug] and /glossary/[term] render the page's own title
- Per-post blog, compare and alternatives cards untouched
- 149 img elements, 0 missing alt, 0 empty alt, 0 missing width/height

## Findings

### [Info] 12 tag archives have no og:image

Deliberate — they are noindex, follow.

**Fix:** No action.

### [Low] 5 images still have no loading attribute

Of 149 total.

**Fix:** Add loading="lazy" to below-fold images.
