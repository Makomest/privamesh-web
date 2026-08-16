import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Known Limitations',
  description:
    'What PrivaMesh does not protect you from: permanent on-chain ciphertext, visible transaction timing, no audit yet, iPhone only, and unrecoverable history.',
  path: '/limitations',
})

type Limit = { title: string; body: string }

const LIMITS: Limit[] = [
  {
    title: 'Ciphertext stays on a public chain forever',
    body: 'Every message is written to Solana as padded ciphertext and never expires. It is unreadable without keys that were destroyed after use, but an adversary can record it today and keep it indefinitely. If a future break in the cryptography arrives, what was recorded is still there.',
  },
  {
    title: 'The fact and timing of a transaction are public',
    body: 'Stealth addresses hide who a message is for, and padding hides how long it was. Neither hides that a transaction happened at a particular moment. With cover traffic off, your activity pattern is visible to anyone reading the chain.',
  },
  {
    title: 'Padding reveals a bucket, not nothing',
    body: 'Plaintext is padded to 32, 64, 128, 256 or 512 bytes. An observer learns which bucket a message fell into - so a one-word reply and a 500-byte message are still distinguishable from each other, just not from anything else in the same bucket.',
  },
  {
    title: 'Cover traffic is off by default',
    body: 'The decoy mode that hides timing spends from your message allowance, so it ships disabled. Until you turn it on, timing correlation is available to anyone watching the chain. That is a deliberate trade rather than an oversight, but it means the default configuration is weaker than the maximum one.',
  },
  {
    title: 'The RPC endpoint sees your IP',
    body: 'Submitting a transaction means talking to an RPC provider, which sees your address and the timing of your requests. It is swappable and self-hostable, but out of the box you are trusting a third party with network-level metadata. Pair it with a VPN or Tor if that matters to you.',
  },
  {
    title: 'Delivery depends on Solana, the RPC and our fee worker',
    body: 'If any of the three is down or blocked in your country, sending stops. Your identity, contacts and history are unaffected because they live on your device, but PrivaMesh is not censorship-proof in the sense of always getting through.',
  },
  {
    title: 'Message history cannot be recovered',
    body: 'Forward secrecy destroys each message key after use. Your recovery phrase restores your identity and funds on a new device and never your conversations. Reinstalling the app on the same phone has the same effect.',
  },
  {
    title: 'Losing the recovery phrase loses the account',
    body: 'There is no reset, no support override and no backup we hold. Twelve words are the account. That is the direct cost of there being no account database.',
  },
  {
    title: 'No independent security audit yet',
    body: 'The primitives PrivaMesh builds on - X3DH, the Double Ratchet, AES-256-GCM, ML-KEM-768 - are well studied. Our implementation of them is not. It is open source and can be reviewed, but no qualified third party has signed off on it, and you should weight our claims accordingly.',
  },
  {
    title: 'iPhone only, and a recent one',
    body: 'PrivaMesh requires iOS 26.5 or later. There is no Android client, no desktop client and no web client. Post-quantum X-Wing needs iOS 26; older systems would fall back to the classical handshake, but the app does not run on them at all.',
  },
  {
    title: 'Features a mainstream messenger has and this does not',
    body: 'No group chats, no file or media transfer, no voice or video calls, no multi-device sync, no message search across devices. PrivaMesh is a focused one-to-one text messenger.',
  },
  {
    title: 'Anonymity is not guaranteed',
    body: 'PrivaMesh removes the identifiers it controls. It cannot stop you from revealing who you are in a message, reusing a handle from another context, or being identified by your network provider. Anonymity is a practice the architecture supports, not a switch it flips.',
  },
]

const FAQS = [
  {
    q: 'Has PrivaMesh been independently audited?',
    a: 'No. The implementation is open source and reviewable, but no qualified third party has completed a security audit. The cryptographic primitives it builds on are well studied; our use of them has not been externally verified.',
  },
  {
    q: 'Can my messages be decrypted in the future?',
    a: 'The ciphertext is on a public chain permanently, so it can be recorded and kept. Forward secrecy destroys each message key after use, and on iOS 26 the handshake mixes in ML-KEM-768 against future quantum attacks. Neither makes recorded ciphertext disappear.',
  },
  {
    q: 'Why is cover traffic disabled by default?',
    a: 'Decoy transactions spend from your message allowance, so leaving it on would quietly cost you messages. It is a setting rather than a default, which means the shipped configuration is weaker on timing than the strongest one available.',
  },
  {
    q: 'Is PrivaMesh anonymous?',
    a: 'It removes the identifiers we would otherwise hold - no phone number, no email, no account. It does not hide your IP from your network provider, and it cannot stop you identifying yourself in a conversation.',
  },
]

export default function LimitationsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Limitations"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Limitations', path: '/limitations' },
        ]}
        title="What PrivaMesh does not protect you from"
        lead="Every privacy tool has edges. Ours are listed here rather than left for you to discover, because a product that only publishes its strengths is asking to be taken on faith."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        The short version: ciphertext on a public chain is permanent, transaction timing is visible
        unless you turn cover traffic on, the RPC provider sees your IP, there is no independent
        audit yet, and message history can never be restored.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {LIMITS.map((l, i) => (
          <FadeUp
            key={l.title}
            delay={(i % 2) * 60}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{l.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{l.body}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Why this page exists</h2>
          <p>
            Absolute claims are easy to write and impossible to verify, and in a privacy product
            they cost more trust than they buy. Anyone technical enough to matter will find the
            gaps, and finding them unlisted is worse than reading them here.
          </p>
          <p>
            If something on this page is wrong or out of date, that is a bug - tell us at{' '}
            <Link href="/security">the security page</Link>. For the component-by-component view of
            who can observe what, see <Link href="/architecture">the architecture page</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          {
            href: '/architecture',
            label: 'Architecture',
            blurb: 'Every component, its operator, and what it can observe.',
          },
          {
            href: '/threat-model',
            label: 'Threat model',
            blurb: 'Adversary by adversary: what is seen, what is stopped, what remains.',
          },
          {
            href: '/security',
            label: 'Security and disclosure',
            blurb: 'Audit status and how to report a vulnerability.',
          },
        ]}
      />
    </Container>
  )
}
