'use client'

import type { Live } from '@/lib/umami'
import { BarChart } from './BarChart'
import { Card, LOCALE, RankList, Skeleton, browserName, capital, countryName, duration, flag, n, timeAgo } from './ui'

const SITE = 'https://privamesh.org'

function device(v: { device: string | null; os?: string | null; browser?: string | null }) {
  return [capital(v.device), v.os, browserName(v.browser)].filter(Boolean).join(' · ') || '—'
}

export default function LivePanel({ live, now }: { live: Live | null; now: number }) {
  if (live && !live.configured) {
    return (
      <Card title="Live">
        <p className="text-sm text-text-muted">
          Umami is not connected. Set UMAMI_URL, UMAMI_WEBSITE_ID, UMAMI_USERNAME and UMAMI_PASSWORD in
          .env.local on the server.
        </p>
      </Card>
    )
  }

  const minutes = live?.minutes.map((m, i, all) => ({
    t: m.t,
    label: `${new Date(m.t).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' })}`,
    tick: i === 0 ? '30 min ago' : i === all.length - 1 ? 'now' : undefined,
    primary: m.views,
    secondary: m.visitors,
  }))

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
        <section className="rounded-card border border-border-accent bg-bg-surface p-5">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            On the site now
          </p>
          {live ? (
            <p className="mt-3 text-6xl font-bold tabular-nums tracking-tight text-text-primary">{n(live.active)}</p>
          ) : (
            <Skeleton className="mt-3 h-14 w-20" />
          )}
          <p className="mt-1 text-sm text-text-muted">active in the last 5 minutes</p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
            <div>
              <p className="text-xl font-semibold tabular-nums text-text-primary">{n(live?.totals.visitors)}</p>
              <p className="text-xs text-text-muted">visitors, 30 min</p>
            </div>
            <div>
              <p className="text-xl font-semibold tabular-nums text-text-primary">{n(live?.totals.views)}</p>
              <p className="text-xs text-text-muted">page views, 30 min</p>
            </div>
          </div>
        </section>

        <Card title="Page views per minute" aside="last 30 minutes">
          {minutes ? (
            <BarChart data={minutes} primaryLabel="page views" secondaryLabel="visitors" height={150} />
          ) : (
            <Skeleton className="h-[150px]" />
          )}
        </Card>
      </div>

      <Card title="Who is here right now" aside={live ? `${live.visitors.length} in the last 5 min` : undefined}>
        {!live ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-9" />
            ))}
          </div>
        ) : live.visitors.length === 0 ? (
          <p className="text-sm text-text-muted">Nobody on the site at the moment.</p>
        ) : (
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-start font-mono text-[11px] uppercase tracking-wider text-text-faint">
                  <th className="px-5 py-2 text-start font-normal">Visitor</th>
                  <th className="px-3 py-2 text-start font-normal">Viewing</th>
                  <th className="px-3 py-2 text-start font-normal">Device</th>
                  <th className="px-3 py-2 text-start font-normal">Came from</th>
                  <th className="px-3 py-2 text-end font-normal">Pages</th>
                  <th className="px-3 py-2 text-end font-normal">On site</th>
                  <th className="px-5 py-2 text-end font-normal">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {live.visitors.map((v) => (
                  <tr key={v.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-2.5 whitespace-nowrap text-text-primary">
                      <span className="me-2">{flag(v.country)}</span>
                      {countryName(v.country)}
                      <span className="ms-2 font-mono text-[11px] text-text-faint">#{v.id}</span>
                    </td>
                    <td className="max-w-[260px] truncate px-3 py-2.5">
                      <a
                        href={SITE + v.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-text-secondary hover:underline"
                      >
                        {v.path}
                      </a>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-text-muted">{device(v)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-text-muted">{v.referrer ?? 'direct'}</td>
                    <td className="px-3 py-2.5 text-end font-mono text-xs tabular-nums text-text-muted">{v.views}</td>
                    <td className="px-3 py-2.5 text-end font-mono text-xs tabular-nums text-text-muted">
                      {duration((Date.parse(v.lastSeen) - Date.parse(v.firstSeen)) / 1000)}
                    </td>
                    <td className="px-5 py-2.5 text-end font-mono text-xs tabular-nums text-text-faint">
                      {timeAgo(v.lastSeen, now)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Pages open now">
          <RankList
            rows={live?.pagesNow.map((r) => ({ ...r, href: SITE + r.label }))}
            empty="No open pages."
            limit={8}
          />
        </Card>
        <Card title="Countries" aside="30 min">
          <RankList
            rows={live?.countries.map((r) => ({ label: countryName(r.label), value: r.value, icon: flag(r.label) }))}
            empty="No visits in 30 minutes."
            limit={8}
          />
        </Card>
        <Card title="Referrers" aside="30 min">
          <RankList rows={live?.referrers} empty="All direct or none." limit={8} />
        </Card>
      </div>

      <Card title="Activity" aside="newest first, 30 min">
        {!live ? (
          <Skeleton className="h-24" />
        ) : live.feed.length === 0 ? (
          <p className="text-sm text-text-muted">No page views in the last 30 minutes.</p>
        ) : (
          <ul className="max-h-80 space-y-1.5 overflow-y-auto pe-1 text-sm">
            {live.feed.map((e, i) => (
              <li key={e.at + i} className="flex items-baseline gap-3">
                <span className="w-16 flex-none font-mono text-xs tabular-nums text-text-faint">
                  {timeAgo(e.at, now)}
                </span>
                <span className="flex-none">{flag(e.country)}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-text-secondary">{e.path}</span>
                <span className="hidden flex-none text-xs text-text-faint sm:inline">
                  {capital(e.device)}
                  {e.referrer ? ` · from ${e.referrer}` : ''}
                </span>
                <span className="flex-none font-mono text-[11px] text-text-faint">#{e.id}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {live && !live.ok && live.error && (
        <p className="text-sm text-negative">Umami did not answer: {live.error}</p>
      )}
    </div>
  )
}
