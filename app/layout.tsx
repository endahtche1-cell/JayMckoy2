import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'
import MusicPlayer from '@/components/MusicPlayer'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://jaymckoy.com'),
  title: { default: 'Jay McKoy', template: '%s - Jay McKoy' },
  description: 'Artist from Bridgeport, Connecticut. Colorful, fun, an expression of black joy.',
  openGraph: {
    title: 'Jay McKoy',
    description: 'Artist from Bridgeport, Connecticut. Colorful, fun, an expression of black joy.',
    url: 'https://jaymckoy.com',
    siteName: 'Jay McKoy',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 900, height: 1200, alt: 'Jay McKoy artwork' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay McKoy',
    description: 'Artist from Bridgeport, Connecticut. Colorful, fun, an expression of black joy.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link rel="preload" href="/fonts/WinterWhimsy.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <StarField />
        <Nav />
        <main className="flex-1" style={{ display:'flex', flexDirection:'column', minHeight:0 }}>{children}</main>
        <Footer />
        <MusicPlayer />
      </body>
    </html>
  )
}
