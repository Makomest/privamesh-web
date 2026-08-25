# On-Page SEO — 76/100

**Weight:** 20%

## What works

- 94/94 titles present, 0 duplicates
- 94/94 meta descriptions present, 0 duplicates
- 94/94 H1 present
- 2191 unique internal link edges, 0 orphan pages

## Findings

### [Medium] 30 titles exceed 60 characters

Worst: /ru/blog/privamesh-vs-simplex (80), /ru/blog/why-a-messenger-with-servers-can-never-be-fully-private (78), /blog/privamesh-vs-threema (73), /glossary/end-to-end-encryption (72). The '%s · PrivaMesh' template at app/layout.tsx:29 adds 12 chars.

**Fix:** Drop the suffix on routes whose own title already exceeds ~48 chars.

### [Medium] Grammar error in glossary title template

'What is a End-to-end encryption (E2EE)?', 'What is a Metadata (in messaging)?' — hardcoded article breaks agreement.

**Fix:** Drop the article or make it agree with the term.

### [Medium] 6 pages render duplicate H1s

Identical H1 text twice on /blog/best-private-messenger-2026, /blog/privamesh-vs-threema, /blog/privamesh-vs-simplex and their RU counterparts.

**Fix:** Remove either the page-header component H1 or the MDX '#' heading.

### [Medium] 12 commercial pages have only 1 inbound internal link

All 10 /guides/* plus /alternatives/imessage and /alternatives/wickr are reachable only from their hub. 41 pages sit at <=2 inbound, 29 of them tag pages.

**Fix:** Add contextual cross-links from blog posts and comparison pages.

### [Low] 3 meta descriptions over 160 chars

/terms (162), /best-private-messaging-apps (164), /ru/blog/why-a-messenger-with-servers-can-never-be-fully-private (174).

**Fix:** Trim to 150-160.

### [Low] 6 RU tag descriptions under 70 chars

All built from the same 'Статьи про {tag} - ...' template.

**Fix:** Moot if tag pages are de-indexed; otherwise write per-tag copy.
