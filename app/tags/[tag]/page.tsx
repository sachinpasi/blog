import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tag } from '@/components/Tag'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getPostsByTag, getAllPosts } from '@/lib/mdx'
import { DATE_FORMAT } from '@/lib/constants'

type PageProps = {
    params: Promise<{
        tag: string
    }>
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    const tags = _.uniq(_.flatMap(posts, 'tags'))
    return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { tag } = await params
    const title = _.capitalize(tag)
    return {
        title: `Posts tagged "${title}"`,
        description: `All posts tagged with ${title}`,
    }
}

export default async function TagPage({ params }: PageProps) {
    const { tag } = await params
    const posts = getPostsByTag(tag)
    const title = _.capitalize(tag)

    return (
        <main className="max-w-[65ch] mx-auto py-14 px-4">
            <header className="mb-12 flex items-start justify-between">
                <div>
                    <Link
                        href="/"
                        className="text-sm font-mono text-muted hover:text-text transition-colors no-underline mb-4 block"
                    >
                        ← All Posts
                    </Link>
                    <h1 className="text-text font-medium tracking-tight">
                        Tagged: <span className="text-muted">{title}</span>
                    </h1>
                </div>
                <ThemeToggle />
            </header>

            <section className="font-mono">
                {posts.map((post) => (
                    <article key={post.slug} className="pb-1">
                        <a href={`/${post.slug}`} className="block border-none group">
                            <h2 className="font-normal tracking-tight text-text group-hover:opacity-85">
                                <span className="text-text">{post.title}</span>
                            </h2>
                        </a>

                        <div className="flex items-center gap-3 mt-1.5 mb-3">
                            <time
                                dateTime={post.date.toISOString()}
                                className="text-xs text-muted"
                            >
                                {format(post.date, DATE_FORMAT)}
                            </time>
                            <div className="flex gap-2">
                                {post.tags?.map((t) => (
                                    <Tag key={t} tag={t} />
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}
