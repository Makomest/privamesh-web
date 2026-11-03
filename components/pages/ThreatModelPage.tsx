import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { Paras, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'
import type en from '@/messages/en/threat-model.json'

type T = typeof en
const PAGE = 'threat-model'
const PATH = '/threat-model'

export function threatModelMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function ThreatModelPage({ locale }: { locale: string }) {
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

      <FadeUp className="mt-12 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[900px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">{t.tableCaption}</caption>
          <thead>
            <tr className="border-b border-border">
              {(['adversary', 'sees', 'cannot', 'defence', 'residual'] as const).map((k) => (
                <th
                  key={k}
                  className={`px-5 py-4 text-start font-semibold ${
                    k === 'defence' ? 'text-accent' : 'text-text-secondary'
                  }`}
                >
                  {t.cols[k]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.adversaries.map((a, i) => (
              <tr key={i} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-start font-medium text-text-primary">
                  {a.name}
                </th>
                <td className="px-5 py-4 text-text-muted">{a.sees}</td>
                <td className="px-5 py-4 text-text-muted">{a.cannot}</td>
                <td className="px-5 py-4 text-text-secondary">{a.defence}</td>
                <td className="px-5 py-4 text-text-muted">{a.residual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.assumeHeading}</h2>
          <Paras items={t.assume} locale={locale} />
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
