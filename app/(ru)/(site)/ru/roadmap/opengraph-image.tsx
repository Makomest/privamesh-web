import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Дорожная карта PrivaMesh'

export default function Image() {
  return ogImage('Где PrivaMesh сейчас и что дальше', 'Дорожная карта')
}
