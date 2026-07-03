import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-[0_8px_24px_-12px_#00A89699]',
  ghost: 'border border-border-hover text-text-primary hover:border-accent hover:text-accent',
}

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ariaLabel,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  external?: boolean
  className?: string
  ariaLabel?: string
}) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
