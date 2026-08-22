import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import References from '@/components/References'
import { pageMetadata } from '@/lib/seo'
import { techArticleLd } from '@/lib/jsonld'
import { REF } from '@/lib/references'
import { SITE } from '@/lib/site'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Protocol: wire formats and key derivation',
  description:
    'The actual PrivaMesh wire formats, HKDF labels, padding buckets and relay endpoints - taken from the shipping source, with what is still unproven stated.',
  path: '/protocol',
})

/** Every value here is read off the shipping source, not the marketing copy. */
const WIRE = [
  {
    name: 'Session-init envelope',
    format: '[0x01] [IK_A: 32] [EK_A: 32] [EncryptedMessage]',
    note: 'First message to a contact. Carries the sender identity and ephemeral public keys so a stranger can be decrypted with no prior contact record. Base64-encoded into the Solana memo.',
  },
  {
    name: 'Regular envelope',
    format: '[0x00] [EncryptedMessage]',
    note: 'Every subsequent message. The session is already established, so no key material rides along.',
  },
  {
    name: 'Prekey bundle',
    format: '[flags: 1] [IK: 32] [SPK: 32] [SPK signature: 64] (+[OPK: 32] if bit0)',
    note: 'Published to the on-chain registry. Bit 0 signals a one-time prekey. The shipping client always publishes it unset - see the gap below.',
  },
  {
    name: 'Padding buckets',
    format: '32 · 64 · 128 · 256 · 512 bytes',
    note: 'Plaintext is padded to the next bucket before encryption. The 512 ceiling exists because a larger memo exceeds Solana’s 1232-byte transaction limit.',
  },
]

const KDF = [
  {
    label: 'Identity derivation',
    detail:
      'HKDF-SHA256(IKM = phrase, salt = "PrivaMesh-msg-identity-v1", info = label) for labels dhIdentityKey, signingKey, signedPrekey and pqPrekey.',
  },
  {
    label: 'Root key ratchet',
    detail: 'KDF_RK = HKDF-SHA256(salt = root key, IKM = DH output, info = "PrivaMesh-DR-RK").',
  },
  {
    label: 'Stealth address',
    detail:
      'address(root, label, index) = HKDF-SHA256(IKM = root, salt = label, info = index) → Ed25519 public key. label fixes the direction, index is a per-direction counter.',
  },
  {
    label: 'Payload encryption',
    detail: 'AES-256-GCM under the per-message key produced by the symmetric ratchet.',
  },
]

const RELAY = [
  { ep: 'GET /pubkey', body: '—', note: 'The blind-signature issuer public key (N, E). The private exponent stays a Worker secret.' },
  { ep: 'POST /issue', body: '{ jws, blinded }', note: 'Verifies an Apple receipt and returns blind signatures. This is where payment is proven - once.' },
  { ep: 'POST /send', body: '{ tx, token }', note: 'Anonymous path. Verifies the token is valid and unspent, co-signs the fee-payer slot, submits. No account is sent.' },
  { ep: 'POST /send', body: '{ tx, jws, account }', note: 'Legacy path, and the only one accepted for publishing a public discovery nickname.' },
  { ep: 'POST /credit', body: '{ jws, account }', note: 'Adds a consumable message pack to an account balance.' },
]

const FAQS = [
  {
    q: 'Are there test vectors?',
    a: 'Not published yet. Wire formats and KDF labels are documented here and readable in the source, but there is no vector file another implementation could check itself against. That is the next thing this page needs.',
  },
  {
    q: 'Has the protocol been formally analysed?',
    a: 'No. The primitives - X3DH, the Double Ratchet, AES-256-GCM, ML-KEM-768 - carry their own analysis. This particular composition of them has had no formal treatment and no independent audit.',
  },
  {
    q: 'Why is naming X3DH and the Double Ratchet not enough?',
    a: 'Because a protocol is the composition, not the ingredient list. Where key material comes from, whether one-time prekeys are consumed, how the transport interacts with retries - those decide whether the properties hold. Two of ours are documented below as open.',
  },
  {
    q: 'Where is the fee worker source?',
    a: 'In the same public repository as the client, under relay/. It is a Cloudflare Worker: blind-token issuance and verification, single-spend tracking, quota and rate limits, and transaction co-signing.',
  },
]

export default function ProtocolPage() {
  return (
    <Container>
      <JsonLd
        data={techArticleLd({
          headline: 'Protocol: wire formats and key derivation',
          description:
            'PrivaMesh wire formats, HKDF labels, padding buckets and relay endpoints, taken from the shipping source.',
          path: '/protocol',
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })}
      />
      <PageHeader
        eyebrow="Protocol"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Protocol', path: '/protocol' },
        ]}
        title="Wire formats and key derivation"
        lead="Naming X3DH and the Double Ratchet proves nothing on its own - a protocol is the composition, not the ingredient list. These are the actual formats and labels from the shipping source, including the two places where the composition is weaker than the primitives."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        Everything below is read off the code in{' '}
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          the public repository
        </a>
        , client and relay alike. Where something is unproven or missing, it is marked rather than
        omitted.
      </p>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Wire formats
      </h2>
      <div className="mt-6 space-y-4">
        {WIRE.map((w, i) => (
          <FadeUp key={w.name} delay={(i % 2) * 60} className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-text-primary">{w.name}</h3>
            <pre className="mt-3 overflow-x-auto rounded-btn border border-border bg-black/40 p-3 font-mono text-[13px] text-accent">
              {w.format}
            </pre>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{w.note}</p>
          </FadeUp>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Key derivation
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">PrivaMesh key derivation functions and labels</caption>
          <tbody>
            {KDF.map((k) => (
              <tr key={k.label} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="w-56 px-5 py-4 text-left font-medium text-text-primary">
                  {k.label}
                </th>
                <td className="px-5 py-4 font-mono text-[13px] leading-relaxed text-text-muted">
                  {k.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Relay endpoints
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">Fee worker endpoints and payloads</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Endpoint</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Body</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">What it does</th>
            </tr>
          </thead>
          <tbody>
            {RELAY.map((r, i) => (
              <tr key={r.ep + i} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-left font-mono text-[13px] font-medium text-accent">
                  {r.ep}
                </th>
                <td className="px-5 py-4 font-mono text-[13px] text-text-secondary">{r.body}</td>
                <td className="px-5 py-4 text-text-muted">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-text-muted">
        Abuse controls sit in the same Worker: a per-caller sliding-window rate limit defaulting to
        20 sends a minute, a global daily cap on sponsored transactions, and atomic single-spend
        tracking so one token cannot fund two sends. A treasury guard refuses to co-sign any
        transaction that would debit the treasury rather than only pay its fee.
      </p>

      <div className="mt-16 max-w-3xl">
        <Prose>
          <h2>Where the composition is weaker than the primitives</h2>
          <p>
            <strong>One-time prekeys are never published.</strong> The bundle format reserves a flag
            and a slot for them, and the client always sends the slot empty. Combined with identity,
            signed prekey and PQ prekey all being HKDF-derived from the recovery phrase, this means a
            phrase holder can recompute the X3DH root for the session-opening envelope of every
            conversation - and those envelopes are on the chain permanently.{' '}
            <Link href="/limitations">This is documented as a limitation</Link> rather than argued
            away. Fixing it needs consumed one-time prekeys or a rotating non-deterministic signed
            prekey.
          </p>
          <p>
            <strong>There is no user-facing key verification.</strong> Prekey bundles are signed, so
            the registry cannot hand out a key that does not belong to the publishing account. But
            nothing lets you confirm that the account belongs to the person you meant to add. There
            is no safety number, no fingerprint comparison and no out-of-band check in the shipping
            app. Against an attacker who can get you to add the wrong account, the signature does
            not help.
          </p>

          <h2>What would actually constitute proof</h2>
          <p>
            None of the above is proof, and it is not offered as such. What would be: published test
            vectors another implementation can verify itself against; a formal or symbolic analysis
            of this composition rather than of its parts; and an independent audit of the
            implementation. <Link href="/security">None of the three exists yet</Link>. Until they
            do, this page is a description you can check against the source, which is a weaker claim
            than a proof and an honest one.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <References
        items={[REF.x3dh, REF.doubleRatchet, REF.aesGcm, REF.curve25519, REF.rfc5869, REF.solanaMemo]}
      />

      <RelatedLinks
        links={[
          { href: '/architecture', label: 'Architecture', blurb: 'Every component and what it can observe.' },
          { href: '/threat-model', label: 'Threat model', blurb: 'Adversary by adversary, with residual risk.' },
          { href: '/security', label: 'Security', blurb: 'Audit status and vulnerability disclosure.' },
        ]}
      />
    </Container>
  )
}
