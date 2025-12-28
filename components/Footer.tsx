import { AUTHOR_NAME } from '@/lib/constants'
import { format } from 'date-fns'

export function Footer() {
    return (
        <footer className="max-w-[65ch] mx-auto px-4 py-12 text-center">
            <p className="text-xs text-muted font-mono">
                © {format(new Date(), 'yyyy')} {AUTHOR_NAME}
            </p>
        </footer>
    )
}
