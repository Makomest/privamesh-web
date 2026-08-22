export type FaqItem = { q: string; a: string }

/**
 * FAQ blocks for the feature and comparison pages. Every answer restates
 * something already argued on its page - FAQPage markup is only valid when the
 * Q&A is visible to users, so these render on the page and feed the schema.
 */
export const FEATURE_FAQ: Record<string, FaqItem[]> = {
  'no-servers': [
    {
      q: 'How can a messenger work with no servers at all?',
      a: 'Your device encrypts and pads the message, then hands the sealed blob to a public, decentralized transport addressed to a one-time address. The recipient’s device retrieves messages for its own one-time addresses and decrypts them locally. No PrivaMesh machine ever handles the message, because no PrivaMesh machine exists.',
    },
    {
      q: 'If there is no server, what happens if PrivaMesh shuts down?',
      a: 'Nothing central switches off, because there is no central service. The transport is public and swappable, and your keys and chats already live on your device. PrivaMesh is never tied to infrastructure we control, so nobody can cut you off.',
    },
    {
      q: 'Can PrivaMesh be subpoenaed for my messages?',
      a: 'There is nothing to hand over. We hold no conversations, no account database and no connection logs. A subpoena can only reach data someone holds, and your messages are encrypted blobs that only you and your contact can read.',
    },
    {
      q: 'Isn’t “serverless” just servers you can’t see?',
      a: 'That is the usual meaning, and it is not ours. There is no PrivaMesh backend, no relay and no account database anywhere. The only network dependency is a swappable, self-hostable Solana RPC.',
    },
  ],
  'e2e-encryption': [
    {
      q: 'What encryption does PrivaMesh use?',
      a: 'Three well-understood pieces: X3DH over Curve25519 to agree on a shared secret, the Double Ratchet with HKDF and HMAC-SHA256 to derive a fresh key for every message, and AES-256-GCM to seal the payload with tamper detection.',
    },
    {
      q: 'What is forward secrecy and does PrivaMesh have it?',
      a: 'Forward secrecy means a key stolen today cannot unlock yesterday’s messages, because those keys were used once and destroyed. The Double Ratchet gives PrivaMesh forward secrecy on every message, plus post-compromise security: if an attacker briefly gets in, the ratchet heals on the next exchange and locks them back out.',
    },
    {
      q: 'How do you stop a man-in-the-middle attack without a key server?',
      a: 'Prekey bundles are signed and published on-chain, so the signature proves the key belongs to the right account. There is no trusted key server that could hand out an impostor’s key - you verify cryptographically instead of trusting a directory.',
    },
    {
      q: 'Is this the same encryption Signal uses?',
      a: 'The primitives are the same proven building blocks - X3DH and the Double Ratchet - adapted for a serverless transport. The difference is not the cryptography; it is that there is no server in between, so the only ends that exist are the two devices.',
    },
  ],
  'metadata-protection': [
    {
      q: 'Why does metadata matter if my messages are encrypted?',
      a: 'Encryption hides what you say, not who you say it to. If an observer knows that A messaged B at 2:14am and again after B replied, they have learned the relationship, the rhythm and the timing without reading a word. That is what surveillance actually runs on.',
    },
    {
      q: 'How does PrivaMesh hide who I am talking to?',
      a: 'Every message goes to a fresh one-time address that only the intended recipient can recognize. Two messages to the same person land on two unrelated-looking addresses, so an observer sees a scatter of one-off addresses with no way to cluster them into a conversation or a social graph.',
    },
    {
      q: 'Can someone work out when I am messaging?',
      a: 'Cover traffic mixes decoy messages, indistinguishable from real ones, into your activity. Frequency analysis and timing correlation lose their signal because a genuine send cannot be separated from noise.',
    },
    {
      q: 'Does message length leak anything?',
      a: 'It would, so PrivaMesh pads every message to a fixed size before sealing it. A one-word reply and a long paragraph are the same size on the wire.',
    },
  ],
  'seed-phrase-accounts': [
    {
      q: 'Can I use an encrypted messenger with no phone number?',
      a: 'That is how PrivaMesh works. There is no phone number, no email and no sign-up form. Your account is a BIP-39 seed phrase generated on your device, deriving a self-custodial Solana keypair that serves as your identity.',
    },
    {
      q: 'What happens if I lose my seed phrase?',
      a: 'There is no password reset, because there is no account on any server to reset. Whoever holds the phrase controls the account and nobody else ever has it, so write it down and keep it safe. That responsibility is the price of having no company hold your identity.',
    },
    {
      q: 'Does my seed phrase restore my chat history?',
      a: 'No, and that is forward secrecy working as designed. Your seed restores your identity and contacts, but old message keys were destroyed after use, so those messages cannot be decrypted again.',
    },
    {
      q: 'Where are my keys stored?',
      a: 'In the iOS Keychain, device-only and lockable behind Face ID or Touch ID. They never leave the phone, never sync to a cloud and never touch a server. Contacts and chat history live on the device the same way.',
    },
  ],
}

export const COMPARE_FAQ: Record<string, FaqItem[]> = {
  'privamesh-vs-signal': [
    {
      q: 'Is PrivaMesh more private than Signal?',
      a: 'On metadata, yes: Signal’s servers still see connection metadata and its phone-number requirement links your account to your real identity. PrivaMesh has no server to see anything and no phone number to link. On cryptography the two are comparable - PrivaMesh uses the same X3DH and Double Ratchet building blocks.',
    },
    {
      q: 'What does Signal do better?',
      a: 'Signal’s encryption is battle-tested and independently audited, with a huge user base, a polished app on every platform and years of security research behind it. For most people leaving SMS or WhatsApp, Signal is a genuinely great choice.',
    },
    {
      q: 'Do I need a phone number for PrivaMesh?',
      a: 'No. Your account is a BIP-39 seed phrase you generate on your own device. Signal requires a phone number; PrivaMesh has no sign-up at all.',
    },
    {
      q: 'Should I switch from Signal to PrivaMesh?',
      a: 'Choose Signal for a mature, mainstream encrypted messenger with the widest reach. Choose PrivaMesh when you want to remove the server and the phone number from the trust equation entirely.',
    },
  ],
  'privamesh-vs-telegram': [
    {
      q: 'Is Telegram end-to-end encrypted?',
      a: 'Not by default. Telegram’s cloud chats are not end-to-end encrypted and run on Telegram’s servers. PrivaMesh is end-to-end encrypted on every message, with no cloud copy on anyone’s server because there is no server.',
    },
    {
      q: 'What does Telegram do better?',
      a: 'Its user experience - huge group chats, channels, bots, cloud sync across every device and a snappy interface. For broadcasting, communities and convenience-first messaging it is hard to beat, and it never pretends to be a maximum-privacy tool.',
    },
    {
      q: 'What do I give up moving from Telegram to PrivaMesh?',
      a: 'Reach and convenience. PrivaMesh is a focused iOS privacy tool, not a mass social platform - no cloud sync, no huge public channels.',
    },
    {
      q: 'Which should I choose?',
      a: 'Choose Telegram for reach, communities and convenience. Choose PrivaMesh when default end-to-end encryption, no servers and no phone number matter more than cloud sync and huge groups.',
    },
  ],
  'privamesh-vs-session': [
    {
      q: 'How do PrivaMesh and Session differ?',
      a: 'They share the goal - private messaging with no phone number and no central company - but reach it differently. Session uses onion routing over its service-node network; PrivaMesh uses the public Solana chain as its transport.',
    },
    {
      q: 'Does Session have forward secrecy?',
      a: 'Session traded the Double Ratchet away for its routing model. PrivaMesh keeps it, so every message has forward secrecy and post-compromise security.',
    },
    {
      q: 'What does Session do better?',
      a: 'Session pioneered mainstream phone-number-free messaging with strong metadata protection, is open source and cross-platform, and routes through nodes rather than a blockchain - so there are no per-message network fees.',
    },
    {
      q: 'Which should I choose?',
      a: 'Both are serious privacy messengers with no phone number. Choose Session for fee-free onion-routed messaging; choose PrivaMesh for per-message forward secrecy, a public verifiable transport and a built-in self-custodial wallet.',
    },
  ],
}
