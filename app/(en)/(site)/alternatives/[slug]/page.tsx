import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import { Button } from '@/components/Button'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
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
    title: `The Private ${a.name} Alternative`,
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

  // Rotate through the list rather than always taking the first three, so every
  // alternative gets linked from its peers instead of the tail never being
  // reachable from anywhere but the index.
  const i = ALTERNATIVES.findIndex((x) => x.slug === a.slug)
  const others = Array.from(
    { length: 3 },
    (_, n) => ALTERNATIVES[(i + n + 1) % ALTERNATIVES.length],
  )

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

          <h2>{a.keeps.heading}</h2>
          <p>{a.keeps.body}</p>

          <h2>{a.gap.heading}</h2>
          <p>{a.gap.body}</p>
        </Prose>
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        PrivaMesh vs {a.name}, side by side
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">Feature comparison of PrivaMesh and {a.name}</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Feature</th>
              <th className="px-5 py-4 text-left font-semibold text-accent">PrivaMesh</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">{a.name}</th>
            </tr>
          </thead>
          <tbody>
            {a.rows.map((row) => (
              <tr key={row.feature} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-secondary">
                  {row.feature}
                </th>
                <td className="px-5 py-4 text-text-primary">{row.privamesh}</td>
                <td className="px-5 py-4 text-text-muted">{row.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Switch to PrivaMesh if
          </h2>
          <ul className="mt-4 space-y-3">
            {a.switchIf.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-text-muted">
                <Check
                  size={18}
                  strokeWidth={2.5}
                  className="mt-0.5 flex-none text-success"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Stay on {a.name} if
          </h2>
          <ul className="mt-4 space-y-3">
            {a.stayIf.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-text-muted">
                <X
                  size={18}
                  strokeWidth={2.5}
                  className="mt-0.5 flex-none text-text-muted"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>

      <div className="mt-12">
        <Prose>
          <p>
            {a.comparePath ? (
              <Link href={a.comparePath}>See the full PrivaMesh vs {a.name} comparison →</Link>
            ) : (
              <Link href="/privacy">See why PrivaMesh is the most private messenger →</Link>
            )}
          </p>
        </Prose>
      </div>

      <PageFaq items={a.faq} />

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
