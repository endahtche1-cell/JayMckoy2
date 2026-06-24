'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

type DragEl = { id: string; x: number; y: number; rot: number; w: number; src: string; alt: string; aspectW: number; aspectH: number }

// Desktop positions — spread nicely around the page
const DESKTOP: DragEl[] = [
  { id: 'f1',      x: -60,  y: 480,  rot: -8,  w: 210, src: '/about-images/1.png',    alt: 'Frame 1',       aspectW: 480,  aspectH: 600  },
  { id: 'f2',      x: 760,  y: 60,   rot: 7,   w: 210, src: '/about-images/2.png',    alt: 'Frame 2',       aspectW: 480,  aspectH: 600  },
  { id: 'f3',      x: 820,  y: 440,  rot: -5,  w: 220, src: '/about-images/3.png',    alt: 'Frame 3',       aspectW: 480,  aspectH: 600  },
  { id: 'f4',      x: 1040, y: 120,  rot: 8,   w: 210, src: '/about-images/4.png',    alt: 'Frame 4',       aspectW: 480,  aspectH: 600  },
  { id: 'f5',      x: 950,  y: 440,  rot: -4,  w: 200, src: '/about-images/5.png',    alt: 'Frame 5',       aspectW: 480,  aspectH: 600  },
  { id: 'ticket',  x: 120,  y: 700,  rot: -3,  w: 300, src: '/bridgeport-ct.png',     alt: 'Bridgeport, CT', aspectW: 3375, aspectH: 4219 },
]

// Mobile positions — small, peeking in from edges so text stays readable
const MOBILE: DragEl[] = [
  { id: 'f1',    x: -50,  y: 40,   rot: -10, w: 120, src: '/about-images/1.png', alt: 'Frame 1',   aspectW: 480, aspectH: 600 },
  { id: 'f2',    x: 280,  y: 20,   rot: 7,   w: 110, src: '/about-images/2.png', alt: 'Frame 2',   aspectW: 480, aspectH: 600 },
  { id: 'f3',    x: -40,  y: 680,  rot: 5,   w: 115, src: '/about-images/3.png', alt: 'Frame 3',   aspectW: 480, aspectH: 600 },
  { id: 'f4',    x: 280,  y: 660,  rot: -6,  w: 110, src: '/about-images/4.png', alt: 'Frame 4',   aspectW: 480, aspectH: 600 },
  { id: 'f5',    x: 120,  y: 820,  rot: 3,   w: 115, src: '/about-images/5.png', alt: 'Frame 5',   aspectW: 480, aspectH: 600 },
  { id: 'ticket', x: 60,  y: 470,  rot: -3,  w: 220, src: '/bridgeport-ct.png', alt: 'Bridgeport, CT', aspectW: 3375, aspectH: 4219 },
]

export default function DraggableElements() {
  const [isMobile, setIsMobile] = useState(false)
  const [els, setEls] = useState<DragEl[]>(DESKTOP)
  const [zMap, setZMap] = useState<Record<string, number>>({})
  const maxZ = useRef(10)
  const drag = useRef<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null)

  // Detect mobile and set initial positions
  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    setEls(mobile ? MOBILE : DESKTOP)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.preventDefault()
    const el = els.find(x => x.id === id)
    if (!el) return
    drag.current = { id, startX: e.clientX, startY: e.clientY, elX: el.x, elY: el.y }
    maxZ.current += 1
    setZMap(z => ({ ...z, [id]: maxZ.current }))
  }, [els])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current
      if (!d) return
      setEls(prev => prev.map(el =>
        el.id === d.id
          ? { ...el, x: d.elX + (e.clientX - d.startX), y: d.elY + (e.clientY - d.startY) }
          : el
      ))
    }
    const up = () => { drag.current = null }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [])

  return (
    <>
      <style>{`
        .about-frames { position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: 30; }
        .about-draggable-el { position: absolute; pointer-events: all; cursor: grab; user-select: none; touch-action: none; }
        .about-draggable-el:active { cursor: grabbing; }
      `}</style>
      <div className="about-frames">
        {els.map(el => (
          <div
            key={el.id}
            className="about-draggable-el"
            onPointerDown={e => onPointerDown(e, el.id)}
            style={{
              left: el.x,
              top: el.y,
              width: el.w,
              transform: `rotate(${el.rot}deg)`,
              zIndex: zMap[el.id] ?? 1,
            }}
          >
            <Image
              src={el.src}
              alt={el.alt}
              width={el.aspectW}
              height={el.aspectH}
              style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </>
  )
}
