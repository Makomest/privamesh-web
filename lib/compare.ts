import type { CellState } from './data'

export type CompareRow = { feature: string; a: CellState; b: CellState; note?: string }

export type Comparison = {
  slug: string
  competitor: string
  title: string
  description: string
  lead: string
  screenshot: { src: string; alt: string }
  rows: CompareRow[]
  intro: string[]
  strengths: { heading: string; body: string }
  difference: { heading: string; body: string }
  verdict: string
}

export const COMPARISONS: Record<string, Comparison> = {
  'privamesh-vs-signal': {
    slug: 'privamesh-vs-signal',
    competitor: 'Signal',
    title: 'PrivaMesh vs Signal: Serverless vs the Gold Standard',
    description:
      'An honest PrivaMesh vs Signal comparison. Signal is the gold standard, but runs servers and needs a phone number. See the serverless difference.',
    lead: 'Signal set the standard for encrypted messaging. PrivaMesh keeps the cryptography and removes the two things Signal still keeps: servers and your phone number.',
    screenshot: {
      src: '/screenshots/02.png?v=3',
      alt: 'PrivaMesh serverless architecture screen compared with Signal on iPhone',
    },
    rows: [
      {
        feature: 'No servers',
        a: 'yes',
        b: 'no',
        note: 'Signal runs centralized servers; PrivaMesh has none.',
      },
      { feature: 'No phone number required', a: 'yes', b: 'no' },
      { feature: 'End-to-end encryption', a: 'yes', b: 'yes' },
      { feature: 'Forward secrecy', a: 'yes', b: 'yes' },
      {
        feature: 'Metadata protection',
        a: 'yes',
        b: 'partial',
        note: 'Signal has sealed sender; PrivaMesh adds stealth addresses + cover traffic.',
      },
      { feature: 'Built-in payments', a: 'yes', b: 'partial' },
      { feature: 'Open source', a: 'yes', b: 'yes' },
      { feature: 'Self-custodial identity', a: 'yes', b: 'no' },
    ],
    intro: [
      'Let’s be fair up front: Signal is excellent. It is mature, audited, widely trusted, and its Double Ratchet protocol is the reason modern encrypted messaging exists. PrivaMesh uses the same cryptographic ideas. So this is not a story about Signal being insecure - it isn’t. It’s a story about architecture.',
      'The difference is structural. Signal protects the content of your messages beautifully, but it still runs servers and still ties your account to a phone number. PrivaMesh is built so neither of those exists.',
    ],
    strengths: {
      heading: 'What Signal does well',
      body: 'Signal’s encryption is battle-tested and independently audited. It has a huge user base, a polished app on every platform, and years of security research behind it. Sealed sender hides some metadata, and disappearing messages are well implemented. For most people leaving SMS or WhatsApp, Signal is a genuinely great choice, and we’d never pretend otherwise.',
    },
    difference: {
      heading: 'Where PrivaMesh goes further',
      body: 'Signal’s servers still see connection metadata, and its phone-number requirement links your account to your real identity. PrivaMesh has no server to see anything and no phone number to link. Your account is a BIP-39 seed phrase, your messages are encrypted blobs on Solana, and stealth addresses plus cover traffic hide the social graph and timing that Signal’s servers would otherwise handle. There is nothing to subpoena, because there is no company holding your data.',
    },
    verdict:
      'Choose Signal for a mature, mainstream encrypted messenger with the widest reach. Choose PrivaMesh when you want to remove the server and the phone number from the trust equation entirely.',
  },
  'privamesh-vs-telegram': {
    slug: 'privamesh-vs-telegram',
    competitor: 'Telegram',
    title: 'PrivaMesh vs Telegram: Real Privacy vs Popularity',
    description:
      'An honest PrivaMesh vs Telegram comparison. Telegram is popular and feature-rich, but chats aren’t E2E by default and it runs servers. See the difference.',
    lead: 'Telegram is fast, fun and huge. But its cloud chats are not end-to-end encrypted, and everything runs on Telegram’s servers. PrivaMesh is the opposite trade.',
    screenshot: {
      src: '/screenshots/01.png?v=3',
      alt: 'PrivaMesh end-to-end encrypted chat screen compared with Telegram on iPhone',
    },
    rows: [
      { feature: 'No servers', a: 'yes', b: 'no' },
      { feature: 'No phone number required', a: 'yes', b: 'no' },
      {
        feature: 'E2E encryption by default',
        a: 'yes',
        b: 'no',
        note: 'Telegram cloud chats are not E2E; only Secret Chats are.',
      },
      { feature: 'Forward secrecy', a: 'yes', b: 'partial' },
      { feature: 'Metadata protection', a: 'yes', b: 'no' },
      { feature: 'Built-in self-custodial payments', a: 'yes', b: 'partial' },
      {
        feature: 'Fully open source',
        a: 'yes',
        b: 'partial',
        note: 'Telegram clients are open; its server is not.',
      },
      { feature: 'Self-custodial identity', a: 'yes', b: 'no' },
    ],
    intro: [
      'Telegram earned its popularity honestly: it’s fast, the app is packed with features, channels and bots are genuinely useful, and it works everywhere. If you want a lively social messaging platform, Telegram delivers.',
      'But popularity is not privacy. Telegram’s default cloud chats are encrypted in transit and at rest on Telegram’s servers - which means Telegram can technically access them. Only opt-in Secret Chats are end-to-end encrypted. PrivaMesh inverts this: privacy is the default, not a mode you have to remember to switch on.',
    ],
    strengths: {
      heading: 'What Telegram does well',
      body: 'Telegram’s user experience is excellent - huge group chats, channels, bots, cloud sync across every device, and a snappy interface. Its client apps are open source. For broadcasting, communities, and convenience-first messaging, it’s hard to beat, and it never pretends to be a maximum-privacy tool.',
    },
    difference: {
      heading: 'Where PrivaMesh goes further',
      body: 'PrivaMesh is end-to-end encrypted by default on every message, with no cloud copy on anyone’s server, because there is no server. There is no phone number, the account is a self-custodial seed phrase, and stealth addresses plus cover traffic hide metadata that Telegram’s infrastructure necessarily sees. The trade-off is reach and convenience - PrivaMesh is a focused iOS privacy tool, not a mass social platform.',
    },
    verdict:
      'Choose Telegram for reach, communities and convenience. Choose PrivaMesh when default end-to-end encryption, no servers and no phone number matter more than cloud sync and huge groups.',
  },
  'privamesh-vs-session': {
    slug: 'privamesh-vs-session',
    competitor: 'Session',
    title: 'PrivaMesh vs Session: Two Serverless Privacy Approaches',
    description:
      'PrivaMesh vs Session: both drop phone numbers and decentralize, but differently. See onion routing vs on-chain messaging, compared honestly.',
    lead: 'Session and PrivaMesh share a goal - private messaging without a phone number or a central company. They reach it differently: onion routing versus the Solana blockchain.',
    screenshot: {
      src: '/screenshots/03.png?v=3',
      alt: 'PrivaMesh add contact by nickname screen compared with Session on iPhone',
    },
    rows: [
      { feature: 'No phone number required', a: 'yes', b: 'yes' },
      {
        feature: 'No central server',
        a: 'yes',
        b: 'yes',
        note: 'Session uses a node network; PrivaMesh uses Solana.',
      },
      { feature: 'E2E encryption', a: 'yes', b: 'yes' },
      {
        feature: 'Forward secrecy',
        a: 'yes',
        b: 'partial',
        note: 'Session dropped the ratchet for its onion model; PrivaMesh keeps the Double Ratchet.',
      },
      { feature: 'Metadata protection', a: 'yes', b: 'yes' },
      { feature: 'Built-in payments', a: 'yes', b: 'no' },
      { feature: 'Open source', a: 'yes', b: 'yes' },
      { feature: 'Verifiable public transport', a: 'yes', b: 'partial' },
    ],
    intro: [
      'Session is the closest thing to a natural comparison for PrivaMesh: it also ditches phone numbers, also decentralizes, and also takes metadata seriously. If you’re weighing PrivaMesh, you should absolutely look at Session too.',
      'The core difference is the transport. Session routes messages through its own network of nodes using onion routing. PrivaMesh uses the Solana blockchain as a public, verifiable transport, and keeps the Double Ratchet for per-message forward secrecy.',
    ],
    strengths: {
      heading: 'What Session does well',
      body: 'Session pioneered mainstream phone-number-free messaging with strong metadata protection via onion routing over its service-node network. It’s open source, cross-platform, and has a clear, privacy-first mission. Routing through nodes rather than a blockchain avoids per-message network fees, which some users will prefer.',
    },
    difference: {
      heading: 'Where PrivaMesh differs',
      body: 'PrivaMesh keeps the Double Ratchet for full forward secrecy and post-compromise security per message, where Session traded the ratchet away for its routing model. PrivaMesh’s transport is the public Solana chain - auditable by anyone, with no dependency on a bespoke node network - and identity is a self-custodial keypair that doubles as a wallet, enabling in-chat SOL payments Session doesn’t offer. The cost: a small SOL fee per message.',
    },
    verdict:
      'Both are serious privacy messengers with no phone number. Choose Session for fee-free onion-routed messaging; choose PrivaMesh for per-message forward secrecy, a public verifiable transport, and a built-in self-custodial wallet.',
  },
}

export const COMPARE_SLUGS = Object.keys(COMPARISONS)
