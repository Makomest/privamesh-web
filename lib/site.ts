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
  // Prices and allowances mirror privamesh.storekit in the app repo. Apple
  // regionalises the actual amount charged; these are the US tier prices.
  price: {
    plus: '5.99',
    pro: '9.99',
    currency: 'USD',
  },
  /** Monthly sponsored message allowance per tier, from SubscriptionManager. */
  allowance: { free: 0, plus: 1200, pro: 2000 },
  /** One-off message packs: product suffix → [messages, USD price]. */
  packs: [
    { messages: 100, price: '0.99' },
    { messages: 500, price: '3.99' },
    { messages: 1500, price: '9.99' },
  ],
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
]

export const NAV_COMPARE: NavLink[] = [
  { href: '/compare/privamesh-vs-signal', label: 'vs Signal' },
  { href: '/compare/privamesh-vs-telegram', label: 'vs Telegram' },
  { href: '/compare/privamesh-vs-session', label: 'vs Session' },
]
