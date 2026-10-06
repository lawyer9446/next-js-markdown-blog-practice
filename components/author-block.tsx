import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/site'

export function AuthorBlock({ author }: { author: Author }) {
  return (
    <aside
      aria-labelledby="author-heading"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-start"
    >
      <Image
        src={author.avatar || '/placeholder.svg'}
        alt={`Portrait of ${author.name}`}
        width={80}
        height={80}
        className="size-20 shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Written by</p>
        <h2 id="author-heading" className="mt-1 font-serif text-xl font-semibold">
          {author.name}
        </h2>
        <p className="text-sm text-primary">{author.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
        <Link
          href="/about"
          className="mt-3 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          More about {author.name.split(' ')[0]}
        </Link>
      </div>
    </aside>
  )
}
