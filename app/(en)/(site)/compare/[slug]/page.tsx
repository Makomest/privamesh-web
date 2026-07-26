import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PhoneMockup from '@/components/PhoneMockup'
import { RelatedLinks } from '@/components/Prose'
import CompareCell from '@/components/CompareCell'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { COMPARISONS, COMPARE_SLUGS } from '@/lib/compare'
import AppStoreButton from '@/components/AppStoreButton'

export function generateStaticParams() {
  return COMPARE_SLUGS.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = COMPARISONS[params.slug]
  if (!c) return {}
  return pageMetadata({ title: c.title, description: c.description, path: `/compare/${c.slug}` })
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const c = COMPARISONS[params.slug]
  if (!c) notFound()

  const related = COMPARE_SLUGS.filter((s) => s !== c.slug)

  return (
    <Container>
      <JsonLd
        data={itemListLd(
          `PrivaMesh vs ${c.competitor} comparison`,
          c.rows.map((r) => r.feature),
        )}
      />
      <PageHeader
        eyebrow={`PrivaMesh vs ${c.competitor}`}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Compare', path: `/compare/${c.slug}` },
          { name: `vs ${c.competitor}`, path: `/compare/${c.slug}` },
        ]}
        title={`PrivaMesh vs ${c.competitor}`}
        lead={c.lead}
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href="/privacy" variant="ghost">
            Why PrivaMesh is private
          </Button>
        </div>
      </PageHeader>

      {/* Comparison table */}
      <FadeUp className="mt-12 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">Feature comparison of PrivaMesh and {c.competitor}</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Feature</th>
              <th className="px-5 py-4 text-center font-semibold text-accent">PrivaMesh</th>
              <th className="px-5 py-4 text-center font-semibold text-text-secondary">
                {c.competitor}
              </th>
              <th className="hidden px-5 py-4 text-left font-semibold text-text-secondary md:table-cell">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.feature} className="border-b border-border last:border-0">
                <td className="px-5 py-4 text-text-primary">{row.feature}</td>
                <td className="px-5 py-4 text-center">
                  <span className="inline-flex justify-center">
                    <CompareCell state={row.a} />
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="inline-flex justify-center">
                    <CompareCell state={row.b} />
                  </span>
                </td>
                <td className="hidden px-5 py-4 text-text-muted md:table-cell">{row.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-text-muted">
        <span className="text-success">✓ full</span>
        <span className="text-warning">- partial</span>
        <span className="text-negative">✗ none</span>
      </p>

      {/* Prose */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="max-w-prose rounded-2xl p-6 backdrop-blur-sm sm:p-8 space-y-5 text-[17px] leading-[1.75] text-text-muted">
          {c.intro.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}

          <h2 className="!mt-12 text-2xl font-bold tracking-tight text-text-primary">
            {c.strengths.heading}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: c.strengths.body }} />

          <h2 className="!mt-12 text-2xl font-bold tracking-tight text-text-primary">
            {c.difference.heading}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: c.difference.body }} />

          <h2 className="!mt-12 text-2xl font-bold tracking-tight text-text-primary">
            The verdict
          </h2>
          <p dangerouslySetInnerHTML={{ __html: c.verdict }} />

          <p className="!mt-8">
            <Link href="/features/no-servers" className="text-accent hover:underline">
              See what serverless architecture changes →
            </Link>
          </p>
        </div>

        <FadeUp className="lg:sticky lg:top-24">
          <PhoneMockup
            src={c.screenshot.src}
            alt={c.screenshot.alt}
            sizes="(max-width: 1024px) 60vw, 360px"
          />
        </FadeUp>
      </div>

      <RelatedLinks
        title="Compare with other messengers"
        links={[
          ...related.map((s) => ({
            href: `/compare/${s}`,
            label: `PrivaMesh vs ${COMPARISONS[s].competitor}`,
            blurb: COMPARISONS[s].lead,
          })),
          {
            href: '/privacy',
            label: 'Why PrivaMesh is private',
            blurb:
              'The full case for the most private messenger: no servers, no phone, no metadata.',
          },
        ]}
      />
    </Container>
  )
}
