import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { NAV_PRODUCT, NAV_COMPARE, SITE } from '@/lib/site'
import { localizeHref } from '@/components/Md'
import type { Common } from '@/lib/i18n/common'

const RESOURCES = [
  { href: '/privacy', label: 'Why Private' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/download', label: 'Download' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/protocol', label: 'Protocol' },
  { href: '/threat-model', label: 'Threat model' },
  { href: '/limitations', label: 'Limitations' },
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
  { href: '/security', label: 'Security' },
  { href: '/bug-bounty', label: 'Bug bounty' },
  { href: '/transparency', label: 'Transparency' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/support', label: 'Support' },
]

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer({ locale = 'en', ui }: { locale?: string; ui: Common }) {
  const label = (l: { href: string; label: string; external?: boolean }) =>
    l.href === SITE.whitepaper
      ? ui.footer.whitepaper
      : (ui.footer.links as Record<string, string>)[l.href] ??
        (ui.product as Record<string, string>)[l.href] ??
        (ui.comparePages as Record<string, string>)[l.href] ??
        l.label
  const loc = (links: { href: string; label: string; external?: boolean }[]) =>
    links.map((l) => ({ ...l, label: label(l), href: l.external ? l.href : localizeHref(l.href, locale) }))

  return (
    <footer className="mt-24 border-t border-border bg-bg-base">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href={localizeHref('/', locale)} className="flex items-center gap-2.5" aria-label={ui.brandHome}>
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
              {ui.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
                aria-label={ui.github}
              >
                <Github size={18} />
              </a>
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent"
                aria-label={ui.x}
              >
                <XIcon />
              </a>
            </div>
          </div>

          <FooterCol title={ui.footer.product} links={loc(NAV_PRODUCT)} />
          <FooterCol title={ui.footer.compare} links={loc(COMPARE_COL)} />
          <FooterCol title={ui.footer.resources} links={loc(RESOURCES)} />
          <FooterCol title={ui.footer.legal} links={loc(LEGAL)} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PrivaMesh. {ui.footer.rights}</p>
          <p className="font-mono">{ui.footer.motto}</p>
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
