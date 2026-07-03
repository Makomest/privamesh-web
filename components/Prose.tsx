import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FadeUp from './FadeUp'

/** Long-form prose column with keyword-friendly headings. Max ~65ch. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-content max-w-prose space-y-5 rounded-2xl p-6 backdrop-blur-sm sm:p-8 text-[17px] leading-[1.75] text-text-muted [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-text-primary [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-text-secondary [&_strong]:text-text-secondary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_code]:rounded [&_code]:bg-bg-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-accent">
      {children}
    </div>
  )
}

/** Contextual "keep reading" cards for internal linking. */
export function RelatedLinks({
  title = 'Keep reading',
  links,
}: {
  title?: string
  links: { href: string; label: string; blurb: string }[]
}) {
  return (
    <section className="mt-16" aria-label={title}>
      <h2 className="text-xl font-bold tracking-tight text-text-primary">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l, i) => (
          <FadeUp key={l.href} delay={i * 60}>
            <Link
              href={l.href}
              className="group flex h-full flex-col rounded-card border border-border bg-white/20 backdrop-blur-sm p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-border-hover"
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                {l.label}
                <ArrowRight
                  size={14}
                  className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-text-muted">{l.blurb}</span>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
