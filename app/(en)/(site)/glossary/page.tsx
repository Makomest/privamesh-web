import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { GLOSSARY } from '@/lib/glossary'

export const metadata: Metadata = pageMetadata({
  title: 'Private Messaging Glossary - Encryption & Metadata Terms',
  description:
    'Plain-English definitions of private messaging terms: stealth addresses, forward secrecy, Double Ratchet, metadata, seed phrases and more.',
  path: '/glossary',
})

export default function GlossaryIndex() {
  return (
    <Container>
      <JsonLd
        data={itemListLd(
          'Private messaging glossary',
          GLOSSARY.map((t) => t.term),
        )}
      />
      <PageHeader
        eyebrow="Glossary"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
        ]}
        title="Private messaging glossary"
        lead="Plain-English definitions of the encryption and privacy terms behind PrivaMesh - no cryptography degree required."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {GLOSSARY.map((t, i) => (
          <FadeUp key={t.slug} delay={(i % 2) * 60}>
            <Link
              href={`/glossary/${t.slug}`}
              className="group flex h-full flex-col rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
            >
              <h2 className="text-lg font-semibold text-text-primary">{t.term}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{t.short}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read definition
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
