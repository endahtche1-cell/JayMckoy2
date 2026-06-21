import { NextRequest, NextResponse } from 'next/server'

// TODO: wire up to email service — same setup as /api/contact
// Commission requests forward to theejaymckoy@gmail.com

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, use, figures, background, description, references } = body

    if (!name || !email || !use || !figures || !background || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // --- Replace this block with your email service call ---
    // const emailBody = [
    //   `Commission request from ${name} <${email}>`,
    //   `Use: ${use}`,
    //   `Figures: ${figures}`,
    //   `Background: ${background === 'yes' ? 'With background' : 'No background'}`,
    //   `\nDescription:\n${description}`,
    //   references ? `\nReferences: ${references}` : '',
    // ].filter(Boolean).join('\n')
    //
    // await resend.emails.send({
    //   from: 'Website <noreply@jaymckoy.com>',
    //   to: 'theejaymckoy@gmail.com',
    //   replyTo: email,
    //   subject: `Commission request from ${name}`,
    //   text: emailBody,
    // })
    // --- End block ---

    console.log('Commission request:', { name, email, use, figures, background, description, references })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Commission API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
