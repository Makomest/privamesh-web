import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { COMPARISONS } from '@/lib/compare'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh comparison'

export default function Image({ params }: { params: { slug: string } }) {
  const c = COMPARISONS[params.slug]
  return ogImage(`PrivaMesh vs ${c?.competitor ?? 'the rest'}`, 'Compare')
}
