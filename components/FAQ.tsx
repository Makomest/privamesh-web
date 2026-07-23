import { Plus } from 'lucide-react'

/** Crawlable FAQ built on native <details>/<summary>. */
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-card border border-border bg-white/[0.03] backdrop-blur-sm">
      {items.map((it) => (
        <details key={it.q} className="group px-5 py-1 open:bg-bg-elevated">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-text-primary [&::-webkit-details-marker]:hidden">
            {it.q}
            <Plus
              size={18}
              className="flex-none text-text-muted transition-transform duration-200 group-open:rotate-45 group-open:text-accent"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 pr-8 text-[15px] leading-relaxed text-text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  )
}
