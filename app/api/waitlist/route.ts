import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { waitlistConfirmationEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Waitlist signup. On each valid email:
 *   1. append to data/waitlist.jsonl (gitignored — repo is public)
 *   2. add to a Resend Audience (RESEND_AUDIENCE_ID) for a launch Broadcast
 *   3. send a confirmation email via Resend (RESEND_API_KEY)
 * All three are best-effort; the signup succeeds even if email/audience fail.
 *
 * At launch: send one Broadcast to the audience from the Resend dashboard, or
 * run  node scripts/announce-launch.mjs  to blast the file-based list.
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

  const resendKey = process.env.RESEND_API_KEY

  // 2) Add the email to a Resend Audience (a managed contact list) so you can
  //    later send ONE Broadcast to everyone at launch. Set RESEND_AUDIENCE_ID.
  if (resendKey && process.env.RESEND_AUDIENCE_ID) {
    try {
      await fetch(
        `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, unsubscribed: false }),
        },
      )
    } catch {
      // non-fatal
    }
  }

  // 3) Confirmation email via Resend (set RESEND_API_KEY + WAITLIST_FROM).
  if (resendKey) {
    const from = process.env.WAITLIST_FROM || 'PrivaMesh <onboarding@resend.dev>'
    const mail = waitlistConfirmationEmail()
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [email], ...mail }),
      })
    } catch {
      // non-fatal — signup still succeeded
    }
  }

  return NextResponse.json({ ok: true })
}
