import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Safe diagnostic: reports whether STRIPE_SECRET_KEY is present and well-formed,
// WITHOUT ever exposing the key. Remove once the store is confirmed live.
export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY || ''
  const present = key.length > 0
  const matchesSecret = /^sk_(test|live)_[A-Za-z0-9]{24,}$/.test(key)
  const prefix = key.slice(0, 8) // e.g. "sk_live_" / "pk_live_" / "rk_live_" — no secret material
  return NextResponse.json({
    present,
    matchesSecret,
    prefix: present ? prefix : null,
    length: key.length,
  })
}
