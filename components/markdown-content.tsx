import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

const components: Components = {
  // The post title is the page's h1, so Markdown h1s are demoted to keep a single top-level heading.
  h1: ({ node: _node, ...props }) => <h2 {...props} />,
  a: ({ node: _node, href = '', children, ...props }) => {
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  },
  table: ({ node: _node, ...props }) => (
    <div className="not-prose my-8 overflow-x-auto rounded-lg border border-border" role="region" aria-label="Table" tabIndex={0}>
      <table className="w-full border-collapse text-left text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5 [&_th]:bg-secondary [&_th]:px-4 [&_th]:py-2.5 [&_th]:font-semibold" {...props} />
    </div>
  ),
  pre: ({ node: _node, ...props }) => <pre tabIndex={0} {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ node: _node, alt = '', ...props }) => <img alt={alt} loading="lazy" className="rounded-lg" {...props} />,
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-lg prose-stone max-w-none
        prose-headings:scroll-mt-24 prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-2xl
        prose-p:leading-relaxed prose-p:text-foreground/90
        prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:decoration-2
        prose-strong:text-foreground
        prose-blockquote:border-l-primary prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-normal prose-blockquote:text-foreground
        prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-accent-foreground prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-xl prose-pre:bg-foreground prose-pre:text-background
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
        prose-li:marker:text-primary"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
