'use client'

import { useRef, isValidElement } from 'react'
import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

interface CodeProps {
    className?: string
    children?: React.ReactNode
}

export default function CodeBlock({ children }: { children: React.ReactNode }) {
    const preRef = useRef<HTMLPreElement>(null)
    const { copied, copy } = useCopyToClipboard()

    // Safe access to potential code element props
    const codeElement = isValidElement<CodeProps>(children) ? children : null
    const language =
        codeElement?.props.className?.replace('language-', '') || ''

    const handleCopy = () => {
        if (preRef.current) {
            copy(preRef.current.innerText.trim())
        }
    }

    return (
        <div className="my-8 border border-[#1f222a] rounded-lg overflow-hidden bg-code-bg group">
            <div className="grid grid-cols-[auto_1fr_auto] items-center px-3 py-2 text-[0.65rem] bg-[#0d0f14] border-b border-border">
                <div className="flex items-center gap-1.5 mr-2 opacity-85 group-hover:opacity-100 transition-opacity">
                    <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
                    <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
                    <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
                </div>

                <span className="justify-self-center text-muted lowercase tracking-widest text-xs">
                    {language}
                </span>

                <button
                    onClick={handleCopy}
                    className="flex items-center justify-center bg-transparent border border-[#222] rounded-md text-[#8a8a8a] p-1 cursor-pointer hover:text-white hover:border-[#333] transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <Check size={14} strokeWidth={2} />
                    ) : (
                        <Copy size={14} strokeWidth={1.8} />
                    )}
                </button>
            </div>


            <pre ref={preRef} className="m-0 p-5 bg-transparent overflow-x-auto text-[0.92rem] font-mono leading-relaxed">
                {codeElement ? codeElement.props.children : children}
            </pre>
        </div>
    )
}
