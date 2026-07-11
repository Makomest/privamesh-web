'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Newspaper, Trash2, Loader2, LogOut } from 'lucide-react'

type Stats = {
  waitlist: { total: number; last7: number; recent: { email: string; ts: string }[] }
  updates: number
}
type Update = { id: string; type: string; title: string; body: string; date: string }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [updates, setUpdates] = useState<Update[]>([])
  const [type, setType] = useState('news')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)

  async function load() {
    const [s, u] = await Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()),
      fetch('/api/admin/updates').then((r) => r.json()),
    ])
    if (s.ok) setStats(s)
    if (u.ok) setUpdates(u.updates)
  }
  useEffect(() => {
    load()
  }, [])

  async function post(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setPosting(true)
    const res = await fetch('/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, title, body }),
    })
    setPosting(false)
    if (res.ok) {
      setTitle('')
      setBody('')
      load()
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/updates?id=${id}`, { method: 'DELETE' })
    load()
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  const card = 'rounded-card border border-border bg-white/20 p-5 backdrop-blur-sm'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Admin</h1>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border-hover px-3 py-2 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <LogOut size={15} /> Log out
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className={card}>
          <Users size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">{stats?.waitlist.total ?? '—'}</p>
          <p className="text-sm text-text-muted">Waitlist signups</p>
        </div>
        <div className={card}>
          <Users size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">{stats?.waitlist.last7 ?? '—'}</p>
          <p className="text-sm text-text-muted">New this week</p>
        </div>
        <div className={card}>
          <Newspaper size={20} className="text-accent" />
          <p className="mt-3 text-3xl font-bold text-text-primary">{stats?.updates ?? '—'}</p>
          <p className="text-sm text-text-muted">Published posts</p>
        </div>
      </div>

      {/* Recent signups */}
      {stats && stats.waitlist.recent.length > 0 && (
        <div className={`mt-4 ${card}`}>
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Recent signups
          </p>
          <ul className="mt-3 space-y-1.5">
            {stats.waitlist.recent.map((r) => (
              <li key={r.email + r.ts} className="flex justify-between text-sm">
                <span className="text-text-primary">{r.email}</span>
                <span className="font-mono text-xs text-text-muted">{fmt(r.ts)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Post form */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Post news / update</h2>
        <form onSubmit={post} className={`mt-4 ${card}`}>
          <div className="flex flex-wrap gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-btn border border-border bg-bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
            >
              <option value="news">News</option>
              <option value="update">Update</option>
              <option value="release">Release</option>
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="flex-1 rounded-btn border border-border bg-bg-surface px-4 py-2 text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
            />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the update… (line breaks are kept)"
            rows={5}
            className="mt-3 w-full rounded-btn border border-border bg-bg-surface px-4 py-3 text-sm leading-relaxed text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
          />
          <button
            type="submit"
            disabled={posting}
            className="mt-3 inline-flex items-center gap-2 rounded-btn bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {posting ? <Loader2 size={16} className="animate-spin" /> : 'Publish'}
          </button>
          <p className="mt-2 text-xs text-text-faint">Publishes instantly to /news.</p>
        </form>
      </div>

      {/* Manage posts */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Published posts</h2>
        <div className="mt-4 space-y-3">
          {updates.length === 0 && <p className="text-sm text-text-muted">No posts yet.</p>}
          {updates.map((u) => (
            <div key={u.id} className={`flex items-start justify-between gap-4 ${card}`}>
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                  <span className="rounded-full border border-border-accent px-2 py-0.5 text-accent">
                    {u.type}
                  </span>
                  <span>{fmt(u.date)}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-text-primary">{u.title}</h3>
                <p className="mt-1 whitespace-pre-line text-sm text-text-muted">{u.body}</p>
              </div>
              <button
                onClick={() => remove(u.id)}
                aria-label="Delete"
                className="flex-none text-text-muted transition-colors hover:text-negative"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
