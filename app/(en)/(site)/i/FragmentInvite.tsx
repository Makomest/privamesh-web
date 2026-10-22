'use client'

import { useEffect, useState } from 'react'
import InviteClient from './[payload]/InviteClient'

/** Reads the card from the fragment, which only the browser ever sees. */
export default function FragmentInvite() {
  const [payload, setPayload] = useState<string | null>(null)

  useEffect(() => {
    setPayload(window.location.hash.replace(/^#/, ''))
  }, [])

  if (payload === null) return null
  if (!payload) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
        <h1 className="text-2xl font-semibold">This invite link is incomplete</h1>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Ask the person who sent it for a new one.
        </p>
      </main>
    )
  }
  return <InviteClient payload={payload} />
}
