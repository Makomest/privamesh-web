import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'Код принуждения в PrivaMesh'

export default function Image() {
  return ogImage('Второй пароль, стирающий аккаунт', 'Код принуждения')
}
