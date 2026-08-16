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
  sameAs: [SITE.twitter],
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

/**
 * SoftwareApplication for the app.
 *
 * Every field is checked against the live App Store listing rather than the
 * marketing copy: the category there is Social Networking, the app itself is a
 * free download, and PrivaMesh+ is an in-app subscription rather than a
 * purchase price. Screenshots point at the stable /screenshots files, not at
 * the generated OG images whose URLs change on every build.
 */
export const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PrivaMesh Messenger',
  alternateName: SITE.name,
  operatingSystem: 'iOS 26.5 or later',
  applicationCategory: 'SocialNetworkingApplication',
  softwareVersion: '1.0',
  description: SITE.description,
  url: SITE.domain,
  image: `${SITE.domain}/logo.png`,
  screenshot: [
    `${SITE.domain}/screenshots/01.png`,
    `${SITE.domain}/screenshots/02.png`,
    `${SITE.domain}/screenshots/03.png`,
    `${SITE.domain}/screenshots/04.png`,
    `${SITE.domain}/screenshots/05.png`,
  ],
  downloadUrl: SITE.appStore,
  installUrl: SITE.appStore,
  author: { '@id': `${SITE.domain}/#organization` },
  // The App Store lists PrivaMesh as a free download. PrivaMesh+ is an in-app
  // subscription, so it is described as an addOn rather than a second price for
  // the app, which would misreport the cost of installing it.
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: SITE.appStore,
    addOn: {
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
  },
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

/** The glossary as a single vocabulary, so the 8 DefinedTerms hang off one set. */
export function definedTermSetLd(terms: { slug: string; term: string; short: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE.domain}/glossary#set`,
    name: 'PrivaMesh private messaging glossary',
    url: `${SITE.domain}/glossary`,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.short,
      url: `${SITE.domain}/glossary/${t.slug}`,
    })),
  }
}
