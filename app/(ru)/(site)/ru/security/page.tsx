import type { Metadata } from 'next'
import Link from 'next/link'
import { Bug, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { APP_STORE } from '@/lib/appstore.generated'
import { techArticleLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Безопасность и раскрытие уязвимостей',
  description:
    'Как сообщить об уязвимости в PrivaMesh, оплачиваемый bug bounty, что и в какие сроки мы исправляем и какие версии получают обновления безопасности.',
  path: '/ru/security',
  locale: 'ru',
  languages: { en: '/security', ru: '/ru/security' },
})

const FAQS = [
  {
    q: 'Как сообщить об уязвимости?',
    a: 'Напишите на privamesh@proton.me со словом «security» в теме. Укажите версию приложения, устройство и версию iOS, а также достаточно деталей для воспроизведения. Стараемся подтвердить получение в течение 2 рабочих дней.',
  },
  {
    q: 'Есть ли bug bounty?',
    a: 'Да. До $500 за критическую находку, $200 за высокую, $75 за среднюю, $25 за низкую. Серьёзность определяется тем, что находка ломает в нашей модели угроз. Полная шкала, область и исключения — на странице bug bounty (на английском).',
  },
  {
    q: 'Какие версии получают исправления?',
    a: 'Текущий релиз в App Store. PrivaMesh требует iOS 26.5 или новее и выпущен в одной мажорной версии, так что бэкпортить пока некуда.',
  },
]

export default function RuSecurityPage() {
  return (
    <Container>
      <JsonLd data={techArticleLd({
          headline: "Безопасность и раскрытие уязвимостей",
          description: "Раскрытие уязвимостей, bug bounty и обязательства PrivaMesh.",
          path: '/ru/security',
          datePublished: APP_STORE.releasedAt.slice(0, 10),
          dateModified: APP_STORE.updatedAt.slice(0, 10),
        })} />
      <PageHeader
        eyebrow="Безопасность"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Безопасность', path: '/ru/security' },
        ]}
        title="Безопасность и раскрытие уязвимостей"
        lead="Как сообщить об уязвимости, сколько платим за находку и что обязуемся сделать после."
      />

      <div className="mt-10 max-w-3xl">
        <FadeUp className="rounded-card border border-border-accent bg-accent/[0.06] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-3">
            <Bug size={20} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Открытый код, и найденная уязвимость оплачивается
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                PrivaMesh построен на хорошо изученных примитивах — X3DH, Double Ratchet,
                AES-256-GCM и ML-KEM-768 на iOS 26. Код, который их реализует, открыт для всех
                трёх клиентов: любой может прочитать, что именно он делает, а не верить описанию.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Найденная в нём уязвимость стоит до $500 по программе{' '}
                <Link href="/bug-bounty" className="font-medium text-accent hover:underline">
                  bug bounty
                </Link>
                .
              </p>
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="mt-8 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Как сообщить об уязвимости
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Напишите на{' '}
            <a
              href={`mailto:${SITE.supportEmail}?subject=security`}
              className="font-medium text-accent hover:underline"
            >
              {SITE.supportEmail}
            </a>{' '}
            со словом <strong className="text-text-secondary">security</strong> в теме.
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-text-muted">
            <li>Укажите версию приложения, модель устройства и версию iOS.</li>
            <li>Приложите достаточно деталей, чтобы воспроизвести проблему.</li>
            <li>
              Никогда не присылайте фразу восстановления. Мы не просим её ни при каких
              обстоятельствах.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            <a
              href={`mailto:${SITE.supportEmail}?subject=security`}
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Mail size={15} aria-hidden="true" />
              Сообщить об уязвимости
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              Исходный код
            </a>
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Что мы обязуемся делать</h2>
          <ul>
            <li>
              <strong>Подтвердить получение за 2 рабочих дня.</strong> Если ответа нет — считайте,
              что письмо потерялось, и отправьте ещё раз.
            </li>
            <li>
              <strong>Исправление или план за 30 дней</strong> для всего, что позволяет прочитать
              сообщения, выдать себя за другого или связать пользователя с его активностью.
            </li>
            <li>
              <strong>Упоминание, если хотите, и молчание, если нет.</strong> Мы не назовём вас без
              спроса.
            </li>
            <li>
              <strong>Никаких юридических угроз</strong> за добросовестное исследование, которое не
              затрагивает чужие аккаунты и данные.
            </li>
          </ul>

          <h2>Поддерживаемые версии</h2>
          <p>
            Исправления безопасности идут в текущий релиз App Store. PrivaMesh требует{' '}
            <strong>iOS 26.5 или новее</strong> и выпущен в одной мажорной версии, так что старой
            ветки для бэкпорта нет. Когда это изменится, окно поддержки будет указано здесь, а не
            подразумеваться.
          </p>

          <h2>Что уже исправлено</h2>
          <p>
            Пока ничего не сообщали и не исправляли. Вместо того чтобы убрать этот раздел, он
            оставлен пустым: список, который начинается с нуля и растёт, информативнее раздела,
            появляющегося только когда в него есть что вписать выгодного.
          </p>

          <h2>Область</h2>
          <p>
            iOS-клиент, протокол в сети и fee worker, описанный на{' '}
            <Link href="/ru/architecture">странице архитектуры</Link>, — всё в области. Сторонняя
            инфраструктура (сама Solana, RPC-провайдеры, Apple) не в нашей власти, но мы всё равно
            хотим о ней знать. Границы того, от чего дизайн защищает, — в{' '}
            <Link href="/ru/threat-model">модели угроз</Link> и{' '}
            <Link href="/ru/limitations">известных ограничениях</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FAQS} />

      <RelatedLinks
        title="Читать дальше"
        links={[
          {
            href: '/ru/threat-model',
            label: 'Модель угроз',
            blurb: 'Что видно, что остановлено и что всё ещё возможно.',
          },
          {
            href: '/ru/limitations',
            label: 'Известные ограничения',
            blurb: 'От чего PrivaMesh не защищает.',
          },
          {
            href: '/ru/architecture',
            label: 'Архитектура',
            blurb: 'Каждый компонент и что он наблюдает.',
          },
        ]}
      />
    </Container>
  )
}
