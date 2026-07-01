import type { Metadata } from 'next'
import Link from 'next/link'
import { getStoreItems, itemImage, gbp, SANITY_CONFIGURED, type StoreItem } from '@/lib/store'

export const metadata: Metadata = { title: 'Store' }
export const revalidate = 60

function priceLabel(item: StoreItem) {
  if (item.sizes?.length) {
    const prices = item.sizes.map(s => s.price).filter((p): p is number => p != null)
    if (prices.length) return `from ${gbp(Math.min(...prices))}`
  }
  return gbp(item.price)
}

export default async function StorePage() {
  const items = await getStoreItems().catch(() => [])

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '70vh', padding: '44px 24px 96px' }}>
      <style>{`
        .shop-card { transition: transform .25s ease; }
        .shop-card:hover { transform: translateY(-6px); }
        .shop-card:hover .shop-img { box-shadow: 0 16px 40px rgba(140,34,87,.28); }
        .shop-img { transition: box-shadow .25s ease; }
      `}</style>

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C2257', textAlign: 'center', marginBottom: '10px' }}>
          ˙⋆✮⋆˚ Prints &amp; originals ˚⋆✮⋆˙
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(46px, 11vw, 96px)', textAlign: 'center', color: '#12101A', marginBottom: '10px', lineHeight: 1 }}>
          Store
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', color: '#777', fontSize: '14px', marginBottom: '40px' }}>
          Giclée prints on heavyweight matte paper. Shipped with care.
        </p>

        {!SANITY_CONFIGURED && items.length > 0 && (
          <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', fontSize: '12px', color: '#b06', background: '#fbeef4', border: '1px solid #f2cfe0', borderRadius: '999px', padding: '8px 16px', width: 'fit-content', margin: '0 auto 36px' }}>
            ✦ Preview — sample prints shown until Jay&apos;s real products are added
          </p>
        )}

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', maxWidth: '460px', margin: '40px auto', fontFamily: 'var(--font-body)' }}>
            <p style={{ fontSize: '22px', fontWeight: 700, color: '#8C2257', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>Coming soon.</p>
            <p style={{ color: '#666', lineHeight: 1.7 }}>
              Prints are on their way. Meanwhile, <Link href="/commission" style={{ color: '#2AA8B0', fontWeight: 600 }}>commission a piece</Link>.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '34px 28px' }}>
            {items.map(item => {
              const unavailable = item.status && item.status !== 'available'
              return (
                <Link key={item._id} href={`/store/${item.slug}`} className="shop-card"
                  style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'var(--font-body)' }}>
                  <div className="shop-img" style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '10px', overflow: 'hidden', background: '#fff', border: '1px solid #efe9f2', boxShadow: '0 8px 24px rgba(0,0,0,.10)', marginBottom: '14px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={itemImage(item, 600)} alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: unavailable ? 0.5 : 1 }} />
                    {unavailable && (
                      <span style={{ position: 'absolute', top: 12, left: 12, background: '#12101A', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '5px 11px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {item.status === 'sold-out' ? 'Sold out' : 'Coming soon'}
                      </span>
                    )}
                    {item.type === 'original' && !unavailable && (
                      <span style={{ position: 'absolute', top: 12, left: 12, background: '#8C2257', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '5px 11px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Original ★
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <p style={{ fontWeight: 700, fontSize: '15px' }}>{item.title}</p>
                    <p style={{ color: '#8C2257', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>{priceLabel(item)}</p>
                  </div>
                  {item.medium && <p style={{ color: '#999', fontSize: '12px', marginTop: '1px' }}>{item.medium}</p>}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
