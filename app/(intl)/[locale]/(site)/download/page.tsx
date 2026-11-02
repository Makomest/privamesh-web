import DownloadPage, { downloadMetadata } from '@/components/pages/DownloadPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('download')
export const generateMetadata = ({ params }: { params: { locale: string } }) => downloadMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <DownloadPage locale={params.locale} />
}
