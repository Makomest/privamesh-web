import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Minus, X } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import AppStoreButton from '@/components/AppStoreButton'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd, faqPageLd } from '@/lib/jsonld'

export const metadata: Metadata = pageMetadata({
  title: 'Best Private Messaging Apps 2026 (Honestly Ranked)',
  description:
    'The best private messaging apps of 2026, ranked honestly: PrivaMesh, Signal, Session, Threema, SimpleX and more — by encryption, metadata, phone number and servers.',
  path: '/best-private-messaging-apps',
})

type Row = {
  name: string
  e2e: 0 | 1 | 2
  noPhone: 0 | 1 | 2
  noServer: 0 | 1 | 2
  meta: 0 | 1 | 2
}
const TABLE: Row[] = [
  { name: 'PrivaMesh', e2e: 2, noPhone: 2, noServer: 2, meta: 2 },
  { name: 'Signal', e2e: 2, noPhone: 0, noServer: 0, meta: 1 },
  { name: 'Session', e2e: 2, noPhone: 2, noServer: 2, meta: 2 },
  { name: 'SimpleX', e2e: 2, noPhone: 2, noServer: 1, meta: 2 },
  { name: 'Threema', e2e: 2, noPhone: 2, noServer: 0, meta: 1 },
  { name: 'Telegram', e2e: 0, noPhone: 0, noServer: 0, meta: 0 },
  { name: 'WhatsApp', e2e: 2, noPhone: 0, noServer: 0, meta: 0 },
]

function Cell({ v }: { v: 0 | 1 | 2 }) {
  if (v === 2) return <Check size={16} className="mx-auto text-success" strokeWidth={2.5} />
  if (v === 1) return <Minus size={16} className="mx-auto text-warning" strokeWidth={2.5} />
  return <X size={16} className="mx-auto text-negative" strokeWidth={2.5} />
}

const RANKED = [
  {
    n: 1,
    name: 'PrivaMesh',
    tag: 'Best for zero-trust privacy',
    body: 'The only app on this list with no servers at all: messages are encrypted blobs on Solana, your account is a seed phrase (no phone, no email), and stealth addresses plus cover traffic hide metadata. Trade-off: a tiny SOL network fee per message, and your seed restores funds but not chat history.',
    href: '/privacy',
  },
  {
    n: 2,
    name: 'Signal',
    tag: 'Best mainstream choice',
    body: 'The gold standard for encrypted messaging — mature, audited, huge reach. But it runs central servers and requires a phone number, so it protects content better than metadata or identity.',
    href: '/compare/privamesh-vs-signal',
  },
  {
    n: 3,
    name: 'Session',
    tag: 'Best onion-routed option',
    body: 'No phone number and decentralized over an onion network. Strong metadata protection, though it dropped the Double Ratchet for its routing model, weakening per-message forward secrecy.',
    href: '/alternatives/session',
  },
  {
    n: 4,
    name: 'SimpleX',
    tag: 'Best with no user IDs',
    body: 'Eliminates user identifiers entirely and can be self-hosted. Uses message-queue relay servers rather than a public chain, and has no built-in payments.',
    href: '/alternatives/simplex',
  },
  {
    n: 5,
    name: 'Threema',
    tag: 'Best paid, no-phone option',
    body: 'A polished paid app that lets you sign up without a phone number. Still runs on Threema’s own servers, so a central operator remains in the path.',
    href: '/alternatives/threema',
  },
  {
    n: 6,
    name: 'Telegram',
    tag: 'Best for reach (not privacy)',
    body: 'Fast and feature-rich, but default cloud chats are not end-to-end encrypted and everything runs on Telegram’s servers. Only opt-in Secret Chats are E2E.',
    href: '/alternatives/telegram',
  },
  {
    n: 7,
    name: 'WhatsApp',
    tag: 'Most popular, least private',
    body: 'End-to-end encrypted content, but owned by Meta, tied to your phone number, and it collects extensive metadata. Fine for reach, weak for privacy.',
    href: '/alternatives/whatsapp',
  },
]

const FAQS = [
  {
    q: 'What is the most private messaging app in 2026?',
    a: 'PrivaMesh is the most private by architecture: it has no servers, no phone number and no email, and it hides metadata with stealth addresses and cover traffic. Signal is the most private mainstream app, but it still runs servers and requires a phone number.',
  },
  {
    q: 'Which private messaging app has no phone number?',
    a: 'PrivaMesh, Session, SimpleX and Threema let you use them without a phone number. PrivaMesh goes furthest — your account is a BIP-39 seed phrase with no server-side account at all.',
  },
  {
    q: 'Are private messaging apps really secure?',
    a: 'The best ones use audited end-to-end encryption so only you and your contact can read messages. Real privacy also depends on metadata protection and whether a server exists that can be breached or subpoenaed — which is why serverless apps like PrivaMesh rank highest here.',
  },
  {
    q: 'Is WhatsApp a private messaging app?',
    a: 'WhatsApp encrypts message content end-to-end, but it is owned by Meta, requires your phone number, and collects significant metadata. It is private in content but weak in metadata and identity compared with Signal or PrivaMesh.',
  },
]

export default function BestPrivateMessagingApps() {
  return (
    <Container>
      <JsonLd
        data={itemListLd(
          'Best private messaging apps 2026',
          RANKED.map((r) => r.name),
        )}
      />
      <JsonLd data={faqPageLd(FAQS)} />
      <PageHeader
        eyebrow="Ranked guide · 2026"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Best Private Messaging Apps', path: '/best-private-messaging-apps' },
        ]}
        title="Best private messaging apps in 2026"
        lead="An honest ranking of the most private messaging apps — judged on encryption, metadata protection, whether they need a phone number, and whether they run servers at all."
      >
        <AppStoreButton />
      </PageHeader>

      {/* Comparison table */}
      <div className="mt-12 overflow-x-auto rounded-card bg-white/20 backdrop-blur-sm">
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">App</th>
              <th className="px-4 py-4 text-center font-semibold text-text-secondary">
                E2E default
              </th>
              <th className="px-4 py-4 text-center font-semibold text-text-secondary">No phone</th>
              <th className="px-4 py-4 text-center font-semibold text-text-secondary">
                No servers
              </th>
              <th className="px-4 py-4 text-center font-semibold text-text-secondary">
                Metadata hidden
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map((r) => (
              <tr key={r.name} className="border-b border-border last:border-0">
                <td
                  className={`px-5 py-4 font-medium ${r.name === 'PrivaMesh' ? 'text-accent' : 'text-text-primary'}`}
                >
                  {r.name}
                </td>
                <td className="px-4 py-4">
                  <Cell v={r.e2e} />
                </td>
                <td className="px-4 py-4">
                  <Cell v={r.noPhone} />
                </td>
                <td className="px-4 py-4">
                  <Cell v={r.noServer} />
                </td>
                <td className="px-4 py-4">
                  <Cell v={r.meta} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-text-muted">
        <span className="text-success">✓ yes</span>
        <span className="text-warning">— partial</span>
        <span className="text-negative">✗ no</span>
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          <Prose>
            <h2>How we ranked them</h2>
            <p>
              &ldquo;Private&rdquo; is not one thing. A messaging app can encrypt your words
              perfectly and still leak who you talk to, when, and from what phone number. So we
              judged every app on four independent questions, in order of how hard they are to get
              right:
            </p>
            <ul>
              <li>
                <strong>Is it end-to-end encrypted by default?</strong> Only you and your contact
                should be able to read a message — not the provider, not on any server.
              </li>
              <li>
                <strong>Can you use it without a phone number?</strong> A phone number ties your
                &ldquo;anonymous&rdquo; account to your real identity.
              </li>
              <li>
                <strong>Does it avoid central servers?</strong> A server is a single point that can
                be breached, subpoenaed, or quietly told to log more.{' '}
                <Link href="/features/no-servers">Serverless</Link> removes that risk entirely.
              </li>
              <li>
                <strong>Does it hide metadata?</strong>{' '}
                <Link href="/glossary/metadata">Metadata</Link> — the who/when/how-often — is what
                surveillance actually runs on.
              </li>
            </ul>
          </Prose>

          <div className="mt-10 space-y-5">
            {RANKED.map((r) => (
              <div
                key={r.name}
                className="rounded-card border border-border bg-white/20 p-6 backdrop-blur-sm"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-accent">#{r.n}</span>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary">{r.name}</h3>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                  {r.tag}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{r.body}</p>
                <Link
                  href={r.href}
                  className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>

          <Prose>
            <h2>The bottom line</h2>
            <p>
              If you want a mainstream app with the widest reach, <strong>Signal</strong> is the
              safe pick. If you want to remove the last two weak points — the server and the phone
              number — entirely, <strong>PrivaMesh</strong> is the most private option: no servers,
              no phone, no email, and metadata hidden on-chain. The right choice depends on whether
              you value reach or zero-trust architecture more.{' '}
              <Link href="/privacy">See exactly why PrivaMesh is the most private messenger.</Link>
            </p>
          </Prose>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-card border border-border-accent bg-white/20 p-6 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Our #1 pick</p>
            <h2 className="mt-2 text-lg font-bold text-text-primary">PrivaMesh</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Serverless, no phone number, no metadata. End-to-end encrypted on Solana.
            </p>
            <AppStoreButton className="mt-4 w-full" />
          </div>
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="best-faq">
        <h2 id="best-faq" className="mb-6 text-2xl font-bold tracking-tight text-text-primary">
          Frequently asked questions
        </h2>
        <FAQ items={FAQS} />
      </section>

      <RelatedLinks
        links={[
          {
            href: '/alternatives',
            label: 'All alternatives',
            blurb: 'Private alternatives to Signal, Telegram, WhatsApp and more.',
          },
          {
            href: '/compare/privamesh-vs-signal',
            label: 'PrivaMesh vs Signal',
            blurb: 'The full head-to-head with the gold standard.',
          },
          {
            href: '/privacy',
            label: 'Why PrivaMesh is private',
            blurb: 'No servers, no phone number, no metadata — explained.',
          },
        ]}
      />
    </Container>
  )
}
