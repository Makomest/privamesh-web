import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from './JsonLd'
import { breadcrumbLd } from '@/lib/jsonld'

export default function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={breadcrumbLd(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-muted">
        {trail.map((t, i) => {
          const last = i === trail.length - 1
          return (
            <li key={t.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-text-secondary" aria-current="page">
                  {t.name}
                </span>
              ) : (
                <Link href={t.path} className="transition-colors hover:text-accent">
                  {t.name}
                </Link>
              )}
              {!last && <ChevronRight size={13} className="text-text-faint" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
