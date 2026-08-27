import { AlertTriangle, Ban, Download } from 'lucide-react'
import FadeUp from './FadeUp'
import AppStoreButton from './AppStoreButton'
import type { Platform } from '@/lib/platforms'

export type PlatformCardLabels = {
  notAvailable: string
  verify: string
  allChecksums: string
}

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
      className={`flex flex-col rounded-card border p-6 backdrop-blur-sm ${
        p.href ? 'border-border-accent bg-accent/[0.06]' : 'border-border bg-white/[0.03]'
      }`}
    >
      <h2 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h2>
      <p className="mt-2 font-mono text-[13px] text-text-muted">{p.requirement}</p>

      {p.href ? (
        <>
          <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">{p.blurb}</p>

          <div className="mt-5">
            {p.id === 'ios' ? (
              <AppStoreButton label={p.cta} />
            ) : (
              <a
                href={p.href}
                className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
              >
                <Download size={16} aria-hidden="true" />
                {p.cta}
              </a>
            )}
          </div>

          {p.secondary && (
            <p className="mt-3">
              <a
                href={p.secondary.href}
                className="text-[13px] text-text-muted underline underline-offset-4 hover:text-text-secondary"
              >
                {p.secondary.label}
              </a>
            </p>
          )}

          {p.warning && (
            <div className="mt-5 rounded-btn border border-border bg-white/[0.03] p-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-text-secondary">
                <AlertTriangle size={14} className="flex-none" aria-hidden="true" />
                {p.warning.heading}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{p.warning.body}</p>
            </div>
          )}

          {p.checksum && (
            <div className="mt-4">
              <p className="text-[13px] text-text-muted">{labels.verify}</p>
              {/* The digest is 64 characters and must stay copyable in one piece,
                  so it scrolls inside its own box rather than wrapping mid-hash. */}
              <p className="mt-1.5 overflow-x-auto rounded-btn border border-border bg-black/30 px-3 py-2 font-mono text-[11px] leading-relaxed text-text-secondary">
                <code className="whitespace-nowrap">{p.checksum.sha256}</code>
              </p>
              <p className="mt-1.5">
                <a
                  href={p.checksum.href}
                  className="text-[13px] text-text-muted underline underline-offset-4 hover:text-text-secondary"
                >
                  {labels.allChecksums}
                </a>
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">{p.status}</p>
          <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-btn border border-border px-3 py-2 font-mono text-xs text-text-muted">
            <Ban size={14} aria-hidden="true" />
            {labels.notAvailable}
          </p>
        </>
      )}
    </FadeUp>
  )
}
