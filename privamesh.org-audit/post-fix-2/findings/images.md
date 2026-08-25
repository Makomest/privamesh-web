# Images — 96/100 (was 94)

**Weight:** 5%

## What works

- 149 img elements: 0 missing alt, 0 empty alt, 0 missing width/height
- og:image + twitter:image on all 51 indexable pages at 1200x630
- Per-section OG cards; /guides/[slug] and /glossary/[term] render the page's own title
- Image sitemap with descriptive titles and captions

## Findings

### [Info] 12 tag archives have no og:image

Deliberate — they are noindexed.

**Fix:** No action.

### [Info] The 5 images without loading are priority hero images

ScreenshotGallery.tsx:32, i < 3 — correct for above-fold LCP images. This was a false positive in the first audit.

**Fix:** No action.
