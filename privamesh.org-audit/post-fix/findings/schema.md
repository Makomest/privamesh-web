# Schema / Structured Data — 88/100 (was 88)

**Weight:** 10%

## What works

- 0 pages without JSON-LD, 0 parse errors
- Organization + WebSite on 63/63
- BreadcrumbList on 61/63
- ItemList 19, FAQPage 14, Article+Person 4, DefinedTerm 8, SoftwareApplication 2
- Route-group refactor disturbed no structured data

## Findings

### [Medium] FAQPage on only 14 of 63 pages

Absent from every /features/*, /guides/*, /alternatives/*, /compare/*.

**Fix:** Add a 4-5 question FAQ block with FAQPage schema to each money page.

### [Low] 2 pages missing BreadcrumbList

61 of 63 have it.

**Fix:** Extend to the remaining 2.

### [Low] SoftwareApplication on only 2 pages

Should appear on the home page and every feature page.

**Fix:** Emit sitewide on product pages.

### [Low] DefinedTerm without DefinedTermSet

8 glossary entries not linked into one vocabulary.

**Fix:** Add a DefinedTermSet for /glossary.
