# PrivaMesh - Marketing Website

Production-ready, SEO-optimized marketing site for **PrivaMesh**, a serverless, end-to-end encrypted messenger on Solana (iOS, SwiftUI).

**Tagline:** _Trust math, not companies._
**Production domain:** https://privamesh.org

Built with Next.js 14 (App Router), fully statically generated, Tailwind CSS, lucide-react, and MDX for the blog. No heavy animation or UI libraries. Dark-theme-only "Cypherpunk Premium" design system.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (SSG)
npm start        # serve the production build
```

Requirements: Node 18.17+ (tested on Node 20).

---

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com/new), **Import Project** and select the repo.
3. Framework preset auto-detects **Next.js** - no config needed. Build command `next build`, output handled automatically.
4. Add your domain under **Project → Settings → Domains**: add `privamesh.org` (and `www.privamesh.org` → redirect to apex).
5. Deploy. The sitemap is served at `/sitemap.xml`, robots at `/robots.txt`, and the dynamic OG image at `/opengraph-image`.

No environment variables are required. The production URL is set in `lib/site.ts` (`SITE.domain`); update it there if the domain changes - it drives canonicals, sitemap, JSON-LD, and OG tags.

---

## Google Search Console setup

1. Go to [Google Search Console](https://search.google.com/search-console) → **Add property** → **Domain** → enter `privamesh.org`.
2. Verify via DNS TXT record (add the record in your DNS / Vercel Domains panel). Domain-level verification covers http/https and all subdomains.
3. After verification, open **Sitemaps** and submit: `https://privamesh.org/sitemap.xml`.
4. Use **URL Inspection** on the homepage and a couple of feature pages → **Request indexing** to speed up first crawl.
5. Optional: add the same property to [Bing Webmaster Tools](https://www.bing.com/webmasters) and import from GSC.

Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results): the home page emits `SoftwareApplication`, `Organization`, `WebSite`, and `FAQPage`; inner pages emit `BreadcrumbList`; compare pages `ItemList`; blog posts `Article`; `/pricing` a second `FAQPage`.

---

## Site architecture

| URL | Purpose |
| --- | --- |
| `/` | Home - hero, no-servers table, lifecycle, metadata, encryption, gallery, comparison, pricing, FAQ |
| `/privacy` | Why PrivaMesh is the most private messenger (head-term hub) |
| `/features/no-servers` | Serverless architecture |
| `/features/e2e-encryption` | X3DH + Double Ratchet + AES-256-GCM |
| `/features/metadata-protection` | Stealth addresses, cover traffic, gas wallet |
| `/features/seed-phrase-accounts` | BIP-39 login, no phone/email, Keychain |
| `/features/sol-transfers` | In-chat SOL, nicknames, NFT avatars |
| `/compare/privamesh-vs-signal` | Honest comparison |
| `/compare/privamesh-vs-telegram` | Honest comparison |
| `/compare/privamesh-vs-session` | Honest comparison |
| `/pricing` | Free vs PrivaMesh+ ($1.99/mo) + payment FAQ |
| `/blog` | Blog index + 2 seed MDX posts |
| `/404` | Custom not-found with key links |

Compare pages are generated from `lib/compare.ts` via `app/compare/[slug]/page.tsx` (`generateStaticParams`). Blog posts are MDX files under `app/blog/<slug>/page.mdx`, registered in `lib/posts.ts`.

---

## Keyword → page mapping

Primary target keyword per page plus secondary variants. Copy, headings, titles, and URLs are built around these clusters.

| # | Keyword | Cluster | Target page |
| --- | --- | --- | --- |
| 1 | private messenger | Core privacy | `/` |
| 2 | most private messaging app | Core privacy | `/privacy` |
| 3 | truly private messenger | Core privacy | `/privacy` |
| 4 | privacy first messenger | Core privacy | `/privacy` |
| 5 | privacy messenger app | Core privacy | `/` |
| 6 | serverless messenger | Serverless | `/features/no-servers` |
| 7 | messenger without servers | Serverless | `/features/no-servers` |
| 8 | decentralized messenger | Serverless | `/features/no-servers` |
| 9 | web3 messenger | Serverless | `/features/no-servers` |
| 10 | solana messenger | Serverless | `/` |
| 11 | blockchain messenger | Serverless | `/features/no-servers` |
| 12 | encrypted messenger without phone number | No-identity | `/features/seed-phrase-accounts` |
| 13 | anonymous messaging app | No-identity | `/features/seed-phrase-accounts` |
| 14 | private chat app no phone number | No-identity | `/features/seed-phrase-accounts` |
| 15 | messenger no email required | No-identity | `/features/seed-phrase-accounts` |
| 16 | messenger with seed phrase login | Long-tail | `/features/seed-phrase-accounts` |
| 17 | messenger that doesn't collect metadata | Metadata | `/features/metadata-protection` |
| 18 | hide message metadata | Metadata | `/features/metadata-protection` |
| 19 | metadata private messenger | Metadata | `/features/metadata-protection` |
| 20 | end-to-end encryption explained | Encryption | `/features/e2e-encryption` |
| 21 | how double ratchet works | Encryption | `/blog/how-double-ratchet-encryption-works` |
| 22 | signal alternative | Competitor | `/compare/privamesh-vs-signal` |
| 23 | telegram alternative privacy | Competitor | `/compare/privamesh-vs-telegram` |
| 24 | session messenger alternative | Competitor | `/compare/privamesh-vs-session` |
| 25 | send SOL in chat | Long-tail | `/features/sol-transfers` |
| 26 | truly private messenger 2026 | Long-tail | `/privacy`, `/` |

---

## Blog ingestion API (n8n / automation)

Blog posts are Markdown files with YAML frontmatter in [`content/blog/`](content/blog/).
The blog index, `[slug]` page, RSS feed and sitemap all read this directory, so adding
one file publishes a post - no code edits.

An HTTP endpoint lets automation (e.g. n8n) create posts remotely:

```
POST https://privamesh.org/api/blog
Authorization: Bearer <BLOG_INGEST_TOKEN>
Content-Type: application/json

{
  "title": "How stealth addresses hide your social graph",
  "description": "Short meta description, <=155 chars.",
  "body": "## Intro\n\nFull post in Markdown...",
  "tags": ["Privacy", "Metadata"],
  "date": "2026-07-05",          // optional, defaults to today
  "slug": "custom-slug",          // optional, derived from title
  "readingTime": "6 min read"     // optional, auto-estimated
}
```

Response: `{ "ok": true, "slug": "...", "url": "https://privamesh.org/blog/..." }`.
`GET /api/blog` returns the existing posts (slug/title/date) so a workflow can dedupe.

**How persistence works**

- With `GITHUB_TOKEN` + `GITHUB_OWNER` + `GITHUB_REPO` set, the endpoint commits
  `content/blog/<slug>.md` to your repo. Vercel auto-redeploys and the static,
  SEO-optimized post goes live within a minute.
- Without those env vars it writes the file to the local `content/blog/` dir
  (dev/testing only - not persisted on Vercel).

**Setup**

1. Copy `.env.example` → `.env.local` (local) and set the same vars in Vercel →
   Project → Settings → Environment Variables.
2. `BLOG_INGEST_TOKEN` - a long random secret; n8n sends it as the Bearer token.
3. `GITHUB_TOKEN` - a fine-grained PAT with **Contents: read & write** on the site repo.
4. In n8n: an **HTTP Request** node → POST the JSON above with the Authorization header.
   Generate the `body` markdown with your LLM/step of choice, then POST it.

Security: the token gates writes; keep it secret. Consider a Vercel deploy hook or
`npm run indexnow` after publish to ping search engines.

## Design system

Tokens live in `tailwind.config.ts` and `app/globals.css`:

- **Backgrounds:** `bg-base #0A0B0F`, `bg-surface #12141A`, `bg-elevated #1A1D26`
- **Accent:** Solana green `#14F195` (primary only), purple `#9945FF` (glow + dividers only)
- **Type:** Inter (UI/headings), JetBrains Mono (technical) via `next/font`
- **Signature motion:** one H1 text-scramble (`components/HeroScramble.tsx`) + IntersectionObserver fade-up (`components/FadeUp.tsx`); all motion respects `prefers-reduced-motion`
- **Texture:** SVG grain overlay (~3.5%) + hero dot-grid mesh + single radial glow behind the hero phone

## SEO features

- Per-page canonical, OpenGraph, Twitter Card via `lib/seo.ts`
- Dynamic 1200×630 OG image from the logo (`app/opengraph-image.tsx`)
- JSON-LD helpers in `lib/jsonld.ts`
- `app/sitemap.ts` + `app/robots.ts` auto-generated
- hreflang scaffold (en live; ru/uk stubbed to same URL in `lib/seo.ts` - swap to localized paths when translations ship)
- Single H1 per page, semantic `<main>/<section>/<nav>/<footer>`, crawlable `<details>` FAQ

## Assets

App screenshots and logo are committed under `public/screenshots/` and `public/logo.png`, sourced from the [PrivaMesh repo](https://github.com/Makomest/PrivaMesh). Every image uses `next/image` with explicit width/height and keyword-rich alt text.
