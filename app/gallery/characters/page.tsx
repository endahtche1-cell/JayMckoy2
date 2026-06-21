import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = { title: 'Characters' }

// 10 featured first, remaining 5 after
const pieces = [
  { file: 'IMG_6869.jpg', title: 'Nine', featured: true },
  { file: 'IMG_6848.jpg', title: 'Purple Season', featured: true },
  { file: 'IMG_6849.jpg', title: 'Pink Season', featured: true },
  { file: 'IMG_6858.jpg', title: 'Flower Girl', featured: true },
  { file: 'IMG_6741.jpg', title: 'Cherry Blossom', featured: true },
  { file: 'IMG_6743.jpg', title: 'Braids', featured: true },
  { file: 'IMG_6776.jpg', title: 'In Bloom', featured: true },
  { file: 'IMG_6859.jpg', title: 'Plaid', featured: true },
  { file: 'IMG_6860.jpg', title: 'Sweet', featured: true },
  { file: 'IMG_6775.jpg', title: 'Two', featured: true },
  { file: 'IMG_6746.jpg', title: 'Curls', featured: false },
  { file: 'IMG_6774.jpg', title: 'Golden', featured: false },
  { file: 'IMG_6810.jpg', title: 'Bloom', featured: false },
  { file: 'IMG_6841.jpg', title: 'Together', featured: false },
  { file: 'IMG_6861.jpg', title: 'Pink Wave', featured: false },
]

export default function CharactersPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="flex items-baseline justify-between mb-12">
        <div>
          <p className="text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
            Gallery
          </p>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Characters</h1>
        </div>
        <span className="text-xs" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>{pieces.length} works</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {pieces.map((piece, i) => (
          <FadeIn key={piece.file} delay={(i % 4) * 80}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm mb-2" style={{ aspectRatio: '3/4', background: 'var(--surface)' }}>
                <Image
                  src={`/artwork/${piece.file}`}
                  alt={piece.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{piece.title}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-sm" style={{ opacity: 0.55, fontFamily: 'var(--font-body)' }}>
          Want a piece made for you?
        </p>
        <Link href="/commission"
          className="px-6 py-3 text-sm font-bold"
          style={{ background: 'var(--accent)', color: '#FAFAFE', fontFamily: 'var(--font-body)', borderRadius: '4px' }}>
          Commission Jay →
        </Link>
      </div>
    </div>
  )
}
