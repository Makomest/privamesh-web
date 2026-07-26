import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'PrivaMesh Terms of Use. Acceptable use, our zero-tolerance policy for objectionable content, block and report tools, and the terms of the PrivaMesh+ subscription.',
  path: '/terms',
})

const UPDATED = 'July 15, 2026'

export default function TermsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Legal"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Terms of Use', path: '/terms' },
        ]}
        title="Terms of Use"
        lead="These terms govern your use of the PrivaMesh app and website. Please read them before using PrivaMesh."
      />

      <div className="mt-12 max-w-3xl">
        <Prose>
          <p className="text-sm text-text-muted">Last updated: {UPDATED}</p>

          <h2>1. Acceptance</h2>
          <p>
            By downloading, installing, or using PrivaMesh, you agree to these Terms of Use. If you
            do not agree, do not use the app.
          </p>

          <h2>2. License</h2>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable license to use
            PrivaMesh on Apple devices you own or control, subject to these terms and the Apple Media
            Services Terms.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 13 years old, or the minimum age of digital consent in your country,
            to use PrivaMesh.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to use PrivaMesh to:</p>
          <ul>
            <li>Break the law or facilitate illegal activity.</li>
            <li>Harass, threaten, abuse, or harm another person.</li>
            <li>Distribute content that is unlawful, exploitative, or that sexualizes minors.</li>
            <li>Send spam, malware, or attempt to compromise other users or the service.</li>
            <li>Infringe the intellectual property or privacy rights of others.</li>
          </ul>

          <h2>5. User content and our zero-tolerance policy</h2>
          <p>
            PrivaMesh lets people send messages directly to one another. You are solely responsible
            for the content you send. We operate a <strong>zero-tolerance policy for objectionable
            content and abusive behavior</strong>. Because PrivaMesh is end-to-end encrypted and
            serverless, we cannot read your messages - so enforcement relies on tools we put directly
            in your hands:
          </p>
          <ul>
            <li>
              <strong>Block</strong> - you can block any user at any time, immediately stopping all
              messages from them on your device.
            </li>
            <li>
              <strong>Report</strong> - you can report abusive users or content. Reports are acted on
              promptly, and we may restrict the reported party&rsquo;s ability to interact with
              others where our tooling allows.
            </li>
          </ul>
          <p>
            Users who engage in abusive or objectionable behavior may be ejected from the service to
            the extent technically possible. We aim to act on valid reports of objectionable content
            within 24 hours.
          </p>

          <h2>6. PrivaMesh+ subscription</h2>
          <p>
            PrivaMesh offers an optional subscription, PrivaMesh+, sold through Apple&rsquo;s in-app
            purchase system. Subscriptions renew automatically unless cancelled at least 24 hours
            before the end of the current period. You manage and cancel subscriptions in your Apple
            account settings. Core privacy features are never paywalled.
          </p>

          <h2>7. No warranty</h2>
          <p>
            PrivaMesh is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
            warranties of any kind. We do not guarantee that the app will be uninterrupted,
            error-free, or that messages will always be delivered.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, PrivaMesh is not liable for any indirect,
            incidental, or consequential damages arising from your use of the app.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may update these terms from time to time. Continued use after changes take effect
            constitutes acceptance of the updated terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms? Email{' '}
            <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
          </p>
        </Prose>
      </div>
    </Container>
  )
}
