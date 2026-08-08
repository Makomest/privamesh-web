export type Term = {
  slug: string
  term: string
  short: string // one-sentence definition (snippet target)
  body: string[] // paragraphs
  related?: { href: string; label: string }[]
  /** SERP description, 130-160 chars. Written per entry rather than sliced from
   *  `short`, which used to cut mid-word ("...keys that have alre"). */
  description: string
  /**
   * The headline question for this term. Written per entry because a generated
   * "What is a {term}?" cannot agree with mass nouns ("a metadata") or vowels
   * ("a end-to-end encryption"). Also used as the FAQPage question.
   */
  question: string
}

export const GLOSSARY: Term[] = [
  {
    slug: 'stealth-address',
    description: 'A stealth address is a fresh one-time address per message, so an observer cannot link two messages into one conversation. How PrivaMesh hides who talks to whom.',
    question: 'What is a stealth address?',
    term: 'Stealth address',
    short:
      'A stealth address is a fresh, one-time address generated for a single message so that only the intended recipient can recognize it - hiding who is talking to whom.',
    body: [
      'On a public blockchain, sending every message to the same address would expose your entire social graph. A stealth address solves this: each message is sent to a unique one-time address that only the recipient can detect and spend from, using a shared secret derived from their keys.',
      'Because two messages to the same person land on two unrelated-looking addresses, an observer scanning the chain sees a scatter of one-off addresses with no way to cluster them into a conversation. PrivaMesh uses stealth addresses so the "who talks to whom" metadata is never written down anywhere.',
      'A worked example makes the mechanism concrete. Your contact publishes a view key and a spend key. To send you a message, the sender combines their own ephemeral key with your view key to derive a one-time address that only your keys can recognise. They never learn your main address, and the address they used will never be reused.',
      'Scanning is the cost of this design. Because addresses are unlinkable by construction, your device has to check candidate transactions against your view key rather than looking up an inbox. That work happens locally, which is exactly why nobody else can do it on your behalf without seeing your social graph.',
      'Stealth addressing is the difference between a public ledger that exposes your contacts and one that does not. Without it, on-chain messaging would map every relationship you have; with it, a chain observer sees a scatter of one-off addresses that cannot be clustered into conversations.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/features/no-servers', label: 'No servers' },
    ],
  },
  {
    slug: 'metadata',
    description: 'Metadata is who messaged whom, when and how often - the data surveillance runs on. Why encryption alone does not hide it, and how PrivaMesh removes it.',
    question: 'What is metadata in messaging?',
    term: 'Metadata (in messaging)',
    short:
      'Metadata is the information around a message - who sent it, to whom, when, how often, and from where - as opposed to the message content itself.',
    body: [
      'End-to-end encryption hides the content of a message, but not its metadata. Knowing that address A messaged address B at 2am, then again after B replied, reveals the relationship and the timing without reading a single word. Intelligence agencies have said plainly that they act on metadata.',
      'A messenger that only encrypts content still leaks metadata through its servers. PrivaMesh treats metadata as a first-class threat and hides it with stealth addresses, cover traffic and a throwaway gas wallet.',
      'The intelligence community has been explicit about the value of this data. A former NSA and CIA director summarised the position as killing people based on metadata, and bulk collection programmes have consistently prioritised call and connection records over content precisely because the pattern is easier to analyse at scale than the words.',
      'Consider what a single metadata record reveals without any content at all: a person contacted a medical clinic, then a lawyer, then a family member, all within an hour, late at night. Nothing was read, and the situation is obvious. Content encryption does nothing about that inference.',
      'Metadata resistance has to be designed in rather than promised. PrivaMesh hides the who with one-time stealth addresses, the when with cover traffic, and the how much with fixed-size padding - three separate mechanisms because who, when and volume leak independently of one another.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/privacy', label: 'Why PrivaMesh is private' },
    ],
  },
  {
    slug: 'forward-secrecy',
    description: 'Forward secrecy means a key stolen today cannot unlock yesterday’s messages: those keys were destroyed after use. What it protects, and what it costs you.',
    question: 'What is forward secrecy?',
    term: 'Forward secrecy',
    short:
      'Forward secrecy means that if an attacker steals a key today, they still cannot decrypt your past messages, because those messages used keys that have already been deleted.',
    body: [
      'Systems with forward secrecy give each message a fresh key and destroy old keys after use. So a single compromised key unlocks, at most, one message - not the whole conversation history.',
      'PrivaMesh gets forward secrecy from the Double Ratchet algorithm. A real consequence: your seed phrase restores your funds and identity, but not your chat history, because the old message keys no longer exist. That is the guarantee working as designed.',
      'The threat this defends against is retrospective decryption. An adversary who cannot break your encryption today can still record your traffic and wait - for a future key compromise, a seized device, or a coerced disclosure. Without forward secrecy, one key recovered years later unlocks everything that was captured.',
      'The mechanism is deletion. Each message uses a key derived from the ratchet and then discarded, so there is no long-term key sitting on the device that maps to old ciphertext. Compromising the device gives an attacker your future messages until the ratchet heals, but not your past ones.',
      'This has a consequence users notice: message history cannot be restored. Your PrivaMesh seed phrase brings back your identity and funds on a new device but never your old conversations, because the keys that could read them no longer exist anywhere. An app that can restore your full history has, by definition, kept something it could have deleted.',
    ],
    related: [
      { href: '/blog/how-double-ratchet-encryption-works', label: 'How Double Ratchet works' },
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
    ],
  },
  {
    slug: 'double-ratchet',
    description: 'The Double Ratchet derives a fresh key for every message, giving forward secrecy and post-compromise security. Plain-English guide to how the two ratchets turn.',
    question: 'What is the Double Ratchet algorithm?',
    term: 'Double Ratchet',
    short:
      'The Double Ratchet is an algorithm that derives a new encryption key for every message, giving conversations forward secrecy and post-compromise security.',
    body: [
      'Two "ratchets" turn together: a symmetric-key ratchet advances with each message, and a Diffie-Hellman ratchet mixes in fresh key material whenever the conversation changes direction. Each key is used once and thrown away.',
      'This is the same algorithm that secures Signal. PrivaMesh keeps it (paired with AES-256-GCM and message padding) so that a leaked key can neither unlock your past messages nor keep an attacker in your future ones.',
      'The algorithm was published by Trevor Perrin and Moxie Marlinspike as part of the Signal Protocol, and it is now the de facto standard for secure messaging - used by Signal, WhatsApp, and PrivaMesh among others. It has been formally analysed in the academic literature, which is a meaningful distinction from bespoke protocols.',
      'The symmetric ratchet advances a chain key through a KDF for each message in a run, giving forward secrecy within that run. The Diffie-Hellman ratchet turns whenever the conversation changes direction, mixing in fresh entropy from a new key exchange. That second ratchet is what provides post-compromise security, sometimes called self-healing.',
      'Post-compromise security is the property that gets undersold. If an attacker briefly obtains your keys, the next time your contact replies, a new DH exchange injects material the attacker never saw, and they are locked out again. Recovery is automatic and requires no action from either party.',
    ],
    related: [
      { href: '/blog/how-double-ratchet-encryption-works', label: 'Double Ratchet explained' },
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
    ],
  },
  {
    slug: 'bip-39-seed-phrase',
    description: 'A BIP-39 seed phrase is a word list encoding a private key - an account with no phone number or email. How it works, and how to store it so you do not lose it.',
    question: 'What is a BIP-39 seed phrase?',
    term: 'BIP-39 seed phrase',
    short:
      'A BIP-39 seed phrase is a list of words that encodes a private key - a self-custodial account you control, with no phone number or email involved.',
    body: [
      'Instead of a username and password on a server, a seed phrase deterministically generates your keypair on your own device. Whoever holds the phrase controls the account; nobody else ever has it.',
      'PrivaMesh accounts are BIP-39 seed phrases mapping to a self-custodial Solana keypair, stored in the iOS Keychain. This is what makes it an encrypted messenger with no phone number - the account is math you generate, not an identity you hand over. The responsibility: write your seed down and keep it safe, because there is no password reset.',
      'BIP-39 is a Bitcoin Improvement Proposal that standardised turning entropy into a memorable word list. The words come from a fixed 2048-word dictionary chosen so no two entries share their first four letters, which makes the phrase resistant to typos and easy to check. A checksum is built into the final word, so a mistyped phrase is usually rejected rather than silently deriving the wrong account.',
      'Twelve words encode 128 bits of entropy and twenty-four encode 256. The security is in the randomness, not the words themselves - which is why a phrase you invent yourself is dramatically weaker than one a device generates, and why phrases must never be photographed, typed into a website, or stored in a notes app that syncs.',
      'In PrivaMesh the seed derives a Solana keypair that is simultaneously your messaging identity and your wallet. That is convenient and it concentrates risk: whoever holds the phrase holds both. Write it down on paper, store it somewhere physically safe, and treat it as the single thing that matters.',
    ],
    related: [
      { href: '/features/seed-phrase-accounts', label: 'Seed phrase accounts' },
      { href: '/features/sol-transfers', label: 'SOL transfers' },
    ],
  },
  {
    slug: 'end-to-end-encryption',
    description: 'End-to-end encryption means only sender and recipient can read a message. What the term precisely covers, what it does not, and how to test a provider’s claim.',
    question: 'What is end-to-end encryption (E2EE)?',
    term: 'End-to-end encryption (E2EE)',
    short:
      'End-to-end encryption means only the sender and recipient can read a message; everything in between - including any server - sees only ciphertext.',
    body: [
      'The message is encrypted on the sender’s device and decrypted only on the recipient’s, using keys that never leave those devices. No provider in the middle can read it.',
      'PrivaMesh goes further than typical E2EE apps: because there is no server in the middle at all, the only "ends" that exist are the two devices. It uses X3DH, the Double Ratchet and AES-256-GCM to seal every message.',
      'The term is precise and frequently misused. End-to-end means the keys exist only on the endpoint devices. Encrypted in transit means TLS to a server that then holds plaintext. Encrypted at rest means the provider stores it encrypted with keys the provider also holds. Only the first excludes the provider from reading your messages.',
      'A useful test: if the service can show you your full message history on a new device after you log in with a password, it is not end-to-end encrypted in a meaningful sense, because something other than your device was able to decrypt it. Convenience features and end-to-end encryption pull in opposite directions.',
      'PrivaMesh takes the definition literally. There is no server between the ends at all, so the two devices are the only places keys or plaintext ever exist. X3DH establishes the shared secret, the Double Ratchet derives a fresh key per message, and AES-256-GCM seals the payload with tamper detection.',
    ],
    related: [
      { href: '/features/e2e-encryption', label: 'E2E encryption' },
      { href: '/features/no-servers', label: 'No servers' },
    ],
  },
  {
    slug: 'cover-traffic',
    description: 'Cover traffic mixes decoy messages with real ones so an observer cannot tell when you are actually communicating. Why timing leaks, and what the decoys cost.',
    question: 'What is cover traffic?',
    term: 'Cover traffic',
    short:
      'Cover traffic is decoy messages mixed in with real ones so that an observer cannot tell when you are actually communicating.',
    body: [
      'Even with content encrypted and senders hidden, the timing of your messages can leak your activity pattern. Cover traffic defeats this by producing decoy transactions indistinguishable from real ones.',
      'PrivaMesh uses cover traffic so that timing and frequency analysis on the chain gets no usable signal - an observer cannot separate a genuine send from noise.',
      'Traffic analysis is an old discipline and it does not need message content. Volume and timing alone reveal working hours, time zones, sleep patterns, and the moment something unusual happens. A sudden burst of activity at 3am is information, and encryption does nothing to hide it.',
      'Cover traffic works by ensuring the observable signal is constant regardless of whether you are communicating. Decoy transactions are indistinguishable from real ones - same size, same shape, same kind of destination - so an observer counting activity learns your cover traffic rate rather than your behaviour.',
      'The cost is real and worth stating: decoys consume bandwidth and, on a fee-based transport, a small amount of money to send nothing. That is the price of removing the timing channel, and it is the reason most messengers skip it and accept that their users’ activity patterns are visible.',
    ],
    related: [
      { href: '/features/metadata-protection', label: 'Metadata protection' },
      { href: '/privacy', label: 'Why PrivaMesh is private' },
    ],
  },
  {
    slug: 'serverless-messenger',
    description: 'A serverless messenger routes messages with no central server, so no operator can be breached or subpoenaed. What a server does, and what replaces it.',
    question: 'What is a serverless messenger?',
    term: 'Serverless messenger',
    short:
      'A serverless messenger routes messages without any central server - so there is no operator that can be breached, subpoenaed, or forced to log your activity.',
    body: [
      'Most messengers, even encrypted ones, run servers that see connection metadata and can be compelled to change behavior. A serverless messenger removes that single point of failure entirely.',
      'PrivaMesh is serverless in the literal sense: messages are encrypted blobs in Solana transaction memos, and the only network dependency is a swappable, self-hostable Solana RPC. There is nothing central to attack.',
      'The word needs care because the cloud industry uses it to mean the opposite. In cloud engineering, serverless means the servers are managed by someone else and hidden from you - they exist, they process your data, you simply do not administer them. For a messenger, that is not a privacy property at all.',
      'The literal sense is a much stronger claim, and it can be tested. A genuinely serverless messenger has to answer four questions without a backend: where accounts live, how keys are distributed, how messages are routed, and what holds a message while the recipient is offline. Any app that answers one of them with a company machine is not serverless.',
      'PrivaMesh answers all four without one: accounts are locally generated seed phrases, keys are wallet-signed prekey bundles published on-chain, routing is a zero-value Solana transaction, and the chain itself holds ciphertext until a device fetches it. The trade is a small per-message fee and no server-side features - no cloud sync, no history restore, no account recovery.',
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
