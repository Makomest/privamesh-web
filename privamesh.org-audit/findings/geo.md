# AI Search Readiness — 72/100

**Weight:** 10%

## What works

- GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended and bingbot all return 200
- robots.txt blocks no AI crawler
- Bing msvalidate.01 token wired in, so the Copilot/DuckDuckGo path is live
- 14 FAQPage blocks and 8 DefinedTerm entries give directly citable passages
- Six vs-competitor comparison pages match how users prompt LLMs

## Findings

### [Medium] No llms.txt

/llms.txt returns 404.

**Fix:** Publish one listing the key pages and their purpose.

### [Medium] Thin passages limit citability

LLMs cite self-contained passages; 63 pages lack the substance to form one.

**Fix:** Address alongside the content-depth work.

### [Medium] Almost no external corroboration

Only github.com and x.com are linked sitewide. No citations to the cryptographic primitives claimed, no third-party coverage, no audit references — weak grounding for a 'trust math, not companies' positioning.

**Fix:** Cite specifications and independent sources on the technical pages.
