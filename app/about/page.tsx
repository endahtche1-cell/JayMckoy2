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
          .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .about-bio { padding-top: 0 !important; }
        }
      `}</style>

      {/* ── Scrapbook canvas ── */}
      <div style={{
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
          gap: '60px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 5,
        }}>

          {/* Bio — left column */}
          <div className="about-bio" style={{ paddingTop: '32px', position: 'relative', zIndex: 10 }}>


            {/* JAY McKOY in chrome metallic scrapbook letters — static, not draggable */}
            <div style={{ marginBottom: '28px' }}>
              {/* "JAY" */}
              <div style={{ display: 'flex', gap: '0px', alignItems: 'flex-end', marginBottom: '6px' }}>
                {[18, 9, 33].map((n, i) => (
                  <img key={i} src={`/studio/v2/letters/${n}.png`} alt=""
                    style={{ height: 'clamp(52px, 7vw, 80px)', width: 'auto', display: 'block', pointerEvents: 'none', userSelect: 'none', marginLeft: i > 0 ? '-6px' : '0' }} />
                ))}
              </div>
              {/* "McKOY" */}
              <div style={{ display: 'flex', gap: '0px', alignItems: 'flex-end' }}>
                {[21, 11, 19, 23, 33].map((n, i) => (
                  <img key={i} src={`/studio/v2/letters/${n}.png`} alt=""
                    style={{ height: 'clamp(52px, 7vw, 80px)', width: 'auto', display: 'block', pointerEvents: 'none', userSelect: 'none', marginLeft: i > 0 ? '-6px' : '0' }} />
                ))}
              </div>
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
            {/* Ticket — static below bio */}
            <img src="/bridgeport-ct.png" alt="Bridgeport, CT"
              style={{ width: 'min(400px, 90%)', height: 'auto', display: 'block', marginTop: '8px', mixBlendMode: 'multiply' }} />
          </div>

          {/* Camera — right column, swinging, always visible */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
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
