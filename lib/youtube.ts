import fs from 'node:fs'
import path from 'node:path'
import { SITE } from './site'
import { addUpdate, getUpdates } from './updates'

/**
 * The PrivaMesh YouTube channel, mirrored onto the site.
 *
 * Source is the channel's public RSS feed: no API key, no quota, nothing to
 * rotate. It carries the 15 newest uploads, so every video seen is kept in
 * data/youtube.json and the list on the site grows past what the feed shows.
 *
 * syncYoutube() runs inside the site process every few minutes (see
 * instrumentation.ts) and can be triggered from the admin panel. Each new
 * full-length video becomes a post on /news; Shorts appear on /videos only.
 */

export type Video = {
  id: string
  title: string
  url: string
  description: string
  published: string
  updated: string
  views: number | null
  short: boolean
}

type Store = {
  fetchedAt: string | null
  error?: string
  videos: Video[]
  /** Video ids that already have a news post, or were deliberately skipped. */
  announced: string[]
}

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${SITE.youtubeChannelId}`
const FILE = path.join(process.cwd(), 'data', 'youtube.json')

/**
 * On the very first sync, videos older than this are recorded as already
 * announced, so connecting the channel does not flood /news with its back
 * catalogue - only recent uploads get a post.
 */
const BACKFILL_MS = 14 * 864e5

export const thumb = (id: string, size: 'mq' | 'hq' | 'maxres' = 'mq') =>
  `https://i.ytimg.com/vi/${id}/${size}default.jpg`

function read(): Store | null {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8')) as Store
  } catch {
    return null
  }
}

function write(store: Store) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  const tmp = `${FILE}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2))
  fs.renameSync(tmp, FILE)
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }
function decode(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e: string) =>
    e[0] === '#'
      ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
      : ENTITIES[e] ?? m,
  )
}

function tag(xml: string, name: string): string | null {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))
  return m ? decode(m[1].trim()) : null
}

function attr(xml: string, name: string, attribute: string): string | null {
  const m = xml.match(new RegExp(`<${name}\\s[^>]*${attribute}="([^"]*)"`))
  return m ? decode(m[1]) : null
}

/** The feed is a small, fixed Atom document; a parser dependency would be heavier than the job. */
export function parseFeed(xml: string): Video[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, e]) => {
      const id = tag(e, 'yt:videoId')
      const url = attr(e, 'link', 'href') ?? ''
      const views = attr(e, 'media:statistics', 'views')
      if (!id) return null
      return {
        id,
        title: tag(e, 'title') ?? '',
        url: url || `https://www.youtube.com/watch?v=${id}`,
        description: tag(e, 'media:description') ?? '',
        published: tag(e, 'published') ?? '',
        updated: tag(e, 'updated') ?? '',
        views: views === null ? null : Number(views),
        short: url.includes('/shorts/'),
      } satisfies Video
    })
    .filter((v): v is Video => v !== null)
}

/** Newest first, from what has been stored. Never touches the network. */
export function getVideos(): Video[] {
  return (read()?.videos ?? []).slice().sort((a, b) => +new Date(b.published) - +new Date(a.published))
}

export function youtubeStatus() {
  const s = read()
  return { fetchedAt: s?.fetchedAt ?? null, error: s?.error, count: s?.videos.length ?? 0 }
}

/**
 * The opening of a description - the part before chapter timestamps, hashtags
 * and credits - which is the bit that reads as a summary.
 */
export function summary(description: string, max = 600): string {
  const paras = description.split(/\n\s*\n/).map((p) => p.trim())
  const keep: string[] = []
  for (const p of paras) {
    if (!p || /^\d{1,2}:\d{2}/.test(p) || p.startsWith('#')) break
    keep.push(p)
    if (keep.join('\n\n').length > max) break
  }
  const text = keep.join('\n\n')
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text
}

let running: Promise<SyncResult> | null = null

export type SyncResult = { ok: boolean; videos: number; posted: string[]; error?: string }

export function syncYoutube(): Promise<SyncResult> {
  running ??= doSync().finally(() => {
    running = null
  })
  return running
}

async function doSync(): Promise<SyncResult> {
  const prev = read()
  try {
    const res = await fetch(FEED, { cache: 'no-store', signal: AbortSignal.timeout(10_000) })
    if (!res.ok) throw new Error(`YouTube feed returned HTTP ${res.status}`)
    const fresh = parseFeed(await res.text())

    // Merge: the feed only holds the newest 15, so keep everything seen before.
    const byId = new Map((prev?.videos ?? []).map((v) => [v.id, v]))
    for (const v of fresh) byId.set(v.id, v)
    const videos = [...byId.values()].sort((a, b) => +new Date(b.published) - +new Date(a.published))

    const announced = new Set(prev?.announced ?? [])
    // Never post twice, even if the announced list were lost: a news post that
    // already links the video counts.
    for (const u of getUpdates()) if (u.video) announced.add(u.video.id)

    const firstRun = !prev
    const posted: string[] = []
    for (const v of [...videos].reverse()) {
      if (announced.has(v.id)) continue
      announced.add(v.id)
      if (v.short) continue
      if (firstRun && Date.now() - Date.parse(v.published) > BACKFILL_MS) continue
      addUpdate({
        type: 'video',
        title: v.title,
        body: summary(v.description),
        date: v.published,
        video: { id: v.id, url: v.url },
      })
      posted.push(v.id)
    }

    write({ fetchedAt: new Date().toISOString(), videos, announced: [...announced] })
    return { ok: true, videos: videos.length, posted }
  } catch (e) {
    const error = String(e instanceof Error ? e.message : e)
    if (prev) write({ ...prev, error })
    return { ok: false, videos: prev?.videos.length ?? 0, posted: [], error }
  }
}
