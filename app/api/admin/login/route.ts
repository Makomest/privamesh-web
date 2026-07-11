import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const pass = process.env.ADMIN_PASSWORD
  const user = process.env.ADMIN_USER // optional; if unset, only password is checked
  if (!pass) {
    return NextResponse.json({ ok: false, error: 'Admin not configured' }, { status: 500 })
  }
  let body: { username?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const passOk = body.password === pass
  const userOk = !user || body.username === user
  if (!passOk || !userOk) {
    return NextResponse.json({ ok: false, error: 'Wrong username or password' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, pass, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return res
}

/** Logout. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
