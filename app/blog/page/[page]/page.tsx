import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import PostList from '@/components/PostList'
import { pageMetadata } from '@/lib/seo'
import { getPosts, PER_PAGE } from '@/lib/posts'

export const dynamicParams = false

const POSTS = getPosts('en')

function totalPages() {
  return Math.max(1, Math.ceil(POSTS.length / PER_PAGE))
}

export function generateStaticParams() {
  // Page 1 lives at /blog, so paginate from page 2 onward only.
  const pages = totalPages()
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }))
}

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  const n = Number(params.page)
  return pageMetadata({
    title: `PrivaMesh Blog - Page ${n}`,
    description: `More plain-English articles on private, serverless, encrypted messaging. Page ${n}.`,
    path: `/blog/page/${n}`,
  })
}

export default function BlogPaged({ params }: { params: { page: string } }) {
  const n = Number(params.page)
  const pages = totalPages()
  if (!Number.isInteger(n) || n < 2 || n > pages) notFound()

  const posts = POSTS.slice((n - 1) * PER_PAGE, n * PER_PAGE)
  const prevHref = n === 2 ? '/blog' : `/blog/page/${n - 1}`
  const nextHref = n < pages ? `/blog/page/${n + 1}` : null

  return (
    <Container>
      <PageHeader
        eyebrow={`Blog · page ${n}`}
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: `Page ${n}`, path: `/blog/page/${n}` },
        ]}
        title="Notes on private messaging"
        lead="Older articles on encryption, metadata and serverless private messaging."
      />
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
      <nav className="mt-10 flex justify-between text-sm font-medium" aria-label="Pagination">
        <Link href={prevHref} rel="prev" className="text-accent hover:underline">
          ← Newer posts
        </Link>
        {nextHref && (
          <Link href={nextHref} rel="next" className="text-accent hover:underline">
            Older posts →
          </Link>
        )}
      </nav>
    </Container>
  )
}
