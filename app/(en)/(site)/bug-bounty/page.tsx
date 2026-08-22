import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { techArticleLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Bug bounty: rewards and scope',
  description:
    'PrivaMesh pays up to $500 for a critical vulnerability. Severity tiers tied to our threat model, what is in scope, and the known issues that do not qualify.',
  path: '/bug-bounty',
})

/**
 * Severity is defined by what the finding breaks in *this* threat model, not by
 * a generic CVSS band - a bug that links a purchase to a send matters here and
 * would score low anywhere else.
 */
const TIERS = [
  {
    level: 'Critical',
    amount: '$500',
    what: 'Breaks a core guarantee',
    examples: [
      'Read message plaintext without the recipient’s device keys',
      'Impersonate an account or forge a signed prekey bundle',
      'Link sender to recipient across a conversation from public data alone',
      'Drain or debit the fee treasury beyond paying a transaction fee',
    ],
    highlight: true,
  },
  {
    level: 'High',
    amount: '$200',
    what: 'Breaks an advertised property',
    examples: [
      'Link an Apple purchase to a send, defeating the blind-token unlinkability',
      'Spend one blind token for two sponsored sends',
      'Recover ratcheted message history from the recovery phrase alone',
      'Deanonymise a sender through the relay on the anonymous path',
    ],
  },
  {
    level: 'Medium',
    amount: '$75',
    what: 'Leaks more than we document',
    examples: [
      'Metadata leak beyond what the limitations page already admits',
      'Bypass the quota or the per-caller rate limit at scale',
      'Force the client into the legacy account path without the user acting',
    ],
  },
  {
    level: 'Low',
    amount: '$25',
    what: 'Real but contained',
    examples: [
      'Crash or state corruption reachable by a malicious contact',
      'Keychain or local-storage handling weaker than documented',
      'Information disclosure with no practical path to the above',
    ],
  },
]

/** Excluding what we already published is what keeps the program honest. */
const NOT_ELIGIBLE = [
  {
    title: 'The session-opening message is recoverable from the recovery phrase',
    why: 'Documented on the limitations page. Identity, signed prekey and PQ prekey are all phrase-derived and no one-time prekeys are published, so a phrase holder can recompute the X3DH root for the first envelope of each conversation. Known, and a protocol change is required to fix it.',
  },
  {
    title: 'There is no user-facing key verification',
    why: 'Documented. Signed bundles stop key substitution by a registry; nothing confirms an account belongs to the person you meant to add. No safety number exists yet.',
  },
  {
    title: 'Cover traffic is off by default',
    why: 'Documented. Decoys spend from the message allowance, so the shipped default is weaker on timing than the maximum configuration.',
  },
  {
    title: 'Ciphertext on the chain is permanent, and transaction timing is public',
    why: 'Documented. Both are properties of using a public chain as the transport, not defects.',
  },
  {
    title: 'The RPC provider sees your IP address',
    why: 'Documented. Pair with a VPN or self-host the endpoint.',
  },
  {
    title: 'Findings in Solana, RPC providers or Apple',
    why: 'Not ours to fix. Report them upstream - though we still want to hear about it if it changes our threat model.',
  },
]

const FAQS = [
  {
    q: 'How much does PrivaMesh pay for a critical vulnerability?',
    a: 'Up to $500 for a critical finding, $200 for high, $75 for medium and $25 for low. These are small amounts by industry standards and we would rather publish real numbers we can pay than advertise a range we cannot.',
  },
  {
    q: 'What counts as critical?',
    a: 'Anything that breaks a core guarantee: reading message plaintext without device keys, impersonating an account, linking sender to recipient from public data, or debiting the fee treasury beyond a transaction fee.',
  },
  {
    q: 'Are the known limitations eligible?',
    a: 'No. Everything already published on the limitations page is out of scope - the first-message recoverability from the recovery phrase, the absence of key verification, cover traffic being off by default, permanent on-chain ciphertext and the RPC seeing your IP. A program that pays for its own published gaps is theatre.',
  },
  {
    q: 'How fast will I hear back?',
    a: 'Acknowledgement within 2 business days, a severity decision within 7, and a fix or a plan within 30 days for anything critical or high. If you do not hear back, assume the mail was lost and resend.',
  },
  {
    q: 'Can I publish my findings?',
    a: 'Yes, after a fix ships or 90 days from your report, whichever comes first. Tell us if you want credit or prefer not to be named. We will not threaten you legally for good-faith research.',
  },
  {
    q: 'What is not allowed?',
    a: 'Testing against accounts or data that are not yours, denial-of-service against the relay or the treasury, social engineering of the maintainer, physical attacks, and automated scanning that costs us sponsored transactions.',
  },
]

export default function BugBountyPage() {
  return (
    <Container>
      <JsonLd
        data={techArticleLd({
          headline: 'Bug bounty: rewards and scope',
          description:
            'Severity tiers, rewards, scope and exclusions for the PrivaMesh vulnerability reward program.',
          path: '/bug-bounty',
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })}
      />
      <PageHeader
        eyebrow="Bug bounty"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Bug bounty', path: '/bug-bounty' },
        ]}
        title="Bug bounty"
        lead="Up to $500 for a critical vulnerability. Small numbers, published honestly, with severity defined by what a finding breaks in our threat model rather than by a generic scoring band."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        PrivaMesh has not had an independent security audit. Until it does, researchers looking at
        the code are the closest thing to external review it gets — which is exactly why this
        program pays rather than asks for favours.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {TIERS.map((t, i) => (
          <FadeUp
            key={t.level}
            delay={(i % 2) * 60}
            className={`rounded-card border p-6 backdrop-blur-sm ${
              t.highlight ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-lg font-bold tracking-tight text-text-primary">{t.level}</h2>
              <span className="text-2xl font-bold tracking-tight text-accent">{t.amount}</span>
            </div>
            <p className="mt-2 font-mono text-[13px] text-text-muted">{t.what}</p>
            <ul className="mt-4 space-y-2">
              {t.examples.map((e) => (
                <li key={e} className="text-[15px] leading-relaxed text-text-secondary">
                  {e}
                </li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>

      <div className="mt-10 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">How to report</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Email{' '}
            <a
              href={`mailto:${SITE.supportEmail}?subject=security`}
              className="font-medium text-accent hover:underline"
            >
              {SITE.supportEmail}
            </a>{' '}
            with <strong className="text-text-secondary">security</strong> in the subject line.
            Include the app version, your device and iOS version, reproduction steps, and what you
            believe the impact is. Do not open a public issue.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-btn border border-border-accent bg-accent/[0.06] p-4">
            <AlertTriangle size={18} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
            <p className="text-[15px] leading-relaxed text-text-secondary">
              Never include a recovery phrase in a report — yours or anyone else’s. We will never
              ask for one.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            <a
              href={`mailto:${SITE.supportEmail}?subject=security`}
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Mail size={15} aria-hidden="true" />
              Report a vulnerability
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              Source code
            </a>
            <Link href="/protocol" className="text-text-muted hover:text-accent">
              Protocol details
            </Link>
          </div>
        </FadeUp>
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Not eligible: things we already published
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-muted">
        These are real weaknesses. They are also already on{' '}
        <Link href="/limitations" className="text-accent hover:underline">
          the limitations page
        </Link>
        , so reporting them earns thanks rather than a payout.
      </p>
      <div className="mt-6 space-y-3">
        {NOT_ELIGIBLE.map((n) => (
          <FadeUp
            key={n.title}
            className="rounded-card border border-border bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            <h3 className="font-semibold text-text-primary">{n.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{n.why}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Scope</h2>
          <p>
            In scope: the iOS client, the on-chain protocol described on{' '}
            <Link href="/protocol">the protocol page</Link>, and the fee worker under{' '}
            <code>relay/</code> in the public repository — including its blind-token issuance,
            single-spend tracking, quota handling and treasury guard.
          </p>
          <p>
            Out of scope: Solana itself, third-party RPC providers, Apple platform issues, anything
            requiring physical access to an unlocked device, social engineering, and denial-of-service.
            Please do not run automated scanning against the relay — every sponsored transaction it
            signs costs real money, and a scanner can exhaust the daily cap for everyone.
          </p>

          <h2>What we commit to</h2>
          <ul>
            <li>
              <strong>Acknowledgement within 2 business days</strong>, a severity decision within 7.
            </li>
            <li>
              <strong>A fix or a written plan within 30 days</strong> for critical and high findings.
            </li>
            <li>
              <strong>Payment on confirmation</strong>, not on fix. If we agree it is critical, you
              are paid whether or not the fix ships quickly.
            </li>
            <li>
              <strong>Credit if you want it, silence if you do not.</strong>
            </li>
            <li>
              <strong>No legal threats</strong> for good-faith research that respects the rules above.
            </li>
            <li>
              <strong>Publication after a fix ships or 90 days</strong>, whichever is first.
            </li>
          </ul>

          <h2>Why the amounts are small</h2>
          <p>
            Because they are real. PrivaMesh is a small project with no funding behind it, and a
            published $500 that gets paid is worth more than an advertised range that turns into a
            negotiation. If the program outgrows these numbers, they go up here first.
          </p>
          <p>
            Duplicate reports are paid to whoever reported first. Findings already known to us
            internally are disclosed as such, with the date we recorded them.{' '}
            <Link href="/security">The security page</Link> tracks fixes as they ship.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          {
            href: '/protocol',
            label: 'Protocol',
            blurb: 'Wire formats, KDF labels and relay endpoints - start here.',
          },
          {
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'What is already documented, and therefore not eligible.',
          },
          {
            href: '/security',
            label: 'Security',
            blurb: 'Audit status and disclosure policy.',
          },
        ]}
      />
    </Container>
  )
}
