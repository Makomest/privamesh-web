import CloudflareAnalytics from '@/components/CloudflareAnalytics'
import GoogleTag from '@/components/GoogleTag'
import WaitlistModal from '@/components/WaitlistModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import NetworkBackground from '@/components/NetworkBackground'
import { organizationLd, websiteLd } from '@/lib/jsonld'

/**
 * Everything inside <body>, shared by both root layouts. The layouts differ
 * only in the <html lang> they declare, so the chrome lives here to keep the
 * EN and RU trees from drifting apart.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <NetworkBackground />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
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
      <GoogleTag />
    </>
  )
}
