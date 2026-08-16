import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { COMPONENTS_RU, FLOW_RU } from '@/lib/architecture'

export const metadata: Metadata = pageMetadata({
  title: 'Архитектура: что видит каждый компонент',
  description:
    'Все компоненты PrivaMesh и что каждый может наблюдать: iOS-клиент, наш fee worker, RPC-эндпоинт, Solana и StoreKit. Названы, а не спрятаны.',
  path: '/ru/architecture',
  locale: 'ru',
  languages: { en: '/architecture', ru: '/ru/architecture' },
})

const FAQS = [
  {
    q: 'PrivaMesh запускает какие-нибудь серверы?',
    a: 'Один. Fee worker оплачивает комиссию сети Solana за каждую транзакцию, чтобы вам не приходилось держать SOL. Он видит аккаунт и время, но никогда не видит открытый текст или получателя. Базы аккаунтов и хранилища сообщений нет.',
  },
  {
    q: 'Что видит RPC-провайдер?',
    a: 'Ваш IP-адрес, время запросов и отправляемые транзакции. Это компонент с самым ясным взглядом на вашу сетевую активность — поэтому он заменяем и его можно развернуть самостоятельно.',
  },
  {
    q: 'Что будет, если fee worker отключится?',
    a: 'Отправка перестанет работать, пока он не вернётся или пока вы не начнёте оплачивать транзакции сами. Личность, контакты и история не пострадают — они на устройстве и не зависят от того, что запускаем мы.',
  },
  {
    q: 'Может ли Apple видеть, кому я пишу?',
    a: 'Apple видит, что вы купили подписку, и с какого Apple ID. Она не видит ни сообщений, ни контактов. Слепые токены — именно то, что не даёт связать покупку с вашей активностью отправки.',
  },
]

export default function RuArchitecturePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Архитектура"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Архитектура', path: '/ru/architecture' },
        ]}
        title="Каждый компонент и что он видит"
        lead="Заявление о приватности стоит ровно столько, сколько читатель может проверить. Здесь полный список частей системы, кто управляет каждой и что каждая наблюдает — включая единственную машину, которую запускаем мы."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        У PrivaMesh нет базы аккаунтов и хранилища сообщений. Но есть fee worker, оплачивающий
        транзакции, RPC-эндпоинт под управлением третьей стороны и публичная сеть, которая хранит
        шифротекст постоянно. Все три — в таблице ниже.
      </p>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Путь сообщения
      </h2>
      <FadeUp className="mt-6 overflow-x-auto">
        <ol className="flex min-w-[720px] items-stretch gap-2">
          {FLOW_RU.map((s, i) => (
            <li key={s.label} className="flex flex-1 items-stretch gap-2">
              <div className="flex-1 rounded-card border border-border bg-white/[0.03] p-4 backdrop-blur-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-semibold text-text-primary">{s.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{s.detail}</p>
              </div>
              {i < FLOW_RU.length - 1 && (
                <ArrowRight size={18} className="mt-8 flex-none text-text-muted" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </FadeUp>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        Что наблюдает каждый компонент
      </h2>
      <FadeUp className="mt-6 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[860px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">
            Компоненты PrivaMesh, их операторы и что каждый видит и хранит
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Компонент</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Кто управляет</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Что видит</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Что хранит</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Заменяем</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTS_RU.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
                  {c.name}
                  <span className="mt-1 block text-[13px] font-normal leading-relaxed text-text-muted">
                    {c.note}
                  </span>
                </th>
                <td className="px-5 py-4 text-text-secondary">{c.operator}</td>
                <td className="px-5 py-4 text-text-muted">{c.sees}</td>
                <td className="px-5 py-4 text-text-muted">{c.stores}</td>
                <td className="px-5 py-4 text-text-secondary">
                  {c.replaceable === 'Yes' ? 'Да' : c.replaceable === 'No' ? 'Нет' : 'Частично'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Зачем нужен fee worker</h2>
          <p>
            Каждое сообщение — это транзакция Solana, а транзакции стоят комиссию. Заставлять
            пользователя держать SOL ради отправки сообщения — это и худший продукт, и худшая
            история про приватность: пополнение кошелька само по себе связываемое действие. Поэтому
            комиссию оплачивает воркер.
          </p>
          <p>
            Отсюда очевидный вопрос: узнаёт ли спонсор, кто с кем переписывается? Нет. Приложение
            один раз доказывает подписку и получает пул слепых RSA-подписей; каждая отправка тратит
            один токен. Воркер может проверить, что токен действителен и не потрачен, но не может
            связать его ни с покупкой, ни с другим токеном. Он видит, что некий аккаунт оплатил
            некую отправку в некое время.
          </p>

          <h2>Чего этот дизайн не решает</h2>
          <p>
            RPC-эндпоинт видит ваш IP и время запросов. Сеть хранит шифротекст постоянно. Ничто
            выше этого не скрывает — поэтому оба в таблице и поэтому существует{' '}
            <Link href="/ru/limitations">страница ограничений</Link>. Если в вашей модели угроз есть
            наблюдатель на сетевом уровне, используйте VPN или Tor и свой RPC.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        title="Читать дальше"
        links={[
          {
            href: '/ru/limitations',
            label: 'Известные ограничения',
            blurb: 'От чего PrivaMesh не защищает — прямым текстом.',
          },
          {
            href: '/ru/threat-model',
            label: 'Модель угроз',
            blurb: 'Противник за противником: что видит и что его останавливает.',
          },
          {
            href: '/ru/security',
            label: 'Безопасность',
            blurb: 'Статус аудита и как сообщить об уязвимости.',
          },
        ]}
      />
    </Container>
  )
}
