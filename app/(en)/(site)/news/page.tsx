import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { getUpdates, typeLabel } from '@/lib/updates'

export const dynamic = 'force-dynamic'

// Keep an empty news page out of the index rather than shipping a 26-word
// shell. It flips back to indexable on its own once the first update lands.
export function generateMetadata(): Metadata {
  const hasUpdates = getUpdates().length > 0
  return {
    ...pageMetadata({
      title: 'PrivaMesh News & Updates',
      description:
        'Release notes and product news from PrivaMesh: the Windows desktop client, the Android APK, and what each build does and does not do yet.',
      path: '/news',
    }),
    ...(hasUpdates ? {} : { robots: { index: false, follow: true } }),
  }
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsPage() {
  const updates = getUpdates()

  return (
    <Container>
      {updates.length > 0 && (
        <JsonLd data={itemListLd('PrivaMesh news and updates', updates.map((u) => u.title))} />
      )}
      <PageHeader
        eyebrow="News & Updates"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
        ]}
        title="News & updates"
        lead="Product news, updates and release notes from the PrivaMesh team."
      />

      <div className="mt-12 space-y-5">
        {updates.length === 0 && (
          <p className="text-text-muted">No updates yet — check back soon.</p>
        )}
        {updates.map((u) => (
          <article
            key={u.id}
            id={u.id}
            className="scroll-mt-24 rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
              <span className="rounded-full border border-border-accent px-2.5 py-0.5 text-accent">
                {typeLabel(u.type)}
              </span>
              <time dateTime={u.date}>{fmt(u.date)}</time>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              {u.title}
            </h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-text-muted">
              {u.body}
            </p>
          </article>
        ))}
      </div>
    </Container>
  )
}
