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
  title: 'Цены и лимиты сообщений',
  description:
    'Сколько стоит PrivaMesh: загрузка бесплатна, Plus — $5.99 за 1200 сообщений в месяц, Pro — $9.99 за 2000, плюс разовые пакеты. Почему есть счётчик.',
  path: '/ru/pricing',
  locale: 'ru',
  languages: { en: '/pricing', ru: '/ru/pricing' },
})

const TIERS = [
  {
    name: 'Бесплатно',
    price: 'Бесплатно',
    per: 'загрузка',
    allowance: `${SITE.allowance.free} спонсируемых сообщений`,
    perks: ['Один аккаунт', 'Полное шифрование, без урезания функций', 'Пакет можно купить в любой момент'],
    note: 'Само приложение бесплатно. Отправка тарифицируется, поэтому у бесплатного аккаунта нет спонсируемого лимита — пополните пакетом или оформите подписку.',
  },
  {
    name: 'PrivaMesh+',
    price: `$${SITE.price.plus}`,
    per: 'месяц',
    allowance: `${SITE.allowance.plus.toLocaleString('ru-RU')} сообщений в месяц`,
    perks: ['До 3 аккаунтов', 'Галочка верификации', 'Лимит обновляется ежемесячно'],
    note: 'Тариф, который нужен большинству. Cover traffic тратит этот же лимит — поэтому он выключен по умолчанию.',
    highlight: true,
  },
  {
    name: 'PrivaMesh Pro',
    price: `$${SITE.price.pro}`,
    per: 'месяц',
    allowance: `${SITE.allowance.pro.toLocaleString('ru-RU')} сообщений в месяц`,
    perks: ['До 3 аккаунтов', 'Галочка верификации', 'Один бесплатный минт ника'],
    note: 'Для активного использования или чтобы держать cover traffic постоянно включённым, не следя за счётчиком.',
  },
]

const FAQS = [
  {
    q: 'Почему сообщения вообще тарифицируются?',
    a: 'Каждое сообщение — транзакция Solana, а у каждой транзакции есть комиссия сети. Наш fee worker платит её, чтобы вам не приходилось держать SOL. Лимит — это то, что финансирует воркер: счётчик отражает реальную стоимость сообщения, а не искусственное ограничение.',
  },
  {
    q: 'Что происходит, когда сообщения заканчиваются?',
    a: 'Отправка останавливается до обновления лимита или покупки пакета. Приём, чтение и существующие переписки не затрагиваются. Ничего не удаляется, аккаунт не блокируется.',
  },
  {
    q: 'Связывает ли оплата покупку с моими сообщениями?',
    a: 'Нет, и на это ушла реальная работа. Приложение один раз подтверждает подписку и получает пул слепых RSA-подписей; каждая отправка тратит один токен. Fee worker может проверить, что токен действителен и не потрачен, но не может связать его с покупкой или другим токеном.',
  },
  {
    q: 'Это те цены, которые я заплачу?',
    a: 'Это цены для США. Apple регионализирует цены, поэтому сумма в вашей валюте — та, что показывает App Store для вашего аккаунта. Авторитетна именно она, а не эта страница.',
  },
  {
    q: 'Как отменить подписку?',
    a: 'Подписки биллит Apple: «Настройки» iOS → ваше имя → «Подписки». Возвраты — через reportaproblem.apple.com. Мы не можем сделать ни то, ни другое за вас.',
  },
]

export default function RuPricingPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Цены"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Цены', path: '/ru/pricing' },
        ]}
        title="Цены и лимиты сообщений"
        lead="Приложение бесплатно. Отправка тарифицируется, потому что каждое сообщение — платная транзакция в публичной сети. Здесь точно сколько это стоит и почему."
      >
        <AppStoreButton />
      </PageHeader>

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        Установка бесплатна. Plus — ${SITE.price.plus} в месяц за{' '}
        {SITE.allowance.plus.toLocaleString('ru-RU')} сообщений, Pro — ${SITE.price.pro} за{' '}
        {SITE.allowance.pro.toLocaleString('ru-RU')}, разовые пакеты — от ${SITE.packs[0].price}.
        Бесплатного спонсируемого лимита нет: каждое сообщение стоит реальной комиссии, которую
        кто-то должен оплатить.
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
                  <Check size={17} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-relaxed text-text-muted">{t.note}</p>
          </FadeUp>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Разовые пакеты сообщений
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-muted">
        Пакеты не сгорают и складываются с лимитом подписки. Это способ пользоваться PrivaMesh без
        регулярного списания.
      </p>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[420px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">Разовые пакеты сообщений PrivaMesh и цены</caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Пакет</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Цена</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">За 100 сообщений</th>
            </tr>
          </thead>
          <tbody>
            {SITE.packs.map((p) => (
              <tr key={p.messages} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
                  {p.messages.toLocaleString('ru-RU')} сообщений
                </th>
                <td className="px-5 py-4 text-text-secondary">${p.price}</td>
                <td className="px-5 py-4 text-text-muted">
                  ${((Number(p.price) / p.messages) * 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Зачем вообще счётчик</h2>
          <p>
            Большинство мессенджеров бесплатны, потому что их что-то субсидирует — реклама, данные
            или венчурные деньги в ожидании одного из двух. У PrivaMesh нет рекламы и нечего
            продавать, потому что нечего и собирать. Зато есть реальная переменная стоимость:
            каждое сообщение — транзакция Solana с комиссией.
          </p>
          <p>
            Эту комиссию платит воркер, чтобы вам не пришлось держать SOL и следить за балансом.
            Лимит финансирует воркера. Это честный счётчик на реальные расходы, а не платный доступ
            к функции: шифрование, защита метаданных и все свойства безопасности одинаковы на всех
            тарифах.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        title="Читать дальше"
        links={[
          { href: '/ru/architecture', label: 'Архитектура', blurb: 'Что видит fee worker и зачем нужны слепые токены.' },
          { href: '/ru/limitations', label: 'Ограничения', blurb: 'В том числе что будет, когда закончится лимит.' },
          { href: '/ru/support', label: 'Поддержка', blurb: 'Управление подпиской и возвраты через Apple.' },
        ]}
      />
    </Container>
  )
}
