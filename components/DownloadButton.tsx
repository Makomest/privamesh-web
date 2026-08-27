'use client'

import { usePathname } from 'next/navigation'
import { Button } from './Button'

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
  const pathname = usePathname()
  const isRu = pathname === '/ru' || pathname.startsWith('/ru/')
  const text = label ?? (isRu ? 'Скачать PrivaMesh' : 'Get PrivaMesh')

  return (
    <Button href={isRu ? '/ru/download' : '/download'} variant={variant} className={className}>
      {text}
    </Button>
  )
}
