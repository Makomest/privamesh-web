import SiteShell from '@/components/SiteShell'

// Mirror of app/(en)/(site)/layout.tsx — see the note there.
export default function LocaleSiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return <SiteShell locale={params.locale}>{children}</SiteShell>
}
