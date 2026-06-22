'use client'

import { useState } from 'react'

export default function NewsletterSignup({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const isDark = variant === 'dark'
  const textColor = isDark ? '#FAFAFE' : 'var(--fg)'
  const inputBg = isDark ? 'rgba(255,255,255,0.08)' : 'var(--bg)'
  const inputBorder = isDark ? 'rgba(255,255,255,0.2)' : 'var(--border)'

  if (status === 'success') {
    return (
      <p className="text-sm font-semibold" style={{ color: isDark ? '#A89FD4' : 'var(--accent)' }}>
        You&apos;re in! ✨ Watch your inbox.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 text-sm outline-none"
        style={{
          background: inputBg,
          border: `1px solid ${inputBorder}`,
          color: textColor,
          fontFamily: 'var(--font-body)',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 text-sm font-bold tracking-wide shrink-0"
        style={{
          background: 'var(--accent)',
          color: '#FAFAFE',
          fontFamily: 'var(--font-body)',
          opacity: status === 'loading' ? 0.7 : 1,
        }}>
        {status === 'loading' ? 'Signing up…' : 'Sign up'}
      </button>
      {status === 'error' && (
        <p className="text-xs mt-1 w-full" style={{ color: '#E05C5C' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}
