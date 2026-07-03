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
  return getAllTags('en').map((t) => ({ tag: t.slug }))
}

function tagLabel(slug: string) {
  return getAllTags('en').find((t) => t.slug === slug)?.tag
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
  const label = tagLabel(params.tag)
  if (!label) return {}
  return pageMetadata({
    title: `${label} - PrivaMesh Blog`,
    description: `Articles about ${label.toLowerCase()} - private, serverless, end-to-end encrypted messaging on Solana.`,
    path: `/blog/tag/${params.tag}`,
  })
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const label = tagLabel(params.tag)
  const posts = getPostsByTag('en', params.tag)
  if (!label || posts.length === 0) notFound()

  return (
    <Container>
      <JsonLd
        data={itemListLd(
          `${label} articles`,
          posts.map((p) => p.title),
        )}
      />
      <PageHeader
        eyebrow="Blog topic"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: label, path: `/blog/tag/${params.tag}` },
        ]}
        title={`${label} articles`}
        lead={`Everything we've written on ${label.toLowerCase()} - how PrivaMesh keeps messaging private, serverless and metadata-free.`}
      />
      <div className="mt-12">
        <PostList posts={posts} />
      </div>
      <p className="mt-10">
        <Link href="/blog" className="text-sm text-accent hover:underline">
          ← All posts
        </Link>
      </p>
    </Container>
  )
}
