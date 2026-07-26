import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { GLOSSARY } from '@/lib/glossary'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh glossary term'

export default function Image({ params }: { params: { term: string } }) {
  const term = GLOSSARY.find((t) => t.slug === params.term)
  return ogImage(term?.term ?? 'PrivaMesh glossary', 'Glossary')
}
