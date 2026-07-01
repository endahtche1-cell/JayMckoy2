import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStoreItem, itemImage } from '@/lib/store'
import AddToCart from '@/components/store/AddToCart'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = await getStoreItem(slug)
  return { title: item ? item.title : 'Store' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getStoreItem(slug)
  if (!item) notFound()

  const soldOut = item.status === 'sold-out' || item.status === 'coming-soon'
  const meta = [item.medium, item.dimensions, item.edition].filter(Boolean)

  return (
    <div style={{ position: 'relative', zIndex: 1, padding: '32px 24px 96px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <Link href="/store" style={{ color: '#8C2257', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>← Store</Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '18px', alignItems: 'start' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', border: '1px solid #efe9f2', boxShadow: '0 14px 40px rgba(0,0,0,.12)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={itemImage(item)} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ paddingTop: '6px' }}>
            {item.type === 'original' && (
              <p style={{ display: 'inline-block', background: '#8C2257', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Original ★</p>
            )}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 7vw, 54px)', color: '#12101A', marginBottom: '14px', lineHeight: 1.05 }}>
              {item.title}
            </h1>
            {item.description && <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '22px', fontSize: '15px' }}>{item.description}</p>}
            {meta.length > 0 && (
              <ul style={{ listStyle: 'none', margin: '0 0 26px', padding: '14px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', color: '#777', fontSize: '13px', lineHeight: 2 }}>
                {meta.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            )}

            <AddToCart
              slug={item.slug}
              title={item.title}
              image={itemImage(item)}
              currency={item.currency}
              basePrice={item.price}
              basePriceId={item.stripePriceId}
              sizes={item.sizes}
              soldOut={soldOut}
            />

            <p style={{ fontSize: '12px', color: '#999', marginTop: '22px', lineHeight: 1.7 }}>
              ✦ Domestic shipping in 1–2 weeks · secure checkout by Stripe (card &amp; Apple Pay).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
