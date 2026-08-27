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
  checksum?: { sha256: string; href: string }
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
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: `Windows 10 64-bit or later · version ${SITE.windowsBuild.version}`,
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
      body: 'You will see "Windows protected your PC". This build carries no code-signing certificate, so Windows does not recognise the publisher - it is not a report of anything found in the file. Click "More info", then "Run anyway". Verify the download first with the checksum below; being told to click past a security warning without being told why is how people learn to click past the next one.',
    },
    checksum: {
      sha256: SITE.windowsBuild.sha256,
      href: SITE.windowsBuild.checksums,
    },
  },
  {
    id: 'android',
    name: 'Android',
    requirement: 'Written, not yet signed',
    href: SITE.downloads.android,
    cta: 'Download the APK',
    status:
      'The Android client is built and talks to the iPhone app, but the only APK that exists is a debug build and publishing it would do real harm. It is marked debuggable, so adb can read the message database off the phone without root, and it is signed with a throwaway key - when the first properly signed release ships, Android would refuse the update and everyone would have to uninstall. Uninstalling PrivaMesh destroys your history permanently. Paid tiers will not work on Android at first either: the relay verifies Apple receipts and has no Google Play path yet.',
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
  },
  {
    id: 'windows',
    name: 'Windows',
    requirement: `Windows 10 64-bit или новее · версия ${SITE.windowsBuild.version}`,
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
      body: 'Вы увидите «Windows protected your PC». У сборки нет сертификата подписи кода, поэтому Windows не узнаёт издателя — это не сообщение о том, что в файле что-то нашли. Нажмите «More info», затем «Run anyway». Сначала сверьте SHA-256 ниже: приучать людей проматывать предупреждения о безопасности — верный способ, чтобы они промотали и то, которое окажется настоящим.',
    },
    checksum: {
      sha256: SITE.windowsBuild.sha256,
      href: SITE.windowsBuild.checksums,
    },
  },
  {
    id: 'android',
    name: 'Android',
    requirement: 'Написан, но не подписан',
    href: SITE.downloads.android,
    cta: 'Скачать APK',
    status:
      'Клиент под Android готов и общается с приложением на iPhone, но единственная существующая сборка — отладочная, и публиковать её означало бы навредить. В ней выставлен флаг debuggable: adb вычитает базу сообщений с телефона без root. И подписана она одноразовым ключом — когда выйдет нормально подписанный релиз, Android откажется обновлять, и всем придётся удалить приложение. А удаление PrivaMesh уничтожает переписку навсегда. Платные тарифы на Android поначалу тоже не заработают: релей проверяет чеки Apple и пути для Google Play пока не имеет.',
  },
]
