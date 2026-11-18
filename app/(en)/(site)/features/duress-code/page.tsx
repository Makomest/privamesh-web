import DuressCodePage, { duressCodeMetadata } from '@/components/pages/DuressCodePage'

export const metadata = duressCodeMetadata('en')

export default function Page() {
  return <DuressCodePage locale="en" />
}
