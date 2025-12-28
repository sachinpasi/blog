import RSS from 'rss'
import { getAllPosts } from '@/lib/mdx'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, RSS_URL } from '@/lib/constants'

export function generateRss() {
    const feed = new RSS({
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        site_url: SITE_URL,
        feed_url: `${SITE_URL}${RSS_URL}`,
        language: 'en',
    })

    const posts = getAllPosts()

    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `${SITE_URL}/${post.slug}`,
            date: post.date,
        })
    })

    return feed.xml({ indent: true })
}
