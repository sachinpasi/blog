import { SITE_URL } from '@/lib/constants'

export async function GET() {
    const text = `
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

    return new Response(text, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}

