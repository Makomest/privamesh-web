import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import { pageMetadata } from '@/lib/seo'
import { NO_SERVERS_TABLE } from '@/lib/data'
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Serverless Messenger: How PrivaMesh Runs Without Servers',
  description:
    'A messenger without servers. PrivaMesh has no backend to breach, subpoena or shut down. See the serverless architecture that keeps your chats on your device.',
  path: '/features/no-servers',
})

export default function NoServersPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="The differentiator"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'No Servers', path: '/features/no-servers' },
        ]}
        title="A serverless messenger with no backend to trust"
        lead="Every other messenger runs servers that see your metadata. PrivaMesh has none - there is no PrivaMesh server to breach, subpoena, log, or shut down."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/features/e2e-encryption" variant="ghost">
            How the encryption works
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            When people say &ldquo;messenger without servers,&rdquo; they usually mean the servers
            are somewhere you can&rsquo;t see. PrivaMesh means it literally. There is no PrivaMesh
            backend, no relay, and no account database anywhere. Encrypted messages travel over a{' '}
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
            decrypts them locally. At no point does a PrivaMesh machine handle your message, because
            there is no PrivaMesh machine.
          </p>

          <h2>Why serverless equals private</h2>
          <p>
            A server is a single point of failure for privacy. It can be hacked, subpoenaed, or
            quietly instructed to log more than it should. It can go down and take your messages
            with it. It can be sold, and its data policy with it. Remove the server and every one of
            those risks disappears at once. There is <strong>nothing to breach</strong> because your
            messages are just encrypted blobs only you can read. There is{' '}
            <strong>nothing to subpoena</strong> because no company holds your conversations. And
            there is <strong>nothing to shut down</strong> because there is no central service to
            switch off.
          </p>

          <h2>No lock-in by design</h2>
          <p>
            The transport is public and swappable. PrivaMesh is never tied to infrastructure we
            control, so nobody can cut you off and no single provider sees all your traffic.
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
