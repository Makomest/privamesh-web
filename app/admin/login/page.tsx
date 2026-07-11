'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2 } from 'lucide-react'
import { Container } from '@/components/Container'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Wrong password.')
        setLoading(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <Container className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white/20 p-7 backdrop-blur-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-text-primary">Admin</h1>
        <p className="mt-1 text-sm text-text-muted">Sign in to manage news and the waitlist.</p>
        <form onSubmit={submit} className="mt-5">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-btn border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
          />
          {error && <p className="mt-2 text-xs text-negative">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </Container>
  )
}
