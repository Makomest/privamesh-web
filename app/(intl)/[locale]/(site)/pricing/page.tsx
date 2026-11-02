import PricingPage, { pricingMetadata } from '@/components/pages/PricingPage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('pricing')
export const generateMetadata = ({ params }: { params: { locale: string } }) => pricingMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <PricingPage locale={params.locale} />
}
