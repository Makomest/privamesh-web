import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, SESSION_SECONDS, createSession, safeEqual } from '@/lib/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Failed attempts per client IP. One process serves the site, so memory is
 * enough; a restart forgiving a few attempts costs nothing.
 */
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 8
const failures = new Map<string, { count: number; since: number }>()

/** The address Caddy saw. It appends it last, so earlier entries are whatever the client sent. */
function clientIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',').pop()?.trim() || 'local'
}

export async function POST(req: Request) {
  const pass = process.env.ADMIN_PASSWORD
  const user = process.env.ADMIN_USER // optional; if unset, only password is checked
  if (!pass) {
    return NextResponse.json({ ok: false, error: 'Admin not configured' }, { status: 500 })
  }

  const ip = clientIp(req)
  const f = failures.get(ip)
  if (f && Date.now() - f.since < WINDOW_MS && f.count >= MAX_FAILURES) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 },
    )
  }

  let body: { username?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const passOk = safeEqual(String(body.password ?? ''), pass)
  const userOk = !user || safeEqual(String(body.username ?? ''), user)
  if (!passOk || !userOk) {
    const fresh = !f || Date.now() - f.since >= WINDOW_MS
    failures.set(ip, { count: fresh ? 1 : f.count + 1, since: fresh ? Date.now() : f.since })
    return NextResponse.json({ ok: false, error: 'Wrong username or password' }, { status: 401 })
  }

  failures.delete(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, await createSession(pass), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  })
  return res
}

/** Logout. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
