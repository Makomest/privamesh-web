import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'pm_admin'

/** True when the request carries a valid admin session cookie. */
export function isAdmin(): boolean {
  const pass = process.env.ADMIN_PASSWORD
  if (!pass) return false
  return cookies().get(ADMIN_COOKIE)?.value === pass
}
