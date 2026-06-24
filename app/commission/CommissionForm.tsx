'use client'

import { useState } from 'react'

// Design system pulled from the banner: teal #2AA8B0, deep blue #1B4A5A
const TEAL   = '#1a2ecc'
const DEEP   = '#1a2ecc'
const LIGHT  = '#eef0ff'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  background: '#ffffff',
  border: `2px solid ${TEAL}`,
  borderRadius: '6px',
  color: '#1a2ecc',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#1a2ecc',
  fontFamily: 'var(--font-body)',
  marginBottom: '7px',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '17px',
  fontWeight: 700,
  color: '#1a2ecc',
  marginBottom: '12px',
  paddingBottom: '7px',
  borderBottom: `2px solid ${TEAL}`,
}

type Form = {
  name: string
  email: string
  use: 'personal' | 'business' | ''
  figures: string
  background: 'yes' | 'no' | ''
  description: string
  references: string
}

const init: Form = { name: '', email: '', use: '', figures: '', background: '', description: '', references: '' }

function PillGroup({ label, options, value, onChange }: {
  label: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {options.map((opt) => {
          const sel = value === opt.value
          return (
            <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                fontSize: '16px',
                fontWeight: sel ? 800 : 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                background: sel ? '#1a2ecc' : '#fff',
                color: sel ? '#fff' : '#1a2ecc',
                border: `2px solid ${sel ? DEEP : TEAL}`,
                letterSpacing: '0.02em',
                transition: 'all 0.15s',
                minWidth: '140px',
              }}>
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CommissionForm() {
  const [form, setForm] = useState<Form>(init)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.use || !form.background) return
    setStatus('loading')
    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '56px 40px',
        textAlign: 'center',
        background: LIGHT,
        borderRadius: '12px',
        border: `3px solid ${TEAL}`,
      }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: '#1a2ecc', marginBottom: '12px' }}>
          Request received ★
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#2A6070', lineHeight: 1.7 }}>
          Jay will review your commission and reach out with details and a payment link.
        </p>
      </div>
    )
  }

  const ready = form.use && form.background

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

      {/* Contact */}
      <div>
        <p style={sectionLabel}>Your details</p>
        <div className="commission-name-email" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input required style={inputStyle} value={form.name}
              onChange={e => set('name', e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input required type="email" style={inputStyle} value={form.email}
              onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
          </div>
        </div>
      </div>

      {/* Commission details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <p style={sectionLabel}>Commission details</p>

        <PillGroup
          label="Personal or business use? *"
          value={form.use}
          onChange={v => set('use', v as Form['use'])}
          options={[
            { label: '★ Personal', value: 'personal' },
            { label: '☆ Business', value: 'business' },
          ]}
        />

        <div>
          <label style={labelStyle}>How many figures? *</label>
          <input required type="number" min={1} max={20}
            style={{ ...inputStyle, maxWidth: '160px' }}
            value={form.figures} onChange={e => set('figures', e.target.value)}
            placeholder="e.g. 1" />
        </div>

        <PillGroup
          label="Background or no background? *"
          value={form.background}
          onChange={v => set('background', v as Form['background'])}
          options={[
            { label: '✮ With background', value: 'yes' },
            { label: '✮ No background', value: 'no' },
          ]}
        />
      </div>

      {/* Brief */}
      <div>
        <p style={sectionLabel}>The brief</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Describe what you want *</label>
            <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }}
              value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Tell Jay what you're envisioning. Subject, mood, style, any details that matter." />
          </div>
          <div>
            <label style={labelStyle}>References</label>
            <input style={inputStyle} value={form.references}
              onChange={e => set('references', e.target.value)}
              placeholder="Image URLs or describe references (optional)" />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#C0392B' }}>
          Something went wrong. Email Jay at theejaymckoy@gmail.com
        </p>
      )}

      <div>
        <button type="submit" disabled={!ready || status === 'loading'}
          style={{
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: 800,
            fontFamily: 'var(--font-body)',
            background: ready ? '#1a2ecc' : '#b0c8f0',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            cursor: ready ? 'pointer' : 'not-allowed',
            letterSpacing: '0.03em',
            transition: 'background 0.2s',
          }}>
          {status === 'loading' ? 'Submitting…' : 'Submit commission request →'}
        </button>
        <p style={{ marginTop: '10px', fontFamily: 'Courier New, monospace', fontSize: '11px', color: '#6A9AA8', letterSpacing: '0.05em' }}>
          ⋆˚₊‧ * required fields
        </p>
      </div>
    </form>
  )
}
