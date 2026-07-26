import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh runs without servers"

export default function Image() {
  return ogImage("A messenger with no servers", "Feature")
}
