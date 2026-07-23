import type { ReactNode } from 'react'
import Link from 'next/link'
import { Container } from './Container'
import Breadcrumbs from './Breadcrumbs'
import JsonLd from './JsonLd'
import { RelatedLinks } from './Prose'
import { articleLd, howToLd, videoObjectLd } from '@/lib/jsonld'
import { blogBase, hasTranslation, slugifyTag, type Post } from '@/lib/posts'

type Heading = { id: string; text: string; level: 2 | 3 }

function fmtDate(d: string, locale: string) {
  return new Date(d).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Wraps a rendered post with header, ToC, dates/author and structured data. */
export default function BlogLayout({
  post,
  children,
  headings = [],
}: {
  post: Post
  children: ReactNode
  headings?: Heading[]
}) {
  const base = blogBase(post.locale)
  const other = post.locale === 'ru' ? 'en' : 'ru'
  const otherExists = hasTranslation(post.slug, other)
  const otherBase = blogBase(other)
  const isRu = post.locale === 'ru'

  const t = {
    blog: isRu ? 'Блог' : 'Blog',
    updated: isRu ? 'Обновлено' : 'Updated',
    onThisPage: isRu ? 'Содержание' : 'On this page',
    back: isRu ? '← Все статьи' : '← Back to all posts',
    readNext: isRu ? 'Читать далее' : 'Read next',
    otherLang: isRu ? 'Read in English' : 'Читать на русском',
  }

  return (
    <Container>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: post.author,
          locale: post.locale,
        })}
      />
      {post.howto && (
        <JsonLd
          data={howToLd({ name: post.title, description: post.description, steps: post.howto })}
        />
      )}
      {post.video && (
        <JsonLd
          data={videoObjectLd({
            name: post.title,
            description: post.description,
            url: post.video,
            uploadDate: post.date,
          })}
        />
      )}

      <article className="pt-12">
        <Breadcrumbs
          trail={[
            { name: isRu ? 'Главная' : 'Home', path: isRu ? '/ru' : '/' },
            { name: t.blog, path: base },
            { name: post.title, path: `${base}/${post.slug}` },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
          <span>{post.author}</span>
          <span className="text-text-faint">·</span>
          <time dateTime={post.date}>{fmtDate(post.date, post.locale)}</time>
          {post.updated && post.updated !== post.date && (
            <>
              <span className="text-text-faint">·</span>
              <span>
                {t.updated} {fmtDate(post.updated, post.locale)}
              </span>
            </>
          )}
          <span className="text-text-faint">·</span>
          <span>{post.readingTime}</span>
          {otherExists && (
            <>
              <span className="text-text-faint">·</span>
              <Link
                href={`${otherBase}/${post.slug}`}
                hrefLang={other}
                className="text-accent hover:underline"
              >
                {t.otherLang}
              </Link>
            </>
          )}
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-text-primary sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`${base}/tag/${slugifyTag(tag)}`}
              className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-text-muted backdrop-blur-sm transition-colors hover:border-border-hover hover:text-accent"
            >
              {tag}
            </Link>
          ))}
        </div>

        {headings.length >= 3 && (
          <nav
            aria-label={t.onThisPage}
            className="mt-8 max-w-prose rounded-2xl border border-border bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              {t.onThisPage}
            </p>
            <ul className="mt-3 space-y-1.5">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="prose-content mt-10 max-w-prose rounded-2xl p-6 backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </article>

      <RelatedLinks
        title={t.readNext}
        links={[
          {
            href: isRu ? '/ru' : '/features/e2e-encryption',
            label: isRu ? 'Главная' : 'E2E encryption',
            blurb: isRu
              ? 'Как PrivaMesh шифрует сообщения без серверов.'
              : 'X3DH, Double Ratchet and AES-256-GCM in plain English.',
          },
          {
            href: isRu ? '/ru/blog' : '/features/no-servers',
            label: isRu ? 'Блог' : 'No servers',
            blurb: isRu
              ? 'Другие статьи о приватных сообщениях.'
              : 'The serverless architecture behind PrivaMesh.',
          },
          {
            href: isRu ? '/' : '/privacy',
            label: isRu ? 'English site' : 'Why private',
            blurb: isRu
              ? 'Полная версия сайта на английском.'
              : 'The full case for the most private messenger.',
          },
        ]}
      />
      <p className="mt-10">
        <Link href={base} className="text-sm text-accent hover:underline">
          {t.back}
        </Link>
      </p>
    </Container>
  )
}
