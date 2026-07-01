import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getStoreItem, img } from '@/lib/store'

type InLine = { slug: string; size?: string; qty: number }

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Store not configured yet.' }, { status: 500 })
    }
    const { lines } = (await req.json()) as { lines: InLine[] }
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || new URL(req.url).origin
    const line_items: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = []

    // Re-fetch every item from Sanity so prices can't be tampered with client-side.
    for (const line of lines) {
      const item = await getStoreItem(line.slug)
      if (!item || item.status !== 'available') continue
      const qty = Math.max(1, Math.min(20, Number(line.qty) || 1))

      // Resolve price/label from the chosen size, else the base item.
      let price = item.price
      let stripePriceId = item.stripePriceId
      let label = item.title
      if (line.size && item.sizes?.length) {
        const s = item.sizes.find(x => x.label === line.size)
        if (s) { price = s.price ?? price; stripePriceId = s.stripePriceId ?? stripePriceId; label = `${item.title} — ${s.label}` }
      }

      if (stripePriceId) {
        line_items.push({ price: stripePriceId, quantity: qty })
      } else if (price != null) {
        const image = img(item.image, 800)
        line_items.push({
          quantity: qty,
          price_data: {
            currency: 'gbp',
            unit_amount: price,
            product_data: { name: label, ...(image ? { images: [image] } : {}) },
          },
        })
      }
    }

    if (line_items.length === 0) {
      return NextResponse.json({ error: 'Nothing available to purchase' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      shipping_address_collection: { allowed_countries: ['GB', 'US', 'IE', 'CA', 'AU'] },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
