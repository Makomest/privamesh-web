import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import JsonLd from '@/components/JsonLd'
import PageFaq from '@/components/PageFaq'
import { Blocks, Paras, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'
import type en from '@/messages/en/feature-duress-code.json'

type T = typeof en
const PAGE = 'feature-duress-code'
const PATH = '/features/duress-code'

/** Whether each platform in the catalog's `platforms` has shipped it, in order. */
const SHIPPED = [true, true, false]

export function duressCodeMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function DuressCodePage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')

  return (
    <Container>
      <JsonLd data={softwareApplicationLd} />
      <PageHeader
        eyebrow={t.eyebrow}
        crumbLabel={ui.breadcrumb}
        trail={[
          { name: ui.home, path: localePath(locale, '/') },
          { name: ui.nav.features, path: localizeHref('/features/no-servers', locale) },
          { name: t.eyebrow, path: localePath(locale, PATH) },
        ]}
        title={t.title}
        lead={t.lead}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={localizeHref('/download', locale)}>{ui.getApp}</Button>
          <Button href={localizeHref('/threat-model', locale)} variant="ghost">
            {t.ctaSecondary}
          </Button>
        </div>
      </PageHeader>

      <p className="mt-8 max-w-3xl border-s-2 border-border-accent ps-5 text-lg leading-relaxed text-text-secondary">
        {t.summary}
      </p>

      <div className="mt-12 max-w-3xl">
        <Prose>
          <Blocks items={t.body} locale={locale} />
        </Prose>
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary">
        {t.platformsHeading}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {t.platforms.map((p, i) => (
          <FadeUp
            key={p.name}
            delay={i * 60}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h3>
            <p
              className={`mt-1 text-sm font-medium ${
                SHIPPED[i] ? 'text-text-secondary' : 'text-text-muted'
              }`}
            >
              {p.status}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{p.detail}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-12 max-w-3xl">
        <Prose>
          <Paras items={t.after} locale={locale} />
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
