import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAuthor, siteConfig } from '@/lib/site'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.name} and its author.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const author = getAuthor('maya-okafor')
  const postCount = getAllPosts().length

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
        A slow blog about the details that matter.
      </h1>
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src={author.avatar || '/placeholder.svg'}
          alt={`Portrait of ${author.name}`}
          width={120}
          height={120}
          className="size-28 rounded-full object-cover"
        />
        <div>
          <h2 className="font-serif text-2xl font-semibold">{author.name}</h2>
          <p className="text-primary">{author.role}</p>
        </div>
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>{author.bio}</p>
        <p>
          {siteConfig.name} is a collection of {postCount} essays and counting. Every post is a plain Markdown file,
          which keeps the writing portable and the site fast.
        </p>
        <p>
          <Link href="/" className="font-medium text-primary underline underline-offset-4">
            Browse all articles
          </Link>
        </p>
      </div>
    </div>
  )
}
