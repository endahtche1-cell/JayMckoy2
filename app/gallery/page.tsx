import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gallery' }

const categories = [
  {
    href: '/gallery/characters',
    label: 'Characters',
    description: 'Flat, illustrated, Y2K-style characters — bold colour and Black joy.',
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
    <div className="px-6 py-16 md:px-12">
      <h1 className="text-xs tracking-widest uppercase mb-16" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
        Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.href} href={cat.href} className="group flex flex-col">
            <div className="relative overflow-hidden rounded-sm mb-5" style={{ aspectRatio: '4/3', background: 'var(--surface)' }}>
              {cat.previewFile ? (
                <Image
                  src={`/artwork/${cat.previewFile}`}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs tracking-widest uppercase" style={{ opacity: 0.3, fontFamily: 'var(--font-body)' }}>
                    Coming soon
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{cat.label}</h2>
              {cat.count && (
                <span className="text-xs" style={{ opacity: 0.4, fontFamily: 'var(--font-body)' }}>{cat.count} works</span>
              )}
            </div>
            <p className="text-sm" style={{ opacity: 0.55, fontFamily: 'var(--font-body)' }}>{cat.description}</p>
            <span className="mt-3 text-xs font-bold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
              View series →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
