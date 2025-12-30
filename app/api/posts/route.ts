import { getAllPosts } from '@/lib/mdx'
import { SITE_URL } from '@/lib/constants'

export async function GET() {
    const posts = getAllPosts().map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        readTime: post.readTime,
        isNew: post.isNew,
        url: `${SITE_URL}/${post.slug}`,
    }))

    return Response.json(posts)
}
