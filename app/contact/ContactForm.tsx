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

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
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
        <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>Message sent! ✨</p>
        <p className="text-sm" style={{ opacity: 0.6, fontFamily: 'var(--font-body)' }}>
          Jay will get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          Subject
        </label>
        <input style={inputStyle} value={form.subject}
          onChange={(e) => set('subject', e.target.value)} placeholder="What's this about?" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide font-semibold" style={{ opacity: 0.5, fontFamily: 'var(--font-body)' }}>
          Message *
        </label>
        <textarea required rows={6} style={{ ...inputStyle, resize: 'vertical' }} value={form.message}
          onChange={(e) => set('message', e.target.value)} placeholder="Say whatever you want — Jay reads every message." />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#E05C5C' }}>
          Something went wrong. Email directly at theejaymckoy@gmail.com.
        </p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="px-8 py-3 text-sm font-bold tracking-wide self-start mt-2"
        style={{
          background: 'var(--accent)',
          color: '#FAFAFE',
          fontFamily: 'var(--font-body)',
          opacity: status === 'loading' ? 0.7 : 1,
          borderRadius: '4px',
        }}>
        {status === 'loading' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
