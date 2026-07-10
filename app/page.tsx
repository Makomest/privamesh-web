import Link from 'next/link'
import type { Metadata } from 'next'
import { EyeOff, Shuffle, Wallet, ArrowRight, Check } from 'lucide-react'
import { Container, SectionDivider } from '@/components/Container'
import { Button } from '@/components/Button'
import PhoneMockup from '@/components/PhoneMockup'
import HeroScramble from '@/components/HeroScramble'
import FadeUp from '@/components/FadeUp'
import ScreenshotGallery from '@/components/ScreenshotGallery'
import CompareCell from '@/components/CompareCell'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd, faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import AppStoreButton from '@/components/AppStoreButton'
import {
  TRUST_ROW,
  NO_SERVERS_TABLE,
  METADATA_CARDS,
  LIFECYCLE_STEPS,
  HOME_FAQ,
  COMPARE_TEASER,
} from '@/lib/data'

export const metadata: Metadata = pageMetadata({
  title: 'PrivaMesh - Serverless Private Messenger on Solana',
  description:
    'The most private messaging app: no servers, no phone number, no metadata. End-to-end encrypted on Solana. Trust math, not companies.',
  path: '/',
  languages: { en: '/', ru: '/ru' },
})

const METADATA_ICONS = { EyeOff, Shuffle, Wallet } as const

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd} />
      <JsonLd data={faqPageLd(HOME_FAQ)} />

      {/* 1 - HERO */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <div className="mesh-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative rounded-3xl p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/20 backdrop-blur-sm px-3 py-1 font-mono text-xs text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Runs on Solana mainnet-beta
              </p>
              <h1 className="text-h1-m sm:text-h1-d">
                The <HeroScramble text="Private" /> messenger that knows nothing about you
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
                There is no PrivaMesh server. Nothing to subpoena, breach, log, or shut down. Just
                end-to-end encrypted messages on Solana - no phone number, no email, no metadata.
                Trust math, not companies.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <AppStoreButton />
                <Button href={SITE.whitepaper} external variant="ghost">
                  Read the White Paper
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-text-muted">
                {TRUST_ROW.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span className="text-text-faint">·</span>}
                    <span className="flex items-center gap-1.5">
                      <Check size={13} className="text-accent" /> {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-hero-glow blur-3xl"
                aria-hidden="true"
              />
              <PhoneMockup
                src="/screenshots/01.png?v=2"
                alt="PrivaMesh private messenger app open on iPhone showing an end-to-end encrypted chat with no servers"
                priority
                sizes="(max-width: 768px) 78vw, 520px"
                className="animate-float"
              />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 2 - NO SERVERS, CONCRETELY */}
      <section className="py-16 sm:py-20" aria-labelledby="no-servers-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              The differentiator
            </p>
            <h2
              id="no-servers-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              No servers - concretely
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Most &ldquo;private&rdquo; messengers still run servers that see who you talk to.
              PrivaMesh has none. Here is exactly where every piece of your data lives.
            </p>
          </FadeUp>

          <FadeUp className="mt-8 overflow-x-auto rounded-card bg-white/20 backdrop-blur-sm">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border font-mono text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="px-5 py-4 font-semibold">What</th>
                  <th className="px-5 py-4 font-semibold">Where it lives</th>
                  <th className="px-5 py-4 font-semibold">How</th>
                </tr>
              </thead>
              <tbody>
                {NO_SERVERS_TABLE.map((row) => (
                  <tr key={row.what} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-text-primary">{row.what}</td>
                    <td className="px-5 py-4 text-text-secondary">{row.where}</td>
                    <td className="px-5 py-4 text-text-muted">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
          <p className="mt-5 text-sm text-text-muted">
            <Link href="/features/no-servers" className="text-accent hover:underline">
              How the serverless architecture works →
            </Link>
          </p>
        </Container>
      </section>

      <SectionDivider />

      {/* 3 - MESSAGE LIFECYCLE */}
      <section className="py-16 sm:py-20" aria-labelledby="lifecycle-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="lifecycle-heading"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              One message, three steps
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Send → Chain → Receive. No middle box, no relay, no inbox on someone else&rsquo;s
              computer.
            </p>
          </FadeUp>
          <div className="relative mt-10 grid gap-6 md:grid-cols-3">
            <div
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-border via-border-hover to-border md:block"
              aria-hidden="true"
            />
            {LIFECYCLE_STEPS.map((s, i) => (
              <FadeUp key={s.step} delay={i * 80}>
                <div className="relative h-full rounded-card border border-border bg-white/20 backdrop-blur-sm p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-accent bg-bg-base font-mono text-sm text-accent">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-mono text-base text-text-primary">{s.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 4 - METADATA PRIVACY */}
      <section className="py-16 sm:py-20" aria-labelledby="metadata-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="metadata-heading"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Hide who. Hide when. Hide how.
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Encryption hides the message. PrivaMesh also hides the metadata - the who, when and
              how that a server would otherwise see.
            </p>
          </FadeUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {METADATA_CARDS.map((c, i) => {
              const Icon = METADATA_ICONS[c.icon as keyof typeof METADATA_ICONS]
              return (
                <FadeUp key={c.title} delay={i * 80}>
                  <Link
                    href={c.href}
                    className="group flex h-full flex-col rounded-card border border-border bg-white/20 backdrop-blur-sm p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-semibold text-text-primary">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{c.body}</p>
                    <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                      Learn more
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 5 - ENCRYPTION */}
      <section className="py-16 sm:py-20" aria-labelledby="encryption-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                The cryptography
              </p>
              <h2
                id="encryption-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
              >
                End-to-end encryption, done properly
              </h2>
              <p className="mt-4 text-text-muted">
                PrivaMesh uses the same battle-tested primitives that secure Signal, adapted for a
                serverless world. Every message gets a fresh key, so a compromised key can&rsquo;t
                unlock your past or future conversations.
              </p>
              <p className="mt-4 text-sm text-text-muted">
                <Link href="/features/e2e-encryption" className="text-accent hover:underline">
                  Read the plain-English encryption explainer →
                </Link>
              </p>
            </FadeUp>
            <div className="space-y-3">
              {[
                {
                  name: 'X3DH',
                  desc: 'Curve25519 handshake establishes a shared secret without a trusted key server.',
                },
                {
                  name: 'Double Ratchet',
                  desc: 'HKDF + HMAC-SHA256 rotate keys every message for forward secrecy and post-compromise security.',
                },
                {
                  name: 'AES-256-GCM',
                  desc: 'Authenticated encryption seals each payload, padded to fixed-size buckets to hide length.',
                },
              ].map((row, i) => (
                <FadeUp key={row.name} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-card border border-border bg-white/20 backdrop-blur-sm p-5">
                    <code className="whitespace-nowrap rounded bg-bg-elevated px-2 py-1 font-mono text-[13px] text-accent">
                      {row.name}
                    </code>
                    <p className="text-sm leading-relaxed text-text-muted">{row.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 6 - SCREENSHOT GALLERY */}
      <section className="py-16 sm:py-20" aria-labelledby="gallery-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="gallery-heading"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              See it on your iPhone
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              A private messaging app that looks and feels like a premium chat app - with none of
              the surveillance underneath.
            </p>
          </FadeUp>
          <div className="mt-10">
            <ScreenshotGallery />
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 7 - COMPARISON TEASER */}
      <section className="py-16 sm:py-20" aria-labelledby="compare-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="compare-heading"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              PrivaMesh vs the messengers you know
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Signal is excellent. Telegram is popular. Neither is serverless. Here is the short
              version.
            </p>
          </FadeUp>
          <FadeUp className="mt-8 overflow-x-auto rounded-card bg-white/20 backdrop-blur-sm">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-card border border-border text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-left font-semibold text-text-secondary">Feature</th>
                  {COMPARE_TEASER.columns.map((c, i) => (
                    <th
                      key={c}
                      className={`px-5 py-4 text-center font-semibold ${i === 0 ? 'text-accent' : 'text-text-secondary'}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_TEASER.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-text-primary">{row.feature}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-4 text-center">
                        <span className="inline-flex justify-center">
                          <CompareCell state={v} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/compare/privamesh-vs-signal" className="text-accent hover:underline">
              PrivaMesh vs Signal →
            </Link>
            <Link href="/compare/privamesh-vs-telegram" className="text-accent hover:underline">
              PrivaMesh vs Telegram →
            </Link>
            <Link href="/compare/privamesh-vs-session" className="text-accent hover:underline">
              PrivaMesh vs Session →
            </Link>
            <Link href="/best-private-messaging-apps" className="text-accent hover:underline">
              Best private messaging apps 2026 →
            </Link>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 9 - FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="faq-heading">
        <Container>
          <FadeUp className="mx-auto w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="faq-heading"
              className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Frequently asked questions
            </h2>
          </FadeUp>
          <div className="mt-10">
            <FAQ items={HOME_FAQ} />
          </div>
        </Container>
      </section>

      {/* 10 - FINAL CTA */}
      <section
        className="border-t border-border bg-white/20 backdrop-blur-sm py-20"
        aria-labelledby="cta-heading"
      >
        <Container className="text-center">
          <FadeUp>
            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Stop trusting companies with your conversations
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted">
              PrivaMesh replaces the company with math and the server with a blockchain. Your keys,
              your device, your words.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <AppStoreButton />
              <Button href="/privacy" variant="ghost">
                Why it&rsquo;s private
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  )
}
