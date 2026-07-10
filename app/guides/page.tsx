import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { GUIDES } from '@/lib/guides'

export const metadata: Metadata = pageMetadata({
  title: 'Private Messaging Guides — No Phone, No Servers',
  description:
    'Plain-English guides to private messaging: apps without a phone number, serverless and decentralized messengers, anonymous chat, encrypted iPhone apps and more.',
  path: '/guides',
})

export default function GuidesIndex() {
  return (
    <Container>
      <JsonLd
        data={itemListLd(
          'Private messaging guides',
          GUIDES.map((g) => g.title),
        )}
      />
      <PageHeader
        eyebrow="Guides"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ]}
        title="Private messaging guides"
        lead="Straight answers to the questions people ask about private messaging — no phone number, no servers, no metadata, on iPhone and on-chain."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g, i) => (
          <FadeUp key={g.slug} delay={(i % 2) * 60}>
            <Link
              href={`/guides/${g.slug}`}
              className="group flex h-full flex-col rounded-card border border-border bg-white/20 p-6 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
            >
              <h2 className="text-lg font-semibold text-text-primary">{g.h1}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{g.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read guide
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
