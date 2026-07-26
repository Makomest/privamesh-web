import SiteShell from '@/components/SiteShell'

/**
 * Nested layout holding the site chrome. It sits below the root layout so that
 * not-found.tsx renders inside it — a not-found at the root of a root-layout
 * group renders without any layout at all.
 */
export default function EnSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
