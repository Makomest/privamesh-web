import type { Metadata, Viewport } from 'next'
import { SITE } from './site'
import { getMessages } from './i18n/messages'
import { localePath } from './i18n/locales'
import type { Common } from './i18n/common'

/**
 * Base metadata shared by every root layout. Per-page metadata (canonical,
 * hreflang, OG) still comes from pageMetadata() in lib/seo.ts.
 */
export function rootMetadata(locale: string): Metadata {
  const { meta } = getMessages<Common>(locale, 'common')
  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: meta.title,
      template: '%s · PrivaMesh',
    },
    description: meta.description,
    applicationName: SITE.name,
    authors: [{ name: 'PrivaMesh' }],
    creator: 'PrivaMesh',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    // Favicon + apple-touch icon come from app/icon.png and app/apple-icon.png
    // (Next file convention -> content-hashed URLs that bust browser cache).
    alternates: {
      canonical: `${SITE.domain}${localePath(locale, '/') === '/' ? '' : localePath(locale, '/')}`,
      types: { 'application/rss+xml': `${SITE.domain}/rss.xml` },
    },
    // Search engine verification. Google via env; Bing (msvalidate.01) hardcoded
    // (public token, safe) so DuckDuckGo can index via Bing.
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      other: { 'msvalidate.01': '0373245D227374D2432F219C6D72805F' },
    },
  }
}

export const rootViewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}
