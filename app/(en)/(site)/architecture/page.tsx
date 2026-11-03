import ArchitecturePage, { architectureMetadata } from '@/components/pages/ArchitecturePage'

export const metadata = architectureMetadata('en')

export default function Page() {
  return <ArchitecturePage locale="en" />
}
