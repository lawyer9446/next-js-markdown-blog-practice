import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import { NavLinks } from './nav-links'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2 rounded-sm"
          aria-label={`${siteConfig.name}, home`}
        >
          <span
            aria-hidden="true"
            className="inline-block size-2.5 translate-y-[-2px] rounded-full bg-primary transition-transform group-hover:scale-125"
          />
          <span className="font-serif text-xl font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary">
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}
