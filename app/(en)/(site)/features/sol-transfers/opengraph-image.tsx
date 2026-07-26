import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh in-chat SOL transfers"

export default function Image() {
  return ogImage("Send SOL inside a chat", "Feature")
}
