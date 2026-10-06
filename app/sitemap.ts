import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}/`,
    lastModified: post.publishedAt,
  }))

  return [
    { url: `${siteConfig.url}/`, lastModified: posts[0]?.lastModified },
    { url: `${siteConfig.url}/about/` },
    ...posts,
  ]
}
