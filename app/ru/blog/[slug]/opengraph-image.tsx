import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { getPost } from '@/lib/posts'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh blog post'

export default function Image({ params }: { params: { slug: string } }) {
  const p = getPost('ru', params.slug)
  return ogImage(p?.title ?? 'Блог PrivaMesh', 'Блог')
}
