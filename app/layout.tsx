import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: { default: 'Jay McKoy', template: '%s — Jay McKoy' },
  description: 'Artist from Bridgeport, Connecticut. Colorful, fun, an expression of black joy.',
  openGraph: {
    title: 'Jay McKoy',
    description: 'Artist from Bridgeport, Connecticut. Colorful, fun, an expression of black joy.',
    url: 'https://jaymckoy.com',
    siteName: 'Jay McKoy',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
