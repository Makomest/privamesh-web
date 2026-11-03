import ThreatModelPage, { threatModelMetadata } from '@/components/pages/ThreatModelPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('threat-model')
export const generateMetadata = ({ params }: { params: { locale: string } }) => threatModelMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <ThreatModelPage locale={params.locale} />
}
