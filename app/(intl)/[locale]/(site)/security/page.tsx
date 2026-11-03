import SecurityPage, { securityMetadata } from '@/components/pages/SecurityPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('security')
export const generateMetadata = ({ params }: { params: { locale: string } }) => securityMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <SecurityPage locale={params.locale} />
}
