'use client'

import { useEffect, useState } from 'react'

/**
 * Hands the invite to the app, and falls back to something a person can do.
 *
 * The order matters. The custom scheme is tried first because it works with no
 * server-side setup at all; a universal link needs the domain association file
 * and an app build that claims it, and neither helps someone who does not have
 * the app yet. If nothing takes the link, the card is right there to copy.
 */
export default function InviteClient({ payload }: { payload: string }) {
  const [copied, setCopied] = useState(false)
  const [tried, setTried] = useState(false)

  const appLink = `privamesh://add?c=${payload}`
  // The app expects standard base64 when a card is pasted; the path form is
  // base64url so it survives being part of a URL.
  const cardCode = payload.replace(/-/g, '+').replace(/_/g, '/')

  useEffect(() => {
    // Attempted once, on a timer rather than immediately: a redirect fired during
    // hydration is blocked by some browsers, and an invite that silently does
    // nothing is what this page exists to fix.
    const timer = window.setTimeout(() => {
      setTried(true)
      window.location.href = appLink
    }, 400)
    return () => window.clearTimeout(timer)
  }, [appLink])

  async function copy() {
    try {
      await navigator.clipboard.writeText(cardCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold">Someone sent you a PrivaMesh invite</h1>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        This link carries their public contact card - an address and a public key.
        It holds nothing secret, and this page does not send it anywhere.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={appLink}
          className="rounded-full bg-neutral-900 px-6 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          Open in PrivaMesh
        </a>

        <a
          href="/download"
          className="rounded-full border border-neutral-300 px-6 py-3 text-center text-sm font-semibold dark:border-neutral-700"
        >
          I do not have the app yet
        </a>
      </div>

      {tried && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold">Nothing happened?</h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Copy the card and paste it in the app: Add contact - Paste.
          </p>

          <textarea
            readOnly
            value={cardCode}
            rows={4}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-3 w-full resize-none rounded-xl border border-neutral-300 bg-transparent p-3 font-mono text-[11px] leading-relaxed dark:border-neutral-700"
          />

          <button
            type="button"
            onClick={copy}
            className="mt-3 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold dark:border-neutral-700"
          >
            {copied ? 'Copied' : 'Copy card'}
          </button>
        </div>
      )}
    </main>
  )
}
