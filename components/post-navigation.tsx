import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'

type PostNavigationProps = {
  previous?: PostMeta
  next?: PostMeta
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav aria-label="Previous and next posts" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/posts/${previous.slug}`}
          rel="prev"
          className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Previous post
          </span>
          <span className="font-serif text-lg font-semibold leading-snug text-balance group-hover:text-primary">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
      {next && (
        <Link
          href={`/posts/${next.slug}`}
          rel="next"
          className="group flex flex-col items-end gap-2 rounded-xl border border-border bg-card p-5 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Next post
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold leading-snug text-balance group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  )
}
