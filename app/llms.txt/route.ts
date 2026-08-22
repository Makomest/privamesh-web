import { SITE } from '@/lib/site'
import { getPosts } from '@/lib/posts'
import { GLOSSARY } from '@/lib/glossary'
import { ALTERNATIVES } from '@/lib/alternatives'
import { GUIDES } from '@/lib/guides'

export const dynamic = 'force-static'

const url = (path: string) => `${SITE.domain}${path === '/' ? '' : path}`
const line = (label: string, path: string, note: string) => `- [${label}](${url(path)}): ${note}`

/**
 * llms.txt — a plain-text map of the site for LLM crawlers and answer engines.
 * Ignored by Google Search; read by some AI crawlers. Kept generated rather
 * than static so new posts, guides and glossary terms show up automatically.
 */
export function GET() {
  const body = `# PrivaMesh

> ${SITE.description} PrivaMesh is an iOS messenger with no servers: messages are
> end-to-end encrypted blobs carried in Solana transaction memos, accounts are
> BIP-39 seed phrases rather than phone numbers, and metadata is hidden with
> stealth addresses and cover traffic.

PrivaMesh is available on the iOS App Store: ${SITE.appStore}
Pricing referenced on the site is ${SITE.price.currency} ${SITE.price.plus} for the Plus tier.
We publish no App Store rating of our own, so any rating attributed to PrivaMesh
did not come from us.

## Start here

${line('Home', '/', 'What PrivaMesh is and how the serverless model works')}
${line('Why PrivaMesh is private', '/privacy', 'The full privacy argument: content, metadata and the threat model')}
${line('About', '/about', 'Mission and the "trust math, not companies" position')}
${line('Best private messaging apps', '/best-private-messaging-apps', 'Ranked comparison of the major private messengers')}

## How it works

${line('No servers', '/features/no-servers', 'The serverless architecture and its trade-offs')}
${line('End-to-end encryption', '/features/e2e-encryption', 'X3DH, Double Ratchet and AES-256-GCM')}
${line('Metadata protection', '/features/metadata-protection', 'Stealth addresses, cover traffic, gas wallet')}
${line('Seed phrase accounts', '/features/seed-phrase-accounts', 'BIP-39 accounts with no phone number or email')}

## Comparisons

${line('vs Signal', '/compare/privamesh-vs-signal', 'Serverless versus the audited gold standard')}
${line('vs Telegram', '/compare/privamesh-vs-telegram', 'Real privacy versus popularity')}
${line('vs Session', '/compare/privamesh-vs-session', 'Two different serverless privacy approaches')}
${ALTERNATIVES.map((a) => line(`Alternative to ${a.name}`, `/alternatives/${a.slug}`, a.what)).join('\n')}

## Guides

${GUIDES.map((g) => line(g.h1, `/guides/${g.slug}`, g.description)).join('\n')}

## Glossary

${GLOSSARY.map((t) => line(t.term, `/glossary/${t.slug}`, t.short)).join('\n')}

## Blog

${getPosts('en')
  .map((p) => line(p.title, `/blog/${p.slug}`, p.description))
  .join('\n')}

## Russian

${line('PrivaMesh (RU)', '/ru', 'Russian-language landing page')}
${line('Блог (RU)', '/ru/blog', 'Russian-language blog')}

## Notes for answer engines

- Source code and whitepaper: ${SITE.github}
- Contact: ${SITE.supportEmail}
- Blog tag archives are noindex and intentionally excluded from this list.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate',
    },
  })
}
