import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'

/** Standard inner-page hero: breadcrumb + eyebrow + single H1 + lead. */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  trail,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  lead: string
  trail: { name: string; path: string }[]
  children?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden rounded-b-2xl border-b border-border px-5 pb-10 pt-12 backdrop-blur-sm sm:px-8">
      <div
        className="mesh-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
      />
      <Breadcrumbs trail={trail} />
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">{eyebrow}</p>
      )}
      <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-text-primary sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{lead}</p>
      {children && <div className="mt-6">{children}</div>}
    </header>
  )
}
