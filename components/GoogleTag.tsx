'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Google Ads conversion ID. Hardcoded rather than env-configured because it is
 * public by nature - it ships in the page source of every site that uses it,
 * the same as the Bing verification token in the root layout. Override with
 * NEXT_PUBLIC_GOOGLE_ADS_ID if a different account is ever needed.
 */
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? 'AW-18009597033'

/** GA4 Measurement ID (G-XXXXXXXXXX). Optional - nothing breaks without it. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const IDS = [GA_ID, ADS_ID].filter(Boolean) as string[]

/**
 * The single Google tag for the site.
 *
 * Google asks for exactly one gtag.js loader per page, so this loads the script
 * once and issues a config call per product - GA4 and Google Ads share the same
 * tag rather than each shipping their own. Route changes are reported manually
 * because App Router navigations do not reload the page.
 *
 * Note: this sets cookies and is subject to GDPR/ePrivacy consent in the EU.
 */
export default function GoogleTag() {
  const pathname = usePathname()

  useEffect(() => {
    if (IDS.length === 0) return
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', { page_path: pathname })
    }
  }, [pathname])

  if (IDS.length === 0) return null

  const configCalls = IDS.map((id) => `gtag('config', '${id}');`).join('\n')

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${IDS[0]}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configCalls}`}
      </Script>
    </>
  )
}
