import Link from 'next/link'
import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Page not found (404)',
  robots: { index: false, follow: true },
}

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/privacy', label: 'Why PrivaMesh is private' },
  { href: '/features/no-servers', label: 'No servers' },
  { href: '/features/e2e-encryption', label: 'E2E encryption' },
  { href: '/compare/privamesh-vs-signal', label: 'PrivaMesh vs Signal' },
]

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mesh-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          This address decrypts to nothing
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist - but everything that makes
          PrivaMesh private is one link away.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary">
            Back to home
          </Button>
        </div>
        <ul className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-text-muted transition-colors hover:text-accent">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
