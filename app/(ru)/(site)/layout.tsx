import SiteShell from '@/components/SiteShell'

// Mirror of app/(en)/(site)/layout.tsx — see the note there.
export default function RuSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
