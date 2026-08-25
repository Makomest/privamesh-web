# Schema / Structured Data — 88/100

**Weight:** 10%

## What works

- 0 pages without JSON-LD, 0 parse errors
- Organization + WebSite on 94/94
- BreadcrumbList on 92/94
- ItemList on 42, FAQPage on 14, Article+Person on 12, DefinedTerm on 8
- SoftwareApplication with Offer and UnitPriceSpecification

## Findings

### [Medium] FAQPage on only 14 of 94 pages

Absent from all 5 /features/*, 11 /guides/*, 9 /alternatives/*, 3 /compare/* — exactly the pages that earn AI Overview and PAA placement.

**Fix:** Add a 4-5 question FAQ block with FAQPage schema to each money page.

### [Low] 2 pages missing BreadcrumbList

92 of 94 have it.

**Fix:** Extend to the 2 remaining pages.

### [Low] SoftwareApplication on only 2 pages

The app entity should appear on the home page and every feature page.

**Fix:** Emit SoftwareApplication sitewide on product pages.

### [Low] DefinedTerm present without DefinedTermSet

8 glossary entries are not linked into one vocabulary.

**Fix:** Add a DefinedTermSet for /glossary.
