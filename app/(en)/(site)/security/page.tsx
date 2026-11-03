import SecurityPage, { securityMetadata } from '@/components/pages/SecurityPage'

export const metadata = securityMetadata('en')

export default function Page() {
  return <SecurityPage locale="en" />
}
