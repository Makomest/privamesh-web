import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import DownloadButton from '@/components/DownloadButton'
import { Paras, localizeHref } from '@/components/Md'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { getMessages } from '@/lib/i18n/messages'
import { getLocale, localePath } from '@/lib/i18n/locales'
import { fill, type Common } from '@/lib/i18n/common'
import type en from '@/messages/en/pricing.json'

type T = typeof en
const PAGE = 'pricing'
const PATH = '/pricing'

/**
 * Prices, allowances and pack sizes come from SITE and are formatted for the
 * reader's locale here, so no catalog ever carries a number that can go stale.
 */
function numbers(locale: string) {
  const tag = getLocale(locale)?.hreflang ?? 'en'
  const n = (v: number) => new Intl.NumberFormat(tag).format(v)
  const usd = (v: string | number) =>
    new Intl.NumberFormat(tag, { style: 'currency', currency: SITE.price.currency }).format(Number(v))
  return {
    n,
    usd,
    vars: {
      plus: usd(SITE.price.plus),
      pro: usd(SITE.price.pro),
      plusN: n(SITE.allowance.plus),
      proN: n(SITE.allowance.pro),
      packFrom: usd(SITE.packs[0].price),
    },
  }
}

export function pricingMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  const { vars } = numbers(locale)
  return pageMetadata({
    title: t.meta.title,
    description: fill(t.meta.description, vars),
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

export default function PricingPage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')
  const { n, usd, vars } = numbers(locale)

  const tiers = [
    {
      name: t.tiers.free.name,
      price: t.tiers.free.price,
      per: t.tiers.free.per,
      allowance: fill(t.tiers.free.allowance, { n: n(SITE.allowance.free) }),
      perks: t.tiers.free.perks,
      note: t.tiers.free.note,
    },
    {
      name: 'PrivaMesh+',
      price: vars.plus,
      per: t.tiers.plus.per,
      allowance: fill(t.tiers.plus.allowance, { n: vars.plusN }),
      perks: t.tiers.plus.perks,
      note: t.tiers.plus.note,
      highlight: true,
    },
    {
      name: 'PrivaMesh Pro',
      price: vars.pro,
      per: t.tiers.pro.per,
      allowance: fill(t.tiers.pro.allowance, { n: vars.proN }),
      perks: t.tiers.pro.perks,
      note: t.tiers.pro.note,
    },
  ]

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
        <DownloadButton label={t.cta} />
      </PageHeader>

      <p className="mt-8 max-w-3xl border-s-2 border-border-accent ps-5 text-lg leading-relaxed text-text-secondary">
        {fill(t.summary, vars)}
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <FadeUp
            key={tier.name}
            delay={i * 60}
            className={`rounded-card border p-6 backdrop-blur-sm ${
              tier.highlight ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
            }`}
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{tier.name}</h2>
            <p className="mt-3">
              <span className="text-3xl font-bold tracking-tight text-text-primary">{tier.price}</span>
              <span className="ms-1.5 text-sm text-text-muted">/ {tier.per}</span>
            </p>
            <p className="mt-3 font-mono text-[13px] text-accent">{tier.allowance}</p>
            <ul className="mt-5 space-y-2.5">
              {tier.perks.map((p) => (
                <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                  <Check size={17} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-text-muted">{tier.note}</p>
          </FadeUp>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{t.packs.heading}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-muted">{t.packs.lead}</p>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[420px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">{t.packs.caption}</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-start font-semibold text-text-secondary">{t.packs.colPack}</th>
              <th className="px-5 py-4 text-start font-semibold text-text-secondary">{t.packs.colPrice}</th>
              <th className="px-5 py-4 text-start font-semibold text-text-secondary">{t.packs.colPer}</th>
            </tr>
          </thead>
          <tbody>
            {SITE.packs.map((p) => (
              <tr key={p.messages} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-4 text-start font-medium text-text-primary">
                  {fill(t.packs.row, { n: n(p.messages) })}
                </th>
                <td className="px-5 py-4 text-text-secondary">{usd(p.price)}</td>
                <td className="px-5 py-4 text-text-muted">
                  {fill(t.packs.per100, { price: usd(((Number(p.price) / p.messages) * 100).toFixed(2)) })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>{t.prose.meterHeading}</h2>
          <Paras items={t.prose.meter} locale={locale} />
          <h2>{t.prose.trackedHeading}</h2>
          <Paras items={t.prose.tracked} locale={locale} />
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
