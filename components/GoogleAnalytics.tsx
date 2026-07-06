'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Google Analytics 4 (gtag.js). Set NEXT_PUBLIC_GA_ID to your Measurement ID
 * (G-XXXXXXXXXX) — nothing renders until it's set. Tracks client-side route
 * changes too (App Router SPA navigations don't reload the page).
 *
 * Note: GA4 uses cookies; add a consent banner if you serve EU users.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_ID) return
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: pathname })
    }
  }, [pathname])

  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`}
      </Script>
    </>
  )
}
