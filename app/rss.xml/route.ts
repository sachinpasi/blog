import { generateRss } from '@/lib/rss'

export async function GET() {
    const xml = generateRss()

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
