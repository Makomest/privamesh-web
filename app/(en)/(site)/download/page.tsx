import DownloadPage, { downloadMetadata } from '@/components/pages/DownloadPage'

export const metadata = downloadMetadata('en')

export default function Page() {
  return <DownloadPage locale="en" />
}
