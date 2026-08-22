import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh bug bounty'

export default function Image() {
  return ogImage('Up to $500 for a critical finding', 'Bug bounty')
}
