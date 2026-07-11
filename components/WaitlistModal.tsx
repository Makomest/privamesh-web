'use client'

import { useEffect, useState } from 'react'
import { X, Check, Loader2 } from 'lucide-react'

type State = 'idle' | 'loading' | 'done' | 'error'

/**
 * Waitlist modal. Mounted once in the root layout; opens when any
 * "Get PrivaMesh" button dispatches the `privamesh:open-waitlist` event.
 */
export default function WaitlistModal() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const onOpen = () => {
      setOpen(true)
      setState('idle')
      setError('')
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('privamesh:open-waitlist', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('privamesh:open-waitlist', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.')
      return
    }
    setState('loading')
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, ref: window.location.pathname }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Join the PrivaMesh waitlist"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-bg-base p-7 shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-text-muted transition-colors hover:text-text-primary"
        >
          <X size={20} />
        </button>

        {state === 'done' ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={24} strokeWidth={2.5} />
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-text-primary">
              You&rsquo;re on the list
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              We&rsquo;ll email you the moment PrivaMesh is live on the App Store. No spam, no
              sharing — just one message.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-btn bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">Coming soon</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-text-primary">
              Join the PrivaMesh waitlist
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              PrivaMesh launches on the App Store soon. Drop your email and we&rsquo;ll tell you the
              day it goes live.
            </p>
            <form onSubmit={submit} className="mt-5">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-btn border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-accent"
              />
              {error && <p className="mt-2 text-xs text-negative">{error}</p>}
              <button
                type="submit"
                disabled={state === 'loading'}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-btn bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {state === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Joining…
                  </>
                ) : (
                  'Notify me at launch'
                )}
              </button>
            </form>
            <p className="mt-3 text-center text-[11px] text-text-faint">
              We store only your email, and only to notify you at launch.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
