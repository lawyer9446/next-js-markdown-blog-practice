export const siteConfig = {
  name: 'The Margin',
  description:
    'Essays on typography, accessibility, and building thoughtful software for the web.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ??
    'https://lawyer9446.github.io/next-js-markdown-blog-practice').replace(/\/$/, ''),
  postsPerPage: 6,
}

export type Author = {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
}

const authors: Record<string, Author> = {
  'maya-okafor': {
    id: 'maya-okafor',
    name: 'Maya Okafor',
    role: 'Design Engineer',
    bio: 'Maya writes about the space between design and code — typography, accessibility, and the small decisions that make interfaces feel considered.',
    avatar: '/images/authors/maya-okafor.png',
  },
}

export function getAuthor(id: string): Author {
  return authors[id] ?? authors['maya-okafor']
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

const tagLabels: Record<string, string> = {
  css: 'CSS',
  nextjs: 'Next.js',
  react: 'React',
}

export function formatTag(tag: string) {
  return tagLabels[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1)
}

// Next.js adds basePath to Link hrefs, but public asset URLs need it explicitly.
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/next-js-markdown-blog-practice'
  if (!path.startsWith('/') || path.startsWith('//')) return path
  if (path === basePath || path.startsWith(`${basePath}/`)) return path
  return `${basePath}${path}`
}

export function absoluteSiteUrl(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path)) return path
  return `${siteConfig.url}/${path.replace(/^\//, '')}`
}
