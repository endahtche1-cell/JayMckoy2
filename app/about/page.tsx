import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import DraggableElements from './DraggableElements'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'transparent', overflow: 'clip' }}>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .about-bio { padding-top: 0 !important; }
          /* Camera sits ABOVE the title on mobile */
          .about-camera { order: -1 !important; margin-left: 0 !important; justify-content: center !important; padding-top: 0 !important; }
          .about-canvas { padding: 90px 20px 60px !important; min-height: 0 !important; }
          /* Frames clutter/cover the text on narrow screens — hide them on mobile */
          .about-frames { display: none !important; }
        }
      `}</style>

      {/* ── Scrapbook canvas ── */}
      <div className="about-canvas" style={{
        position: 'relative',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 60px 120px',
        minHeight: '800px',
      }}>

        {/* ── Main content: camera + bio ── */}
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 5,
        }}>

          {/* Bio — left column */}
          <div className="about-bio" style={{ paddingTop: '32px', position: 'relative', zIndex: 10 }}>


            {/* JAY McKOY — transparent PNG title */}
            <div style={{ marginBottom: '28px' }}>
              <img src="/jay-mckoy-title.png" alt="Jay McKoy"
                style={{ width: 'min(420px, 100%)', height: 'auto', display: 'block', pointerEvents: 'none', userSelect: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: '#2A2A2A' }}>
                Artist born and raised in Bridgeport, Connecticut. My style is colorful, fun, and an expression of Black joy.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: '#2A2A2A' }}>
                Working towards putting smiles on people&apos;s faces and capturing the beautiful, whimsical sides of being Black, one piece at a time.
              </p>
            </div>


            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <Link href="/commission" style={{
                padding: '11px 26px', fontSize: '14px', fontWeight: 600,
                fontFamily: 'var(--font-body)', background: 'transparent',
                color: '#2AA8B0', textDecoration: 'none',
                border: '1.5px solid #2AA8B0', borderRadius: '999px',
                letterSpacing: '0.02em',
              }}>
                Commission a piece
              </Link>
              <Link href="/" style={{
                padding: '11px 26px', fontSize: '14px', fontWeight: 600,
                fontFamily: 'var(--font-body)', background: 'transparent',
                color: '#8C2257', textDecoration: 'none',
                border: '1.5px solid #8C2257', borderRadius: '999px',
                letterSpacing: '0.02em',
              }}>
                See the work
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Instagram', href: 'https://instagram.com/jaymckoyy' },
                { label: 'TikTok', href: 'https://tiktok.com/@jaymckoyy' },
                { label: 'Twitter', href: 'https://twitter.com/jaymckoyy' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Courier New, monospace', fontSize: '11px',
                    fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#6EA3D0', textDecoration: 'none',
                    borderBottom: '2px solid #6EA3D0', paddingBottom: '2px',
                  }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Camera — right column, swinging, always visible */}
          <div className="about-camera" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: '20px', marginLeft: '-120px' }}>
            <Image
              src="/jay-artist.png"
              alt="Jay McKoy"
              width={600}
              height={600}
              style={{
                width: 'clamp(240px, 38vw, 460px)',
                height: 'auto',
                display: 'block',
                animation: 'swing 4s ease-in-out infinite',
                transformOrigin: 'top center',
              }}
              priority
            />
          </div>
        </div>

        {/* ── Draggable frames (no camera — it's in the layout) ── */}
        <DraggableElements />
      </div>
    </div>
  )
}
