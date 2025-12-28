import { getAllPosts } from '@/lib/mdx'
import { SITE_URL } from '@/lib/constants'
import _ from 'lodash'

export async function GET() {
  const posts = getAllPosts()

  const urls = posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/${post.slug}</loc>
    <lastmod>${post.date.toISOString()}</lastmod>
  </url>`
    )
    .join('')

  const tags = _.uniq(_.flatMap(posts, 'tags'))
  const tagUrls = tags
    .map(
      (tag) => `
  <url>
    <loc>${SITE_URL}/tags/${tag.toLowerCase()}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
  </url>
  ${urls}
  ${tagUrls}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
