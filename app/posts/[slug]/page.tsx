import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import { MarkdownContent } from '@/components/markdown-content'
import { AuthorBlock } from '@/components/author-block'
import { PostNavigation } from '@/components/post-navigation'
import { RelatedPosts } from '@/components/related-posts'
import { TagList } from '@/components/tag-list'
import { getAdjacentPosts, getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { formatDate, getAuthor, siteConfig } from '@/lib/site'

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const author = getAuthor(post.author)
  const url = `/posts/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [author.name],
      tags: post.tags,
      images: [{ url: post.heroImage, alt: post.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const author = getAuthor(post.author)
  const { newer, older } = getAdjacentPosts(post.slug)
  const related = getRelatedPosts(post.slug, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: new URL(post.heroImage, siteConfig.url).toString(),
    datePublished: post.publishedAt,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: author.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: new URL(`/posts/${post.slug}`, siteConfig.url).toString(),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl pt-10 text-center md:pt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All articles
          </Link>
          <TagList tags={post.tags} className="mt-6 justify-center" />
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>
              By <span className="font-medium text-foreground">{author.name}</span>
            </span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">&middot;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <figure className="mt-10 md:mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted md:aspect-[21/9]">
            <Image
              src={post.heroImage || '/placeholder.svg'}
              alt={post.heroAlt}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="mx-auto mt-12 max-w-[68ch] md:mt-16">
          <MarkdownContent content={post.content} />
        </div>

        <footer className="mx-auto mt-16 flex max-w-3xl flex-col gap-10">
          <AuthorBlock author={author} />
          <PostNavigation previous={older} next={newer} />
        </footer>
      </article>

      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <RelatedPosts posts={related} />
      </div>
    </>
  )
}
