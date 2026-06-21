import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from './NewsletterSignup'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/jaymckoyy', handle: '@jaymckoyy' },
  { label: 'TikTok', href: 'https://tiktok.com/@jaymckoyy', handle: '@jaymckoyy' },
  { label: 'Twitter', href: 'https://twitter.com/jaymckoyy', handle: '@jaymckoyy' },
]

const navLinks = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/store', label: 'Store' },
  { href: '/commission', label: 'Commission' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
      {/* Newsletter bar */}
      <div className="px-6 py-12 md:px-12 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="shrink-0">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ opacity: 0.45, fontFamily: 'var(--font-body)' }}>
            Stay in the loop
          </p>
          <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            New drops, commissions & more
          </p>
        </div>
        <div className="md:ml-auto w-full md:w-auto">
          <NewsletterSignup variant="dark" />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="px-6 py-12 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/logo-badge.png"
            alt="Jay McKoy"
            width={120}
            height={60}
            className="object-contain"
          />
          <p className="text-sm leading-relaxed" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            Artist from Bridgeport, Connecticut.<br />
            Colorful, fun, an expression of Black joy.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
            Pages
          </p>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ opacity: 0.6, fontFamily: 'var(--font-body)' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
            Follow
          </p>
          <ul className="flex flex-col gap-3">
            {socials.map(({ label, href, handle }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-baseline gap-2 group">
                  <span className="text-xs" style={{ opacity: 0.4, fontFamily: 'var(--font-body)' }}>{label}</span>
                  <span className="text-sm font-semibold transition-opacity group-hover:opacity-100"
                    style={{ opacity: 0.7, fontFamily: 'var(--font-body)' }}>
                    {handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 pb-8 md:px-12">
        <p className="text-xs" style={{ opacity: 0.3, fontFamily: 'var(--font-body)' }}>
          © {new Date().getFullYear()} Jay McKoy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
