import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

const gridPieces = [
  { file: 'IMG_6848.jpg', title: 'Purple Season', w: 1272, h: 1800 },
  { file: 'IMG_6869.jpg', title: 'Nine', w: 1272, h: 1800 },
  { file: 'IMG_6741.jpg', title: 'Cherry Blossom', w: 1350, h: 1800 },
  { file: 'IMG_6776.jpg', title: 'In Bloom', w: 1800, h: 1257 },
  { file: 'IMG_6775.jpg', title: 'Two', w: 1800, h: 1350 },
  { file: 'IMG_6849.jpg', title: 'Pink Season', w: 1272, h: 1800 },
  { file: 'IMG_6858.jpg', title: 'Flower Girl', w: 1272, h: 1800 },
  { file: 'IMG_6743.jpg', title: 'Braids', w: 1350, h: 1800 },
  { file: 'IMG_6859.jpg', title: 'Plaid', w: 1272, h: 1800 },
  { file: 'IMG_6860.jpg', title: 'Sweet', w: 1440, h: 1800 },
  { file: 'IMG_6810.jpg', title: 'Bloom', w: 1272, h: 1800 },
  { file: 'IMG_6841.jpg', title: 'Together', w: 1272, h: 1800 },
  { file: 'IMG_6861.jpg', title: 'Pink Wave', w: 1272, h: 1800 },
  { file: 'IMG_6746.jpg', title: 'Curls', w: 1257, h: 1800 },
  { file: 'IMG_6774.jpg', title: 'Golden', w: 1440, h: 1800 },
]

export default function HomePage() {
  return (
    <div style={{ background: '#ffffff' }}>
      <style>{`
        /*
          Gallery wall layout — equal negative space on all sides.
          Left margin = centre column gap = right margin.
          Images at natural aspect ratio. No cropping.
        */
        .masonry {
          columns: 2;
          column-gap: 10px;
          padding: 0 10px 60px;
        }

        @media (min-width: 1024px) {
          .masonry {
            /*
              Outer margins match header (5vw).
              Centre gap is 4vw — slightly narrower than outer margins to
              compensate for the Gestalt effect of two image edges flanking
              the gap (which makes it read wider than it measures).
              Result: the gallery feels visually balanced across the page.
            */
            padding: 0 19vw 80px;
            column-gap: 4vw;
          }
        }

        .masonry-item {
          break-inside: avoid;
          display: block;
          margin-bottom: 10px;
        }

        @media (min-width: 1024px) {
          .masonry-item {
            margin-bottom: 60px;
          }
        }

        .masonry-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }

        .masonry-item:hover img {
          transform: scale(1.015);
        }
      `}</style>

      <div className="masonry">
        {gridPieces.map((p, i) => (
          <FadeIn key={p.file} delay={i < 2 ? 0 : Math.min((i % 4) * 80, 240)} className="masonry-item">
            <Link href="/gallery/characters" style={{ display: 'block' }}>
              <Image
                src={`/artwork/${p.file}`}
                alt={p.title}
                width={p.w}
                height={p.h}
                priority={i < 4}
                sizes="(max-width: 1024px) 50vw, calc((1440px - 360px) / 2)"
              />
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
