import ThreatModelPage, { threatModelMetadata } from '@/components/pages/ThreatModelPage'

export const metadata = threatModelMetadata('en')

export default function Page() {
  return <ThreatModelPage locale="en" />
}
