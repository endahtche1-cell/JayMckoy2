import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>


      <div style={{ textAlign: 'center', padding: 'clamp(40px, 9vh, 96px) 40px', maxWidth: '560px', width: '100%' }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#A89FD4',
          marginBottom: '20px',
        }}>
          ˙⋆✮⋆˚ High-level enquiries ˚⋆✮⋆˙
        </p>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 8vw, 72px)',
          fontWeight: 700,
          color: '#12101A',
          lineHeight: 1.0,
          marginBottom: '32px',
          letterSpacing: '-0.02em',
        }}>
          Get in touch.
        </h1>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, #E0DBF0)' }} />
          <span style={{ color: '#A89FD4', fontSize: '16px' }}>★</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, #E0DBF0)' }} />
        </div>

        {/* Email */}
        <a
          href="mailto:theejaymckoy@gmail.com"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 4vw, 26px)',
            fontWeight: 600,
            color: '#8C2257',
            textDecoration: 'none',
            borderBottom: '2px solid #8C2257',
            paddingBottom: '3px',
            marginBottom: '40px',
            letterSpacing: '-0.01em',
          }}
        >
          theejaymckoy@gmail.com
        </a>

        {/* Supporting note */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: '#888',
          lineHeight: 1.75,
          marginBottom: '32px',
        }}>
          For commissions, prints, and general enquiries, use the{' '}
          <Link href="/commission" style={{ color: '#2AA8B0', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #2AA8B0' }}>
            Commission page
          </Link>.
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, #E0DBF0)' }} />
          <span style={{ color: '#6EA3D0', fontSize: '14px' }}>✦</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, #E0DBF0)' }} />
        </div>

      </div>
    </div>
  )
}
