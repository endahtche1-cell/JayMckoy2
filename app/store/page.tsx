import type { Metadata } from 'next'
import Link from 'next/link'
import { getStoreItems, img, gbp } from '@/lib/store'

export const metadata: Metadata = { title: 'Store' }
export const revalidate = 60

function priceLabel(item: Awaited<ReturnType<typeof getStoreItems>>[number]) {
  if (item.sizes?.length) {
    const prices = item.sizes.map(s => s.price).filter((p): p is number => p != null)
    if (prices.length) return `from ${gbp(Math.min(...prices))}`
  }
  return gbp(item.price)
}

export default async function StorePage() {
  const items = await getStoreItems().catch(() => [])

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '70vh', padding: '48px 24px 96px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C2257', textAlign: 'center', marginBottom: '10px' }}>
          ˙⋆✮⋆˚ Prints &amp; originals ˚⋆✮⋆˙
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 9vw, 84px)', textAlign: 'center', color: '#12101A', marginBottom: '40px' }}>
          Store
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', maxWidth: '460px', margin: '40px auto', fontFamily: 'var(--font-body)' }}>
            <p style={{ fontSize: '20px', fontWeight: 700, color: '#8C2257', marginBottom: '10px' }}>Coming soon.</p>
            <p style={{ color: '#666', lineHeight: 1.7 }}>
              Prints are on their way. In the meantime, <Link href="/commission" style={{ color: '#2AA8B0', fontWeight: 600 }}>commission a piece</Link>.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '28px' }}>
            {items.map(item => {
              const unavailable = item.status && item.status !== 'available'
              return (
                <Link key={item._id} href={`/store/${item.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'var(--font-body)' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', background: '#f4f2ee', marginBottom: '12px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(item.image, 600)} alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: unavailable ? 0.55 : 1 }} />
                    {unavailable && (
                      <span style={{ position: 'absolute', top: 10, left: 10, background: '#12101A', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {item.status === 'sold-out' ? 'Sold out' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '15px' }}>{item.title}</p>
                  <p style={{ color: '#8C2257', fontWeight: 600, fontSize: '14px' }}>{priceLabel(item)}</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
