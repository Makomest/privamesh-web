import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { getAlternative } from '@/lib/alternatives'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh alternative'

export default function Image({ params }: { params: { slug: string } }) {
  const a = getAlternative(params.slug)
  return ogImage(`The private ${a?.name ?? ''} alternative`, 'Alternative')
}
