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
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Security and Disclosure',
  description:
    'PrivaMesh audit status, how to report a vulnerability, what we commit to fixing and when, and which app versions receive security updates.',
  path: '/security',
  languages: { en: '/security', ru: '/ru/security' },
})

const FAQS = [
  {
    q: 'Has PrivaMesh completed an independent security audit?',
    a: 'No. Independent security audit: not completed yet. The implementation is open source and can be reviewed by anyone, but no qualified third party has signed off on it. When one is completed the report and the reviewed commit will be published here.',
  },
  {
    q: 'How do I report a vulnerability?',
    a: 'Email privamesh@proton.me with "security" in the subject line. Include the app version, your device and iOS version, and enough detail to reproduce. We aim to acknowledge within 2 business days.',
  },
  {
    q: 'Is there a bug bounty?',
    a: 'Yes. Up to $500 for a critical finding, $200 high, $75 medium, $25 low, with severity defined by what the finding breaks in our threat model. Full tiers, scope and exclusions are on the bug bounty page.',
  },
  {
    q: 'Which versions get security fixes?',
    a: 'The current App Store release. Because PrivaMesh requires iOS 26.5 or later and has shipped a single major version, there is no older branch to backport to yet.',
  },
]

export default function SecurityPage() {
  return (
    <Container>
      <JsonLd data={techArticleLd({
          headline: "Security and disclosure",
          description: "Audit status, vulnerability disclosure and response commitments.",
          path: '/security',
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })} />
      <PageHeader
        eyebrow="Security"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Security', path: '/security' },
        ]}
        title="Security and disclosure"
        lead="Audit status, how to report a vulnerability, and what we commit to. Stated plainly, including the part where the audit has not happened yet."
      />

      <div className="mt-10 max-w-3xl">
        <FadeUp className="rounded-card border border-border-accent bg-accent/[0.06] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Independent security audit: not completed yet
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                PrivaMesh builds on well-studied primitives - X3DH, the Double Ratchet,
                AES-256-GCM, and ML-KEM-768 on iOS 26. Those are proven. Our implementation of them
                has not been reviewed by a qualified third party. The source is public so it can be
                audited; until someone has, treat our claims as unverified.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                When an audit is completed this page will carry the auditor, the report as a PDF,
                the app version and the exact commit that was reviewed.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Reporting a vulnerability
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Email{' '}
            <a
              href={`mailto:${SITE.supportEmail}?subject=security`}
              className="font-medium text-accent hover:underline"
            >
              {SITE.supportEmail}
            </a>{' '}
            with <strong className="text-text-secondary">security</strong> in the subject line.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-text-muted">
            <li>Include the app version, your device model and your iOS version.</li>
            <li>Include enough detail to reproduce the issue.</li>
            <li>
              Never include your recovery phrase. We will never ask for it, for any reason, in any
              context.
            </li>
          </ul>
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
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>What we commit to</h2>
          <ul>
            <li>
              <strong>Acknowledgement within 2 business days.</strong> If you do not hear back,
              assume the mail was lost and send it again.
            </li>
            <li>
              <strong>A fix or a plan within 30 days</strong> for anything that lets someone read
              messages, impersonate an account, or link a user to their activity.
            </li>
            <li>
              <strong>Credit if you want it, silence if you do not.</strong> We will not name you
              without asking.
            </li>
            <li>
              <strong>No legal threats</strong> for good-faith research that does not target other
              people&rsquo;s accounts or data.
            </li>
          </ul>

          <h2>Rewards</h2>
          <p>
            Confirmed findings are paid through the{' '}
            <Link href="/bug-bounty">bug bounty program</Link> — up to $500 for a critical
            vulnerability, and payment happens on confirmation rather than on fix. The tiers, the
            scope and the known issues that do not qualify are all published there, because a
            program that quietly pays for its own documented gaps is not a program.
          </p>

          <h2>Supported versions</h2>
          <p>
            Security fixes go to the current App Store release. PrivaMesh requires{' '}
            <strong>iOS 26.5 or later</strong> and has shipped one major version, so there is no
            older branch to backport to. When that changes, the supported window will be stated
            here rather than implied.
          </p>

          <h2>What has been fixed</h2>
          <p>
            Nothing has been reported and fixed yet. Rather than leave this section out, it is here
            empty - a list that starts at zero and grows is more informative than a section that
            appears only once there is something flattering to put in it.
          </p>

          <h2>Scope</h2>
          <p>
            The iOS client, the on-chain protocol, and the fee worker described on{' '}
            <Link href="/architecture">the architecture page</Link> are all in scope. Third-party
            infrastructure - Solana itself, RPC providers, Apple - is not ours to fix, though we
            want to hear about it. For the boundaries of what the design protects, see{' '}
            <Link href="/threat-model">the threat model</Link> and{' '}
            <Link href="/limitations">known limitations</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          {
            href: '/threat-model',
            label: 'Threat model',
            blurb: 'Adversary by adversary: what is seen, stopped, and still possible.',
          },
          {
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'What PrivaMesh does not protect you from.',
          },
          {
            href: '/architecture',
            label: 'Architecture',
            blurb: 'Every component and what it can observe.',
          },
        ]}
      />
    </Container>
  )
}
