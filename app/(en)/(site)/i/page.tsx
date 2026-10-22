import type { Metadata } from 'next'
import FragmentInvite from './FragmentInvite'

/**
 * An invite link: privamesh.org/i/#<card>
 *
 * The card travels after `#`, and a fragment is never sent to a server. So this
 * page is static, and neither it nor any log on the way learns who invited whom:
 * the browser reads the card and hands it to the app. The older form,
 * /i/<card>, put the inviter's address and nickname in the request line, next to
 * the IP of whoever opened it; ./[payload] still serves links already sent.
 */
export const metadata: Metadata = {
  title: 'Open this PrivaMesh invite',
  description: 'Someone sent you a PrivaMesh contact card. Open it in the app to add them.',
  robots: { index: false, follow: false },
}

export default function InviteFragmentPage() {
  return <FragmentInvite />
}
