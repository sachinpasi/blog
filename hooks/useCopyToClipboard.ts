import { useState } from 'react'
import { COPY_TIMEOUT } from '@/lib/constants'

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false)

    const copy = async (text: string) => {
        if (!text) return

        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), COPY_TIMEOUT)
        } catch (error) {
            console.warn('Copy failed', error)
            setCopied(false)
        }
    }

    return { copied, copy }
}
