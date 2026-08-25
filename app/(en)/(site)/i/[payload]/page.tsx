import type { Metadata } from 'next'
import InviteClient from './InviteClient'

/**
 * An invite link: privamesh.org/i/<card>
 *
 * The card in the path is the same public contact card the QR carries - address
 * and prekey bundle, nothing secret. This page never sends it anywhere: it is
 * handed to the app on this device, or shown so it can be pasted by hand.
 *
 * Why the page exists at all: iOS opens an https link in Safari unless the app
 * claims the domain, and until then a link someone was sent would land on the
 * marketing site with no way to act on it. This is that missing step.
 */
export const metadata: Metadata = {
  title: 'Open this PrivaMesh invite',
  description: 'Someone sent you a PrivaMesh contact card. Open it in the app to add them.',
  // An invite is for one person and carries a public key in its URL. There is no
  // reason for it to be indexed, and every reason for it not to be.
  robots: { index: false, follow: false },
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ payload: string }>
}) {
  const { payload } = await params
  return <InviteClient payload={payload} />
}
