import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh Threat model'

export default function Image() {
  return ogImage('Who sees what, and what stops them', 'Threat model')
}
