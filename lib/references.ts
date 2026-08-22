export type Reference = { label: string; href: string; note: string }

/**
 * Primary sources for the cryptography PrivaMesh is built on. These are
 * deliberately outbound links to specifications rather than restatements: a
 * claim about X3DH is worth more when the reader can go and check X3DH.
 */
export const REF = {
  x3dh: {
    label: 'X3DH key agreement protocol',
    href: 'https://signal.org/docs/specifications/x3dh/',
    note: 'The specification for the Extended Triple Diffie-Hellman handshake, by Marlinspike and Perrin.',
  },
  doubleRatchet: {
    label: 'The Double Ratchet algorithm',
    href: 'https://signal.org/docs/specifications/doubleratchet/',
    note: 'The specification for the per-message ratchet that provides forward secrecy and post-compromise security.',
  },
  aesGcm: {
    label: 'NIST SP 800-38D: Galois/Counter Mode',
    href: 'https://csrc.nist.gov/pubs/sp/800/38/d/final',
    note: 'The NIST recommendation defining AES-GCM, the authenticated encryption PrivaMesh uses to seal payloads.',
  },
  curve25519: {
    label: 'Curve25519',
    href: 'https://cr.yp.to/ecdh.html',
    note: 'Bernstein’s elliptic curve, the basis for the key exchange underneath X3DH.',
  },
  bip39: {
    label: 'BIP-39: mnemonic code for generating deterministic keys',
    href: 'https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki',
    note: 'The Bitcoin Improvement Proposal that standardised seed phrases, including the 2048-word list and checksum.',
  },
  bip32: {
    label: 'BIP-32: hierarchical deterministic wallets',
    href: 'https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki',
    note: 'How one seed derives many independent keypairs, which is what allows unlinkable identities.',
  },
  solanaMemo: {
    label: 'Solana Memo Program',
    href: 'https://spl.solana.com/memo',
    note: 'The on-chain program whose field carries PrivaMesh ciphertext.',
  },
  rfc5869: {
    label: 'RFC 5869: HKDF',
    href: 'https://www.rfc-editor.org/rfc/rfc5869',
    note: 'The key derivation function the ratchet uses to advance chain keys.',
  },
  sealedSender: {
    label: 'Signal: sealed sender',
    href: 'https://signal.org/blog/sealed-sender/',
    note: 'Signal’s approach to hiding sender metadata, for comparison with stealth addressing.',
  },
  keychain: {
    label: 'Apple: Keychain services',
    href: 'https://developer.apple.com/documentation/security/keychain_services',
    note: 'The iOS API PrivaMesh stores keys in, device-only and biometric-lockable.',
  },
  adp: {
    label: 'Apple: Advanced Data Protection for iCloud',
    href: 'https://support.apple.com/en-us/102651',
    note: 'Apple’s opt-in end-to-end encryption for iCloud backups.',
  },
} as const satisfies Record<string, Reference>

/** References shown per feature page. */
export const FEATURE_REFS: Record<string, Reference[]> = {
  'no-servers': [REF.solanaMemo, REF.doubleRatchet],
  'e2e-encryption': [REF.x3dh, REF.doubleRatchet, REF.aesGcm, REF.curve25519, REF.rfc5869],
  'metadata-protection': [REF.sealedSender, REF.solanaMemo],
  'seed-phrase-accounts': [REF.bip39, REF.bip32, REF.keychain],
}

/** References shown per glossary term. */
export const TERM_REFS: Record<string, Reference[]> = {
  'double-ratchet': [REF.doubleRatchet, REF.rfc5869],
  'forward-secrecy': [REF.doubleRatchet],
  'end-to-end-encryption': [REF.x3dh, REF.aesGcm],
  'bip-39-seed-phrase': [REF.bip39, REF.bip32],
  'stealth-address': [REF.solanaMemo],
  metadata: [REF.sealedSender],
  'cover-traffic': [REF.sealedSender],
  'serverless-messenger': [REF.solanaMemo],
}
