import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import _ from 'lodash'
import CodeBlock from '@/components/CodeBlock'
import { differenceInDays } from 'date-fns'
import { NEW_POST_THRESHOLD_DAYS } from './constants'

const BLOG_PATH = path.join(process.cwd(), 'content/blog')

export const getPost = cache(async (slug: string) => {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const file = fs.readFileSync(filePath, 'utf8')

    const { content, data } = matter(file)

    const { content: mdxContent } = await compileMDX({
        source: content,
        components: {
            pre: (props) => <CodeBlock {...props} />
        },
        options: {
            mdxOptions: {
                rehypePlugins: [
                    [
                        rehypePrettyCode,
                        {
                            theme: 'github-dark',
                            keepBackground: true,
                            onVisitLine(node: { children: { type: string; value: string }[] }) {
                                // Prevent empty lines from collapsing
                                if (node.children.length === 0) {
                                    node.children = [{ type: 'text', value: ' ' }]
                                }
                            },
                            onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
                                node.properties.className?.push('line--highlighted')
                            },
                        },
                    ],
                ],

            },
        },
    })

    return {
        meta: data,
        content: mdxContent,
    }
})

export function getAllSlugs() {
    return fs
        .readdirSync(BLOG_PATH)
        .map((file) => file.replace(/\.mdx$/, ''))
}


export function getReadTime(content: string): string {
    const noOfWords = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / 200);

    return `${minutes} min read`;
}

export function isNewPost(date: Date) {
    return differenceInDays(new Date(), date) <= NEW_POST_THRESHOLD_DAYS
}

export type Post = {
    slug: string
    title: string
    date: Date
    description: string
    tags: string[]
    readTime: string
    isNew: boolean
}

export function getAllPosts(): Post[] {
    const posts = getAllSlugs().map((slug) => {
        const file = fs.readFileSync(
            path.join(BLOG_PATH, `${slug}.mdx`),
            'utf8'
        )

        const { data } = matter(file)

        return {
            slug,
            title: data.title,
            date: new Date(data.date),
            description: data.description,
            tags: (data.tags as string[]) || [],
            readTime: getReadTime(file),
            isNew: isNewPost(new Date(data.date)),
        }
    })

    return _.orderBy(posts, ['date'], ['desc'])
}

export function getPostsByTag(tag: string): Post[] {
    return _.filter(getAllPosts(), (post) =>
        _.includes(post.tags.map((t) => t.toLowerCase()), tag.toLowerCase())
    )
}
