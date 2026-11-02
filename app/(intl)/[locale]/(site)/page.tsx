import HomePage, { homeMetadata } from '@/components/pages/HomePage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('home')
export const generateMetadata = ({ params }: { params: { locale: string } }) => homeMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <HomePage locale={params.locale} />
}
