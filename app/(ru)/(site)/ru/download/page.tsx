import type { Metadata } from 'next'
import Link from 'next/link'
import { Ban, Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import AppStoreButton from '@/components/AppStoreButton'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { APP_STORE } from '@/lib/appstore.generated'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Скачать PrivaMesh',
  description:
    'PrivaMesh для iPhone в App Store: iOS 26.5 или новее, бесплатно, без номера телефона и почты. Сборок для Android и Windows пока нет.',
  path: '/ru/download',
  locale: 'ru',
  languages: { en: '/download', ru: '/ru/download' },
})

const PLATFORMS_RU = [
  {
    id: 'ios',
    name: 'iPhone',
    requirement: `iOS ${APP_STORE.minimumOsVersion} или новее · версия ${APP_STORE.version}`,
    href: SITE.downloads.ios,
    cta: 'Скачать в App Store',
    status: '',
  },
  {
    id: 'android',
    name: 'Android',
    requirement: 'Сборки нет',
    href: SITE.downloads.android,
    cta: 'Скачать APK',
    status:
      'Клиента для Android нет. Криптография построена на CryptoKit и Secure Enclave, поэтому версия под Android — это переписывание работы с ключами, а не портирование. Ничего из этого пока не существует. Если Android нужен сегодня — честная рекомендация Signal.',
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: 'Сборки нет',
    href: SITE.downloads.windows,
    cta: 'Скачать установщик',
    status:
      'Десктопного клиента нет. Для нескольких устройств понадобился бы способ передавать состояние ratchet между ними, а его в текущем дизайне намеренно нет: история сообщений никогда не покидает телефон, на котором была получена.',
  },
]

const FAQS = [
  {
    q: 'Почему нужна iOS 26.5?',
    a: 'Постквантовый хендшейк использует X-Wing — сочетание ML-KEM-768 с X25519 — и опирается на криптографические API, появившиеся в iOS 26. Поддержка старых систем означала бы поставку только классического хендшейка; выбрали требовать новый, а не тихо отдавать более слабый по умолчанию.',
  },
  {
    q: 'Что нужно для регистрации?',
    a: 'Ничего. Ни номера телефона, ни почты, ни имени пользователя. Приложение генерирует фразу восстановления из 12 слов прямо на устройстве при первом запуске — запишите её, это единственный способ вернуться в аккаунт.',
  },
  {
    q: 'Есть ли APK для Android или установщик для Windows?',
    a: 'Пока нет, и сроков мы не называем. Android требует переписать работу с ключами без CryptoKit и Secure Enclave, а десктоп — механизм переноса состояния ratchet между устройствами, которого в дизайне намеренно нет. Если кроссплатформенность нужна сегодня — Signal.',
  },
  {
    q: 'Это бесплатно?',
    a: 'Загрузка бесплатна. Отправка тарифицируется, потому что каждое сообщение — платная транзакция в публичной сети. Лимиты и цены тарифов на странице цен.',
  },
]

export default function RuDownloadPage() {
  return (
    <Container>
      <JsonLd data={softwareApplicationLd} />
      <PageHeader
        eyebrow="Скачать"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Скачать', path: '/ru/download' },
        ]}
        title="Скачать PrivaMesh"
        lead="Сегодня PrivaMesh выходит на iPhone. Сборок для Android и Windows нет, и эта страница говорит об этом прямо, а не собирает почту под то, чего не существует."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLATFORMS_RU.map((p, i) => (
          <FadeUp
            key={p.id}
            delay={i * 60}
            className={`flex flex-col rounded-card border p-6 backdrop-blur-sm ${
              p.href ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
            }`}
          >
            <h2 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h2>
            <p className="mt-2 font-mono text-[13px] text-text-muted">{p.requirement}</p>

            {p.href ? (
              <>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">
                  Установка бесплатна. Ни номера телефона, ни почты, ни аккаунта — приложение
                  создаёт вашу личность на устройстве при первом запуске.
                </p>
                <div className="mt-5">
                  <AppStoreButton label={p.cta} />
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">{p.status}</p>
                <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-btn border border-border px-3 py-2 font-mono text-xs text-text-muted">
                  <Ban size={14} aria-hidden="true" />
                  Недоступно
                </p>
              </>
            )}
          </FadeUp>
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">Что произойдёт сразу</h2>
          <ul className="mt-4 space-y-3">
            {[
              'Приложение сгенерирует фразу восстановления из 12 слов на вашем устройстве',
              'Запишите её на бумаге — сброса нет, и резервной копии у нас тоже',
              'Задайте код-пароль и включите Face ID или Touch ID',
              'Выберите ник, чтобы вас находили без номера телефона',
              'Добавьте контакт по QR-коду или нику; добавить друг друга должны обе стороны',
            ].map((step) => (
              <li key={step} className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                <Check size={17} strokeWidth={2.5} className="mt-0.5 flex-none text-success" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-relaxed text-text-muted">
            Версия, минимальная iOS и цена берутся прямо из карточки App Store, а не поддерживаются
            вручную, — поэтому разойтись с тем, что показывает Apple, они не могут.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Перед установкой</h2>
          <p>
            Две вещи стоит знать заранее, потому что обе удивляют позже. Историю переписки нельзя
            перенести на другое устройство или восстановить после переустановки — прямая секретность
            уничтожает ключ каждого сообщения после использования, и это работающая гарантия, а не
            недостающая функция. И отправка тарифицируется: приложение бесплатно, но каждое
            сообщение — реальная транзакция с реальной комиссией. Сколько это стоит — на{' '}
            <Link href="/ru/pricing">странице цен</Link>.
          </p>
          <p>
            Что именно приложение и наш единственный сервер могут наблюдать — на{' '}
            <Link href="/ru/architecture">странице архитектуры</Link>, а от чего оно не защищает —
            в <Link href="/ru/limitations">ограничениях</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        title="Читать дальше"
        links={[
          { href: '/ru/pricing', label: 'Цены', blurb: 'Тарифы, лимиты сообщений и почему есть счётчик.' },
          { href: '/ru/limitations', label: 'Ограничения', blurb: 'От чего PrivaMesh не защищает.' },
          { href: '/ru/support', label: 'Поддержка', blurb: 'Фраза восстановления, новые устройства, подписки.' },
        ]}
      />
    </Container>
  )
}
