import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Цены PrivaMesh'

export default function Image() {
  return ogImage('Цены и лимиты сообщений', 'Цены')
}
