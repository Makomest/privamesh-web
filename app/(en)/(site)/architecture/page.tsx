import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { COMPONENTS, FLOW } from '@/lib/architecture'

export const metadata: Metadata = pageMetadata({
  title: 'Architecture: every component, and what it sees',
  description:
    'Every component in PrivaMesh and what it can observe: the iOS client, our fee worker, the RPC endpoint, Solana and StoreKit. Named, not hidden.',
  path: '/architecture',
})

const FAQS = [
  {
    q: 'Does PrivaMesh run any servers?',
    a: 'One. A fee worker sponsors the Solana network fee for each transaction so you never have to hold SOL. It sees an account and a timestamp and never sees plaintext or a recipient. There is no account database and no message store.',
  },
  {
    q: 'What can the RPC provider see?',
    a: 'Your IP address, the timing of your requests, and the transactions you submit. It is the component with the clearest view of your network-level activity, which is why it is swappable and self-hostable.',
  },
  {
    q: 'What happens if the fee worker goes offline?',
    a: 'Sending stops working until it comes back or you fund transactions yourself. Your identity, contacts and message history are unaffected - they live on your device and depend on nothing we run.',
  },
  {
    q: 'Can Apple see who I message?',
    a: 'Apple sees that you bought a subscription and which Apple ID bought it. It does not see your messages or your contacts. Blind tokens are what keep the purchase from being linkable to your sending activity.',
  },
]

export default function ArchitecturePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Architecture"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Architecture', path: '/architecture' },
        ]}
        title="Every component, and what it can see"
        lead="A privacy claim is only worth what a reader can check. This is the full list of parts in the system, who runs each one, and what each can observe - including the one machine we run ourselves."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        PrivaMesh has no account database and no message store. It does have a fee worker that
        sponsors each transaction, an RPC endpoint operated by a third party, and a public chain
        that stores ciphertext permanently. All three are listed below with what they can observe.
      </p>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        How a message travels
      </h2>
      <FadeUp className="mt-6 overflow-x-auto">
        <ol className="flex min-w-[720px] items-stretch gap-2">
          {FLOW.map((s, i) => (
            <li key={s.label} className="flex flex-1 items-stretch gap-2">
              <div className="flex-1 rounded-card border border-border bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-semibold text-text-primary">{s.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{s.detail}</p>
              </div>
              {i < FLOW.length - 1 && (
                <ArrowRight
                  size={18}
                  className="mt-8 flex-none text-text-muted"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </FadeUp>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        What each component can observe
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[860px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">
            PrivaMesh components, their operators, and what each can see and store
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Component</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Operated by</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">What it sees</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">
                What it stores
              </th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Replaceable</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTS.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
                  {c.name}
                  <span className="mt-1 block text-[13px] font-normal leading-relaxed text-text-muted">
                    {c.note}
                  </span>
                </th>
                <td className="px-5 py-4 text-text-secondary">{c.operator}</td>
                <td className="px-5 py-4 text-text-muted">{c.sees}</td>
                <td className="px-5 py-4 text-text-muted">{c.stores}</td>
                <td className="px-5 py-4 text-text-secondary">{c.replaceable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Why the fee worker exists</h2>
          <p>
            Every message is a Solana transaction, and transactions cost a network fee. Making users
            hold SOL to send a message would be a worse product and a worse privacy story, because
            funding a wallet is itself a linkable act. So a worker sponsors the fee instead.
          </p>
          <p>
            That creates the obvious question: does the sponsor learn who is talking to whom? It
            does not. The app proves its subscription once and receives a pool of RSA blind
            signatures; each send spends one token. The worker can verify a token is valid and
            unspent and cannot link it to the purchase or to any other token. What it sees is that
            some account paid for some send at some time.
          </p>

          <h2>What this design does not fix</h2>
          <p>
            The RPC endpoint sees your IP and the timing of your requests. The chain stores
            ciphertext permanently. Neither is hidden by anything above, which is why both are in
            the table and why{' '}
            <Link href="/limitations">the limitations page exists</Link>. If your threat model
            includes a network-level observer, pair PrivaMesh with a VPN or Tor and self-host the
            RPC.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          {
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'What PrivaMesh does not protect you from, stated plainly.',
          },
          {
            href: '/threat-model',
            label: 'Threat model',
            blurb: 'Adversary by adversary: what each one sees and what stops them.',
          },
          {
            href: '/security',
            label: 'Security and disclosure',
            blurb: 'Audit status, how to report a vulnerability, and what we commit to.',
          },
        ]}
      />
    </Container>
  )
}
