import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RegisterServiceWorker } from '@/components/pwa/register-sw'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Realty Pulse AI - Luxury Real Estate Dashboard',
  description: 'AI-powered real estate management platform for luxury properties. Manage properties, clients, analytics, and marketing with cutting-edge AI technology.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Realty Pulse',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icons/icon-192x192.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        url: '/icons/icon-512x512.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
    apple: '/icons/icon-192x192.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0f14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <RegisterServiceWorker />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
