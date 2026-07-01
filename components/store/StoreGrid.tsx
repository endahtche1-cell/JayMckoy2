'use client'

import { useState } from 'react'
import Link from 'next/link'
import { money, type StoreItem } from '@/lib/store'

// brand palette — a clean colored accent line per card (nods to the reference)
const ACCENTS = ['#8C2257', '#6EA3D0', '#1D752C', '#A89FD4', '#29A5F2', '#C61D70']

function priceLabel(item: StoreItem) {
  if (item.sizes?.length) {
    const prices = item.sizes.map(s => s.price).filter((p): p is number => p != null)
    if (prices.length) return `from ${money(Math.min(...prices), item.currency)}`
  }
  return money(item.price, item.currency)
}

type Filter = 'all' | 'print' | 'original'

export default function StoreGrid({ items }: { items: StoreItem[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const hasOriginals = items.some(i => i.type === 'original')
  const shown = items.filter(i => filter === 'all' ? true : i.type === filter)

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'print', label: 'Prints' },
    ...(hasOriginals ? [{ key: 'original' as Filter, label: 'Originals' }] : []),
  ]

  return (
    <>
      <style>{`
        .sc { transition: transform .22s ease, box-shadow .22s ease;
              background:#fff; border:1px solid #ece6f0; border-radius:12px; overflow:hidden; display:block;
              box-shadow:0 6px 20px rgba(0,0,0,.06); }
        .sc:hover { transform: translateY(-6px); box-shadow:0 18px 44px rgba(140,34,87,.18); }
        .sc-accent { height:5px; }
        .sc-imgwrap { position:relative; aspect-ratio:3/4; background:#faf8fb; }
        .sc-img { width:100%; height:100%; object-fit:cover; display:block; }
        .sc-foot { padding:13px 15px 15px; border-top:1px solid #f2eef5; }
        .st-tab { border:none; background:none; cursor:pointer; font-family:var(--font-body);
                  font-size:13px; font-weight:600; letter-spacing:.04em; text-transform:uppercase;
                  color:#b7adc0; padding:6px 2px; position:relative; }
        .st-tab.on { color:#8C2257; }
        .st-tab.on::after { content:''; position:absolute; left:0; right:0; bottom:-2px; height:2px; background:#8C2257; border-radius:2px; }
      `}</style>

      {/* filter tabs */}
      <div style={{ display: 'flex', gap: '22px', justifyContent: 'center', marginBottom: '34px' }}>
        {tabs.map(t => (
          <button key={t.key} className={`st-tab${filter === t.key ? ' on' : ''}`} onClick={() => setFilter(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '30px 26px' }}>
        {shown.map((item, i) => {
          const unavailable = item.status && item.status !== 'available'
          return (
            <Link key={item._id} href={`/store/${item.slug}`} className="sc"
              style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'var(--font-body)' }}>
              <div className="sc-accent" style={{ background: ACCENTS[i % ACCENTS.length] }} />
              <div className="sc-imgwrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="sc-img" src={item.imageUrl || ''} alt={item.title}
                  style={{ opacity: unavailable ? 0.5 : 1 }} />
                <span style={{ position: 'absolute', top: 10, right: 10, background: '#fff', color: '#12101A',
                  fontSize: 10, fontWeight: 700, padding: '4px 9px', borderRadius: 6, textTransform: 'uppercase',
                  letterSpacing: '0.05em', boxShadow: '0 1px 4px rgba(0,0,0,.12)' }}>
                  {item.type === 'original' ? 'Original' : 'Print'}
                </span>
                {unavailable && (
                  <span style={{ position: 'absolute', top: 10, left: 10, background: '#12101A', color: '#fff',
                    fontSize: 10, fontWeight: 700, padding: '4px 9px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.status === 'sold-out' ? 'Sold out' : 'Soon'}
                  </span>
                )}
              </div>
              <div className="sc-foot" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{item.title}</span>
                <span style={{ color: '#8C2257', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>{priceLabel(item)}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
