'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function SpinningBadge() {
  return (
    <>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spinning-badge { animation: spin-slow 12s linear infinite; }
        .spinning-badge:hover { animation-duration: 4s; }
        /* Hide on mobile — too cluttered on small screens */
        @media (max-width: 767px) { .spinning-badge-wrap { display: none !important; } }
      `}</style>

      <Link
        href="/commission"
        aria-label="Commission a piece"
        className="spinning-badge-wrap"
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 50,
          display: 'block',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        <Image
          src="/brand/logo-badge.png"
          alt="Jay McKoy"
          width={72}
          height={72}
          className="spinning-badge"
          style={{ width: '72px', height: '72px', objectFit: 'contain' }}
        />
      </Link>
    </>
  )
}
