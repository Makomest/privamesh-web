import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { md, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { getMessages } from '@/lib/i18n/messages'
import { localePath } from '@/lib/i18n/locales'
import { fill, type Common } from '@/lib/i18n/common'
import type en from '@/messages/en/support.json'

type T = typeof en
const PAGE = 'support'
const PATH = '/support'

export function supportMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function SupportPage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')
  const email = { email: SITE.supportEmail }

  return (
    <>
      <JsonLd data={faqPageLd(t.faq)} />
      <Container>
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

        <div className="mt-12 max-w-3xl">
          <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.contact.heading}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted [&_a]:font-medium [&_a]:text-accent hover:[&_a]:underline [&_strong]:text-text-secondary">
              {md(fill(t.contact.lead, email), locale)}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">{t.contact.tip}</p>

            <div className="mt-6 flex items-start gap-3 rounded-btn border border-border-accent bg-accent/[0.06] p-4">
              <AlertTriangle size={18} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
              <p className="text-[15px] leading-relaxed text-text-secondary">{t.contact.warning}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <Mail size={15} aria-hidden="true" />
                {t.contact.email}
              </a>
              <Link href={localizeHref('/privacy-policy', locale)} className="text-text-muted hover:text-accent">
                {t.contact.privacy}
              </Link>
              <Link href={localizeHref('/terms', locale)} className="text-text-muted hover:text-accent">
                {t.contact.terms}
              </Link>
            </div>
          </FadeUp>
        </div>

        <section className="mt-16" aria-labelledby="support-faq">
          <h2 id="support-faq" className="mb-6 text-2xl font-bold tracking-tight text-text-primary">
            {ui.faq}
          </h2>
          <FAQ items={t.faq} />
        </section>

        <div className="mt-12 max-w-3xl">
          <Prose>
            <p>{md(fill(t.refunds, email), locale)}</p>
          </Prose>
        </div>

        <RelatedLinks
          title={ui.keepReading}
          links={t.related.map((l) => ({ ...l, href: localizeHref(l.href, locale) }))}
        />
      </Container>
    </>
  )
}
