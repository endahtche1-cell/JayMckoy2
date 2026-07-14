import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Commission' }

export default function CommissionPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>

      {/* Hero — transparent PNG title, lifted above the star field */}
      <style>{`@media (max-width: 767px){ .commission-hero { padding-top: 28px !important; } }`}</style>
      <div className="commission-hero" style={{ textAlign: 'center', padding: '40px 24px 32px', background: 'transparent', position: 'relative', zIndex: 3 }}>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8C2257', marginBottom: '20px' }}>
          ˙⋆✮⋆˚ Jay McKoy ˚⋆✮⋆˙
        </p>
        {/* WORK WITH ME — transparent PNG title */}
        <img src="/work-with-me.png" alt="Work with me"
          style={{ width: 'min(560px, 92%)', height: 'auto', display: 'block', margin: '0 auto', pointerEvents: 'none', position: 'relative', zIndex: 3 }} />
      </div>

      {/* Commissions temporarily closed */}
      <div style={{ padding: '40px 24px 88px' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', background: '#fff', border: '2px solid #8C2257', borderRadius: '16px', padding: '40px 30px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
          <p style={{ fontSize: '22px', color: '#8C2257', marginBottom: '14px' }}>꒰ა ★ ໒꒱</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 6vw, 38px)', color: '#12101A', lineHeight: 1.15, marginBottom: '18px' }}>
            Commissions are taking a little pause
          </h2>
          <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.75, marginBottom: '16px' }}>
            Jay&apos;s commission books are <strong>temporarily closed</strong>. He&apos;s stepping back to
            focus on some personal things and to give every piece the time and care it deserves.
          </p>
          <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.75, marginBottom: '28px' }}>
            There&apos;s no set reopening date just yet — but this is a pause, not a goodbye. Thank you
            for your patience and for wanting to work with Jay. 🤍
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href="https://instagram.com/jaymckoyy" target="_blank" rel="noopener noreferrer"
              style={{ background: '#8C2257', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '14px', padding: '12px 22px', borderRadius: '999px' }}>
              Follow for updates
            </a>
          </div>

          <p style={{ fontSize: '12px', color: '#9a90a2', marginTop: '22px', lineHeight: 1.6 }}>
            Follow <a href="https://instagram.com/jaymckoyy" target="_blank" rel="noopener noreferrer" style={{ color: '#8C2257', fontWeight: 600 }}>@jaymckoyy</a> to hear first when commissions reopen.
          </p>
        </div>
      </div>
    </div>
  )
}
