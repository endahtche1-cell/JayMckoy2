'use client'

import { useState } from 'react'
import { useCart } from './Cart'
import { money } from '@/lib/store'

type Size = { label?: string; price?: number; stripePriceId?: string }
type Props = {
  slug: string
  title: string
  image: string
  currency?: string
  basePrice?: number
  basePriceId?: string
  sizes?: Size[]
  soldOut?: boolean
}

export default function AddToCart({ slug, title, image, currency, basePrice, basePriceId, sizes, soldOut }: Props) {
  const { add } = useCart()
  const hasSizes = !!sizes?.length
  const [sizeIdx, setSizeIdx] = useState(0)

  const price = hasSizes ? sizes![sizeIdx]?.price ?? basePrice : basePrice
  const size = hasSizes ? sizes![sizeIdx]?.label : undefined
  const priceId = hasSizes ? sizes![sizeIdx]?.stripePriceId : basePriceId

  if (soldOut) {
    return <p style={{ fontWeight: 700, color: '#888', fontFamily: 'var(--font-body)' }}>Sold out</p>
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {hasSizes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {sizes!.map((s, i) => (
            <button key={i} onClick={() => setSizeIdx(i)}
              style={{ padding: '9px 16px', borderRadius: '999px', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                border: `1.5px solid ${i === sizeIdx ? '#8C2257' : '#ddd'}`,
                background: i === sizeIdx ? '#8C2257' : '#fff', color: i === sizeIdx ? '#fff' : '#333' }}>
              {s.label || 'One size'}{s.price != null ? ` · ${money(s.price, currency)}` : ''}
            </button>
          ))}
        </div>
      )}

      <div style={{ fontSize: '22px', fontWeight: 700, color: '#8C2257', marginBottom: '16px' }}>{money(price, currency)}</div>

      <button
        onClick={() => price != null && add({ slug, title, size, price, image, priceId, currency })}
        disabled={price == null}
        style={{ background: '#8C2257', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 32px',
          fontWeight: 700, fontSize: '15px', cursor: price == null ? 'not-allowed' : 'pointer', opacity: price == null ? 0.5 : 1 }}>
        Add to cart
      </button>
    </div>
  )
}
