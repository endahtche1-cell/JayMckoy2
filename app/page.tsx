import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from '@/components/NewsletterSignup'
import FadeIn from '@/components/FadeIn'

const gridPieces = [
  { file: 'IMG_6848.jpg', title: 'Purple Season', w: 1272, h: 1800 },
  { file: 'IMG_6776.jpg', title: 'In Bloom',       w: 1800, h: 1257 },
  { file: 'IMG_6869.jpg', title: 'Nine',            w: 1257, h: 1800 },
  { file: 'IMG_6741.jpg', title: 'Cherry Blossom', w: 1350, h: 1800 },
]

const storePreviews = [
  { file: 'IMG_6849.jpg', title: 'Pink Season', w: 1272, h: 1800, price: 'from $35' },
  { file: 'IMG_6860.jpg', title: 'Sweet',       w: 1440, h: 1800, price: 'from $35' },
]

// Matches header container exactly
const wrap: React.CSSProperties = {
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '0 48px',
}

export default function HomePage() {
  return (
    <div style={{ background: '#ffffff' }}>

      {/* ─── Gallery grid ─── */}
      <div style={{ ...wrap, paddingBottom: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '48px',
          rowGap: '48px',
          alignItems: 'start',
        }}>
          {gridPieces.map((p, i) => (
            <FadeIn key={p.file} delay={i * 80}>
              <Link href="/gallery/characters" style={{ display: 'block', textDecoration: 'none' }} className="group">
                <div style={{ overflow: 'hidden' }}>
                  <Image
                    src={`/artwork/${p.file}`}
                    alt={p.title}
                    width={p.w}
                    height={p.h}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    className="transition-transform duration-700 group-hover:scale-[1.02]"
                    priority={i < 2}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0,
                  fontFamily: 'var(--font-body)',
                  transition: 'opacity 0.3s',
                }}
                  className="group-hover:opacity-50">
                  {p.title}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ─── Tagline ─── */}
      <FadeIn>
        <div style={{ ...wrap, borderTop: '1px solid #e8e8e8', padding: '48px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, fontFamily: 'var(--font-body)', marginBottom: '10px' }}>
                Bridgeport, Connecticut
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 600, maxWidth: '400px', lineHeight: 1.25, color: '#000' }}>
                Colorful, fun, an expression of Black joy.
              </h2>
            </div>
            <Link href="/gallery" style={{
              flexShrink: 0, padding: '13px 26px', fontSize: '13px', fontWeight: 700,
              background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-body)',
              borderRadius: '4px', textDecoration: 'none',
            }}>
              View all work →
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* ─── Store Teaser ─── */}
      <FadeIn>
        <div style={{ ...wrap, padding: '56px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 600, color: '#000' }}>Available Now</h2>
            <Link href="/store" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px', fontFamily: 'var(--font-body)' }}>
              Shop all
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px' }}>
            {storePreviews.map((item, i) => (
              <FadeIn key={item.file} delay={i * 80}>
                <Link href="/store" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }} className="group">
                  <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
                    <Image
                      src={`/artwork/${item.file}`}
                      alt={item.title}
                      width={item.w}
                      height={item.h}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="25vw"
                    />
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#000' }}>{item.title} — Print</p>
                  <p style={{ fontSize: '13px', opacity: 0.45, marginTop: '2px' }}>{item.price}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ─── Commission + Newsletter ─── */}
      <div style={{ borderTop: '1px solid #e8e8e8', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <FadeIn style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '40px', background: '#12101A', color: '#fff', height: '100%' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.4, fontFamily: 'var(--font-body)', marginBottom: '14px' }}>
                Commissions · Collabs · Brand work
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 30px)', fontWeight: 600, lineHeight: 1.25 }}>
                Get a piece made just for you.
              </h2>
            </div>
            <Link href="/commission" style={{ alignSelf: 'flex-start', padding: '13px 26px', fontSize: '13px', fontWeight: 700, background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-body)', borderRadius: '4px', textDecoration: 'none' }}>
              Request a commission →
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={100} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#F2EFF8', borderLeft: '1px solid #e8e8e8', height: '100%' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.35, fontFamily: 'var(--font-body)' }}>
              Email list
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 30px)', fontWeight: 600, color: '#000' }}>
              Stay in the loop. ✨
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.55, fontFamily: 'var(--font-body)' }}>
              New drops, commission availability, whatever Jay&apos;s working on next.
            </p>
            <NewsletterSignup />
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
