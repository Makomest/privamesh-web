/**
 * Traffic figures pulled from a self-hosted Umami instance.
 *
 * Umami rather than Google Analytics because this is a privacy product and the
 * analytics on it should not be something the site's own threat model argues
 * against: Umami is self-hosted, sets no cookies, stores no IP address, and
 * needs no consent banner. Everything here is server-side - the admin browser
 * never talks to Umami, so its credentials stay on the server.
 *
 * Configure with UMAMI_URL, UMAMI_WEBSITE_ID, UMAMI_USERNAME, UMAMI_PASSWORD.
 * With any of them missing this returns { configured: false } and the admin
 * panel says so instead of showing zeroes that look like a traffic collapse.
 */

const TTL_MS = 60 * 1000

export type UmamiRange = '24h' | '7d' | '30d'

export type UmamiCountry = { code: string; visitors: number }

export type UmamiStats = {
  configured: boolean
  ok: boolean
  range: UmamiRange
  pageviews: number
  visitors: number
  visits: number
  bounces: number
  /** Mean session length in seconds, or null when there are no visits to divide by. */
  avgSeconds: number | null
  bounceRate: number | null
  countries: UmamiCountry[]
  error?: string
}

const RANGE_MS: Record<UmamiRange, number> = {
  '24h': 864e5,
  '7d': 7 * 864e5,
  '30d': 30 * 864e5,
}

/** Umami tokens are long-lived; re-logging in on every request would be rude. */
let token: { value: string; at: number } | null = null
const TOKEN_TTL_MS = 6 * 60 * 60 * 1000

const cache = new Map<UmamiRange, { at: number; value: UmamiStats }>()

function config() {
  const url = process.env.UMAMI_URL?.replace(/\/+$/, '')
  const websiteId = process.env.UMAMI_WEBSITE_ID
  const username = process.env.UMAMI_USERNAME
  const password = process.env.UMAMI_PASSWORD
  if (!url || !websiteId || !username || !password) return null
  return { url, websiteId, username, password }
}

async function getToken(c: NonNullable<ReturnType<typeof config>>): Promise<string> {
  if (token && Date.now() - token.at < TOKEN_TTL_MS) return token.value
  const res = await fetch(`${c.url}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: c.username, password: c.password }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Umami login returned HTTP ${res.status}`)
  const json = (await res.json()) as { token?: string }
  if (!json.token) throw new Error('Umami login returned no token')
  token = { value: json.token, at: Date.now() }
  return json.token
}

function empty(range: UmamiRange, patch: Partial<UmamiStats>): UmamiStats {
  return {
    configured: true,
    ok: false,
    range,
    pageviews: 0,
    visitors: 0,
    visits: 0,
    bounces: 0,
    avgSeconds: null,
    bounceRate: null,
    countries: [],
    ...patch,
  }
}

export async function getUmamiStats(range: UmamiRange = '7d'): Promise<UmamiStats> {
  const c = config()
  if (!c) return { ...empty(range, {}), configured: false }

  const hit = cache.get(range)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value

  try {
    const t = await getToken(c)
    const endAt = Date.now()
    const startAt = endAt - RANGE_MS[range]
    const auth = { Authorization: `Bearer ${t}` }
    const qs = `startAt=${startAt}&endAt=${endAt}`

    const [statsRes, countryRes] = await Promise.all([
      fetch(`${c.url}/api/websites/${c.websiteId}/stats?${qs}`, { headers: auth, cache: 'no-store' }),
      fetch(`${c.url}/api/websites/${c.websiteId}/metrics?${qs}&type=country&limit=8`, {
        headers: auth,
        cache: 'no-store',
      }),
    ])
    if (!statsRes.ok) throw new Error(`Umami stats returned HTTP ${statsRes.status}`)

    // Umami has returned both a bare number and a { value } object for these
    // across versions, so accept either rather than showing NaN after an upgrade.
    const num = (v: unknown): number =>
      typeof v === 'number' ? v : typeof v === 'object' && v && 'value' in v ? Number((v as { value: unknown }).value) || 0 : 0

    const raw = (await statsRes.json()) as Record<string, unknown>
    const pageviews = num(raw.pageviews)
    const visitors = num(raw.visitors)
    const visits = num(raw.visits)
    const bounces = num(raw.bounces)
    const totaltime = num(raw.totaltime)

    const countries: UmamiCountry[] = countryRes.ok
      ? ((await countryRes.json()) as { x: string | null; y: number }[])
          .filter((r) => r.x)
          .map((r) => ({ code: String(r.x), visitors: r.y }))
      : []

    const value: UmamiStats = {
      configured: true,
      ok: true,
      range,
      pageviews,
      visitors,
      visits,
      bounces,
      // totaltime is seconds across all visits; a mean needs something to divide by.
      avgSeconds: visits > 0 ? Math.round(totaltime / visits) : null,
      bounceRate: visits > 0 ? Math.round((bounces / visits) * 100) : null,
      countries,
    }
    cache.set(range, { at: Date.now(), value })
    return value
  } catch (e) {
    const stale = cache.get(range)
    if (stale) return { ...stale.value, ok: false, error: String(e) }
    return empty(range, { error: String(e) })
  }
}
