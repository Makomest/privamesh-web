import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/** Global MDX element styling for blog posts. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-text-primary"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="mt-8 scroll-mt-24 text-lg font-semibold text-text-secondary">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="mt-4 text-[17px] leading-[1.75] text-text-muted">{children}</p>,
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-[1.75] text-text-muted">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[17px] leading-[1.75] text-text-muted">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-text-secondary">{children}</strong>,
    code: ({ children }) => (
      <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[14px] text-accent">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent/50 pl-4 text-text-secondary">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <Link href={href ?? '#'} className="text-accent underline-offset-2 hover:underline">
        {children}
      </Link>
    ),
    ...components,
  }
}
