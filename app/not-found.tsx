import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="max-w-[65ch] mx-auto py-14 px-4 flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4 font-sans text-text">404</h1>
            <p className="text-lg text-[#888] mb-8 font-sans">Page not found.</p>
            <Link href="/" className="text-link transition-colors font-mono">
                ← Go home
            </Link>
        </main>
    )
}
