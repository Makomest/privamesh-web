import Link from 'next/link'
import type { ReactNode } from 'react'
import { localePath, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { localesFor } from '@/lib/i18n/messages'
import { PAGES } from '@/lib/i18n/pages'

/**
 * Inline markdown for catalog strings: [text](href), **strong**, *em* and
 * `code`. Prose lives in the catalogs in this form so a translator can move a
 * link inside a sentence, which a key-per-fragment scheme would not allow.
 *
 * Internal links are rewritten to the reader's locale when the target page is
 * published in it, and left pointing at English when it is not.
 */

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g

function pageIdForPath(path: string): string | undefined {
  const clean = path.split('#')[0].split('?')[0] || '/'
  const exact = PAGES.find((p) => p.path === clean)
  if (exact) return exact.id
  return PAGES.find((p) => p.path.endsWith('/*') && clean.startsWith(p.path.slice(0, -1)))?.id
}

export function localizeHref(href: string, locale: string): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith('/')) return href
  const id = pageIdForPath(href)
  if (!id || !localesFor(id).includes(locale)) return href
  return localePath(locale, href)
}

export function md(text: string, locale: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const m of text.matchAll(TOKEN)) {
    if (m.index! > last) out.push(text.slice(last, m.index))
    const key = i++
    if (m[1] !== undefined) {
      const href = m[2]
      out.push(
        href.startsWith('/') ? (
          <Link key={key} href={localizeHref(href, locale)}>
            {md(m[1], locale)}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {md(m[1], locale)}
          </a>
        ),
      )
    } else if (m[3] !== undefined) out.push(<strong key={key}>{md(m[3], locale)}</strong>)
    else if (m[4] !== undefined) out.push(<em key={key}>{md(m[4], locale)}</em>)
    else out.push(<code key={key}>{m[5]}</code>)
    last = m.index! + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** A run of paragraphs: one per catalog string. */
export function Paras({ items, locale }: { items: string[]; locale: string }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i}>{md(p, locale)}</p>
      ))}
    </>
  )
}
