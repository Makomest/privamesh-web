import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
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
      <div className="mt-12">
        <Prose>
          <h2>How to read these comparisons</h2>
          <p>
            Every page here follows the same shape: what the other app genuinely gets right, the
            specific gap PrivaMesh closes, a side-by-side table, and an honest list of reasons to
            stay where you are. That last section matters most. For a lot of people the right
            answer really is to keep using Signal or WhatsApp, and a comparison that never says so
            is marketing rather than information.
          </p>
          <p>
            The apps below fall into three groups. Mainstream encrypted messengers - Signal,
            WhatsApp, iMessage - protect message content well but tie your account to a phone
            number or an Apple ID, and route traffic through servers that see connection metadata.
            Privacy-first alternatives - Threema, Session, SimpleX - already solve the identifier
            problem and differ mainly in what carries the messages. Telegram is its own case: an
            excellent product whose default chats are not end-to-end encrypted at all.
          </p>
          <p>
            PrivaMesh sits at one end of that spectrum. It removes the operator entirely rather
            than choosing a trustworthy one, which buys metadata resistance and costs reach,
            platform coverage and a fraction of a cent per message. Whether that trade is worth
            making depends on what you are actually defending against.
          </p>
        </Prose>
      </div>
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
