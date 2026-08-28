/**
 * Umami tracking script - self-hosted, cookieless, and it stores no IP address.
 *
 * That combination is why it is here rather than a hosted analytics product:
 * on a site that argues you should not have to trust an operator, shipping a
 * third party a record of every visitor would be arguing against ourselves.
 * It also means no consent banner is owed.
 *
 * Absent env vars render nothing, so a local checkout and any deploy without
 * Umami configured simply ship no beacon.
 */
export default function UmamiAnalytics() {
  const url = process.env.NEXT_PUBLIC_UMAMI_URL?.replace(/\/+$/, '')
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  if (!url || !websiteId) return null

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script defer src={`${url}/script.js`} data-website-id={websiteId} />
  )
}
