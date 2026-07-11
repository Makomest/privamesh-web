import { SITE } from './site'

const LOGO = `${SITE.domain}/icon.png`
const TEAL = '#00A896'
const INK = '#0c1a14'
const MUTED = '#5c6b64'
const FAINT = '#94a29b'
const BG = '#f5f8f6'
const CARD = '#ffffff'
const BORDER = '#e4e9e6'

/**
 * Branded, email-client-safe HTML shell (table layout, inline styles only).
 * `cta` is optional bulletproof button HTML.
 */
function shell({
  eyebrow,
  heading,
  paras,
  cta,
  footerNote,
}: {
  eyebrow: string
  heading: string
  paras: string[]
  cta?: { label: string; url: string }
  footerNote: string
}) {
  const body = paras
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${MUTED}">${p}</p>`,
    )
    .join('')

  const button = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px">
         <tr><td bgcolor="${TEAL}" style="border-radius:9px">
           <a href="${cta.url}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9px">${cta.label}</a>
         </td></tr>
       </table>`
    : ''

  return `<!doctype html><html><body style="margin:0;padding:0;background:${BG}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
      <tr><td style="padding:4px 8px 20px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:10px"><img src="${LOGO}" width="34" height="34" alt="PrivaMesh" style="border-radius:50%;display:block"></td>
          <td style="font-size:19px;font-weight:700;color:${INK};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">PrivaMesh</td>
        </tr></table>
      </td></tr>
      <tr><td style="background:${CARD};border:1px solid ${BORDER};border-radius:16px;padding:32px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${TEAL};font-weight:700">${eyebrow}</p>
        <h1 style="margin:0 0 16px;font-size:23px;line-height:1.2;font-weight:700;color:${INK}">${heading}</h1>
        ${body}
        ${button}
        <p style="margin:8px 0 0;font-size:15px;line-height:1.65;color:${TEAL};font-weight:600">Trust math, not companies.</p>
      </td></tr>
      <tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:${FAINT};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        <a href="${SITE.domain}" style="color:${FAINT};text-decoration:none">privamesh.org</a> · ${footerNote}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

export function waitlistConfirmationEmail() {
  return {
    subject: "You're on the PrivaMesh waitlist",
    html: shell({
      eyebrow: 'Coming soon',
      heading: "You're on the list.",
      paras: [
        'Thanks for joining the PrivaMesh waitlist. We&rsquo;ll email you the moment the app is live on the App Store &mdash; one message, no spam.',
        'PrivaMesh is a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata.',
      ],
      footerNote: 'You received this because you joined the waitlist.',
    }),
    text: "You're on the PrivaMesh waitlist. We'll email you the moment the app is live on the App Store. PrivaMesh is a serverless, end-to-end encrypted messenger on Solana. Trust math, not companies. — privamesh.org",
  }
}

export function launchEmail(appUrl: string) {
  return {
    subject: 'PrivaMesh is live on the App Store 🎉',
    html: shell({
      eyebrow: 'It&rsquo;s here',
      heading: 'PrivaMesh is live.',
      paras: [
        'You joined the waitlist &mdash; thank you. PrivaMesh is now on the App Store: a serverless, end-to-end encrypted messenger on Solana. No servers, no phone number, no metadata.',
      ],
      cta: { label: 'Download PrivaMesh', url: appUrl },
      footerNote: 'You received this because you joined the waitlist.',
    }),
    text: `PrivaMesh is live on the App Store. Download: ${appUrl}. Trust math, not companies. — privamesh.org`,
  }
}
