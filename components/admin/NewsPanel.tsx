'use client'

import { useEffect, useState } from 'react'
import { Loader2, RefreshCw, Trash2 } from 'lucide-react'
import { Card, card, n, timeAgo } from './ui'

type YtVideo = { id: string; title: string; url: string; published: string; views: number | null; short: boolean }
type YtState = {
  status: { fetchedAt: string | null; error?: string; count: number }
  latest: YtVideo[]
  result?: { ok: boolean; posted: string[]; error?: string }
}

/**
 * The YouTube mirror: the site checks the channel's feed every ten minutes by
 * itself and posts each new full-length video to /news. This shows when it
 * last looked and lets you make it look now.
 */
function YouTubeCard({ onPosted }: { onPosted: () => void }) {
  const [state, setState] = useState<YtState | null>(null)
  const [checking, setChecking] = useState(false)
  const now = Date.now()

  useEffect(() => {
    fetch('/api/admin/youtube', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setState)
      .catch(() => {})
  }, [])

  async function check() {
    setChecking(true)
    try {
      const r = (await (await fetch('/api/admin/youtube', { method: 'POST' })).json()) as YtState
      setState(r)
      if (r.result?.posted.length) onPosted()
    } finally {
      setChecking(false)
    }
  }

  return (
    <Card
      title="YouTube"
      aside={
        state?.status.fetchedAt ? `checked ${timeAgo(state.status.fetchedAt, now)} · every 10 min` : 'every 10 min'
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-muted">
          New videos from{' '}
          <a href="https://www.youtube.com/@privameshhq" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:underline">
            @privameshhq
          </a>{' '}
          are posted here automatically. Shorts go to /videos only.
        </p>
        <button
          onClick={check}
          disabled={checking}
          className="inline-flex items-center gap-2 rounded-btn border border-border-hover px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary disabled:opacity-60"
        >
          <RefreshCw size={14} className={checking ? 'animate-spin' : ''} /> Check now
        </button>
      </div>
      {state?.result && (
        <p className="mt-3 text-sm text-text-secondary">
          {state.result.ok
            ? state.result.posted.length
              ? `Posted ${state.result.posted.length} new video(s).`
              : 'Up to date - nothing new.'
            : `Could not reach YouTube: ${state.result.error}`}
        </p>
      )}
      {state?.status.error && !state.result && (
        <p className="mt-3 text-sm text-negative">Last check failed: {state.status.error}</p>
      )}
      {state && state.latest.length > 0 && (
        <ul className="mt-4 divide-y divide-border">
          {state.latest.map((v) => (
            <li key={v.id} className="flex items-center gap-3 py-2 text-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" className="h-9 w-16 flex-none rounded object-cover" />
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-text-primary hover:underline">
                {v.title}
              </a>
              <span className="flex-none font-mono text-xs text-text-faint">
                {v.short ? 'short · ' : ''}
                {v.views !== null ? `${n(v.views)} views · ` : ''}
                {timeAgo(v.published, now)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export type Update = { id: string; type: string; title: string; body: string; date: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function NewsPanel({ updates, reload }: { updates: Update[] | null; reload: () => void }) {
  const [type, setType] = useState('news')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  async function post(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setPosting(true)
    setError('')
    const res = await fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, title, body }),
    })
    setPosting(false)
    if (res.ok) {
      setTitle('')
      setBody('')
      reload()
    } else {
      setError('Could not publish. Try again.')
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/updates?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    reload()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-text-primary">News</h2>
      <YouTubeCard onPosted={reload} />
      <form onSubmit={post} className={card}>
        <div className="flex flex-wrap gap-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-btn border border-border bg-bg-base px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
          >
            <option value="news">News</option>
            <option value="update">Update</option>
            <option value="release">Release</option>
          </select>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="min-w-0 flex-1 rounded-btn border border-border bg-bg-base px-4 py-2 text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write the update… (line breaks are kept)"
          rows={5}
          className="mt-3 w-full rounded-btn border border-border bg-bg-base px-4 py-3 text-sm leading-relaxed text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={posting}
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {posting ? <Loader2 size={16} className="animate-spin" /> : 'Publish'}
          </button>
          <p className="text-xs text-text-faint">Publishes instantly to /news.</p>
          {error && <p className="text-xs text-negative">{error}</p>}
        </div>
      </form>

      <Card title="Published" aside={updates ? `${updates.length} posts` : undefined}>
        {updates === null ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : updates.length === 0 ? (
          <p className="text-sm text-text-muted">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {updates.map((u) => (
              <li key={u.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    <span className="rounded-full border border-border-accent px-2 py-0.5 text-text-secondary">
                      {u.type}
                    </span>
                    <span>{fmt(u.date)}</span>
                  </div>
                  <h3 className="mt-1.5 font-semibold text-text-primary">{u.title}</h3>
                  <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-text-muted">{u.body}</p>
                </div>
                <button
                  onClick={() => remove(u.id)}
                  aria-label={`Delete ${u.title}`}
                  className="flex-none text-text-muted transition-colors hover:text-negative"
                >
                  <Trash2 size={17} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
