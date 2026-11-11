'use client'

import type { ReactNode } from 'react'

/** Shared pieces of the admin panel. Dark-only, like the site. */

export const card = 'rounded-card border border-border bg-bg-surface p-5'

export function Card({
  title,
  aside,
  children,
  className = '',
}: {
  title?: ReactNode
  aside?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`${card} ${className}`}>
      {(title || aside) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-secondary">{title}</h3>
          )}
          {aside && <div className="font-mono text-xs text-text-faint">{aside}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/[0.06] ${className}`} />
}

const numFmt = new Intl.NumberFormat('en-US')
export const n = (v: number | null | undefined) => (v === null || v === undefined ? '—' : numFmt.format(v))

/** 4210 -> "1h 10m", 95 -> "1m 35s". */
export function duration(s: number | null) {
  if (s === null || !Number.isFinite(s)) return '—'
  s = Math.round(s)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ${s % 60}s`
  return `${Math.floor(m / 60)}h ${m % 60}m`
}

export function timeAgo(iso: string, now: number) {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  return `${Math.floor(m / 60)}h ago`
}

/** ISO 3166-1 alpha-2 to its flag, by offsetting into the regional indicators. */
export function flag(code: string | null | undefined) {
  if (!code || !/^[A-Za-z]{2}$/.test(code)) return '🏳'
  return String.fromCodePoint(...code.toUpperCase().split('').map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

let regionNames: Intl.DisplayNames | null = null
let languageNames: Intl.DisplayNames | null = null

export function countryName(code: string | null | undefined) {
  if (!code) return 'Unknown'
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

export function languageName(code: string) {
  try {
    languageNames ??= new Intl.DisplayNames(['en'], { type: 'language' })
    return languageNames.of(code) ?? code
  } catch {
    return code
  }
}

const BROWSERS: Record<string, string> = {
  chrome: 'Chrome',
  crios: 'Chrome (iOS)',
  ios: 'Safari (iOS)',
  'ios-webview': 'iOS app webview',
  safari: 'Safari',
  firefox: 'Firefox',
  fxios: 'Firefox (iOS)',
  'edge-chromium': 'Edge',
  edge: 'Edge',
  opera: 'Opera',
  samsung: 'Samsung Internet',
  yandexbrowser: 'Yandex Browser',
  'chromium-webview': 'Android webview',
  facebook: 'Facebook app',
  instagram: 'Instagram app',
}
export const browserName = (b: string | null | undefined) => (b ? BROWSERS[b] ?? b : '')
export const capital = (s: string | null | undefined) => (s ? s[0].toUpperCase() + s.slice(1) : '')

/** The panel is in English; dates follow it rather than the browser's locale. */
export const LOCALE = 'en-GB'

/** Percent change with its sign, or null when there is no base to compare to. */
export function delta(cur: number, prev: number): number | null {
  if (!prev) return null
  return Math.round(((cur - prev) / prev) * 100)
}

/**
 * A headline number with its change against the previous period. The arrow and
 * sign carry the direction; colour only repeats it.
 */
export function StatTile({
  label,
  value,
  change,
  invert = false,
  hint,
}: {
  label: string
  value: ReactNode
  change?: number | null
  /** For figures where down is good, such as bounce rate. */
  invert?: boolean
  hint?: string
}) {
  const good = change != null && change !== 0 && (change > 0) !== invert
  return (
    <div className={card} title={hint}>
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-text-primary">{value}</p>
      <p className="mt-1 h-4 font-mono text-xs tabular-nums">
        {change === undefined ? null : change === null ? (
          <span className="text-text-faint">no earlier data</span>
        ) : (
          <span className={change === 0 ? 'text-text-faint' : good ? 'text-text-secondary' : 'text-negative'}>
            {change > 0 ? '▲' : change < 0 ? '▼' : '='} {change > 0 ? '+' : ''}
            {change}% <span className="text-text-faint">vs previous</span>
          </span>
        )}
      </p>
    </div>
  )
}

export type RankRow = { label: string; value: number; icon?: string; sub?: string; href?: string }

/** A ranked list with a magnitude bar under each row - one hue, longest first. */
export function RankList({
  rows,
  empty = 'Nothing yet.',
  limit = 10,
  total,
}: {
  rows: RankRow[] | undefined
  empty?: string
  limit?: number
  /** When given, each row also shows its share of this total. */
  total?: number
}) {
  if (!rows) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-5" />
        ))}
      </div>
    )
  }
  if (rows.length === 0) return <p className="text-sm text-text-muted">{empty}</p>
  const shown = rows.slice(0, limit)
  const max = Math.max(...shown.map((r) => r.value), 1)
  return (
    <ul className="space-y-2.5">
      {shown.map((r) => (
        <li key={r.label} className="text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-text-primary" title={r.label}>
              {r.icon && <span className="me-2">{r.icon}</span>}
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {r.label}
                </a>
              ) : (
                r.label
              )}
              {r.sub && <span className="ms-2 text-text-faint">{r.sub}</span>}
            </span>
            <span className="flex-none font-mono text-xs tabular-nums text-text-muted">
              {n(r.value)}
              {total ? <span className="ms-2 text-text-faint">{Math.round((r.value / total) * 100)}%</span> : null}
            </span>
          </div>
          <div className="mt-1 h-1 rounded-full bg-white/[0.06]">
            <div
              className="h-1 rounded-full bg-accent/60"
              style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
