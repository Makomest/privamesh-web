import type { Metadata } from 'next'

/**
 * The admin panel sits outside the site chrome: no navbar, no animated
 * background, and no analytics script - so it loads fast and its own page
 * views do not count as site traffic.
 */
export const metadata: Metadata = {
  title: 'Admin · PrivaMesh',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg-base text-text-muted">{children}</div>
}
