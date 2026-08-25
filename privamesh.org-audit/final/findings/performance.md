# Performance (CWV) — 92/100 (was 78)

**Weight:** 10%

## What works

- First audit with a real browser — no longer an estimate
- CLS 0 and TBT 0 on every page tested
- FCP consistently ~0.9s
- Lighthouse SEO 100 and Accessibility 100
- Perf 83-97 across page types, median 92

## Findings

### [Medium] LCP is the only weak metric and the lab cannot measure it reliably

Identical builds produced LCP between 2605ms and 4657ms across runs. The LCP element is a hero paragraph whose cost is entirely render delay, not resource loading, pointing at webfont swap timing. An experiment replacing the Inter variable font with static weights and deprioritising the mono face made everything worse (FCP 904 -> 1207ms, CLS 0 -> 0.018) and was reverted.

**Fix:** Connect CrUX for field data rather than tuning against lab noise.

### [Info] Correction: the NetworkBackground canvas is not an INP risk

Three previous audits flagged it as the likely INP risk on the home page. Measured, TBT is 0 and CLS is 0, and building with the canvas disabled produced a worse LCP (2916ms vs 2610ms) — within run-to-run noise. The hypothesis was wrong.

**Fix:** No change needed to the canvas.
