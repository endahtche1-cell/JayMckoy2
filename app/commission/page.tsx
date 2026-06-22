import type { Metadata } from 'next'
import CommissionForm from './CommissionForm'

export const metadata: Metadata = { title: 'Commission' }

const faqs = [
  {
    q: 'How does payment work?',
    a: 'Payment in full is required before work begins. Once Jay reviews your request, you will receive an invoice with a secure payment link. We accept card and Apple Pay.',
  },
  {
    q: 'How long does a commission take?',
    a: 'Turnaround varies by complexity. Jay will confirm an estimated timeline when he accepts your request.',
  },
  {
    q: 'Personal vs business, what is the difference?',
    a: 'Personal commissions are for private use like gifts, keepsakes, personal art. Business commissions are for commercial use such as branding, campaigns, or products. Pricing may differ.',
  },
  {
    q: 'Can I send reference images?',
    a: 'Yes, paste any image links or describe your references in the form. The more detail, the better.',
  },
]

export default function CommissionPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Hero strip ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f9eef4 0%, #ede8f7 50%, #e8f2fb 100%)',
        padding: '72px 48px 64px',
        textAlign: 'center',
        borderBottom: '1px solid #e8d8f0',
      }}>
        <p style={{
          fontSize: '12px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#9B4F96',
          fontFamily: 'var(--font-body)',
          marginBottom: '18px',
          fontWeight: 600,
        }}>
          ˙⋆✮⋆˚ commission a piece ˚⋆✮⋆˙
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 700,
          color: '#2D1B4E',
          lineHeight: 1.1,
          maxWidth: '700px',
          margin: '0 auto 20px',
        }}>
          Get a piece made just for you
        </h1>
        <p style={{
          fontSize: '13px',
          letterSpacing: '0.08em',
          color: '#A87DC8',
          fontFamily: 'var(--font-body)',
          marginBottom: '14px',
        }}>
          ‧₊˚ ☆ ‧₊˚ ☆ ‧₊˚ ☆ ‧₊˚
        </p>
        <p style={{
          fontSize: '16px',
          color: '#6B4C8A',
          fontFamily: 'var(--font-body)',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Portraits, characters, brand work. Fill in the form and Jay will be in touch to confirm details and send a payment link.
        </p>
      </div>

      {/* ── Payment notice ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          marginTop: '40px',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #fef0fa, #eef0ff)',
          border: '1.5px solid #C9A8E0',
          borderRadius: '16px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '2px', color: '#9B4F96', letterSpacing: '0.05em' }}>꒰ა ★ ໒꒱</span>
          <p style={{ fontSize: '14px', color: '#4A2D6F', fontFamily: 'var(--font-body)', lineHeight: 1.65 }}>
            <strong>Payment in full</strong> is required before work begins. Jay will send a secure invoice once your request is accepted. Accepts card and Apple Pay.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 48px 80px' }}>
        <CommissionForm />
      </div>

      {/* ── FAQs ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f9eef4 0%, #ede8f7 100%)',
        borderTop: '1px solid #e8d8f0',
        padding: '64px 48px',
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 700,
            color: '#2D1B4E',
            marginBottom: '8px',
          }}>
            Good to know
          </h2>
          <p style={{ fontSize: '13px', color: '#A87DC8', letterSpacing: '0.08em', marginBottom: '36px' }}>
            ⋆˚₊‧ ★ ‧₊˚⋆
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '28px 0', borderBottom: '1px solid #DBC8EE' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#2D1B4E',
                  marginBottom: '8px',
                }}>
                  {faq.q}
                </p>
                <p style={{ fontSize: '14px', color: '#6B4C8A', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
