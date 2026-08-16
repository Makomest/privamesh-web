import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Модель угроз PrivaMesh'

export default function Image() {
  return ogImage('Кто что видит и что его останавливает', 'Модель угроз')
}
