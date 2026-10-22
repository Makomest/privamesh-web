/**
 * The roadmap behind /roadmap and /ru/roadmap.
 *
 * Shipped items carry the date they reached users. Nothing unfinished carries a
 * date: a date we miss would tell a reader less than none. The page refuses to
 * build while the App Store version is missing from the shipped iPhone items,
 * so the "we are here" marker cannot sit behind a release that is already out.
 */

export type Stage = 'shipped' | 'building' | 'next' | 'later'
export type Track = 'ios' | 'android' | 'windows' | 'protocol'
export type Locale = 'en' | 'ru'

type Text = Record<Locale, string>

export type RoadmapItem = {
  id: string
  stage: Stage
  track: Track
  /** App Store or release version, when the item is a release. */
  version?: string
  /** YYYY-MM-DD, shipped items only. */
  date?: string
  title: Text
  summary: Text
  points: Record<Locale, string[]>
}

export const STAGES: Stage[] = ['shipped', 'building', 'next', 'later']
export const TRACKS: Track[] = ['ios', 'android', 'windows', 'protocol']

export const ROADMAP: RoadmapItem[] = [
  {
    id: 'ios-1.0',
    stage: 'shipped',
    track: 'ios',
    version: '1.0',
    date: '2026-08-06',
    title: { en: 'iPhone 1.0', ru: 'iPhone 1.0' },
    summary: {
      en: 'The first App Store release: one-to-one encrypted messaging with no phone number and no account. It needed iOS 26.5.',
      ru: 'Первый релиз в App Store: переписка один на один со сквозным шифрованием, без номера телефона и без аккаунта. Требовал iOS 26.5.',
    },
    points: {
      en: [
        'X3DH, the Double Ratchet and AES-256-GCM',
        'An account is a 12-word recovery phrase made on the device',
        'A fresh one-time address for every message',
        'Padding to fixed sizes; cover traffic as an option, off by default',
        'Paid sending through blind signatures, so a send cannot be tied to a purchase',
        'The post-quantum handshake was built but switched off',
      ],
      ru: [
        'X3DH, Double Ratchet и AES-256-GCM',
        'Аккаунт — фраза восстановления из 12 слов, созданная на устройстве',
        'Новый одноразовый адрес для каждого сообщения',
        'Дополнение до фиксированных размеров; cover traffic как опция, выключен по умолчанию',
        'Оплата отправки через слепые подписи, так что отправку нельзя связать с покупкой',
        'Постквантовый хендшейк был написан, но выключен',
      ],
    },
  },
  {
    id: 'windows-1.0.0',
    stage: 'shipped',
    track: 'windows',
    version: '1.0.0',
    date: '2026-08-27',
    title: { en: 'Windows 1.0.0', ru: 'Windows 1.0.0' },
    summary: {
      en: 'A desktop client with its own fee wallet and no relay in the path.',
      ru: 'Десктопный клиент со своим кошельком для комиссий и без релея в цепочке.',
    },
    points: {
      en: [
        'Installer and portable .zip, Java bundled, no administrator rights',
        'The duress code, from the first version',
        'Not code-signed, so Windows shows a publisher warning',
        'Has not yet sent a message on mainnet',
      ],
      ru: [
        'Установщик и портативный .zip, Java внутри, без прав администратора',
        'Код принуждения — с первой версии',
        'Без подписи кода, поэтому Windows показывает предупреждение об издателе',
        'Ещё не отправлял сообщение в mainnet',
      ],
    },
  },
  {
    id: 'android-0.1',
    stage: 'shipped',
    track: 'android',
    version: '0.1',
    date: '2026-08-27',
    title: { en: 'Android 0.1', ru: 'Android 0.1' },
    summary: {
      en: 'A signed release APK, tested on an emulator rather than a phone.',
      ru: 'Подписанный release-APK, проверенный на эмуляторе, а не на телефоне.',
    },
    points: {
      en: [
        'Signed with the real key, so later versions install over it',
        'The duress code, from the first version',
        'Free tier only: the relay cannot verify a Google Play purchase',
        'Messages can take up to 15 minutes to arrive',
        'Has not yet sent a message on mainnet',
      ],
      ru: [
        'Подписан настоящим ключом, так что следующие версии встанут поверх',
        'Код принуждения — с первой версии',
        'Только бесплатный тариф: релей не умеет проверять покупки в Google Play',
        'Сообщение может идти до 15 минут',
        'Ещё не отправлял сообщение в mainnet',
      ],
    },
  },
  {
    id: 'ios-1.1',
    stage: 'shipped',
    track: 'ios',
    version: '1.1',
    date: '2026-09-17',
    title: { en: 'iPhone 1.1', ru: 'iPhone 1.1' },
    summary: {
      en: 'Runs on iOS 18 and later, so most iPhones can install it. This is the version on the App Store now.',
      ru: 'Работает на iOS 18 и новее, так что ставится на большинство iPhone. Это версия, которая сейчас в App Store.',
    },
    points: {
      en: [
        'iOS 18 and later, down from iOS 26.5',
        'Invite links instead of scanning a QR code or pasting a card',
        'A passcode bug fixed that could demand an old passcode after a restart',
        'Post-quantum handshake switched on for iOS 26, but its upload fails, so every session still opens classically',
      ],
      ru: [
        'iOS 18 и новее вместо iOS 26.5',
        'Ссылки-приглашения вместо сканирования QR-кода или вставки карточки',
        'Исправлена ошибка, из-за которой после перезапуска приложение могло требовать старый код-пароль',
        'Постквантовый хендшейк включён для iOS 26, но его загрузка не проходит, так что все сессии по-прежнему открываются классически',
      ],
    },
  },
  {
    id: 'ios-1.2',
    stage: 'building',
    track: 'ios',
    version: '1.2',
    title: { en: 'iPhone 1.2', ru: 'iPhone 1.2' },
    summary: {
      en: 'Written and tested, not yet on the App Store. The larger of the two releases so far.',
      ru: 'Написан и протестирован, но в App Store его ещё нет. Крупнее обоих предыдущих релизов.',
    },
    points: {
      en: [
        'Fixes for twelve external reports and two internal audits',
        'Safety numbers: confirm you added the person you meant',
        'Key-change alerts that take the verified mark off',
        'The duress code on iPhone',
        'A post-quantum handshake that completes',
        'Notifications that do not name the sender unless you turn it on',
        'The interface in 33 languages',
      ],
      ru: [
        'Исправления по двенадцати внешним отчётам и двум внутренним аудитам',
        'Safety numbers: проверка, что вы добавили того, кого хотели',
        'Предупреждение о смене ключа, которое снимает отметку о проверке',
        'Код принуждения на iPhone',
        'Постквантовый хендшейк, который действительно срабатывает',
        'Уведомления не называют отправителя, пока вы это не включите',
        'Интерфейс на 33 языках',
      ],
    },
  },
  {
    id: 'android-mainnet',
    stage: 'next',
    track: 'android',
    title: { en: 'Android on a real phone', ru: 'Android на настоящем телефоне' },
    summary: {
      en: 'Run the client on a real device and send its first message on mainnet.',
      ru: 'Запустить клиент на реальном устройстве и отправить первое сообщение в mainnet.',
    },
    points: {
      en: [
        'Until this happens, the Android build is a preview, not a messenger you can rely on',
      ],
      ru: [
        'Пока этого не случилось, сборка для Android — превью, а не мессенджер, на который можно положиться',
      ],
    },
  },
  {
    id: 'android-pay',
    stage: 'next',
    track: 'android',
    title: { en: 'Paying on Android', ru: 'Оплата на Android' },
    summary: {
      en: 'A way to pay that does not depend on an Apple receipt.',
      ru: 'Способ оплаты, который не зависит от чека Apple.',
    },
    points: {
      en: [
        'The relay verifies Apple receipts only, which is why Android is free tier only',
        'It has to keep a purchase unlinkable from a send, as blind tokens do on iPhone',
      ],
      ru: [
        'Релей проверяет только чеки Apple, поэтому на Android доступен лишь бесплатный тариф',
        'Покупка должна оставаться несвязанной с отправкой, как это делают слепые токены на iPhone',
      ],
    },
  },
  {
    id: 'windows-signing',
    stage: 'next',
    track: 'windows',
    title: { en: 'A signed Windows installer', ru: 'Подписанный установщик для Windows' },
    summary: {
      en: 'A code-signing certificate, so the installer stops raising a publisher warning.',
      ru: 'Сертификат подписи кода, чтобы установщик перестал вызывать предупреждение об издателе.',
    },
    points: {
      en: ['It is also what would let you check that the file really came from us'],
      ru: ['Он же позволит проверить, что файл действительно от нас'],
    },
  },
  {
    id: 'protocol-opener',
    stage: 'later',
    track: 'protocol',
    title: { en: 'An opening message that names nobody', ru: 'Первое сообщение, которое никого не называет' },
    summary: {
      en: 'If you publish a handle, the first message of a conversation still shows who you start it with.',
      ru: 'Если вы публикуете хендл, первое сообщение переписки по-прежнему показывает, с кем вы её начинаете.',
    },
    points: {
      en: ['Fixing it means a new message format, which older installs could not read'],
      ru: ['Исправление требует нового формата сообщения, который старые установки не смогут прочитать'],
    },
  },
  {
    id: 'audit',
    stage: 'later',
    track: 'protocol',
    title: { en: 'An independent security audit', ru: 'Независимый аудит безопасности' },
    summary: {
      en: 'None has been done. Until one is, treat the security claims as unverified.',
      ru: 'Аудита не было. Пока его нет, считайте заявления о безопасности непроверенными.',
    },
    points: {
      en: ['When it happens, the security page will name the auditor, the version and the exact commit'],
      ru: ['Когда он состоится, страница безопасности назовёт аудитора, версию и точный коммит'],
    },
  },
]
