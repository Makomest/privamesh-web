import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Поддержка',
  description:
    'Помощь с PrivaMesh: как связаться, вопросы про фразу восстановления и новое устройство, добавление контактов, подписки, удаление аккаунта и жалобы.',
  path: '/ru/support',
  locale: 'ru',
  languages: { en: '/support', ru: '/ru/support' },
})

const FAQS = [
  {
    q: 'Переустановил приложение / сменил телефон. Где мои чаты?',
    a: 'Контакты и история переписки хранятся только на вашем устройстве и никуда не выгружаются, поэтому перенести их на новое устройство нельзя. Ввод фразы восстановления из 12 слов возвращает вашу личность и ник, так что вам снова смогут писать, но прошлые переписки остаются на старом устройстве. Это осознанное свойство приватности, а не баг.',
  },
  {
    q: 'Я потерял фразу восстановления. Вы можете восстановить аккаунт?',
    a: 'Нет. Сервера аккаунтов не существует, и копии ваших ключей нет нигде, кроме вашего устройства. Без фразы аккаунт не восстановит никто, включая нас. Запишите фразу и храните её офлайн.',
  },
  {
    q: 'Как войти на новом устройстве?',
    a: 'На стартовом экране нажмите «Restore from recovery phrase», введите 12 слов по порядку, затем задайте код-пароль. Не нажимайте «Create account» - это создаст другой, пустой аккаунт.',
  },
  {
    q: 'Как добавить контакт?',
    a: 'Нажмите «+» на главном экране и либо отсканируйте QR-код собеседника, либо найдите его по нику. Обе стороны должны добавить друг друга, прежде чем пойдут сообщения.',
  },
  {
    q: 'Сообщение не отправляется.',
    a: 'Проверьте, что вы онлайн, что контакт добавлен успешно и что у вас остались сообщения в лимите (счётчик вверху главного экрана). Если отправка всё равно не проходит, напишите нам и укажите время попытки - мы разберёмся.',
  },
  {
    q: 'Как управлять подпиской или отменить её?',
    a: 'Подписки и пакеты сообщений биллит Apple. Откройте «Настройки» iOS, нажмите на своё имя, затем «Подписки», чтобы изменить или отменить. Возвраты оформляет Apple на reportaproblem.apple.com.',
  },
  {
    q: 'Как удалить аккаунт и данные?',
    a: 'Профиль, затем «Reset account» - стирает ключи, контакты и историю сообщений с устройства. Поскольку на сервере ничего не хранится, это удаляет всё, что есть.',
  },
  {
    q: 'Как пожаловаться на злоупотребление или сообщить об уязвимости?',
    a: 'Заблокируйте контакт на экране его профиля, затем напишите на privamesh@proton.me с подробностями. По уязвимостям - на тот же адрес, указав «security» в теме письма.',
  },
]

export default function RuSupportPage() {
  return (
    <>
      <JsonLd data={faqPageLd(FAQS)} />
      <Container>
        <PageHeader
          eyebrow="Поддержка"
          trail={[
            { name: 'Главная', path: '/ru' },
            { name: 'Поддержка', path: '/ru/support' },
          ]}
          title="Поддержка"
          lead="Вопросы, сообщения об ошибках и помощь с аккаунтом PrivaMesh."
        />

        <div className="mt-12 max-w-3xl">
          <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">Как связаться</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
              Пишите на{' '}
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="font-medium text-accent hover:underline"
              >
                {SITE.supportEmail}
              </a>
              . Отвечаем в течение{' '}
              <strong className="text-text-secondary">2 рабочих дней</strong>, на английском или
              русском.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
              Чтобы мы ответили быстрее, укажите модель устройства, версию iOS и что вы делали,
              когда возникла проблема.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-btn border border-border-accent bg-accent/[0.06] p-4">
              <AlertTriangle
                size={18}
                className="mt-0.5 flex-none text-accent"
                aria-hidden="true"
              />
              <p className="text-[15px] leading-relaxed text-text-secondary">
                Никогда не присылайте нам фразу восстановления из 12 слов. Мы никогда её не просим,
                и тот, кто просит, пытается украсть ваш аккаунт.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <Mail size={15} aria-hidden="true" />
                Написать в поддержку
              </a>
              <Link href="/privacy-policy" className="text-text-muted hover:text-accent">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-text-muted hover:text-accent">
                Условия использования
              </Link>
            </div>
          </FadeUp>
        </div>

        <section className="mt-16" aria-labelledby="support-faq">
          <h2
            id="support-faq"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Частые вопросы
          </h2>
          <FAQ items={FAQS} />
        </section>

        <div className="mt-12 max-w-3xl">
          <Prose>
            <p>
              Возвраты по подпискам оформляет Apple, а не мы — через{' '}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                reportaproblem.apple.com
              </a>
              . По всем остальным вопросам пишите на{' '}
              <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
            </p>
          </Prose>
        </div>

        <RelatedLinks
          title="Читать дальше"
          links={[
            {
              href: '/privacy-policy',
              label: 'Политика конфиденциальности',
              blurb: 'Что PrivaMesh собирает, а что нет - простым языком.',
            },
            {
              href: '/terms',
              label: 'Условия использования',
              blurb: 'Допустимое использование, блокировки и жалобы, условия подписки.',
            },
            {
              href: '/ru',
              label: 'О PrivaMesh',
              blurb: 'Приватный мессенджер без серверов и без номера телефона.',
            },
          ]}
        />
      </Container>
    </>
  )
}
