import SupportPage, { supportMetadata } from '@/components/pages/SupportPage'

export const metadata = supportMetadata('en')

export default function Page() {
  return <SupportPage locale="en" />
}
