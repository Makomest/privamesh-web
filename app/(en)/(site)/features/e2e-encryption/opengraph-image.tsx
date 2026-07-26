import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh end-to-end encryption"

export default function Image() {
  return ogImage("End-to-end encryption", "Feature")
}
