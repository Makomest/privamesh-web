import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Поддержка PrivaMesh'

export default function Image() {
  return ogImage('Вопросы, ошибки и помощь с аккаунтом', 'Поддержка')
}
