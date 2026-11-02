import LimitationsPage, { limitationsMetadata } from '@/components/pages/LimitationsPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('limitations')
export const generateMetadata = ({ params }: { params: { locale: string } }) => limitationsMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <LimitationsPage locale={params.locale} />
}
