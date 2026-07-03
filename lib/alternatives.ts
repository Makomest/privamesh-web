export type Alternative = {
  slug: string
  name: string
  /** One line on what the competitor is (fair framing). */
  what: string
  /** 2-3 paragraphs: why PrivaMesh is a strong alternative, honestly. */
  body: string[]
  /** Optional matching /compare page for a full table. */
  comparePath?: string
}

export const ALTERNATIVES: Alternative[] = [
  {
    slug: 'signal',
    name: 'Signal',
    what: 'Signal is the gold-standard encrypted messenger, trusted and audited - but it runs servers and requires a phone number.',
    body: [
      'If you love Signal’s encryption but want to drop the two things it keeps - servers and a phone number - PrivaMesh is the alternative. It uses the same cryptographic ideas (X3DH, Double Ratchet, AES-256-GCM) with no server in the middle and no phone number to tie to your identity.',
      'Your account is a self-custodial seed phrase, messages are encrypted blobs on Solana, and stealth addresses plus cover traffic hide the metadata Signal’s servers would otherwise handle. There is nothing to subpoena because no company holds your data.',
    ],
    comparePath: '/compare/privamesh-vs-signal',
  },
  {
    slug: 'telegram',
    name: 'Telegram',
    what: 'Telegram is fast and feature-rich, but its default cloud chats are not end-to-end encrypted and everything runs on its servers.',
    body: [
      'If you use Telegram but want real privacy by default, PrivaMesh is the alternative. Every PrivaMesh message is end-to-end encrypted - not just opt-in "secret chats" - with no cloud copy on anyone’s server, because there is no server.',
      'There is no phone number, your account is a seed phrase, and metadata is hidden by design. The trade-off is reach: PrivaMesh is a focused iOS privacy tool, not a mass social platform.',
    ],
    comparePath: '/compare/privamesh-vs-telegram',
  },
  {
    slug: 'whatsapp',
    name: 'WhatsApp',
    what: 'WhatsApp is end-to-end encrypted but owned by Meta, tied to your phone number, and it collects extensive metadata.',
    body: [
      'WhatsApp encrypts message content, but it links your account to your phone number and shares metadata within the Meta ecosystem. If that’s the part that bothers you, PrivaMesh is the alternative.',
      'No phone number, no email, no parent company harvesting metadata - and no server at all. Stealth addresses and cover traffic hide who you talk to and when, and your keys never leave your device.',
    ],
  },
  {
    slug: 'session',
    name: 'Session',
    what: 'Session is a decentralized, phone-number-free messenger that routes over an onion network.',
    body: [
      'Session and PrivaMesh share a goal - private messaging with no phone number and no central company - but reach it differently. PrivaMesh keeps the Double Ratchet for per-message forward secrecy, where Session traded it away for its routing model.',
      'PrivaMesh’s transport is the public, auditable Solana chain rather than a bespoke node network, and your identity doubles as a self-custodial wallet for in-chat SOL payments. The cost is a tiny network fee per message.',
    ],
    comparePath: '/compare/privamesh-vs-session',
  },
  {
    slug: 'threema',
    name: 'Threema',
    what: 'Threema is a paid, privacy-focused messenger that lets you sign up without a phone number.',
    body: [
      'Threema is a solid privacy choice, but it still runs on Threema’s servers and is closed at the infrastructure level. If you want to remove the server entirely, PrivaMesh is the alternative.',
      'PrivaMesh has no backend to trust: messages live on-chain as encrypted blobs, keys stay on your device, and metadata is hidden with stealth addresses and cover traffic. It’s open source, so you can verify the claims.',
    ],
  },
  {
    slug: 'simplex',
    name: 'SimpleX',
    what: 'SimpleX is a privacy messenger with no user identifiers, using relay servers you can self-host.',
    body: [
      'SimpleX and PrivaMesh both eliminate user IDs and phone numbers. The difference is the transport: SimpleX uses message-queue relay servers, while PrivaMesh uses the Solana blockchain as a public, verifiable transport with on-chain, wallet-signed key discovery.',
      'PrivaMesh also bundles a self-custodial wallet for in-chat SOL transfers and on-chain identity. If an auditable public transport and built-in payments appeal to you, PrivaMesh is the alternative.',
    ],
  },
  {
    slug: 'imessage',
    name: 'iMessage',
    what: 'iMessage is encrypted between Apple devices but tied to your Apple ID and phone number, with iCloud backups that can weaken privacy.',
    body: [
      'iMessage is convenient on Apple hardware, but it ties messaging to your Apple ID and phone number, and iCloud backups can expose message history. If you want to cut those ties, PrivaMesh is the alternative.',
      'No phone number, no account with a provider, and no cloud backup of your history - forward secrecy deletes old keys by design. Your identity is a seed phrase you alone control.',
    ],
  },
  {
    slug: 'wickr',
    name: 'Wickr',
    what: 'Wickr is an encrypted messenger now owned by Amazon (AWS), aimed at secure enterprise and government use.',
    body: [
      'Wickr offers strong encryption, but it is now an Amazon product running on Amazon infrastructure. If you’d rather not route private messaging through a big-tech server, PrivaMesh is the alternative.',
      'PrivaMesh has no company server in the path at all. Messages are on-chain encrypted blobs, keys are device-only, and there is no phone number or corporate account - just math you control.',
    ],
  },
]

export function getAlternative(slug: string) {
  return ALTERNATIVES.find((a) => a.slug === slug)
}
