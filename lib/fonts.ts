import { Inter, JetBrains_Mono } from 'next/font/google'

// Shared by both root layouts (app/(en) and app/(ru)). next/font requires the
// loader to be called at module scope, so it lives here rather than inline.
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const fontVariables = `${inter.variable} ${jetbrains.variable}`
