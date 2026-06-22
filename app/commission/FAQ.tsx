'use client'

const TEAL = '#1a2ecc'
const DEEP = '#1a2ecc'

const faqs = [
  {
    q: 'How does payment work?',
    a: 'Payment in full is required before work begins. Once Jay reviews and accepts your request he will send a secure invoice. We accept card and Apple Pay.',
  },
  {
    q: 'How long does a commission take?',
    a: 'Turnaround varies by complexity. Jay will confirm an estimated timeline when he accepts your request.',
  },
  {
    q: 'Personal vs business, what\'s the difference?',
    a: 'Personal commissions are for private use: gifts, keepsakes, personal art. Business commissions are for commercial use such as branding, campaigns, or products. Pricing may differ.',
  },
  {
    q: 'Can I send reference images?',
    a: 'Yes, paste image links or describe your references in the brief field.',
  },
  {
    q: 'What if I want changes?',
    a: 'Minor revisions are included. Significant changes to the original brief may incur additional fees. Jay will let you know upfront.',
  },
]

export default function FAQ() {
  return (
    <div style={{ marginTop: '56px', borderTop: `3px solid ${TEAL}`, paddingTop: '32px', background: '#fff', borderRadius: '16px', padding: '32px 24px' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: DEEP, marginBottom: '8px' }}>
        Good to know
      </p>

      <style>{`
        .faq-item { border-bottom: 1px solid ${TEAL}30; }
        .faq-item summary {
          list-style: none;
          cursor: pointer;
          padding: 18px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: ${DEEP};
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after {
          content: '+';
          flex-shrink: 0;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: ${TEAL};
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 700;
          transition: transform 0.2s;
        }
        .faq-item[open] summary::after { transform: rotate(45deg); }
        .faq-answer {
          font-family: var(--font-body);
          font-size: 14px;
          color: #2A6070;
          line-height: 1.75;
          padding-bottom: 18px;
        }
      `}</style>

      <div>
        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>{faq.q}</summary>
            <p className="faq-answer">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
