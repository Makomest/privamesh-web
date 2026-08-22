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
    sees: 'A valid unspent blind token and the transaction to sponsor - no account on the anonymous path',
    stores: 'Operational logs only - no plaintext, no recipient',
    replaceable: 'Partly',
    note: 'Sponsors the network fee so you never hold SOL - the one machine we run. Sends authenticate with an anonymous blind token that carries no identity, so the worker cannot link a send to a purchase, to another send, or to an account. A legacy account path still exists and is required for publishing a public discovery nickname, which is identifying by nature. Its source is public, under relay/ in the same repository as the client.',
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

/** Russian mirror of COMPONENTS. Same rows, same facts, translated. */
export const COMPONENTS_RU: Component[] = [
  {
    name: 'iOS-клиент',
    operator: 'Вы',
    sees: 'Открытый текст, ключи, контакты',
    stores: 'Всё, только на устройстве',
    replaceable: 'Yes',
    note: 'Единственное место, где вообще существуют открытый текст и ключи. Ключи лежат в iOS Keychain за Face ID и не синхронизируются с iCloud.',
  },
  {
    name: 'Fee worker',
    operator: 'PrivaMesh',
    sees: 'Действительный непотраченный слепой токен и транзакцию - на анонимном пути аккаунт не передаётся',
    stores: 'Только рабочие логи — ни текста, ни получателя',
    replaceable: 'Partly',
    note: 'Оплачивает сетевую комиссию, чтобы вам не нужно было держать SOL, — единственная машина, которую мы запускаем. Отправка авторизуется анонимным слепым токеном без идентичности, поэтому воркер не может связать её ни с покупкой, ни с другой отправкой, ни с аккаунтом. Остаётся legacy-путь с аккаунтом: он нужен для публикации публичного ника, который идентифицирует по своей природе.',
  },
  {
    name: 'Solana RPC',
    operator: 'Сторонний провайдер',
    sees: 'Ваш IP, время запросов, отправляемые транзакции',
    stores: 'То, что решит логировать провайдер',
    replaceable: 'Yes',
    note: 'Заменяем и разворачивается самостоятельно. Именно этот компонент лучше всего видит вашу сетевую активность и меньше всего нам подконтролен.',
  },
  {
    name: 'Сеть Solana',
    operator: 'Никто конкретно',
    sees: 'Шифротекст, одноразовые адреса, время транзакций',
    stores: 'Постоянно и публично',
    replaceable: 'No',
    note: 'Транспорт. Всё записанное — это дополненный шифротекст на одноразовый адрес, но записывается он навсегда.',
  },
  {
    name: 'StoreKit',
    operator: 'Apple',
    sees: 'Вашу покупку и Apple ID',
    stores: 'По правилам Apple',
    replaceable: 'No',
    note: 'Неизбежен для покупок внутри приложения на iOS. Слепые токены — то, что не даёт связать покупку с вашей перепиской.',
  },
]

export const FLOW_RU: FlowStep[] = [
  { label: 'Ваш iPhone', detail: 'Шифрует и дополняет сообщение, выводит одноразовый адрес' },
  { label: 'Fee worker', detail: 'Оплачивает комиссию, тратит один слепой токен' },
  { label: 'RPC-эндпоинт', detail: 'Отправляет транзакцию в сеть' },
  { label: 'Solana', detail: 'Несёт дополненный шифротекст на одноразовый адрес' },
  { label: 'Его iPhone', detail: 'Ищет свои одноразовые адреса и расшифровывает локально' },
]
