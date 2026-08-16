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
    'Every PrivaMesh release, what shipped in it and when. Version numbers and dates come from the App Store listing rather than being maintained by hand.',
  path: '/changelog',
})

type Release = { version: string; date: string; notes: string[] }

const RELEASES: Release[] = [
  {
    version: APP_STORE.version,
    date: APP_STORE.releasedAt.slice(0, 10),
    notes: [
      'First App Store release.',
      'End-to-end encrypted one-to-one messaging using X3DH and the Double Ratchet with AES-256-GCM.',
      'Post-quantum handshake on iOS 26: X-Wing, combining ML-KEM-768 with X25519.',
      'Accounts are BIP-39 recovery phrases generated on device - no phone number, no email.',
      'Stealth addressing: a fresh one-time address per message.',
      'Fixed padding buckets at 32, 64, 128, 256 and 512 bytes.',
      'Optional cover traffic at random 3-10 minute intervals, off by default.',
      'Anonymous payment via RSA blind signatures, so a send cannot be linked to a purchase.',
    ],
  },
]

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
        lead="What shipped, and when. Version numbers and dates are pulled from the App Store listing, so this page cannot quietly disagree with what Apple shows."
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
            One release so far. This page exists at version one rather than appearing later, because
            a changelog that starts when the history is already flattering is not much of a record.
            Security fixes will appear here and on{' '}
            <Link href="/security">the security page</Link> as they ship.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        links={[
          { href: '/download', label: 'Download', blurb: 'Current version and system requirements.' },
          { href: '/security', label: 'Security', blurb: 'Audit status and disclosure policy.' },
          { href: '/limitations', label: 'Known limitations', blurb: 'What is not in the product yet.' },
        ]}
      />
    </Container>
  )
}
