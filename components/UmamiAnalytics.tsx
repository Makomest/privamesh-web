/**
 * Umami tracking script - self-hosted, cookieless, and it stores no IP address.
 *
 * That combination is why it is here rather than a hosted analytics product:
 * on a site that argues you should not have to trust an operator, shipping a
 * third party a record of every visitor would be arguing against ourselves.
 * It also means no consent banner is owed.
 *
 * By default the beacon is served from this origin, with Nginx proxying
 * /script.js and /api/send through to Umami on localhost. That is deliberate:
 * it needs no second domain and no second certificate, the browser makes no
 * cross-origin request so the CSP needs nothing added, and a blocklist cannot
 * match it on hostname the way it would match an "analytics." subdomain.
 *
 * Set NEXT_PUBLIC_UMAMI_URL only if Umami lives on its own domain instead.
 * With no website ID nothing renders at all, so a local checkout and any deploy
 * without Umami configured ship no beacon.
 */
export default function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  if (!websiteId) return null

  const url = process.env.NEXT_PUBLIC_UMAMI_URL?.replace(/\/+$/, '')
  const src = url ? `${url}/script.js` : '/script.js'

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script defer src={src} data-website-id={websiteId} />
  )
}
