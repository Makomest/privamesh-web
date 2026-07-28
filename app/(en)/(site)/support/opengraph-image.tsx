import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh support'

export default function Image() {
  return ogImage('Questions, bugs and account help', 'Support')
}
