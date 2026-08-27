import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import PlatformCard, { PLATFORM_GRID } from '@/components/PlatformCard'
import { pageMetadata } from '@/lib/seo'
import { softwareApplicationLd } from '@/lib/jsonld'
import { APP_STORE } from '@/lib/appstore.generated'
import { PLATFORMS_RU } from '@/lib/platforms'

export const metadata: Metadata = pageMetadata({
  title: 'Скачать PrivaMesh',
  description:
    'PrivaMesh для iPhone в App Store, APK для Android 8.0 или новее и установщик для Windows 10. Без номера телефона, почты и аккаунта.',
  path: '/ru/download',
  locale: 'ru',
  languages: { en: '/download', ru: '/ru/download' },
})

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
    q: 'Почему установщик Windows вызывает предупреждение безопасности?',
    a: 'Сборка не подписана сертификатом, поэтому Windows не узнаёт издателя и показывает «Windows protected your PC». Это не сообщение о находке в файле — нажмите «More info», затем «Run anyway». Из-за того же отсутствующего сертификата убедиться, что файл пришёл от нас, толком нечем, и опубликованная контрольная сумма этого не решает: кто способен подменить файл, подменит и сумму рядом с ним. Решает сертификат подписи кода, а его у этой сборки пока нет.',
  },
  {
    q: 'Чем отличается сборка под Android?',
    a: 'Это версия 0.1, а не 1.0, и дело не в скромности. Её прогнали через создание аккаунта, генерацию фразы и перезапуск на эмуляторе — это те проверки, что ловят поломку криптографии и базы после R8, — но на реальном устройстве она не запускалась, и ни одна сборка под Android ещё не отправляла сообщение в mainnet. Подписана она настоящим ключом, поэтому следующие версии встанут поверх как обновление.',
  },
  {
    q: 'Работают ли платные тарифы на Windows и Android?',
    a: 'Не так, как на iPhone. Релей проверяет чеки Apple и пути для Google Play не имеет, поэтому Android стартовал бы только с бесплатным тарифом. Windows релей не использует вовсе: десктопный клиент заводит собственный кошелёк Solana, который вы пополняете сами, так что переносить подписку неоткуда.',
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
        lead="Для всех трёх платформ есть сборка, которую можно поставить сегодня. Различаются способ оплаты и глубина проверки — и то и другое написано на карточке, а не оставлено выясняться потом."
      />

      <div className={PLATFORM_GRID}>
        {PLATFORMS_RU.map((p, i) => (
          <PlatformCard
            key={p.id}
            platform={p}
            delay={i * 60}
            labels={{ notAvailable: 'Недоступно' }}
          />
        ))}
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">Что произойдёт сразу</h2>
          <ul className="mt-4 space-y-3">
            {[
              'Приложение сгенерирует фразу восстановления из 12 слов на вашем устройстве',
              'Запишите её на бумаге — сброса нет, и резервной копии у нас тоже',
              'Задайте код-пароль и биометрию, если устройство её поддерживает',
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
            Версия для iPhone, минимальная iOS и цена берутся прямо из карточки App Store, а не
            поддерживаются вручную, — разойтись с тем, что показывает Apple, они не могут. Данные по
            Windows берутся из релиза, откуда скачивается сам файл.
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
            Это верно для всех платформ. Различается плательщик: на iPhone подписка покупает слепые
            токены, которые погашает наш единственный fee-worker, а клиент под Windows этот worker не
            задействует вовсе и тратит из кошелька Solana, который вы пополняете сами. Что именно
            наблюдает каждый компонент — на <Link href="/ru/architecture">странице архитектуры</Link>,
            а от чего не защищает ничего из этого — в{' '}
            <Link href="/ru/limitations">ограничениях</Link>.
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
