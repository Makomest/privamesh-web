import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import AppStoreButton from '@/components/AppStoreButton'

export const metadata: Metadata = pageMetadata({
  title: 'Why PrivaMesh Is the Most Private Messenger',
  description:
    'A truly private messenger: no servers, no phone number, no metadata, forward secrecy. See exactly why PrivaMesh is the most private messaging app.',
  path: '/privacy',
})

const FAQS = [
  {
    q: 'What makes a messenger truly private?',
    a: 'Three things most apps get partly right: content encryption, metadata protection, and no central server. PrivaMesh does all three - messages are end-to-end encrypted, stealth addresses and cover traffic hide metadata, and there is no server at all.',
  },
  {
    q: 'Is PrivaMesh more private than Signal?',
    a: 'Signal has best-in-class content encryption but still runs servers that see connection metadata and requires a phone number. PrivaMesh removes both - no server to see anything, no phone number to tie to your identity.',
  },
  {
    q: 'Can PrivaMesh read my messages?',
    a: 'No. Encryption and decryption happen on your device with keys only you hold in the iOS Keychain. There is no PrivaMesh server in the path, so there is no point at which we could read anything.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={faqPageLd(FAQS)} />
      <Container>
        <PageHeader
          eyebrow="Privacy, defined"
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Why Private', path: '/privacy' },
          ]}
          title="Why PrivaMesh is the most private messenger"
          lead="Most apps call themselves private. PrivaMesh proves it structurally: there is no server to trust, no phone number to trace, and no metadata to leak."
        >
          <div className="flex flex-wrap gap-3">
            <AppStoreButton />
            <Button href="/features/no-servers" variant="ghost">
              How it works
            </Button>
          </div>
        </PageHeader>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          <Prose>
            <p>
              Privacy is not a feature you bolt on. It is an architecture. A messenger is only as
              private as the weakest point where your data becomes visible - and for almost every
              &ldquo;private messenger,&rdquo; that point is a server. PrivaMesh is built to have no
              such point. This is what makes it, structurally, a{' '}
              <strong>truly private messenger</strong> rather than a private-ish one.
            </p>

            <h2>No servers means nothing to breach</h2>
            <p>
              There is no PrivaMesh server, no relay, and no account database. The only network
              dependency is a Solana RPC endpoint, which is swappable and self-hostable. Your
              messages are encrypted blobs living in Solana transaction memos. There is no central
              system to subpoena, breach, log, or shut down - because it does not exist. When a
              company holds your messages, a court order, a hack, or a policy change can expose
              them. PrivaMesh removes the company from the equation.{' '}
              <Link href="/features/no-servers">Read how the serverless architecture works.</Link>
            </p>

            <h2>No phone number, no email, no identity to leak</h2>
            <p>
              Traditional apps tie your account to a phone number, which ties it to your real-world
              identity. PrivaMesh does not. Your account is a <strong>BIP-39 seed phrase</strong>{' '}
              that maps to a self-custodial Solana keypair. There is no phone number and no email to
              collect, correlate, or leak. This is what an{' '}
              <strong>encrypted messenger without a phone number</strong> actually looks like - an
              anonymous messaging app where the account is a key you generate, not an identity you
              hand over.{' '}
              <Link href="/features/seed-phrase-accounts">See how seed-phrase accounts work.</Link>
            </p>

            <h2>Metadata protection, not just message encryption</h2>
            <p>
              End-to-end encryption hides <em>what</em> you say. It does nothing to hide{' '}
              <em>who</em> you talk to, <em>when</em>, and <em>how often</em> - the metadata that
              often matters more than the content. PrivaMesh treats metadata as a first-class
              threat:
            </p>
            <ul>
              <li>
                <strong>Stealth addresses</strong> - every message goes to a fresh one-time address,
                so watching the chain reveals no social graph.
              </li>
              <li>
                <strong>Cover traffic</strong> - decoy messages hide when you actually send,
                defeating timing analysis.
              </li>
              <li>
                <strong>Gas wallet</strong> - a throwaway fee payer means the wallet paying is never
                the wallet messaging.
              </li>
            </ul>
            <p>
              That combination makes PrivaMesh a{' '}
              <strong>messenger that doesn&rsquo;t collect metadata</strong> - because there is no
              collector, and the on-chain footprint is deliberately unlinkable.{' '}
              <Link href="/features/metadata-protection">Explore metadata protection.</Link>
            </p>

            <h2>Forward secrecy and post-compromise security</h2>
            <p>
              PrivaMesh uses an X3DH handshake over Curve25519 and a Double Ratchet built on HKDF
              and HMAC-SHA256. Every message is sealed with AES-256-GCM under a key that is used
              once and then deleted. If an attacker ever compromises a key, they cannot decrypt your
              past messages (forward secrecy) and the ratchet heals to lock them out of future ones
              (post-compromise security).{' '}
              <Link href="/features/e2e-encryption">Read the encryption explainer.</Link>
            </p>

            <h2>Honest about the trade-offs</h2>
            <p>
              Real privacy comes with real trade-offs, and hiding them would be dishonest. Your seed
              phrase restores your funds and identity - but <strong>not your chat history</strong>.
              That is a deliberate consequence of forward secrecy: old message keys are destroyed,
              so no one, including you, can reconstruct past messages from the seed. Sending
              messages costs a small Solana network fee in SOL. And anonymity depends on funding
              your wallet with good hygiene - how you get SOL in can matter as much as the app
              itself. We tell you this up front because a messenger that hides its trade-offs is
              hiding something.
            </p>

            <h2>The short version</h2>
            <p>
              A <strong>privacy-first messenger</strong> should not require you to trust its
              operator. PrivaMesh doesn&rsquo;t have one. Trust math, not companies.
            </p>
          </Prose>

          <FadeUp className="lg:sticky lg:top-24">
            <PhoneMockup
              src="/screenshots/05.png?v=2"
              alt="PrivaMesh message info screen showing a message stored on Solana with no server, viewable in the Solana Explorer, on iPhone"
              sizes="(max-width: 1024px) 60vw, 360px"
            />
          </FadeUp>
        </div>

        <section className="mt-16" aria-labelledby="privacy-faq">
          <h2 id="privacy-faq" className="mb-6 text-2xl font-bold tracking-tight text-text-primary">
            Privacy FAQ
          </h2>
          <FAQ items={FAQS} />
        </section>

        <RelatedLinks
          links={[
            {
              href: '/features/no-servers',
              label: 'No servers',
              blurb:
                'The serverless architecture that removes the operator you’d otherwise have to trust.',
            },
            {
              href: '/features/metadata-protection',
              label: 'Metadata protection',
              blurb:
                'Stealth addresses, cover traffic and gas wallets that hide who, when and how.',
            },
            {
              href: '/compare/privamesh-vs-signal',
              label: 'PrivaMesh vs Signal',
              blurb: 'How a serverless messenger differs from the gold standard of encrypted chat.',
            },
          ]}
        />
      </Container>
    </>
  )
}
