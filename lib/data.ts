/** Shared content data used across the home page and inner pages. */

export const TRUST_ROW = ['No Phone Number', 'No Servers', 'E2E Encrypted'] as const

/** The "no servers, concretely" table - where every piece of your data lives. */
export const NO_SERVERS_TABLE: { what: string; where: string; how: string }[] = [
  {
    what: 'Your messages',
    where: 'A public, decentralized transport',
    how: 'Encrypted blobs, addressed to one-time addresses',
  },
  {
    what: 'Your inbox',
    where: 'The public transport itself',
    how: 'Retrieved and decrypted only on your device',
  },
  {
    what: 'Your keys',
    where: 'Your iPhone Keychain only',
    how: 'Biometric-locked, never leave the device',
  },
  {
    what: 'Your contacts & history',
    where: 'Your iPhone only',
    how: 'Never synced, never uploaded anywhere',
  },
  {
    what: 'Your identity',
    where: 'An account phrase you hold',
    how: 'Encryption keys on your device - no phone, no email',
  },
  {
    what: 'The "PrivaMesh server"',
    where: 'Does not exist',
    how: 'No account server; the transport is public and swappable',
  },
]

export const METADATA_CARDS = [
  {
    icon: 'EyeOff',
    title: 'One-time addresses',
    body: 'Every message is delivered to a fresh one-time address, so an observer cannot reconstruct who talks to whom. The social graph stays hidden.',
    href: '/features/metadata-protection',
  },
  {
    icon: 'Shuffle',
    title: 'Cover traffic',
    body: 'Decoy messages blend with real ones so an observer cannot tell when you actually send. Timing analysis gets nothing to work with.',
    href: '/features/metadata-protection',
  },
  {
    icon: 'Ruler',
    title: 'Fixed-size padding',
    body: 'Every message is padded to a fixed size before it is sealed, so its length leaks nothing about the content inside.',
    href: '/features/metadata-protection',
  },
]

export const LIFECYCLE_STEPS = [
  {
    step: '01',
    label: 'Send',
    body: 'Your message is padded to a fixed size and sealed with AES-256-GCM under a fresh Double Ratchet key - on your device, before it ever leaves.',
  },
  {
    step: '02',
    label: 'Transport',
    body: 'The encrypted blob travels over a public, decentralized transport, addressed to a one-time address. No account server ever holds it.',
  },
  {
    step: '03',
    label: 'Receive',
    body: 'Your device retrieves and decrypts it locally with keys only you hold, then advances the ratchet. Only your device can read it.',
  },
]

export const HOME_FEATURES = [
  {
    href: '/features/no-servers',
    title: 'No servers',
    body: 'There is no PrivaMesh backend to breach, subpoena, or shut down. The chain is the transport.',
  },
  {
    href: '/features/e2e-encryption',
    title: 'End-to-end encryption',
    body: 'X3DH handshake, Double Ratchet, AES-256-GCM. Forward secrecy and post-compromise security by default.',
  },
  {
    href: '/features/metadata-protection',
    title: 'Metadata protection',
    body: 'Stealth addresses, cover traffic and a gas wallet hide who you talk to, when, and who pays.',
  },
  {
    href: '/features/seed-phrase-accounts',
    title: 'Seed phrase accounts',
    body: 'No phone number, no email. Your account is a BIP-39 seed phrase and a self-custodial keypair.',
  },
  {
    href: '/features/sol-transfers',
    title: 'SOL transfers in chat',
    body: 'Send value inside a conversation. On-chain nicknames and NFT avatars, no exchange required.',
  },
]

export const SCREENSHOTS = [
  {
    src: '/screenshots/01.png?v=3',
    title: 'Privacy by default',
    alt: 'PrivaMesh onboarding screen - privacy by default, Double Ratchet key per message and one-time addresses, on iPhone',
  },
  {
    src: '/screenshots/04.png?v=3',
    title: 'End-to-end encrypted chat',
    alt: 'PrivaMesh encrypted chat screen showing a private conversation, end-to-end encrypted, on iPhone',
  },
  {
    src: '/screenshots/05.png?v=3',
    title: 'Your chats',
    alt: 'PrivaMesh chat list showing conversations with names and nicknames, no phone numbers, on iPhone',
  },
  {
    src: '/screenshots/02.png?v=3',
    title: 'No servers, seriously',
    alt: 'PrivaMesh onboarding screen explaining there is no central server - nothing to hack or coerce, on iPhone',
  },
  {
    src: '/screenshots/03.png?v=3',
    title: 'On-device security',
    alt: 'PrivaMesh onboarding screen - keys behind Face ID, disappearing messages and signed contacts, on iPhone',
  },
  {
    src: '/screenshots/06.png?v=3',
    title: 'A private social graph',
    alt: 'PrivaMesh anonymous contact graph visualising your connections privately, no phone numbers, on iPhone',
  },
]

/**
 * Clean screenshot subset for the App-Store-review-facing landing page. Shows
 * only the messenger surface (onboarding, encrypted chat, chat list) - no
 * crypto/market screens.
 */
export const HOME_SCREENSHOTS = [
  {
    src: '/screenshots/01.png?v=3',
    title: 'Privacy by default',
    alt: 'PrivaMesh onboarding screen, privacy by default and end-to-end encrypted, on iPhone',
  },
  {
    src: '/screenshots/04.png?v=3',
    title: 'End-to-end encrypted chat',
    alt: 'PrivaMesh encrypted chat screen showing a private conversation on iPhone',
  },
  {
    src: '/screenshots/05.png?v=3',
    title: 'Your chats',
    alt: 'PrivaMesh chat list with names and nicknames and no phone numbers, on iPhone',
  },
]

export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: 'Is PrivaMesh really serverless?',
    a: 'Yes. There is no PrivaMesh account server, relay, or message database. Encrypted messages travel over a public, decentralized transport, so there is nothing central to breach, subpoena, log, or shut down.',
  },
  {
    q: 'How is PrivaMesh encrypted?',
    a: 'PrivaMesh uses an X3DH handshake over Curve25519 to establish keys, then a Double Ratchet (HKDF and HMAC-SHA256) that gives every message a new key. Payloads are sealed with AES-256-GCM and padded to a fixed size. You get forward secrecy and post-compromise security by default.',
  },
  {
    q: 'Can I use PrivaMesh without a phone number or email?',
    a: 'Yes. There is no phone number and no email. Your account is an account phrase that maps to encryption keys stored in the iOS Keychain - device-only and protected by Face ID or Touch ID.',
  },
  {
    q: 'What metadata does PrivaMesh collect?',
    a: 'None on any server, because there is no server. Delivery uses one-time addresses to hide the social graph, cover traffic hides when you send, and fixed-size padding hides message length.',
  },
  {
    q: 'What happens if I lose my phone?',
    a: 'Restore your account phrase on a new device to recover your identity. By design your chat history is not recovered - forward secrecy means old message keys are deleted, so nobody, including you, can decrypt past messages from the phrase alone.',
  },
]

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: 'What do I pay for on the free tier?',
    a: 'The app is free to use. Because messages are Solana transactions, you pay a tiny network fee in SOL per message - typically a fraction of a cent - not a subscription.',
  },
  {
    q: 'What does PrivaMesh+ add for $1.99/month?',
    a: 'PrivaMesh+ unlocks premium features on top of the free, fully-encrypted messenger. Core privacy - no servers, E2E encryption, metadata protection - is never paywalled.',
  },
  {
    q: 'How do I pay for PrivaMesh+?',
    a: 'PrivaMesh+ is billed through the App Store at $1.99/month. Network fees for sending messages are paid separately in SOL from your built-in wallet.',
  },
  {
    q: 'Do you take a cut of my SOL transfers?',
    a: 'No. In-chat SOL transfers are ordinary Solana transactions from your self-custodial wallet. PrivaMesh never custodies your funds or takes a percentage - you only pay the standard Solana network fee.',
  },
]

/** Compact home comparison teaser. */
export const COMPARE_TEASER = {
  columns: ['PrivaMesh', 'Signal', 'Telegram'],
  rows: [
    { feature: 'No servers', values: ['yes', 'no', 'no'] as CellState[] },
    { feature: 'No phone number', values: ['yes', 'no', 'no'] as CellState[] },
    { feature: 'Metadata protection', values: ['yes', 'partial', 'no'] as CellState[] },
    { feature: 'End-to-end encrypted', values: ['yes', 'yes', 'partial'] as CellState[] },
    { feature: 'Open source', values: ['yes', 'yes', 'partial'] as CellState[] },
  ],
}

export type CellState = 'yes' | 'partial' | 'no'
