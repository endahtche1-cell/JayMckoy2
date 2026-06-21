'use client'

import { useState } from 'react'

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  color: 'var(--fg)',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  outline: 'none',
  borderRadius: '4px',
} as const

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
  name: '',
  email: '',
  use: '',
  figures: '',
  background: '',
  description: '',
  references: '',
}

function RadioGroup({
  label, name, options, value, onChange,
}: {
  label: string
  name: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
        {label} *
      </p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-4 py-2 text-sm font-semibold transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              background: value === opt.value ? 'var(--accent)' : 'var(--surface)',
              color: value === opt.value ? '#FAFAFE' : 'var(--fg)',
              border: `1px solid ${value === opt.value ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '4px',
            }}>
            {opt.label}
          </button>
        ))}
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
      <div className="p-8 text-center rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>Request received! 🎨</p>
        <p className="text-sm" style={{ opacity: 0.6, fontFamily: 'var(--font-body)' }}>
          Jay will review your request and reach out with details and a payment link.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            Name *
          </label>
          <input required style={inputStyle} value={form.name}
            onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
            Email *
          </label>
          <input required type="email" style={inputStyle} value={form.email}
            onChange={(e) => set('email', e.target.value)} placeholder="your@email.com" />
        </div>
      </div>

      {/* Jay's exact commission questions */}
      <RadioGroup
        label="Is this for personal or business use?"
        name="use"
        value={form.use}
        onChange={(v) => set('use', v as Form['use'])}
        options={[
          { label: 'Personal', value: 'personal' },
          { label: 'Business', value: 'business' },
        ]}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          How many figures are included? *
        </label>
        <input required style={inputStyle} type="number" min={1} max={20} value={form.figures}
          onChange={(e) => set('figures', e.target.value)}
          placeholder="e.g. 1" />
      </div>

      <RadioGroup
        label="Background or no background?"
        name="background"
        value={form.background}
        onChange={(v) => set('background', v as Form['background'])}
        options={[
          { label: 'With background', value: 'yes' },
          { label: 'No background', value: 'no' },
        ]}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          Describe what you want *
        </label>
        <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Tell Jay what you're envisioning — style, subject, mood, any details that matter." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          Reference images / links
        </label>
        <input style={inputStyle} value={form.references}
          onChange={(e) => set('references', e.target.value)}
          placeholder="Paste any image URLs or describe references (optional)" />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#E05C5C' }}>
          Something went wrong. Email directly at theejaymckoy@gmail.com.
        </p>
      )}

      <button type="submit" disabled={status === 'loading' || !form.use || !form.background}
        className="px-8 py-3 text-sm font-bold tracking-wide self-start mt-2"
        style={{
          background: 'var(--accent)',
          color: '#FAFAFE',
          fontFamily: 'var(--font-body)',
          opacity: status === 'loading' || !form.use || !form.background ? 0.5 : 1,
          borderRadius: '4px',
          cursor: !form.use || !form.background ? 'not-allowed' : 'pointer',
        }}>
        {status === 'loading' ? 'Submitting…' : 'Submit commission request →'}
      </button>
    </form>
  )
}
