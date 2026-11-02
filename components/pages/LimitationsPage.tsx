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
import type en from '@/messages/en/limitations.json'

type T = typeof en
const PAGE = 'limitations'
const PATH = '/limitations'

export function limitationsMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function LimitationsPage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')

  return (
    <Container>
      <JsonLd
        data={techArticleLd({
          headline: t.title,
          description: t.meta.description,
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

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {t.items.map((l, i) => (
          <FadeUp
            key={l.title}
            delay={(i % 2) * 60}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{l.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{l.body}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.whyHeading}</h2>
          <Paras items={t.why} locale={locale} />
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
