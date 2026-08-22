export type Guide = {
  slug: string
  /**
   * One-paragraph direct answer, rendered immediately after the H1. These pages
   * were earning impressions and no clicks; a searcher who can see the answer
   * in the first screen is more likely to stay than one who has to hunt for it.
   */
  answer?: string
  /** Show the App Store hero (CTA + screenshots + benefits) above the fold. */
  appCta?: boolean
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
}

export const GUIDES: Guide[] = [
  {
    slug: 'private-messaging-app-without-phone-number',
    answer: "You can message without a phone number by using an app whose account is a key you generate rather than an identifier someone issues. PrivaMesh creates a BIP-39 seed phrase on your device: no SMS code, no email confirmation, and nothing to link the account to your carrier.",
    appCta: true,
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
      {
        h2: 'What a phone number actually leaks',
        paras: [
          'A phone number is not a neutral login. It is issued by a carrier that keeps records, it is tied to government ID in most countries, and it follows you across every service that ever asked for it. Anyone holding it can cross-reference you between accounts that were never meant to be linked.',
          'It is also fragile. SIM-swap attacks move your number to someone else’s device, and recycled numbers hand your old account to a stranger months later. A messenger that treats your number as your identity inherits every one of those failure modes.',
        ],
      },
      {
        h2: 'How contact discovery works without a directory',
        paras: [
          'The usual objection is practical: if there is no phone number, how do you find anyone? Most apps answer with a central directory, which is exactly the database you were trying to avoid - and a directory can be compelled to hand out the wrong key.',
          'PrivaMesh publishes wallet-signed prekey bundles to an on-chain registry instead. You verify a signature rather than trust a server, so the anti-MITM guarantee is cryptographic rather than administrative. Contacts are added by nickname or address, not by uploading your address book.',
        ],
      },
      {
        h2: 'What you take on instead',
        paras: [
          'Removing the phone number moves responsibility to you. There is no password reset, no support desk that can restore your account, and no recovery flow - because none of those can exist without someone holding your identity. Your seed phrase is the account, so it has to be written down and kept safe.',
          'Forward secrecy adds a second consequence people are often surprised by: restoring your seed brings back your identity and contacts, never your message history. Ratchet state is device-local and is not part of what the phrase restores.',
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
      {
        q: 'Can I message anonymously without a phone number at all?',
        a: 'Yes. PrivaMesh generates a BIP-39 seed phrase on your device and derives a Solana keypair from it. There is no registration step, no SMS code and no email confirmation - nothing is sent anywhere to create the account.',
      },
      {
        q: 'What happens to my account if I lose my phone?',
        a: 'Your seed phrase restores your identity and contacts on a new device. It does not restore your chat history, because the ratchet state that could read it never leaves the original device.',
      },
      {
        q: 'Does removing the phone number make me anonymous?',
        a: 'It removes the strongest link between your messaging and your legal identity, which is a large part of it. It does not hide your IP from your network provider or protect you if you post identifying details yourself - anonymity is a practice, not just a setting.',
      },
    ],
    related: [R.seed, R.privacy, R.best],
  },
  {
    slug: 'how-to-evaluate-a-private-messenger',
    answer: "Judge a private messenger on four things: which identifier it requires to register, who runs the infrastructure, what metadata that infrastructure necessarily sees, and whether you can verify the answers instead of trusting them. Encryption alone no longer separates the field - almost every messenger has it.",
    title: 'How to Evaluate a Private Messenger',
    description:
      'A method for judging privacy claims yourself: which identifier is required, who runs the infrastructure, what metadata it sees, and whether you can verify it.',
    h1: 'How to evaluate a private messenger',
    eyebrow: 'Guide',
    lead: 'Every messenger says it is private, so the marketing is useless as a signal. Here is the method for checking the claim yourself - and where each architecture actually lands.',
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
          'Even excellent apps like Signal run servers and require a phone number, so they protect content better than metadata or identity. Removing the account database and the message store removes the point that can leak a social graph or be compelled to change behaviour - what remains beside the path should be small enough to state in one sentence.',
          'PrivaMesh stores messages as encrypted blobs on Solana, uses a seed phrase instead of a phone number, and hides metadata with stealth addresses and cover traffic — clearing all three layers.',
        ],
      },
      {
        h2: 'How to judge a privacy claim yourself',
        paras: [
          'Almost every messenger now says it is private, so the marketing is useless as a signal. Four questions separate the claims: what identifier does it require, who runs the infrastructure, what metadata does that infrastructure necessarily see, and can you verify the answers rather than being asked to trust them.',
          'Run those questions against any app and the field sorts itself quickly. An app that needs your phone number has answered the first question badly regardless of how good its encryption is, and an app whose servers are closed source has answered the fourth badly no matter what its policy says.',
        ],
      },
      {
        h2: 'Encryption is table stakes, metadata is the differentiator',
        paras: [
          'End-to-end encryption is close to universal in 2026 - Signal, WhatsApp, Threema, SimpleX and PrivaMesh all have it, most using the same underlying ideas. Comparing apps on whether they encrypt content is comparing them on a feature they all share.',
          'The real spread is metadata: who you talked to, when, how often and from where. That is the data surveillance actually runs on, and it is the layer where architectures genuinely differ. Sealed sender, onion routing, queue-based delivery and stealth addressing are four different answers to the same problem, and their trade-offs are what a 2026 comparison should be about.',
        ],
      },
      {
        h2: 'No single app wins for everyone',
        paras: [
          'For most people Signal remains the right recommendation: mature, audited, cross-platform, and used by enough people that your contacts are already there. Privacy you cannot persuade anyone to adopt protects nobody.',
          'The serverless approach wins on a narrower question - removing the operator and the identifier entirely - and pays for it in reach, platform coverage and a small per-message fee. Pick based on what you are actually defending against, not on which app scores highest in the abstract.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the most private messaging app right now?',
        a: 'By architecture, PrivaMesh — no servers, no phone number, no metadata collection, with forward secrecy by default. Signal is the most private mainstream choice but still runs servers and needs a phone number.',
      },
      {
        q: 'What is the most private messaging app in 2026?',
        a: 'It depends on your threat model. For metadata resistance with no operator, serverless designs like PrivaMesh go furthest. For audited, mainstream, cross-platform encryption, Signal is still the strongest recommendation for most people.',
      },
      {
        q: 'Is end-to-end encryption enough on its own?',
        a: 'No. It protects the content of a message but not the pattern - who you contacted, when and how often. An app can be perfectly encrypted and still leak the relationship, which is frequently the more sensitive fact.',
      },
      {
        q: 'How can I verify a messenger is as private as it claims?',
        a: 'Check whether the client and the server are both open source, whether an identifier is required to register, and what the infrastructure necessarily sees. Claims that rest on policy rather than architecture can be changed without your knowledge.',
      },
    ],
    related: [R.privacy, R.noServers, R.best],
  },
  {
    slug: 'anonymous-messaging-app',
    answer: "An anonymous messaging app has no durable identifier to follow: no phone number, no username tied to you, and no delivery trail an observer can group into a conversation. That is a stronger claim than encrypted, which only hides message content, and stronger than pseudonymous, which survives exactly one link to your identity.",
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
      {
        h2: 'Anonymous, pseudonymous and confidential are three different things',
        paras: [
          'Confidential means nobody can read your messages. Pseudonymous means you have a stable identifier that is not your legal name. Anonymous means there is no durable identifier to follow at all. Most apps marketed as anonymous are actually confidential and pseudonymous, which is a materially weaker claim.',
          'The distinction matters because they fail differently. Confidentiality survives a server breach; pseudonymity does not survive a single link between your handle and your identity; anonymity has to be maintained by the design of every message, not established once at signup.',
        ],
      },
      {
        h2: 'What breaks anonymity in practice',
        paras: [
          'Anonymity is usually lost at the edges rather than in the cryptography. A phone number at registration links the account to a carrier record. An address book upload rebuilds the social graph. Consistent timing reveals a schedule. Message sizes distinguish a short acknowledgement from a long confession.',
          'PrivaMesh addresses each of those specifically: no identifier at registration, no address book upload, cover traffic to break timing patterns, and fixed-size padding so message length carries no information. Each one closes a channel that would otherwise deanonymise you regardless of encryption.',
        ],
      },
      {
        h2: 'What an anonymous messenger cannot do for you',
        paras: [
          'No app hides your IP address from your own network provider - that needs a VPN or Tor, and it is a separate layer of the problem. No app protects you if you tell someone who you are, reuse a handle from another context, or send a photo with location data in it.',
          'Anonymity is a practice supported by architecture, not a switch. The right way to read any anonymity claim is as a statement about what the app cannot leak, not a guarantee about what you cannot reveal.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is any messaging app truly anonymous?',
        a: 'Apps like PrivaMesh get very close: no phone number, no email, no server account, and on-chain metadata protection via stealth addresses and cover traffic. Full anonymity also depends on your own operational hygiene.',
      },
      {
        q: 'What makes a messaging app truly anonymous?',
        a: 'No identifier at registration, no contact-graph upload, and delivery that an observer cannot link into a conversation. Encryption alone does not make an app anonymous - it makes it confidential.',
      },
      {
        q: 'Is an anonymous messenger the same as an encrypted one?',
        a: 'No. Encryption hides content. Anonymity hides who is talking to whom. An app can do the first perfectly and the second not at all, which describes most mainstream messengers.',
      },
      {
        q: 'Does PrivaMesh hide my IP address?',
        a: 'No, and no messenger does that on its own. Your network provider can still see that you connected to a Solana RPC. Combine it with a VPN or Tor if network-level anonymity is part of your threat model.',
      },
    ],
    related: [R.seed, R.meta, R.privacy],
  },
  {
    slug: 'decentralized-messaging-app',
    answer: "A decentralized messaging app is one where no single organisation controls the infrastructure carrying your messages. That covers federated servers, peer-to-peer connections and blockchain transports - three quite different designs, each removing a different single point of failure at a different cost.",
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
      {
        h2: 'Decentralization is a spectrum, not a badge',
        paras: [
          'Federated systems like Matrix or XMPP spread trust across many servers, but you still pick one and it still sees your metadata. Peer-to-peer systems remove servers but struggle when both parties are offline. Blockchain transports remove the operator entirely and pay for it in cost and permanence.',
          'Each point on that spectrum solves a different problem. Calling all of them "decentralized" hides the question that actually matters: which specific single point of failure has been removed, and what replaced it.',
        ],
      },
      {
        h2: 'What decentralization actually buys',
        paras: [
          'The concrete benefit is the removal of a party who can be breached, subpoenaed, sold, or quietly instructed to change behaviour. A centralized messenger can be excellent today and different tomorrow after an acquisition or a legal order, with no change visible to you.',
          'The second benefit is availability that does not depend on a company staying in business. If a decentralized transport is public, the service continues whether or not its original developers do.',
        ],
      },
      {
        h2: 'What it costs',
        paras: [
          'Decentralization is not free. Federated servers fragment the user base. Peer-to-peer needs both devices online or a relay that reintroduces a middleman. A blockchain transport charges a fee per message and writes a record that persists indefinitely, even if that record is unreadable ciphertext.',
          'PrivaMesh takes the blockchain trade deliberately: no operator, a public and auditable transport, and a swappable RPC so no single provider sees all traffic - in exchange for a fraction of a cent per message and a permanent encrypted blob on-chain.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is a decentralized messaging app more private?',
        a: 'It removes the central server that is the biggest privacy risk in most messengers. Combined with encryption and metadata protection, that makes apps like PrivaMesh substantially more private than server-based ones.',
      },
      {
        q: 'What is a decentralized messaging app?',
        a: 'One where no single organisation controls the infrastructure that carries your messages. That covers federated servers, peer-to-peer connections and blockchain transports, which are quite different designs with different trade-offs.',
      },
      {
        q: 'Is decentralized the same as private?',
        a: 'No. A decentralized network can still expose metadata - a federated server sees who its users talk to just as a central one does. Decentralization removes a controlling party; privacy needs the metadata handled as well.',
      },
      {
        q: 'What happens to a decentralized messenger if the developers stop?',
        a: 'If the transport is public, messages keep flowing. PrivaMesh depends only on Solana and a swappable RPC, so there is no company whose shutdown would take the service with it.',
      },
    ],
    related: [R.noServers, R.privacy, R.best],
  },
  {
    slug: 'blockchain-messaging-app',
    answer: "A blockchain messaging app sends each message as an encrypted blob inside a transaction rather than through a company server. Nothing readable is stored on-chain: the payload is AES-256-GCM ciphertext addressed to a one-time address, so observers see neither the content nor who is talking to whom.",
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
      {
        h2: 'What actually gets written on-chain',
        paras: [
          'The misunderstanding worth clearing up first: your message is not stored on a blockchain in any readable sense. What is written is a fixed-size blob of AES-256-GCM ciphertext in the memo field of a zero-value transaction, addressed to a one-time address nobody can connect to you.',
          'An observer reading the chain sees that a transaction of no value occurred, carrying bytes they cannot decrypt, to an address that appears exactly once. They cannot tell what was said, who said it, or whether it was even a real message rather than cover traffic.',
        ],
      },
      {
        h2: 'Why permanence cuts both ways',
        paras: [
          'A blockchain never forgets, which is genuinely a downside for messaging. The ciphertext persists indefinitely, so the security of your past messages rests entirely on the encryption holding up over time rather than on anyone deleting anything.',
          'The counterweight is that forward secrecy destroys each message key immediately after use. Even you cannot decrypt your own history, which means a future compromise of your device or seed phrase does not retroactively unlock what is on-chain. Permanence without keys is just noise.',
        ],
      },
      {
        h2: 'Why most chains are the wrong choice',
        paras: [
          'On-chain messaging only works where transactions are fast and nearly free. On a chain with multi-dollar fees or minute-long finality, a conversation is economically and practically impossible - which is why most blockchain messaging attempts have failed.',
          'Solana settles in seconds for a fraction of a cent, which is what makes the memo field a viable transport rather than a novelty. It is still a real cost per message, and that cost is the honest price of having no server.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can messages on a blockchain be read by others?',
        a: 'No. Only encrypted blobs go on-chain; the keys to decrypt them never leave your device. Stealth addresses also prevent observers from linking messages into a conversation.',
      },
      {
        q: 'Is a blockchain messaging app really private?',
        a: 'The chain is public but what is written to it is not readable. Only padded ciphertext goes on-chain, addressed to one-time addresses, so observers see neither content nor the relationship between sender and recipient.',
      },
      {
        q: 'Do my messages stay on the blockchain forever?',
        a: 'The encrypted blobs do. The keys do not - forward secrecy destroys each message key after use, so the persistent record cannot be decrypted later, even by you.',
      },
      {
        q: 'How much does it cost to send a message on-chain?',
        a: 'A fraction of a cent in Solana network fees. It is a genuine per-message cost, and it is what you pay in exchange for there being no server and no operator.',
      },
    ],
    related: [R.noServers, R.e2e, R.meta],
  },
  {
    slug: 'web3-messaging-app',
    answer: "A web3 messaging app uses a self-custodial keypair as your identity instead of an account on a company server. You sign in by holding a key, not by registering, and the same key can send payments - which is why chat and wallet end up in one app.",
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
      {
        h2: 'Why a wallet makes a good chat identity',
        paras: [
          'A keypair is a better account than a username in three specific ways: you generate it yourself so no one issues it, you prove ownership by signature so there is no password to steal, and it is portable across any app that speaks the same cryptography.',
          'It also collapses two identities that are normally separate. The person you are chatting with is by definition someone you can pay, because the chat identity and the wallet are the same key - which is what makes in-chat transfers possible without an address-copying dance.',
        ],
      },
      {
        h2: 'The risk nobody mentions: wallet doxxing',
        paras: [
          'The honest downside of wallet-as-identity is that public chains are public. If your messaging identity is the same address that holds your NFTs and receives your salary, anyone who learns it can read your balance and your transaction history forever.',
          'This is a real problem and it needs a real answer rather than reassurance. PrivaMesh separates the roles: stealth addresses mean messages never land on your main address, and a throwaway gas wallet pays the fees, so the address doing the messaging is not the address holding your assets.',
        ],
      },
      {
        h2: 'Multiple unlinkable identities from one seed',
        paras: [
          'Because identity is derived from keys rather than issued by a server, one seed phrase can produce several accounts that cannot be linked to each other by an outside observer. A work identity and a personal identity can share a backup without sharing a social graph.',
          'That is an awkward thing to build on a centralized service, where the provider necessarily knows both accounts belong to the same person. With derived keys it is the default rather than a feature request.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is a web3 messenger?',
        a: 'A messenger where your identity is a self-custodial crypto wallet instead of a phone number, often with built-in payments. PrivaMesh is a web3 messenger on Solana with end-to-end encryption and metadata protection.',
      },
      {
        q: 'What is a web3 messaging app?',
        a: 'One where your identity is a self-custodial keypair rather than an account on a company server. You sign in by holding a key, not by registering with a phone number or email.',
      },
      {
        q: 'Does using my wallet as my chat identity expose my balance?',
        a: 'It would if the same address carried your messages, which is why PrivaMesh does not do that. Stealth addresses keep messages off your main address and a separate gas wallet pays the network fees.',
      },
      {
        q: 'Can I have more than one identity?',
        a: 'Yes. One seed phrase can derive multiple accounts that an outside observer cannot link together, so you can keep separate contexts separate without keeping separate backups.',
      },
    ],
    related: [R.seed, R.privacy],
  },
  {
    slug: 'messaging-app-that-doesnt-track-you',
    answer: "A messaging app that does not track you has no analytics SDK, no crash reporter shipping device fingerprints, no advertising identifier and no server to receive any of it. Encryption is a separate promise: an app can encrypt every message and still record who you are and when you use it.",
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
      {
        h2: 'The four ways a messenger tracks you',
        paras: [
          'Tracking in a messaging app is rarely one thing. Analytics SDKs report feature usage and session patterns. Crash reporters ship device fingerprints. Push notification tokens tie your device to a provider and reveal when you are reachable. Advertising identifiers link the app to everything else on your phone.',
          'An app can be end-to-end encrypted and still do all four, because none of them touch message content. That is why "we can’t read your messages" and "we don’t track you" are separate claims, and only the first is usually being made.',
        ],
      },
      {
        h2: 'How to verify the claim rather than believe it',
        paras: [
          'Privacy policies describe intent, not behaviour. The checks that actually settle it are observable: look at the App Store privacy label, watch the app’s network traffic with a proxy, and check whether the source is public so the data flows can be read directly.',
          'The strongest form of the claim is architectural. If there is no server to receive telemetry, no account to attach it to and no advertising identifier in the build, the absence of tracking is a property of the design rather than a promise that could be revised in a future release.',
        ],
      },
      {
        h2: 'What replaces the tracking server',
        paras: [
          'Removing analytics removes real capability, and it is worth being straight about that. There is no funnel data, no crash aggregation and no A/B testing, which makes the product harder to build and slower to improve.',
          'What replaces it is user-initiated reporting and a public codebase, so problems surface through people telling you rather than through silent collection. It is a worse feedback loop and a better privacy position, and that is the trade being made deliberately.',
        ],
      },
    ],
    faq: [
      {
        q: 'Which messaging app does not track you?',
        a: 'PrivaMesh does not track you by design — it has no server to collect data, no phone number, and it hides on-chain metadata. There is nothing to log and no company holding your data.',
      },
      {
        q: 'How do I know a messaging app really doesn’t track me?',
        a: 'Check the App Store privacy label, inspect the app’s network traffic with a proxy, and prefer apps whose source is public. An architectural claim - no server, no account, no ad identifier - is stronger than a policy claim, because policies can change silently.',
      },
      {
        q: 'Can an encrypted messenger still track me?',
        a: 'Yes, easily. Encryption protects message content while analytics SDKs, crash reporters, push tokens and advertising identifiers operate entirely outside it. The two claims are independent.',
      },
      {
        q: 'What does PrivaMesh give up by not collecting analytics?',
        a: 'Real things: no usage funnels, no crash aggregation, no A/B testing. Problems have to be reported rather than observed, which makes development slower. That is the deliberate cost of having no telemetry pipeline.',
      },
    ],
    related: [R.noServers, R.meta, R.privacy],
  },
  {
    slug: 'encrypted-messaging-app-for-iphone',
    answer: "PrivaMesh is an encrypted messaging app for iPhone that needs no phone number and no email. Messages are end-to-end encrypted with X3DH and the Double Ratchet, keys live in the iOS Keychain behind Face ID, and nothing syncs to iCloud. It is a free download on the App Store.",
    appCta: true,
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
      {
        h2: 'What iOS gives a privacy app for free',
        paras: [
          'The iPhone has security hardware most privacy apps do not use to the full. The Secure Enclave is a separate coprocessor that holds key material the main processor never sees, and Keychain items can be bound to it so they are unusable if extracted.',
          'PrivaMesh stores its keys in the Keychain behind Face ID or Touch ID, device-only, with no iCloud sync. That means a stolen phone or an extracted backup does not yield usable keys, which is a meaningfully different position from an app that keeps keys in ordinary app storage.',
        ],
      },
      {
        h2: 'The iCloud backup problem',
        paras: [
          'The most common way iPhone messages leak is not an attack on encryption - it is an ordinary iCloud backup. Unless Advanced Data Protection is enabled, message history from many apps sits in iCloud in a form Apple can access and can be compelled to produce.',
          'Advanced Data Protection is genuinely good and worth turning on regardless of which messenger you use. PrivaMesh sidesteps the question by having nothing to back up: forward secrecy destroys each message key after use, so there is no history that any backup could contain.',
        ],
      },
      {
        h2: 'Push notifications leak more than people expect',
        paras: [
          'Push notifications on iOS route through Apple’s servers, which means the timing of your incoming messages is visible to a third party even when the content is encrypted. Notification previews can also spill content onto a lock screen where anyone can read it.',
          'It is worth turning previews off in any messenger you care about. The broader point is that on iOS, the encryption is usually the strongest link in the chain - the weak points are backups, notifications and the lock screen.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the best encrypted messaging app for iPhone?',
        a: 'For maximum privacy on iPhone, PrivaMesh: end-to-end encrypted, keys in the iOS Keychain, no phone number, no servers. Signal is the best mainstream encrypted iPhone app.',
      },
      {
        q: 'What is the most secure encrypted messaging app for iPhone?',
        a: 'For mainstream use, Signal. For removing the phone number and the server entirely, PrivaMesh. Either way, enable Advanced Data Protection and turn off notification previews - those two settings matter more than the choice between good encryption implementations.',
      },
      {
        q: 'Are iMessages backed up to iCloud readable by Apple?',
        a: 'With standard iCloud Backup, yes, Apple holds keys that can decrypt it. Advanced Data Protection changes that and is worth enabling, but it is off by default so most people are not covered.',
      },
      {
        q: 'Does PrivaMesh use the Secure Enclave?',
        a: 'Keys live in the iOS Keychain, device-only and lockable behind Face ID or Touch ID. They never sync to iCloud and never leave the phone.',
      },
    ],
    related: [R.e2e, R.seed, R.privacy],
  },
  {
    slug: 'private-messenger-for-crypto',
    answer: "A private messenger for crypto users has to hide the social graph, not just the message content: public balances make holders identifiable targets. PrivaMesh keeps messaging addresses separate from the address holding your assets and verifies contacts by signature rather than display name.",
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
      {
        h2: 'The threat model is different when you hold assets',
        paras: [
          'Ordinary messaging privacy is about confidentiality. For someone holding crypto it is also about physical safety and targeted fraud. A public balance plus a leaked identity plus a known location is a shopping list, and there is a long record of that combination ending badly.',
          'That changes what matters. Hiding who you talk to stops counterparties being mapped. Keeping your messaging address separate from your holdings stops a chat contact becoming an address lookup. These are not abstractions in this context.',
        ],
      },
      {
        h2: 'Chat is where crypto attacks actually start',
        paras: [
          'Almost no serious crypto theft begins with breaking cryptography. It begins in a conversation: an impersonated admin in a group, a fake support agent, an address-poisoning transaction that plants a lookalike address in your history, a malicious link sent by someone you thought you knew.',
          'A messenger with cryptographic contact verification cuts the impersonation vector directly. PrivaMesh publishes wallet-signed prekey bundles on-chain, so you verify a signature rather than trusting a display name - which is precisely the check that fails in a support-desk scam.',
        ],
      },
      {
        h2: 'One key for chat and payments, kept separate in use',
        paras: [
          'Having identity and wallet be the same key is convenient and, handled carelessly, dangerous. The convenience is that anyone you chat with is someone you can pay without copying an address, which removes the step where address-poisoning attacks land.',
          'The safety comes from separating roles at the address level: stealth addresses keep messages off your main address, and a throwaway gas wallet pays fees, so the address people message is never the address holding your assets.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a messenger with a built-in crypto wallet?',
        a: 'Yes — PrivaMesh has a built-in self-custodial SOL wallet, in-chat transfers, and on-chain identity, all inside an end-to-end encrypted messenger with no phone number.',
      },
      {
        q: 'Why do crypto users need a different messenger?',
        a: 'Because the threat model includes targeted theft and physical risk, not just eavesdropping. Public balances make holders identifiable targets, so hiding the social graph and keeping messaging separate from holdings matter more than they would otherwise.',
      },
      {
        q: 'How does in-chat payment reduce risk?',
        a: 'It removes the address-copying step, which is exactly where address-poisoning attacks succeed. If the person you are talking to is the person you are paying, there is no address to substitute.',
      },
      {
        q: 'Can someone see my balance if they message me?',
        a: 'No. Messages are delivered to one-time stealth addresses and fees are paid from a separate gas wallet, so the address involved in a conversation is not the address holding your assets.',
      },
    ],
    related: [R.seed, R.privacy],
  },
  {
    slug: 'serverless-messaging-app',
    answer: "A serverless messaging app has no backend at all - no account database, no relay, no company machine in the message path. That is different from the cloud-engineering sense of the word, where servers still exist and are simply run by someone else.",
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
      {
        h2: 'Most "serverless" claims are not serverless',
        paras: [
          'In cloud engineering, serverless means someone else runs the servers. Applied to messaging, that is close to the opposite of what the word suggests to a user - the servers exist, they still see your metadata, and you simply cannot see them.',
          'The literal version is a much stronger claim: no backend, no relay, no account database anywhere. It is worth asking any app that uses the word which version it means, because only one of the two removes the party that can be breached or compelled.',
        ],
      },
      {
        h2: 'What replaces each thing a server used to do',
        paras: [
          'A messaging server does four jobs: it stores accounts, it distributes keys, it routes messages and it holds them until you are online. Removing it means answering all four, and an app that has not answered all four has not removed it.',
          'PrivaMesh answers them in order: accounts become a locally generated seed phrase, key distribution becomes wallet-signed prekey bundles on-chain, routing becomes a zero-value Solana transaction, and offline delivery becomes the chain itself, which holds the ciphertext until your device fetches it.',
        ],
      },
      {
        h2: 'The trade-offs of having no server',
        paras: [
          'No server means no server-side features. There is no cloud sync, no message history restore, no server-side search, and no way for anyone to help you recover an account. Every one of those normally depends on a party holding data on your behalf.',
          'There is also a cost floor: each message is a real transaction with a real, if tiny, fee. The compensation is that there is nothing to breach, nothing to subpoena and nothing to shut down - and no acquisition or policy change can quietly alter any of it.',
        ],
      },
    ],
    faq: [
      {
        q: 'What does serverless messaging mean?',
        a: 'It means messages are routed without any central company server. PrivaMesh uses the Solana blockchain as transport, so there is nothing central to breach, subpoena, log or shut down.',
      },
      {
        q: 'What is a serverless messaging app?',
        a: 'One with no backend at all - no account database, no relay and no company machine in the message path. That is different from the cloud-engineering sense of serverless, where the servers still exist and are simply run by someone else.',
      },
      {
        q: 'How do messages arrive if I am offline?',
        a: 'The transport holds them. Encrypted blobs sit in Solana transaction memos addressed to your one-time addresses until your device fetches and decrypts them, which is the job a server would normally do.',
      },
      {
        q: 'What can’t a serverless messenger do?',
        a: 'Anything that requires someone holding your data: cloud sync, history restore, server-side search and account recovery. Those are not missing features so much as the direct consequence of having no operator.',
      },
    ],
    related: [R.noServers, R.privacy, R.best],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug)
}
