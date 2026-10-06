import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'
import { formatDate, withBasePath } from '@/lib/site'
import { TagList } from './tag-list'

type PostCardProps = {
  post: PostMeta
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
}

export function PostCard({ post, headingLevel: Heading = 'h2', priority = false }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-lg hover:shadow-foreground/5">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={withBasePath(post.heroImage || '/placeholder.svg')}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <TagList tags={post.tags} />
        <Heading className="font-serif text-xl font-semibold leading-snug text-balance">
          <Link
            href={`/posts/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] hover:text-primary"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </article>
  )
}
