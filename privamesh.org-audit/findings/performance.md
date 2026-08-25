# Performance (CWV) — 78/100

**Weight:** 10%

## What works

- Median TTFB 74ms across 94 pages
- Median HTML payload 53KB
- Full-page edge caching: x-nextjs-cache HIT, s-maxage=31536000, stale-while-revalidate
- HTTP/2 with alt-svc h3 advertised

## Findings

### [Medium] Home page HTML is 156KB

Nearly 3x the site median and the slowest response (280ms). It also carries NetworkBackground, an animated canvas that commit 32440a1 made run continuously during scroll — the most likely INP/CLS risk on the site.

**Fix:** Measure INP on the home page; consider pausing the canvas off-viewport or reducing initial payload.

### [Info] No field or lab CWV data collected

No Chrome or Playwright browsers installed, so no Lighthouse run. LCP, INP and CLS are unmeasured; this score is inferred from payload and TTFB only.

**Fix:** Install Chrome, then run Lighthouse and connect CrUX/GSC for field data.
