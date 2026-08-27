import type { Metadata } from 'next'
import Link from 'next/link'
import { Ban, Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { PLATFORMS } from '@/lib/platforms'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Download PrivaMesh for iPhone',
  description:
    'Download PrivaMesh from the App Store. Requires iOS 26.5 or later, needs no phone number or email, and is free to install. What to expect on first launch.',
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
    q: 'Is there an Android APK or a Windows installer?',
    a: 'Not yet, and neither is planned with a date. Android needs the key handling rewritten off CryptoKit and the Secure Enclave, and a desktop client needs a way to move ratchet state between devices that the design deliberately does not have. If you need cross-platform today, Signal is the honest recommendation.',
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
        title="Download PrivaMesh for iPhone"
        lead="PrivaMesh ships on iPhone today. Android and Windows have no build yet, and this page says so plainly rather than collecting emails for something that does not exist."
      >
        <AppStoreButton label="Download on the App Store" />
      </PageHeader>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <FadeUp
            key={p.id}
            delay={i * 60}
            className={`flex flex-col rounded-card border p-6 backdrop-blur-sm ${
              p.href ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
            }`}
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h2>
            <p className="mt-2 font-mono text-[13px] text-text-muted">{p.requirement}</p>

            {p.href ? (
              <>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">
                  Free to install. No phone number, no email, no account - the app generates your
                  identity on the device when you first open it.
                </p>
                <div className="mt-5">
                  <AppStoreButton label={p.cta} />
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">{p.status}</p>
                <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-btn border border-border px-3 py-2 font-mono text-xs text-text-muted">
                  <Ban size={14} aria-hidden="true" />
                  Not available
                </p>
              </>
            )}
          </FadeUp>
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">What happens first</h2>
          <ul className="mt-4 space-y-3">
            {[
              'The app generates a 12-word recovery phrase on your device',
              'Write it down on paper - there is no reset and no backup we hold',
              'Set a passcode and enable Face ID or Touch ID',
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
            Version, minimum iOS and price come straight from the App Store listing rather than
            being maintained by hand, so they cannot drift from what Apple shows.
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
            If you want to know exactly what the app and its one server can observe before you
            install, that is on <Link href="/architecture">the architecture page</Link>, and what it
            does not protect you from is on <Link href="/limitations">limitations</Link>.
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
