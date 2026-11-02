import Link from 'next/link'
import type { Metadata } from 'next'
import { EyeOff, Shuffle, Ruler, ArrowRight, Check } from 'lucide-react'
import { Container, SectionDivider } from '@/components/Container'
import { Button } from '@/components/Button'
import PhoneMockup from '@/components/PhoneMockup'
import HeroScramble from '@/components/HeroScramble'
import FadeUp from '@/components/FadeUp'
import ScreenshotGallery from '@/components/ScreenshotGallery'
import CompareCell from '@/components/CompareCell'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import DownloadButton from '@/components/DownloadButton'
import { localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd, faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { SCREENSHOTS, COMPARE_TEASER } from '@/lib/data'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'
import type en from '@/messages/en/home.json'

type T = typeof en
const PAGE = 'home'

export function homeMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, '/'),
    locale,
    i18n: { page: PAGE, enPath: '/' },
  })
}

const METADATA_ICONS = [EyeOff, Shuffle, Ruler]
const CRYPTO = ['X3DH', 'Double Ratchet', 'AES-256-GCM']

export default function HomePage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')
  const href = (p: string) => localizeHref(p, locale)
  const [before, after] = t.hero.title.split('{scramble}')
  const shots = SCREENSHOTS.map((s, i) => ({ ...s, ...t.gallery.shots[i] }))

  return (
    <>
      <JsonLd data={softwareApplicationLd} />
      <JsonLd data={faqPageLd(t.faq)} />

      {/* 1 - HERO */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <div className="mesh-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative rounded-3xl p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] backdrop-blur-sm px-3 py-1 font-mono text-xs text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t.hero.badge}
              </p>
              <h1 className="text-h1-m sm:text-h1-d">
                {before}
                <HeroScramble text={t.hero.scramble} />
                {after}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <DownloadButton label={t.hero.cta} />
                <Button href={href('/threat-model')} variant="ghost">
                  {t.hero.threatModel}
                </Button>
              </div>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-text-muted">
                <Link href={href('/architecture')} className="hover:text-accent">
                  {t.hero.architecture}
                </Link>
                <Link href={href('/limitations')} className="hover:text-accent">
                  {t.hero.limitations}
                </Link>
                <Link href={href('/security')} className="hover:text-accent">
                  {t.hero.security}
                </Link>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {t.hero.source}
                </a>
              </p>
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-text-muted">
                {t.hero.trust.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="text-text-faint">·</span>}
                    <span className="flex items-center gap-1.5">
                      <Check size={13} className="text-accent" /> {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-hero-glow blur-3xl" aria-hidden="true" />
              <PhoneMockup
                src="/screenshots/01.png?v=3"
                alt={t.hero.phoneAlt}
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
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{t.noServers.eyebrow}</p>
            <h2 id="no-servers-heading" className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.noServers.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">{t.noServers.lead}</p>
          </FadeUp>

          <FadeUp className="mt-8 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border font-mono text-sm">
              <thead>
                <tr className="border-b border-border text-start text-text-secondary">
                  <th className="px-5 py-4 text-start font-semibold">{t.noServers.colWhat}</th>
                  <th className="px-5 py-4 text-start font-semibold">{t.noServers.colWhere}</th>
                  <th className="px-5 py-4 text-start font-semibold">{t.noServers.colHow}</th>
                </tr>
              </thead>
              <tbody>
                {t.noServers.rows.map((row) => (
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
            <Link href={href('/features/no-servers')} className="text-accent hover:underline">
              {t.noServers.more}
            </Link>
          </p>
        </Container>
      </section>

      <SectionDivider />

      {/* 3 - MESSAGE LIFECYCLE */}
      <section className="py-16 sm:py-20" aria-labelledby="lifecycle-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2 id="lifecycle-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.lifecycle.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">{t.lifecycle.lead}</p>
          </FadeUp>
          <div className="relative mt-10 grid gap-6 md:grid-cols-3">
            <div
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-border via-border-hover to-border md:block"
              aria-hidden="true"
            />
            {t.lifecycle.steps.map((s, i) => (
              <FadeUp key={s.label} delay={i * 80}>
                <div className="relative h-full rounded-card border border-border bg-white/[0.03] backdrop-blur-sm p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-accent bg-bg-base font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, '0')}
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
            <h2 id="metadata-heading" className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.metadata.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">{t.metadata.lead}</p>
          </FadeUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.metadata.cards.map((c, i) => {
              const Icon = METADATA_ICONS[i]
              return (
                <FadeUp key={c.title} delay={i * 80}>
                  <Link
                    href={href('/features/metadata-protection')}
                    className="group flex h-full flex-col rounded-card border border-border bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
                  >
                    <Icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-semibold text-text-primary">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{c.body}</p>
                    <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                      {t.metadata.more}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
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
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{t.crypto.eyebrow}</p>
              <h2 id="encryption-heading" className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                {t.crypto.title}
              </h2>
              <p className="mt-4 text-text-muted">{t.crypto.lead}</p>
              <p className="mt-4 text-sm text-text-muted">
                <Link href={href('/features/e2e-encryption')} className="text-accent hover:underline">
                  {t.crypto.more}
                </Link>
              </p>
            </FadeUp>
            <div className="space-y-3">
              {CRYPTO.map((name, i) => (
                <FadeUp key={name} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-card border border-border bg-white/[0.03] backdrop-blur-sm p-5">
                    <code className="whitespace-nowrap rounded bg-bg-elevated px-2 py-1 font-mono text-[13px] text-accent" dir="ltr">
                      {name}
                    </code>
                    <p className="text-sm leading-relaxed text-text-muted">{t.crypto.rows[i]}</p>
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
            <h2 id="gallery-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.gallery.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">{t.gallery.lead}</p>
          </FadeUp>
          <div className="mt-10">
            <ScreenshotGallery shots={shots} />
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 7 - COMPARISON TEASER */}
      <section className="py-16 sm:py-20" aria-labelledby="compare-heading">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2 id="compare-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.compare.title}
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">{t.compare.lead}</p>
          </FadeUp>
          <FadeUp className="mt-8 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-card border border-border text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-start font-semibold text-text-secondary">{t.compare.feature}</th>
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
                {COMPARE_TEASER.rows.map((row, r) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-text-primary">{t.compare.rows[r]}</td>
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
            <Link href={href('/compare/privamesh-vs-signal')} className="text-accent hover:underline">
              {t.compare.vsSignal}
            </Link>
            <Link href={href('/compare/privamesh-vs-telegram')} className="text-accent hover:underline">
              {t.compare.vsTelegram}
            </Link>
            <Link href={href('/compare/privamesh-vs-session')} className="text-accent hover:underline">
              {t.compare.vsSession}
            </Link>
            <Link href={href('/best-private-messaging-apps')} className="text-accent hover:underline">
              {t.compare.best}
            </Link>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* 8 - FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="faq-heading">
        <Container>
          <FadeUp className="mx-auto w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2 id="faq-heading" className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {ui.faq}
            </h2>
          </FadeUp>
          <div className="mt-10">
            <FAQ items={t.faq} />
          </div>
        </Container>
      </section>

      {/* 9 - FINAL CTA */}
      <section className="border-t border-border bg-white/[0.03] backdrop-blur-sm py-20" aria-labelledby="cta-heading">
        <Container className="text-center">
          <FadeUp>
            <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted">{t.cta.lead}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DownloadButton />
              <Button href={href('/privacy-policy')} variant="ghost">
                {t.cta.policy}
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  )
}
