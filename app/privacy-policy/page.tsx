import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'PrivaMesh Privacy Policy. No phone number, no email, no account servers. Your keys and chats stay on your device and are end-to-end encrypted.',
  path: '/privacy-policy',
})

const UPDATED = 'July 15, 2026'

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Legal"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
        title="Privacy Policy"
        lead="PrivaMesh is a private, end-to-end encrypted messenger. This policy explains what the app does and does not collect. In short: almost nothing, because there is no server."
      />

      <div className="mt-12 max-w-3xl">
        <Prose>
          <p className="text-sm text-text-muted">Last updated: {UPDATED}</p>

          <h2>1. Our approach to privacy</h2>
          <p>
            PrivaMesh (&ldquo;PrivaMesh,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is designed so
            that we never see your messages, your contacts, or your identity. We do not operate
            account servers, we do not store your messages, and we cannot read them. Privacy is not
            a promise we ask you to trust - it is a consequence of the architecture.
          </p>

          <h2>2. No account, no phone number, no email</h2>
          <p>
            You do not create an account with us. There is no phone number, no email address, and no
            username tied to your real-world identity. Your identity is a{' '}
            <strong>recovery phrase</strong> generated on your device that unlocks the encryption
            keys stored locally. We never receive it.
          </p>

          <h2>3. Information stored on your device</h2>
          <p>The following stays on your iPhone and is never uploaded to us:</p>
          <ul>
            <li>Your encryption keys, held in the iOS Keychain and protected by Face ID or Touch ID.</li>
            <li>Your contacts, chat history, and app settings.</li>
            <li>Your recovery phrase, which only you hold.</li>
          </ul>
          <p>
            None of this is synced to a PrivaMesh server, because there is no PrivaMesh server. If
            you delete the app or lose your device, this data is gone unless you have saved your
            recovery phrase.
          </p>

          <h2>4. How messages are delivered</h2>
          <p>
            Messages are end-to-end encrypted on your device before they leave it, and are delivered
            over a <strong>public, decentralized transport</strong> rather than a server we control.
            Only your intended recipient holds the keys to decrypt a message. Because the transport
            is public and append-only, you should understand two things: encrypted message data
            placed on it may be <strong>publicly visible</strong> in encrypted form, and it is{' '}
            <strong>immutable</strong> - once sent, encrypted data cannot be edited or removed. It
            remains unreadable to anyone without the keys.
          </p>

          <h2>5. No cryptocurrency and no wallet</h2>
          <p>
            PrivaMesh is purely a messenger. Users never buy, hold, or spend any cryptocurrency, and
            there is no wallet in the app. Your recovery phrase exists only to protect and restore
            your encryption keys.
          </p>

          <h2>6. Information we do not collect</h2>
          <p>
            We do not collect your name, phone number, email, contacts, location, message content,
            or metadata about who you talk to or when. We do not use advertising identifiers and we
            do not sell data - there is no data to sell.
          </p>

          <h2>7. Purchases</h2>
          <p>
            PrivaMesh+ is an optional subscription sold through the Apple App Store using Apple&rsquo;s
            in-app purchase system. Payment is processed by Apple under Apple&rsquo;s terms and
            privacy policy; we receive only the confirmation that a subscription is active. We never
            see your payment details.
          </p>

          <h2>8. Website analytics</h2>
          <p>
            This website (privamesh.org) uses privacy-respecting, aggregate analytics to understand
            visitor volume. These analytics do not identify individual visitors and are unrelated to
            the app, which contains no such tracking.
          </p>

          <h2>9. Children</h2>
          <p>
            PrivaMesh is not directed to children under 13, and we do not knowingly collect
            information from them. Because we collect no personal information at all, there is
            nothing for us to knowingly hold.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be reflected
            by the &ldquo;last updated&rdquo; date above.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
          </p>
        </Prose>
      </div>
    </Container>
  )
}
