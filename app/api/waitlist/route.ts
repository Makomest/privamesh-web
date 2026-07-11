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

  // 3) Optional confirmation email via Resend (set RESEND_API_KEY + WAITLIST_FROM).
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const from = process.env.WAITLIST_FROM || 'PrivaMesh <onboarding@resend.dev>'
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject: "You're on the PrivaMesh waitlist",
          html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#0c1a14">
  <p style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#00a896;font-weight:600;margin:0 0 12px">PrivaMesh</p>
  <h1 style="font-size:22px;font-weight:700;margin:0 0 12px">You're on the list.</h1>
  <p style="font-size:15px;line-height:1.6;color:#5c6b64;margin:0 0 16px">Thanks for joining the PrivaMesh waitlist. We'll email you the moment the app is live on the App Store — one message, no spam.</p>
  <p style="font-size:15px;line-height:1.6;color:#5c6b64;margin:0 0 16px">PrivaMesh is a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata. <strong>Trust math, not companies.</strong></p>
  <p style="font-size:13px;color:#94a29b;margin:20px 0 0">privamesh.org</p>
</div>`,
          text: "You're on the PrivaMesh waitlist. We'll email you the moment the app is live on the App Store. Trust math, not companies. — privamesh.org",
        }),
      })
    } catch {
      // non-fatal — signup still succeeded
    }
  }

  return NextResponse.json({ ok: true })
}
