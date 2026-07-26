import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose } from '@/components/Prose'
import PostList from '@/components/PostList'
import { pageMetadata } from '@/lib/seo'
import { getPosts, getAllTags, PER_PAGE } from '@/lib/posts'

export const metadata: Metadata = pageMetadata({
  title: 'Блог PrivaMesh - приватные сообщения и шифрование',
  description:
    'Понятные объяснения про шифрование, метаданные и приватные сообщения без серверов - как работает PrivaMesh.',
  path: '/ru/blog',
  locale: 'ru',
  languages: { en: '/blog', ru: '/ru/blog' },
})

export default function RuBlogIndex() {
  const all = getPosts('ru')
  const tags = getAllTags('ru')
  const posts = all.slice(0, PER_PAGE)

  return (
    <Container>
      <PageHeader
        eyebrow="Блог"
        trail={[
          { name: 'Главная', path: '/ru' },
          { name: 'Блог', path: '/ru/blog' },
        ]}
        title="Заметки о приватных сообщениях"
        lead="Понятным языком: шифрование, метаданные и почему по-настоящему приватный мессенджер не может работать на серверах."
      />
      <div className="mt-12">
        <Prose>
          <h2>О чём мы пишем</h2>
          <p>
            Это разборы, а не анонсы. Главная мысль повторяется из статьи в статью: шифрование
            содержимого - простая половина задачи, и её уже решили все мессенджеры. Сложная
            половина - метаданные: кто с кем связался, когда и как часто. Они утекают через
            инфраструктуру, а не через шифротекст.
          </p>
          <p>
            Поэтому посты разбирают по одному механизму за раз: как Double Ratchet выводит новый
            ключ для каждого сообщения, почему сервер в цепочке видит то, что уже не может
            «развидеть», что публичный блокчейн раскрывает, а что нет. Если конкурент делает
            что-то лучше, мы так и пишем - сравнение, которое льстит только автору, читать
            незачем.
          </p>
        </Prose>
      </div>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Темы
          </span>
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/ru/blog/tag/${t.slug}`}
              className="rounded-full border border-border bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-text-muted backdrop-blur-sm transition-colors hover:border-border-hover hover:text-accent"
            >
              {t.tag} ({t.count})
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-text-muted">Скоро здесь появятся статьи.</p>
        )}
      </div>

      <p className="mt-10">
        <Link href="/blog" className="text-sm text-accent hover:underline">
          Read the blog in English →
        </Link>
      </p>
    </Container>
  )
}
