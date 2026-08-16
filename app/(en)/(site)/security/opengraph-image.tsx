import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh Security'

export default function Image() {
  return ogImage('Audit status and disclosure', 'Security')
}
