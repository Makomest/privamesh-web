'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, Globe } from 'lucide-react'
import { NAV_PRODUCT, NAV_COMPARE, SITE } from '@/lib/site'
import DownloadButton from '@/components/DownloadButton'
import { useI18n } from '@/components/I18nProvider'
import { existsIn } from '@/lib/i18n/links'
import { localePath, splitLocale } from '@/lib/i18n/locales'

type Lang = { code: string; name: string; english: string; hreflang: string }

export default function Navbar({ languages }: { languages: Lang[] }) {
  const [open, setOpen] = useState(false)
  const { ui, href } = useI18n()

  const product = NAV_PRODUCT.map((l) => ({ href: href(l.href), label: ui.product[l.href as keyof typeof ui.product] ?? l.label }))
  const compare = NAV_COMPARE.map((l) => ({
    href: href(l.href),
    label: ui.comparePages[l.href as keyof typeof ui.comparePages] ?? l.label,
  }))

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg-base/70 backdrop-blur-[12px]">
      <nav
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <Link href={href('/')} className="flex items-center gap-2.5" aria-label={ui.brandHome}>
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
          <NavDropdown label={ui.nav.features} links={product} />
          <NavDropdown label={ui.nav.compare} links={compare} />
          <Link href={href('/alternatives')} className="nav-link">
            {ui.nav.alternatives}
          </Link>
          <Link href={href('/guides')} className="nav-link">
            {ui.nav.guides}
          </Link>
          <Link href={href('/privacy')} className="nav-link">
            {ui.nav.privacy}
          </Link>
          <Link href={href('/blog')} className="nav-link">
            {ui.nav.blog}
          </Link>
          <Link href={href('/news')} className="nav-link">
            {ui.nav.news}
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher languages={languages} />
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label={ui.github}
          >
            <Github size={19} />
          </a>
          <DownloadButton className="px-4 py-2 text-[13px]" />
        </div>

        <button
          type="button"
          className="text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? ui.closeMenu : ui.openMenu}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white/20 backdrop-blur-sm px-5 py-4 md:hidden">
          <MobileGroup label={ui.nav.features} links={product} onNavigate={() => setOpen(false)} />
          <MobileGroup label={ui.nav.compare} links={compare} onNavigate={() => setOpen(false)} />
          <div className="mt-2 flex flex-col gap-1">
            {[
              { href: '/best-private-messaging-apps', label: ui.nav.bestApps },
              { href: '/alternatives', label: ui.nav.alternatives },
              { href: '/guides', label: ui.nav.guides },
              { href: '/privacy', label: ui.nav.privacy },
              { href: '/blog', label: ui.nav.blog },
              { href: '/news', label: ui.nav.news },
              { href: '/glossary', label: ui.nav.glossary },
            ].map((l) => (
              <Link
                key={l.href}
                href={href(l.href)}
                className="py-2 text-sm text-text-secondary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <LanguageSwitcher languages={languages} />
          </div>
          <DownloadButton className="mt-4 w-full" />
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

/**
 * Every language, each linking to this same page in that language when it is
 * published there and to that language's home page when it is not.
 */
function LanguageSwitcher({ languages }: { languages: Lang[] }) {
  const { locale, ui, avail } = useI18n()
  const pathname = usePathname() ?? '/'
  const [, enPath] = splitLocale(pathname)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.code === locale)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={ui.language}
        className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[11px] uppercase text-text-muted transition-colors hover:border-border-hover hover:text-accent"
      >
        <Globe size={13} aria-hidden="true" />
        {current?.code ?? locale}
      </button>
      {open && (
        <ul className="absolute end-0 top-full z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-card border border-border bg-bg-elevated p-1.5 shadow-2xl">
          {languages.map((l) => {
            const here = existsIn(l.code, enPath, avail)
            // A language with neither this page nor a home page has nowhere to
            // land, so it is left out rather than offered as a 404.
            if (!here && !existsIn(l.code, '/', avail)) return null
            const target = localePath(l.code, here ? enPath : '/')
            const active = l.code === locale
            return (
              <li key={l.code}>
                <Link
                  href={target}
                  hrefLang={l.hreflang}
                  lang={l.hreflang}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/10 ${
                    active ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  <span>{l.name}</span>
                  <span className="font-mono text-[10px] uppercase text-text-faint">{l.code}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
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
      <div className="flex flex-col pb-2 ps-3">
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
