'use client'

import { useEffect } from 'react'

export default function MobileFadeObserver() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.mobile-grid a'))
    if (!items.length) return

    // Set all hidden first
    items.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(14px)'
    })

    // Double rAF forces iOS Safari to render the opacity:0 state before transitioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        items.forEach((el, i) => {
          el.style.transition = `opacity 0.6s ease ${Math.min(i * 80, 900)}ms, transform 0.6s ease ${Math.min(i * 80, 900)}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
      })
    })
  }, [])

  return null
}
