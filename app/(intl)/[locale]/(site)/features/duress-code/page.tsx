import DuressCodePage, { duressCodeMetadata } from '@/components/pages/DuressCodePage'
import { prefixedParamsFor } from '@/lib/i18n/messages'

export const dynamicParams = false
export const generateStaticParams = () => prefixedParamsFor('feature-duress-code')
export const generateMetadata = ({ params }: { params: { locale: string } }) => duressCodeMetadata(params.locale)

export default function Page({ params }: { params: { locale: string } }) {
  return <DuressCodePage locale={params.locale} />
}
