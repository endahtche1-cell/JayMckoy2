'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  background: '#fdf5ff',
  border: '1.5px solid #C9A8E0',
  borderRadius: '12px',
  color: '#2D1B4E',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#7A3FA0',
  fontFamily: 'var(--font-body)',
  marginBottom: '8px',
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

const initialForm: Form = {
  name: '', email: '', use: '', figures: '', background: '', description: '', references: '',
}

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
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
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: selected ? 700 : 500,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                background: selected ? '#8C2257' : '#fdf0ff',
                color: selected ? '#fff' : '#6B3FA0',
                border: selected ? '2px solid #8C2257' : '2px solid #C9A8E0',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CommissionForm() {
  const [form, setForm] = useState<Form>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '56px 40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fef0fa, #eef0ff)',
        borderRadius: '24px',
        border: '1.5px solid #C9A8E0',
      }}>
        <p style={{ fontSize: '20px', color: '#A87DC8', letterSpacing: '0.1em', marginBottom: '16px' }}>
          ˙⋆✮⋆˚ ★ ˚⋆✮⋆˙
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: '#2D1B4E', marginBottom: '10px' }}>
          Request received
        </h2>
        <p style={{ fontSize: '15px', color: '#6B4C8A', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
          Jay will review your commission and reach out with details and a payment link.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input required style={inputStyle} value={form.name}
            onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input required type="email" style={inputStyle} value={form.email}
            onChange={(e) => set('email', e.target.value)} placeholder="your@email.com" />
        </div>
      </div>

      <PillGroup
        label="Is this for personal or business use? *"
        value={form.use}
        onChange={(v) => set('use', v as Form['use'])}
        options={[
          { label: '★ Personal', value: 'personal' },
          { label: '☆ Business', value: 'business' },
        ]}
      />

      <div>
        <label style={labelStyle}>How many figures are included? *</label>
        <input required type="number" min={1} max={20}
          style={{ ...inputStyle, maxWidth: '180px' }}
          value={form.figures} onChange={(e) => set('figures', e.target.value)}
          placeholder="e.g. 1" />
      </div>

      <PillGroup
        label="Background or no background? *"
        value={form.background}
        onChange={(v) => set('background', v as Form['background'])}
        options={[
          { label: '✮ With background', value: 'yes' },
          { label: '⋆ No background', value: 'no' },
        ]}
      />

      <div>
        <label style={labelStyle}>Describe what you want *</label>
        <textarea required rows={6}
          style={{ ...inputStyle, resize: 'vertical' }}
          value={form.description} onChange={(e) => set('description', e.target.value)}
          placeholder="Tell Jay what you're envisioning. Subject, mood, style, any details that matter to you." />
      </div>

      <div>
        <label style={labelStyle}>Reference images / links</label>
        <input style={inputStyle} value={form.references}
          onChange={(e) => set('references', e.target.value)}
          placeholder="Paste any image URLs or describe your references (optional)" />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '14px', color: '#C0392B', fontFamily: 'var(--font-body)' }}>
          Something went wrong. Email Jay directly at theejaymckoy@gmail.com
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'loading' || !form.use || !form.background}
          style={{
            padding: '16px 36px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            background: (!form.use || !form.background) ? '#D4B8E8' : '#8C2257',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            cursor: (!form.use || !form.background) ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            letterSpacing: '0.02em',
          }}
        >
          {status === 'loading' ? 'Submitting' : 'Submit commission request'}
        </button>
        <p style={{ fontSize: '12px', color: '#9B7EBA', fontFamily: 'var(--font-body)', marginTop: '10px', letterSpacing: '0.04em' }}>
          ⋆˚₊‧ required fields marked with *
        </p>
      </div>
    </form>
  )
}
