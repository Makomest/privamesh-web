import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { md, Paras, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'
import type en from '@/messages/en/architecture.json'

type T = typeof en
const PAGE = 'architecture'
const PATH = '/architecture'

/**
 * Whether a user can swap each component for one they control, in the order
 * of `components` in the catalog. A fact, not prose, so it lives here.
 */
const REPLACEABLE = ['yes', 'partly', 'yes', 'no', 'no'] as const

export function architectureMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function ArchitecturePage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')

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

      <p className="mt-8 max-w-3xl border-s-2 border-border-accent ps-5 text-lg leading-relaxed text-text-secondary">
        {t.summary}
      </p>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {t.flowHeading}
      </h2>
      <FadeUp className="mt-6 overflow-x-auto">
        <ol className="flex min-w-[720px] items-stretch gap-2">
          {t.flow.map((s, i) => (
            <li key={i} className="flex flex-1 items-stretch gap-2">
              <div className="flex-1 rounded-card border border-border bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-semibold text-text-primary">{s.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{s.detail}</p>
              </div>
              {i < t.flow.length - 1 && (
                <ArrowRight
                  size={18}
                  className="mt-8 flex-none text-text-muted rtl:rotate-180"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </FadeUp>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {t.tableHeading}
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[860px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">{t.tableCaption}</caption>
          <thead>
            <tr className="border-b border-border">
              {(['component', 'operator', 'sees', 'stores', 'replaceable'] as const).map((k) => (
                <th key={k} className="px-5 py-4 text-start font-semibold text-text-secondary">
                  {t.cols[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.components.map((c, i) => (
              <tr key={i} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-start font-medium text-text-primary">
                  {c.name}
                  <span className="mt-1 block text-[13px] font-normal leading-relaxed text-text-muted">
                    {c.note}
                  </span>
                </th>
                <td className="px-5 py-4 text-text-secondary">{c.operator}</td>
                <td className="px-5 py-4 text-text-muted">{c.sees}</td>
                <td className="px-5 py-4 text-text-muted">{c.stores}</td>
                <td className="px-5 py-4 text-text-secondary">{t.replaceable[REPLACEABLE[i]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.whyHeading}</h2>
          <Paras items={t.why} locale={locale} />

          <h2>{t.gapsHeading}</h2>
          <p>{md(t.gaps, locale)}</p>
        </Prose>
      </div>

      <PageFaq items={t.faq} title={ui.faq} />

      <RelatedLinks
        title={ui.keepReading}
        links={t.related.map((l) => ({ ...l, href: localizeHref(l.href, locale) }))}
      />
    </Container>
  )
}
