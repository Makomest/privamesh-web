import VideosPage, { videosMetadata } from '@/components/pages/VideosPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamic = 'force-dynamic'
export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('videos')
export const generateMetadata = ({ params }: { params: { locale: string } }) => videosMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <VideosPage locale={params.locale} />
}
