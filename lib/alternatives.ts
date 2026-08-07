import type { FaqItem } from './faq'

export type AltRow = {
  feature: string
  /** What PrivaMesh does. */
  privamesh: string
  /** What the competitor does. Written to be fair, not flattering to us. */
  competitor: string
}

export type Alternative = {
  slug: string
  name: string
  /** One line on what the competitor is (fair framing). */
  what: string
  /** 2-3 paragraphs: why PrivaMesh is a strong alternative, honestly. */
  body: string[]
  /** What the competitor genuinely does well. Stated before any criticism. */
  keeps: { heading: string; body: string }
  /** The specific gap PrivaMesh addresses - not a general smear. */
  gap: { heading: string; body: string }
  /** Side-by-side rows. Short text, not checkmarks - the nuance is the point. */
  rows: AltRow[]
  /** Reasons to move. */
  switchIf: string[]
  /** Reasons to stay put. Kept honest on purpose: most people should stay. */
  stayIf: string[]
  faq: FaqItem[]
  /** Optional matching /compare page for a full table. */
  comparePath?: string
}

const PM_ACCOUNT = 'BIP-39 seed phrase, generated on your device'
const PM_TRANSPORT = 'Encrypted blobs in Solana transaction memos'
const PM_METADATA = 'One-time addresses, cover traffic, fixed-size padding'
const PM_KEYS = 'Device-only, in the iOS Keychain behind Face ID'

export const ALTERNATIVES: Alternative[] = [
  {
    slug: 'signal',
    name: 'Signal',
    what: 'Signal is the gold-standard encrypted messenger, trusted and audited - but it runs servers and requires a phone number.',
    body: [
      'If you love Signal’s encryption but want to drop the two things it keeps - servers and a phone number - PrivaMesh is the alternative. It uses the same cryptographic ideas (X3DH, Double Ratchet, AES-256-GCM) with no server in the middle and no phone number to tie to your identity.',
      'Your account is a self-custodial seed phrase, messages are encrypted blobs on Solana, and stealth addresses plus cover traffic hide the metadata Signal’s servers would otherwise handle. There is nothing to subpoena because no company holds your data.',
    ],
    keeps: {
      heading: 'What Signal gets right',
      body: 'Signal’s protocol is the reference implementation of modern messaging cryptography - independently audited, open source, and the basis for what WhatsApp and others adopted. It has an enormous user base, works on every platform, and sealed sender already hides part of the metadata picture. Signal is a genuinely excellent messenger and we would not pretend otherwise.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'Signal still requires a phone number to register. Usernames, added in 2024, hide that number from the people you talk to, but it remains the identifier tied to your account and your carrier. Signal also runs servers, and servers see connection metadata - who connected, from where, and when - which is exactly the data that surveillance operates on. PrivaMesh removes both: there is no registration identifier and no server to observe anything.',
    },
    rows: [
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Phone number required to register',
      },
      {
        feature: 'Servers in the path',
        privamesh: 'None - no PrivaMesh backend exists',
        competitor: 'Signal-operated servers',
      },
      {
        feature: 'Message transport',
        privamesh: PM_TRANSPORT,
        competitor: 'Signal servers over TLS',
      },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Sealed sender hides some of it',
      },
      {
        feature: 'Forward secrecy',
        privamesh: 'Double Ratchet, per message',
        competitor: 'Double Ratchet, per message',
      },
      {
        feature: 'Platforms',
        privamesh: 'iOS only',
        competitor: 'iOS, Android, desktop, mature',
      },
    ],
    switchIf: [
      'Handing over a phone number to register is the part you object to',
      'You want no company able to receive a subpoena for your metadata',
      'You want your identity to be a key you generate, not an account you register',
      'You want in-chat payments tied to the same self-custodial key',
    ],
    stayIf: [
      'You need Android, desktop, or a mature cross-platform app today',
      'The people you message are already on Signal and will not move',
      'You want a messenger with years of independent audit history behind it',
    ],
    faq: [
      {
        q: 'Is PrivaMesh more secure than Signal?',
        a: 'On message content the two are comparable - PrivaMesh uses the same X3DH and Double Ratchet building blocks Signal pioneered. The difference is metadata and identity: Signal needs a phone number and runs servers that see connection data, and PrivaMesh has neither.',
      },
      {
        q: 'Does Signal require a phone number?',
        a: 'Yes. Usernames let you hide your number from other users, but a phone number is still required to create an account. PrivaMesh has no registration step at all - your account is a seed phrase generated on your device.',
      },
      {
        q: 'Can I use PrivaMesh on Android or desktop?',
        a: 'Not today. PrivaMesh is iOS-only, where Signal is mature on every platform. If cross-platform matters more than removing the server, Signal is the better choice right now.',
      },
      {
        q: 'What does Signal do that PrivaMesh does not?',
        a: 'Voice and video calls, group features at scale, cross-platform clients, and a long public audit record. PrivaMesh is a focused privacy tool, not a Signal replacement on features.',
      },
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
    keeps: {
      heading: 'What Telegram gets right',
      body: 'Telegram’s product is excellent: enormous group chats, channels, bots, instant cloud sync across every device you own, and an interface that stays fast under load. Its client apps are open source. For communities, broadcasting and convenience-first messaging it is hard to beat, and Telegram has never marketed itself as a maximum-privacy tool.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'Telegram’s default cloud chats are encrypted in transit and at rest, but not end-to-end - Telegram holds keys that can decrypt them, which is what makes cloud sync possible. End-to-end encryption exists only in Secret Chats, which are opt-in, one-to-one, and tied to a single device. PrivaMesh makes end-to-end encryption the only mode, at the cost of the cloud sync that made Telegram convenient.',
    },
    rows: [
      {
        feature: 'Default encryption',
        privamesh: 'End-to-end on every message',
        competitor: 'Cloud chats are not end-to-end encrypted',
      },
      {
        feature: 'End-to-end option',
        privamesh: 'Always on, no setting',
        competitor: 'Secret Chats: opt-in, 1:1, single device',
      },
      { feature: 'Account identity', privamesh: PM_ACCOUNT, competitor: 'Phone number required' },
      {
        feature: 'Message storage',
        privamesh: 'On your device only',
        competitor: 'Telegram cloud, synced across devices',
      },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Server sees contacts, timing, activity',
      },
      {
        feature: 'Groups and channels',
        privamesh: 'Small private chats',
        competitor: 'Huge groups, channels, bots',
      },
    ],
    switchIf: [
      'You assumed your Telegram chats were end-to-end encrypted and want that to be true',
      'You do not want a company holding a decryptable copy of your history',
      'You want to message without a phone number',
      'Metadata - who you talk to and when - matters as much to you as content',
    ],
    stayIf: [
      'You rely on channels, big groups, or bots',
      'Cloud sync across phone, tablet and desktop is the feature you use most',
      'Your communities live on Telegram and are not moving',
    ],
    faq: [
      {
        q: 'Is Telegram end-to-end encrypted?',
        a: 'Not by default. Regular cloud chats are encrypted in transit and at rest but Telegram can decrypt them, which is how cloud sync works. Only Secret Chats are end-to-end encrypted, and they are opt-in, one-to-one and tied to one device.',
      },
      {
        q: 'Why does Telegram need my phone number?',
        a: 'It is the account identifier and how the contact graph is built. PrivaMesh has no identifier to hand over - your account is a seed phrase you generate on your own device.',
      },
      {
        q: 'What do I lose switching from Telegram to PrivaMesh?',
        a: 'Reach and convenience. No channels, no massive groups, no bots, and no cloud sync - your history lives on your device only. PrivaMesh is a focused iOS privacy tool, not a social platform.',
      },
      {
        q: 'Can PrivaMesh sync my chats to another device?',
        a: 'No, and that is deliberate. Sync requires someone to hold a decryptable copy. Forward secrecy also means old message keys are destroyed after use, so even your own seed phrase cannot restore past messages.',
      },
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
    keeps: {
      heading: 'What WhatsApp gets right',
      body: 'WhatsApp made end-to-end encryption normal for billions of people, using the same Signal Protocol that secures Signal itself. Message content really is encrypted by default, the app is reliable, and it is the practical default for international messaging in much of the world. Getting end-to-end encryption to that scale was a genuine public good.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'Encryption protects what you say, not who you say it to. WhatsApp is tied to your phone number, keeps your contact graph, and records when and how often you message - metadata that flows inside Meta’s wider business. Optional cloud backups can also store chat history outside the encrypted channel. PrivaMesh has no parent company, no phone number and no backup: the metadata is not protected by policy, it simply is not produced.',
    },
    rows: [
      {
        feature: 'Content encryption',
        privamesh: 'End-to-end, Double Ratchet',
        competitor: 'End-to-end, Signal Protocol',
      },
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Phone number, tied to your carrier',
      },
      { feature: 'Company behind it', privamesh: 'No company holds anything', competitor: 'Meta' },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Contact graph and timing retained',
      },
      {
        feature: 'Chat backups',
        privamesh: 'None - forward secrecy deletes old keys',
        competitor: 'Optional iCloud or Google Drive backup',
      },
      {
        feature: 'Reach',
        privamesh: 'iOS only',
        competitor: 'Billions of users, every platform',
      },
    ],
    switchIf: [
      'You trust the encryption but not the company holding the metadata',
      'You do not want your messaging identity tied to your phone number and carrier',
      'You want no cloud backup of your history to exist anywhere',
      'You want who-you-talk-to hidden, not just what you say',
    ],
    stayIf: [
      'Everyone you need to reach is on WhatsApp',
      'You need voice and video calling',
      'You want a mature app on Android and desktop today',
    ],
    faq: [
      {
        q: 'Is WhatsApp actually end-to-end encrypted?',
        a: 'Yes, message content is, using the Signal Protocol. The concern is not the encryption - it is the phone number requirement, the contact graph, and the timing metadata that Meta retains around those encrypted messages.',
      },
      {
        q: 'What metadata does WhatsApp collect?',
        a: 'It knows your phone number, your contacts, who you message, when, and how often, along with device and network information. Encryption hides the content of those messages, not the pattern of them.',
      },
      {
        q: 'Are WhatsApp backups encrypted?',
        a: 'Backups to iCloud or Google Drive are optional and can be end-to-end encrypted if you turn that on, but it is a setting rather than the default. PrivaMesh has no backup at all - forward secrecy destroys old message keys, so history cannot be restored.',
      },
      {
        q: 'Can I use PrivaMesh without giving up WhatsApp?',
        a: 'Yes, and for most people that is the realistic path. Keep WhatsApp for reach and use PrivaMesh for the conversations where metadata matters.',
      },
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
    keeps: {
      heading: 'What Session gets right',
      body: 'Session pioneered mainstream messaging with no phone number and no user identifier, years before it was fashionable. Its onion routing over a service-node network gives real metadata protection, it is open source and cross-platform, and routing through nodes rather than a blockchain means there are no per-message fees. It is a serious privacy tool with a clear mission.',
    },
    gap: {
      heading: 'Where PrivaMesh differs',
      body: 'This is a difference of design, not of seriousness. Session replaced the Signal-style ratchet with its own protocol, trading per-message forward secrecy for compatibility with its routing and multi-device model. PrivaMesh keeps the Double Ratchet, so a leaked key still cannot unlock past messages. The transports differ too: Session depends on its own service-node network, while PrivaMesh rides a public chain anyone can audit and no one operates.',
    },
    rows: [
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Random Session ID, no phone number',
      },
      {
        feature: 'Transport',
        privamesh: PM_TRANSPORT,
        competitor: 'Onion routing over service nodes',
      },
      {
        feature: 'Forward secrecy',
        privamesh: 'Double Ratchet, per message',
        competitor: 'Traded away with the Session Protocol',
      },
      {
        feature: 'Who runs the network',
        privamesh: 'Public Solana chain, swappable RPC',
        competitor: 'Session service-node network',
      },
      {
        feature: 'Cost per message',
        privamesh: 'A fraction of a cent in network fees',
        competitor: 'Free',
      },
      {
        feature: 'Built-in wallet',
        privamesh: 'Yes - in-chat SOL transfers',
        competitor: 'No',
      },
    ],
    switchIf: [
      'Per-message forward secrecy is a requirement, not a nice-to-have',
      'You would rather audit a public chain than trust a bespoke node network',
      'You want your identity to double as a self-custodial wallet',
      'In-chat payments are useful to you',
    ],
    stayIf: [
      'You do not want to pay any per-message network fee',
      'You need Android or desktop clients today',
      'Onion routing is the metadata model you specifically trust',
    ],
    faq: [
      {
        q: 'Does Session have forward secrecy?',
        a: 'Not per message. Session replaced the Signal-style ratchet with its own protocol to fit its routing and multi-device model, trading forward secrecy away. PrivaMesh keeps the Double Ratchet, so a key leaked today cannot unlock yesterday’s messages.',
      },
      {
        q: 'Is a blockchain transport better than onion routing?',
        a: 'It is a different trade. A public chain is auditable by anyone and depends on no bespoke network, but it costs a small fee per message and writes an encrypted record that persists. Onion routing is free and leaves nothing behind, but you depend on the node network behaving.',
      },
      {
        q: 'Do both avoid phone numbers?',
        a: 'Yes. Session uses a random Session ID and PrivaMesh uses a BIP-39 seed phrase. Neither asks for a phone number or an email.',
      },
      {
        q: 'What does PrivaMesh add that Session does not have?',
        a: 'Per-message forward secrecy, a public verifiable transport, and a built-in self-custodial wallet for in-chat SOL transfers. Session in turn has fee-free messaging and cross-platform clients today.',
      },
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
    keeps: {
      heading: 'What Threema gets right',
      body: 'Threema solved the identity problem years ahead of the field: you get a random Threema ID and no phone number or email is required. It is Swiss, subject to Swiss data protection law, its client apps are open source, and paying for the app rather than being the product is a genuinely healthier model. On identity, Threema and PrivaMesh want the same thing.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'Threema removes the identifier but not the server. Its infrastructure is still operated by one company in one jurisdiction, and while the clients are open source, you cannot verify what the servers do - you trust the operator and the law that binds them. PrivaMesh removes the operator from the equation: there is no backend to audit, subpoena, or compel, because there is not one.',
    },
    rows: [
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Random Threema ID, no phone number',
      },
      {
        feature: 'Servers in the path',
        privamesh: 'None',
        competitor: 'Threema-operated, in Switzerland',
      },
      {
        feature: 'What you can verify',
        privamesh: 'Transport and clients are public',
        competitor: 'Clients open source, servers are not',
      },
      {
        feature: 'Jurisdiction',
        privamesh: 'No operator to have one',
        competitor: 'Switzerland',
      },
      {
        feature: 'Cost model',
        privamesh: 'Free app, per-message network fee',
        competitor: 'One-off app purchase',
      },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Minimised by policy, server still routes',
      },
    ],
    switchIf: [
      'You want no operator to trust, not a well-behaved one',
      'You want to verify the transport yourself rather than rely on jurisdiction',
      'You want the metadata not to exist rather than be minimised by policy',
      'A self-custodial key that doubles as a wallet appeals to you',
    ],
    stayIf: [
      'You are satisfied that Swiss law and Threema’s policies are a sound basis for trust',
      'You need Android or desktop clients',
      'You prefer a one-off purchase to per-message network fees',
    ],
    faq: [
      {
        q: 'Threema already has no phone number - why switch?',
        a: 'Identity is only half the problem. Threema still routes your messages through servers it operates, so you trust a company and a jurisdiction. PrivaMesh has no server in the path, so there is no operator to trust in the first place.',
      },
      {
        q: 'Is Threema open source?',
        a: 'The client apps are. The server side is not, so the part that handles routing and metadata is the part you cannot inspect. PrivaMesh’s transport is a public chain, which anyone can audit directly.',
      },
      {
        q: 'Does Swiss jurisdiction protect Threema users?',
        a: 'Swiss data protection law is strong and it genuinely helps. But it is a legal guarantee rather than a technical one - it depends on the law staying as it is. PrivaMesh aims for a guarantee that does not depend on a jurisdiction.',
      },
      {
        q: 'Which costs more, Threema or PrivaMesh?',
        a: 'Threema is a one-off app purchase. PrivaMesh is free to install but each message costs a fraction of a cent in Solana network fees. Which works out cheaper depends entirely on how much you message.',
      },
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
    keeps: {
      heading: 'What SimpleX gets right',
      body: 'SimpleX has arguably the most rigorous identity model in the field: there is no user identifier at all, not even a random one, because contacts connect through one-time invitation links to unidirectional message queues. It has double-ratchet forward secrecy, the relays are self-hostable, it is open source, and there are no per-message fees. On privacy design, SimpleX is a serious peer.',
    },
    gap: {
      heading: 'Where PrivaMesh differs',
      body: 'The honest answer is that these are two good designs solving the same problem differently. SimpleX relies on relay servers - self-hostable, which is the point, but somebody still runs them and availability depends on them. PrivaMesh uses a public chain nobody operates, adds wallet-signed on-chain key discovery so contact verification needs no directory, and folds a self-custodial wallet into the same key. The cost is a per-message network fee and a permanent encrypted record on-chain.',
    },
    rows: [
      {
        feature: 'User identifier',
        privamesh: 'One-time addresses per message',
        competitor: 'None at all - queue-based connections',
      },
      {
        feature: 'Transport',
        privamesh: PM_TRANSPORT,
        competitor: 'Message-queue relay servers',
      },
      {
        feature: 'Who runs it',
        privamesh: 'Public chain, swappable RPC',
        competitor: 'SimpleX relays, self-hostable',
      },
      {
        feature: 'Forward secrecy',
        privamesh: 'Double Ratchet, per message',
        competitor: 'Double Ratchet, per message',
      },
      { feature: 'Cost per message', privamesh: 'A fraction of a cent', competitor: 'Free' },
      {
        feature: 'Built-in wallet',
        privamesh: 'Yes - in-chat SOL transfers',
        competitor: 'No',
      },
    ],
    switchIf: [
      'You want a transport nobody has to operate or host',
      'On-chain, wallet-signed key discovery beats exchanging invitation links for you',
      'You want a self-custodial wallet in the same app and the same key',
      'You are on iOS and want the payments side',
    ],
    stayIf: [
      'You want zero per-message cost',
      'You would rather self-host your own relays than write to a public chain',
      'You need Android or desktop clients today',
      'A permanent on-chain encrypted record is not something you want to create',
    ],
    faq: [
      {
        q: 'Is SimpleX or PrivaMesh more private?',
        a: 'Both remove user identifiers and both have per-message forward secrecy. SimpleX has the stronger claim on identity - there is no identifier at all. PrivaMesh has the stronger claim on infrastructure - there is no server anyone has to run. Which matters more depends on your threat model.',
      },
      {
        q: 'What is the real difference in transport?',
        a: 'SimpleX routes through message-queue relays that you can self-host. PrivaMesh writes encrypted blobs into Solana transaction memos, so the transport is public and auditable but nobody operates it and each message costs a small fee.',
      },
      {
        q: 'Does writing messages on-chain create a permanent record?',
        a: 'Yes - an encrypted, padded blob addressed to a one-time address. Content is unreadable and the addresses cannot be clustered into a conversation, but the ciphertext does persist. SimpleX leaves nothing behind, which some threat models will prefer.',
      },
      {
        q: 'How do I verify a contact’s keys?',
        a: 'PrivaMesh publishes wallet-signed prekey bundles to an on-chain registry, so you verify a signature rather than trust a directory. SimpleX uses one-time invitation links exchanged out of band.',
      },
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
    keeps: {
      heading: 'What iMessage gets right',
      body: 'iMessage is end-to-end encrypted between Apple devices, requires no setup, and is simply there on every iPhone. Apple has invested seriously in the platform - Advanced Data Protection extends end-to-end encryption to iCloud backups, and contact key verification lets you check you are talking to the right device. For an app most people never think about, the security engineering is real.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'iMessage ties your conversations to an Apple ID and, in practice, a phone number - one identity, held by one company, across every service you use. Advanced Data Protection fixes the backup problem, but it is off by default, so most people’s message history sits in iCloud in a form Apple can access. And anything sent to a non-Apple device falls back to SMS with no encryption at all. PrivaMesh has no account, no backup, and no fallback path.',
    },
    rows: [
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Apple ID, usually plus a phone number',
      },
      {
        feature: 'Encryption coverage',
        privamesh: 'Every message, no exceptions',
        competitor: 'Apple-to-Apple only; SMS fallback is plaintext',
      },
      {
        feature: 'Backups',
        privamesh: 'None - old keys are destroyed',
        competitor: 'iCloud; end-to-end only with Advanced Data Protection on',
      },
      { feature: 'Company behind it', privamesh: 'No company holds anything', competitor: 'Apple' },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Apple sees routing and timing',
      },
      { feature: 'Key storage', privamesh: PM_KEYS, competitor: 'Device keys, tied to your Apple ID' },
    ],
    switchIf: [
      'You do not want your messaging identity to be the same Apple ID as everything else',
      'You want no cloud copy of your history under any setting',
      'The silent SMS fallback to green bubbles bothers you',
      'You want metadata hidden, not just content encrypted',
    ],
    stayIf: [
      'Everyone you message is already on an iPhone',
      'You want zero setup and something that just works',
      'You have Advanced Data Protection on and are satisfied with that',
    ],
    faq: [
      {
        q: 'Is iMessage end-to-end encrypted?',
        a: 'Between Apple devices, yes. Messages to non-Apple devices fall back to SMS, which has no encryption at all. PrivaMesh has no fallback path - every message is end-to-end encrypted or it is not sent.',
      },
      {
        q: 'Can Apple read my iMessages?',
        a: 'Not in transit. But if iCloud Backup is on without Advanced Data Protection, a copy of your message history sits in iCloud in a form Apple can access. Advanced Data Protection closes that gap and is worth enabling - it is just not the default.',
      },
      {
        q: 'Does PrivaMesh back up my chats?',
        a: 'No, deliberately. Forward secrecy destroys each message key after use, so no backup can exist - your seed phrase restores your identity and funds but never your history.',
      },
      {
        q: 'Do I need to leave iMessage to use PrivaMesh?',
        a: 'No. Most people should keep iMessage for everyday use and reach for PrivaMesh on the conversations where the metadata matters.',
      },
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
    keeps: {
      heading: 'What Wickr gets right',
      body: 'Wickr built a genuinely strong encrypted messenger with per-message keys, ephemeral messaging and detailed administrative controls, and it earned real trust in enterprise and government deployments. AWS Wickr continues to serve that market well. For an organisation that needs audited, compliant, centrally managed secure messaging, it is a credible product.',
    },
    gap: {
      heading: 'The gap PrivaMesh closes',
      body: 'The free consumer product, Wickr Me, was shut down at the end of 2023, so individuals looking for a Wickr alternative no longer have one from Amazon. What remains is an enterprise service on Amazon infrastructure with an organisational account behind it. That is the right shape for a company and the wrong shape for a person who wants no operator at all. PrivaMesh is built for the individual case: no account, no administrator, no infrastructure owner.',
    },
    rows: [
      {
        feature: 'Consumer product',
        privamesh: 'Yes - built for individuals',
        competitor: 'Wickr Me shut down at the end of 2023',
      },
      {
        feature: 'Account identity',
        privamesh: PM_ACCOUNT,
        competitor: 'Organisational account, admin-managed',
      },
      {
        feature: 'Infrastructure',
        privamesh: 'None - no backend exists',
        competitor: 'Amazon Web Services',
      },
      {
        feature: 'Who controls access',
        privamesh: 'You hold the only key',
        competitor: 'Your organisation’s administrator',
      },
      {
        feature: 'Metadata handling',
        privamesh: PM_METADATA,
        competitor: 'Service handles routing and retention policy',
      },
      {
        feature: 'Best suited to',
        privamesh: 'Individuals wanting no operator',
        competitor: 'Enterprise and government compliance',
      },
    ],
    switchIf: [
      'You used Wickr Me and need a consumer replacement',
      'You do not want private messaging routed through big-tech infrastructure',
      'You want no administrator with visibility or control over your account',
      'You want an identity you generate rather than one issued to you',
    ],
    stayIf: [
      'You need centrally managed, compliant messaging for an organisation',
      'Administrative controls and retention policies are a requirement, not a problem',
      'You need cross-platform clients and enterprise support',
    ],
    faq: [
      {
        q: 'Is Wickr Me still available?',
        a: 'No. Amazon shut down the free consumer app, Wickr Me, at the end of 2023. AWS Wickr continues as an enterprise and government service, which is why former Wickr Me users are looking for an individual alternative.',
      },
      {
        q: 'What is the best Wickr alternative for personal use?',
        a: 'It depends on what you valued. For mainstream reach, Signal. For no operator at all, PrivaMesh: no organisational account, no administrator, and no company infrastructure carrying your messages.',
      },
      {
        q: 'Is PrivaMesh suitable for a company?',
        a: 'Not today. There are no administrative controls, no compliance tooling and no retention policy, because there is no operator to enforce any of them. If you need those, AWS Wickr is the better fit.',
      },
      {
        q: 'Who can see my PrivaMesh messages?',
        a: 'Only you and the person you are messaging. There is no administrator, no operator and no company - keys live in your device’s Keychain and messages are encrypted blobs nobody else can read.',
      },
    ],
  },
]

export function getAlternative(slug: string) {
  return ALTERNATIVES.find((a) => a.slug === slug)
}
