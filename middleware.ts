import { NextResponse, type NextRequest } from 'next/server'

const COOKIE = 'pm_admin'

/**
 * Gate /admin and /api/admin behind the admin session cookie. The login pages
 * and login API are always allowed. Cookie value must equal ADMIN_PASSWORD.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isLogin = pathname === '/admin/login' || pathname === '/api/admin/login'
  const isProtected = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  if (!isProtected || isLogin) return NextResponse.next()

  const ok = req.cookies.get(COOKIE)?.value && req.cookies.get(COOKIE)?.value === process.env.ADMIN_PASSWORD

  if (ok) return NextResponse.next()

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
