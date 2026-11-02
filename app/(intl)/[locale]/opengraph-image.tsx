import { ogImage, ogSize, ogContentType } from '@/lib/og'
import { getMessages, hasMessages } from '@/lib/i18n/messages'
import { PREFIXED_LOCALES } from '@/lib/i18n/locales'
import type { Common } from '@/lib/i18n/common'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType
export const alt = 'PrivaMesh'

// The card's font covers Latin and Cyrillic only. Arabic, Persian, Hebrew,
// Chinese, Japanese and Korean would render as empty boxes, so those cards
// carry the English title instead of a broken one.
const UNSUPPORTED = new Set(['ar', 'fa', 'he', 'ja', 'ko', 'zh-hans', 'zh-hant'])

export function generateStaticParams() {
  return PREFIXED_LOCALES.filter((l) => hasMessages(l.code, 'common')).map((l) => ({ locale: l.code }))
}

export default function Image({ params }: { params: { locale: string } }) {
  const locale = UNSUPPORTED.has(params.locale) ? 'en' : params.locale
  return ogImage(getMessages<Common>(locale, 'common').meta.title)
}
