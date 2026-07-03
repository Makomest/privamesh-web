import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>{children}</div>
}

/** Thin green→purple gradient divider between sections. */
export function SectionDivider() {
  return (
    <div className="mx-auto max-w-content px-5 sm:px-8" aria-hidden="true">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
    </div>
  )
}
