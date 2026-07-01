import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

type InLine = { priceId?: string; qty: number }

export async function POST(req: NextRequest) {
  try {
    if (!/^sk_(test|live)_[A-Za-z0-9]{24,}$/.test(process.env.STRIPE_SECRET_KEY || '')) {
      return NextResponse.json({ error: 'Store not configured yet.' }, { status: 500 })
    }
    const { lines } = (await req.json()) as { lines: InLine[] }
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || new URL(req.url).origin
    const line_items: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = []

    // Validate each price against Stripe (must be a real, active price on the account)
    for (const line of lines) {
      if (!line.priceId || !line.priceId.startsWith('price_')) continue
      try {
        const price = await stripe.prices.retrieve(line.priceId)
        if (!price.active) continue
        const qty = Math.max(1, Math.min(20, Number(line.qty) || 1))
        line_items.push({ price: price.id, quantity: qty })
      } catch { /* invalid price id — skip */ }
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
