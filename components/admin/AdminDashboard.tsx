'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, LogOut } from 'lucide-react'
import type { Live, Traffic, UmamiRange } from '@/lib/umami'
import type { DownloadTotals } from '@/lib/downloads'
import LivePanel from './LivePanel'
import TrafficPanel from './TrafficPanel'
import DownloadsPanel from './DownloadsPanel'
import NewsPanel, { type Update } from './NewsPanel'
import { n } from './ui'

const TABS = [
  { id: 'live', label: 'Live' },
  { id: 'traffic', label: 'Traffic' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'news', label: 'News' },
] as const
type Tab = (typeof TABS)[number]['id']

const LIVE_EVERY_MS = 5000
const TRAFFIC_EVERY_MS = 60_000
const DOWNLOADS_EVERY_MS = 5 * 60_000

/** fetch().json() that sends a 401 back to the login page instead of rendering an error. */
async function get<T>(url: string, onUnauthorized: () => void): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (res.status === 401) {
      onUnauthorized()
      return null
    }
    return (await res.json()) as T
  } catch {
    return null
  }
}

/**
 * Run `fn` now, then every `ms` while the browser tab is visible, catching up
 * when it becomes visible again. The first run never waits on visibility, so a
 * panel opened in a background tab is filled in when you switch to it. A change
 * of `key` restarts the cycle immediately.
 */
function usePoll(fn: () => void, ms: number, key?: string) {
  const saved = useRef(fn)
  saved.current = fn
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null
    const start = () => {
      if (!timer) timer = setInterval(() => saved.current(), ms)
    }
    const stop = () => {
      if (timer) clearInterval(timer)
      timer = null
    }
    const onVis = () => {
      if (document.visibilityState === 'hidden') return stop()
      saved.current()
      start()
    }
    saved.current()
    if (document.visibilityState !== 'hidden') start()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ms, key])
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('live')
  const [now, setNow] = useState(() => Date.now())
  const [live, setLive] = useState<Live | null>(null)
  const [traffic, setTraffic] = useState<Traffic | null>(null)
  const [trafficLoading, setTrafficLoading] = useState(false)
  const [range, setRange] = useState<UmamiRange>('7d')
  const [downloads, setDownloads] = useState<DownloadTotals | null>(null)
  const [updates, setUpdates] = useState<Update[] | null>(null)

  const toLogin = useCallback(() => {
    router.replace('/admin/login')
  }, [router])

  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as Tab
    if (TABS.some((t) => t.id === fromHash)) setTab(fromHash)
  }, [])

  function choose(t: Tab) {
    setTab(t)
    history.replaceState(null, '', `#${t}`)
  }

  const loadLive = useCallback(async () => {
    const r = await get<{ live: Live }>('/api/admin/live', toLogin)
    if (r?.live) setLive(r.live)
    setNow(Date.now())
  }, [toLogin])

  const loadTraffic = useCallback(async () => {
    setTrafficLoading(true)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const r = await get<{ traffic: Traffic }>(
      `/api/admin/stats?range=${range}&tz=${encodeURIComponent(tz)}`,
      toLogin,
    )
    if (r?.traffic) setTraffic(r.traffic)
    setTrafficLoading(false)
  }, [range, toLogin])

  const loadDownloads = useCallback(async () => {
    const r = await get<{ downloads: DownloadTotals }>('/api/admin/downloads', toLogin)
    if (r?.downloads) setDownloads(r.downloads)
  }, [toLogin])

  const loadUpdates = useCallback(async () => {
    const r = await get<{ updates: Update[] }>('/api/admin/updates', toLogin)
    if (r?.updates) setUpdates(r.updates)
  }, [toLogin])

  usePoll(loadLive, LIVE_EVERY_MS)
  usePoll(loadTraffic, TRAFFIC_EVERY_MS, range)
  usePoll(loadDownloads, DOWNLOADS_EVERY_MS)
  useEffect(() => {
    loadUpdates()
  }, [loadUpdates])

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.replace('/admin/login')
  }

  return (
    <div>
      <header className="sticky top-0 z-20 -mx-4 border-b border-border bg-bg-base/90 px-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-tight text-text-primary">PrivaMesh admin</span>
            <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {live ? n(live.active) : '…'} online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-btn px-3 py-2 text-sm text-text-muted hover:text-text-primary sm:inline-flex"
            >
              Site <ExternalLink size={14} />
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border-hover px-3 py-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
        <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => choose(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
              className={`border-b-2 px-3 pb-2.5 text-sm transition-colors ${
                tab === t.id
                  ? 'border-accent text-text-primary'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="py-8">
        {tab === 'live' && <LivePanel live={live} now={now} />}
        {tab === 'traffic' && (
          <TrafficPanel traffic={traffic} range={range} onRange={setRange} loading={trafficLoading} />
        )}
        {tab === 'downloads' && <DownloadsPanel downloads={downloads} now={now} />}
        {tab === 'news' && <NewsPanel updates={updates} reload={loadUpdates} />}
      </div>
    </div>
  )
}
