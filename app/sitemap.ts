import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()

    const blogs = posts.map((post) => ({
        url: `${SITE_URL}/${post.slug}`,
        lastModified: post.date.toISOString(),
    }))

    const routes = ['', '/'].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date().toISOString(),
    }))

    return [...routes, ...blogs]
}
