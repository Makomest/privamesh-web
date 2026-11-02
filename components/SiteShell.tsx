import CloudflareAnalytics from '@/components/CloudflareAnalytics'
import GoogleTag from '@/components/GoogleTag'
import UmamiAnalytics from '@/components/UmamiAnalytics'
import WaitlistModal from '@/components/WaitlistModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import NetworkBackground from '@/components/NetworkBackground'
import { I18nProvider } from '@/components/I18nProvider'
import { organizationLd, websiteLd } from '@/lib/jsonld'
import { getMessages } from '@/lib/i18n/messages'
import { availabilityMap } from '@/lib/i18n/pages'
import { LOCALES } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'

/**
 * Everything inside <body>, shared by every root layout. The layouts differ
 * only in the <html lang dir> they declare, so the chrome lives here to keep
 * the locale trees from drifting apart.
 */
export default function SiteShell({
  children,
  locale = 'en',
}: {
  children: React.ReactNode
  locale?: string
}) {
  const ui = getMessages<Common>(locale, 'common')
  const avail = availabilityMap()
  const languages = LOCALES.map(({ code, name, english, hreflang }) => ({ code, name, english, hreflang }))

  return (
    <I18nProvider value={{ locale, ui, avail }}>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <NetworkBackground />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        {ui.skip}
      </a>
      <div className="relative z-10">
        <Navbar languages={languages} />
        <main id="main">{children}</main>
        <Footer locale={locale} ui={ui} />
      </div>
      <WaitlistModal />
      <CloudflareAnalytics />
      <GoogleTag />
      <UmamiAnalytics />
    </I18nProvider>
  )
}
