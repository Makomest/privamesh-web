import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { ALTERNATIVES } from '@/lib/alternatives'

export const metadata: Metadata = pageMetadata({
  title: 'Private Messenger Alternatives - Signal, Telegram & More',
  description:
    'Looking for a more private alternative to Signal, Telegram, WhatsApp, Session and others? PrivaMesh is serverless, phone-number-free and metadata-hiding.',
  path: '/alternatives',
})

export default function AlternativesIndex() {
  return (
    <Container>
      <JsonLd
        data={itemListLd(
          'Private messenger alternatives',
          ALTERNATIVES.map((a) => `${a.name} alternative`),
        )}
      />
      <PageHeader
        eyebrow="Alternatives"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Alternatives', path: '/alternatives' },
        ]}
        title="Private alternatives to the messengers you know"
        lead="Leaving Signal, Telegram, WhatsApp or another app for something more private? See how PrivaMesh - serverless, no phone number, metadata-hiding - compares."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {ALTERNATIVES.map((a, i) => (
          <FadeUp key={a.slug} delay={(i % 2) * 60}>
            <Link
              href={`/alternatives/${a.slug}`}
              className="group flex h-full flex-col rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
            >
              <h2 className="text-lg font-semibold text-text-primary">
                Private {a.name} alternative
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{a.what}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                See the alternative
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </Container>
  )
}
