'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Articles', match: (p: string) => p === '/' || p.startsWith('/posts') },
  { href: '/about', label: 'About', match: (p: string) => p.startsWith('/about') },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-1 text-sm">
      {links.map((link) => {
        const active = link.match(pathname)
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 font-medium transition-colors hover:bg-secondary hover:text-foreground',
                active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
