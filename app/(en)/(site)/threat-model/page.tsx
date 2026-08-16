import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Threat model: who sees what',
  description:
    'Adversary by adversary: what the operator, RPC provider, chain observer, a stolen device and a malicious contact can each see, and what remains possible.',
  path: '/threat-model',
  languages: { en: '/threat-model', ru: '/ru/threat-model' },
})

type Adversary = {
  name: string
  sees: string
  cannot: string
  defence: string
  residual: string
}

const ADVERSARIES: Adversary[] = [
  {
    name: 'PrivaMesh, the operator',
    sees: 'That an account paid for a send, and when',
    cannot: 'Read messages, learn recipients, list your contacts, or reconstruct history',
    defence: 'No account database or message store; blind tokens unlink payment from sending',
    residual: 'We could be compelled to show that some account sent something at a given time',
  },
  {
    name: 'The RPC provider',
    sees: 'Your IP address, request timing, the transactions you submit',
    cannot: 'Decrypt anything, or tell which one-time address belongs to whom',
    defence: 'The endpoint is swappable and self-hostable',
    residual: 'A logging provider builds a network-level picture of when you are active',
  },
  {
    name: 'A chain observer',
    sees: 'Padded ciphertext, one-time addresses, exact transaction times',
    cannot: 'Read content, or link two messages in the same conversation',
    defence: 'Stealth addressing, fixed padding buckets, optional cover traffic',
    residual: 'With cover traffic off, your activity pattern over time is fully visible',
  },
  {
    name: 'A global timing analyst',
    sees: 'Correlated activity across the whole network at once',
    cannot: 'Decrypt, or link addresses cryptographically',
    defence: 'Cover traffic at random 3-10 minute intervals, when enabled',
    residual: 'This is the adversary we defend against least well; an observer of the entire network with unlimited retention is outside what any per-message design fixes',
  },
  {
    name: 'Someone holding your unlocked phone',
    sees: 'Everything: plaintext, contacts, keys',
    cannot: 'Recover messages already deleted by the ratchet',
    defence: 'Keychain storage behind Face ID or Touch ID; forward secrecy limits the past',
    residual: 'Device compromise is total for anything currently on the device',
  },
  {
    name: 'Someone who has your recovery phrase',
    sees: 'Your identity, and can impersonate you going forward',
    cannot: 'Read your past conversations - those keys no longer exist',
    defence: 'The phrase never leaves your device and is never transmitted',
    residual: 'There is no revocation. If the phrase leaks, the account is theirs too',
  },
  {
    name: 'A malicious contact',
    sees: 'Everything you send them, and can screenshot or forward it',
    cannot: 'Reach anyone else you talk to, or read other conversations',
    defence: 'Blocking, and per-conversation key separation',
    residual: 'No cryptography prevents the person you are talking to from being untrustworthy',
  },
  {
    name: 'An impostor during contact add',
    sees: 'Nothing, if verification succeeds',
    cannot: 'Substitute their key for a contact whose bundle is signed on-chain',
    defence: 'Wallet-signed prekey bundles published on-chain, verified by signature not by directory',
    residual: 'You still have to confirm you added the person you meant to add',
  },
  {
    name: 'Apple',
    sees: 'That your Apple ID bought a subscription',
    cannot: 'See messages, contacts, or link the purchase to your sending activity',
    defence: 'Blind tokens sit between the purchase and every send',
    residual: 'Apple knows you are a PrivaMesh customer, which is unavoidable on iOS',
  },
  {
    name: 'A network-level censor',
    sees: 'That you reached a Solana RPC endpoint',
    cannot: 'Read or selectively drop individual messages',
    defence: 'RPC endpoints are swappable, including to ones you run',
    residual: 'Blocking Solana or every RPC blocks delivery entirely',
  },
]

const FAQS = [
  {
    q: 'What is PrivaMesh worst at defending against?',
    a: 'A global adversary who watches the whole network continuously and keeps everything. Cover traffic raises the cost of timing correlation but does not defeat an observer at that scale, and the chain keeps a permanent record for them to work against.',
  },
  {
    q: 'If my device is seized, what is exposed?',
    a: 'Everything currently on it: plaintext, contacts and keys, unless it is locked and the attacker cannot get past Face ID. Forward secrecy limits the damage to what has not yet been deleted by the ratchet - old messages are already unrecoverable.',
  },
  {
    q: 'Can PrivaMesh be forced to hand over my data?',
    a: 'It can be asked. What exists to hand over is that an account paid for a send at a given time. There is no message content, no recipient, no contact list and no account record, because none of those are stored.',
  },
  {
    q: 'Does a VPN help?',
    a: 'Yes, against the RPC provider and a network-level observer, which are the two adversaries that see your IP. It does nothing about what is written to the chain, which is already unreadable.',
  },
]

export default function ThreatModelPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Threat model"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Threat model', path: '/threat-model' },
        ]}
        title="Who can see what, and what stops them"
        lead="A threat model is only useful if it names the adversaries it loses to as clearly as the ones it beats. Each row below lists what that adversary sees, what it cannot reach, the defence in place, and what remains possible anyway."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        PrivaMesh is designed against an operator who wants your data, a chain observer reading
        everything public, and an impostor trying to intercept a contact add. It is weakest against
        a global timing analyst and offers nothing at all against a compromised device.
      </p>

      <FadeUp className="mt-12 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[900px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">
            PrivaMesh threat model by adversary, with defences and residual risk
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Adversary</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Sees</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Cannot</th>
              <th className="px-5 py-4 text-left font-semibold text-accent">Defence</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">
                Still possible
              </th>
            </tr>
          </thead>
          <tbody>
            {ADVERSARIES.map((a) => (
              <tr key={a.name} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
                  {a.name}
                </th>
                <td className="px-5 py-4 text-text-muted">{a.sees}</td>
                <td className="px-5 py-4 text-text-muted">{a.cannot}</td>
                <td className="px-5 py-4 text-text-secondary">{a.defence}</td>
                <td className="px-5 py-4 text-text-muted">{a.residual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>What this model assumes</h2>
          <p>
            That the cryptographic primitives hold: X3DH, the Double Ratchet, AES-256-GCM and, on
            iOS 26, ML-KEM-768. That your device is not already compromised. That you verify the
            contact you are adding is the person you intended. If any of those fail, the rest of the
            design does not save you.
          </p>
          <p>
            It also assumes our implementation of those primitives is correct, which is exactly the
            assumption an{' '}
            <Link href="/security">independent audit would test and which has not happened yet</Link>
            . For the full list of what is not covered, see{' '}
            <Link href="/limitations">known limitations</Link>.
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
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'What PrivaMesh does not protect you from, in plain language.',
          },
          {
            href: '/features/metadata-protection',
            label: 'Metadata protection',
            blurb: 'Stealth addresses, padding buckets and optional cover traffic.',
          },
        ]}
      />
    </Container>
  )
}
