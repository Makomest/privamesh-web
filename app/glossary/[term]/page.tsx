import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { GLOSSARY, getTerm } from '@/lib/glossary'

export const dynamicParams = false

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ term: t.slug }))
}

export function generateMetadata({ params }: { params: { term: string } }): Metadata {
  const t = getTerm(params.term)
  if (!t) return {}
  return pageMetadata({
    title: `What is a ${t.term}? - PrivaMesh Glossary`,
    description: t.short.slice(0, 155),
    path: `/glossary/${t.slug}`,
  })
}

export default function TermPage({ params }: { params: { term: string } }) {
  const t = getTerm(params.term)
  if (!t) notFound()

  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.short,
    inDefinedTermSet: `${SITE.domain}/glossary`,
    url: `${SITE.domain}/glossary/${t.slug}`,
  }

  return (
    <Container>
      <JsonLd data={definedTerm} />
      <PageHeader
        eyebrow="Glossary"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
          { name: t.term, path: `/glossary/${t.slug}` },
        ]}
        title={`What is a ${t.term.toLowerCase()}?`}
        lead={t.short}
      />
      <div className="mt-12">
        <Prose>
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </div>
      {t.related && t.related.length > 0 && (
        <RelatedLinks
          links={t.related.map((r) => ({
            href: r.href,
            label: r.label,
            blurb: 'Learn how this works in PrivaMesh.',
          }))}
        />
      )}
    </Container>
  )
}
