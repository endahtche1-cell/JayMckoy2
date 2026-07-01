import type { Metadata } from 'next'
import Link from 'next/link'
import { getStoreItems, STRIPE_CONFIGURED, DEMO } from '@/lib/store'
import StoreGrid from '@/components/store/StoreGrid'

export const metadata: Metadata = { title: 'Store' }
// Render at request time so the store always reflects the current Stripe key +
// live products (never a stale prerender from an earlier build).
export const dynamic = 'force-dynamic'

export default async function StorePage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const { demo } = await searchParams
  // ?demo=1 → shareable design preview populated with sample prints (for Jay),
  // regardless of whether real Stripe products exist yet.
  const isDemo = demo === '1'
  const items = isDemo ? DEMO : await getStoreItems().catch(() => [])
  const showPreviewBanner = isDemo || (!STRIPE_CONFIGURED && items.length > 0)

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '70vh', padding: '44px 24px 96px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C2257', textAlign: 'center', marginBottom: '10px' }}>
          ˙⋆✮⋆˚ Prints &amp; originals ˚⋆✮⋆˙
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(46px, 11vw, 96px)', textAlign: 'center', color: '#12101A', marginBottom: '14px', lineHeight: 1 }}>
          Store
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', color: '#9a90a2', fontSize: '11.5px',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '34px' }}>
          Domestic shipping · allow 1–2 weeks · card &amp; Apple&nbsp;Pay
        </p>

        {showPreviewBanner && (
          <p style={{ fontFamily: 'var(--font-body)', textAlign: 'center', fontSize: '12px', color: '#b06', background: '#fbeef4', border: '1px solid #f2cfe0', borderRadius: '999px', padding: '7px 16px', width: 'fit-content', margin: '0 auto 30px' }}>
            ✦ Design preview — sample prints (Jay&apos;s real products replace these)
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
          <StoreGrid items={items} />
        )}
      </div>
    </div>
  )
}
