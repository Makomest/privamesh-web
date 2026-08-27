import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import PlatformCard from '@/components/PlatformCard'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { PLATFORMS } from '@/lib/platforms'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Download PrivaMesh',
  description:
    'PrivaMesh for iPhone on the App Store and for Windows 10 or later, with checksums. No phone number, no email, no account. Android is written but not yet signed.',
  path: '/download',
  languages: { en: '/download', ru: '/ru/download' },
})

const FAQS = [
  {
    q: 'Why does PrivaMesh need iOS 26.5?',
    a: 'The post-quantum handshake uses X-Wing, which combines ML-KEM-768 with X25519 and relies on cryptography APIs introduced in iOS 26. Supporting older systems would mean shipping only the classical handshake, and the decision was to require the newer one rather than quietly ship a weaker default.',
  },
  {
    q: 'What do I need to sign up?',
    a: 'Nothing. No phone number, no email, no username to reserve. The app generates a 12-word recovery phrase on your device on first launch - write it down, because it is the only way back into the account.',
  },
  {
    q: 'Is it free?',
    a: 'The download is free. Sending is metered because every message is a paid transaction on a public chain - the pricing page lists allowances and tier prices.',
  },
  {
    q: 'Why does the Windows installer trigger a security warning?',
    a: 'The build is not code-signed, so Windows does not recognise the publisher and shows "Windows protected your PC". It is not a report of anything found in the file. Verify the SHA-256 on this page before running it, then click "More info" and "Run anyway". A signing certificate is what removes the warning and this build does not have one yet.',
  },
  {
    q: 'When is the Android APK available?',
    a: 'The client is written and interoperates with the iPhone app. The only build that exists is debug-signed and marked debuggable, which would let adb read the message database off a phone without root, and its throwaway signing key would force everyone to uninstall - destroying their history - to take the first real release. There is no date; there is a build that is deliberately not being handed out.',
  },
  {
    q: 'Do paid tiers work on Windows and Android?',
    a: 'Not the way they do on iPhone. The relay verifies Apple receipts and has no Google Play path, so Android would start free-tier only. Windows does not use the relay at all: the desktop client makes its own Solana fee wallet that you fund directly, so there is no subscription to carry over.',
  },
]

export default function DownloadPage() {
  const updated = new Date(APP_STORE.updatedAt)

  return (
    <Container>
      <JsonLd data={softwareApplicationLd} />
      <PageHeader
        eyebrow="Download"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Download', path: '/download' },
        ]}
        title="Download PrivaMesh"
        lead="iPhone and Windows have builds you can install today. Android is written and interoperates, but the only APK that exists is a debug build - this page says why that is not something to hand out."
      >
        <AppStoreButton label="Download on the App Store" />
      </PageHeader>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <PlatformCard
            key={p.id}
            platform={p}
            delay={i * 60}
            labels={{
              notAvailable: 'Not available',
              verify: 'SHA-256 of the installer:',
              allChecksums: 'Checksums for both files',
            }}
          />
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">What happens first</h2>
          <ul className="mt-4 space-y-3">
            {[
              'The app generates a 12-word recovery phrase on your device',
              'Write it down on paper - there is no reset and no backup we hold',
              'Set a passcode, and biometric unlock if the device offers it',
              'Pick a nickname so people can find you without a phone number',
              'Add a contact by QR code or nickname; both sides must add each other',
            ].map((step) => (
              <li key={step} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                <Check size={17} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-text-muted">
            The iPhone version, minimum iOS and price come straight from the App Store listing
            rather than being maintained by hand, so they cannot drift from what Apple shows. The
            Windows figures come from the release that hosts the file you download.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Before you install</h2>
          <p>
            Two things are worth knowing up front, because both surprise people later. Your message
            history cannot be moved to another device or restored after a reinstall - forward
            secrecy destroys each message key after use, and that is the guarantee working rather
            than a missing feature. And sending is metered: the app is free to install, but every
            message is a real transaction with a real network fee. See{' '}
            <Link href="/pricing">pricing</Link> for what that costs.
          </p>
          <p>
            Those two apply to every platform. What differs is who pays: on iPhone a subscription
            buys blind tokens that our one fee worker redeems, while the Windows client skips that
            worker entirely and spends from a Solana wallet you fund yourself. Exactly what each
            component can observe is on <Link href="/architecture">the architecture page</Link>, and
            what none of it protects you from is on <Link href="/limitations">limitations</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          { href: '/pricing', label: 'Pricing', blurb: 'Tiers, message allowances and why sending is metered.' },
          { href: '/limitations', label: 'Known limitations', blurb: 'What PrivaMesh does not protect you from.' },
          { href: '/support', label: 'Support', blurb: 'Recovery phrase, new devices and subscriptions.' },
        ]}
      />
    </Container>
  )
}
