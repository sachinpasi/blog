import Link from 'next/link'
import { format } from 'date-fns'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Tag } from '@/components/Tag'
import { getAllPosts } from '@/lib/mdx'
import { SITE_HEADER, SITE_INTRO, DATE_FORMAT } from '@/lib/constants'



export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="max-w-[65ch] mx-auto py-14 px-4">
      <header className="mb-12 flex items-start justify-between">
        <div>
          <h1 className="text-text font-medium tracking-tight">{SITE_HEADER}</h1>
          <p className="text-muted max-w-[55ch] mt-4">
            {SITE_INTRO}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section className="font-mono">
        {posts.map((post, index) => (
          <article key={post.slug} className="pb-1">
            <Link href={`/${post.slug}`} className="block border-none group">
              <h2 className="font-normal tracking-tight text-text group-hover:opacity-85">
                <span className="text-text">{post.title}</span>

                {post.isNew && (
                  <span className="ml-2.5 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 align-middle font-semibold">
                    new
                  </span>
                )}
              </h2>
            </Link>

            <div className="flex items-center gap-3 mt-1.5 mb-3">
              <time
                dateTime={post.date.toISOString()}
                className="text-xs text-muted"
              >
                {format(post.date, DATE_FORMAT)}
              </time>
              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>

            <p className="max-w-[60ch] text-sm text-text">{post.description}</p>

            {index !== posts.length - 1 && (
              <div className="mt-10 h-px bg-border/60" />
            )}
          </article>
        ))}
      </section>
    </main>
  )
}

