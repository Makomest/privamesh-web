import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // OAI-SearchBot is what surfaces pages in ChatGPT Search results, and it is
    // a separate agent from GPTBot, which is used for model training. Both are
    // named explicitly so the intent is on the record rather than inferred from
    // the wildcard rule.
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: [`${SITE.domain}/sitemap.xml`, `${SITE.domain}/image-sitemap.xml`],
    host: SITE.domain,
  }
}
