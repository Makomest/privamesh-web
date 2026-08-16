/**
 * The system as it actually is, component by component.
 *
 * Written to be checkable rather than reassuring: every row names an operator
 * and what that operator can observe. A privacy claim a reader can verify beats
 * a stronger one they have to take on trust, and the fee worker in particular
 * has to appear here - it is the one piece of infrastructure we run.
 */

export type Component = {
  name: string
  operator: string
  sees: string
  stores: string
  /** Can a user swap this out for something they control? */
  replaceable: 'Yes' | 'No' | 'Partly'
  note: string
}

export const COMPONENTS: Component[] = [
  {
    name: 'iOS client',
    operator: 'You',
    sees: 'Plaintext, keys, contacts',
    stores: 'Everything, on device only',
    replaceable: 'Yes',
    note: 'The only place plaintext and keys ever exist. Keys sit in the iOS Keychain behind Face ID and never sync to iCloud.',
  },
  {
    name: 'Fee worker',
    operator: 'PrivaMesh',
    sees: 'An account, a timestamp, a spent blind token',
    stores: 'Operational logs only - no plaintext, no recipient',
    replaceable: 'Partly',
    note: 'Sponsors the network fee so you never hold SOL. It is the one machine we run, and the honest limit of the design. Blind tokens mean it cannot link a send back to a purchase.',
  },
  {
    name: 'Solana RPC',
    operator: 'A third-party provider',
    sees: 'Your IP address, request timing, transactions you submit',
    stores: 'Whatever that provider chooses to log',
    replaceable: 'Yes',
    note: 'Swappable and self-hostable. This is the component most likely to see your network-level activity, and the one we have least control over.',
  },
  {
    name: 'Solana network',
    operator: 'Nobody in particular',
    sees: 'Ciphertext, one-time addresses, transaction timing',
    stores: 'Permanently, and publicly',
    replaceable: 'No',
    note: 'The transport. Everything written here is padded ciphertext addressed to a one-time key, but it is written forever.',
  },
  {
    name: 'StoreKit',
    operator: 'Apple',
    sees: 'Your purchase and your Apple ID',
    stores: 'Per Apple policy',
    replaceable: 'No',
    note: 'Unavoidable for in-app purchases on iOS. Blind tokens are what stop the purchase from being linkable to your messaging activity.',
  },
]

export type FlowStep = { label: string; detail: string }

export const FLOW: FlowStep[] = [
  { label: 'Your iPhone', detail: 'Encrypts and pads the message, derives the one-time address' },
  { label: 'Fee worker', detail: 'Sponsors the network fee, spends one blind token' },
  { label: 'RPC endpoint', detail: 'Submits the transaction to the network' },
  { label: 'Solana', detail: 'Carries the padded ciphertext to a one-time address' },
  { label: 'Their iPhone', detail: 'Scans for its own one-time addresses and decrypts locally' },
]
