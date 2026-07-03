export type Term = {
  slug: string
  term: string
  short: string // one-sentence definition (snippet target)
  body: string[] // paragraphs
  related?: { href: string; label: string }[]
}

export const GLOSSARY: Term[] = [
  {
    slug: 'stealth-address',
    term: 'Stealth address',
    short:
      'A stealth address is a fresh, one-time address generated for a single message so that only the intended recipient can recognize it - hiding who is talking to whom.',
    body: [
      'On a public blockchain, sending every message to the same address would expose your entire social graph. A stealth address solves this: each message is sent to a unique one-time address that only the recipient can detect and spend from, using a shared secret derived from their keys.',
      'Because two messages to the same person land on two unrelated-looking addresses, an observer scanning the chain sees a scatter of one-off addresses with no way to cluster them into a conversation. PrivaMesh uses stealth addresses so the "who talks to whom" metadata is never written down anywhere.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/features/no-servers', label: 'No servers' },
    ],
  },
  {
    slug: 'metadata',
    term: 'Metadata (in messaging)',
    short:
      'Metadata is the information around a message - who sent it, to whom, when, how often, and from where - as opposed to the message content itself.',
    body: [
      'End-to-end encryption hides the content of a message, but not its metadata. Knowing that address A messaged address B at 2am, then again after B replied, reveals the relationship and the timing without reading a single word. Intelligence agencies have said plainly that they act on metadata.',
      'A messenger that only encrypts content still leaks metadata through its servers. PrivaMesh treats metadata as a first-class threat and hides it with stealth addresses, cover traffic and a throwaway gas wallet.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/privacy', label: 'Why PrivaMesh is private' },
    ],
  },
  {
    slug: 'forward-secrecy',
    term: 'Forward secrecy',
    short:
      'Forward secrecy means that if an attacker steals a key today, they still cannot decrypt your past messages, because those messages used keys that have already been deleted.',
    body: [
      'Systems with forward secrecy give each message a fresh key and destroy old keys after use. So a single compromised key unlocks, at most, one message - not the whole conversation history.',
      'PrivaMesh gets forward secrecy from the Double Ratchet algorithm. A real consequence: your seed phrase restores your funds and identity, but not your chat history, because the old message keys no longer exist. That is the guarantee working as designed.',
    ],
    related: [
      { href: '/blog/how-double-ratchet-encryption-works', label: 'How Double Ratchet works' },
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
    ],
  },
  {
    slug: 'double-ratchet',
    term: 'Double Ratchet',
    short:
      'The Double Ratchet is an algorithm that derives a new encryption key for every message, giving conversations forward secrecy and post-compromise security.',
    body: [
      'Two "ratchets" turn together: a symmetric-key ratchet advances with each message, and a Diffie-Hellman ratchet mixes in fresh key material whenever the conversation changes direction. Each key is used once and thrown away.',
      'This is the same algorithm that secures Signal. PrivaMesh keeps it (paired with AES-256-GCM and message padding) so that a leaked key can neither unlock your past messages nor keep an attacker in your future ones.',
    ],
    related: [
      { href: '/blog/how-double-ratchet-encryption-works', label: 'Double Ratchet explained' },
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
    ],
  },
  {
    slug: 'bip-39-seed-phrase',
    term: 'BIP-39 seed phrase',
    short:
      'A BIP-39 seed phrase is a list of words that encodes a private key - a self-custodial account you control, with no phone number or email involved.',
    body: [
      'Instead of a username and password on a server, a seed phrase deterministically generates your keypair on your own device. Whoever holds the phrase controls the account; nobody else ever has it.',
      'PrivaMesh accounts are BIP-39 seed phrases mapping to a self-custodial Solana keypair, stored in the iOS Keychain. This is what makes it an encrypted messenger with no phone number - the account is math you generate, not an identity you hand over. The responsibility: write your seed down and keep it safe, because there is no password reset.',
    ],
    related: [
      { href: '/features/seed-phrase-accounts', label: 'Seed phrase accounts' },
      { href: '/features/sol-transfers', label: 'SOL transfers' },
    ],
  },
  {
    slug: 'end-to-end-encryption',
    term: 'End-to-end encryption (E2EE)',
    short:
      'End-to-end encryption means only the sender and recipient can read a message; everything in between - including any server - sees only ciphertext.',
    body: [
      'The message is encrypted on the sender’s device and decrypted only on the recipient’s, using keys that never leave those devices. No provider in the middle can read it.',
      'PrivaMesh goes further than typical E2EE apps: because there is no server in the middle at all, the only "ends" that exist are the two devices. It uses X3DH, the Double Ratchet and AES-256-GCM to seal every message.',
    ],
    related: [
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
      { href: '/features/no-servers', label: 'No servers' },
    ],
  },
  {
    slug: 'cover-traffic',
    term: 'Cover traffic',
    short:
      'Cover traffic is decoy messages mixed in with real ones so that an observer cannot tell when you are actually communicating.',
    body: [
      'Even with content encrypted and senders hidden, the timing of your messages can leak your activity pattern. Cover traffic defeats this by producing decoy transactions indistinguishable from real ones.',
      'PrivaMesh uses cover traffic so that timing and frequency analysis on the chain gets no usable signal - an observer cannot separate a genuine send from noise.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/privacy', label: 'Why PrivaMesh is private' },
    ],
  },
  {
    slug: 'serverless-messenger',
    term: 'Serverless messenger',
    short:
      'A serverless messenger routes messages without any central server - so there is no operator that can be breached, subpoenaed, or forced to log your activity.',
    body: [
      'Most messengers, even encrypted ones, run servers that see connection metadata and can be compelled to change behavior. A serverless messenger removes that single point of failure entirely.',
      'PrivaMesh is serverless in the literal sense: messages are encrypted blobs in Solana transaction memos, and the only network dependency is a swappable, self-hostable Solana RPC. There is nothing central to attack.',
    ],
    related: [
      { href: '/features/no-servers', label: 'No servers' },
      { href: '/compare/privamesh-vs-signal', label: 'PrivaMesh vs Signal' },
    ],
  },
]

export function getTerm(slug: string) {
  return GLOSSARY.find((t) => t.slug === slug)
}
