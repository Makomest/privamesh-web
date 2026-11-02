import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import PlatformCard, { PLATFORM_GRID } from '@/components/PlatformCard'
import { Paras, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { platformsFrom } from '@/lib/platforms'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'
import type en from '@/messages/en/download.json'

type T = typeof en
const PAGE = 'download'
const PATH = '/download'

export function downloadMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function DownloadPage({ locale }: { locale: string }) {
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
          { name: t.eyebrow, path: localePath(locale, PATH) },
        ]}
        title={t.title}
        lead={t.lead}
      >
        <AppStoreButton label={t.appStoreCta} />
      </PageHeader>

      <div className={PLATFORM_GRID}>
        {platformsFrom(t.platforms).map((p, i) => (
          <PlatformCard key={p.id} platform={p} delay={i * 60} labels={{ notAvailable: t.notAvailable }} />
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">{t.first.heading}</h2>
          <ul className="mt-4 space-y-3">
            {t.first.steps.map((step) => (
              <li key={step} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                <Check size={17} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-text-muted">{t.first.footnote}</p>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.before.heading}</h2>
          <Paras items={t.before.paras} locale={locale} />
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
