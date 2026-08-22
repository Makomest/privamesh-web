import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'

export const metadata: Metadata = pageMetadata({
  title: 'Transparency report',
  description:
    'Legal requests received by PrivaMesh, what we could hand over if compelled, and what does not exist to be handed over. Updated as the numbers change.',
  path: '/transparency',
})

const PERIOD = 'Since launch on 6 August 2026, through 16 August 2026'

const COUNTS = [
  { label: 'Government or law enforcement requests', value: '0' },
  { label: 'Court orders received', value: '0' },
  { label: 'Subpoenas received', value: '0' },
  { label: 'National security requests', value: '0' },
  { label: 'Requests where data was produced', value: '0' },
  { label: 'Accounts affected', value: '0' },
]

const FAQS = [
  {
    q: 'What could PrivaMesh actually hand over?',
    a: 'Less than the phrasing usually suggests. On the anonymous path a send authenticates with a blind token that carries no identity, so the worker sees a valid unspent token and a transaction to sponsor - not who sent it. A legacy account path still exists and is required for publishing a public discovery nickname. There is no message content, no recipient, no contact list and no connection history in either case.',
  },
  {
    q: 'Would you tell me if you received a request?',
    a: 'This page is updated when the numbers change. We cannot promise per-user notice, because some orders forbid it - which is exactly why the design aims to hold nothing worth requesting.',
  },
  {
    q: 'Is there a warrant canary?',
    a: 'No. A canary is a signal that becomes meaningful only once it disappears, and a project this small could remove one by accident. Publishing the counts and keeping them current is the more honest version of the same promise.',
  },
]

export default function TransparencyPage() {
  return (
    <Container>
      <JsonLd data={webPageLd({
          name: "PrivaMesh transparency report",
          description: "Legal requests received and what could be produced.",
          path: '/transparency',
          type: 'WebPage',
        })} />
      <PageHeader
        eyebrow="Transparency"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Transparency', path: '/transparency' },
        ]}
        title="Transparency report"
        lead="How many legal requests we have received, what we could produce if compelled, and what simply does not exist to produce."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        {PERIOD}: zero requests of any kind. This page starts at zero and will be updated when that
        changes - a report that only appears once there is something to report is not a report.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTS.map((c, i) => (
          <FadeUp
            key={c.label}
            delay={(i % 3) * 60}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <p className="text-3xl font-bold tracking-tight text-text-primary">{c.value}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{c.label}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>What exists to be handed over</h2>
          <p>
            The useful question is not how many requests arrived but what could be produced if one
            did. PrivaMesh runs one machine - a worker that pays the Solana network fee for each
            transaction. It sees an account identifier and a timestamp. It never sees plaintext, and
            it never learns who a message is for.
          </p>
          <p>
            So a compelled disclosure would show that valid tokens were spent and transactions were
            sponsored. On the anonymous path there is no account attached to a send at all; the
            legacy account path is required only for publishing a public discovery nickname, which
            identifies you by design. Either way it would not show the message, the recipient, your
            contacts or your history.{' '}
            <Link href="/architecture">The architecture page</Link> lists every component and what
            each can observe.
          </p>

          <h2>What we cannot do</h2>
          <p>
            We cannot decrypt a message, identify who you talk to, produce a contact list, restore
            your history, or delete your account - there is no account to delete. Those are not
            policy positions that a court order could change; they are consequences of not holding
            the data in the first place.
          </p>
          <p>
            The honest caveats are on <Link href="/limitations">the limitations page</Link>: the
            RPC provider sees your IP, the chain records transaction timing permanently, and neither
            of those is ours to withhold.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          { href: '/architecture', label: 'Architecture', blurb: 'Every component and what it can observe.' },
          { href: '/threat-model', label: 'Threat model', blurb: 'What each adversary sees and what stops them.' },
          { href: '/security', label: 'Security', blurb: 'Audit status and vulnerability disclosure.' },
        ]}
      />
    </Container>
  )
}
