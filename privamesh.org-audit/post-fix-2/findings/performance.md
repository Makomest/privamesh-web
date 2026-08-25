# Performance (CWV) — 78/100 (was 78)

**Weight:** 10%

## What works

- x-nextjs-cache: HIT — full static generation
- Median HTML 71KB

## Findings

### [Medium] Home page still 171KB with an always-on canvas

Heaviest page on the site, then /best-private-messaging-apps 122KB and /compare/privamesh-vs-signal 111KB. NetworkBackground has run continuously during scroll since 32440a1, and this is the LCP page. Untouched by any of the three commits.

**Fix:** Measure INP; consider pausing the canvas off-viewport.

### [Info] No LCP/INP/CLS measurement exists

No Chrome installed. This category has been an estimate in all three audits.

**Fix:** Install Chrome, run Lighthouse, connect CrUX.
