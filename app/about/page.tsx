import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="max-w-5xl">
        <p className="text-xs tracking-widest uppercase mb-16" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          About
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Photo */}
          <div>
            <div className="w-full flex items-end p-6 rounded-sm"
              style={{ background: 'var(--surface)', aspectRatio: '3/4', border: '1px solid var(--border)' }}>
              <span className="text-xs" style={{ opacity: 0.2 }}>Photo — awaiting asset</span>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}>
              Hi, I&apos;m Jay McKoy.
            </h1>

            <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ opacity: 0.8 }}>
              <p>
                I&apos;m an artist born and raised in Bridgeport, Connecticut. My style is colorful, fun,
                and an expression of Black joy.
              </p>
              <p>
                I&apos;m working towards putting smiles on people&apos;s faces and capturing the beautiful,
                whimsical sides of being Black — one piece at a time.
              </p>
              <p>
                I work in two worlds: detailed colored pencil and graphite portraits, and flat, illustrated
                Y2K-style characters. Both are fully, unapologetically me.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/gallery"
                className="px-6 py-3 text-sm font-bold"
                style={{ background: 'var(--accent)', color: '#FAFAFE', fontFamily: 'var(--font-body)' }}>
                See the work
              </Link>
              <Link href="/commission"
                className="px-6 py-3 text-sm font-bold border"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                Commission a piece
              </Link>
            </div>

            <div className="mt-10 flex gap-6" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com/jaymckoyy' },
                { label: 'TikTok', href: 'https://tiktok.com/@jaymckoyy' },
                { label: 'Twitter', href: 'https://twitter.com/jaymckoyy' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
