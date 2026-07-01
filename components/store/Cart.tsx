'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type CartLine = {
  key: string      // slug | size
  slug: string
  title: string
  size?: string
  price: number    // pence (display only — server re-validates)
  image: string
  qty: number
}

type CartCtx = {
  lines: CartLine[]
  count: number
  add: (line: Omit<CartLine, 'qty' | 'key'> & { qty?: number }) => void
  remove: (key: string) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  open: boolean
  setOpen: (o: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'jm_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setLines(JSON.parse(s)) } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch {}
  }, [lines])

  const add: CartCtx['add'] = useCallback((line) => {
    const key = `${line.slug}|${line.size ?? ''}`
    setLines(prev => {
      const found = prev.find(l => l.key === key)
      if (found) return prev.map(l => l.key === key ? { ...l, qty: l.qty + (line.qty ?? 1) } : l)
      return [...prev, { ...line, key, qty: line.qty ?? 1 }]
    })
    setOpen(true)
  }, [])

  const remove = useCallback((key: string) => setLines(prev => prev.filter(l => l.key !== key)), [])
  const setQty = useCallback((key: string, qty: number) =>
    setLines(prev => prev.flatMap(l => l.key !== key ? [l] : qty <= 0 ? [] : [{ ...l, qty }])), [])
  const clear = useCallback(() => setLines([]), [])

  const count = lines.reduce((n, l) => n + l.qty, 0)

  return (
    <Ctx.Provider value={{ lines, count, add, remove, setQty, clear, open, setOpen }}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  )
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}

const gbp = (p: number) => '£' + (p / 100).toFixed(2).replace(/\.00$/, '')

export function CartButton() {
  const { count, setOpen } = useCart()
  return (
    <button onClick={() => setOpen(true)} aria-label="Open cart"
      style={{ position: 'fixed', top: '18px', right: '18px', zIndex: 70, background: '#8C2257', color: '#fff',
        border: 'none', borderRadius: '999px', padding: '10px 16px', cursor: 'pointer', fontFamily: 'var(--font-body)',
        fontWeight: 700, fontSize: '13px', boxShadow: '0 4px 16px rgba(0,0,0,.2)' }}>
      Cart{count ? ` · ${count}` : ''}
    </button>
  )
}

function CartDrawer() {
  const { lines, remove, setQty, open, setOpen } = useCart()
  const [loading, setLoading] = useState(false)
  const total = lines.reduce((n, l) => n + l.price * l.qty, 0)

  const checkout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: lines.map(l => ({ slug: l.slug, size: l.size, qty: l.qty })) }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else { alert(data.error || 'Checkout failed'); setLoading(false) }
    } catch { alert('Checkout failed'); setLoading(false) }
  }

  if (!open) return null
  return (
    <div onClick={() => setOpen(false)}
      style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,.4)', display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()}
        style={{ width: 'min(420px, 92vw)', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column',
          fontFamily: 'var(--font-body)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #eee' }}>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#8C2257' }}>Your cart</strong>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
          {lines.length === 0 && <p style={{ color: '#888', padding: '30px 0', textAlign: 'center' }}>Your cart is empty.</p>}
          {lines.map(l => (
            <div key={l.key} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f2f2f2' }}>
              {l.image && <img src={l.image} alt="" style={{ width: 60, height: 76, objectFit: 'cover', borderRadius: 4 }} />}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '14px' }}>{l.title}</p>
                {l.size && <p style={{ fontSize: '12px', color: '#888' }}>{l.size}</p>}
                <p style={{ fontSize: '13px', color: '#8C2257', fontWeight: 600 }}>{gbp(l.price)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <button onClick={() => setQty(l.key, l.qty - 1)} style={qtyBtn}>−</button>
                  <span style={{ fontSize: '13px' }}>{l.qty}</span>
                  <button onClick={() => setQty(l.key, l.qty + 1)} style={qtyBtn}>+</button>
                  <button onClick={() => remove(l.key)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#c00', fontSize: '12px', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div style={{ padding: '18px 20px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 700 }}>
              <span>Total</span><span>{gbp(total)}</span>
            </div>
            <button onClick={checkout} disabled={loading}
              style={{ width: '100%', background: '#8C2257', color: '#fff', border: 'none', borderRadius: '999px',
                padding: '14px', fontWeight: 700, cursor: 'pointer', fontSize: '15px', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Redirecting…' : 'Checkout'}
            </button>
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '10px' }}>Secure checkout by Stripe · card &amp; Apple Pay</p>
          </div>
        )}
      </div>
    </div>
  )
}

const qtyBtn: React.CSSProperties = { width: 24, height: 24, borderRadius: 4, border: '1px solid #ddd', background: '#fafafa', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }
