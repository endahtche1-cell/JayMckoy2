'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/store/Cart'

export default function SuccessPage() {
  const { clear } = useCart()
  useEffect(() => { clear() }, [clear])

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '480px' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C2257', marginBottom: '16px' }}>
          ˙⋆✮⋆˚ Order confirmed ˚⋆✮⋆˙
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 9vw, 72px)', color: '#12101A', marginBottom: '20px' }}>
          Thank you!
        </h1>
        <p style={{ color: '#555', lineHeight: 1.75, marginBottom: '28px' }}>
          Your order is in. You&apos;ll get a confirmation email from Stripe, and Jay will get your prints shipped within 1–2 weeks.
        </p>
        <Link href="/store" style={{ display: 'inline-block', background: '#8C2257', color: '#fff', padding: '12px 28px', borderRadius: '999px', fontWeight: 700, textDecoration: 'none' }}>
          Back to store
        </Link>
      </div>
    </div>
  )
}
