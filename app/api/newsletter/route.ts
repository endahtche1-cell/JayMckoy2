import { NextRequest, NextResponse } from 'next/server'

// TODO: connect to an email list provider
// Good options: Mailchimp, ConvertKit (Kit), Resend Audiences, Beehiiv
// Add the API key to .env.local (e.g. MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // --- Replace this block with your email list provider ---
    // Example: Mailchimp
    // const response = await fetch(
    //   `https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    //   }
    // )
    // if (!response.ok) throw new Error('Mailchimp error')
    // --- End block ---

    console.log('Newsletter signup:', email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
