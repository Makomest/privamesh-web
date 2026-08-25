# Content Quality — 64/100 (was 52)

**Weight:** 23%

## What works

- 8 /alternatives/* pages rewritten from 170-195 to 626-679 words
- Each has a fair 'what they get right' section, a named gap, a six-row table, switch-if/stay-if lists and 4 FAQs
- Feature pages now 573-727 words, comparison pages 562-619
- Pages under 300 words: 63/94 live -> 42/63 -> 34/63
- Median words: 175 -> 218 -> 260
- 0 pages missing H1, 0 heading-level skips

## Findings

### [High] 10 /guides/* pages at 218-273 words

private-messenger-for-crypto 218, decentralized-messaging-app 220, encrypted-messaging-app-for-iphone 230, messaging-app-that-doesnt-track-you 231, blockchain-messaging-app 232, serverless-messaging-app 238, web3-messaging-app 239, anonymous-messaging-app 265, most-private-messaging-app-2026 273, private-messaging-app-without-phone-number 378. They already carry FAQ blocks and FAQPage schema, so only the body copy is thin.

**Fix:** Apply the /alternatives/* template: fair framing, concrete implementation, a decision table, and who-this-is-not-for. Target 600+.

### [High] Head-term cannibalization, unresolved

/best-private-messaging-apps (786w) and /guides/most-private-messaging-app-2026 (273w) still target the same query.

**Fix:** Editorial decision: pick the canonical target, subordinate or merge the other, have it link up.

### [Medium] 8 glossary pages at 105-152 words

cover-traffic 105, serverless-messenger 114, end-to-end-encryption 117, double-ratchet 120, forward-secrecy 128, metadata 135, bip-39-seed-phrase 146, stealth-address 152. Now the thinnest section on the site.

**Fix:** Take each to ~300 with a worked example, why it matters, and how PrivaMesh implements it.

### [Medium] /news still 26 words

4 empty H2s, indexed and in the sitemap.

**Fix:** Populate or de-index.

### [Medium] E-E-A-T unchanged

/about 353 words with no named team. Only two external domains linked sitewide: github.com (257) and x.com (64). No citations to X3DH, Double Ratchet or BIP-39 despite the product being built on them.

**Fix:** Cite the specifications, name the team, link third-party coverage.

### [Info] Section index pages read thin by word count

/blog 131, /ru/blog 132, /alternatives 219, /glossary 260. Navigational pages — the count is expected.

**Fix:** No action.
