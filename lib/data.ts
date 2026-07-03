/** Shared content data used across the home page and inner pages. */

export const TRUST_ROW = ['Open Source', 'No Servers', 'E2E Encrypted'] as const

/** The "no servers, concretely" table from the repo. */
export const NO_SERVERS_TABLE: { what: string; where: string; how: string }[] = [
  {
    what: 'Your messages',
    where: 'Solana transaction memos (on-chain)',
    how: 'Encrypted blobs in 0-lamport transactions',
  },
  {
    what: 'Your inbox',
    where: 'The Solana blockchain itself',
    how: 'Read via one-time stealth addresses',
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
    where: 'A BIP-39 seed phrase you hold',
    how: 'Self-custodial keypair - no phone, no email',
  },
  {
    what: 'The "PrivaMesh server"',
    where: 'Does not exist',
    how: 'Only dependency is a swappable Solana RPC',
  },
]

export const METADATA_CARDS = [
  {
    icon: 'EyeOff',
    title: 'Stealth addresses',
    body: 'Every message goes to a fresh one-time address. Watching the chain reveals no social graph - who talks to whom stays hidden.',
    href: '/features/metadata-protection',
  },
  {
    icon: 'Shuffle',
    title: 'Cover traffic',
    body: 'Decoy messages blend with real ones so an observer cannot tell when you actually send. Timing analysis gets nothing to work with.',
    href: '/features/metadata-protection',
  },
  {
    icon: 'Wallet',
    title: 'Gas wallet',
    body: 'A throwaway fee-payer covers network costs, so the wallet paying for a transaction is never the wallet sending the message.',
    href: '/features/metadata-protection',
  },
]

export const LIFECYCLE_STEPS = [
  {
    step: '01',
    label: 'Send',
    body: 'Your message is padded to a fixed bucket, encrypted with AES-256-GCM under a Double Ratchet key, and wrapped in a 0-lamport Solana transaction.',
  },
  {
    step: '02',
    label: 'Chain',
    body: 'The encrypted blob lands in a transaction memo on Solana mainnet-beta, addressed to a one-time stealth address. No server ever touches it.',
  },
  {
    step: '03',
    label: 'Receive',
    body: 'Your device scans the chain for your stealth addresses, decrypts locally, and advances the ratchet. Only your keys can read it.',
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
    src: '/screenshots/01.png?v=2',
    title: 'Private by default',
    alt: 'PrivaMesh onboarding screen - private by default, end-to-end encrypted with a new key for every message on iPhone',
  },
  {
    src: '/screenshots/02.png?v=2',
    title: 'End-to-end encrypted chat',
    alt: 'PrivaMesh encrypted chat screen - a private conversation with no servers stored on the Solana blockchain',
  },
  {
    src: '/screenshots/03.png?v=2',
    title: 'No phone, just a nickname',
    alt: 'PrivaMesh add contact screen - find a user by nickname or Solana address, no phone number required',
  },
  {
    src: '/screenshots/04.png?v=2',
    title: 'On-chain nicknames & NFT avatars',
    alt: 'PrivaMesh market screen for buying on-chain NFT avatars and nicknames with SOL',
  },
  {
    src: '/screenshots/05.png?v=2',
    title: 'Every message on-chain',
    alt: 'PrivaMesh message info screen showing a message stored on Solana, viewable in the Solana Explorer',
  },
  {
    src: '/screenshots/06.png?v=2',
    title: 'Send SOL in chat',
    alt: 'PrivaMesh in-chat SOL transfer screen sending a Solana payment inside an encrypted conversation',
  },
]

export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: 'Is PrivaMesh really serverless?',
    a: "Yes. There is no PrivaMesh server, relay, or account database. The app's only network dependency is a Solana RPC endpoint, which is swappable and self-hostable. Messages live as encrypted blobs in Solana transaction memos, so there is nothing central to breach, subpoena, log, or shut down.",
  },
  {
    q: 'How is PrivaMesh encrypted?',
    a: 'PrivaMesh uses an X3DH handshake over Curve25519 to establish keys, then a Double Ratchet (HKDF and HMAC-SHA256) that gives every message a new key. Payloads are sealed with AES-256-GCM and padded to fixed-size buckets. You get forward secrecy and post-compromise security by default.',
  },
  {
    q: 'Can I use PrivaMesh without a phone number or email?',
    a: 'Yes. There is no phone number and no email. Your account is a BIP-39 seed phrase that maps to a self-custodial Solana keypair. Keys are stored in the iOS Keychain, device-only and biometric-lockable.',
  },
  {
    q: 'What metadata does PrivaMesh collect?',
    a: 'None on any server, because there is no server. On-chain, stealth addresses hide the social graph, cover traffic hides timing, and a throwaway gas wallet hides who pays the network fee.',
  },
  {
    q: 'What happens if I lose my phone?',
    a: 'Restore your BIP-39 seed phrase on a new device to recover your funds and identity. By design your chat history is not recovered - forward secrecy means old message keys are deleted, so nobody, including you, can decrypt past messages from the seed alone.',
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
    { feature: 'Built-in payments', values: ['yes', 'no', 'no'] as CellState[] },
    { feature: 'Open source', values: ['yes', 'yes', 'partial'] as CellState[] },
  ],
}

export type CellState = 'yes' | 'partial' | 'no'
