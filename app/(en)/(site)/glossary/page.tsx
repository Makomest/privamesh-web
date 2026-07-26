import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd, definedTermSetLd } from '@/lib/jsonld'
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
      <JsonLd data={definedTermSetLd(GLOSSARY)} />
      <JsonLd
        data={itemListLd(
          'Private messaging glossary',
          GLOSSARY.map((t) => t.term),
        )}
      />
      <div className="mt-12">
        <Prose>
          <h2>Why these terms matter</h2>
          <p>
            Privacy marketing leans on vocabulary that sounds precise and often is not.
            &ldquo;End-to-end encrypted&rdquo; means something exact, and an app can satisfy it
            while still recording who you talked to and when. &ldquo;Serverless&rdquo; means the
            opposite of what a cloud engineer means by it. &ldquo;Anonymous&rdquo; is used for
            apps that are merely pseudonymous.
          </p>
          <p>
            The definitions below are the ones PrivaMesh is built on, written in plain English
            with the trade-offs left in. Each links to the primary specification where one exists,
            so you can check the claim at the source rather than taking a marketing page&rsquo;s
            word for it - including ours.
          </p>
          <p>
            If you read only two, make them{' '}
            <Link href="/glossary/metadata">metadata</Link> and{' '}
            <Link href="/glossary/forward-secrecy">forward secrecy</Link>. Between them they
            explain most of the distance between an app that encrypts your messages and an app
            that actually protects your privacy.
          </p>
        </Prose>
      </div>
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
