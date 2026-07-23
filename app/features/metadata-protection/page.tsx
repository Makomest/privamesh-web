import type { Metadata } from 'next'
import Link from 'next/link'
import { EyeOff, Shuffle, Ruler } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import { pageMetadata } from '@/lib/seo'
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Metadata Protection: Hide Who, When & How You Message',
  description:
    'A messenger that doesn’t collect metadata. PrivaMesh uses one-time addresses, cover traffic and fixed-size padding to hide who you talk to, when, and how much.',
  path: '/features/metadata-protection',
})

const CARDS = [
  {
    icon: EyeOff,
    title: 'One-time addresses',
    text: 'A fresh one-time address per message hides the social graph.',
  },
  { icon: Shuffle, title: 'Cover traffic', text: 'Decoy messages hide when you actually send.' },
  {
    icon: Ruler,
    title: 'Fixed-size padding',
    text: 'Uniform message size hides how much you say.',
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
          <Button href="/privacy-policy" variant="ghost">
            Privacy Policy
          </Button>
        </div>
      </PageHeader>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <FadeUp key={c.title} delay={i * 70}>
            <div className="h-full rounded-card border border-border bg-white/[0.03] backdrop-blur-sm p-5">
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
            observer knows that A messaged B at 2:14am, then again after B replied, they&rsquo;ve
            learned the relationship, the rhythm, and the timing - without reading a single word.
            That is metadata, and most messengers leak it freely. PrivaMesh is engineered so it
            doesn&rsquo;t. This is what makes it a genuine{' '}
            <strong>messenger that doesn&rsquo;t collect metadata</strong>: there is no collector,
            and the delivery trail is deliberately unlinkable.
          </p>

          <h2>One-time addresses - hide who</h2>
          <p>
            Every message is delivered to a <strong>fresh one-time address</strong> that only the
            intended recipient can recognize. Two messages to the same person go to two
            unrelated-looking addresses. An observer sees a scatter of one-off addresses with no way
            to cluster them into a conversation or a social graph. The <em>who talks to whom</em>{' '}
            simply isn&rsquo;t written down anywhere.
          </p>

          <h2>Cover traffic - hide when</h2>
          <p>
            Timing is its own leak. If your real messages are the only activity you ever produce,
            their timing reveals your pattern. PrivaMesh mixes in <strong>cover traffic</strong> -
            decoy messages indistinguishable from real ones - so an observer cannot tell a genuine
            send from noise. Frequency analysis and timing correlation lose their signal.
          </p>

          <h2>Fixed-size padding - hide how much</h2>
          <p>
            Message length leaks meaning too - a one-word &ldquo;yes&rdquo; and a long confession
            look very different if their sizes differ. PrivaMesh <strong>pads every message to a
            fixed size</strong> before sealing it, so a short reply and a long paragraph are
            identical on the wire. A separate fee payer covers any network cost, so the account
            paying is never the account sending.
          </p>

          <h2>Why this needs no server to work</h2>
          <p>
            None of this relies on a trusted party promising not to look. It is built into how
            messages are addressed and delivered. Because there is{' '}
            <Link href="/features/no-servers">no PrivaMesh server</Link>, there is also no
            server-side log of IP addresses, timestamps, or contact lists - the metadata most apps
            leak first.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Metadata protection is strong but not magic. Your anonymity still depends on good
            operational hygiene - for example, the network you connect from. Good practice matters.
            We&rsquo;d rather tell you where the edges are than pretend they don&rsquo;t exist.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/06.png?v=3"
            alt="PrivaMesh private social graph hiding who talks to whom, no phone numbers, on iPhone"
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
            href: '/privacy-policy',
            label: 'Privacy Policy',
            blurb: 'What PrivaMesh does and does not collect, in plain language.',
          },
        ]}
      />
    </Container>
  )
}
