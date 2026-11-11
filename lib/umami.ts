import { LOCALES } from '@/lib/i18n/locales'

/**
 * Traffic figures pulled from the self-hosted Umami instance.
 *
 * Umami rather than Google Analytics because this is a privacy product and the
 * analytics on it should not be something the site's own threat model argues
 * against: Umami is self-hosted, sets no cookies, stores no IP address, and
 * needs no consent banner. Everything here is server-side - the admin browser
 * never talks to Umami, so its credentials stay on the server.
 *
 * Umami runs on the same machine, so its API answers in tens of milliseconds;
 * the caches below exist to absorb the admin panel's polling, not to hide a
 * slow upstream. Traffic is served stale-while-revalidate, so a refresh never
 * waits on Umami once the panel has loaded once.
 *
 * Configure with UMAMI_URL, UMAMI_WEBSITE_ID, UMAMI_USERNAME, UMAMI_PASSWORD.
 * With any of them missing this reports { configured: false } and the panel
 * says so instead of showing zeroes that look like a traffic collapse.
 */

export type UmamiRange = '24h' | '7d' | '30d' | '90d'
export const RANGES: UmamiRange[] = ['24h', '7d', '30d', '90d']

const RANGE_MS: Record<UmamiRange, number> = {
  '24h': 864e5,
  '7d': 7 * 864e5,
  '30d': 30 * 864e5,
  '90d': 90 * 864e5,
}

export type Row = { label: string; value: number }
export type Totals = {
  pageviews: number
  visitors: number
  visits: number
  bounces: number
  totaltime: number
}

export type Traffic = {
  configured: boolean
  ok: boolean
  range: UmamiRange
  unit: 'hour' | 'day'
  current: Totals
  previous: Totals
  series: { t: string; views: number; visitors: number }[]
  pages: Row[]
  entries: Row[]
  referrers: Row[]
  channels: Row[]
  countries: Row[]
  cities: (Row & { country: string })[]
  browsers: Row[]
  os: Row[]
  devices: Row[]
  languages: Row[]
  /** Page views per site language, from the locale prefix of the path. */
  siteLocales: Row[]
  fetchedAt: string
  error?: string
}

export type LiveVisitor = {
  id: string
  path: string
  country: string | null
  device: string | null
  browser: string | null
  os: string | null
  referrer: string | null
  firstSeen: string
  lastSeen: string
  views: number
}

export type Live = {
  configured: boolean
  ok: boolean
  /** Umami's own count: visitors with activity in the last five minutes. */
  active: number
  visitors: LiveVisitor[]
  pagesNow: Row[]
  countries: Row[]
  referrers: Row[]
  /** One bucket per minute for the last 30 minutes, oldest first. */
  minutes: { t: string; views: number; visitors: number }[]
  totals: { views: number; visitors: number }
  feed: { at: string; path: string; country: string | null; device: string | null; referrer: string | null; id: string }[]
  fetchedAt: string
  error?: string
}

function config() {
  const url = process.env.UMAMI_URL?.replace(/\/+$/, '')
  const websiteId = process.env.UMAMI_WEBSITE_ID
  const username = process.env.UMAMI_USERNAME
  const password = process.env.UMAMI_PASSWORD
  if (!url || !websiteId || !username || !password) return null
  return { url, websiteId, username, password }
}
type Config = NonNullable<ReturnType<typeof config>>

let token: string | null = null

async function login(c: Config): Promise<string> {
  const res = await fetch(`${c.url}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: c.username, password: c.password }),
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Umami login returned HTTP ${res.status}`)
  const json = (await res.json()) as { token?: string }
  if (!json.token) throw new Error('Umami login returned no token')
  return json.token
}

/** GET an Umami API path, logging in again once if the token has gone stale. */
async function api<T>(c: Config, path: string): Promise<T> {
  for (let attempt = 0; attempt < 2; attempt++) {
    token ??= await login(c)
    const res = await fetch(`${c.url}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (res.status === 401 && attempt === 0) {
      token = null
      continue
    }
    if (!res.ok) throw new Error(`Umami ${path.split('?')[0]} returned HTTP ${res.status}`)
    return (await res.json()) as T
  }
  throw new Error('Umami rejected the login')
}

// Umami has returned both a bare number and a { value } object for these across
// versions, so accept either rather than showing NaN after an upgrade.
const num = (v: unknown): number =>
  typeof v === 'number'
    ? v
    : typeof v === 'object' && v && 'value' in v
      ? Number((v as { value: unknown }).value) || 0
      : 0

function totals(raw: Record<string, unknown> | undefined): Totals {
  return {
    pageviews: num(raw?.pageviews),
    visitors: num(raw?.visitors),
    visits: num(raw?.visits),
    bounces: num(raw?.bounces),
    totaltime: num(raw?.totaltime),
  }
}

function validTz(tz: string | null | undefined): string {
  if (!tz) return 'UTC'
  try {
    new Intl.DateTimeFormat('en', { timeZone: tz })
    return tz
  } catch {
    return 'UTC'
  }
}

/**
 * Umami returns only buckets that had traffic, labelled in local time as
 * "YYYY-MM-DD HH:00:00". Build the full list of labels for the window so an
 * empty hour shows as an empty bar instead of vanishing from the axis.
 */
function bucketLabels(startAt: number, endAt: number, unit: 'hour' | 'day', tz: string) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  })
  const labels: string[] = []
  for (let t = startAt; t <= endAt; t += 36e5) {
    const p = Object.fromEntries(fmt.formatToParts(t).map((x) => [x.type, x.value]))
    const label = `${p.year}-${p.month}-${p.day} ${unit === 'hour' ? p.hour : '00'}:00:00`
    if (labels[labels.length - 1] !== label) labels.push(label)
  }
  return labels
}

const LOCALE_CODES = new Set(LOCALES.map((l) => l.code))

function siteLocales(paths: Row[]): Row[] {
  const by = new Map<string, number>()
  for (const p of paths) {
    const seg = p.label.split(/[/?#]/)[1] ?? ''
    const code = LOCALE_CODES.has(seg) ? seg : 'en'
    by.set(code, (by.get(code) ?? 0) + p.value)
  }
  return [...by.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
}

/** Drop the "#main" skip-link fragment and query strings so one page is one row. */
function cleanPaths(rows: Row[]): Row[] {
  const by = new Map<string, number>()
  for (const r of rows) {
    const path = r.label.split(/[?#]/)[0] || '/'
    by.set(path, (by.get(path) ?? 0) + r.value)
  }
  return [...by.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
}

function emptyTraffic(range: UmamiRange, patch: Partial<Traffic>): Traffic {
  const zero = { pageviews: 0, visitors: 0, visits: 0, bounces: 0, totaltime: 0 }
  return {
    configured: true,
    ok: false,
    range,
    unit: range === '24h' ? 'hour' : 'day',
    current: zero,
    previous: zero,
    series: [],
    pages: [],
    entries: [],
    referrers: [],
    channels: [],
    countries: [],
    cities: [],
    browsers: [],
    os: [],
    devices: [],
    languages: [],
    siteLocales: [],
    fetchedAt: new Date().toISOString(),
    ...patch,
  }
}

async function fetchTraffic(c: Config, range: UmamiRange, tz: string): Promise<Traffic> {
  const endAt = Date.now()
  const startAt = endAt - RANGE_MS[range]
  const unit = range === '24h' ? 'hour' : 'day'
  const base = `/api/websites/${c.websiteId}`
  const qs = `startAt=${startAt}&endAt=${endAt}`
  type M = { x: string | null; y: number; country?: string }[]
  const metric = (type: string, limit = 10) =>
    api<M>(c, `${base}/metrics?${qs}&type=${type}&limit=${limit}`).then((rows) =>
      rows.filter((r) => r.x).map((r) => ({ label: String(r.x), value: r.y, country: r.country })),
    )

  const [stats, views, paths, entries, referrers, channels, countries, cities, browsers, os, devices, languages] =
    await Promise.all([
      api<Record<string, unknown> & { comparison?: Record<string, unknown> }>(c, `${base}/stats?${qs}`),
      api<{ pageviews: M; sessions: M }>(
        c,
        `${base}/pageviews?${qs}&unit=${unit}&timezone=${encodeURIComponent(tz)}`,
      ),
      metric('path', 2000),
      metric('entry', 20),
      metric('referrer', 12),
      metric('channel', 10),
      metric('country', 12),
      metric('city', 10),
      metric('browser', 8),
      metric('os', 8),
      metric('device', 6),
      metric('language', 10),
    ])

  const pv = new Map(views.pageviews.map((r) => [String(r.x), r.y]))
  const vs = new Map(views.sessions.map((r) => [String(r.x), r.y]))
  const series = bucketLabels(startAt, endAt, unit, tz).map((t) => ({
    t,
    views: pv.get(t) ?? 0,
    visitors: vs.get(t) ?? 0,
  }))

  const allPaths = cleanPaths(paths)
  const strip = (rows: { label: string; value: number }[]) => rows.map(({ label, value }) => ({ label, value }))

  return {
    configured: true,
    ok: true,
    range,
    unit,
    current: totals(stats),
    previous: totals(stats.comparison),
    series,
    pages: allPaths.slice(0, 20),
    entries: cleanPaths(entries).slice(0, 10),
    referrers: strip(referrers),
    channels: strip(channels),
    countries: strip(countries),
    cities: cities.map((r) => ({ label: r.label, value: r.value, country: r.country ?? '' })),
    browsers: strip(browsers),
    os: strip(os),
    devices: strip(devices),
    languages: strip(languages),
    siteLocales: siteLocales(allPaths),
    fetchedAt: new Date().toISOString(),
  }
}

const FRESH_MS = 60 * 1000
const trafficCache = new Map<string, { at: number; value: Traffic }>()
const inflight = new Map<string, Promise<Traffic>>()

function refreshTraffic(c: Config, range: UmamiRange, tz: string): Promise<Traffic> {
  const key = `${range}|${tz}`
  const running = inflight.get(key)
  if (running) return running
  const p = fetchTraffic(c, range, tz)
    .then((value) => {
      trafficCache.set(key, { at: Date.now(), value })
      return value
    })
    .finally(() => inflight.delete(key))
  inflight.set(key, p)
  return p
}

export async function getTraffic(range: UmamiRange, tzIn?: string | null): Promise<Traffic> {
  const c = config()
  if (!c) return { ...emptyTraffic(range, {}), configured: false }
  const tz = validTz(tzIn)
  const hit = trafficCache.get(`${range}|${tz}`)

  if (hit) {
    // Serve what we have; refresh behind it when it has aged.
    if (Date.now() - hit.at > FRESH_MS) refreshTraffic(c, range, tz).catch(() => {})
    return hit.value
  }
  try {
    return await refreshTraffic(c, range, tz)
  } catch (e) {
    return emptyTraffic(range, { error: String(e) })
  }
}

type RealtimeEvent = {
  __type: string
  sessionId: string
  createdAt: string
  browser: string | null
  os: string | null
  device: string | null
  country: string | null
  urlPath: string | null
  referrerDomain: string | null
}

type Realtime = {
  events: RealtimeEvent[]
  series: { views: { x: string; y: number }[]; visitors: { x: string; y: number }[] }
  totals: { views: number; visitors: number }
}

const top = (m: Map<string, number>, n: number): Row[] =>
  [...m.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n)

let liveCache: { at: number; value: Live } | null = null
const LIVE_TTL_MS = 3000

export async function getLive(): Promise<Live> {
  const c = config()
  const now = Date.now()
  const blank: Live = {
    configured: !!c,
    ok: false,
    active: 0,
    visitors: [],
    pagesNow: [],
    countries: [],
    referrers: [],
    minutes: [],
    totals: { views: 0, visitors: 0 },
    feed: [],
    fetchedAt: new Date(now).toISOString(),
  }
  if (!c) return blank
  if (liveCache && now - liveCache.at < LIVE_TTL_MS) return liveCache.value

  try {
    const [active, rt] = await Promise.all([
      api<{ visitors?: number; x?: number }>(c, `/api/websites/${c.websiteId}/active`),
      api<Realtime>(c, `/api/realtime/${c.websiteId}`),
    ])

    const views = rt.events.filter((e) => e.__type === 'pageview' && e.urlPath)
    const fiveMin = now - 5 * 60 * 1000

    // One row per session seen in the last five minutes, newest page first.
    const sessions = new Map<string, LiveVisitor>()
    for (const e of views) {
      const at = Date.parse(e.createdAt)
      const s = sessions.get(e.sessionId)
      if (!s) {
        sessions.set(e.sessionId, {
          id: e.sessionId.slice(0, 8),
          path: e.urlPath!,
          country: e.country,
          device: e.device,
          browser: e.browser,
          os: e.os,
          referrer: e.referrerDomain,
          firstSeen: e.createdAt,
          lastSeen: e.createdAt,
          views: 1,
        })
        continue
      }
      s.views++
      if (at > Date.parse(s.lastSeen)) {
        s.lastSeen = e.createdAt
        s.path = e.urlPath!
      }
      if (at < Date.parse(s.firstSeen)) {
        s.firstSeen = e.createdAt
        s.referrer = e.referrerDomain ?? s.referrer
      }
    }
    const visitors = [...sessions.values()]
      .filter((s) => Date.parse(s.lastSeen) >= fiveMin)
      .sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen))

    const pagesNow = new Map<string, number>()
    for (const v of visitors) {
      const p = v.path.split(/[?#]/)[0] || '/'
      pagesNow.set(p, (pagesNow.get(p) ?? 0) + 1)
    }

    const countries = new Map<string, number>()
    const referrers = new Map<string, number>()
    for (const s of sessions.values()) {
      if (s.country) countries.set(s.country, (countries.get(s.country) ?? 0) + 1)
      if (s.referrer) referrers.set(s.referrer, (referrers.get(s.referrer) ?? 0) + 1)
    }

    // The realtime series lists only minutes that had traffic; lay out all 30.
    const minuteKey = (t: number) => new Date(Math.floor(t / 6e4) * 6e4).toISOString().slice(0, 16)
    const mv = new Map(rt.series.views.map((r) => [r.x.slice(0, 16), r.y]))
    const mu = new Map(rt.series.visitors.map((r) => [r.x.slice(0, 16), r.y]))
    const minutes = Array.from({ length: 30 }, (_, i) => {
      const k = minuteKey(now - (29 - i) * 6e4)
      return { t: `${k}:00Z`, views: mv.get(k) ?? 0, visitors: mu.get(k) ?? 0 }
    })

    const value: Live = {
      configured: true,
      ok: true,
      active: num(active.visitors ?? active.x),
      visitors,
      pagesNow: top(pagesNow, 8),
      countries: top(countries, 8),
      referrers: top(referrers, 8),
      minutes,
      totals: { views: num(rt.totals?.views), visitors: num(rt.totals?.visitors) },
      feed: views.slice(0, 25).map((e) => ({
        at: e.createdAt,
        path: e.urlPath!,
        country: e.country,
        device: e.device,
        referrer: e.referrerDomain,
        id: e.sessionId.slice(0, 8),
      })),
      fetchedAt: new Date(now).toISOString(),
    }
    liveCache = { at: now, value }
    return value
  } catch (e) {
    if (liveCache) return { ...liveCache.value, ok: false, error: String(e) }
    return { ...blank, error: String(e) }
  }
}
