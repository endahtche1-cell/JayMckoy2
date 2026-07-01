import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export type StoreSize = { label?: string; price?: number; stripePriceId?: string }

export type StoreItem = {
  _id: string
  title: string
  slug: string
  type?: string
  image?: unknown
  imageUrl?: string         // used by demo items (bypasses Sanity image builder)
  description?: string
  price?: number            // pence
  stripePriceId?: string
  sizes?: StoreSize[]
  status?: 'available' | 'sold-out' | 'coming-soon'
  medium?: string
  dimensions?: string
  edition?: string
}

const FIELDS = `_id, title, "slug": slug.current, type, image, description, price, stripePriceId, sizes, status, medium, dimensions, edition`

// Real Sanity connected only when the project id is a valid, non-placeholder value.
const rawId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const SANITY_CONFIGURED = /^[a-z0-9-]+$/.test(rawId) && rawId !== 'placeholder' && rawId !== 'your_project_id'

// ── Demo prints (shown only until Jay's real products are added) ──────────────
const DEMO: StoreItem[] = [
  {
    _id: 'demo-1', slug: 'purple-hat', title: 'Purple Hat', type: 'print', status: 'available',
    imageUrl: '/artwork/IMG_6858.jpg',
    description: 'Giclée print on heavyweight matte paper. Colours as rich as the original.',
    medium: 'Giclée print', edition: 'Open edition',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }, { label: 'A2', price: 8500 }],
  },
  {
    _id: 'demo-2', slug: 'pink-hair', title: 'Pink Hair', type: 'print', status: 'available',
    imageUrl: '/artwork/IMG_6741.jpg',
    description: 'A signature Jay McKoy portrait — bold colour and Black joy.',
    medium: 'Giclée print', edition: 'Open edition',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }],
  },
  {
    _id: 'demo-3', slug: 'the-collection', title: 'The Collection', type: 'print', status: 'available',
    imageUrl: '/artwork/IMG_6810.jpg',
    description: 'The full cast of characters in one print.', medium: 'Giclée print',
    sizes: [{ label: 'A3', price: 6000 }, { label: 'A2', price: 9000 }],
  },
  {
    _id: 'demo-4', slug: 'leopard-glam', title: 'Leopard Glam', type: 'print', status: 'available',
    imageUrl: '/artwork/IMG_6860.jpg',
    description: 'Print on heavyweight matte paper.', medium: 'Giclée print',
    price: 4000,
  },
  {
    _id: 'demo-5', slug: 'green-eyes', title: 'Green Eyes', type: 'original', status: 'sold-out',
    imageUrl: '/artwork/IMG_6849.jpg',
    description: 'Original piece — one of one.', medium: 'Original artwork', dimensions: 'A3',
    price: 25000,
  },
  {
    _id: 'demo-6', slug: 'bloom', title: 'Bloom', type: 'print', status: 'available',
    imageUrl: '/artwork/IMG_6774.jpg',
    description: 'Print on heavyweight matte paper.', medium: 'Giclée print',
    sizes: [{ label: 'A4', price: 3500 }, { label: 'A3', price: 5500 }],
  },
]

export async function getStoreItems(): Promise<StoreItem[]> {
  if (!SANITY_CONFIGURED) return DEMO
  try {
    return await client.fetch(
      `*[_type == "storeItem"] | order(order asc, _createdAt desc){ ${FIELDS} }`,
      {}, { next: { revalidate: 60 } },
    )
  } catch (e) {
    console.warn('Sanity store fetch failed:', (e as Error).message)
    return []
  }
}

export async function getStoreItem(slug: string): Promise<StoreItem | null> {
  if (!SANITY_CONFIGURED) return DEMO.find(d => d.slug === slug) ?? null
  try {
    return await client.fetch(
      `*[_type == "storeItem" && slug.current == $slug][0]{ ${FIELDS} }`,
      { slug }, { next: { revalidate: 60 } },
    )
  } catch (e) {
    console.warn('Sanity item fetch failed:', (e as Error).message)
    return null
  }
}

export function itemImage(item: StoreItem, w = 900): string {
  if (item.imageUrl) return item.imageUrl
  try { return urlFor(item.image as never).width(w).quality(80).url() } catch { return '' }
}

export function gbp(pence?: number): string {
  if (pence == null) return ''
  return '£' + (pence / 100).toFixed(2).replace(/\.00$/, '')
}
