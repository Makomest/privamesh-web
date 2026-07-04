/**
 * Cloudflare Web Analytics (privacy-friendly, cookieless, no consent banner).
 * Standalone JS beacon — the domain does NOT need to be on Cloudflare DNS.
 *
 * Rendered as a plain server-side <script> so the beacon ships in the initial
 * HTML (fires on every page load, no dependency on hydration). The token is a
 * public beacon token, safe to expose.
 */
const DEFAULT_TOKEN = '4a00ce1ab338477181b2b36b6d00c63f'

export default function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN || DEFAULT_TOKEN
  if (!token) return null
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  )
}
