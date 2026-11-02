import SupportPage, { supportMetadata } from '@/components/pages/SupportPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('support')
export const generateMetadata = ({ params }: { params: { locale: string } }) => supportMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <SupportPage locale={params.locale} />
}
