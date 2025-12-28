import Link from 'next/link'

export function Tag({ tag }: { tag: string }) {
    return (
        <Link
            href={`/tags/${tag.toLowerCase()}`}
            className="inline-block px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider border border-border rounded text-muted hover:text-text hover:border-text transition-colors"
        >
            {tag}
        </Link>
    )
}
