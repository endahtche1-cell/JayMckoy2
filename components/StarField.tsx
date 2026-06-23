'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const starFiles = [
  '_ (11).jpeg',
  '_ (12).jpeg',
  '_ (13).jpeg',
  '_ (14).jpeg',
  '_ (15).jpeg',
  '_ (16).jpeg',
  '_ (17).jpeg',
  '_ (18).jpeg',
  '_ (19).jpeg',
  '_ (20).jpeg',
]

// Spread across full page — edges AND middle gaps between images
const placements = [
  // Left edge
  { star: 0,  x: '0%',   y: '3%',   size: 80,  baseRotate: 12  },
  { star: 5,  x: '1%',   y: '22%',  size: 65,  baseRotate: -20 },
  { star: 2,  x: '0%',   y: '44%',  size: 75,  baseRotate: 8   },
  { star: 7,  x: '1%',   y: '65%',  size: 60,  baseRotate: -15 },
  { star: 4,  x: '0%',   y: '84%',  size: 70,  baseRotate: 22  },
  // Right edge
  { star: 3,  x: '92%',  y: '5%',   size: 72,  baseRotate: -8  },
  { star: 8,  x: '93%',  y: '28%',  size: 80,  baseRotate: 18  },
  { star: 1,  x: '92%',  y: '50%',  size: 65,  baseRotate: -25 },
  { star: 6,  x: '93%',  y: '72%',  size: 78,  baseRotate: 10  },
  { star: 9,  x: '92%',  y: '90%',  size: 68,  baseRotate: -12 },
  // Middle — kept clear of the About-page bio text column (pushed right of centre)
  { star: 4,  x: '5%',   y: '8%',   size: 55,  baseRotate: 30  },
  { star: 7,  x: '54%',  y: '40%',  size: 62,  baseRotate: -18 },
  { star: 1,  x: '4%',   y: '95%',  size: 50,  baseRotate: 15  },
  { star: 9,  x: '56%',  y: '78%',  size: 58,  baseRotate: -28 },
  // Between right top-row images (~55% and ~70%)
  { star: 6,  x: '93%',  y: '8%',   size: 52,  baseRotate: 20  },
  { star: 3,  x: '88%',  y: '16%',  size: 48,  baseRotate: -10 },
  // Between right section rows (middle of page vertically)
  { star: 2,  x: '55%',  y: '35%',  size: 60,  baseRotate: 25  },
  { star: 5,  x: '70%',  y: '55%',  size: 55,  baseRotate: -22 },
  { star: 0,  x: '45%',  y: '70%',  size: 50,  baseRotate: 16  },
  { star: 8,  x: '90%',  y: '95%',  size: 58,  baseRotate: -8  },
]

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      containerRef.current?.querySelectorAll<HTMLElement>('.star-item').forEach(el => {
        const base = parseFloat(el.dataset.base ?? '0')
        el.style.transform = `rotate(${base + y * 0.04}deg)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={containerRef}
      id="global-star-field"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {placements.map((p, i) => (
        <div
          key={i}
          className="star-item"
          data-base={String(p.baseRotate)}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.baseRotate}deg)`,
          }}
        >
          <Image
            src={`/stars/${encodeURIComponent(starFiles[p.star])}`}
            alt=""
            width={p.size}
            height={p.size}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
      ))}
    </div>
  )
}
