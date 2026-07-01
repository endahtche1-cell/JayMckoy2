import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStoreItem, img } from '@/lib/store'
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
    <div style={{ position: 'relative', zIndex: 1, padding: '40px 24px 96px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/store" style={{ color: '#8C2257', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>← Store</Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: '20px', alignItems: 'start' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#f4f2ee' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(item.image, 1000)} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 6vw, 48px)', color: '#12101A', marginBottom: '12px' }}>
              {item.title}
            </h1>
            {item.description && <p style={{ color: '#444', lineHeight: 1.7, marginBottom: '20px' }}>{item.description}</p>}
            {meta.length > 0 && (
              <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, color: '#777', fontSize: '13px', lineHeight: 1.9 }}>
                {meta.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            )}

            <AddToCart
              slug={item.slug}
              title={item.title}
              image={img(item.image, 800)}
              basePrice={item.price}
              sizes={item.sizes?.map(s => ({ label: s.label, price: s.price }))}
              soldOut={soldOut}
            />

            <p style={{ fontSize: '12px', color: '#999', marginTop: '20px', lineHeight: 1.6 }}>
              Domestic shipping in 1–2 weeks. Secure checkout by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
