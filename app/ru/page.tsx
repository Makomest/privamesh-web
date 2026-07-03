import type { Metadata } from 'next'
import Link from 'next/link'
import { EyeOff, Shuffle, Wallet, Check } from 'lucide-react'
import { Container, SectionDivider } from '@/components/Container'
import { Button } from '@/components/Button'
import AppStoreButton from '@/components/AppStoreButton'
import PhoneMockup from '@/components/PhoneMockup'
import HeroScramble from '@/components/HeroScramble'
import FadeUp from '@/components/FadeUp'
import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd, faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'PrivaMesh - Приватный мессенджер без серверов на Solana',
  description:
    'Самый приватный мессенджер: без серверов, без номера телефона, без метаданных. Сквозное шифрование на Solana. Доверяй математике, а не компаниям.',
  path: '/ru',
  locale: 'ru',
  languages: { en: '/', ru: '/ru' },
})

const NO_SERVERS_RU = [
  {
    what: 'Ваши сообщения',
    where: 'Мемо-поля транзакций Solana (в блокчейне)',
    how: 'Зашифрованные блобы в транзакциях на 0 лампортов',
  },
  {
    what: 'Ваш «входящий»',
    where: 'Сам блокчейн Solana',
    how: 'Читается через одноразовые stealth-адреса',
  },
  {
    what: 'Ваши ключи',
    where: 'Только в iOS Keychain',
    how: 'Под биометрией, никогда не покидают устройство',
  },
  {
    what: 'Контакты и история',
    where: 'Только на вашем iPhone',
    how: 'Не синхронизируются и никуда не загружаются',
  },
  {
    what: 'Ваша личность',
    where: 'Seed-фраза BIP-39, которой владеете вы',
    how: 'Самокастодиальный ключ - без телефона и почты',
  },
  {
    what: '«Сервер PrivaMesh»',
    where: 'Не существует',
    how: 'Единственная зависимость - сменяемый Solana RPC',
  },
]

const METADATA_RU = [
  {
    icon: EyeOff,
    title: 'Stealth-адреса',
    body: 'Каждое сообщение уходит на новый одноразовый адрес. Наблюдатель в блокчейне не видит социальный граф - кто с кем общается остаётся скрытым.',
  },
  {
    icon: Shuffle,
    title: 'Прикрывающий трафик',
    body: 'Ложные сообщения смешиваются с настоящими, поэтому нельзя понять, когда вы реально пишете. Анализ по времени не работает.',
  },
  {
    icon: Wallet,
    title: 'Газовый кошелёк',
    body: 'Одноразовый плательщик комиссии оплачивает сеть, поэтому кошелёк, который платит, - никогда не кошелёк, который пишет.',
  },
]

const FAQ_RU = [
  {
    q: 'PrivaMesh правда без серверов?',
    a: 'Да. Нет ни сервера PrivaMesh, ни релея, ни базы аккаунтов. Единственная сетевая зависимость - endpoint Solana RPC, сменяемый и самохостируемый. Сообщения живут как зашифрованные блобы в мемо-полях транзакций Solana - нечего взломать, изъять по запросу, логировать или отключить.',
  },
  {
    q: 'Как устроено шифрование?',
    a: 'Рукопожатие X3DH на Curve25519, затем Double Ratchet (HKDF и HMAC-SHA256), который даёт новый ключ каждому сообщению. Полезная нагрузка запечатана AES-256-GCM и дополнена до фиксированного размера. По умолчанию - прямая секретность и защита после компрометации.',
  },
  {
    q: 'Можно без номера телефона и почты?',
    a: 'Да. Нет ни номера, ни почты. Ваш аккаунт - seed-фраза BIP-39, которая соответствует самокастодиальному ключу Solana. Ключи хранятся в iOS Keychain, только на устройстве, под биометрией.',
  },
  {
    q: 'Какие метаданные собирает PrivaMesh?',
    a: 'Никакие на сервере - потому что сервера нет. В блокчейне stealth-адреса скрывают социальный граф, прикрывающий трафик скрывает тайминг, а одноразовый газовый кошелёк скрывает, кто платит комиссию.',
  },
  {
    q: 'Что если я потеряю телефон?',
    a: 'Восстановите seed-фразу BIP-39 на новом устройстве, чтобы вернуть средства и личность. По задумке история переписки не восстанавливается - прямая секретность удаляет старые ключи, поэтому никто, включая вас, не сможет расшифровать прошлые сообщения только по seed-фразе.',
  },
]

export default function HomeRu() {
  return (
    <>
      <JsonLd data={softwareApplicationLd} />
      <JsonLd data={faqPageLd(FAQ_RU)} />

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <div className="mesh-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative rounded-3xl p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/20 px-3 py-1 font-mono text-xs text-text-muted backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Работает на Solana
                mainnet-beta
              </p>
              <h1 className="text-h1-m sm:text-h1-d">
                <HeroScramble text="Приватный" /> мессенджер, который ничего о вас не знает
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
                Сервера PrivaMesh не существует. Нечего изъять по запросу, взломать, логировать или
                отключить. Просто сквозно зашифрованные сообщения на Solana - без номера телефона,
                без почты, без метаданных. Доверяй математике, а не компаниям.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <AppStoreButton label="Скачать PrivaMesh" />
                <Button href={SITE.whitepaper} external variant="ghost">
                  Читать Whitepaper
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-text-muted">
                {['Открытый код', 'Без серверов', 'Сквозное шифрование'].map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span className="text-text-faint">·</span>}
                    <span className="flex items-center gap-1.5">
                      <Check size={13} className="text-accent" /> {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-hero-glow blur-3xl"
                aria-hidden="true"
              />
              <PhoneMockup
                src="/screenshots/01.png?v=2"
                alt="Приложение PrivaMesh на iPhone: приватный мессенджер со сквозным шифрованием без серверов"
                priority
                sizes="(max-width: 768px) 78vw, 520px"
                className="animate-float"
              />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* NO SERVERS TABLE */}
      <section className="py-16 sm:py-20" aria-labelledby="ru-no-servers">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Главное отличие
            </p>
            <h2
              id="ru-no-servers"
              className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Без серверов - конкретно
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Большинство «приватных» мессенджеров всё равно держат сервера, которые видят, с кем вы
              общаетесь. У PrivaMesh их нет. Вот где именно живёт каждая часть ваших данных.
            </p>
          </FadeUp>

          <FadeUp className="mt-8 overflow-x-auto rounded-card bg-white/20 backdrop-blur-sm">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-card border border-border font-mono text-sm">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="px-5 py-4 font-semibold">Что</th>
                  <th className="px-5 py-4 font-semibold">Где живёт</th>
                  <th className="px-5 py-4 font-semibold">Как</th>
                </tr>
              </thead>
              <tbody>
                {NO_SERVERS_RU.map((row) => (
                  <tr key={row.what} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-text-primary">{row.what}</td>
                    <td className="px-5 py-4 text-text-secondary">{row.where}</td>
                    <td className="px-5 py-4 text-text-muted">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        </Container>
      </section>

      <SectionDivider />

      {/* METADATA */}
      <section className="py-16 sm:py-20" aria-labelledby="ru-metadata">
        <Container>
          <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="ru-metadata"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Скрыть кто. Скрыть когда. Скрыть как.
            </h2>
            <p className="mt-4 max-w-2xl text-text-muted">
              Шифрование скрывает сообщение. PrivaMesh скрывает ещё и метаданные - кто, когда и как,
              которые иначе увидел бы сервер.
            </p>
          </FadeUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {METADATA_RU.map((c, i) => (
              <FadeUp key={c.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-card border border-border bg-white/20 p-6 backdrop-blur-sm">
                  <c.icon size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{c.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ENCRYPTION */}
      <section className="py-16 sm:py-20" aria-labelledby="ru-enc">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <FadeUp className="w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">Криптография</p>
              <h2
                id="ru-enc"
                className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
              >
                Сквозное шифрование, сделанное правильно
              </h2>
              <p className="mt-4 text-text-muted">
                PrivaMesh использует те же проверенные примитивы, что защищают Signal,
                адаптированные под мир без серверов. Каждому сообщению - свежий ключ, поэтому
                скомпрометированный ключ не откроет ни прошлые, ни будущие переписки.
              </p>
            </FadeUp>
            <div className="space-y-3">
              {[
                {
                  name: 'X3DH',
                  desc: 'Рукопожатие на Curve25519 создаёт общий секрет без доверенного сервера ключей.',
                },
                {
                  name: 'Double Ratchet',
                  desc: 'HKDF + HMAC-SHA256 меняют ключ каждому сообщению - прямая секретность и защита после компрометации.',
                },
                {
                  name: 'AES-256-GCM',
                  desc: 'Аутентифицированное шифрование запечатывает нагрузку, дополненную до фиксированного размера.',
                },
              ].map((row, i) => (
                <FadeUp key={row.name} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-card border border-border bg-white/20 p-5 backdrop-blur-sm">
                    <code className="whitespace-nowrap rounded bg-bg-elevated px-2 py-1 font-mono text-[13px] text-accent">
                      {row.name}
                    </code>
                    <p className="text-sm leading-relaxed text-text-muted">{row.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="py-16 sm:py-20" aria-labelledby="ru-faq">
        <Container>
          <FadeUp className="mx-auto w-fit max-w-full rounded-2xl px-6 py-5 backdrop-blur-sm">
            <h2
              id="ru-faq"
              className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Частые вопросы
            </h2>
          </FadeUp>
          <div className="mt-10">
            <FAQ items={FAQ_RU} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section
        className="border-t border-border bg-white/20 py-20 backdrop-blur-sm"
        aria-labelledby="ru-cta"
      >
        <Container className="text-center">
          <FadeUp>
            <h2
              id="ru-cta"
              className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              Хватит доверять свои переписки компаниям
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-muted">
              PrivaMesh заменяет компанию математикой, а сервер - блокчейном. Ваши ключи, ваше
              устройство, ваши слова.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <AppStoreButton label="Скачать PrivaMesh" />
              <Link
                href="/"
                className="inline-flex items-center rounded-btn border border-border-hover px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                English version
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  )
}
