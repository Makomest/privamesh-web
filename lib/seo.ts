import type { Metadata } from 'next'
import { SITE } from './site'

type PageSeo = {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  /** Locale of this page (drives og:locale). Default 'en'. */
  locale?: 'en' | 'ru'
  /** hreflang alternates: language code → path. Include this page + siblings. */
  languages?: Record<string, string>
}

/**
 * Build per-page Metadata with canonical URL, OpenGraph, Twitter Card and an
 * hreflang scaffold (en live, ru/uk stubbed to the same path).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  publishedTime,
  locale = 'en',
  languages,
}: PageSeo): Metadata {
  const url = `${SITE.domain}${path === '/' ? '' : path}`
  const image = ogImage ?? `${SITE.domain}/opengraph-image`
  const abs = (p: string) => `${SITE.domain}${p === '/' ? '' : p}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': `${SITE.domain}/rss.xml` },
      // hreflang only when real translated siblings are provided.
      ...(languages
        ? {
            languages: Object.fromEntries([
              ...Object.entries(languages).map(([lang, p]) => [lang, abs(p)]),
              ['x-default', abs(languages.en ?? path)],
            ]),
          }
        : {}),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE.name} - ${SITE.tagline}` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      images: [image],
    },
  }
}
