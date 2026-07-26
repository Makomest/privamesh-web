import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontVariables } from '@/lib/fonts'
import { rootMetadata, rootViewport } from '@/lib/rootMetadata'

// English root layout. The RU tree has its own root layout at app/(ru) so it
// can declare lang="ru" — Next only allows <html> in a root layout.
export const metadata: Metadata = rootMetadata('en')
export const viewport: Viewport = rootViewport

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
