import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import BlogLayout from '@/components/BlogLayout'
import { useMDXComponents } from '@/mdx-components'
import { getPost, getPostContent, getPosts, extractHeadings, hasTranslation } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts('ru').map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost('ru', params.slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/ru/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    locale: 'ru',
    ...(hasTranslation(post.slug, 'en')
      ? { languages: { en: `/blog/${post.slug}`, ru: `/ru/blog/${post.slug}` } }
      : {}),
  })
}

export default async function RuBlogPostPage({ params }: { params: { slug: string } }) {
  const raw = getPostContent('ru', params.slug)
  if (!raw) notFound()

  const { content } = await compileMDX({
    source: raw.content,
    components: useMDXComponents({}),
    options: { parseFrontmatter: false, mdxOptions: { rehypePlugins: [rehypeSlug] } },
  })

  return (
    <BlogLayout post={raw.meta} headings={extractHeadings(raw.content)}>
      {content}
    </BlogLayout>
  )
}
