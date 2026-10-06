import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatTag } from '@/lib/site'

type TagListProps = {
  tags: string[]
  linked?: boolean
  className?: string
}

export function TagList({ tags, linked = true, className }: TagListProps) {
  if (tags.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="Tags">
      {tags.map((tag) => {
        const classes =
          'inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground'
        return (
          <li key={tag}>
            {linked ? (
              <Link
                href={`/?tag=${encodeURIComponent(tag)}`}
                className={cn(classes, 'relative z-10 transition-colors hover:bg-primary hover:text-primary-foreground')}
              >
                {formatTag(tag)}
              </Link>
            ) : (
              <span className={classes}>{formatTag(tag)}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
