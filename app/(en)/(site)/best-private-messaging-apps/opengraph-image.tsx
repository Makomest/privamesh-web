import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "Best private messaging apps"

export default function Image() {
  return ogImage("Best private messaging apps", "Ranked")
}
