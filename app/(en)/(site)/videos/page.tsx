import VideosPage, { videosMetadata } from '@/components/pages/VideosPage'

// Rendered per request from data/youtube.json, which the background sync keeps
// current - a build has no data to prerender from.
export const dynamic = 'force-dynamic'

export const metadata = videosMetadata('en')

export default function Page() {
  return <VideosPage locale="en" />
}
