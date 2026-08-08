import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import AppStoreButton from '@/components/AppStoreButton'
import PhoneMockup from '@/components/PhoneMockup'
import FadeUp from '@/components/FadeUp'
import { Check } from 'lucide-react'
import { SITE } from '@/lib/site'
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

  // Rotate through the list so every guide is linked from its peers, not just
  // from the index. Without this the tail of the array has one inbound link.
  const gi = GUIDES.findIndex((x) => x.slug === g.slug)
  const moreGuides = Array.from({ length: 3 }, (_, n) => GUIDES[(gi + n + 1) % GUIDES.length])

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
        <AppStoreButton label="Download on the App Store" />
      </PageHeader>

      {/* Direct answer to the search query, before any preamble. */}
      {g.answer && (
        <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
          {g.answer}
        </p>
      )}

      {/* App Store block for the guides that are landing pages for an install
          intent: the CTA, real screenshots and the three concrete claims a
          searcher is checking, all above the fold. */}
      {g.appCta && (
        <FadeUp className="mt-10 grid items-center gap-8 rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-[1fr_260px]">
          <div>
            <ul className="space-y-3">
              {['No phone number required', 'No email, no account, no profile', 'End-to-end encrypted with forward secrecy'].map(
                (b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
                    <Check size={18} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                    {b}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AppStoreButton label="Download on the App Store" />
              <a
                href={SITE.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted hover:text-accent"
              >
                apps.apple.com/app/privamesh-messenger
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[240px]">
            <PhoneMockup
              src="/screenshots/04.png?v=3"
              alt="PrivaMesh encrypted chat on iPhone - end-to-end encrypted, no phone number"
              sizes="(max-width: 1024px) 50vw, 240px"
            />
          </div>
        </FadeUp>
      )}

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

      <RelatedLinks
        title="More guides"
        links={moreGuides.map((o) => ({
          href: `/guides/${o.slug}`,
          label: o.h1,
          blurb: o.description,
        }))}
      />

      <RelatedLinks links={g.related} />
    </Container>
  )
}
