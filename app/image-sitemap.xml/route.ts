import { SITE } from '@/lib/site'
import { SCREENSHOTS } from '@/lib/data'

export const dynamic = 'force-static'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Dedicated image sitemap (Next 14's MetadataRoute sitemap doesn't emit the
 * image namespace). Surfaces the app screenshots on the home page to Google
 * Images with keyword-rich captions.
 */
export function GET() {
  const images = SCREENSHOTS.map((s) => {
    const src = s.src.split('?')[0]
    return `    <image:image>
      <image:loc>${SITE.domain}${src}</image:loc>
      <image:title>${esc(s.title)}</image:title>
      <image:caption>${esc(s.alt)}</image:caption>
    </image:image>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE.domain}</loc>
${images}
  </url>
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
