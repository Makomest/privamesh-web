#!/usr/bin/env node
/**
 * Launch blast — email everyone on the waitlist that PrivaMesh is live.
 *
 * Two ways to send a launch email:
 *
 *  A) Resend Broadcast (recommended, no script): in the Resend dashboard,
 *     Audiences → your audience → "Create Broadcast" → write the launch email
 *     → Send. Resend handles delivery + unsubscribes. This script is a fallback.
 *
 *  B) This script — reads data/waitlist.jsonl and sends via the Resend API in
 *     batches. Run it on the server:
 *
 *        RESEND_API_KEY=re_xxx \
 *        WAITLIST_FROM='PrivaMesh <hello@privamesh.org>' \
 *        APP_STORE_URL='https://apps.apple.com/app/idXXXXXXXX' \
 *        node scripts/announce-launch.mjs
 *
 *     Add  --dry  to preview the recipient count without sending.
 *
 * Free-tier note: Resend limits sends per day. For large lists, the Broadcast
 * (option A) or an upgraded plan is better; this script paces requests.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, '..', 'data', 'waitlist.jsonl')
const DRY = process.argv.includes('--dry')

const KEY = process.env.RESEND_API_KEY
const FROM = process.env.WAITLIST_FROM || 'PrivaMesh <onboarding@resend.dev>'
const APP_URL = process.env.APP_STORE_URL || 'https://privamesh.org'

if (!KEY && !DRY) {
  console.error('Set RESEND_API_KEY (or use --dry to preview).')
  process.exit(1)
}
if (!fs.existsSync(FILE)) {
  console.error(`No waitlist file at ${FILE}`)
  process.exit(1)
}

// Unique, valid emails from the JSONL file.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emails = [
  ...new Set(
    fs
      .readFileSync(FILE, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((l) => {
        try {
          return JSON.parse(l).email
        } catch {
          return null
        }
      })
      .filter((e) => e && EMAIL_RE.test(e)),
  ),
]

console.log(`${emails.length} unique recipients${DRY ? ' (dry run — nothing sent)' : ''}`)
if (DRY || emails.length === 0) process.exit(0)

const subject = 'PrivaMesh is live on the App Store 🎉'
const html = (to) => `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#0c1a14">
  <p style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#00a896;font-weight:600;margin:0 0 12px">PrivaMesh</p>
  <h1 style="font-size:22px;font-weight:700;margin:0 0 12px">It's here. PrivaMesh is live.</h1>
  <p style="font-size:15px;line-height:1.6;color:#5c6b64;margin:0 0 16px">You joined the waitlist — thank you. PrivaMesh is now on the App Store: a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata.</p>
  <p style="margin:0 0 20px"><a href="${APP_URL}" style="display:inline-block;background:#00a896;color:#fff;font-weight:600;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:9px">Download PrivaMesh</a></p>
  <p style="font-size:15px;line-height:1.6;color:#5c6b64;margin:0 0 16px"><strong>Trust math, not companies.</strong></p>
  <p style="font-size:12px;color:#94a29b;margin:20px 0 0">privamesh.org · You received this because you joined the waitlist.</p>
</div>`

let sent = 0
for (const to of emails) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [to], subject, html: html(to) }),
  })
  if (res.ok) sent++
  else console.error(`Failed ${to}: HTTP ${res.status} ${await res.text()}`)
  await new Promise((r) => setTimeout(r, 600)) // pace ~1.6/s to respect rate limits
}

console.log(`Done. Sent ${sent}/${emails.length}.`)
