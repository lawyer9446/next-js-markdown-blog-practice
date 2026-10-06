import type { Metadata } from 'next'
import { Suspense } from 'react'
import { HomePosts, HomePostsContent } from '@/components/home-posts'
import { getAllPostMeta, getAllTags } from '@/lib/posts'
import { absoluteSiteUrl } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: absoluteSiteUrl('/') },
}

export default function HomePage() {
  const props = { allPosts: getAllPostMeta(), allTags: getAllTags() }

  return (
    <Suspense fallback={<HomePostsContent {...props} />}>
      <HomePosts {...props} />
    </Suspense>
  )
}
