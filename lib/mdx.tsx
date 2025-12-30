import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import _ from 'lodash'
import { z } from 'zod'
import CodeBlock from '@/components/CodeBlock'
import { differenceInDays } from 'date-fns'
import { NEW_POST_THRESHOLD_DAYS } from './constants'

const BLOG_PATH = path.join(process.cwd(), 'content/blog')

// Validation Schema
const PostSchema = z.object({
    title: z.string(),
    date: z.string().or(z.date()).transform((val) => new Date(val)),
    description: z.string(),
    tags: z.array(z.string()).default([]),
})

export type Post = z.infer<typeof PostSchema> & {
    slug: string
    readTime: string
    isNew: boolean
}

export function getAllSlugs() {
    return fs.readdirSync(BLOG_PATH).map((file) => file.replace(/\.mdx$/, ''))
}

export function getReadTime(content: string): string {
    const noOfWords = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(noOfWords / 200)
    return `${minutes} min read`
}

export function isNewPost(date: Date) {
    return differenceInDays(new Date(), date) <= NEW_POST_THRESHOLD_DAYS
}

export const getPost = cache(async (slug: string) => {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const file = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(file)

    // Validate frontmatter
    const parsedData = PostSchema.safeParse(data)
    if (!parsedData.success) {
        console.error(`Invalid frontmatter for ${slug}:`, parsedData.error)
        return null
    }

    const { content: mdxContent } = await compileMDX({
        source: content,
        components: {
            pre: (props) => <CodeBlock {...props} />,
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
        meta: {
            ...parsedData.data,
            slug,
            readTime: getReadTime(file),
            isNew: isNewPost(parsedData.data.date),
        },
        content: mdxContent,
    }
})

export const getAllPosts = cache(() => {
    const posts = getAllSlugs().map((slug) => {
        const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
        const file = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(file)

        const parsedData = PostSchema.safeParse(data)
        if (!parsedData.success) {
            console.error(`Invalid frontmatter for ${slug}:`, parsedData.error)
            return null
        }

        return {
            ...parsedData.data,
            slug,
            readTime: getReadTime(file),
            isNew: isNewPost(parsedData.data.date),
        }
    })

    return _.orderBy(_.compact(posts), ['date'], ['desc'])
})

export function getPostsByTag(tag: string): Post[] {
    return _.filter(getAllPosts(), (post) =>
        _.includes(post.tags.map((t) => t.toLowerCase()), tag.toLowerCase())
    )
}
