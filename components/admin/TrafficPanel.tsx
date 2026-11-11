'use client'

import type { Traffic, UmamiRange } from '@/lib/umami'
import { LOCALES } from '@/lib/i18n/locales'
import { BarChart } from './BarChart'
import { Card, LOCALE, RankList, Skeleton, StatTile, browserName, capital, countryName, delta, duration, flag, languageName, n } from './ui'

const SITE = 'https://privamesh.org'

const RANGE_LABEL: Record<UmamiRange, string> = {
  '24h': '24 hours',
  '7d': '7 days',
  '30d': '30 days',
  '90d': '90 days',
}

const CHANNEL: Record<string, string> = {
  direct: 'Direct',
  organicSearch: 'Search',
  organicSocial: 'Social',
  paidSearch: 'Paid search',
  paidSocial: 'Paid social',
  referral: 'Other sites',
  email: 'Email',
  llm: 'AI assistants',
  video: 'Video',
  sms: 'SMS',
}

const localeName = new Map(LOCALES.map((l) => [l.code, `${l.english} (${l.code})`]))

function tick(label: string, unit: 'hour' | 'day', i: number, count: number) {
  const d = new Date(label.replace(' ', 'T'))
  if (unit === 'hour') {
    return i % 6 === 0 ? d.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' }) : undefined
  }
  const every = count <= 8 ? 1 : count <= 31 ? 5 : 15
  return i % every === 0 ? d.toLocaleDateString(LOCALE, { month: 'short', day: 'numeric' }) : undefined
}

function readout(label: string, unit: 'hour' | 'day') {
  const d = new Date(label.replace(' ', 'T'))
  return unit === 'hour'
    ? d.toLocaleString(LOCALE, { weekday: 'short', hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString(LOCALE, { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function TrafficPanel({
  traffic,
  range,
  onRange,
  loading,
}: {
  traffic: Traffic | null
  range: UmamiRange
  onRange: (r: UmamiRange) => void
  loading: boolean
}) {
  const t = traffic && traffic.range === range ? traffic : null
  const cur = t?.current
  const prev = t?.previous
  const avg = (x?: { totaltime: number; visits: number }) => (x && x.visits ? x.totaltime / x.visits : null)
  const bounce = (x?: { bounces: number; visits: number }) =>
    x && x.visits ? Math.round((x.bounces / x.visits) * 100) : null
  const perVisit = (x?: { pageviews: number; visits: number }) =>
    x && x.visits ? Math.round((x.pageviews / x.visits) * 10) / 10 : null

  const series = t?.series.map((b, i, all) => ({
    t: b.t,
    label: readout(b.t, t.unit),
    tick: tick(b.t, t.unit, i, all.length),
    primary: b.visitors,
    secondary: b.views,
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Traffic</h2>
        <div className="flex items-center gap-1.5">
          {loading && <span className="me-2 font-mono text-xs text-text-faint">updating…</span>}
          {(Object.keys(RANGE_LABEL) as UmamiRange[]).map((r) => (
            <button
              key={r}
              onClick={() => onRange(r)}
              className={`rounded-btn border px-3 py-1.5 text-xs transition-colors ${
                range === r
                  ? 'border-border-accent text-text-primary'
                  : 'border-border text-text-muted hover:text-text-secondary'
              }`}
            >
              {RANGE_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {traffic && !traffic.configured ? (
        <Card>
          <p className="text-sm text-text-muted">Umami is not connected.</p>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {cur && prev ? (
              <>
                <StatTile label="Visitors" value={n(cur.visitors)} change={delta(cur.visitors, prev.visitors)} />
                <StatTile label="Visits" value={n(cur.visits)} change={delta(cur.visits, prev.visits)} />
                <StatTile label="Page views" value={n(cur.pageviews)} change={delta(cur.pageviews, prev.pageviews)} />
                <StatTile
                  label="Pages per visit"
                  value={perVisit(cur) ?? '—'}
                  change={delta(perVisit(cur) ?? 0, perVisit(prev) ?? 0)}
                />
                <StatTile
                  label="Average visit"
                  value={duration(avg(cur))}
                  change={delta(avg(cur) ?? 0, avg(prev) ?? 0)}
                />
                <StatTile
                  label="Left after one page"
                  value={bounce(cur) === null ? '—' : `${bounce(cur)}%`}
                  change={delta(bounce(cur) ?? 0, bounce(prev) ?? 0)}
                  invert
                />
              </>
            ) : (
              Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-[118px] rounded-card" />)
            )}
          </div>

          <Card title={`Visitors per ${t?.unit ?? (range === '24h' ? 'hour' : 'day')}`} aside={RANGE_LABEL[range]}>
            {series ? (
              <BarChart data={series} primaryLabel="visitors" secondaryLabel="page views" height={200} />
            ) : (
              <Skeleton className="h-[220px]" />
            )}
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Top pages" aside="page views">
              <RankList rows={t?.pages.map((r) => ({ ...r, href: SITE + r.label }))} limit={12} />
            </Card>
            <Card title="Landing pages" aside="first page of a visit">
              <RankList rows={t?.entries.map((r) => ({ ...r, href: SITE + r.label }))} limit={12} />
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card title="Channels" aside="visits">
              <RankList
                rows={t?.channels.map((r) => ({ label: CHANNEL[r.label] ?? r.label, value: r.value }))}
                total={cur?.visits}
              />
            </Card>
            <Card title="Referrers" aside="visits">
              <RankList rows={t?.referrers} empty="No referrers - all direct." />
            </Card>
            <Card title="Site language" aside="page views">
              <RankList
                rows={t?.siteLocales.map((r) => ({ label: localeName.get(r.label) ?? r.label, value: r.value }))}
                total={cur?.pageviews}
              />
            </Card>
            <Card title="Countries" aside="visitors">
              <RankList
                rows={t?.countries.map((r) => ({ label: countryName(r.label), value: r.value, icon: flag(r.label) }))}
                total={cur?.visitors}
              />
            </Card>
            <Card title="Cities" aside="visitors">
              <RankList
                rows={t?.cities.map((r) => ({ label: r.label, value: r.value, icon: flag(r.country) }))}
              />
            </Card>
            <Card title="Browser language" aside="visitors">
              <RankList rows={t?.languages.map((r) => ({ label: languageName(r.label), value: r.value }))} />
            </Card>
            <Card title="Devices" aside="visitors">
              <RankList rows={t?.devices.map((r) => ({ ...r, label: capital(r.label) }))} total={cur?.visitors} />
            </Card>
            <Card title="Operating systems" aside="visitors">
              <RankList rows={t?.os} />
            </Card>
            <Card title="Browsers" aside="visitors">
              <RankList rows={t?.browsers.map((r) => ({ ...r, label: browserName(r.label) }))} />
            </Card>
          </div>

          {traffic && traffic.configured && !traffic.ok && traffic.error && (
            <p className="text-sm text-negative">Umami did not answer: {traffic.error}</p>
          )}
        </>
      )}
    </div>
  )
}
