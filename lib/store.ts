import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export type StoreSize = { label?: string; price?: number; stripePriceId?: string }

export type StoreItem = {
  _id: string
  title: string
  slug: string
  type?: string
  image: unknown
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

export async function getStoreItems(): Promise<StoreItem[]> {
  try {
    return await client.fetch(
      `*[_type == "storeItem"] | order(order asc, _createdAt desc){ ${FIELDS} }`,
      {},
      { next: { revalidate: 60 } },
    )
  } catch (e) {
    console.warn('Sanity store fetch failed (check NEXT_PUBLIC_SANITY_PROJECT_ID):', (e as Error).message)
    return []
  }
}

export async function getStoreItem(slug: string): Promise<StoreItem | null> {
  try {
    return await client.fetch(
      `*[_type == "storeItem" && slug.current == $slug][0]{ ${FIELDS} }`,
      { slug },
      { next: { revalidate: 60 } },
    )
  } catch (e) {
    console.warn('Sanity item fetch failed:', (e as Error).message)
    return null
  }
}

export function img(source: unknown, w = 900): string {
  try { return urlFor(source as never).width(w).quality(80).url() } catch { return '' }
}

// £ from pence
export function gbp(pence?: number): string {
  if (pence == null) return ''
  return '£' + (pence / 100).toFixed(2).replace(/\.00$/, '')
}
