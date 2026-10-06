import type { PostMeta } from '@/lib/posts'
import { PostCard } from './post-card'

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null

  return (
    <section aria-labelledby="related-heading" className="border-t border-border pt-12">
      <h2 id="related-heading" className="font-serif text-3xl font-semibold tracking-tight">
        Related posts
      </h2>
      <p className="mt-2 text-muted-foreground">More essays on similar topics.</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </section>
  )
}
