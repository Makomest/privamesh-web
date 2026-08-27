export const SITE = {
  name: 'PrivaMesh',
  domain: 'https://privamesh.org',
  tagline: 'Trust math, not companies.',
  description:
    'Private, end-to-end encrypted messenger for iPhone, Android and Windows. No phone number, no email, no account - your keys and chats never leave your device.',
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
  /**
   * Per-platform builds. null means the build does not exist yet - the download
   * page renders the platform as unavailable rather than linking somewhere
   * broken. Dropping a URL in here is the only edit needed when one ships.
   */
  downloads: {
    ios: 'https://apps.apple.com/app/privamesh-messenger/id6785997584' as string | null,
    android:
      'https://github.com/Makomest/PrivaMesh/releases/download/android-v0.1/PrivaMesh-0.1-android.apk' as
        | string
        | null,
    windows:
      'https://github.com/Makomest/PrivaMesh/releases/download/windows-v1.0.0/PrivaMesh-Setup-1.0.0.exe' as
        | string
        | null,
  },

  /** Binaries live on GitHub Releases rather than in this repo - 190 MB of
   *  installers do not belong in every clone and every server build. */
  androidBuild: {
    version: '0.1',
    release: 'https://github.com/Makomest/PrivaMesh/releases/tag/android-v0.1',
  },

  windowsBuild: {
    version: '1.0.0',
    portable:
      'https://github.com/Makomest/PrivaMesh/releases/download/windows-v1.0.0/PrivaMesh-1.0.0-windows-x64-portable.zip',
    release: 'https://github.com/Makomest/PrivaMesh/releases/tag/windows-v1.0.0',
  },
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
