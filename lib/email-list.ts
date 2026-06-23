import crypto from 'crypto'

// ── Mailchimp ────────────────────────────────────────────────────────────────
const MC_KEY = process.env.MAILCHIMP_API_KEY
const MC_LIST = process.env.MAILCHIMP_LIST_ID
// Datacenter is the suffix on the API key, e.g. "....-us21" -> "us21"
const MC_DC = MC_KEY?.split('-')[1]

// ── Email (Resend) ───────────────────────────────────────────────────────────
const RESEND_KEY = process.env.RESEND_API_KEY
export const JAY_EMAIL = 'theejaymckoy@gmail.com'

/** Add (or update) a subscriber in the Mailchimp audience, with an optional tag. */
export async function addToMailchimp(email: string, firstName?: string, tag?: string) {
  if (!MC_KEY || !MC_LIST || !MC_DC) {
    console.warn('Mailchimp not configured (missing MAILCHIMP_API_KEY / MAILCHIMP_LIST_ID)')
    return
  }
  const hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex')

  // PUT upserts — avoids "Member Exists" errors on repeat signups
  const res = await fetch(`https://${MC_DC}.api.mailchimp.com/3.0/lists/${MC_LIST}/members/${hash}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${MC_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'subscribed',
      ...(firstName ? { merge_fields: { FNAME: firstName } } : {}),
    }),
  })
  if (!res.ok) console.error('Mailchimp add failed:', res.status, await res.text())

  if (tag) {
    await fetch(`https://${MC_DC}.api.mailchimp.com/3.0/lists/${MC_LIST}/members/${hash}/tags`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${MC_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: [{ name: tag, status: 'active' }] }),
    }).catch(e => console.error('Mailchimp tag failed:', e))
  }
}

/** Email Jay. No-ops (but logs) if RESEND_API_KEY isn't set. */
export async function emailJay(subject: string, text: string, replyTo?: string) {
  if (!RESEND_KEY) {
    console.warn('Resend not configured (RESEND_API_KEY missing) — email skipped:', subject)
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Default works only for sending to the Resend account owner's email.
      // After verifying jaymckoy.com in Resend, set EMAIL_FROM, e.g.
      // EMAIL_FROM="Jay McKoy <hello@jaymckoy.com>"
      from: process.env.EMAIL_FROM || 'Jay McKoy Site <onboarding@resend.dev>',
      to: JAY_EMAIL,
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })
  if (!res.ok) console.error('Resend email failed:', res.status, await res.text())
}
