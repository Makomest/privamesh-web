import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Ограничения PrivaMesh'

export default function Image() {
  return ogImage('От чего PrivaMesh не защищает', 'Ограничения')
}
