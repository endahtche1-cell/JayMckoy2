import type { Metadata } from 'next'
import CommissionForm from './CommissionForm'

export const metadata: Metadata = { title: 'Commission' }

const faqs = [
  {
    q: 'How does payment work?',
    a: 'Payment must be made in full upfront before work begins. You\'ll receive a payment link once your commission request is reviewed and accepted.',
  },
  {
    q: 'How long does a commission take?',
    a: 'Turnaround time varies by piece complexity. Jay will confirm an estimated timeline when accepting your commission.',
  },
  {
    q: 'Can I use my commission for commercial purposes?',
    a: 'Personal and business use are both available — just let Jay know in your request as pricing may differ.',
  },
  {
    q: 'What file formats do I receive?',
    a: 'For digital work, you\'ll receive a high-resolution file. Physical commissions are shipped domestically — allow 1–2 weeks.',
  },
]

export default function CommissionPage() {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="max-w-2xl">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ opacity: 0.35, fontFamily: 'var(--font-body)' }}>
          Commission
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Get a piece made for you.
        </h1>
        <p className="text-base mb-4" style={{ opacity: 0.65, fontFamily: 'var(--font-body)' }}>
          Portraits, characters, brand work — fill in the form and Jay will be in touch to confirm
          details and send a payment link.
        </p>

        {/* Payment-in-full notice */}
        <div className="flex gap-3 p-4 mb-12 rounded-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <span style={{ color: 'var(--accent)', fontSize: '18px' }}>💳</span>
          <p className="text-sm" style={{ fontFamily: 'var(--font-body)', opacity: 0.75 }}>
            <strong>Payment in full</strong> is required before work begins. You&apos;ll receive an invoice
            once your request is reviewed. We accept card and Apple Pay.
          </p>
        </div>

        <CommissionForm />

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Good to know
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="font-bold mb-2" style={{ fontFamily: 'var(--font-body)' }}>{faq.q}</p>
                <p className="text-sm" style={{ opacity: 0.65, fontFamily: 'var(--font-body)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
