import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PostList from '@/components/PostList'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { itemListLd } from '@/lib/jsonld'
import { getAllTags, getPostsByTag } from '@/lib/posts'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllTags('ru').map((t) => ({ tag: t.slug }))
}

function tagLabel(slug: string) {
  return getAllTags('ru').find((t) => t.slug === slug)?.tag
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
  const label = tagLabel(params.tag)
  if (!label) return {}
  return pageMetadata({
    title: `${label} - Блог PrivaMesh`,
    description: `Статьи про ${label.toLowerCase()} - приватные сообщения без серверов на Solana.`,
    path: `/ru/blog/tag/${params.tag}`,
    locale: 'ru',
  })
}

export default function RuTagPage({ params }: { params: { tag: string } }) {
  const label = tagLabel(params.tag)
  const posts = getPostsByTag('ru', params.tag)
  if (!label || posts.length === 0) notFound()

  return (
    <Container>
      <JsonLd
        data={itemListLd(
          `${label} статьи`,
          posts.map((p) => p.title),
        )}
      />
      <PageHeader
        eyebrow="Тема блога"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Блог', path: '/ru/blog' },
          { name: label, path: `/ru/blog/tag/${params.tag}` },
        ]}
        title={`${label}: статьи`}
        lead={`Всё, что мы написали про ${label.toLowerCase()} - как PrivaMesh хранит переписку приватной и без серверов.`}
      />
      <div className="mt-12">
        <PostList posts={posts} />
      </div>
      <p className="mt-10">
        <Link href="/ru/blog" className="text-sm text-accent hover:underline">
          ← Все статьи
        </Link>
      </p>
    </Container>
  )
}
