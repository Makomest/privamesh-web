import Link from 'next/link'
import type { Metadata } from 'next'
import '../../globals.css'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import SiteShell from '@/components/SiteShell'
import { fontVariables } from '@/lib/fonts'

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

/**
 * Next renders the not-found boundary outside every layout when an app has more
 * than one root layout (we have app/(en) and app/(ru)), so this page has to
 * bring its own stylesheet, font variables and chrome. For the same reason it
 * is the single 404 for the whole site — /ru/* misses land here too, which is
 * why a RU-only not-found.tsx would never render.
 */
export default function NotFound() {
  return (
    <div className={`${fontVariables} min-h-screen font-sans antialiased`}>
      <SiteShell>
        <NotFoundBody />
      </SiteShell>
    </div>
  )
}

function NotFoundBody() {
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
