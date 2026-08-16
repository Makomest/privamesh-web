import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh Limitations'

export default function Image() {
  return ogImage('What PrivaMesh does not protect you from', 'Limitations')
}
