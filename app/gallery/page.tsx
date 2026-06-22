import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gallery' }

const categories = [
  {
    href: '/gallery/characters',
    label: 'Characters',
    description: 'Flat, illustrated, Y2K-style characters, bold colour and Black joy.',
    previewFile: 'IMG_6869.jpg',
    count: 15,
  },
  {
    href: '/gallery/portraits',
    label: 'Portraits',
    description: 'Detailed colored pencil and graphite portrait work.',
    previewFile: null,
    count: null,
  },
  {
    href: '/gallery/sketches',
    label: 'Sketches',
    description: 'Works in progress. Always drawing.',
    previewFile: 'IMG_6743.jpg',
    count: null,
  },
]

export default function GalleryPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: '#fff', padding: '48px 60px 80px' }}>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: '40px',
        opacity: 0.4,
      }}>
        Gallery
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        {categories.map((cat) => (
          <Link key={cat.href} href={cat.href}
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
            className="group">

            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: '#F2EFF8', marginBottom: '20px' }}>
              {cat.previewFile ? (
                <Image
                  src={`/artwork/${cat.previewFile}`}
                  alt={cat.label}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    opacity: 0.3,
                  }}>
                    Coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Text — matches reference: uppercase tracking heading, clean body */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#000',
              }}>
                {cat.label}
              </h2>
              {cat.count && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', opacity: 0.4 }}>
                  {cat.count} works
                </span>
              )}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 400,
              color: '#333',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}>
              {cat.description}
            </p>

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '0.04em',
            }}>
              View series →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
