import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CloudflareAnalytics from '@/components/CloudflareAnalytics'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import WaitlistModal from '@/components/WaitlistModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import NetworkBackground from '@/components/NetworkBackground'
import { organizationLd, websiteLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'PrivaMesh - Private Encrypted Messenger',
    template: '%s · PrivaMesh',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'PrivaMesh' }],
  creator: 'PrivaMesh',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  alternates: {
    canonical: SITE.domain,
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

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <NetworkBackground />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <div className="relative z-10">
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <WaitlistModal />
        <CloudflareAnalytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
