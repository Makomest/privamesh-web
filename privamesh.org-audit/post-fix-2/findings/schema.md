# Schema / Structured Data — 93/100 (was 88)

**Weight:** 10%

## What works

- FAQPage on 38 of 51 indexable pages, up from 14
- Every FAQ block is backed by visible Q&A — PageFaq renders the questions and emits the schema from the same array
- 0 pages without JSON-LD, 0 parse errors
- Organization + WebSite on 63/63, BreadcrumbList on 61/63
- ItemList 19, DefinedTerm 8, Article+Person 4

## Findings

### [Info] The 13 indexable pages without FAQPage are the right ones

/privacy-policy, /terms, /about, /news, the 4 blog posts and the 5 section indexes. FAQ markup would not be appropriate on any of them.

**Fix:** No action.

### [Low] SoftwareApplication on only 2 pages

Should appear on the home page and every feature page.

**Fix:** Emit sitewide on product pages.

### [Low] No DefinedTermSet

The 8 glossary entries are not linked into one vocabulary.

**Fix:** Add a DefinedTermSet for /glossary.

### [Low] 2 pages missing BreadcrumbList

61 of 63 have it.

**Fix:** Extend to the remaining 2.
