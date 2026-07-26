import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh terms of use"

export default function Image() {
  return ogImage("Terms of Use", "Legal")
}
