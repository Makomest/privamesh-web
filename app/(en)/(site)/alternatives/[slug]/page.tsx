import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import { Button } from '@/components/Button'
import AppStoreButton from '@/components/AppStoreButton'
import { pageMetadata } from '@/lib/seo'
import { ALTERNATIVES, getAlternative } from '@/lib/alternatives'

export const dynamicParams = false

export function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getAlternative(params.slug)
  if (!a) return {}
  return pageMetadata({
    title: `The Private ${a.name} Alternative - PrivaMesh`,
    description:
      `Looking for a ${a.name} alternative with more privacy? PrivaMesh is serverless, has no phone number and hides metadata. Here’s how it compares.`.slice(
        0,
        155,
      ),
    path: `/alternatives/${a.slug}`,
  })
}

export default function AlternativePage({ params }: { params: { slug: string } }) {
  const a = getAlternative(params.slug)
  if (!a) notFound()

  const others = ALTERNATIVES.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <Container>
      <PageHeader
        eyebrow={`${a.name} alternative`}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Alternatives', path: '/alternatives' },
          { name: a.name, path: `/alternatives/${a.slug}` },
        ]}
        title={`A private ${a.name} alternative`}
        lead={a.what}
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          {a.comparePath && (
            <Button href={a.comparePath} variant="ghost">
              Full PrivaMesh vs {a.name}
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="mt-12">
        <Prose>
          <h2>Why PrivaMesh is a strong {a.name} alternative</h2>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            {a.comparePath ? (
              <Link href={a.comparePath}>See the full PrivaMesh vs {a.name} comparison →</Link>
            ) : (
              <Link href="/privacy">See why PrivaMesh is the most private messenger →</Link>
            )}
          </p>
        </Prose>
      </div>

      <RelatedLinks
        title="Other alternatives"
        links={[
          ...others.map((o) => ({
            href: `/alternatives/${o.slug}`,
            label: `${o.name} alternative`,
            blurb: o.what,
          })),
        ]}
      />
    </Container>
  )
}
