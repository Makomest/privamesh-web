import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Архитектура PrivaMesh'

export default function Image() {
  return ogImage('Каждый компонент и что он видит', 'Архитектура')
}
