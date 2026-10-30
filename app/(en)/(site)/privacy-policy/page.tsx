import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose } from '@/components/Prose'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'PrivaMesh Privacy Policy. No phone number, no email. Messages are end-to-end encrypted; our relay delivers them without being able to read them.',
  path: '/privacy-policy',
})

const UPDATED = 'October 30, 2026'

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <JsonLd data={webPageLd({
          name: "PrivaMesh Privacy Policy",
          description: "What PrivaMesh does and does not collect.",
          path: '/privacy-policy',
          type: 'WebPage',
        })} />
      <PageHeader
        eyebrow="Legal"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ]}
        title="Privacy Policy"
        lead="PrivaMesh is a private, end-to-end encrypted messenger. This policy explains what the app and the one service we run do and do not collect."
      />

      <div className="mt-12 max-w-3xl">
        <Prose>
          <p className="text-sm text-text-muted">Last updated: {UPDATED}</p>

          <h2>1. Our approach to privacy</h2>
          <p>
            PrivaMesh (&ldquo;PrivaMesh,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is designed so
            that we never see your messages, your contacts, or your identity. We cannot read your
            messages and we do not store them. The one service we run is a relay that passes
            encrypted messages on to the network and pays the fee for them; section 5 lists exactly
            what it sees.
          </p>

          <h2>2. No account, no phone number, no email</h2>
          <p>
            You do not create an account with us. There is no phone number, no email address, and no
            username tied to your real-world identity. Your identity is a{' '}
            <strong>account phrase</strong> generated on your device that unlocks the encryption
            keys stored locally. We never receive it.
          </p>

          <h2>3. Information stored on your device</h2>
          <p>The following stays on your iPhone and is never uploaded to us:</p>
          <ul>
            <li>Your encryption keys, held in the iOS Keychain and protected by Face ID or Touch ID.</li>
            <li>Your contacts, chat history, and app settings.</li>
            <li>Your account phrase, which only you hold.</li>
          </ul>
          <p>
            None of this is uploaded to us. If you delete the app or lose your device, it is gone.
            Your account phrase restores your identity, your nickname and your Saved Messages on a
            new device, but not your chats with other people.
          </p>

          <h2>4. How messages are delivered</h2>
          <p>
            Messages are end-to-end encrypted on your device. The app sends each encrypted message
            to our relay, which writes it to the <strong>public Solana blockchain</strong> and pays
            the network fee. Only your intended recipient holds the keys to decrypt it. Because the
            blockchain is public and append-only, encrypted message data on it is{' '}
            <strong>publicly visible</strong> in encrypted form and <strong>permanent</strong> -
            once sent, it cannot be edited or removed, by you or by us. It remains unreadable to
            anyone without the keys.
          </p>

          <h2>5. Services the app connects to</h2>
          <p>
            Our relay sees your IP address, the time, the one-time address a message goes to, and a
            token that is either anonymous or, on the free tier, tied to your account. It stores
            message counts, the subscription it verified, and a hash of the account that reserved a
            nickname - not IP addresses and not message contents. Solana RPC providers (Helius by
            default, or one you choose in the app) see your IP address and the addresses the app
            checks for new messages. Irys and Arweave store encrypted photos and see the IP address
            that uploads or downloads them. None of these services can read your messages.
          </p>

          <h2>6. No cryptocurrency and no wallet</h2>
          <p>
            PrivaMesh is purely a messenger. Users never buy, hold, or spend any cryptocurrency, and
            there is no wallet in the app. Your account phrase exists only to protect and restore
            your encryption keys.
          </p>

          <h2>7. Information we do not collect</h2>
          <p>
            We do not collect your name, phone number, email, contacts, location or message content.
            We do not use advertising identifiers and we do not sell data. What the relay sees in
            order to deliver a message is listed in section 5.
          </p>

          <h2>8. Purchases</h2>
          <p>
            PrivaMesh+ subscriptions and message packs are sold through the Apple App Store using
            Apple&rsquo;s in-app purchase system. Payment is processed by Apple under Apple&rsquo;s
            terms and privacy policy. The app sends our relay the transaction Apple signed, so it can
            grant the messages you bought; we never see your payment details.
          </p>

          <h2>9. Website analytics</h2>
          <p>
            This website (privamesh.org) uses privacy-respecting, aggregate analytics to understand
            visitor volume. These analytics do not identify individual visitors and are unrelated to
            the app, which contains no such tracking.
          </p>

          <h2>10. Children</h2>
          <p>
            PrivaMesh is not directed to children under 13, and we do not knowingly collect
            information from them.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be reflected
            by the &ldquo;last updated&rdquo; date above.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
          </p>
        </Prose>
      </div>
    </Container>
  )
}
