import type { Metadata } from 'next'
import { Bug, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { md, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { getMessages } from '@/lib/i18n/messages'
import { getLocale, localePath } from '@/lib/i18n/locales'
import { fill, type Common } from '@/lib/i18n/common'
import type en from '@/messages/en/security.json'

type T = typeof en
const PAGE = 'security'
const PATH = '/security'

/** Bounty amounts come from SITE, formatted as whole dollars for the reader's locale. */
function vars(locale: string) {
  const tag = getLocale(locale)?.hreflang ?? 'en'
  const usd = (v: number) =>
    new Intl.NumberFormat(tag, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(v)
  const b = SITE.bounty
  return {
    email: SITE.supportEmail,
    critical: usd(b.critical),
    high: usd(b.high),
    medium: usd(b.medium),
    low: usd(b.low),
  }
}

export function securityMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function SecurityPage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')
  const v = vars(locale)
  const f = (s: string) => md(fill(s, v), locale)
  const mailto = `mailto:${SITE.supportEmail}?subject=security`

  return (
    <Container>
      <JsonLd
        data={techArticleLd({
          headline: t.title,
          description: t.ldDescription,
          path: localePath(locale, PATH),
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })}
      />
      <PageHeader
        eyebrow={t.eyebrow}
        crumbLabel={ui.breadcrumb}
        trail={[
          { name: ui.home, path: localePath(locale, '/') },
          { name: t.eyebrow, path: localePath(locale, PATH) },
        ]}
        title={t.title}
        lead={t.lead}
      />

      <div className="mt-10 max-w-3xl">
        <FadeUp className="rounded-card border border-border-accent bg-accent/[0.06] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-3">
            <Bug size={20} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                {t.open.heading}
              </h2>
              {t.open.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 text-[15px] leading-relaxed text-text-secondary [&_a]:font-medium [&_a]:text-accent hover:[&_a]:underline"
                >
                  {f(p)}
                </p>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.report.heading}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted [&_a]:font-medium [&_a]:text-accent hover:[&_a]:underline [&_strong]:text-text-secondary">
            {f(t.report.lead)}
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-text-muted">
            {t.report.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            <a href={mailto} className="inline-flex items-center gap-1.5 text-accent hover:underline">
              <Mail size={15} aria-hidden="true" />
              {t.report.cta}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              {t.report.source}
            </a>
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.commitHeading}</h2>
          <ul>
            {t.commits.map((c, i) => (
              <li key={i}>{f(c)}</li>
            ))}
          </ul>

          <h2>{t.rewardsHeading}</h2>
          <p>{f(t.rewards)}</p>

          <h2>{t.versionsHeading}</h2>
          <p>{f(t.versions)}</p>

          <h2>{t.fixedHeading}</h2>
          <p>{f(t.fixed)}</p>

          <h2>{t.scopeHeading}</h2>
          <p>{f(t.scope)}</p>
        </Prose>
      </div>

      <PageFaq items={t.faq.map((q) => ({ q: q.q, a: fill(q.a, v) }))} title={ui.faq} />

      <RelatedLinks
        title={ui.keepReading}
        links={t.related.map((l) => ({ ...l, href: localizeHref(l.href, locale) }))}
      />
    </Container>
  )
}
