import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "Why PrivaMesh is private"

export default function Image() {
  return ogImage("Why PrivaMesh is the most private messenger", "Privacy")
}
