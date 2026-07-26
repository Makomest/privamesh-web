import { ExternalLink } from 'lucide-react'
import type { Reference } from '@/lib/references'

/**
 * Outbound links to the primary specifications behind a claim. Deliberately
 * external: a reader who wants to check the cryptography should be able to
 * reach the source rather than take our restatement of it.
 */
export default function References({
  items,
  title = 'Primary sources',
}: {
  items?: Reference[]
  title?: string
}) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-16" aria-labelledby="references-heading">
      <h2
        id="references-heading"
        className="text-xl font-bold tracking-tight text-text-primary"
      >
        {title}
      </h2>
      <ul className="mt-5 space-y-4">
        {items.map((r) => (
          <li key={r.href} className="text-[15px] leading-relaxed">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
            >
              {r.label}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <span className="block text-text-muted">{r.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
