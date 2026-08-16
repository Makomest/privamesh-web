import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'

export const metadata: Metadata = pageMetadata({
  title: 'Модель угроз PrivaMesh',
  description:
    'Противник за противником: что видят оператор, RPC-провайдер, наблюдатель сети, украденное устройство и недобросовестный собеседник — и что остаётся возможным.',
  path: '/ru/threat-model',
  locale: 'ru',
  languages: { en: '/threat-model', ru: '/ru/threat-model' },
})

const ADVERSARIES = [
  {
    name: 'PrivaMesh как оператор',
    sees: 'Что аккаунт оплатил отправку, и когда',
    cannot: 'Читать сообщения, узнать получателей, получить список контактов или историю',
    defence: 'Нет базы аккаунтов и хранилища сообщений; слепые токены отвязывают оплату от отправки',
    residual: 'Нас можно обязать показать, что некий аккаунт что-то отправил в определённое время',
  },
  {
    name: 'RPC-провайдер',
    sees: 'Ваш IP, время запросов, отправляемые транзакции',
    cannot: 'Расшифровать что-либо или понять, чей это одноразовый адрес',
    defence: 'Эндпоинт заменяем и разворачивается самостоятельно',
    residual: 'Логирующий провайдер собирает сетевую картину вашей активности',
  },
  {
    name: 'Наблюдатель сети',
    sees: 'Дополненный шифротекст, одноразовые адреса, точное время транзакций',
    cannot: 'Прочитать содержимое или связать два сообщения одной переписки',
    defence: 'Одноразовые адреса, фиксированные bucket-ы дополнения, опциональный cover traffic',
    residual: 'С выключенным cover traffic ваш паттерн активности полностью виден',
  },
  {
    name: 'Глобальный анализ тайминга',
    sees: 'Коррелированную активность по всей сети одновременно',
    cannot: 'Расшифровать или криптографически связать адреса',
    defence: 'Cover traffic со случайным интервалом 3-10 минут, когда включён',
    residual: 'Это противник, против которого мы защищаем хуже всего: наблюдатель всей сети с неограниченным хранением выходит за рамки того, что решается на уровне сообщения',
  },
  {
    name: 'Кто-то с вашим разблокированным телефоном',
    sees: 'Всё: открытый текст, контакты, ключи',
    cannot: 'Восстановить сообщения, уже удалённые ratchet-ом',
    defence: 'Хранение в Keychain за Face ID или Touch ID; прямая секретность ограничивает прошлое',
    residual: 'Компрометация устройства тотальна для всего, что на нём сейчас есть',
  },
  {
    name: 'Кто-то с вашей фразой восстановления',
    sees: 'Вашу личность и может выдавать себя за вас дальше',
    cannot: 'Прочитать прошлые переписки — тех ключей больше не существует',
    defence: 'Фраза не покидает устройство и никогда не передаётся',
    residual: 'Отзыва нет. Если фраза утекла, аккаунт тоже',
  },
  {
    name: 'Недобросовестный собеседник',
    sees: 'Всё, что вы ему отправили, и может сделать скриншот или переслать',
    cannot: 'Добраться до других ваших собеседников или прочитать другие переписки',
    defence: 'Блокировка и разделение ключей по переписке',
    residual: 'Никакая криптография не мешает собеседнику быть недобросовестным',
  },
  {
    name: 'Подмена при добавлении контакта',
    sees: 'Ничего, если проверка прошла',
    cannot: 'Подставить свой ключ вместо контакта, чей bundle подписан в сети',
    defence: 'Prekey-bundle, подписанные кошельком и опубликованные в сети; проверка по подписи, а не по каталогу',
    residual: 'Убедиться, что добавили именно того человека, всё равно нужно вам',
  },
  {
    name: 'Apple',
    sees: 'Что ваш Apple ID купил подписку',
    cannot: 'Видеть сообщения, контакты или связать покупку с вашей отправкой',
    defence: 'Слепые токены стоят между покупкой и каждой отправкой',
    residual: 'Apple знает, что вы клиент PrivaMesh, — на iOS этого не избежать',
  },
  {
    name: 'Сетевая цензура',
    sees: 'Что вы обратились к RPC-эндпоинту Solana',
    cannot: 'Прочитать или выборочно отбросить отдельные сообщения',
    defence: 'RPC-эндпоинты заменяемы, в том числе на свои собственные',
    residual: 'Блокировка Solana или всех RPC блокирует доставку полностью',
  },
]

const FAQS = [
  {
    q: 'Против чего PrivaMesh защищает хуже всего?',
    a: 'Против глобального противника, который непрерывно наблюдает всю сеть и всё хранит. Cover traffic повышает стоимость корреляции по времени, но не побеждает наблюдателя такого масштаба, а сеть хранит постоянную запись, с которой он может работать.',
  },
  {
    q: 'Что раскрывается при изъятии устройства?',
    a: 'Всё, что на нём сейчас: открытый текст, контакты и ключи, если только оно не заблокировано и атакующий не может пройти Face ID. Прямая секретность ограничивает ущерб тем, что ещё не удалено ratchet-ом, — старые сообщения уже невосстановимы.',
  },
  {
    q: 'Могут ли PrivaMesh заставить выдать мои данные?',
    a: 'Попросить могут. Выдать есть что: что аккаунт оплатил отправку в определённое время. Ни содержимого, ни получателя, ни списка контактов, ни записи об аккаунте — ничего этого не хранится.',
  },
  {
    q: 'Помогает ли VPN?',
    a: 'Да, против RPC-провайдера и наблюдателя на сетевом уровне — это два противника, которые видят ваш IP. На то, что записано в сеть, он не влияет: там уже нечитаемо.',
  },
]

export default function RuThreatModelPage() {
  return (
    <Container>
      <JsonLd data={techArticleLd({
          headline: "Кто что видит и что его останавливает",
          description: "Модель угроз PrivaMesh по противникам с остаточным риском.",
          path: '/ru/threat-model',
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })} />
      <PageHeader
        eyebrow="Модель угроз"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Модель угроз', path: '/ru/threat-model' },
        ]}
        title="Кто что видит и что его останавливает"
        lead="Модель угроз полезна только если называет противников, которым проигрывает, так же ясно, как тех, кого побеждает. Каждая строка ниже: что противник видит, до чего не дотянется, какая защита работает и что всё равно остаётся возможным."
      />

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        PrivaMesh спроектирован против оператора, которому нужны ваши данные, наблюдателя сети,
        читающего всё публичное, и подмены при добавлении контакта. Слабее всего он против
        глобального анализа тайминга и не даёт ничего против скомпрометированного устройства.
      </p>

      <FadeUp className="mt-12 overflow-x-auto rounded-card bg-white/[0.03] backdrop-blur-sm">
        <table className="w-full min-w-[900px] border-collapse overflow-hidden rounded-card border border-border text-sm">
          <caption className="sr-only">
            Модель угроз PrivaMesh по противникам, с защитами и остаточным риском
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Противник</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Видит</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Не может</th>
              <th className="px-5 py-4 text-left font-semibold text-accent">Защита</th>
              <th className="px-5 py-4 text-left font-semibold text-text-secondary">Всё ещё возможно</th>
            </tr>
          </thead>
          <tbody>
            {ADVERSARIES.map((a) => (
              <tr key={a.name} className="border-b border-border last:border-0 align-top">
                <th scope="row" className="px-5 py-4 text-left font-medium text-text-primary">
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
          <h2>Что эта модель предполагает</h2>
          <p>
            Что криптографические примитивы держатся: X3DH, Double Ratchet, AES-256-GCM и, на iOS
            26, ML-KEM-768. Что ваше устройство ещё не скомпрометировано. Что вы проверяете, кого
            добавляете в контакты. Если что-то из этого не так, остальной дизайн вас не спасёт.
          </p>
          <p>
            Она также предполагает, что наша реализация этих примитивов корректна — а это ровно то
            предположение, которое проверил бы{' '}
            <Link href="/ru/security">независимый аудит, которого пока не было</Link>. Полный список
            непокрытого — на странице <Link href="/ru/limitations">ограничений</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        title="Читать дальше"
        links={[
          {
            href: '/ru/architecture',
            label: 'Архитектура',
            blurb: 'Каждый компонент, его оператор и что он наблюдает.',
          },
          {
            href: '/ru/limitations',
            label: 'Известные ограничения',
            blurb: 'От чего PrivaMesh не защищает, простым языком.',
          },
          {
            href: '/features/metadata-protection',
            label: 'Защита метаданных',
            blurb: 'Одноразовые адреса, bucket-ы дополнения и опциональный cover traffic.',
          },
        ]}
      />
    </Container>
  )
}
