import { SITE } from './site'
import { APP_STORE } from './appstore.generated'

export type Platform = {
  id: 'ios' | 'android' | 'windows'
  name: string
  requirement: string
  /** null while no build exists that is safe to hand out. */
  href: string | null
  cta: string
  /** The pitch when there is a build. */
  blurb?: string
  /** Shown instead when href is null. Says what is missing and why, never "soon". */
  status?: string
  /** A second download for the same platform - portable build, etc. */
  secondary?: { href: string; label: string }
  /** Something the visitor will hit and should not meet unprepared. */
  warning?: { heading: string; body: string }
  /** Same slot as `warning`, for a platform that has nothing to warn about.
   *  Keeps the subgrid row filled rather than leaving one card with a hole. */
  note?: { heading: string; body: string }
}

export const PLATFORMS: Platform[] = [
  {
    id: 'ios',
    name: 'iPhone',
    requirement: `iOS ${APP_STORE.minimumOsVersion} or later · version ${APP_STORE.version}`,
    href: SITE.downloads.ios,
    cta: 'Download on the App Store',
    blurb:
      'Free to install. No phone number, no email, no account - the app generates your identity on the device when you first open it. Paid tiers work here and only here.',
    note: {
      heading: 'The one with real use behind it',
      body: 'This is the client that ships on the App Store and the one people actually run. It is also the reference the others are measured against: the Android and Windows clients derive their protocol layers from this source and are vector-checked against it, so where they disagree, this is what is correct.',
    },
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: `Windows 10 64-bit · version ${SITE.windowsBuild.version}`,
    href: SITE.downloads.windows,
    cta: 'Download the installer',
    blurb:
      'Java is bundled, so there is nothing else to install, and the installer never asks for administrator. There is no subscription on the desktop and no relay in the path: the client makes its own Solana fee wallet, you fund it, and each message pays its own network fee - about $0.0008, so roughly 6,000 messages for $5.',
    secondary: {
      href: SITE.windowsBuild.portable,
      label: 'Portable .zip, no installer',
    },
    warning: {
      heading: 'Windows will warn you',
      body: 'You will see "Windows protected your PC". This build carries no code-signing certificate, so Windows does not recognise the publisher - it is not a report of anything found in the file. Click "More info", then "Run anyway". The certificate is also the thing that would let you check this really came from us, so until it exists there is nothing here worth checking it against - that is a gap, and it is ours to close.',
    },
  },
  {
    id: 'android',
    name: 'Android',
    requirement: `Android 8.0 or later · version ${SITE.androidBuild.version}`,
    href: SITE.downloads.android,
    cta: 'Download the APK',
    blurb:
      'A release build signed with the real key, so later versions install over it as an update and your account survives. Paid tiers do not work here yet - the relay verifies Apple receipts and has no Google Play path - so Android is free tier only for now.',
    warning: {
      heading: 'Sideloading, and what was tested',
      body: 'Android will ask you to allow installs from wherever you downloaded this. The build was driven through account creation, phrase generation and a relaunch on an Android 15 emulator, which is the check that matters after R8 rewrites the crypto and database code. It has not been run on a real device, and no Android build has yet sent a message on mainnet.',
    },
  },
]

export const PLATFORMS_RU: Platform[] = [
  {
    id: 'ios',
    name: 'iPhone',
    requirement: `iOS ${APP_STORE.minimumOsVersion} или новее · версия ${APP_STORE.version}`,
    href: SITE.downloads.ios,
    cta: 'Скачать в App Store',
    blurb:
      'Установка бесплатна. Ни номера телефона, ни почты, ни аккаунта — приложение создаёт вашу личность на устройстве при первом запуске. Платные тарифы работают здесь и только здесь.',
    note: {
      heading: 'Единственный с реальным использованием',
      body: 'Это клиент, который выходит в App Store и которым действительно пользуются. Он же эталон для остальных: клиенты под Android и Windows берут свои протокольные слои из этого исходника и сверяются с ним по векторам, так что при расхождении правильный — этот.',
    },
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: `Windows 10 64-bit · версия ${SITE.windowsBuild.version}`,
    href: SITE.downloads.windows,
    cta: 'Скачать установщик',
    blurb:
      'Java внутри, ставить больше нечего, и установщик не просит прав администратора. Подписки на десктопе нет и релея в цепочке тоже: клиент заводит собственный кошелёк Solana, вы его пополняете, и каждое сообщение платит свою комиссию — около $0.0008, то есть примерно 6000 сообщений за $5.',
    secondary: {
      href: SITE.windowsBuild.portable,
      label: 'Портативная версия .zip, без установки',
    },
    warning: {
      heading: 'Windows покажет предупреждение',
      body: 'Вы увидите «Windows protected your PC». У сборки нет сертификата подписи кода, поэтому Windows не узнаёт издателя — это не сообщение о том, что в файле что-то нашли. Нажмите «More info», затем «Run anyway». Тот же сертификат позволил бы убедиться, что файл действительно от нас, так что пока его нет — сверять по сути не с чем. Это пробел, и закрыть его наша задача.',
    },
  },
  {
    id: 'android',
    name: 'Android',
    requirement: `Android 8.0 или новее · версия ${SITE.androidBuild.version}`,
    href: SITE.downloads.android,
    cta: 'Скачать APK',
    blurb:
      'Release-сборка, подписанная настоящим ключом, — следующие версии встанут поверх как обновление, аккаунт сохранится. Платные тарифы тут пока не работают: релей проверяет чеки Apple и пути для Google Play не имеет, так что на Android доступен только бесплатный тариф.',
    warning: {
      heading: 'Установка со стороны и что проверено',
      body: 'Android попросит разрешить установку из источника, откуда вы скачали файл. Сборку прогнали через создание аккаунта, генерацию фразы и перезапуск на эмуляторе Android 15 — это и есть проверка, которая важна после того, как R8 переписывает код криптографии и базы. На реальном устройстве она не запускалась, и ни одна сборка под Android ещё не отправляла сообщение в mainnet.',
    },
  },
]
