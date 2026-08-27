import { AlertTriangle, Ban, Download, Info } from 'lucide-react'
import FadeUp from './FadeUp'
import AppStoreButton from './AppStoreButton'
import type { Platform } from '@/lib/platforms'

export type PlatformCardLabels = {
  notAvailable: string
}

/**
 * The three cards carry different amounts of copy - one has a second download
 * link, one has none, one has no warning box - so laid out independently their
 * buttons land at three different heights. Each card is a subgrid sharing the
 * row track list declared on PLATFORM_GRID, which lines the rows up across all
 * three no matter how long any one card's text runs. Every row is always
 * rendered, empty when the platform has nothing for it, because a skipped row
 * would shift everything below it out of alignment.
 */
export const PLATFORM_GRID =
  'mt-12 grid gap-4 md:grid-cols-3 md:[grid-template-rows:auto_auto_1fr_auto_auto_auto]'

export default function PlatformCard({
  platform: p,
  labels,
  delay = 0,
}: {
  platform: Platform
  labels: PlatformCardLabels
  delay?: number
}) {
  return (
    <FadeUp
      delay={delay}
      className={`flex flex-col rounded-card border p-6 backdrop-blur-sm md:grid md:row-span-6 md:[grid-template-rows:subgrid] ${
        p.href ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
      }`}
    >
      <h2 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h2>

      <p className="mt-2 font-mono text-[13px] leading-snug text-text-muted">{p.requirement}</p>

      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">
        {p.href ? p.blurb : p.status}
      </p>

      <div className="mt-5">
        {p.href ? (
          p.id === 'ios' ? (
            <AppStoreButton label={p.cta} />
          ) : (
            <a
              href={p.href}
              className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              <Download size={16} aria-hidden="true" />
              {p.cta}
            </a>
          )
        ) : (
          <span className="inline-flex items-center gap-2 rounded-btn border border-border px-3 py-2 font-mono text-xs text-text-muted">
            <Ban size={14} aria-hidden="true" />
            {labels.notAvailable}
          </span>
        )}
      </div>

      <div className={p.secondary ? 'mt-3' : ''}>
        {p.secondary && (
          <a
            href={p.secondary.href}
            className="text-[13px] text-text-muted underline underline-offset-4 hover:text-text-secondary"
          >
            {p.secondary.label}
          </a>
        )}
      </div>

      <div className={p.warning || p.note ? 'mt-5' : ''}>
        {(p.warning || p.note) && (
          <div className="h-full rounded-btn border border-border bg-white/[0.03] p-4">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
              {p.warning ? (
                <AlertTriangle size={14} className="flex-none" aria-hidden="true" />
              ) : (
                <Info size={14} className="flex-none" aria-hidden="true" />
              )}
              {(p.warning ?? p.note)!.heading}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
              {(p.warning ?? p.note)!.body}
            </p>
          </div>
        )}
      </div>
    </FadeUp>
  )
}
