# Performance (CWV) — 78/100 (was 78)

**Weight:** 10%

## What works

- x-nextjs-cache: HIT — static generation intact after the refactor
- Median HTML 68KB
- Median TTFB 24ms (localhost, not comparable to the 74ms measured live)

## Findings

### [Medium] Home page payload unchanged at 171KB

Still by far the heaviest page and still carrying the always-on NetworkBackground canvas. The 19 new opengraph-image.tsx files add build-time routes, not page weight.

**Fix:** Measure INP on the home page; consider pausing the canvas off-viewport.

### [Info] Still no LCP/INP/CLS measurement

No Chrome installed, so no Lighthouse run.

**Fix:** Install Chrome, then run Lighthouse and connect CrUX.
