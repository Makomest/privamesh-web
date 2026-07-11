import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Waitlist signup. Stores emails in data/waitlist.jsonl (which is gitignored —
 * the repo is public, so emails must never be committed). Optionally forwards
 * each signup to WAITLIST_WEBHOOK_URL (e.g. an n8n webhook) for storage/notify.
 *
 * Read the list on the server with:  cat ~/privamesh/data/waitlist.jsonl
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const email = String(body.email ?? '').trim().toLowerCase()
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const record = {
    email,
    ref: String(body.ref ?? ''),
    ts: new Date().toISOString(),
    ua: req.headers.get('user-agent') ?? '',
  }

  // 1) Append to local file (gitignored, persistent on the self-hosted server).
  try {
    const dir = path.join(process.cwd(), 'data')
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, 'waitlist.jsonl')
    // Best-effort dedupe against exact duplicates already stored.
    let dup = false
    if (fs.existsSync(file)) {
      const existing = fs.readFileSync(file, 'utf8')
      dup = existing.includes(`"email":"${email}"`)
    }
    if (!dup) fs.appendFileSync(file, JSON.stringify(record) + '\n', 'utf8')
  } catch {
    // If disk write fails, still try the webhook below; don't hard-fail the user.
  }

  // 2) Optional forward to a webhook (n8n) for storage / notification.
  const hook = process.env.WAITLIST_WEBHOOK_URL
  if (hook) {
    try {
      await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json({ ok: true })
}
