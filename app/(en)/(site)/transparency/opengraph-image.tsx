import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh Transparency'

export default function Image() {
  return ogImage('Transparency report', 'Transparency')
}
