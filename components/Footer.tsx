import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { NAV_PRODUCT, NAV_COMPARE, SITE } from '@/lib/site'

const RESOURCES = [
  { href: '/privacy', label: 'Why Private' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About' },
  { href: SITE.whitepaper, label: 'White Paper', external: true },
  { href: SITE.github, label: 'GitHub', external: true },
]

const COMPARE_COL = [
  ...NAV_COMPARE,
  { href: '/alternatives', label: 'All alternatives' },
  { href: '/best-private-messaging-apps', label: 'Best apps 2026' },
]

const LEGAL = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: `mailto:${SITE.supportEmail}`, label: 'Support', external: true },
]

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-base">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="PrivaMesh home">
              <Image
                src="/icon.png"
                alt="PrivaMesh logo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="text-[15px] font-bold tracking-tight text-text-primary">
                PrivaMesh
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              A private, serverless, end-to-end encrypted messenger. Trust math, not companies.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
                aria-label="PrivaMesh on GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
                aria-label="PrivaMesh on X"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <FooterCol title="Product" links={NAV_PRODUCT} />
          <FooterCol title="Compare" links={COMPARE_COL} />
          <FooterCol title="Resources" links={RESOURCES} />
          <FooterCol title="Legal" links={LEGAL} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PrivaMesh. All rights reserved.</p>
          <p className="font-mono">Private. Encrypted. Yours.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string; external?: boolean }[]
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-sm text-text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
