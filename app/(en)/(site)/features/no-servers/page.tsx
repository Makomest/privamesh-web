import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import JsonLd from '@/components/JsonLd'
import PageFaq from '@/components/PageFaq'
import References from '@/components/References'
import { pageMetadata } from '@/lib/seo'
import { FEATURE_FAQ } from '@/lib/faq'
import { softwareApplicationLd } from '@/lib/jsonld'
import { FEATURE_REFS } from '@/lib/references'
import { NO_SERVERS_TABLE } from '@/lib/data'
import DownloadButton from '@/components/DownloadButton'

export const metadata: Metadata = pageMetadata({
  title: 'Serverless Messenger: How PrivaMesh Runs Without Servers',
  description:
    'A messenger without servers. PrivaMesh has no backend to breach, subpoena or shut down. See the serverless architecture that keeps your chats on your device.',
  path: '/features/no-servers',
})

export default function NoServersPage() {
  return (
    <Container>
      <JsonLd data={softwareApplicationLd} />
      <PageHeader
        eyebrow="The differentiator"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'No Servers', path: '/features/no-servers' },
        ]}
        title="A serverless messenger with no backend to trust"
        lead="Every other messenger runs servers that hold your account and your metadata. PrivaMesh holds neither - no account database, no inbox, no message store. One worker pays your network fees, and that is the whole of what we run."
      >
        <div className="flex flex-wrap gap-3">
          <DownloadButton />
          <Button href="/features/e2e-encryption" variant="ghost">
            How the encryption works
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            When people say &ldquo;messenger without servers,&rdquo; they usually mean the servers
            are somewhere you can&rsquo;t see. PrivaMesh means something narrower and checkable: there is
            no account database, no inbox and no message store. Encrypted messages travel over a{' '}
            <strong>public, decentralized transport</strong> that no single company owns. This is
            what a genuinely <strong>decentralized messenger</strong> looks like.
          </p>

          <h2>Where your data actually lives</h2>
          <p>
            Instead of a server, a public transport carries your messages. Every piece of your data
            has a concrete home, and none of them is a company&rsquo;s database:
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-card border border-border font-mono text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="px-4 py-3 font-semibold">What</th>
                  <th className="px-4 py-3 font-semibold">Where it lives</th>
                  <th className="px-4 py-3 font-semibold">How</th>
                </tr>
              </thead>
              <tbody>
                {NO_SERVERS_TABLE.map((row) => (
                  <tr key={row.what} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-text-primary">{row.what}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.where}</td>
                    <td className="px-4 py-3 text-text-muted">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>How a message travels with no server in the middle</h2>
          <p>
            To send, PrivaMesh encrypts your message and pads it to a fixed size on your device, then
            hands the sealed blob to a public, decentralized transport, addressed to a one-time
            address. To receive, your device retrieves messages for its one-time addresses and
            decrypts them locally. The only machine we run pays the network fee for the transaction. It
            sees an account and a timestamp - never the plaintext, never the recipient.
          </p>

          <h2>Why serverless equals private</h2>
          <p>
            A server is a single point of failure for privacy. It can be hacked, subpoenaed, or
            quietly instructed to log more than it should. It can go down and take your messages
            with it. It can be sold, and its data policy with it. Remove the server and every one of
            those risks shrinks to what one worker can see. There is <strong>no inbox to breach</strong>,
            because messages are encrypted blobs only you can read. There is{' '}
            <strong>no conversation to subpoena</strong>, because no company holds one. What could
            be compelled from us is that an account paid for a send at a given time - not the
            message, not the recipient, not who you talk to.
          </p>

          <h2>No lock-in by design</h2>
          <p>
            The transport is public and swappable, so no single provider sees all your traffic. The
            fee worker is ours and is the one dependency we do control; if it went away you would
            fund transactions yourself, and your identity, contacts and history would be untouched.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            A decentralized transport means messages ride a public network rather than a private
            server you have to trust. We think never trusting an operator is worth it - and
            we&rsquo;d rather state how it works plainly than hide it.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/02.png?v=3"
            alt="PrivaMesh onboarding screen - no central server, nothing to hack or coerce, on iPhone"
            sizes="(max-width: 1024px) 60vw, 360px"
          />
        </FadeUp>
      </div>

      <PageFaq items={FEATURE_FAQ['no-servers']} />

      <References items={FEATURE_REFS['no-servers']} />

      <RelatedLinks
        links={[
          {
            href: '/features/metadata-protection',
            label: 'Metadata protection',
            blurb:
              'One-time addresses and cover traffic hide who you talk to, when, and how often.',
          },
          {
            href: '/features/e2e-encryption',
            label: 'E2E encryption',
            blurb: 'The X3DH and Double Ratchet cryptography that seals every message.',
          },
          {
            href: '/privacy-policy',
            label: 'Privacy Policy',
            blurb: 'Exactly what PrivaMesh does and does not collect - in plain language.',
          },
        ]}
      />
    </Container>
  )
}
