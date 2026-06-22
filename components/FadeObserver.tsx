'use client'

import { useEffect } from 'react'

export default function FadeObserver() {
  useEffect(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('.fade-el'))
    // Skip display:none elements (zero rect)
    const items = all.filter(el => {
      const r = el.getBoundingClientRect()
      return !(r.width === 0 && r.height === 0)
    })
    if (!items.length) return

    // Hide all immediately
    items.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(14px)'
    })

    // Safety net — show everything after 1.5s in case observer fails
    const safety = setTimeout(() => {
      items.forEach(el => reveal(el))
    }, 1500)

    // reveal: set transition FIRST, then change opacity in next rAF
    const reveal = (el: HTMLElement) => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    }

    const vh = window.innerHeight
    const inView = items.filter(el => el.getBoundingClientRect().top < vh)
    const below  = items.filter(el => el.getBoundingClientRect().top >= vh)

    // Double rAF: browser paints opacity:0 before we start transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Stagger in-viewport items
        inView.forEach((el, i) => setTimeout(() => reveal(el), i * 90))

        // Scroll-triggered for below-fold
        if (!('IntersectionObserver' in window)) {
          below.forEach((el, i) => setTimeout(() => reveal(el), 300 + i * 60))
          return
        }
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (!e.isIntersecting) return
            reveal(e.target as HTMLElement)
            obs.unobserve(e.target)
          })
        }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' })
        below.forEach(el => obs.observe(el))

        // Store cleanup
        ;(window as any).__fadeObs = obs
      })
    })

    return () => {
      clearTimeout(safety)
      ;(window as any).__fadeObs?.disconnect()
    }
  }, [])

  return null
}
