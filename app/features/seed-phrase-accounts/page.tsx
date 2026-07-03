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
  title: 'Messenger With No Phone Number - Seed Phrase Login',
  description:
    'An encrypted messenger with no phone number and no email. Your PrivaMesh account is a BIP-39 seed phrase stored in the iOS Keychain.',
  path: '/features/seed-phrase-accounts',
})

export default function SeedPhrasePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="No phone, no email"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'Seed Phrase Accounts', path: '/features/seed-phrase-accounts' },
        ]}
        title="An encrypted messenger with no phone number"
        lead="No phone number. No email. No sign-up form. Your account is a BIP-39 seed phrase that only you hold - the cleanest way to stay anonymous."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/privacy" variant="ghost">
            Why it&rsquo;s private
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            The moment an app asks for your phone number, your &ldquo;anonymous&rdquo; account is
            tied to your real identity, your carrier, and often your name on file. PrivaMesh never
            asks. There is no phone number, no email, and no account on any server - because there
            is <Link href="/features/no-servers">no server</Link>. This is what a{' '}
            <strong>private chat app with no phone number</strong> actually requires.
          </p>

          <h2>Your account is a seed phrase</h2>
          <p>
            When you open PrivaMesh, it generates a <strong>BIP-39 seed phrase</strong> - the same
            standard used by self-custodial crypto wallets - which derives a{' '}
            <strong>self-custodial Solana keypair</strong>. That keypair is your identity. There is
            no username to register, no email to confirm, and no{' '}
            <strong>messenger no email required</strong> asterisk: the account is math you generate
            on your own device, not a record in someone else&rsquo;s database.
          </p>

          <h2>Keys stay in the iOS Keychain</h2>
          <p>
            Your keys are stored in the <strong>iOS Keychain</strong>, device-only and
            biometric-lockable with Face ID or Touch ID. They never leave the phone, never sync to a
            cloud, and never touch a server. Your contacts and chat history live on the device the
            same way - never uploaded, never mirrored. If it&rsquo;s not on your phone, it
            doesn&rsquo;t exist anywhere.
          </p>

          <h2>Anti-MITM discovery without a key server</h2>
          <p>
            &ldquo;No phone number&rdquo; usually raises a question: how do you find and verify a
            contact&rsquo;s key without a trusted directory? PrivaMesh answers with{' '}
            <strong>wallet-signed prekey bundles in an on-chain registry</strong>. A contact&rsquo;s
            key material is signed by their wallet and published on Solana, so you can verify it
            cryptographically instead of trusting a key server that could hand out an
            impostor&rsquo;s key. It&rsquo;s a{' '}
            <Link href="/features/e2e-encryption">stronger anti-MITM foundation</Link> than the
            centralized directories other apps rely on.
          </p>

          <h2>One seed, many unlinkable identities</h2>
          <p>
            Because your identity is just keys, you can run{' '}
            <strong>unlinkable multi-accounts</strong> from the same app - separate personas that
            cannot be tied together on-chain. Keep work and personal apart, or spin up a throwaway
            identity, without a phone number for each.
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Self-custody means you are truly in control - and truly responsible. If you lose your
            seed phrase and your device, there is no &ldquo;forgot password&rdquo; and no support
            desk that can recover your account, because no one else ever had it. And restoring your
            seed brings back your funds and identity, but <strong>not your chat history</strong>,
            which forward secrecy intentionally makes unrecoverable. Write your seed phrase down and
            store it safely - that is the one job self-custody asks of you.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/01.png?v=2"
            alt="PrivaMesh onboarding screen - account is a seed phrase, no phone number or email required, on iPhone"
            sizes="(max-width: 1024px) 60vw, 360px"
          />
        </FadeUp>
      </div>

      <RelatedLinks
        links={[
          {
            href: '/features/e2e-encryption',
            label: 'E2E encryption',
            blurb: 'How on-chain prekey bundles verify keys without a trusted key server.',
          },
          {
            href: '/features/sol-transfers',
            label: 'SOL transfers',
            blurb: 'Your keypair is also a wallet - send value right inside a chat.',
          },
          {
            href: '/features/metadata-protection',
            label: 'Metadata protection',
            blurb: 'No phone number is only step one; stealth addresses hide the rest.',
          },
        ]}
      />
    </Container>
  )
}
