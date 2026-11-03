import ArchitecturePage, { architectureMetadata } from '@/components/pages/ArchitecturePage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('architecture')
export const generateMetadata = ({ params }: { params: { locale: string } }) => architectureMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <ArchitecturePage locale={params.locale} />
}
