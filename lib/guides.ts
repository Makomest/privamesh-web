export type Guide = {
  slug: string
  title: string // <60 chars, the target keyword
  description: string // <155
  h1: string
  lead: string
  eyebrow: string
  sections: { h2: string; paras: string[] }[]
  faq: { q: string; a: string }[]
  related: { href: string; label: string; blurb: string }[]
}

const R = {
  noServers: {
    href: '/features/no-servers',
    label: 'No servers',
    blurb: 'The serverless architecture behind PrivaMesh.',
  },
  seed: {
    href: '/features/seed-phrase-accounts',
    label: 'Seed phrase accounts',
    blurb: 'No phone, no email — a BIP-39 account you control.',
  },
  meta: {
    href: '/features/metadata-protection',
    label: 'Metadata protection',
    blurb: 'Stealth addresses, cover traffic, gas wallet.',
  },
  e2e: {
    href: '/features/e2e-encryption',
    label: 'E2E encryption',
    blurb: 'X3DH, Double Ratchet, AES-256-GCM in plain English.',
  },
  privacy: {
    href: '/privacy',
    label: 'Why PrivaMesh is private',
    blurb: 'The full case for the most private messenger.',
  },
  best: {
    href: '/best-private-messaging-apps',
    label: 'Best private messaging apps 2026',
    blurb: 'The honest ranked guide.',
  },
  sol: {
    href: '/features/sol-transfers',
    label: 'Send SOL in chat',
    blurb: 'In-chat payments and on-chain identity.',
  },
}

export const GUIDES: Guide[] = [
  {
    slug: 'private-messaging-app-without-phone-number',
    title: 'Private Messaging App Without a Phone Number',
    description:
      'How to use a private messaging app with no phone number in 2026. Your account is a seed phrase, not a SIM — here is how it works and why it matters.',
    h1: 'The private messaging app without a phone number',
    eyebrow: 'Guide',
    lead: 'Every mainstream messenger asks for your number. Here is how to message privately without one — and why a phone number is the weakest link in "anonymous" chat.',
    sections: [
      {
        h2: 'Why a phone number breaks your privacy',
        paras: [
          'The moment an app requires your phone number, your "anonymous" account is welded to your legal identity, your carrier, and often your name on file. A leak, a subpoena, or a data-sharing deal exposes the link. No amount of message encryption fixes that — the identity was surrendered at sign-up.',
          'A truly private messaging app should let you create an account out of math you generate yourself, not an identifier a carrier issued you.',
        ],
      },
      {
        h2: 'How accounts work without a phone number',
        paras: [
          'PrivaMesh replaces the phone number with a BIP-39 seed phrase — the same standard self-custodial crypto wallets use. The phrase derives a keypair on your device; that keypair is your identity. There is no phone number, no email, and no account stored on any server.',
          'Keys live in the iOS Keychain, device-only and biometric-lockable. To find and verify contacts without a trusted directory, PrivaMesh publishes wallet-signed prekey bundles on-chain, so you verify a contact cryptographically instead of trusting a key server.',
        ],
      },
      {
        h2: 'The honest trade-off',
        paras: [
          'Self-custody means real control and real responsibility: lose your seed phrase and your device, and there is no "forgot password" — nobody else ever held it. Write the phrase down and store it safely. That is the one job a no-phone-number account asks of you.',
        ],
      },
    ],
    faq: [
      {
        q: 'Which messaging apps work without a phone number?',
        a: 'PrivaMesh, Session, SimpleX and Threema all work without a phone number. PrivaMesh goes furthest: your account is a BIP-39 seed phrase with no server-side account at all — no phone, no email.',
      },
      {
        q: 'Is a messaging app without a phone number safe?',
        a: 'Yes, and often safer — there is no phone number to tie your account to your identity, leak, or subpoena. Security depends on keeping your seed phrase safe, since it is the account.',
      },
    ],
    related: [R.seed, R.privacy, R.best],
  },
  {
    slug: 'most-private-messaging-app-2026',
    title: 'The Most Private Messaging App in 2026',
    description:
      'What makes a messaging app truly private in 2026 — and which one goes furthest. No servers, no phone number, no metadata, forward secrecy, compared honestly.',
    h1: 'The most private messaging app in 2026',
    eyebrow: 'Guide',
    lead: 'Privacy is an architecture, not a feature. Here is the standard a messaging app has to meet in 2026 to be called truly private — and how far the leaders actually go.',
    sections: [
      {
        h2: 'The three layers of private messaging',
        paras: [
          'Content: end-to-end encryption so only you and your contact can read messages. Nearly every serious app does this now.',
          'Identity: no phone number or email tying the account to you. Fewer apps clear this bar.',
          'Metadata and infrastructure: hiding who talks to whom and when, and removing the central server that can be breached or subpoenaed. This is the hardest layer, and where most "private" apps quietly fall short.',
        ],
      },
      {
        h2: 'Why serverless wins the top spot',
        paras: [
          'Even excellent apps like Signal run servers and require a phone number, so they protect content better than metadata or identity. An app with no server at all removes the single point that can leak connection metadata or be compelled to change behavior.',
          'PrivaMesh stores messages as encrypted blobs on Solana, uses a seed phrase instead of a phone number, and hides metadata with stealth addresses and cover traffic — clearing all three layers.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the most private messaging app right now?',
        a: 'By architecture, PrivaMesh — no servers, no phone number, no metadata collection, with forward secrecy by default. Signal is the most private mainstream choice but still runs servers and needs a phone number.',
      },
    ],
    related: [R.privacy, R.noServers, R.best],
  },
  {
    slug: 'anonymous-messaging-app',
    title: 'Anonymous Messaging App: How Anonymity Works',
    description:
      'What a genuinely anonymous messaging app requires: no phone number, no email, no server-side account, and hidden metadata. Here is how it actually works.',
    h1: 'What makes a messaging app anonymous',
    eyebrow: 'Guide',
    lead: 'Most "anonymous" apps still know your phone number and your social graph. Real anonymity needs more than a hidden username — here is the checklist.',
    sections: [
      {
        h2: 'Anonymous means no identifier and no graph',
        paras: [
          'True anonymity has two parts. First, no identifier ties the account to you — no phone number, no email, no server-side profile. Second, the network cannot reconstruct your social graph: who you message and how often.',
          'An app can hide your name and still expose that address A messaged address B every night — that pattern alone de-anonymizes you. So metadata protection is as important as identity.',
        ],
      },
      {
        h2: 'How PrivaMesh delivers both',
        paras: [
          'Your account is a seed phrase, so there is no identifier to collect. Every message goes to a fresh one-time stealth address, so the chain never records who talks to whom. Cover traffic hides timing, and a throwaway gas wallet hides who pays the fee.',
          'Anonymity still depends on good funding hygiene: if you fund your gas wallet from an exchange tied to your identity, you create a link the app cannot erase. Practice matters.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is any messaging app truly anonymous?',
        a: 'Apps like PrivaMesh get very close: no phone number, no email, no server account, and on-chain metadata protection via stealth addresses and cover traffic. Full anonymity also depends on your own operational hygiene.',
      },
    ],
    related: [R.seed, R.meta, R.privacy],
  },
  {
    slug: 'decentralized-messaging-app',
    title: 'Decentralized Messaging App Explained',
    description:
      'What a decentralized messaging app is, how it removes the central server, and why that matters for privacy. Plain-English guide with real examples.',
    h1: 'What is a decentralized messaging app?',
    eyebrow: 'Guide',
    lead: 'Decentralized messaging removes the company in the middle. Here is what that actually means, how the approaches differ, and why it changes your privacy.',
    sections: [
      {
        h2: 'Centralized vs decentralized',
        paras: [
          'A centralized messenger routes everything through servers the company owns. Those servers see connection metadata and can be breached, subpoenaed, or shut down. A decentralized messenger removes that single point of control.',
          'Approaches differ: some use peer-to-peer or onion-routed node networks; PrivaMesh uses a public blockchain (Solana) as the transport, so there is no bespoke node network to maintain and the record is publicly verifiable.',
        ],
      },
      {
        h2: 'Why it matters',
        paras: [
          'With no central server, there is nothing to breach, nothing to subpoena, and nothing to shut down. Your keys, contacts and history stay on your device; messages are encrypted blobs on-chain. The trade-off with an on-chain transport is a small network fee per message.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is a decentralized messaging app more private?',
        a: 'It removes the central server that is the biggest privacy risk in most messengers. Combined with encryption and metadata protection, that makes apps like PrivaMesh substantially more private than server-based ones.',
      },
    ],
    related: [R.noServers, R.privacy, R.best],
  },
  {
    slug: 'blockchain-messaging-app',
    title: 'Blockchain Messaging App: How On-Chain Chat Works',
    description:
      'How a blockchain messaging app works: encrypted messages in Solana transaction memos, read via stealth addresses. Private on a public chain, explained.',
    h1: 'How a blockchain messaging app works',
    eyebrow: 'Guide',
    lead: 'Putting messages on a public blockchain sounds like the opposite of private. Done right, it is the opposite — here is how on-chain messaging stays confidential.',
    sections: [
      {
        h2: 'Messages as encrypted transactions',
        paras: [
          'A blockchain messaging app sends each message as a 0-lamport transaction on Solana — a transaction that moves no money, carrying encrypted ciphertext in the memo field. The blockchain is the transport, replacing a company server.',
          'Because the payload is sealed with AES-256-GCM under a per-message key from a Double Ratchet, the public chain stores only unreadable blobs. Anyone can see a transaction happened; nobody but the recipient can read it.',
        ],
      },
      {
        h2: 'Staying private on a public ledger',
        paras: [
          'The naive worry is metadata: a public chain could expose who messages whom. PrivaMesh engineers that away with stealth addresses (a fresh one-time address per message), cover traffic (decoys that hide timing), and a throwaway gas wallet (hiding who pays). The chain is public, but what is written is deliberately unlinkable.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can messages on a blockchain be read by others?',
        a: 'No. Only encrypted blobs go on-chain; the keys to decrypt them never leave your device. Stealth addresses also prevent observers from linking messages into a conversation.',
      },
    ],
    related: [R.noServers, R.e2e, R.meta],
  },
  {
    slug: 'web3-messaging-app',
    title: 'Web3 Messaging App: Wallet-to-Wallet Chat',
    description:
      'A web3 messaging app where your wallet is your identity: no phone number, self-custodial, with in-chat crypto payments. How wallet-based messaging works.',
    h1: 'What is a web3 messaging app?',
    eyebrow: 'Guide',
    lead: 'In web3, your wallet is your login everywhere. A web3 messaging app makes it your chat identity too — self-custodial, no phone number, payments built in.',
    sections: [
      {
        h2: 'Your wallet is your account',
        paras: [
          'A web3 messaging app derives your identity from a self-custodial keypair — the same kind of key that holds crypto — instead of a phone number and a server-side profile. You own it; no company can lock you out or hand it over.',
          'Because the account is a Solana keypair, the person you are chatting with is by definition someone you can pay. In-chat SOL transfers work without copying addresses or leaving the app.',
        ],
      },
      {
        h2: 'Privacy in web3 messaging',
        paras: [
          'Wallet-based chat can be public and traceable if built naively. PrivaMesh avoids that: messages are end-to-end encrypted, stealth addresses hide the social graph, and a gas wallet hides who pays — so wallet-to-wallet chat does not become a public ledger of who messaged whom.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is a web3 messenger?',
        a: 'A messenger where your identity is a self-custodial crypto wallet instead of a phone number, often with built-in payments. PrivaMesh is a web3 messenger on Solana with end-to-end encryption and metadata protection.',
      },
    ],
    related: [R.seed, R.sol, R.privacy],
  },
  {
    slug: 'messaging-app-that-doesnt-track-you',
    title: "A Messaging App That Doesn't Track You",
    description:
      "How to use a messaging app that doesn't track you: no server-side logs, no phone number, no metadata collection. Why serverless is the only real answer.",
    h1: "A messaging app that doesn't track you",
    eyebrow: 'Guide',
    lead: 'Most apps promise not to track you in a privacy policy you have to trust. Here is how an app makes tracking impossible instead of just promising against it.',
    sections: [
      {
        h2: 'Policies vs architecture',
        paras: [
          'A "we don\'t track you" policy is only as good as the company keeping it — and policies change, companies get sold, and servers get subpoenaed. The stronger guarantee is architecture: no server that could log you in the first place.',
          'PrivaMesh has no backend, no relay and no account database. There is no server-side log of IP addresses, timestamps or contact lists, because there is no server.',
        ],
      },
      {
        h2: 'What replaces the tracking server',
        paras: [
          'Messages live on Solana as encrypted blobs; your keys, contacts and history stay on your device. On-chain, stealth addresses and cover traffic keep the metadata unlinkable. The result is a messenger that cannot track you because the tracking layer does not exist.',
        ],
      },
    ],
    faq: [
      {
        q: 'Which messaging app does not track you?',
        a: 'PrivaMesh does not track you by design — it has no server to collect data, no phone number, and it hides on-chain metadata. There is nothing to log and no company holding your data.',
      },
    ],
    related: [R.noServers, R.meta, R.privacy],
  },
  {
    slug: 'encrypted-messaging-app-for-iphone',
    title: 'Encrypted Messaging App for iPhone (2026)',
    description:
      'The best encrypted messaging app for iPhone in 2026: end-to-end encryption, Keychain-stored keys, no phone number. How iOS keeps your keys safe.',
    h1: 'The encrypted messaging app for iPhone',
    eyebrow: 'Guide',
    lead: 'iOS has strong hardware security built in. A well-built encrypted messenger uses it — here is what to look for in an encrypted messaging app for iPhone.',
    sections: [
      {
        h2: 'Encryption plus the Secure Enclave',
        paras: [
          'A strong iPhone messenger pairs end-to-end encryption with iOS key storage. PrivaMesh keeps your private keys in the iOS Keychain — device-only, biometric-lockable with Face ID or Touch ID — so keys never sync to a cloud or touch a server.',
          "Encryption uses X3DH, the Double Ratchet and AES-256-GCM, giving forward secrecy: a key that leaks today cannot decrypt yesterday's messages.",
        ],
      },
      {
        h2: 'No iCloud backup of your messages',
        paras: [
          'iCloud backups can quietly weaken message privacy in some apps. PrivaMesh keeps history on-device and, by design, does not back it up — forward secrecy deletes old keys, so past messages cannot be reconstructed from your seed alone. Your seed restores funds and identity, not chat history.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the best encrypted messaging app for iPhone?',
        a: 'For maximum privacy on iPhone, PrivaMesh: end-to-end encrypted, keys in the iOS Keychain, no phone number, no servers. Signal is the best mainstream encrypted iPhone app.',
      },
    ],
    related: [R.e2e, R.seed, R.privacy],
  },
  {
    slug: 'private-messenger-for-crypto',
    title: 'Private Messenger for Crypto Users',
    description:
      'A private messenger built for crypto: self-custodial wallet identity, in-chat SOL transfers, on-chain nicknames, no phone number. Chat and pay in one app.',
    h1: 'A private messenger for crypto users',
    eyebrow: 'Guide',
    lead: 'Crypto users need a messenger that speaks their language: wallet identity, in-chat payments, and privacy that matches self-custody. Here is what that looks like.',
    sections: [
      {
        h2: 'Wallet identity and in-chat payments',
        paras: [
          'PrivaMesh accounts are self-custodial Solana keypairs, so your chat identity and your wallet are the same thing. You can send SOL inside a conversation in a couple of taps — no address copying, no separate wallet app, no exchange in the middle.',
          'On-chain nicknames and NFT avatars make contacts recognizable without exposing raw addresses, while staying verifiable and self-custodial.',
        ],
      },
      {
        h2: 'Privacy that matches self-custody',
        paras: [
          'Self-custody is pointless if your messages leak your trades and contacts. PrivaMesh keeps chat end-to-end encrypted, hides the social graph with stealth addresses, and hides who pays with a gas wallet — so in-chat payments do not turn your conversation into a public ledger.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a messenger with a built-in crypto wallet?',
        a: 'Yes — PrivaMesh has a built-in self-custodial SOL wallet, in-chat transfers, and on-chain identity, all inside an end-to-end encrypted messenger with no phone number.',
      },
    ],
    related: [R.sol, R.seed, R.privacy],
  },
  {
    slug: 'serverless-messaging-app',
    title: 'Serverless Messaging App: No Backend, No Breach',
    description:
      'A serverless messaging app has no backend to breach, subpoena or shut down. How messaging works with no servers — the biggest privacy differentiator.',
    h1: 'What is a serverless messaging app?',
    eyebrow: 'Guide',
    lead: 'The single biggest privacy weakness in most messengers is the server. A serverless messaging app removes it entirely — here is how, and why it matters.',
    sections: [
      {
        h2: 'No server, nothing to attack',
        paras: [
          'A serverless messaging app routes messages without any central server the operator controls. There is no backend that can be breached, no database to subpoena, and nothing to quietly instruct to log more. Remove the server and a whole category of risk disappears at once.',
          'PrivaMesh is serverless in the literal sense: messages are encrypted blobs in Solana transaction memos, and the only network dependency is a swappable, self-hostable Solana RPC endpoint.',
        ],
      },
      {
        h2: 'How a message travels with no server',
        paras: [
          'To send, PrivaMesh encrypts and pads your message, then wraps it in a 0-lamport Solana transaction addressed to a one-time stealth address. To receive, your device scans the chain for your stealth addresses and decrypts locally. At no point does a company machine handle your message — because there is none.',
        ],
      },
    ],
    faq: [
      {
        q: 'What does serverless messaging mean?',
        a: 'It means messages are routed without any central company server. PrivaMesh uses the Solana blockchain as transport, so there is nothing central to breach, subpoena, log or shut down.',
      },
    ],
    related: [R.noServers, R.privacy, R.best],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug)
}
