'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// Varied widths — NOT uniform. Each image keeps its natural aspect ratio.
// All portrait so the wheel stays visually consistent (landscape pieces removed)
const artworks: { file: string; w: number }[] = [
  { file: 'IMG_6848.jpg', w: 180 },
  { file: 'IMG_6869.jpg', w: 220 },
  { file: 'IMG_6741.jpg', w: 190 },
  { file: 'IMG_6858.jpg', w: 210 },
  { file: 'IMG_6849.jpg', w: 230 },
  { file: 'IMG_6743.jpg', w: 200 },
  { file: 'IMG_6860.jpg', w: 240 },
  { file: 'IMG_6841.jpg', w: 190 },
  { file: 'IMG_6810.jpg', w: 230 },
  { file: 'IMG_6861.jpg', w: 200 },
  { file: 'IMG_6746.jpg', w: 180 },
  { file: 'IMG_6774.jpg', w: 220 },
  { file: 'IMG_6859.jpg', w: 190 },
]

const RADIUS = 470          // desktop cylinder radius
const STRETCH = 1.5         // desktop horizontal oval stretch
const SPIN_BASE = 0.055     // baseline degrees/frame (continuous, never stops)
const MAX_VEL = 0.7         // cap how fast a swipe can spin it
const clampVel = (v: number) => Math.max(-MAX_VEL, Math.min(MAX_VEL, v))

export default function SpinGallery() {
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const angle = useRef(0)
  const vel = useRef(SPIN_BASE)
  const paused = useRef(false)
  const axis = useRef<'x' | 'y'>('y')
  const step = 360 / artworks.length

  // Continuous rotation loop (JS-driven so swipe can speed it up)
  useEffect(() => {
    const setAxis = () => { axis.current = window.matchMedia('(max-width: 767px)').matches ? 'x' : 'y' }
    setAxis()
    window.addEventListener('resize', setAxis)

    let raf = 0
    const tick = () => {
      if (!paused.current) {
        // ease velocity back toward the baseline so a swipe gives a fading boost
        vel.current += (SPIN_BASE - vel.current) * 0.025
        angle.current += vel.current
      }
      const r = ringRef.current
      if (r) {
        r.style.transform = axis.current === 'x'
          ? `rotateX(${angle.current}deg)`
          : `rotateY(${angle.current}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', setAxis) }
  }, [])

  // Swipe / wheel to speed up + stop the page from scroll-reloading
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let last = 0, active = false

    const onTouchStart = (e: TouchEvent) => { last = e.touches[0].clientY; active = true }
    const onTouchMove = (e: TouchEvent) => {
      if (!active) return
      e.preventDefault()                       // block page scroll / pull-to-refresh
      const y = e.touches[0].clientY
      const dy = y - last
      last = y
      vel.current = clampVel(vel.current + (-dy) * 0.012)   // gentle swipe-to-speed
    }
    const onTouchEnd = () => { active = false }
    const onWheel = (e: WheelEvent) => { vel.current = clampVel(vel.current + (-e.deltaY) * 0.004) }
    const onEnter = () => { if (axis.current === 'y') paused.current = true }   // desktop hover-pause
    const onLeave = () => { paused.current = false }

    stage.addEventListener('touchstart', onTouchStart, { passive: true })
    stage.addEventListener('touchmove', onTouchMove, { passive: false })
    stage.addEventListener('touchend', onTouchEnd)
    stage.addEventListener('wheel', onWheel, { passive: true })
    stage.addEventListener('mouseenter', onEnter)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      stage.removeEventListener('touchstart', onTouchStart)
      stage.removeEventListener('touchmove', onTouchMove)
      stage.removeEventListener('touchend', onTouchEnd)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('mouseenter', onEnter)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        .fz-stage {
          width: 100%;
          height: clamp(460px, 74vh, 720px);
          background: transparent;
          overflow: hidden;
          position: relative;
          z-index: 1;
          perspective: 1500px;
          perspective-origin: 50% 50%;
          touch-action: none;
          --radius: ${RADIUS}px;
          --stretch: ${STRETCH};
          --ws: 1;
        }
        .fz-oval {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform: scaleX(var(--stretch));   /* horizontal oval (desktop) */
        }
        .fz-ring {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;              /* rotation driven by JS */
        }
        .fz-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: calc(var(--w) * var(--ws));
          margin-left: calc(var(--w) * var(--ws) / -2);
          backface-visibility: visible;        /* backs stay visible the whole way round */
          transform: translateY(-50%) rotateY(var(--a)) translateZ(var(--radius)) scaleX(calc(1 / var(--stretch))) scale(var(--s, 1));
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .fz-card img {
          display: block;
          width: 100%;
          height: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.10);
        }
        .fz-card:hover { --s: 1.18; z-index: 30; }

        /* ── Mobile (<768px): VERTICAL revolving cylinder ── */
        @media (max-width: 767px) {
          .fz-stage {
            height: clamp(560px, 86vh, 900px);
            perspective: 1400px;
            --radius: 500px;
            --stretch: 1;
            /* Smooth fade-in/out at top & bottom so cards enter cleanly (no hard cut) */
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%);
          }
          .fz-oval { transform: scaleY(var(--stretch)); }   /* vertical axis */
          .fz-card {
            width: 33vw;                       /* uniform width, natural height */
            margin-left: 0;
            backface-visibility: hidden;       /* gaps show transparent, not the back cards */
            transform: translate(-50%, -50%) rotateX(var(--a)) translateZ(var(--radius)) scaleY(calc(1 / var(--stretch))) scale(var(--s, 1));
          }
          /* natural aspect ratio — transparent, no white letterbox/outline */
          .fz-card img { width: 100%; height: auto; }
          .fz-card:hover { --s: 1; }
        }
      `}</style>

      <div className="fz-stage" ref={stageRef}>
        <div className="fz-oval">
          <div className="fz-ring" ref={ringRef}>
            {artworks.map((art, i) => (
              <Link
                key={art.file}
                href="/commission"
                className="fz-card"
                style={{
                  ['--w' as string]: `${art.w}px`,
                  ['--a' as string]: `${i * step}deg`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/artwork/${art.file}`} alt="" loading="lazy" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
