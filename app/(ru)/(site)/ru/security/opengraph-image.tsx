import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Безопасность PrivaMesh'

export default function Image() {
  return ogImage('Статус аудита и раскрытие', 'Безопасность')
}
