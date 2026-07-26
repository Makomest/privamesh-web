import { ogImage, ogSize, ogContentType } from '@/lib/og'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = "PrivaMesh - приватный мессенджер"

export default function Image() {
  return ogImage("Приватный мессенджер без серверов", "PrivaMesh")
}
