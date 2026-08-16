import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose } from '@/components/Prose'
import PostList from '@/components/PostList'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'
import { getPosts, getAllTags, PER_PAGE } from '@/lib/posts'

export const metadata: Metadata = pageMetadata({
  title: 'PrivaMesh Blog - Private Messaging & Encryption',
  description:
    'Plain-English explainers on encryption, metadata and serverless private messaging - how PrivaMesh works and why truly private messaging needs no servers.',
  path: '/blog',
  languages: { en: '/blog', ru: '/ru/blog' },
})

export default function BlogIndex() {
  const all = getPosts('en')
  const tags = getAllTags('en')
  const posts = all.slice(0, PER_PAGE)
  const hasNext = all.length > PER_PAGE

  return (
    <Container>
      <JsonLd data={webPageLd({
          name: "PrivaMesh blog",
          description: "Explainers on encryption, metadata and serverless messaging.",
          path: '/blog',
          type: 'CollectionPage',
        })} />
      <PageHeader
        eyebrow="Blog"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
        title="Notes on private messaging"
        lead="Plain-English explainers on encryption, metadata and why a truly private messenger can’t run on servers."
      />
      <div className="mt-12">
        <Prose>
          <h2>What we write about</h2>
          <p>
            These are explainers, not announcements. The recurring argument is that encrypting
            message content is the easy half of private messaging, and the half every app has
            already solved. The hard half is metadata - who contacted whom, when, and how often -
            which leaks through the infrastructure rather than through the ciphertext.
          </p>
          <p>
            So the posts tend to work through one mechanism at a time: how the Double Ratchet
            derives a fresh key per message, why a server in the path sees things its operator
            cannot un-see, what a public blockchain does and does not reveal. Where a competitor
            does something better, we say so - a comparison that only flatters the author is not
            worth reading. Shorter definitions live in the{' '}
            <Link href="/glossary">glossary</Link>, and the practical walkthroughs are in the{' '}
            <Link href="/guides">guides</Link>.
          </p>
        </Prose>
      </div>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Topics
          </span>
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/blog/tag/${t.slug}`}
              className="rounded-full border border-border bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-text-muted backdrop-blur-sm transition-colors hover:border-border-hover hover:text-accent"
            >
              {t.tag} ({t.count})
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <PostList posts={posts} />
      </div>

      {hasNext && (
        <nav className="mt-10 flex justify-end" aria-label="Pagination">
          <Link
            href="/blog/page/2"
            rel="next"
            className="text-sm font-medium text-accent hover:underline"
          >
            Older posts →
          </Link>
        </nav>
      )}
    </Container>
  )
}
