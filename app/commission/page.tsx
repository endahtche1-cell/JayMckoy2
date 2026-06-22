import type { Metadata } from 'next'
import Image from 'next/image'
import CommissionForm from './CommissionForm'
import FAQ from './FAQ'

export const metadata: Metadata = { title: 'Commission' }

export default function CommissionPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>

      {/* Hero — plain white with scrapbook chrome letters */}
      <div style={{ textAlign: 'center', padding: '48px 24px 40px', background: '#fff' }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C2257', marginBottom: '20px' }}>
          ˙⋆✮⋆˚ Jay McKoy ˚⋆✮⋆˙
        </p>
        {/* WORK */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: '4px', flexWrap: 'wrap' }}>
          {[31, 23, 26, 19].map((n, i) => (
            <img key={i} src={`/studio/v2/letters/${n}.png`} alt=""
              style={{ height: 'clamp(55px, 9vw, 100px)', width: 'auto', display: 'block', pointerEvents: 'none', marginLeft: i > 0 ? '-8px' : '0' }} />
          ))}
        </div>
        {/* WITH */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: '4px', flexWrap: 'wrap' }}>
          {[31, 17, 28, 16].map((n, i) => (
            <img key={i} src={`/studio/v2/letters/${n}.png`} alt=""
              style={{ height: 'clamp(55px, 9vw, 100px)', width: 'auto', display: 'block', pointerEvents: 'none', marginLeft: i > 0 ? '-8px' : '0' }} />
          ))}
        </div>
        {/* ME */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {[21, 13].map((n, i) => (
            <img key={i} src={`/studio/v2/letters/${n}.png`} alt=""
              style={{ height: 'clamp(55px, 9vw, 100px)', width: 'auto', display: 'block', pointerEvents: 'none', marginLeft: i > 0 ? '-8px' : '0' }} />
          ))}
        </div>
      </div>

      {/* Transparent form section — stars show through */}
      <div style={{ padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>

          {/* Payment notice */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '18px 22px', marginBottom: '48px', background: '#fff', border: '2px solid #1a2ecc', borderRadius: '12px' }}>
            <span style={{ color: '#1a2ecc', fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>꒰ა ★ ໒꒱</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#1a2ecc', lineHeight: 1.65 }}>
              <strong>Payment in full</strong> is required before work begins. Once Jay reviews your request he will send a secure invoice. Accepts card and Apple Pay.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 24px', marginBottom: '24px' }}><CommissionForm /></div>
          <FAQ />
        </div>
      </div>
    </div>
  )
}
