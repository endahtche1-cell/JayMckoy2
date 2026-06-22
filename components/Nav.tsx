'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/store', label: 'Store' },
  { href: '/commission', label: 'Commission' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <style>{`
        /*
          Logo: sized by height so it's proportionally dominant.
          Header: padding around logo — not the other way around.
          Nav-inner: same 7vw horizontal inset as the gallery grid below.
        */
        .nav-logo { width: 140px; height: auto; display: block; }

        @media (min-width: 768px) {
          .nav-logo { width: auto; height: 110px; }
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .desktop-nav { display: none !important; }

        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'relative',
        zIndex: 2,
        background: 'transparent',
        padding: '16px 0',
      }}>
        <div className="nav-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src="/brand/logo-badge.png"
              alt="Jay McKoy"
              width={400}
              height={200}
              className="nav-logo"
              priority
            />
          </Link>

          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '36px' }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                color: '#000000',
                fontSize: '15px',
                fontWeight: pathname.startsWith(href) ? 600 : 400,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                textDecoration: pathname.startsWith(href) ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                textDecorationColor: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', transition: 'all 0.2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', transition: 'all 0.2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        <div style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          borderTop: open ? '1px solid #eee' : 'none',
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: 'block',
              padding: '16px 5vw',
              color: pathname.startsWith(href) ? 'var(--accent)' : '#000',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: pathname.startsWith(href) ? 600 : 400,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              borderBottom: '1px solid #eee',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </header>
    </>
  )
}
