# Content Quality — 52/100

**Weight:** 23%

## What works

- 12 long-form blog posts at 1162-1515 words (6 EN + 6 RU)
- /privacy 774w, /best-private-messaging-apps 786w, home 848w have real depth
- 0 pages missing H1, 0 H3-without-H2 skips
- Person schema on all 12 articles

## Findings

### [High] 63 of 94 pages under 300 words

Site median 175 words. By section: blog tags ~70w (31 pages), glossary 142w (9), alternatives 183w (9), guides 262w (11). The commercial-intent sections are the thinnest non-tag content; /alternatives/whatsapp is 170 words.

**Fix:** Take /alternatives/* and /guides/* to 600+ words with comparison tables, who-should-switch sections, and FAQ blocks.

### [High] 31 near-empty tag archives are indexable

/blog/tag/* and /ru/blog/tag/* average ~65 words listing 1-2 posts. Nine EN tags are semantic duplicates (serverless / serverless-messaging / serverless-messenger; private-messenger / private-messaging / encrypted-messenger / encrypted-chat). All are in the sitemap.

**Fix:** noindex,follow the tag archives and remove from sitemap, or consolidate to ~6 tags with real intro copy.

### [High] Head-term cannibalization

/best-private-messaging-apps (786w), /blog/best-private-messenger-2026 (1515w) and /guides/most-private-messaging-app-2026 (273w) target the same query. Title-overlap also flags /blog/privamesh-vs-{simplex,whatsapp,threema} against /alternatives/{simplex,whatsapp,threema}, and / against /privacy (Jaccard 0.60).

**Fix:** Designate one canonical target per cluster; convert the rest to supporting pages that link up.

### [Medium] /news is an empty shell

26 words, 4 H2s, no items — indexed and in the sitemap.

**Fix:** Populate it or remove it from the index.

### [Medium] Weak sitewide E-E-A-T surface

/about is 353 words with no named team or external corroboration. Only 2 external domains linked sitewide: github.com (381 links), x.com (95).

**Fix:** Add named authors with credentials, cite the cryptographic specifications claimed (X3DH, Double Ratchet, BIP-39), link third-party coverage.
