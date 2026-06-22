import Link from 'next/link'
import Image from 'next/image'

const GAP = 20

function ArtLink({ file, w, h, priority = false }: { file: string; w: number; h: number; priority?: boolean }) {
  return (
    <Link href="/gallery/characters" style={{ display: 'block' }} className="group">
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <Image
          src={`/artwork/${file}`}
          alt=""
          width={w}
          height={h}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          className="transition-transform duration-700 group-hover:scale-[1.02]"
          priority={priority}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div>
      <style>{`
        .home-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px 0;
        }
        .bottom-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        @media (max-width: 768px) {
          .home-wrap, .bottom-wrap { padding: 8px 10px; }
        }
      `}</style>

      <div className="home-wrap">
        <div style={{ display: 'flex', gap: GAP, alignItems: 'flex-start' }}>

          {/* Left narrow column: 6869 → 6746 → 6775 → 6774 */}
          <div style={{ flex: '0 0 24%', display: 'flex', flexDirection: 'column', gap: GAP }}>
            <ArtLink file="IMG_6869.jpg" w={1257} h={1800} priority />
            <ArtLink file="IMG_6746.jpg" w={1257} h={1800} priority />
            <ArtLink file="IMG_6775.jpg" w={1800} h={1350} />
            <ArtLink file="IMG_6774.jpg" w={1440} h={1800} />
          </div>

          {/* Right wide section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: GAP }}>

            {/* Top row: 6741 | 6860 | 6861 — fixed equal height, 6861 cropped to match */}
            <div style={{ display: 'flex', gap: GAP }}>
              {[
                { file: 'IMG_6741.jpg', w: 1350, h: 1800 },
                { file: 'IMG_6860.jpg', w: 1440, h: 1800 },
                { file: 'IMG_6861.jpg', w: 1272, h: 1800 },
              ].map((img, i) => (
                <div key={img.file} style={{ flex: 1, overflow: 'hidden', aspectRatio: '3/4', position: 'relative', zIndex: 1 }}>
                  <Link href="/gallery/characters" className="group" style={{ display: 'block', height: '100%' }}>
                    <Image
                      src={`/artwork/${img.file}`}
                      alt=""
                      width={img.w}
                      height={img.h}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                      className="transition-transform duration-700 group-hover:scale-[1.02]"
                      priority={i < 2}
                      sizes="20vw"
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Large landscape: 6776 */}
            <ArtLink file="IMG_6776.jpg" w={1800} h={1257} />

            {/* Bottom row: 6743 | 6848 | 6859 */}
            <div style={{ display: 'flex', gap: GAP }}>
              <div style={{ flex: 1 }}><ArtLink file="IMG_6743.jpg" w={1350} h={1800} /></div>
              <div style={{ flex: 1 }}><ArtLink file="IMG_6848.jpg" w={1272} h={1800} /></div>
              <div style={{ flex: 1 }}><ArtLink file="IMG_6859.jpg" w={1272} h={1800} /></div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom strip: 6858 | 6841 | 6849 | 6810 */}
      <div className="bottom-wrap">
        <div style={{ display: 'flex', gap: GAP, marginTop: GAP }}>
          {[
            { file: 'IMG_6858.jpg', w: 1272, h: 1800 },
            { file: 'IMG_6841.jpg', w: 1272, h: 1800 },
            { file: 'IMG_6849.jpg', w: 1272, h: 1800 },
            { file: 'IMG_6810.jpg', w: 1272, h: 1800 },
          ].map((img) => (
            <div key={img.file} style={{ flex: 1 }}>
              <ArtLink file={img.file} w={img.w} h={img.h} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
