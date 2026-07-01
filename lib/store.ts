import { stripe } from '@/lib/stripe'

export type StoreSize = { label?: string; price?: number; stripePriceId?: string }

export type StoreItem = {
  _id: string
  title: string
  slug: string
  type?: string
  imageUrl?: string
  description?: string
  price?: number            // smallest currency unit (pence/cents)
  stripePriceId?: string
  currency?: string
  sizes?: StoreSize[]
  status?: 'available' | 'sold-out' | 'coming-soon'
  medium?: string
  dimensions?: string
  edition?: string
}

// Store is "live" once a real (long) Stripe secret key is present — placeholders
// like "sk_live_xxx" fall through to the demo preview.
export const STRIPE_CONFIGURED = /^sk_(test|live)_[A-Za-z0-9]{24,}$/.test(process.env.STRIPE_SECRET_KEY || '')

// ── Demo prints (fallback preview + shareable /store?demo=1 design preview) ────
export const DEMO: StoreItem[] = [
  { _id: 'demo-1', slug: 'purple-hat', title: 'Purple Hat', type: 'print', status: 'available', currency: 'gbp',
    imageUrl: '/artwork/IMG_6858.jpg', description: 'Giclée print on heavyweight matte paper.', medium: 'Giclée print',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }] },
  { _id: 'demo-2', slug: 'pink-hair', title: 'Pink Hair', type: 'print', status: 'available', currency: 'gbp',
    imageUrl: '/artwork/IMG_6741.jpg', description: 'A signature Jay McKoy portrait.', medium: 'Giclée print',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }] },
  { _id: 'demo-3', slug: 'the-collection', title: 'The Collection', type: 'print', status: 'available', currency: 'gbp',
    imageUrl: '/artwork/IMG_6810.jpg', description: 'The full cast of characters.', medium: 'Giclée print',
    sizes: [{ label: 'A3', price: 6000 }, { label: 'A2', price: 9000 }] },
  { _id: 'demo-4', slug: 'leopard-glam', title: 'Leopard Glam', type: 'print', status: 'available', currency: 'gbp',
    imageUrl: '/artwork/IMG_6860.jpg', description: 'Print on heavyweight matte paper.', medium: 'Giclée print', price: 4000 },
  { _id: 'demo-5', slug: 'green-eyes', title: 'Green Eyes', type: 'original', status: 'sold-out', currency: 'gbp',
    imageUrl: '/artwork/IMG_6849.jpg', description: 'Original — one of one.', medium: 'Original artwork', price: 25000 },
  { _id: 'demo-6', slug: 'bloom', title: 'Bloom', type: 'print', status: 'available', currency: 'gbp',
    imageUrl: '/artwork/IMG_6774.jpg', description: 'Print on heavyweight matte paper.', medium: 'Giclée print',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }] },
]

// Map one Stripe product (+ its prices) to a StoreItem.
async function toItem(p: import('stripe').Stripe.Product): Promise<StoreItem> {
  const prices = await stripe.prices.list({ product: p.id, active: true, limit: 20 })
  const sorted = prices.data.sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
  const multi = sorted.length > 1
  const currency = sorted[0]?.currency || 'gbp'
  return {
    _id: p.id,
    slug: (p.metadata?.slug as string) || p.id,
    title: p.name,
    type: (p.metadata?.type as string) || 'print',
    imageUrl: p.images?.[0],
    description: p.description || undefined,
    currency,
    price: multi ? undefined : sorted[0]?.unit_amount ?? undefined,
    stripePriceId: multi ? undefined : sorted[0]?.id,
    sizes: multi ? sorted.map(pr => ({ label: pr.nickname || undefined, price: pr.unit_amount ?? undefined, stripePriceId: pr.id })) : undefined,
    status: (p.metadata?.status as StoreItem['status']) || 'available',
    medium: (p.metadata?.medium as string) || undefined,
    dimensions: (p.metadata?.dimensions as string) || undefined,
    edition: (p.metadata?.edition as string) || undefined,
  }
}

export async function getStoreItems(): Promise<StoreItem[]> {
  if (!STRIPE_CONFIGURED) return DEMO
  try {
    const products = await stripe.products.list({ active: true, limit: 100 })
    const items = await Promise.all(products.data.map(toItem))
    return items.sort((a, b) => a.title.localeCompare(b.title))
  } catch (e) {
    console.warn('Stripe products fetch failed:', (e as Error).message)
    return []
  }
}

export async function getStoreItem(slug: string): Promise<StoreItem | null> {
  if (!STRIPE_CONFIGURED) return DEMO.find(d => d.slug === slug) ?? null
  try {
    if (slug.startsWith('prod_')) {
      const p = await stripe.products.retrieve(slug)
      return p.active ? toItem(p) : null
    }
    const products = await stripe.products.list({ active: true, limit: 100 })
    const p = products.data.find(x => (x.metadata?.slug as string) === slug)
    if (p) return toItem(p)
    // Not a real product — fall back to a demo item so the design-preview
    // cards (/store?demo=1) remain clickable. Real products always win above.
    return DEMO.find(d => d.slug === slug) ?? null
  } catch (e) {
    console.warn('Stripe product fetch failed:', (e as Error).message)
    return DEMO.find(d => d.slug === slug) ?? null
  }
}

export function itemImage(item: StoreItem): string {
  return item.imageUrl || ''
}

export function money(amount?: number, currency = 'gbp'): string {
  if (amount == null) return ''
  const value = amount / 100
  try {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency.toUpperCase() })
      .format(value).replace(/\.00$/, '')
  } catch {
    return '£' + value.toFixed(2).replace(/\.00$/, '')
  }
}
