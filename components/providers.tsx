'use client'

import { ThemeProvider } from 'next-themes'

import { DEFAULT_THEME } from '@/lib/constants'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme={DEFAULT_THEME} enableSystem={false}>
            {children}
        </ThemeProvider>
    )
}
