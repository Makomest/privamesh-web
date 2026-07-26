import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { GUIDES } from '@/lib/guides'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh guide'

export default function Image({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find((g) => g.slug === params.slug)
  return ogImage(guide?.h1 ?? guide?.title ?? 'PrivaMesh guide', 'Guide')
}
