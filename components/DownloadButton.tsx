'use client'

import { Button } from './Button'
import { useI18n } from './I18nProvider'

/**
 * Primary CTA. Points at /download rather than straight to the App Store, so a
 * visitor on Android or Windows lands on a page that tells them where things
 * stand instead of on a store listing they cannot use.
 *
 * The direct store link lives on the download page itself, via AppStoreButton.
 */
export default function DownloadButton({
  variant = 'primary',
  className = '',
  label,
}: {
  variant?: 'primary' | 'ghost'
  className?: string
  label?: string
}) {
  const { ui, href } = useI18n()
  const text = label ?? ui.getApp

  return (
    <Button href={href('/download')} variant={variant} className={className}>
      {text}
    </Button>
  )
}
