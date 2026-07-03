import { Check, Minus, X } from 'lucide-react'
import type { CellState } from '@/lib/data'

/** Semantic ✓ / partial / ✗ cell for comparison tables. */
export default function CompareCell({ state, label }: { state: CellState; label?: string }) {
  if (state === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 text-success">
        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">{label ?? 'Yes'}</span>
      </span>
    )
  }
  if (state === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 text-warning">
        <Minus size={16} strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">{label ?? 'Partial'}</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-negative">
      <X size={16} strokeWidth={2.5} aria-hidden="true" />
      <span className="sr-only">{label ?? 'No'}</span>
    </span>
  )
}
