import { Lock } from 'lucide-react'
import { Button } from './Button'
import { SITE } from '@/lib/site'

function AppleGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 384 512" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-150'

/**
 * Primary CTA that sends the visitor to the PrivaMesh App Store page.
 * While SITE.appStoreLive is false the button is disabled: it shows a lock and a
 * "Soon on the App Store" tooltip on hover. Set appStoreLive = true (and the real
 * appStore URL) to activate every instance at once.
 */
export default function AppStoreButton({
  variant = 'primary',
  className = '',
  label = 'Get PrivaMesh',
}: {
  variant?: 'primary' | 'ghost'
  className?: string
  label?: string
}) {
  if (SITE.appStoreLive) {
    return (
      <Button
        href={SITE.appStore}
        external
        variant={variant}
        className={className}
        ariaLabel={`${label} on the App Store`}
      >
        <AppleGlyph />
        {label}
      </Button>
    )
  }

  const disabledStyle =
    variant === 'ghost' ? 'border border-border-hover text-text-muted' : 'bg-accent/55 text-white'

  return (
    <span className={`group relative inline-flex ${className}`}>
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label="Get PrivaMesh - coming soon on the App Store"
        className={`${base} ${disabledStyle} w-full cursor-not-allowed`}
      >
        <Lock size={15} aria-hidden="true" />
        {label}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-text-primary px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
      >
        Soon on the App Store
      </span>
    </span>
  )
}
