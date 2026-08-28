'use client'

import { Activity, Clock, Download, Globe, Smartphone, Monitor } from 'lucide-react'

export type DownloadStats = {
  ok: boolean
  android: number | null
  windows: number | null
  assets: { platform: string; name: string; tag: string; count: number }[]
  error?: string
}

export type TrafficStats = {
  configured: boolean
  ok: boolean
  range: '24h' | '7d' | '30d'
  pageviews: number
  visitors: number
  visits: number
  avgSeconds: number | null
  bounceRate: number | null
  countries: { code: string; visitors: number }[]
  error?: string
}

const RANGES: { id: TrafficStats['range']; label: string }[] = [
  { id: '24h', label: '24 hours' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
]

/** ISO 3166-1 alpha-2 to its flag, by offsetting into the regional indicators. */
function flag(code: string) {
  if (!/^[A-Za-z]{2}$/.test(code)) return '🏳'
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  )
}

let countryNames: Intl.DisplayNames | null = null
function countryName(code: string) {
  try {
    countryNames ??= new Intl.DisplayNames(['en'], { type: 'region' })
    return countryNames.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

/** 4210 -> "1h 10m", 95 -> "1m 35s". Minutes matter more than precision here. */
function duration(s: number | null) {
  if (s === null) return '—'
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ${s % 60}s`
  return `${Math.floor(m / 60)}h ${m % 60}m`
}

const card = 'rounded-card border border-border bg-white/[0.03] p-5 backdrop-blur-sm'

export default function AdminAnalytics({
  downloads,
  traffic,
  range,
  onRange,
}: {
  downloads?: DownloadStats
  traffic?: TrafficStats
  range: TrafficStats['range']
  onRange: (r: TrafficStats['range']) => void
}) {
  const maxCountry = traffic?.countries[0]?.visitors ?? 0

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Downloads</h2>
        <span className="font-mono text-xs text-text-muted">counted by GitHub, all time</span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className={card}>
          <Smartphone size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">
            {downloads?.android ?? '—'}
          </p>
          <p className="text-sm text-text-muted">Android APK</p>
        </div>
        <div className={card}>
          <Monitor size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">{downloads?.windows ?? '—'}</p>
          <p className="text-sm text-text-muted">Windows installer + portable</p>
        </div>
        <div className={card}>
          <Download size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">
            {downloads ? (downloads.android ?? 0) + (downloads.windows ?? 0) : '—'}
          </p>
          <p className="text-sm text-text-muted">
            Both platforms.{' '}
            <span className="text-text-secondary">iPhone is not here - Apple reports installs in App Store Connect, not to us.</span>
          </p>
        </div>
      </div>

      {downloads && downloads.assets.length > 0 && (
        <div className={`mt-4 ${card}`}>
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Per file
          </p>
          <ul className="mt-3 space-y-1.5">
            {downloads.assets.map((a) => (
              <li key={a.tag + a.name} className="flex justify-between gap-4 text-sm">
                <span className="truncate text-text-primary">{a.name}</span>
                <span className="font-mono text-xs text-text-muted">{a.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {downloads && !downloads.ok && (
        <p className="mt-3 text-sm text-text-muted">
          GitHub did not answer, so these are the last numbers that arrived. {downloads.error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Traffic</h2>
        <div className="flex gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => onRange(r.id)}
              className={`rounded-btn border px-3 py-1.5 text-xs transition-colors ${
                range === r.id
                  ? 'border-border-accent text-accent'
                  : 'border-border text-text-muted hover:text-text-secondary'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {traffic && !traffic.configured ? (
        <div className={`mt-4 ${card}`}>
          <p className="text-sm text-text-secondary">Umami is not connected yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Set <code className="font-mono text-xs">UMAMI_URL</code>,{' '}
            <code className="font-mono text-xs">UMAMI_WEBSITE_ID</code>,{' '}
            <code className="font-mono text-xs">UMAMI_USERNAME</code> and{' '}
            <code className="font-mono text-xs">UMAMI_PASSWORD</code> in{' '}
            <code className="font-mono text-xs">.env.local</code> on the server. Until then this
            panel shows nothing rather than zeroes, which would read as a traffic collapse.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={card}>
              <Activity size={20} className="text-accent" />
              <p className="mt-3 text-3xl font-bold text-text-primary">
                {traffic?.visitors ?? '—'}
              </p>
              <p className="text-sm text-text-muted">Visitors</p>
            </div>
            <div className={card}>
              <Activity size={20} className="text-accent" />
              <p className="mt-3 text-3xl font-bold text-text-primary">
                {traffic?.pageviews ?? '—'}
              </p>
              <p className="text-sm text-text-muted">Page views</p>
            </div>
            <div className={card}>
              <Clock size={20} className="text-accent" />
              <p className="mt-3 text-3xl font-bold text-text-primary">
                {duration(traffic?.avgSeconds ?? null)}
              </p>
              <p className="text-sm text-text-muted">Average visit</p>
            </div>
            <div className={card}>
              <Activity size={20} className="text-accent" />
              <p className="mt-3 text-3xl font-bold text-text-primary">
                {traffic?.bounceRate === null || traffic?.bounceRate === undefined
                  ? '—'
                  : `${traffic.bounceRate}%`}
              </p>
              <p className="text-sm text-text-muted">Left after one page</p>
            </div>
          </div>

          <div className={`mt-4 ${card}`}>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary">
              <Globe size={13} /> Where they came from
            </p>
            {traffic && traffic.countries.length === 0 ? (
              <p className="mt-3 text-sm text-text-muted">
                No visits recorded in this window yet.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {traffic?.countries.map((c) => (
                  <li key={c.code} className="text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-text-primary">
                        <span className="mr-2">{flag(c.code)}</span>
                        {countryName(c.code)}
                      </span>
                      <span className="font-mono text-xs text-text-muted">{c.visitors}</span>
                    </div>
                    {/* A bar makes the shape of the list readable without a chart library. */}
                    <div
                      className="mt-1 h-1 rounded-full bg-accent/40"
                      style={{
                        width: maxCountry ? `${Math.max(2, (c.visitors / maxCountry) * 100)}%` : '2%',
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {traffic && traffic.configured && !traffic.ok && (
            <p className="mt-3 text-sm text-text-muted">
              Umami did not answer: {traffic.error}
            </p>
          )}
        </>
      )}
    </>
  )
}
