'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const pieces = [
  { file: 'IMG_6848.jpg', title: 'Purple Season', w: 1272, h: 1800 },
  { file: 'IMG_6869.jpg', title: 'Nine', w: 1257, h: 1800 },
  { file: 'IMG_6741.jpg', title: 'Cherry Blossom', w: 1350, h: 1800 },
  { file: 'IMG_6849.jpg', title: 'Pink Season', w: 1272, h: 1800 },
  { file: 'IMG_6776.jpg', title: 'In Bloom', w: 1800, h: 1257 },
  { file: 'IMG_6858.jpg', title: 'Flower Girl', w: 1272, h: 1800 },
  { file: 'IMG_6775.jpg', title: 'Two', w: 1800, h: 1350 },
  { file: 'IMG_6743.jpg', title: 'Braids', w: 1350, h: 1800 },
  { file: 'IMG_6859.jpg', title: 'Plaid', w: 1272, h: 1800 },
  { file: 'IMG_6860.jpg', title: 'Sweet', w: 1440, h: 1800 },
  { file: 'IMG_6810.jpg', title: 'Bloom', w: 1272, h: 1800 },
  { file: 'IMG_6841.jpg', title: 'Together', w: 1272, h: 1800 },
  { file: 'IMG_6861.jpg', title: 'Pink Wave', w: 1272, h: 1800 },
  { file: 'IMG_6746.jpg', title: 'Curls', w: 1257, h: 1800 },
  { file: 'IMG_6774.jpg', title: 'Golden', w: 1440, h: 1800 },
]

const FOOTER_H = 80
const CAPTION_H = 44
const HEADER_GAP = 12
const CAPTION_GAP = 10
const mono = 'Courier New, Courier, monospace'

export default function CharactersPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [imgH, setImgH] = useState(0)

  useEffect(() => {
    const globalNav = document.querySelector('header') as HTMLElement | null
    const footer = document.querySelector('footer') as HTMLElement | null
    const badge = document.querySelector('.spinning-badge-wrap') as HTMLElement | null
    if (globalNav) globalNav.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (badge) badge.style.display = 'none'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const compute = () => {
      const hh = headerRef.current?.getBoundingClientRect().height ?? 0
      const available = window.innerHeight - hh - HEADER_GAP - CAPTION_H - CAPTION_GAP - FOOTER_H - 8
      setImgH(Math.max(available, 160))
    }
    compute()
    window.addEventListener('resize', compute)

    return () => {
      window.removeEventListener('resize', compute)
      if (globalNav) globalNav.style.display = ''
      if (footer) footer.style.display = ''
      if (badge) badge.style.display = ''
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  // Vertical scroll (down) moves the gallery horizontally
  // depends on imgH so it re-attaches once the gallery div actually exists
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY + e.deltaX
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [imgH])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @keyframes glitch {
          0%,88%,100%{transform:translateX(0);filter:none}
          89%{transform:translateX(-4px);filter:hue-rotate(90deg)}
          91%{transform:translateX(4px);filter:hue-rotate(-90deg)}
          93%{transform:translateX(-2px);filter:none}
        }
        @keyframes scanlines {
          from{background-position:0 0}to{background-position:0 8px}
        }
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .glitch{animation:glitch 7s ease-in-out infinite}
        .scanlines-overlay{
          position:absolute;inset:0;pointer-events:none;z-index:2;
          background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px);
          animation:scanlines 0.4s steps(1) infinite;
        }
        .hscroll::-webkit-scrollbar{display:none}
        .hscroll{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ── Self-contained header ── */}
      <div ref={headerRef} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '40px',
        padding: '20px 24px',
        background: '#fff',
        flexShrink: 0,
      }}>
        <Link href="/" style={{ flexShrink: 0, display: 'block' }}>
          <Image
            src="/brand/logo-badge.png"
            alt="Jay McKoy"
            width={240}
            height={120}
            style={{ height: '80px', width: 'auto', display: 'block' }}
            priority
          />
        </Link>

        <div style={{ display: 'flex', gap: '48px', paddingTop: '2px', flexWrap: 'wrap', flex: 1 }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#aaa', marginBottom: '5px' }}>About:</p>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#888', lineHeight: 1.65 }}>
              Self-taught artist from<br />Bridgeport, Connecticut.<br />Colorful, fun, Black joy.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#aaa', marginBottom: '5px' }}>Work:</p>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#888', lineHeight: 1.65 }}>
              Character Illustration<br />Colored Pencil Portraits<br />Commissions<br />Prints
            </p>
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#aaa', marginBottom: '5px' }}>Contact:</p>
            <p style={{ fontFamily: mono, fontSize: '11px', color: '#888', lineHeight: 1.65 }}>
              theejaymckoy@gmail.com<br />@jaymckoyy
            </p>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '24px', paddingTop: '4px', flexShrink: 0 }}>
          {[
            { href: '/store', label: 'Store' },
            { href: '/commission', label: 'Commission' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: mono, fontSize: '11px', color: '#aaa',
              textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Horizontal gallery — scroll down to move right ── */}
      {imgH > 0 && (
        <div
          ref={scrollRef}
          className="hscroll"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            overflowX: 'scroll',
            overflowY: 'hidden',
            paddingTop: `${HEADER_GAP}px`,
            paddingBottom: `${FOOTER_H + 8}px`,
            flex: 1,
          }}
        >
          {pieces.map((p, i) => {
            const isAnimated = i === 4
            const naturalW = Math.round((p.w / p.h) * imgH)
            return (
              <div key={p.file} style={{ flexShrink: 0, width: `${naturalW}px` }}>
                <div style={{ position: 'relative', width: `${naturalW}px`, height: `${imgH}px`, overflow: 'hidden' }}>
                  {isAnimated && <div className="scanlines-overlay" />}
                  <Image
                    src={`/artwork/${p.file}`}
                    alt={p.title}
                    width={p.w}
                    height={p.h}
                    className={isAnimated ? 'glitch' : undefined}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    priority={i < 3}
                    sizes={`${naturalW}px`}
                  />
                </div>
                <div style={{ paddingTop: `${CAPTION_GAP}px`, height: `${CAPTION_H}px` }}>
                  <p style={{ fontFamily: mono, fontSize: '10px', color: '#bbb', marginBottom: '2px' }}>Character:</p>
                  <p style={{ fontFamily: mono, fontSize: '11px', color: '#666', fontWeight: 700 }}>{p.title}</p>
                </div>
              </div>
            )
          })}

          <div style={{ flexShrink: 0, paddingLeft: '24px', paddingRight: '120px', height: `${imgH}px`, display: 'flex', alignItems: 'flex-end', paddingBottom: '8px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: '#ddd', textTransform: 'uppercase', letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              New work coming soon
            </p>
          </div>
        </div>
      )}

      {/* ── Footer overlay ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: `${FOOTER_H}px`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '32px',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(6px)',
        zIndex: 40,
      }}>
        <Link href="/" style={{ flexShrink: 0 }}>
          <Image
            src="/brand/logo-badge.png"
            alt="Jay McKoy"
            width={48}
            height={24}
            style={{ height: '36px', width: 'auto', display: 'block', animation: 'spin-slow 12s linear infinite' }}
          />
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <a href="mailto:theejaymckoy@gmail.com"
            style={{ fontFamily: mono, fontSize: '22px', color: '#aaa', textDecoration: 'none', lineHeight: 1.2 }}>
            Email
          </a>
          <a href="https://instagram.com/jaymckoyy" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: mono, fontSize: '22px', color: '#aaa', textDecoration: 'none', lineHeight: 1.2 }}>
            Instagram
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '28px', height: '1px', background: '#ccc' }} />
          <p style={{ fontFamily: mono, fontSize: '11px', color: '#bbb' }}>© 2026</p>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <p style={{ fontFamily: mono, fontSize: '20px', color: '#ccc', lineHeight: 1.25, textTransform: 'uppercase' }}>
            Scroll down to see more
          </p>
          <Link href="/commission"
            style={{ fontFamily: mono, fontSize: '20px', color: '#8C2257', textDecoration: 'none', textTransform: 'uppercase' }}>
            Commission a piece →
          </Link>
        </div>
      </div>
    </div>
  )
}
