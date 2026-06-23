import { NextRequest, NextResponse } from 'next/server'
import { addToMailchimp, emailJay } from '@/lib/email-list'

// Commission requests: add the person to the Mailchimp audience + email Jay
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, use, figures, background, description, references } = body

    if (!name || !email || !use || !figures || !background || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailBody = [
      `Commission request from ${name} <${email}>`,
      ``,
      `Use: ${use}`,
      `Figures: ${figures}`,
      `Background: ${background === 'yes' ? 'With background' : 'No background'}`,
      ``,
      `Description:`,
      description,
      references ? `\nReferences: ${references}` : '',
    ].filter(Boolean).join('\n')

    // Run both; don't let one failure block the other
    await Promise.allSettled([
      addToMailchimp(email, name, 'Commission Enquiry'),
      emailJay(`Commission request from ${name}`, emailBody, email),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Commission API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
