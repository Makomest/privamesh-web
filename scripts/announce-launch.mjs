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
const SITE = 'https://privamesh.org'
const html = () => `<!doctype html><html><body style="margin:0;padding:0;background:#f5f8f6">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f6"><tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
    <tr><td style="padding:4px 8px 20px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px"><img src="${SITE}/icon.png" width="34" height="34" alt="PrivaMesh" style="border-radius:50%;display:block"></td>
        <td style="font-size:19px;font-weight:700;color:#0c1a14;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">PrivaMesh</td>
      </tr></table>
    </td></tr>
    <tr><td style="background:#ffffff;border:1px solid #e4e9e6;border-radius:16px;padding:32px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#00A896;font-weight:700">It&rsquo;s here</p>
      <h1 style="margin:0 0 16px;font-size:23px;line-height:1.2;font-weight:700;color:#0c1a14">PrivaMesh is live.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#5c6b64">You joined the waitlist &mdash; thank you. PrivaMesh is now on the App Store: a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px"><tr><td bgcolor="#00A896" style="border-radius:9px">
        <a href="${APP_URL}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9px">Download PrivaMesh</a>
      </td></tr></table>
      <p style="margin:8px 0 0;font-size:15px;line-height:1.65;color:#00A896;font-weight:600">Trust math, not companies.</p>
    </td></tr>
    <tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:#94a29b;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <a href="${SITE}" style="color:#94a29b;text-decoration:none">privamesh.org</a> · You received this because you joined the waitlist.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`

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
