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
    <header style={{
      position: 'static',
      background: '#ffffff',
      boxShadow: 'none',
      border: 'none',
      padding: '36px 0 44px',
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo — large, brand-mark scale */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image
            src="/brand/logo-badge.png"
            alt="Jay McKoy"
            width={400}
            height={200}
            style={{ width: 'clamp(160px, 15vw, 240px)', height: 'auto', display: 'block' }}
            priority
          />
        </Link>

        {/* Desktop nav — hidden on mobile via media query in a style tag */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px', marginRight: '20px' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: '#000000',
              fontSize: '15px',
              fontWeight: pathname.startsWith(href) ? 600 : 400,
              letterSpacing: '0.02em',
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

        {/* Mobile hamburger — only shown below md breakpoint */}
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', marginBottom: '5px', transition: 'all 0.2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', marginBottom: '5px', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', height: '1px', width: '24px', background: '#000', transition: 'all 0.2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        maxHeight: open ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
        borderTop: open ? '1px solid #eee' : 'none',
      }}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} style={{
            display: 'block',
            padding: '16px 48px',
            color: pathname.startsWith(href) ? 'var(--accent)' : '#000',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: pathname.startsWith(href) ? 600 : 400,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            borderBottom: '1px solid #eee',
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Responsive: hide desktop nav and show hamburger only on mobile */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
