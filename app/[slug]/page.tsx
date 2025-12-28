import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Tag } from '@/components/Tag'
import { getPost, getAllSlugs } from '@/lib/mdx'
import { DATE_FORMAT } from '@/lib/constants'

type PageProps = {
    params: Promise<{
        slug: string
    }>
}



export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {}
    }

    return {
        title: post.meta.title,
        description: post.meta.description,
    }
}


export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const formattedDate = format(new Date(post.meta.date), DATE_FORMAT)
    const tags = (post.meta.tags as string[]) || []


    return (
        <main className="max-w-[65ch] mx-auto py-14 px-4">
            <div className="flex justify-end mb-8">
                <ThemeToggle />
            </div>

            <div className="mb-8">
                <Link
                    href="/"
                    className="text-sm font-mono text-muted hover:text-text transition-colors no-underline"
                >
                    ← Back
                </Link>
            </div>

            <h1 className="text-3xl font-medium tracking-tight text-text mb-2">{post.meta.title}</h1>

            <div className="flex items-center gap-3 text-sm text-muted">
                <p>{formattedDate}</p>
                {tags.length > 0 && (
                    <div className="flex gap-2">
                        {tags.map((tag) => (
                            <Tag key={tag} tag={tag} />
                        ))}
                    </div>
                )}

            </div>

            <article>{post.content}</article>
        </main>
    )
}
