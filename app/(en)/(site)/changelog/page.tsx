import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Changelog',
  description:
    'Every PrivaMesh release, what shipped in it and when. The newest version and its date are checked against the App Store listing on every build.',
  path: '/changelog',
})

type Release = { version: string; date: string; notes: string[] }

// Newest first. Notes are written by hand, but the newest entry must match the
// App Store listing: when `npm run sync:appstore` brings in a version that has
// no entry here, the build fails instead of filing old notes under a new number.
const RELEASES: Release[] = [
  {
    version: '1.1',
    date: '2026-09-17',
    notes: [
      'Runs on iOS 18 and later. 1.0 needed iOS 26.5, which most iPhones in use could not install.',
      'Post-quantum handshake switched on for iPhones on iOS 26: X-Wing, combining ML-KEM-768 with X25519. Older iPhones keep classical X3DH, and the two interoperate.',
      'In this build the post-quantum step does not complete: its ciphertext goes through an upload that fails, and the sender falls back to classical X3DH. The fix ships in the next release - see known limitations.',
      'Invite links: share a privamesh.org/i/ link and the recipient lands on a filled-in add-contact screen, instead of scanning a QR code or pasting a card.',
      'Passcode fix: after a restart the app could ask you to create a passcode and then demand the old one.',
    ],
  },
  {
    version: '1.0',
    date: '2026-08-06',
    notes: [
      'First App Store release.',
      'End-to-end encrypted one-to-one messaging using X3DH and the Double Ratchet with AES-256-GCM.',
      'The post-quantum handshake was built but switched off, pending a test between two devices; every session in 1.0 is classical X3DH.',
      'Accounts are BIP-39 recovery phrases generated on device - no phone number, no email.',
      'Stealth addressing: a fresh one-time address per message.',
      'Fixed padding buckets at 32, 64, 128, 256 and 512 bytes.',
      'Optional cover traffic at random 3-10 minute intervals, off by default.',
      'Anonymous payment via RSA blind signatures, so a send cannot be linked to a purchase.',
    ],
  },
]

if (
  RELEASES[0].version !== APP_STORE.version ||
  RELEASES[0].date !== APP_STORE.updatedAt.slice(0, 10)
) {
  throw new Error(
    `Changelog is behind the App Store: the listing has ${APP_STORE.version} from ` +
      `${APP_STORE.updatedAt.slice(0, 10)}, the newest entry here is ${RELEASES[0].version} ` +
      `from ${RELEASES[0].date}. Add notes for the new version to app/(en)/(site)/changelog/page.tsx.`,
  )
}

export default function ChangelogPage() {
  return (
    <Container>
      <JsonLd data={webPageLd({
          name: "PrivaMesh changelog",
          description: "Every PrivaMesh release and what shipped in it.",
          path: '/changelog',
          type: 'CollectionPage',
        })} />
      <PageHeader
        eyebrow="Changelog"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ]}
        title="Changelog"
        lead="What shipped, and when. The site will not build while the newest version here differs from the App Store listing, so this page cannot quietly fall behind what Apple shows."
      />

      <div className="mt-12 max-w-3xl space-y-6">
        {RELEASES.map((r) => (
          <FadeUp
            key={r.version}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">{r.version}</h2>
              <time dateTime={r.date} className="font-mono text-sm text-text-muted">
                {r.date}
              </time>
            </div>
            <ul className="mt-5 space-y-2.5">
              {r.notes.map((n) => (
                <li key={n} className="text-[15px] leading-relaxed text-text-muted">
                  {n}
                </li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <p>
            This page has existed since version one rather than appearing later, because a
            changelog that starts when the history is already flattering is not much of a record.
            Security fixes appear here and on <Link href="/security">the security page</Link> as
            they ship, and what is being built now is on <Link href="/roadmap">the roadmap</Link>.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        links={[
          { href: '/download', label: 'Download', blurb: 'Current version and system requirements.' },
          { href: '/roadmap', label: 'Roadmap', blurb: 'What is being built now, and what comes next.' },
          { href: '/limitations', label: 'Known limitations', blurb: 'What is not in the product yet.' },
        ]}
      />
    </Container>
  )
}
