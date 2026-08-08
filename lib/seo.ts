import type { Metadata } from 'next'
import { SITE } from './site'

/**
 * Trim to a length without cutting a word in half.
 *
 * Descriptions built with a plain .slice() produced tails like "keys that have
 * alre" on /glossary/forward-secrecy. Cuts at the last word boundary inside the
 * limit and adds an ellipsis, or returns the string untouched if it already
 * fits.
 */
export function truncateAtWord(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '') + '…'
}

/**
 * Make a description end cleanly.
 *
 * Posts ingested through /admin arrive with descriptions already cut to 155
 * characters by the generator upstream, so they end mid-sentence ("...on
 * encryption, metadata"). Nothing downstream can recover the lost words, but it
 * can stop the tag reading like a bug: cut back to the last sentence if one
 * ends late enough, otherwise drop the dangling fragment and mark the cut.
 * A description that already ends in punctuation is returned untouched.
 */
export function tidyDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean || /[.!?…»)]$/.test(clean)) return clean

  const lastStop = Math.max(clean.lastIndexOf('. '), clean.lastIndexOf('! '), clean.lastIndexOf('? '))
  if (lastStop > clean.length * 0.6) return clean.slice(0, lastStop + 1)

  return clean.replace(/[\s,;:—-]+$/, '') + '…'
}

/** Roughly where Google truncates a title in the SERP. */
const TITLE_MAX_LENGTH = 60
/** Length of the " · PrivaMesh" suffix the root layout's title template adds. */
const TITLE_SUFFIX_LENGTH = 12

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
  const abs = (p: string) => `${SITE.domain}${p === '/' ? '' : p}`
  void ogImage // reserved for future per-page override; images now via file convention

  // The root layout appends " · PrivaMesh" (12 chars). On pages whose own title
  // is already long that pushes the tag past ~60 chars and Google truncates it,
  // so those opt out of the template rather than lose the tail of the title.
  const titled =
    title.length + TITLE_SUFFIX_LENGTH > TITLE_MAX_LENGTH ? { absolute: title } : title

  return {
    title: titled,
    description: tidyDescription(description),
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
    // NOTE: no explicit openGraph/twitter images here — Next's file-based
    // opengraph-image convention supplies them (root OG for most pages,
    // per-route opengraph-image.tsx overrides for compare/alternatives/blog).
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
    },
  }
}
