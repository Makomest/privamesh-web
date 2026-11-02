import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../../globals.css'
import { fontVariables } from '@/lib/fonts'
import { rootMetadata, rootViewport } from '@/lib/rootMetadata'
import { getLocale, PREFIXED_LOCALES } from '@/lib/i18n/locales'
import { hasMessages } from '@/lib/i18n/messages'

// Root layout for every prefixed locale (/de, /ja, /ar ...). It exists so each
// tree ships its own <html lang dir>, which only a root layout can declare.
// Russian is in the list too: its pages move here from app/(ru) one by one.

export const dynamicParams = false

export function generateStaticParams() {
  return PREFIXED_LOCALES.filter((l) => hasMessages(l.code, 'common')).map((l) => ({ locale: l.code }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return rootMetadata(params.locale)
}

export const viewport: Viewport = rootViewport

export default function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = getLocale(params.locale)
  if (!locale) notFound()
  return (
    <html lang={locale.hreflang} dir={locale.dir} className={fontVariables}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
