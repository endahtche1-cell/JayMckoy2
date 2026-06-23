import { NextRequest, NextResponse } from 'next/server'
import { emailJay } from '@/lib/email-list'

// Contact form: forward the message to Jay's email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await emailJay(
      `New message: ${subject || '(no subject)'} — from ${name}`,
      `From: ${name} <${email}>\n\n${message}`,
      email,
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
