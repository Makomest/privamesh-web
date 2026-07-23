'use client'

import { Bell } from 'lucide-react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base'

const styles = {
  primary: 'bg-accent text-black hover:bg-accent-hover shadow-[0_8px_24px_-12px_#FFFFFF66]',
  ghost: 'border border-border-hover text-text-primary hover:border-accent hover:text-accent',
}

/** Opens the waitlist modal (App Store link not live yet). */
export default function WaitlistTrigger({
  variant = 'primary',
  className = '',
  label = 'Get PrivaMesh',
}: {
  variant?: 'primary' | 'ghost'
  className?: string
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('privamesh:open-waitlist'))}
      className={`${base} ${styles[variant]} ${className}`}
      aria-haspopup="dialog"
    >
      <Bell size={15} aria-hidden="true" />
      {label}
    </button>
  )
}
