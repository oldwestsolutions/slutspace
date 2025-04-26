import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from './providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SlutTube - Video Sharing Platform',
  description: 'A YouTube-style video sharing platform',
  applicationName: 'SlutTube',
  appleWebApp: {
    capable: true,
    title: 'SlutTube',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0F0F0F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-900 text-white h-full touch-action-manipulation ios-tap-highlight-transparent`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
} 