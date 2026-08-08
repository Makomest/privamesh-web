export const SITE = {
  name: 'PrivaMesh',
  domain: 'https://privamesh.org',
  tagline: 'Trust math, not companies.',
  description:
    'Private, end-to-end encrypted messenger for iPhone. No phone number, no email, no servers - your keys and chats never leave your device. Free on the App Store.',
  twitter: 'https://x.com/PrivaMesh',
  twitterHandle: '@PrivaMesh',
  supportEmail: 'privamesh@proton.me',
  github: 'https://github.com/Makomest/PrivaMesh',
  whitepaper: 'https://github.com/Makomest/PrivaMesh/blob/main/WHITEPAPER.md',
  // App Store listing for the PrivaMesh iOS app. No country segment on purpose:
  // Apple redirects the visitor to their own storefront. The RU variant only
  // forces the page language, it does not pin a country.
  appStoreId: '6785997584',
  appStore: 'https://apps.apple.com/app/privamesh-messenger/id6785997584',
  appStoreRu: 'https://apps.apple.com/app/privamesh-messenger/id6785997584?l=ru',
  // Live since the App Store release - every "Get PrivaMesh" button now links to
  // the store instead of opening the waitlist modal.
  appStoreLive: true,
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
  { href: '/features/seed-phrase-accounts', label: 'Account Phrase' },
  { href: '/features/sol-transfers', label: 'In-Chat Transfers' },
]

export const NAV_COMPARE: NavLink[] = [
  { href: '/compare/privamesh-vs-signal', label: 'vs Signal' },
  { href: '/compare/privamesh-vs-telegram', label: 'vs Telegram' },
  { href: '/compare/privamesh-vs-session', label: 'vs Session' },
]
