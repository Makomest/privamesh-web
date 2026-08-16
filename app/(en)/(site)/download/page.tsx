import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Download PrivaMesh for iPhone',
  description:
    'Download PrivaMesh from the App Store. Requires iOS 26.5 or later, needs no phone number or email, and is free to install. What to expect on first launch.',
  path: '/download',
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
    q: 'Is there an Android or desktop version?',
    a: 'No. PrivaMesh is iOS only, with no Android, desktop or web client. If you need cross-platform, Signal is the honest recommendation.',
  },
]

export default function DownloadPage() {
  const updated = new Date(APP_STORE.updatedAt)

  return (
    <Container>
      <PageHeader
        eyebrow="Download"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Download', path: '/download' },
        ]}
        title="Download PrivaMesh for iPhone"
        lead="Free on the App Store. No phone number, no email, no account - the app generates your identity on the device when you first open it."
      >
        <AppStoreButton label="Download on the App Store" />
      </PageHeader>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">Requirements</h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            {[
              ['Platform', 'iPhone'],
              ['iOS version', `${APP_STORE.minimumOsVersion} or later`],
              ['App version', APP_STORE.version],
              ['Download price', APP_STORE.formattedPrice],
              ['Age rating', APP_STORE.contentRating],
              ['Languages', APP_STORE.languages.join(', ')],
              ['Last updated', updated.toISOString().slice(0, 10)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                <dt className="text-text-muted">{k}</dt>
                <dd className="text-right font-medium text-text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
            These figures come straight from the App Store listing rather than being maintained by
            hand, so they cannot drift from what Apple shows.
          </p>
        </FadeUp>

        <FadeUp delay={60} className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
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
