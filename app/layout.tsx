import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'MoodNet - Anonymous Web3 Conversations',
  description: 'Anonymous, mood-driven conversations for Web3 insiders',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text-primary stars-bg">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
