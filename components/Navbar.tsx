'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'
import { NAV_PRODUCT, NAV_COMPARE, SITE } from '@/lib/site'
import AppStoreButton from '@/components/AppStoreButton'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isRu = pathname?.startsWith('/ru')

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg-base/70 backdrop-blur-[12px]">
      <nav
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="PrivaMesh home">
          <Image
            src="/icon.png"
            alt="PrivaMesh logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-[15px] font-bold tracking-tight text-text-primary">PrivaMesh</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <NavDropdown label="Features" links={NAV_PRODUCT} />
          <NavDropdown label="Compare" links={NAV_COMPARE} />
          <Link href="/alternatives" className="nav-link">
            Alternatives
          </Link>
          <Link href="/guides" className="nav-link">
            Guides
          </Link>
          <Link href="/privacy" className="nav-link">
            Privacy
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={isRu ? '/' : '/ru'}
            hrefLang={isRu ? 'en' : 'ru'}
            className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-border-hover hover:text-accent"
            aria-label={isRu ? 'Switch to English' : 'Переключить на русский'}
          >
            {isRu ? 'EN' : 'RU'}
          </Link>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="PrivaMesh on GitHub"
          >
            <Github size={19} />
          </a>
          <AppStoreButton className="px-4 py-2 text-[13px]" />
        </div>

        <button
          type="button"
          className="text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white/20 backdrop-blur-sm px-5 py-4 md:hidden">
          <MobileGroup label="Features" links={NAV_PRODUCT} onNavigate={() => setOpen(false)} />
          <MobileGroup label="Compare" links={NAV_COMPARE} onNavigate={() => setOpen(false)} />
          <div className="mt-2 flex flex-col gap-1">
            {[
              { href: '/best-private-messaging-apps', label: 'Best apps 2026' },
              { href: '/alternatives', label: 'Alternatives' },
              { href: '/guides', label: 'Guides' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/blog', label: 'Blog' },
              { href: '/glossary', label: 'Glossary' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-sm text-text-secondary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <AppStoreButton className="mt-4 w-full" />
        </div>
      )}

      <style jsx global>{`
        .nav-link {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color 0.15s ease;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </header>
  )
}

function NavDropdown({
  label,
  links,
}: {
  label: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="group relative">
      <button className="nav-link flex items-center gap-1" type="button">
        {label}
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-card border border-border bg-bg-elevated p-2 shadow-2xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/40 hover:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileGroup({
  label,
  links,
  onNavigate,
}: {
  label: string
  links: { href: string; label: string }[]
  onNavigate: () => void
}) {
  return (
    <details className="border-b border-border py-1">
      <summary className="cursor-pointer py-2 text-sm font-medium text-text-primary">
        {label}
      </summary>
      <div className="flex flex-col pb-2 pl-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="py-1.5 text-sm text-text-muted"
            onClick={onNavigate}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </details>
  )
}
