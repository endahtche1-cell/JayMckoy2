'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnd = () => setPlaying(false)
    audio.addEventListener('ended', onEnd)
    return () => audio.removeEventListener('ended', onEnd)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(err => console.warn('play failed:', err))
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/track.mp3" preload="auto" playsInline />

      <style>{`
        .mp-vinyl-btn {
          position: absolute;
          top: 104px;
          /* right edge aligns with the nav's right edge (the O of STUDIO) */
          right: max(24px, calc(50% - 576px));
          z-index: 60;
        }
        @media (max-width: 767px) {
          .mp-vinyl-btn { top: 92px; right: 14px; }
        }
      `}</style>

      <button
        className="mp-vinyl-btn vinyl-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Play'}
        style={{
          width: '72px', height: '72px', borderRadius: '50%',
          border: 'none', padding: 0, background: 'transparent',
          cursor: 'pointer', touchAction: 'manipulation',
        }}
      >
        {/* Spinning vinyl */}
        <div
          className={playing ? 'vinyl-spinning' : ''}
          style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden' }}
        >
          <Image src="/music/vinyl.jpg" alt="" width={80} height={80}
            style={{ width: '72px', height: '72px', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Natanya cover in the centre */}
        <div style={{ position: 'absolute', top: '23px', left: '23px', width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden' }}>
          <Image src="/music/cover.jpg" alt="" width={40} height={40}
            style={{ width: '26px', height: '26px', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* White play / pause glyph */}
        <span style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {playing
            ? <svg width="9" height="10" viewBox="0 0 9 10"><rect x="0.5" width="2.7" height="10" rx="0.7" fill="#fff"/><rect x="5.8" width="2.7" height="10" rx="0.7" fill="#fff"/></svg>
            : <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="2,0.5 9,5 2,9.5" fill="#fff"/></svg>}
        </span>
      </button>
    </>
  )
}
