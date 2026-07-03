import type { Metadata } from 'next'
import Link from 'next/link'
import { EyeOff, Shuffle, Wallet } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Metadata Protection: Hide Who, When & How You Message',
  description:
    'A messenger that doesn’t collect metadata. PrivaMesh uses stealth addresses, cover traffic and a gas wallet to hide who you talk to, when, and who pays.',
  path: '/features/metadata-protection',
})

const CARDS = [
  {
    icon: EyeOff,
    title: 'Stealth addresses',
    text: 'A fresh one-time address per message hides the social graph.',
  },
  { icon: Shuffle, title: 'Cover traffic', text: 'Decoy messages hide when you actually send.' },
  {
    icon: Wallet,
    title: 'Gas wallet',
    text: 'A throwaway fee payer hides who pays for a message.',
  },
]

export default function MetadataPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Hide who, when, how"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'Metadata Protection', path: '/features/metadata-protection' },
        ]}
        title="The metadata-private messenger"
        lead="Encryption hides what you say. Metadata - who, when and how often - is what surveillance actually runs on. PrivaMesh hides that too."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/privacy" variant="ghost">
            Why it&rsquo;s private
          </Button>
        </div>
      </PageHeader>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <FadeUp key={c.title} delay={i * 70}>
            <div className="h-full rounded-card border border-border bg-white/20 backdrop-blur-sm p-5">
              <c.icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-text-primary">{c.title}</h2>
              <p className="mt-1.5 text-sm text-text-muted">{c.text}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            Two people can exchange perfectly encrypted messages and still be fully exposed. If an
            observer knows that address A messaged address B at 2:14am, then again after B replied,
            they&rsquo;ve learned the relationship, the rhythm, and the timing - without reading a
            single word. That is metadata, and on a public blockchain it would normally be trivial
            to collect. PrivaMesh is engineered so it isn&rsquo;t. This is what makes it a genuine{' '}
            <strong>messenger that doesn&rsquo;t collect metadata</strong>: there is no collector,
            and the on-chain trail is deliberately unlinkable.
          </p>

          <h2>Stealth addresses - hide who</h2>
          <p>
            Every message is sent to a <strong>fresh one-time stealth address</strong> derived so
            that only the intended recipient can recognize and spend it. Two messages to the same
            person go to two unrelated-looking addresses. Anyone scanning Solana sees a scatter of
            one-off addresses with no way to cluster them into a conversation or a social graph. The{' '}
            <em>who talks to whom</em> simply isn&rsquo;t written down anywhere.
          </p>

          <h2>Cover traffic - hide when</h2>
          <p>
            Timing is its own leak. If your real messages are the only transactions you ever
            produce, their timing reveals your activity pattern. PrivaMesh mixes in{' '}
            <strong>cover traffic</strong> - decoy messages indistinguishable from real ones - so
            that an observer watching the chain cannot tell a genuine send from noise. Frequency
            analysis and timing correlation lose their signal.
          </p>

          <h2>Gas wallet - hide who pays</h2>
          <p>
            Solana transactions need a fee payer, and a naive design would let the paying wallet
            unmask the sender. PrivaMesh uses a <strong>throwaway gas wallet</strong> as the fee
            payer, so the wallet funding a transaction is never the wallet sending the message.
            Combined with <strong>unlinkable multi-accounts</strong> - you can run several
            identities that can&rsquo;t be tied together - the payment trail stops pointing back at
            you.
          </p>

          <h2>Why this needs no server to work</h2>
          <p>
            None of this relies on a trusted party promising not to look. It is built into how
            messages are addressed and paid for on-chain. Because there is{' '}
            <Link href="/features/no-servers">no PrivaMesh server</Link>, there is also no
            server-side log of IP addresses, timestamps, or contact lists - the metadata most apps
            leak first.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Metadata protection is strong but not magic. Your anonymity still depends on{' '}
            <strong>wallet funding hygiene</strong>: if you fund your gas wallet from an exchange
            account tied to your identity, you create a link the app can&rsquo;t erase. Good
            practice matters. We&rsquo;d rather tell you where the edges are than pretend they
            don&rsquo;t exist.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/03.png?v=2"
            alt="PrivaMesh metadata protection screen showing stealth addresses and cover traffic hiding who, when and how on iPhone"
            sizes="(max-width: 1024px) 60vw, 360px"
          />
        </FadeUp>
      </div>

      <RelatedLinks
        links={[
          {
            href: '/features/no-servers',
            label: 'No servers',
            blurb: 'No backend means no server-side metadata logs to leak in the first place.',
          },
          {
            href: '/features/e2e-encryption',
            label: 'E2E encryption',
            blurb: 'Metadata hides who and when; encryption hides what.',
          },
          {
            href: '/compare/privamesh-vs-signal',
            label: 'PrivaMesh vs Signal',
            blurb: 'Signal protects content well but still handles connection metadata.',
          },
        ]}
      />
    </Container>
  )
}
