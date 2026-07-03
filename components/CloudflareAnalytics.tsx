import Script from 'next/script'

/**
 * Cloudflare Web Analytics (privacy-friendly, cookieless, no consent banner).
 * Standalone JS beacon — the domain does NOT need to be on Cloudflare DNS.
 *
 * Set NEXT_PUBLIC_CF_BEACON_TOKEN to the token Cloudflare gives you
 * (Dashboard → Analytics & Logs → Web Analytics → Add a site). It's a public
 * token, safe to expose. Nothing renders until it's set.
 */
export default function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN
  if (!token) return null
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
    />
  )
}
