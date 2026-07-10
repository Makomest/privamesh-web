export const SITE = {
  name: 'PrivaMesh',
  domain: 'https://privamesh.org',
  tagline: 'Trust math, not companies.',
  description:
    'PrivaMesh is a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata. Trust math, not companies.',
  twitter: 'https://x.com/PrivaMesh',
  twitterHandle: '@PrivaMesh',
  github: 'https://github.com/Makomest/PrivaMesh',
  whitepaper: 'https://github.com/Makomest/PrivaMesh/blob/main/WHITEPAPER.md',
  // App Store listing for the PrivaMesh iOS app.
  // TODO: replace the placeholder id with the real App Store URL when live.
  appStore: 'https://apps.apple.com/app/privamesh/id0000000000',
  // Flip to true once the App Store link above is real - this activates every
  // "Get PrivaMesh" button. While false the buttons show a lock + "Soon" tooltip.
  appStoreLive: false,
  price: {
    plus: '1.99',
    currency: 'USD',
  },
  // App Store rating for AggregateRating rich snippet (stars in search).
  // Keep null until you have REAL App Store reviews — fake ratings violate
  // Google's guidelines. Then set e.g. { value: '4.8', count: 210 }.
  rating: null as null | { value: string; count: number },
  locales: ['en', 'ru', 'uk'] as const,
  defaultLocale: 'en' as const,
} as const

export type NavLink = { href: string; label: string }

export const NAV_PRODUCT: NavLink[] = [
  { href: '/features/no-servers', label: 'No Servers' },
  { href: '/features/e2e-encryption', label: 'E2E Encryption' },
  { href: '/features/metadata-protection', label: 'Metadata Protection' },
  { href: '/features/seed-phrase-accounts', label: 'Seed Phrase Accounts' },
  { href: '/features/sol-transfers', label: 'SOL Transfers' },
]

export const NAV_COMPARE: NavLink[] = [
  { href: '/compare/privamesh-vs-signal', label: 'vs Signal' },
  { href: '/compare/privamesh-vs-telegram', label: 'vs Telegram' },
  { href: '/compare/privamesh-vs-session', label: 'vs Session' },
]

export const NAV_RESOURCES: NavLink[] = [
  { href: '/privacy', label: 'Why Private' },
  { href: '/blog', label: 'Blog' },
  { href: SITE.whitepaper, label: 'White Paper' },
  { href: SITE.github, label: 'GitHub' },
]

export const NAV_LEGAL: NavLink[] = [
  { href: '/privacy', label: 'Privacy Approach' },
  { href: SITE.github, label: 'Open Source License' },
]
