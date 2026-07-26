import type { Metadata, Viewport } from 'next'
import { SITE } from './site'

/**
 * Base metadata shared by both root layouts. Per-page metadata (canonical,
 * hreflang, OG) still comes from pageMetadata() in lib/seo.ts.
 */
export function rootMetadata(locale: 'en' | 'ru'): Metadata {
  const ru = locale === 'ru'
  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: ru
        ? 'PrivaMesh - приватный мессенджер с шифрованием'
        : 'PrivaMesh - Private Encrypted Messenger',
      template: '%s · PrivaMesh',
    },
    description: ru
      ? 'Приватный мессенджер со сквозным шифрованием. Без номера телефона, без почты, без серверов. Ключи и переписка остаются на вашем устройстве.'
      : SITE.description,
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
      canonical: ru ? `${SITE.domain}/ru` : SITE.domain,
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
