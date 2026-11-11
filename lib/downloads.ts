/**
 * Download counts for the Android and Windows builds.
 *
 * The binaries are GitHub release assets, and GitHub counts every fetch of one
 * - including downloads that never touched this site. So the numbers come from
 * its API rather than from a click handler on our own button, which would only
 * ever see a subset and would count intent rather than delivery.
 *
 * Unauthenticated GitHub allows 60 requests an hour per IP, and an answer
 * takes a second or two. So the last result is kept on disk as well as in
 * memory and served at once - surviving a process restart - while a refresh
 * runs behind it once it is older than TTL_MS. Set GITHUB_TOKEN to raise the
 * limit to 5,000 if that is ever tight.
 */

import fs from 'node:fs'
import path from 'node:path'

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

const CACHE_FILE = path.join(process.cwd(), 'data', 'cache', 'downloads.json')

let cache: { at: number; value: DownloadTotals } | null = readDisk()
let inflight: Promise<DownloadTotals> | null = null

function readDisk(): { at: number; value: DownloadTotals } | null {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  } catch {
    return null
  }
}

function writeDisk(entry: { at: number; value: DownloadTotals }) {
  try {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
    fs.writeFileSync(CACHE_FILE, JSON.stringify(entry))
  } catch {
    // A read-only disk only costs the next restart a slow first load.
  }
}

function classify(name: string): AssetCount['platform'] {
  if (name.endsWith('.apk')) return 'android'
  if (name.endsWith('.exe') || name.endsWith('.msi') || name.includes('windows')) return 'windows'
  return 'other'
}

export async function getDownloadCounts(): Promise<DownloadTotals> {
  if (cache) {
    if (Date.now() - cache.at > TTL_MS) refresh().catch(() => {})
    return cache.value
  }
  return refresh()
}

function refresh(): Promise<DownloadTotals> {
  inflight ??= fetchCounts().finally(() => {
    inflight = null
  })
  return inflight
}

async function fetchCounts(): Promise<DownloadTotals> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
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
    writeDisk(cache)
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
