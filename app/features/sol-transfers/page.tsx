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
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Send SOL in Chat - Payments, Nicknames & NFT Avatars',
  description:
    'Send SOL inside an encrypted conversation. PrivaMesh has a built-in self-custodial wallet, in-chat Solana transfers, on-chain nicknames and NFT avatars.',
  path: '/features/sol-transfers',
})

export default function SolTransfersPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Send value in chat"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'SOL Transfers', path: '/features/sol-transfers' },
        ]}
        title="Send SOL in chat, own your identity on-chain"
        lead="Your account is already a self-custodial Solana wallet, so value moves the same way messages do - inside the conversation, with no exchange in the middle."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/features/seed-phrase-accounts" variant="ghost">
            How accounts work
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            Because your PrivaMesh account is a{' '}
            <Link href="/features/seed-phrase-accounts">self-custodial Solana keypair</Link>, it is
            also a wallet. That means the person you&rsquo;re chatting with is, by definition,
            someone you can pay. <strong>Send SOL in chat</strong> in a couple of taps - no address
            copying, no switching to a separate wallet app, no exchange sitting in the middle taking
            a cut.
          </p>

          <h2>A built-in, self-custodial SOL wallet</h2>
          <p>
            PrivaMesh ships with a full <strong>built-in SOL wallet</strong>. You hold the keys in
            the iOS Keychain, so it is genuinely self-custodial - PrivaMesh never touches or holds
            your funds. Check your balance, receive SOL, and send it, all from the same app you
            message in.
          </p>

          <h2>In-chat transfers that feel like messages</h2>
          <p>
            An <strong>in-chat SOL transfer</strong> rides the same rails as everything else on
            PrivaMesh: an ordinary Solana transaction, settled on mainnet-beta. Split a bill, tip a
            creator, or send money to family across borders inside the conversation you&rsquo;re
            already having. It settles in seconds for a fraction of a cent in network fees.
          </p>

          <h2>On-chain nicknames and NFT avatars</h2>
          <p>
            A raw wallet address is hard to trust at a glance. PrivaMesh lets you set{' '}
            <strong>on-chain nicknames</strong> and use <strong>NFT avatars</strong> so contacts
            show up as recognizable identities instead of long strings of characters - while still
            being fully self-custodial and verifiable. Your identity is yours, portable, and not
            rented from a platform.
          </p>

          <h2>Private by the same design</h2>
          <p>
            Payments inherit PrivaMesh&rsquo;s privacy model. Combined with{' '}
            <Link href="/features/metadata-protection">stealth addressing and the gas wallet</Link>,
            in-chat transfers avoid broadcasting a simple &ldquo;wallet A paid wallet B&rdquo; link.
            You get the convenience of chat payments without turning your conversation into a public
            ledger of who paid whom.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Transfers are real on-chain Solana transactions, so they are irreversible and cost a
            small network fee in SOL - send to the right person, because there is no chargeback. And
            keeping payments private still depends on good <strong>wallet funding hygiene</strong>:
            how SOL enters your wallet can create links no app can remove. Convenience and
            self-custody come with the responsibility of holding your own keys.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/06.png?v=2"
            alt="PrivaMesh in-chat SOL transfer screen sending a Solana payment inside an encrypted conversation on iPhone"
            sizes="(max-width: 1024px) 60vw, 360px"
          />
        </FadeUp>
      </div>

      <RelatedLinks
        links={[
          {
            href: '/features/seed-phrase-accounts',
            label: 'Seed phrase accounts',
            blurb: 'The self-custodial keypair that doubles as your wallet.',
          },
          {
            href: '/features/metadata-protection',
            label: 'Metadata protection',
            blurb: 'How stealth addresses keep in-chat payments from becoming a public trail.',
          },
          {
            href: '/features/no-servers',
            label: 'No servers',
            blurb: 'Why messages ride Solana and cost only a tiny network fee.',
          },
        ]}
      />
    </Container>
  )
}
