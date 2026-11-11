'use client'

import { useState } from 'react'
import { n } from './ui'

export type Bucket = { t: string; label: string; tick?: string; primary: number; secondary?: number }

/** Centre of column i, inside the plot area that leaves 2rem on the right for axis labels. */
function columnCentre(i: number, count: number) {
  const f = (i + 0.5) / count
  return `calc(${f * 100}% - ${f * 2}rem)`
}

/** Round up to 1, 2 or 5 times a power of ten, so gridlines land on readable values. */
function niceMax(v: number) {
  if (v <= 0) return 1
  const p = 10 ** Math.floor(Math.log10(v))
  for (const m of [1, 2, 5, 10]) if (m * p >= v) return m * p
  return 10 * p
}

/**
 * One series of bars over time with a hover readout. Bars are thin, rounded at
 * the data end and anchored to the baseline, with a 2px gap between them; the
 * whole column is the hover target so a one-pixel bar is still easy to hit.
 * A second measure, if given, appears only in the readout - never on its own
 * axis.
 */
export function BarChart({
  data,
  primaryLabel,
  secondaryLabel,
  height = 180,
  compact = false,
}: {
  data: Bucket[]
  primaryLabel: string
  secondaryLabel?: string
  height?: number
  compact?: boolean
}) {
  const [hover, setHover] = useState<number | null>(null)
  const top = niceMax(Math.max(...data.map((d) => d.primary), 0))
  const h = hover === null ? null : data[hover]

  return (
    <div className="relative select-none" onMouseLeave={() => setHover(null)}>
      <div className="relative" style={{ height }}>
        {!compact &&
          [1, 0.5].map((f) => (
            <div
              key={f}
              className="pointer-events-none absolute inset-x-0 border-t border-dashed border-white/[0.07]"
              style={{ bottom: `${f * 100}%` }}
            >
              <span className="absolute -top-2.5 end-0 bg-bg-surface ps-1 font-mono text-[10px] text-text-faint">
                {n(top * f)}
              </span>
            </div>
          ))}
        <div className="absolute inset-0 flex items-end gap-[2px] border-b border-white/[0.12] pe-8">
          {data.map((d, i) => (
            <div
              key={d.t}
              className="relative flex h-full min-w-0 flex-1 items-end"
              onMouseEnter={() => setHover(i)}
              onTouchStart={() => setHover(i)}
            >
              <div
                className={`w-full rounded-t-[4px] transition-colors ${
                  hover === i ? 'bg-accent' : 'bg-accent/55'
                }`}
                style={{ height: d.primary ? `${Math.max(2, (d.primary / top) * 100)}%` : 0 }}
              />
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="relative mt-2 h-4 pe-8 font-mono text-[10px] text-text-faint">
          {data.map((d, i) =>
            d.tick ? (
              <span
                key={d.t}
                className="absolute -translate-x-1/2 whitespace-nowrap"
                style={{ left: columnCentre(i, data.length) }}
              >
                {d.tick}
              </span>
            ) : null,
          )}
        </div>
      )}

      {h && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-btn border border-border-hover bg-bg-elevated px-3 py-2 text-xs shadow-lg"
          style={{
            left: `clamp(4rem, ${columnCentre(hover!, data.length)}, calc(100% - 4rem))`,
          }}
        >
          <p className="whitespace-nowrap font-mono text-text-faint">{h.label}</p>
          <p className="mt-1 whitespace-nowrap text-text-primary">
            <span className="font-semibold tabular-nums">{n(h.primary)}</span> {primaryLabel}
          </p>
          {secondaryLabel && h.secondary !== undefined && (
            <p className="whitespace-nowrap text-text-muted">
              <span className="tabular-nums">{n(h.secondary)}</span> {secondaryLabel}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
