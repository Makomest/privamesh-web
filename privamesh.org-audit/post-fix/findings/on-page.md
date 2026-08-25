# On-Page SEO — 76/100 (was 76)

**Weight:** 20%

## What works

- 63/63 titles present, 0 duplicates
- 63/63 meta descriptions present, 0 duplicates
- 63/63 H1 present, 0 pages with multiple H1, 0 heading-level skips

## Findings

### [Medium] 22 titles exceed 60 characters

Worst: /ru/blog/why-a-messenger-with-servers-can-never-be-fully-private (78), /glossary/end-to-end-encryption (72), /features/no-servers (68), /alternatives (68), /glossary (68).

**Fix:** Drop the '· PrivaMesh' suffix on routes whose own title already exceeds ~48 chars.

### [Medium] Glossary title grammar still broken

'What is a End-to-end encryption (E2EE)?', 'What is a Metadata (in messaging)?'

**Fix:** Drop the article or make it agree with the term.

### [Medium] 19 pages at 1 inbound internal link

All 10 /guides/*, all 7 /glossary/* detail pages, /alternatives/imessage, /alternatives/wickr.

**Fix:** Add contextual cross-links from blog posts and comparison pages.

### [Info] Duplicate H1s not verifiable in this build

0 found here, but the 6 affected posts (best-private-messenger-2026, privamesh-vs-threema, privamesh-vs-simplex in both locales) are not in the local content directory.

**Fix:** Re-check against production after deploying.

### [Low] 3 meta descriptions over 160 chars

/terms (162), /best-private-messaging-apps (164), /ru/blog/why-a-messenger-with-servers-can-never-be-fully-private (174). The 4 short RU tag descriptions are now moot — those pages are noindexed.

**Fix:** Trim to 150-160.
