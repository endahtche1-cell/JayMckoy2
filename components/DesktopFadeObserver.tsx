'use client'

import { useEffect } from 'react'

export default function DesktopFadeObserver() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.fade-item'))
    if (!items.length) return

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px 60px 0px' }
    )

    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
