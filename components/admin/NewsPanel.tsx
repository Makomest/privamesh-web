'use client'

import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { Card, card } from './ui'

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
