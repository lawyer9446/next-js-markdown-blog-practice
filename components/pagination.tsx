import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  currentPage: number
  totalPages: number
  tag?: string
}

function buildHref(page: number, tag?: string) {
  const params = new URLSearchParams()
  if (tag) params.set('tag', tag)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/?${query}` : '/'
}

export function Pagination({ currentPage, totalPages, tag }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages
  const edgeClasses =
    'inline-flex h-10 items-center gap-1 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors'

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-2 sm:justify-center">
      {hasPrev ? (
        <Link href={buildHref(currentPage - 1, tag)} rel="prev" className={cn(edgeClasses, 'hover:bg-accent')}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span>Previous</span>
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(edgeClasses, 'cursor-not-allowed opacity-50')}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span>Previous</span>
        </span>
      )}

      <ul className="hidden items-center gap-1 sm:flex">
        {pages.map((page) => {
          const active = page === currentPage
          return (
            <li key={page}>
              <Link
                href={buildHref(page, tag)}
                aria-current={active ? 'page' : undefined}
                aria-label={`Page ${page}`}
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-md text-sm font-medium tabular-nums transition-colors',
                  active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                )}
              >
                {page}
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="text-sm text-muted-foreground sm:hidden" aria-live="polite">
        Page {currentPage} of {totalPages}
      </p>

      {hasNext ? (
        <Link href={buildHref(currentPage + 1, tag)} rel="next" className={cn(edgeClasses, 'hover:bg-accent')}>
          <span>Next</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(edgeClasses, 'cursor-not-allowed opacity-50')}>
          <span>Next</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  )
}
