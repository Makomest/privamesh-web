import { SITE } from '@/lib/site'
import { POSTS } from '@/lib/posts'

export const dynamic = 'force-static'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** RSS 2.0 feed of blog posts. */
export function GET() {
  const items = [...POSTS]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => {
      const url = `${SITE.domain}/blog/${p.slug}`
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PrivaMesh Blog</title>
    <link>${SITE.domain}/blog</link>
    <description>${esc(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE.domain}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
