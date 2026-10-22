import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import Roadmap from '@/components/Roadmap'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'

export const metadata: Metadata = pageMetadata({
  title: 'Дорожная карта',
  description:
    'Где сейчас PrivaMesh: все вышедшие релизы, тот, что делается сейчас, и что идёт следом — для iPhone, Android и Windows. Без дат у незаконченного.',
  path: '/ru/roadmap',
  locale: 'ru',
  languages: { en: '/roadmap', ru: '/ru/roadmap' },
})

export default function RuRoadmapPage() {
  return (
    <Container>
      <JsonLd
        data={webPageLd({
          name: 'Дорожная карта PrivaMesh',
          description: 'Что вышло, что делается сейчас и что дальше.',
          path: '/ru/roadmap',
        })}
      />
      <PageHeader
        eyebrow="Дорожная карта"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Дорожная карта', path: '/ru/roadmap' },
        ]}
        title="Где PrivaMesh сейчас и что дальше"
        lead="Все вышедшие релизы, тот, что делается сейчас, и что стоит в очереди после него. Отфильтруйте по платформе и откройте любой шаг, чтобы увидеть, что в нём."
      />

      <div className="mt-10">
        <Roadmap locale="ru" />
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Как это читать</h2>
          <p>
            У вышедшего стоит дата, когда оно дошло до людей. У остального дат нет, и это
            намеренно: дата, которую мы сорвём, скажет вам меньше, чем её отсутствие. «Делаем
            сейчас» значит, что код написан и проверен, но до вас ещё не дошёл, а для iPhone это
            значит, что его нет в App Store. Пока нет, считайте, что в вашем приложении этого нет.
          </p>
          <p>
            Отстать от App Store эта страница не может: сайт не соберётся, пока версии, которую
            отдаёт Apple, нет среди вышедших. Подробно о каждом релизе — в{' '}
            <Link href="/changelog">журнале изменений</Link> (на английском), а то, что пока не
            исправлено ничем из этого, — в{' '}
            <Link href="/ru/limitations">известных ограничениях</Link>.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        title="Читать дальше"
        links={[
          { href: '/ru/limitations', label: 'Известные ограничения', blurb: 'От чего PrivaMesh не защищает.' },
          { href: '/ru/security', label: 'Безопасность', blurb: 'Статус аудита, исправления и как сообщить об уязвимости.' },
          { href: '/ru/download', label: 'Скачать', blurb: 'Текущие версии и системные требования.' },
        ]}
      />
    </Container>
  )
}
