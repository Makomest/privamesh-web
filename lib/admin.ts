/**
 * Admin session tokens.
 *
 * The cookie used to hold ADMIN_PASSWORD itself, so anything that could read
 * the cookie could read the password. It now holds `<expiry>.<signature>`: an
 * HMAC-SHA256 of the expiry keyed by the password. The token expires on its
 * own, proves nothing about the password if it leaks, and every session ends
 * the moment the password changes.
 *
 * Web Crypto only, so the same code runs in the middleware (edge runtime) and
 * in the Node route handlers.
 */

export const ADMIN_COOKIE = 'pm_admin'
export const SESSION_SECONDS = 60 * 60 * 24 * 14

const enc = new TextEncoder()

function b64url(buf: ArrayBuffer): string {
  let s = ''
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(`pm-admin-session:${secret}`),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(message)))
}

/** Length-independent comparison, so a mismatch takes as long as a match. */
export function safeEqual(a: string, b: string): boolean {
  const x = enc.encode(a)
  const y = enc.encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

export async function createSession(secret: string): Promise<string> {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS)
  return `${exp}.${await sign(exp, secret)}`
}

export async function verifySession(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig || !/^\d+$/.test(exp)) return false
  if (Number(exp) < Date.now() / 1000) return false
  return safeEqual(sig, await sign(exp, secret))
}
