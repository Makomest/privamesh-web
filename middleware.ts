import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifySession } from '@/lib/admin'

/**
 * Gate /admin and /api/admin behind a signed admin session. The login page and
 * login API are always allowed.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isLogin = pathname === '/admin/login' || pathname === '/api/admin/login'
  const isProtected = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  if (!isProtected || isLogin) return NextResponse.next()

  if (await verifySession(req.cookies.get(ADMIN_COOKIE)?.value, process.env.ADMIN_PASSWORD)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
