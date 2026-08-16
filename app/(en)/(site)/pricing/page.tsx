import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Pricing and message allowances',
  description:
    'What PrivaMesh costs: a free download, Plus at $5.99 for 1,200 messages a month, Pro at $9.99 for 2,000, and one-off packs. Why messages are metered at all.',
  path: '/pricing',
  languages: { en: '/pricing', ru: '/ru/pricing' },
})

const TIERS = [
  {
    name: 'Free',
    price: 'Free',
    per: 'download',
    allowance: `${SITE.allowance.free} sponsored messages`,
    perks: ['One account', 'Full encryption, no feature gating', 'Buy a message pack any time'],
    note: 'The app itself is free. Sending is metered, so a free account has no sponsored allowance - top up with a pack or subscribe.',
  },
  {
    name: 'PrivaMesh+',
    price: `$${SITE.price.plus}`,
    per: 'month',
    allowance: `${SITE.allowance.plus.toLocaleString('en-US')} messages a month`,
    perks: ['Up to 3 accounts', 'Verified checkmark', 'Allowance resets monthly'],
    note: 'The tier most people want. Cover traffic spends from this allowance, which is why it is off by default.',
    highlight: true,
  },
  {
    name: 'PrivaMesh Pro',
    price: `$${SITE.price.pro}`,
    per: 'month',
    allowance: `${SITE.allowance.pro.toLocaleString('en-US')} messages a month`,
    perks: ['Up to 3 accounts', 'Verified checkmark', 'One free nickname mint'],
    note: 'For heavy use, or for running cover traffic continuously without watching the counter.',
  },
]

const FAQS = [
  {
    q: 'Why is messaging metered at all?',
    a: 'Every message is a Solana transaction and every transaction costs a network fee. Our fee worker pays that fee so you never have to hold SOL. The allowance is what funds it - the meter reflects a real per-message cost rather than an artificial limit.',
  },
  {
    q: 'What happens when I run out of messages?',
    a: 'Sending stops until the allowance resets or you buy a pack. Receiving, reading and your existing conversations are unaffected. Nothing is deleted and no account is locked.',
  },
  {
    q: 'Does paying link my purchase to my messages?',
    a: 'No, and that took real work to avoid. The app proves the subscription once and receives a pool of RSA blind signatures; each send spends one token. The fee worker can check a token is valid and unspent and cannot link it to the purchase or to any other token.',
  },
  {
    q: 'Are these the prices I will actually pay?',
    a: 'These are the US tier prices. Apple regionalises pricing, so the amount in your local currency is whatever the App Store shows on your account - that figure, not this page, is authoritative.',
  },
  {
    q: 'How do I cancel?',
    a: 'Subscriptions are billed by Apple, so cancel in the iOS Settings app under your name, then Subscriptions. Refunds go through reportaproblem.apple.com. We cannot process either on your behalf.',
  },
]

export default function PricingPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Pricing"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ]}
        title="Pricing and message allowances"
        lead="The app is a free download. Sending is metered because every message is a paid transaction on a public chain - here is exactly what that costs and why."
      >
        <AppStoreButton label="Download on the App Store" />
      </PageHeader>

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        PrivaMesh is free to install. Plus is ${SITE.price.plus} a month for{' '}
        {SITE.allowance.plus.toLocaleString('en-US')} messages, Pro is ${SITE.price.pro} for{' '}
        {SITE.allowance.pro.toLocaleString('en-US')}, and one-off packs start at $
        {SITE.packs[0].price}. There is no free sponsored allowance, because every message costs a
        real network fee that somebody has to pay.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TIERS.map((t, i) => (
          <FadeUp
            key={t.name}
            delay={i * 60}
            className={`rounded-card border p-6 backdrop-blur-sm ${
              t.highlight ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
            }`}
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{t.name}</h2>
            <p className="mt-3">
              <span className="text-3xl font-bold tracking-tight text-text-primary">{t.price}</span>
              <span className="ml-1.5 text-sm text-text-muted">/ {t.per}</span>
            </p>
            <p className="mt-3 font-mono text-[13px] text-accent">{t.allowance}</p>
            <ul className="mt-5 space-y-2.5">
              {t.perks.map((p) => (
                <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    className="mt-0.5 flex-none text-success"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-text-muted">{t.note}</p>
          </FadeUp>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        One-off message packs
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-muted">
        Packs never expire and stack on top of any subscription allowance. They are the way to use
        PrivaMesh without a recurring charge.
      </p>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[420px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">PrivaMesh one-off message packs and prices</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Pack</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Price</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Per message</th>
            </tr>
          </thead>
          <tbody>
            {SITE.packs.map((p) => (
              <tr key={p.messages} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
                  {p.messages.toLocaleString('en-US')} messages
                </th>
                <td className="px-5 py-4 text-text-secondary">${p.price}</td>
                <td className="px-5 py-4 text-text-muted">
                  ${((Number(p.price) / p.messages) * 100).toFixed(2)} per 100
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Why there is a meter at all</h2>
          <p>
            Most messengers are free because they are subsidised by something - ads, data, or
            venture funding waiting for one of those. PrivaMesh has no ads and nothing to sell,
            because it collects nothing to sell. What it does have is a real marginal cost: every
            message is a Solana transaction with a network fee attached.
          </p>
          <p>
            A worker pays that fee so you never have to hold SOL or think about a wallet balance.
            The allowance is what funds the worker. It is an honest meter on a real cost rather
            than a paywall in front of a feature - encryption, metadata protection and every
            security property are identical on every tier.
          </p>

          <h2>Paying without being tracked</h2>
          <p>
            Metering creates its own privacy problem: proving you paid usually means attaching a
            receipt to every request, at which point the operator can link purchase to activity.
            PrivaMesh proves the subscription once and receives a pool of RSA blind signatures, and
            each send spends one token that cannot be linked back.{' '}
            <Link href="/architecture">The architecture page</Link> shows exactly what the fee
            worker can and cannot see.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        links={[
          {
            href: '/architecture',
            label: 'Architecture',
            blurb: 'What the fee worker sees, and why blind tokens are in the design.',
          },
          {
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'Including what happens when the allowance runs out.',
          },
          {
            href: '/support',
            label: 'Support',
            blurb: 'Managing or cancelling a subscription, and refunds through Apple.',
          },
        ]}
      />
    </Container>
  )
}
