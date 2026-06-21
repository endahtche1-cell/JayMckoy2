'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Status = 'available' | 'sold-out' | 'coming-soon'
type ItemType = 'print' | 'original'
type StoreItem = {
  id: number; file: string; title: string; type: ItemType
  sizes: { label: string; price: number }[]
  price?: number; status: Status; medium: string
}

// Pricing TBC from Jay — sizes and flat fees are placeholders
const placeholderItems: StoreItem[] = [
  {
    id: 1, file: 'IMG_6848.jpg', title: 'Purple Season', type: 'print' as const,
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }],
    status: 'available' as const, medium: 'Digital illustration',
  },
  {
    id: 2, file: 'IMG_6849.jpg', title: 'Pink Season', type: 'print' as const,
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }],
    status: 'available' as const, medium: 'Digital illustration',
  },
  {
    id: 3, file: 'IMG_6741.jpg', title: 'Cherry Blossom', type: 'print' as const,
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }],
    status: 'available' as const, medium: 'Digital illustration',
  },
  {
    id: 4, file: 'IMG_6776.jpg', title: 'In Bloom', type: 'original' as const,
    price: 28000, sizes: [], status: 'available' as const, medium: 'Original artwork',
  },
  {
    id: 5, file: 'IMG_6858.jpg', title: 'Flower Girl', type: 'print' as const,
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }],
    status: 'available' as const, medium: 'Digital illustration',
  },
  {
    id: 6, file: 'IMG_6869.jpg', title: 'Nine', type: 'original' as const,
    price: 45000, sizes: [], status: 'available' as const, medium: 'Original artwork',
  },
]

type Filter = 'all' | 'print' | 'original'

function formatPrice(pence: number) {
  return `$${(pence / 100).toFixed(0)}`
}

function StoreCard({ item }: { item: StoreItem }) {
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]?.label ?? '')
  const currentPrice = item.type === 'print'
    ? item.sizes.find((s) => s.label === selectedSize)?.price
    : item.price

  return (
    <div>
      <div className="relative w-full mb-3 rounded-sm overflow-hidden"
        style={{ background: 'var(--surface)', aspectRatio: '3/4' }}>
        <Image src={`/artwork/${item.file}`} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
        {item.status === 'sold-out' && (
          <div className="absolute top-3 left-3 px-2 py-1 text-xs font-bold"
            style={{ background: 'var(--fg)', color: 'var(--bg)', fontFamily: 'var(--font-body)' }}>
            Sold out
          </div>
        )}
        <span className="absolute top-3 right-3 text-xs px-2 py-1 font-semibold capitalize"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)' }}>
          {item.type}
        </span>
      </div>

      <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>{item.title}</p>
      <p className="text-xs mb-3" style={{ opacity: 0.45, fontFamily: 'var(--font-body)' }}>{item.medium}</p>

      {/* Size selector for prints */}
      {item.type === 'print' && item.sizes.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {item.sizes.map((s) => (
            <button key={s.label} type="button"
              onClick={() => setSelectedSize(s.label)}
              className="px-3 py-1 text-xs font-semibold transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                background: selectedSize === s.label ? 'var(--accent)' : 'var(--surface)',
                color: selectedSize === s.label ? '#FAFAFE' : 'var(--fg)',
                border: `1px solid ${selectedSize === s.label ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '3px',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-base font-bold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
        {currentPrice ? formatPrice(currentPrice) : '—'}
      </p>

      {item.status === 'sold-out' ? (
        <button disabled className="w-full py-2.5 text-sm font-bold rounded-sm"
          style={{ border: '1px solid var(--border)', opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          Sold out
        </button>
      ) : item.type === 'original' ? (
        <Link href="/contact"
          className="block w-full py-2.5 text-sm font-bold text-center rounded-sm"
          style={{ border: '1px solid var(--accent)', color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
          Contact for purchase
        </Link>
      ) : (
        <button
          className="w-full py-2.5 text-sm font-bold rounded-sm"
          style={{ background: 'var(--accent)', color: '#FAFAFE', fontFamily: 'var(--font-body)' }}>
          Add to cart — {currentPrice ? formatPrice(currentPrice) : ''}
        </button>
      )}
    </div>
  )
}

export default function StoreClient() {
  const [active, setActive] = useState<Filter>('all')
  const visible = active === 'all' ? placeholderItems : placeholderItems.filter((i) => i.type === active)

  return (
    <div className="px-6 py-16 md:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="text-4xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Shop</h1>
          <p className="text-sm mt-1" style={{ opacity: 0.55, fontFamily: 'var(--font-body)' }}>
            Prints ship domestically — allow 1–2 weeks. Accepts card & Apple Pay.
          </p>
        </div>
        <div className="flex gap-1">
          {(['all', 'print', 'original'] as Filter[]).map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className="px-4 py-2 text-sm font-bold capitalize transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                background: active === f ? 'var(--accent)' : 'transparent',
                color: active === f ? '#FAFAFE' : 'var(--fg)',
                border: `1px solid ${active === f ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                opacity: active === f ? 1 : 0.55,
              }}>
              {f === 'all' ? 'All' : f === 'print' ? 'Prints' : 'Originals'}
            </button>
          ))}
        </div>
      </div>

      {/* Shipping notice */}
      <div className="flex gap-3 items-start p-4 mb-10 rounded-sm"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <span>📦</span>
        <p className="text-sm" style={{ opacity: 0.7, fontFamily: 'var(--font-body)' }}>
          <strong>Domestic shipping only.</strong> Please allow 1–2 weeks for your order to arrive.
          Prints are produced and shipped with care. Questions? <a href="/contact"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Reach out</a>.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visible.map((item) => <StoreCard key={item.id} item={item} />)}
      </div>

      {/* Commission nudge */}
      <div className="mt-20 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: '1px solid var(--border)' }}>
        <div>
          <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-body)' }}>
            Want something made just for you?
          </p>
          <p className="text-sm" style={{ opacity: 0.55, fontFamily: 'var(--font-body)' }}>
            Jay takes commissions — personal and business.
          </p>
        </div>
        <Link href="/commission"
          className="px-6 py-3 text-sm font-bold shrink-0"
          style={{ background: 'var(--accent)', color: '#FAFAFE', fontFamily: 'var(--font-body)', borderRadius: '4px' }}>
          Request a commission →
        </Link>
      </div>
    </div>
  )
}
