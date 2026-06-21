import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Portraits' }

export default function PortraitsPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          Gallery
        </p>
        <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Portraits</h1>
      </div>

      <div className="max-w-md py-20">
        <p className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', opacity: 0.4 }}>
          Coming soon.
        </p>
        <p className="text-base mb-8" style={{ opacity: 0.55, fontFamily: 'var(--font-body)' }}>
          Jay&apos;s detailed colored pencil and graphite portrait work is on its way.
          In the meantime — see the characters gallery, or commission a piece.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/gallery/characters"
            className="px-6 py-3 text-sm font-bold"
            style={{ background: 'var(--accent)', color: '#FAFAFE', fontFamily: 'var(--font-body)', borderRadius: '4px' }}>
            See Characters →
          </Link>
          <Link href="/commission"
            className="px-6 py-3 text-sm font-bold border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', fontFamily: 'var(--font-body)', borderRadius: '4px' }}>
            Commission a piece
          </Link>
        </div>
      </div>
    </div>
  )
}
