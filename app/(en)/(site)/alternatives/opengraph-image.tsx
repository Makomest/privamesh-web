import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "Private messenger alternatives"

export default function Image() {
  return ogImage("Private messenger alternatives", "Alternatives")
}
