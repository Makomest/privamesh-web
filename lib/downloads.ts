/**
 * Download counts for the Android and Windows builds.
 *
 * The binaries are GitHub release assets, and GitHub counts every fetch of one
 * - including downloads that never touched this site. So the numbers come from
 * its API rather than from a click handler on our own button, which would only
 * ever see a subset and would count intent rather than delivery.
 *
 * Unauthenticated GitHub allows 60 requests an hour per IP. The admin page
 * polls on every load, so results are cached; set GITHUB_TOKEN to raise the
 * limit to 5,000 if that is ever tight.
 */

const REPO = 'Makomest/PrivaMesh'
const TTL_MS = 5 * 60 * 1000

export type AssetCount = {
  platform: 'android' | 'windows' | 'other'
  name: string
  tag: string
  count: number
  sizeMb: number
  updatedAt: string
}

export type DownloadTotals = {
  ok: boolean
  /** null when the platform has no published asset at all. */
  android: number | null
  windows: number | null
  assets: AssetCount[]
  fetchedAt: string
  error?: string
}

let cache: { at: number; value: DownloadTotals } | null = null

function classify(name: string): AssetCount['platform'] {
  if (name.endsWith('.apk')) return 'android'
  if (name.endsWith('.exe') || name.endsWith('.msi') || name.includes('windows')) return 'windows'
  return 'other'
}

export async function getDownloadCounts(): Promise<DownloadTotals> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
      headers,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`GitHub returned HTTP ${res.status}`)

    const releases = (await res.json()) as {
      tag_name: string
      assets: { name: string; download_count: number; size: number; updated_at: string }[]
    }[]

    const assets: AssetCount[] = releases.flatMap((r) =>
      r.assets.map((a) => ({
        platform: classify(a.name),
        name: a.name,
        tag: r.tag_name,
        count: a.download_count,
        sizeMb: Math.round((a.size / 1e6) * 10) / 10,
        updatedAt: a.updated_at,
      })),
    )

    // Checksum files and release notes are assets too; only the installers count
    // as a download of the product.
    const sum = (p: AssetCount['platform']) => {
      const rows = assets.filter((a) => a.platform === p)
      return rows.length ? rows.reduce((n, a) => n + a.count, 0) : null
    }

    const value: DownloadTotals = {
      ok: true,
      android: sum('android'),
      windows: sum('windows'),
      assets: assets.sort((a, b) => b.count - a.count),
      fetchedAt: new Date().toISOString(),
    }
    cache = { at: Date.now(), value }
    return value
  } catch (e) {
    // Serve the last good numbers rather than blanking the panel on a blip.
    if (cache) return { ...cache.value, ok: false, error: String(e) }
    return {
      ok: false,
      android: null,
      windows: null,
      assets: [],
      fetchedAt: new Date().toISOString(),
      error: String(e),
    }
  }
}
