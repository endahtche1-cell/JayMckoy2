import { NextRequest, NextResponse } from 'next/server'

// TODO: wire up to an email service (e.g. Resend, Nodemailer, SendGrid)
// Add RESEND_API_KEY (or similar) to .env.local and install the SDK
// All messages should forward to theejaymckoy@gmail.com

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // --- Replace this block with your email service call ---
    // Example using Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'Website <noreply@jaymckoy.com>',
    //   to: 'theejaymckoy@gmail.com',
    //   replyTo: email,
    //   subject: `New message: ${subject || '(no subject)'} — from ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // })
    // if (error) throw error
    // --- End block ---

    console.log('Contact form submission:', { name, email, subject, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
