'use client'

import type { DownloadTotals } from '@/lib/downloads'
import { Card, RankList, Skeleton, StatTile, n, timeAgo } from './ui'

export default function DownloadsPanel({ downloads, now }: { downloads: DownloadTotals | null; now: number }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Downloads</h2>
        <span className="font-mono text-xs text-text-faint">
          counted by GitHub, all time{downloads ? ` · checked ${timeAgo(downloads.fetchedAt, now)}` : ''}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {downloads ? (
          <>
            <StatTile label="Android APK" value={n(downloads.android)} />
            <StatTile label="Windows" value={n(downloads.windows)} />
            <StatTile
              label="Android + Windows"
              value={n((downloads.android ?? 0) + (downloads.windows ?? 0))}
              hint="iPhone installs are reported by App Store Connect, not to this site."
            />
          </>
        ) : (
          Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-[118px] rounded-card" />)
        )}
      </div>
      <Card title="Per file" aside="iPhone installs live in App Store Connect">
        <RankList
          rows={downloads?.assets
            .filter((a) => a.platform !== 'other')
            .map((a) => ({ label: a.name, value: a.count, sub: a.tag }))}
          empty="No release files yet."
        />
      </Card>
      {downloads && !downloads.ok && (
        <p className="text-sm text-text-muted">
          GitHub did not answer, so these are the last numbers that arrived. {downloads.error}
        </p>
      )}
    </div>
  )
}
