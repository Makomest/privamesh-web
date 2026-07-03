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
  title: 'End-to-End Encryption Explained: X3DH & Double Ratchet',
  description:
    'How PrivaMesh encrypts messages: X3DH handshake, Double Ratchet and AES-256-GCM in plain English. Forward secrecy and post-compromise security by default.',
  path: '/features/e2e-encryption',
})

export default function E2EPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="The cryptography"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'E2E Encryption', path: '/features/e2e-encryption' },
        ]}
        title="End-to-end encryption, explained for humans"
        lead="PrivaMesh uses the same proven cryptography that secures Signal - X3DH, Double Ratchet and AES-256-GCM - adapted for a serverless world. Here it is without the math."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/blog/how-double-ratchet-encryption-works" variant="ghost">
            Deep dive: Double Ratchet
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <Prose>
          <p>
            &ldquo;End-to-end encrypted&rdquo; means only the two ends - your device and your
            contact&rsquo;s - can read a message. Everything in between sees ciphertext. PrivaMesh
            takes that further: because there is <Link href="/features/no-servers">no server</Link>{' '}
            in between at all, the only ends that exist are the two of you. Three well-understood
            pieces of cryptography make it work.
          </p>

          <h2>X3DH - agreeing on a secret without meeting</h2>
          <p>
            Before two people can encrypt to each other, they need a shared secret. The{' '}
            <code>X3DH</code> (Extended Triple Diffie-Hellman) handshake, built on{' '}
            <code>Curve25519</code>, lets your devices agree on one even when one of you is offline.
            It combines several key exchanges so that a first message can be sent immediately and
            securely. PrivaMesh publishes the needed prekeys as{' '}
            <strong>wallet-signed prekey bundles in an on-chain registry</strong>, so there is no
            trusted key server that could hand out a fake key - the signature proves the key belongs
            to the right wallet. That is the anti-MITM foundation of the whole system.
          </p>

          <h2>Double Ratchet - a new key for every message</h2>
          <p>
            Once a shared secret exists, the <code>Double Ratchet</code> takes over. Using{' '}
            <code>HKDF</code> and <code>HMAC-SHA256</code>, it derives a brand-new key for every
            single message and throws the old one away. Two ratchets turn together: one advances
            with each message, the other with each reply, mixing in fresh key material. This gives
            you two powerful guarantees:
          </p>
          <ul>
            <li>
              <strong>Forward secrecy</strong> - if a key leaks today, yesterday&rsquo;s messages
              stay locked, because those keys no longer exist.
            </li>
            <li>
              <strong>Post-compromise security</strong> - if an attacker briefly gets in, the
              ratchet heals with the next exchange and locks them back out.
            </li>
          </ul>
          <p>
            <Link href="/blog/how-double-ratchet-encryption-works">
              Read the full plain-English Double Ratchet explainer.
            </Link>
          </p>

          <h2>AES-256-GCM - sealing the payload</h2>
          <p>
            The per-message key from the ratchet is used with <code>AES-256-GCM</code>, an
            authenticated encryption scheme, to seal the actual content. GCM doesn&rsquo;t just hide
            the message - it also detects tampering, so a modified ciphertext is rejected rather
            than silently decrypted wrong. Before encryption, PrivaMesh{' '}
            <strong>pads every message to a fixed-size bucket</strong>, so an observer can&rsquo;t
            infer anything from length. A one-word reply and a long paragraph look identical on the
            wire.
          </p>

          <h2>Where the keys live</h2>
          <p>
            All of this depends on keys that only you hold. PrivaMesh stores them in the{' '}
            <strong>iOS Keychain</strong> - device-only and biometric-lockable. They never sync,
            never upload, and never touch a server, because there isn&rsquo;t one.{' '}
            <Link href="/features/seed-phrase-accounts">
              See how your seed phrase and keys work.
            </Link>
          </p>

          <h2>The honest trade-off</h2>
          <p>
            Forward secrecy has a real cost: deleted keys can&rsquo;t decrypt old messages, so your
            chat history cannot be restored from your seed phrase alone. Your seed brings back your
            funds and identity, not your conversations. That&rsquo;s the price of true forward
            secrecy, and we think it&rsquo;s the right default for a{' '}
            <Link href="/privacy">privacy-first messenger</Link>.
          </p>
        </Prose>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src="/screenshots/02.png?v=2"
            alt="PrivaMesh end-to-end encrypted chat screen protected by X3DH, Double Ratchet and AES-256-GCM on iPhone"
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
              'Encryption hides content; stealth addresses and cover traffic hide the metadata.',
          },
          {
            href: '/features/no-servers',
            label: 'No servers',
            blurb: 'Why removing the server makes end-to-end encryption end-to-end for real.',
          },
          {
            href: '/blog/how-double-ratchet-encryption-works',
            label: 'Double Ratchet explained',
            blurb: 'A plain-English walkthrough of the algorithm behind forward secrecy.',
          },
        ]}
      />
    </Container>
  )
}
