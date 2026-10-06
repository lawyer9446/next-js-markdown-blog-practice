import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatTag } from '@/lib/site'

type TagFilterProps = {
  tags: { tag: string; count: number }[]
  activeTag?: string
  totalCount: number
}

export function TagFilter({ tags, activeTag, totalCount }: TagFilterProps) {
  const items = [{ tag: undefined, label: 'All', count: totalCount }, ...tags.map((t) => ({ ...t, label: formatTag(t.tag) }))]

  return (
    <nav aria-label="Filter posts by tag">
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {items.map(({ tag, label, count }) => {
          const active = tag === activeTag
          return (
            <li key={label} className="shrink-0">
              <Link
                href={tag ? `/?tag=${encodeURIComponent(tag)}` : '/'}
                aria-current={active ? 'page' : undefined}
                scroll={false}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent',
                )}
              >
                {label}
                <span
                  className={cn('text-xs tabular-nums', active ? 'text-primary-foreground/80' : 'text-muted-foreground')}
                >
                  <span className="sr-only">(</span>
                  {count}
                  <span className="sr-only"> posts)</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
