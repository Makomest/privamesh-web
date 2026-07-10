import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import AppStoreButton from '@/components/AppStoreButton'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { faqPageLd } from '@/lib/jsonld'
import { GUIDES, getGuide } from '@/lib/guides'

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug)
  if (!g) return {}
  return pageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` })
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug)
  if (!g) notFound()

  return (
    <Container>
      <JsonLd data={faqPageLd(g.faq)} />
      <PageHeader
        eyebrow={g.eyebrow}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: g.title, path: `/guides/${g.slug}` },
        ]}
        title={g.h1}
        lead={g.lead}
      >
        <AppStoreButton />
      </PageHeader>

      <div className="mt-12">
        <Prose>
          {g.sections.map((s) => (
            <div key={s.h2}>
              <h2>{s.h2}</h2>
              {s.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </Prose>
      </div>

      <section className="mt-14" aria-labelledby="guide-faq">
        <h2 id="guide-faq" className="mb-6 text-2xl font-bold tracking-tight text-text-primary">
          FAQ
        </h2>
        <FAQ items={g.faq} />
      </section>

      <RelatedLinks links={g.related} />
    </Container>
  )
}
