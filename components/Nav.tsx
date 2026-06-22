'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Gallery and Store hidden until prints are ready (~2 weeks)
const links = [
  { href: '/commission', label: 'Commission' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/doodle', label: '★ Studio' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <>
      <style>{`
        .nav-logo { width: 200px; height: auto; display: block; }
        @media (min-width: 768px) { .nav-logo { width: auto; height: 110px; } }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Desktop nav */
        .desktop-nav { display: none !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mob-details { display: none !important; }
        }

        /* Mobile menu via <details> — no JS needed */
        .mob-details { display: block; }
        .mob-details summary {
          list-style: none;
          cursor: pointer;
          padding: 8px;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .mob-details summary::-webkit-details-marker { display: none; }
        .mob-menu {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          padding: 32px 28px;
          overflow: hidden;
        }
        .mob-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }
        .mob-menu a {
          display: block;
          padding: 22px 0;
          font-size: 36px;
          font-family: var(--font-display);
          font-weight: 700;
          color: #000000 !important;
          text-decoration: none;
          border-bottom: 1px solid #eee;
          letter-spacing: -0.01em;
          transition: color 0.15s;
        }
        .mob-menu a:active { color: var(--accent) !important; }
        .mob-close {
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0;
        }
      `}</style>

      <header style={{ position: 'relative', zIndex: 50, background: 'transparent', padding: '16px 0' }}>
        <div className="nav-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image src="/brand/logo-badge.png" alt="Jay McKoy" width={400} height={200}
              className="nav-logo" priority />
          </Link>

          {/* Desktop */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '36px' }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                color: '#000', fontSize: '15px',
                fontWeight: pathname.startsWith(href) ? 600 : 400,
                letterSpacing: '0.03em', textTransform: 'uppercase',
                textDecoration: pathname.startsWith(href) ? 'underline' : 'none',
                textUnderlineOffset: '4px', textDecorationColor: 'var(--accent)',
                fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile — native <details> toggle, no JavaScript */}
          <details className="mob-details">
            <summary aria-label="Open menu">
              <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
                <rect width="26" height="2" rx="1" fill="#000"/>
                <rect y="8" width="26" height="2" rx="1" fill="#000"/>
                <rect y="16" width="26" height="2" rx="1" fill="#000"/>
              </svg>
            </summary>
            <div className="mob-menu">
              <div className="mob-menu-header">
                <Image src="/brand/logo-badge.png" alt="Jay McKoy" width={160} height={80}
                  style={{ width: '130px', height: 'auto' }} />
                {/* Clicking summary again closes details — wrap in label trick */}
                <label htmlFor="mob-toggle" className="mob-close" style={{ cursor: 'pointer' }}>✕</label>
              </div>
              <nav>
                {links.map(({ href, label }) => (
                  <Link key={href} href={href}
                    style={{ color: pathname.startsWith(href) ? 'var(--accent)' : '#000' }}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>

        </div>
      </header>
    </>
  )
}
