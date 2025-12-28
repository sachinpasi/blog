import './globals.css'
import { SITE_NAME, SITE_TEMPLATE, SITE_DESCRIPTION, RSS_URL } from '@/lib/constants'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata = {
  title: {
    default: SITE_NAME,
    template: SITE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    types: {
      'application/rss+xml': RSS_URL,
    },
  },
}


import { Footer } from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
