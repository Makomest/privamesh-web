import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import Roadmap from '@/components/Roadmap'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'
import { APP_STORE } from '@/lib/appstore.generated'
import { ROADMAP } from '@/lib/roadmap'

export const metadata: Metadata = pageMetadata({
  title: 'Roadmap',
  description:
    'Where PrivaMesh is: every release so far, the one being built now, and what is queued after it, for iPhone, Android and Windows. No dates on anything unfinished.',
  path: '/roadmap',
  languages: { en: '/roadmap', ru: '/ru/roadmap' },
})

// The "we are here" marker sits after the last shipped iPhone release. If the
// App Store already has a version this page still calls unreleased, the page is
// wrong about where we are, so the build stops until lib/roadmap.ts catches up.
if (!ROADMAP.some((i) => i.track === 'ios' && i.stage === 'shipped' && i.version === APP_STORE.version)) {
  throw new Error(
    `Roadmap is behind the App Store: ${APP_STORE.version} is live but not marked shipped in lib/roadmap.ts.`,
  )
}

export default function RoadmapPage() {
  return (
    <Container>
      <JsonLd
        data={webPageLd({
          name: 'PrivaMesh roadmap',
          description: 'What has shipped, what is being built now, and what comes next.',
          path: '/roadmap',
        })}
      />
      <PageHeader
        eyebrow="Roadmap"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Roadmap', path: '/roadmap' },
        ]}
        title="Where PrivaMesh is, and what comes next"
        lead="Every release so far, the one being built now, and what is queued after it. Filter by platform, open any step to see what is in it."
      />

      <div className="mt-10">
        <Roadmap locale="en" />
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>How to read this</h2>
          <p>
            Shipped items carry the date they reached people. Nothing else carries a date, on
            purpose: a date we miss would tell you less than no date at all. Building now means the
            code is written and tested but not yet in your hands, which for iPhone means it has not
            reached the App Store. Until it has, read the app you have as lacking it.
          </p>
          <p>
            The page cannot fall behind the App Store: the site will not build while the version
            Apple serves is missing from the shipped list. What each release actually changed is
            on <Link href="/changelog">the changelog</Link>, and what none of this fixes yet is on{' '}
            <Link href="/limitations">known limitations</Link>.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        links={[
          { href: '/changelog', label: 'Changelog', blurb: 'What each release changed, and when.' },
          { href: '/limitations', label: 'Known limitations', blurb: 'What PrivaMesh does not protect you from.' },
          { href: '/security', label: 'Security', blurb: 'Audit status, fixes and how to report a vulnerability.' },
        ]}
      />
    </Container>
  )
}
