/**
 * Every language the site is published in. The app ships the same 33.
 *
 * `code` is the URL segment (/de/download), lowercase so URLs stay
 * case-insensitive in practice. `hreflang` is the BCP 47 tag search engines
 * expect, which keeps the script subtag for Chinese and the region for
 * Brazilian Portuguese. English has no segment: it lives at the root.
 */

export type Dir = 'ltr' | 'rtl'

export type LocaleDef = {
  code: string
  hreflang: string
  /** The language's name in itself, as the switcher shows it. */
  name: string
  /** The name in English, for the switcher's accessible label. */
  english: string
  dir: Dir
  /** og:locale */
  og: string
}

export const DEFAULT_LOCALE = 'en'

export const LOCALES: LocaleDef[] = [
  { code: 'en', hreflang: 'en', name: 'English', english: 'English', dir: 'ltr', og: 'en_US' },
  { code: 'ru', hreflang: 'ru', name: 'Русский', english: 'Russian', dir: 'ltr', og: 'ru_RU' },
  { code: 'ar', hreflang: 'ar', name: 'العربية', english: 'Arabic', dir: 'rtl', og: 'ar_AR' },
  { code: 'be', hreflang: 'be', name: 'Беларуская', english: 'Belarusian', dir: 'ltr', og: 'be_BY' },
  { code: 'ca', hreflang: 'ca', name: 'Català', english: 'Catalan', dir: 'ltr', og: 'ca_ES' },
  { code: 'cs', hreflang: 'cs', name: 'Čeština', english: 'Czech', dir: 'ltr', og: 'cs_CZ' },
  { code: 'de', hreflang: 'de', name: 'Deutsch', english: 'German', dir: 'ltr', og: 'de_DE' },
  { code: 'es', hreflang: 'es', name: 'Español', english: 'Spanish', dir: 'ltr', og: 'es_ES' },
  { code: 'fa', hreflang: 'fa', name: 'فارسی', english: 'Persian', dir: 'rtl', og: 'fa_IR' },
  { code: 'fi', hreflang: 'fi', name: 'Suomi', english: 'Finnish', dir: 'ltr', og: 'fi_FI' },
  { code: 'fr', hreflang: 'fr', name: 'Français', english: 'French', dir: 'ltr', og: 'fr_FR' },
  { code: 'he', hreflang: 'he', name: 'עברית', english: 'Hebrew', dir: 'rtl', og: 'he_IL' },
  { code: 'hr', hreflang: 'hr', name: 'Hrvatski', english: 'Croatian', dir: 'ltr', og: 'hr_HR' },
  { code: 'hu', hreflang: 'hu', name: 'Magyar', english: 'Hungarian', dir: 'ltr', og: 'hu_HU' },
  { code: 'id', hreflang: 'id', name: 'Bahasa Indonesia', english: 'Indonesian', dir: 'ltr', og: 'id_ID' },
  { code: 'it', hreflang: 'it', name: 'Italiano', english: 'Italian', dir: 'ltr', og: 'it_IT' },
  { code: 'ja', hreflang: 'ja', name: '日本語', english: 'Japanese', dir: 'ltr', og: 'ja_JP' },
  { code: 'kk', hreflang: 'kk', name: 'Қазақ тілі', english: 'Kazakh', dir: 'ltr', og: 'kk_KZ' },
  { code: 'ko', hreflang: 'ko', name: '한국어', english: 'Korean', dir: 'ltr', og: 'ko_KR' },
  { code: 'ms', hreflang: 'ms', name: 'Bahasa Melayu', english: 'Malay', dir: 'ltr', og: 'ms_MY' },
  { code: 'nb', hreflang: 'nb', name: 'Norsk bokmål', english: 'Norwegian Bokmål', dir: 'ltr', og: 'nb_NO' },
  { code: 'nl', hreflang: 'nl', name: 'Nederlands', english: 'Dutch', dir: 'ltr', og: 'nl_NL' },
  { code: 'pl', hreflang: 'pl', name: 'Polski', english: 'Polish', dir: 'ltr', og: 'pl_PL' },
  { code: 'pt-br', hreflang: 'pt-BR', name: 'Português (Brasil)', english: 'Portuguese (Brazil)', dir: 'ltr', og: 'pt_BR' },
  { code: 'ro', hreflang: 'ro', name: 'Română', english: 'Romanian', dir: 'ltr', og: 'ro_RO' },
  { code: 'sk', hreflang: 'sk', name: 'Slovenčina', english: 'Slovak', dir: 'ltr', og: 'sk_SK' },
  { code: 'sr', hreflang: 'sr', name: 'Српски', english: 'Serbian', dir: 'ltr', og: 'sr_RS' },
  { code: 'sv', hreflang: 'sv', name: 'Svenska', english: 'Swedish', dir: 'ltr', og: 'sv_SE' },
  { code: 'tr', hreflang: 'tr', name: 'Türkçe', english: 'Turkish', dir: 'ltr', og: 'tr_TR' },
  { code: 'uk', hreflang: 'uk', name: 'Українська', english: 'Ukrainian', dir: 'ltr', og: 'uk_UA' },
  { code: 'uz', hreflang: 'uz', name: 'Oʻzbekcha', english: 'Uzbek', dir: 'ltr', og: 'uz_UZ' },
  { code: 'zh-hans', hreflang: 'zh-Hans', name: '简体中文', english: 'Chinese (Simplified)', dir: 'ltr', og: 'zh_CN' },
  { code: 'zh-hant', hreflang: 'zh-Hant', name: '繁體中文', english: 'Chinese (Traditional)', dir: 'ltr', og: 'zh_TW' },
]

/** Every locale except English, i.e. every one with a URL segment. */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE)

const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]))

export function getLocale(code: string): LocaleDef | undefined {
  return BY_CODE.get(code)
}

export function isLocale(code: string): boolean {
  return BY_CODE.has(code)
}

/** /download in a locale: /download for English, /de/download otherwise. */
export function localePath(code: string, path: string): string {
  if (code === DEFAULT_LOCALE) return path
  return path === '/' ? `/${code}` : `/${code}${path}`
}

/** Splits /de/download into ['de', '/download']; /download into ['en', '/download']. */
export function splitLocale(pathname: string): [string, string] {
  const seg = pathname.split('/')[1] ?? ''
  if (seg && seg !== DEFAULT_LOCALE && BY_CODE.has(seg)) {
    const rest = pathname.slice(seg.length + 1) || '/'
    return [seg, rest]
  }
  return [DEFAULT_LOCALE, pathname || '/']
}
