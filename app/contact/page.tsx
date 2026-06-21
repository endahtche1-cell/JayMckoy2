import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="max-w-2xl">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Let&apos;s talk.
        </h1>
        <p className="text-base mb-12" style={{ opacity: 0.6, fontFamily: 'var(--font-body)' }}>
          Every message goes directly to Jay. For commissions, head to the{' '}
          <a href="/commission" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Commission page
          </a>.
        </p>

        <ContactForm />

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs mb-2" style={{ opacity: 0.4 }}>Prefer email?</p>
          <a href="mailto:theejaymckoy@gmail.com"
            className="text-sm font-semibold"
            style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            theejaymckoy@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
