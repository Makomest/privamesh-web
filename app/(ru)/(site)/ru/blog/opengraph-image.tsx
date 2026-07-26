import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "Блог PrivaMesh"

export default function Image() {
  return ogImage("Заметки о приватных сообщениях", "Блог")
}
