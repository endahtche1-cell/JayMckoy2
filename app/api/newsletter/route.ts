import { NextRequest, NextResponse } from 'next/server'
import { addToMailchimp } from '@/lib/email-list'

// Newsletter signup: add the email to the Mailchimp audience
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    await addToMailchimp(email, undefined, 'Newsletter')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
