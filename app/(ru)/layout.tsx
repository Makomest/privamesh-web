import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontVariables } from '@/lib/fonts'
import { rootMetadata, rootViewport } from '@/lib/rootMetadata'

// Russian root layout. Exists purely so /ru* ships <html lang="ru"> — a nested
// layout cannot render <html>, so the RU tree needs its own root.
export const metadata: Metadata = rootMetadata('ru')
export const viewport: Viewport = rootViewport

export default function RuRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={fontVariables}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
