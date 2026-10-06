import type { Metadata } from 'next'
import { PostCard } from '@/components/post-card'
import { TagFilter } from '@/components/tag-filter'
import { Pagination } from '@/components/pagination'
import { getAllPostMeta, getAllTags, paginate } from '@/lib/posts'
import { formatTag, siteConfig } from '@/lib/site'

type SearchParams = Promise<{ tag?: string | string[]; page?: string | string[] }>

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const tag = first(params.tag)?.toLowerCase()
  const page = Number(first(params.page)) || 1

  if (!tag && page === 1) return { alternates: { canonical: '/' } }

  const label = tag ? `Posts tagged “${formatTag(tag)}”` : 'All posts'
  const title = page > 1 ? `${label} — Page ${page}` : label
  const query = new URLSearchParams()
  if (tag) query.set('tag', tag)
  if (page > 1) query.set('page', String(page))

  return {
    title,
    description: tag ? `Articles about ${tag} on ${siteConfig.name}.` : siteConfig.description,
    alternates: { canonical: `/?${query.toString()}` },
  }
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const allTags = getAllTags()
  const requestedTag = first(params.tag)?.toLowerCase()
  const activeTag = allTags.some((t) => t.tag === requestedTag) ? requestedTag : undefined
  const requestedPage = Number.parseInt(first(params.page) ?? '1', 10) || 1

  const allPosts = getAllPostMeta()
  const filtered = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts
  const { items, currentPage, totalPages } = paginate(filtered, requestedPage, siteConfig.postsPerPage)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="page-title" className="border-b border-border py-12 md:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">The journal</p>
        <h1
          id="page-title"
          className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Notes on typography, accessibility, and building for the web.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {siteConfig.description} New essays every couple of weeks, written slowly and edited carefully.
        </p>
      </section>

      <section aria-labelledby="posts-heading" className="pt-10">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="posts-heading" className="font-serif text-2xl font-semibold">
              {activeTag ? `Tagged “${formatTag(activeTag)}”` : 'Latest articles'}
            </h2>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
          <TagFilter tags={allTags} activeTag={activeTag} totalCount={allPosts.length} />
        </div>

        {items.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post, i) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel="h3" priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No posts found.
          </p>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} tag={activeTag} />
      </section>
    </div>
  )
}
