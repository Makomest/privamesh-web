import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Скачать PrivaMesh'

export default function Image() {
  return ogImage('PrivaMesh для iPhone', 'Скачать')
}
