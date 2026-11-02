'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { hrefIn, type Availability } from '@/lib/i18n/links'
import type { Common } from '@/lib/i18n/common'

type Ctx = { locale: string; ui: Common; avail: Availability }

const I18n = createContext<Ctx | null>(null)

export function I18nProvider({ value, children }: { value: Ctx; children: ReactNode }) {
  return <I18n.Provider value={value}>{children}</I18n.Provider>
}

export function useI18n() {
  const ctx = useContext(I18n)
  if (!ctx) throw new Error('useI18n outside I18nProvider')
  return {
    ...ctx,
    /** English path → the same page in the reader's locale when it exists there. */
    href: (enHref: string) => hrefIn(ctx.locale, enHref, ctx.avail),
  }
}
