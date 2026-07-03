import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { NO_SERVERS_TABLE } from '@/lib/data'
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Serverless Messenger: How PrivaMesh Runs Without Servers',
  description:
    'A messenger without servers. PrivaMesh stores encrypted messages on Solana - no backend to breach, subpoena or shut down. See the serverless architecture.',
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
        lead="Every other messenger runs servers that see your metadata. PrivaMesh runs on Solana instead - there is no PrivaMesh server to breach, subpoena, log, or shut down."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href={SITE.whitepaper} external variant="ghost">
            Read the White Paper
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            When people say &ldquo;messenger without servers,&rdquo; they usually mean the servers
            are somewhere you can&rsquo;t see. PrivaMesh means it literally. There is no PrivaMesh
            backend, no relay, and no account database anywhere. The app&rsquo;s only network
            dependency is a <strong>Solana RPC endpoint</strong> - and even that is swappable and
            self-hostable. This is what a genuinely <strong>decentralized messenger</strong> looks
            like.
          </p>

          <h2>Where your data actually lives</h2>
          <p>
            Instead of a server, the Solana blockchain is the transport. Every piece of your data
            has a concrete home, and none of them is a company&rsquo;s database:
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-card bg-white/20 backdrop-blur-sm">
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
            To send, PrivaMesh encrypts your message, pads it to a fixed-size bucket, and wraps it
            in a <strong>0-lamport Solana transaction</strong> - a transaction that moves no money,
            carrying your ciphertext in the memo field. It is addressed to a one-time stealth
            address. To receive, your device scans the chain for transactions to your stealth
            addresses and decrypts them locally. At no point does a PrivaMesh machine handle your
            message, because there is no PrivaMesh machine.
          </p>

          <h2>Why serverless equals private</h2>
          <p>
            A server is a single point of failure for privacy. It can be hacked, subpoenaed, or
            quietly instructed to log more than it should. It can go down and take your messages
            with it. It can be sold, and its data policy with it. Remove the server and every one of
            those risks disappears at once. There is <strong>nothing to breach</strong> because your
            messages are spread across a public chain as encrypted blobs only you can read. There is{' '}
            <strong>nothing to subpoena</strong> because no company holds your conversations. And
            there is <strong>nothing to shut down</strong> - as long as Solana runs, PrivaMesh runs.
          </p>

          <h2>Self-hostable by design</h2>
          <p>
            The RPC endpoint is the one piece that talks to the network, and you are never locked
            into ours. Point PrivaMesh at any Solana RPC, including one you run yourself, and the
            app keeps working. Nobody can cut you off, and no single provider sees all your traffic.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Serverless transport means messages ride real Solana transactions, so each one costs a
            tiny network fee in SOL. We think never trusting an operator is worth a fraction of a
            cent per message - and we&rsquo;d rather state the cost plainly than hide it.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/05.png?v=2"
            alt="PrivaMesh message info screen - a message stored on Solana with no server, openable in the Solana Explorer, on iPhone"
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
              'Stealth addresses and cover traffic hide the on-chain footprint of a serverless messenger.',
          },
          {
            href: '/features/e2e-encryption',
            label: 'E2E encryption',
            blurb: 'The X3DH and Double Ratchet cryptography that seals every blob on the chain.',
          },
          {
            href: '/compare/privamesh-vs-signal',
            label: 'PrivaMesh vs Signal',
            blurb: 'Signal is excellent but runs servers. See what removing them changes.',
          },
        ]}
      />
    </Container>
  )
}
