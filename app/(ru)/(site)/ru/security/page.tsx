import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Безопасность и раскрытие уязвимостей',
  description:
    'Статус аудита PrivaMesh, как сообщить об уязвимости, что и в какие сроки мы обязуемся исправлять и какие версии получают обновления безопасности.',
  path: '/ru/security',
  locale: 'ru',
  languages: { en: '/security', ru: '/ru/security' },
})

const FAQS = [
  {
    q: 'Проходил ли PrivaMesh независимый аудит безопасности?',
    a: 'Нет. Независимый аудит безопасности: не завершён. Реализация открыта и доступна для проверки кем угодно, но ни один квалифицированный третий участник её не подтверждал. Когда аудит будет завершён, отчёт и проверенный коммит появятся здесь.',
  },
  {
    q: 'Как сообщить об уязвимости?',
    a: 'Напишите на privamesh@proton.me со словом «security» в теме. Укажите версию приложения, устройство и версию iOS, а также достаточно деталей для воспроизведения. Стараемся подтвердить получение в течение 2 рабочих дней.',
  },
  {
    q: 'Есть ли bug bounty?',
    a: 'Формальной программы с опубликованными выплатами нет — мы не хотим обещать суммы, которые не можем гарантировать. Сообщайте о находках, вознаграждение обсудим индивидуально и добросовестно.',
  },
  {
    q: 'Какие версии получают исправления?',
    a: 'Текущий релиз в App Store. PrivaMesh требует iOS 26.5 или новее и выпущен в одной мажорной версии, так что бэкпортить пока некуда.',
  },
]

export default function RuSecurityPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Безопасность"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Безопасность', path: '/ru/security' },
        ]}
        title="Безопасность и раскрытие уязвимостей"
        lead="Статус аудита, как сообщить об уязвимости и что мы обязуемся делать. Прямым текстом — включая ту часть, где аудита пока не было."
      />

      <div className="mt-10 max-w-3xl">
        <FadeUp className="rounded-card border border-border-accent bg-accent/[0.06] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                Независимый аудит безопасности: не завершён
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                PrivaMesh построен на хорошо изученных примитивах — X3DH, Double Ratchet,
                AES-256-GCM и ML-KEM-768 на iOS 26. Они проверены. Наша реализация — нет, её не
                просматривал квалифицированный третий участник. Исходники открыты, так что аудит
                возможен; пока он не проведён, считайте наши заявления неподтверждёнными.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Когда аудит будет завершён, здесь появятся аудитор, отчёт в PDF, версия приложения и
                точный коммит, который проверялся.
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
