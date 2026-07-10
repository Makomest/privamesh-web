import { SITE } from './site'

/** Sitewide organization/publisher entity. */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.domain}/#organization`,
  name: SITE.name,
  url: SITE.domain,
  logo: `${SITE.domain}/logo.png`,
  slogan: SITE.tagline,
  sameAs: [SITE.twitter, SITE.github],
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.domain}/#website`,
  url: SITE.domain,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.domain}/#organization` },
  inLanguage: 'en',
}

/** SoftwareApplication with a free + paid offer, for the home page. */
export const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  operatingSystem: 'iOS',
  applicationCategory: 'CommunicationApplication',
  description: SITE.description,
  url: SITE.domain,
  image: `${SITE.domain}/logo.png`,
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'PrivaMesh+',
      price: SITE.price.plus,
      priceCurrency: SITE.price.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: SITE.price.plus,
        priceCurrency: SITE.price.currency,
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: 'MON',
      },
    },
  ],
  // Star rating rich result — only when real App Store reviews exist (SITE.rating).
  ...(SITE.rating
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SITE.rating.value,
          ratingCount: SITE.rating.count,
          bestRating: '5',
          worstRating: '1',
        },
      }
    : {}),
  publisher: { '@id': `${SITE.domain}/#organization` },
}

export function faqPageLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE.domain}${t.path === '/' ? '' : t.path}`,
    })),
  }
}

export function itemListLd(name: string, items: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((label, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
    })),
  }
}

export function articleLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  locale = 'en',
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  author?: string
  locale?: 'en' | 'ru'
}) {
  const authorName = author ?? SITE.name
  const base = locale === 'ru' ? `${SITE.domain}/ru/blog` : `${SITE.domain}/blog`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: locale,
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: `${base}/${slug}`,
    image: `${SITE.domain}/opengraph-image`,
    author:
      authorName === SITE.name
        ? { '@type': 'Organization', name: SITE.name, url: SITE.domain }
        : { '@type': 'Person', name: authorName },
    publisher: { '@id': `${SITE.domain}/#organization` },
  }
}

export function howToLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function videoObjectLd({
  name,
  description,
  url,
  uploadDate,
}: {
  name: string
  description: string
  url: string
  uploadDate: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    uploadDate,
    thumbnailUrl: [`${SITE.domain}/opengraph-image`],
    contentUrl: url,
    embedUrl: url,
  }
}

/** Render a JSON-LD object as a script tag string payload. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
