import { SITE } from './site'
import { APP_STORE } from './appstore.generated'

export type Platform = {
  id: 'ios' | 'android' | 'windows'
  name: string
  requirement: string
  /** null while no build exists - the card renders as unavailable, not broken. */
  href: string | null
  cta: string
  /** Shown when href is null. Says what is missing and why, never "soon". */
  status: string
}

export const PLATFORMS: Platform[] = [
  {
    id: 'ios',
    name: 'iPhone',
    requirement: `iOS ${APP_STORE.minimumOsVersion} or later · version ${APP_STORE.version}`,
    href: SITE.downloads.ios,
    cta: 'Download on the App Store',
    status: '',
  },
  {
    id: 'android',
    name: 'Android',
    requirement: 'No build yet',
    href: SITE.downloads.android,
    cta: 'Download the APK',
    status:
      'There is no Android client. The cryptography is built on CryptoKit and the Secure Enclave, so an Android version is a rewrite of the key handling rather than a port, and none of it exists yet. If you need Android today, Signal is the honest recommendation.',
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: 'No build yet',
    href: SITE.downloads.windows,
    cta: 'Download the installer',
    status:
      'There is no desktop client. Multi-device would also need a way to share ratchet state between devices, which the current design deliberately does not have - message history never leaves the phone it was received on.',
  },
]
