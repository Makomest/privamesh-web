#!/usr/bin/env node
/**
 * Send test copies of the waitlist emails so you can see how they look.
 *
 *   RESEND_API_KEY=re_xxx TO=makom693@gmail.com node scripts/test-email.mjs
 *
 * Optional: WAITLIST_FROM='PrivaMesh <hello@privamesh.org>' (needs a verified
 * domain in Resend). Without it, sends from onboarding@resend.dev — but Resend's
 * test sender can ONLY deliver to the email you signed up to Resend with.
 */

const KEY = process.env.RESEND_API_KEY
const TO = process.env.TO || 'makom693@gmail.com'
const FROM = process.env.WAITLIST_FROM || 'PrivaMesh <onboarding@resend.dev>'
const APP_URL = process.env.APP_STORE_URL || 'https://privamesh.org'
const SITE = 'https://privamesh.org'

if (!KEY) {
  console.error('Set RESEND_API_KEY=re_xxx')
  process.exit(1)
}

function shell({ eyebrow, heading, paras, cta }) {
  const body = paras
    .map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#5c6b64">${p}</p>`)
    .join('')
  const button = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px"><tr><td bgcolor="#00A896" style="border-radius:9px"><a href="${cta.url}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:#fff;text-decoration:none;border-radius:9px">${cta.label}</a></td></tr></table>`
    : ''
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f5f8f6">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f6"><tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
    <tr><td style="padding:4px 8px 20px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:10px"><img src="${SITE}/icon.png" width="34" height="34" alt="PrivaMesh" style="border-radius:50%;display:block"></td>
      <td style="font-size:19px;font-weight:700;color:#0c1a14;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">PrivaMesh</td>
    </tr></table></td></tr>
    <tr><td style="background:#fff;border:1px solid #e4e9e6;border-radius:16px;padding:32px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#00A896;font-weight:700">${eyebrow}</p>
      <h1 style="margin:0 0 16px;font-size:23px;line-height:1.2;font-weight:700;color:#0c1a14">${heading}</h1>
      ${body}${button}
      <p style="margin:8px 0 0;font-size:15px;line-height:1.65;color:#00A896;font-weight:600">Trust math, not companies.</p>
    </td></tr>
    <tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:#94a29b;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"><a href="${SITE}" style="color:#94a29b;text-decoration:none">privamesh.org</a> · Test email</td></tr>
  </table>
</td></tr></table></body></html>`
}

const emails = [
  {
    subject: '[TEST] You are on the PrivaMesh waitlist',
    html: shell({
      eyebrow: 'Coming soon',
      heading: "You're on the list.",
      paras: [
        'Thanks for joining the PrivaMesh waitlist. We&rsquo;ll email you the moment the app is live on the App Store.',
        'PrivaMesh is a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata.',
      ],
    }),
  },
  {
    subject: '[TEST] PrivaMesh is live on the App Store 🎉',
    html: shell({
      eyebrow: "It's here",
      heading: 'PrivaMesh is live.',
      paras: [
        'You joined the waitlist &mdash; thank you. PrivaMesh is now on the App Store: a serverless, end-to-end encrypted messenger on Solana.',
      ],
      cta: { label: 'Download PrivaMesh', url: APP_URL },
    }),
  },
]

for (const e of emails) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], subject: e.subject, html: e.html }),
  })
  console.log(`${e.subject} → HTTP ${res.status} ${res.ok ? 'sent' : await res.text()}`)
}
console.log(`Done. Check ${TO} (and Spam on first send).`)
