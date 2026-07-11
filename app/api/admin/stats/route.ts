import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { getUpdates } from '@/lib/updates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.

export async function GET() {
  const file = path.join(process.cwd(), 'data', 'waitlist.jsonl')
  let total = 0
  let last7 = 0
  let recent: { email: string; ts: string }[] = []

  try {
    if (fs.existsSync(file)) {
      const rows = fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .filter(Boolean)
        .map((l) => {
          try {
            return JSON.parse(l) as { email: string; ts: string }
          } catch {
            return null
          }
        })
        .filter(Boolean) as { email: string; ts: string }[]

      const uniq = new Map<string, { email: string; ts: string }>()
      for (const r of rows) if (r.email) uniq.set(r.email, r)
      const list = [...uniq.values()].sort((a, b) => +new Date(b.ts) - +new Date(a.ts))
      total = list.length
      const weekAgo = Date.now() - 7 * 864e5
      last7 = list.filter((r) => +new Date(r.ts) >= weekAgo).length
      recent = list.slice(0, 10)
    }
  } catch {
    // ignore
  }

  return NextResponse.json({
    ok: true,
    waitlist: { total, last7, recent },
    updates: getUpdates().length,
  })
}
