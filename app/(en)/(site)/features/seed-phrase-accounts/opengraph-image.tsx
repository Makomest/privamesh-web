import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh seed phrase accounts"

export default function Image() {
  return ogImage("No phone number, just a phrase", "Feature")
}
