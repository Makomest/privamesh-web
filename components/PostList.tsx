import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FadeUp from './FadeUp'
import { blogBase, type Post } from '@/lib/posts'

function fmtDate(d: string, locale: string) {
  return new Date(d).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Reusable list of blog post cards (blog index, tag hubs, pagination). */
export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-5">
      {posts.map((post, i) => (
        <FadeUp key={post.slug} delay={i * 60}>
          <Link
            href={`${blogBase(post.locale)}/${post.slug}`}
            className="group block rounded-card border border-border bg-white/20 p-6 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
              <time dateTime={post.date}>{fmtDate(post.date, post.locale)}</time>
              <span className="text-text-faint">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              {post.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
              {post.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Read article
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </FadeUp>
      ))}
    </div>
  )
}
