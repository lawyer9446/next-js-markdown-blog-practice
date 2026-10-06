import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { cache } from 'react'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const WORDS_PER_MINUTE = 220

export type PostMeta = {
  title: string
  slug: string
  tags: string[]
  excerpt: string
  publishedAt: string
  heroImage: string
  heroAlt: string
  author: string
  readingTime: number
}

export type Post = PostMeta & { content: string }

function calculateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|\-[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

function parsePostFile(fileName: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8')
  const { data, content } = matter(raw)

  const slug = String(data.slug ?? fileName.replace(/\.md$/, ''))
  if (!data.title) throw new Error(`Post "${fileName}" is missing a title`)

  return {
    title: String(data.title),
    slug,
    tags: Array.isArray(data.tags) ? data.tags.map((t: unknown) => String(t).toLowerCase()) : [],
    excerpt: String(data.excerpt ?? ''),
    publishedAt: new Date(data.publishedAt ?? Date.now()).toISOString(),
    heroImage: String(data.heroImage ?? '/placeholder.jpg'),
    heroAlt: String(data.heroAlt ?? data.title),
    author: String(data.author ?? 'maya-okafor'),
    readingTime: calculateReadingTime(content),
    content,
  }
}

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parsePostFile)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
})

export function getAllPostMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPostMeta()
  const index = posts.findIndex((p) => p.slug === slug)
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  }
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPostMeta()
  const current = posts.find((p) => p.slug === slug)
  if (!current) return []

  const others = posts.filter((p) => p.slug !== slug)
  const scored = others
    .map((post) => ({
      post,
      shared: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((s) => s.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared || +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt),
    )
    .map((s) => s.post)

  if (scored.length >= limit) return scored.slice(0, limit)

  const fillers = others.filter((p) => !scored.includes(p))
  return [...scored, ...fillers].slice(0, limit)
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    currentPage: current,
    totalPages,
  }
}
