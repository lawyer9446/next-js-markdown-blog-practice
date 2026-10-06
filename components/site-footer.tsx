import Link from 'next/link'
import { getAllTags } from '@/lib/posts'
import { formatTag, siteConfig } from '@/lib/site'

export function SiteFooter() {
  const tags = getAllTags().slice(0, 8)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <p className="font-serif text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary hover:underline underline-offset-4">
                All articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary hover:underline underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-primary hover:underline underline-offset-4">
                Sitemap
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-topics">
          <h2 id="footer-topics" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Topics
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {tags.map(({ tag }) => (
              <li key={tag}>
                <Link
                  href={`/?tag=${encodeURIComponent(tag)}`}
                  className="hover:text-primary hover:underline underline-offset-4"
                >
                  {formatTag(tag)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          {'© '}
          {year} {siteConfig.name}. Written in Markdown, rendered with Next.js.
        </p>
      </div>
    </footer>
  )
}
