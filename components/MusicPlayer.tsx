'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.currentTime / (audio.duration || 1))
    const onEnd  = () => { setPlaying(false); setProgress(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended',      onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended',      onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(err => console.warn('play failed:', err))
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/track.mp3" preload="auto" playsInline />

      <style>{`
        .music-player-box {
          position: absolute;
          top: 106px;
          right: calc(50% - 576px);
        }
        @media (max-width: 767px) {
          .music-player-box {
            top: 144px;
            right: 16px;
            left: auto;
            transform: scale(0.78);
            transform-origin: top right;
          }
        }
      `}</style>

      <div className="music-player-box" style={{
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        border: '2px solid #8C2257',
        borderRadius: '999px',
        padding: '5px 13px 5px 5px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        whiteSpace: 'nowrap',
      }}>
        {/* Vinyl wrapper — animate the DIV not the img */}
        <div style={{ position: 'relative', width: '42px', height: '42px', flexShrink: 0 }}>
          <div
            className={playing ? 'vinyl-spinning' : ''}
            style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden' }}
          >
            <Image
              src="/music/vinyl.jpg"
              alt="Vinyl"
              width={52}
              height={52}
              style={{ width: '42px', height: '42px', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Cover centred on vinyl */}
          <div style={{
            position: 'absolute',
            top: '10px', left: '10px',
            width: '23px', height: '23px',
            borderRadius: '50%', overflow: 'hidden', zIndex: 2,
          }}>
            <Image
              src="/music/cover.jpg"
              alt="Cover"
              width={28}
              height={28}
              style={{ width: '23px', height: '23px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Track info + progress */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#12101A', margin: 0 }}>
            Meeting You Once
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#888', margin: '1px 0 4px' }}>
            Natanya
          </p>
          <div style={{ height: '2px', background: '#e8e4f0', borderRadius: '2px', width: '112px' }}>
            <div style={{ height: '100%', background: '#8C2257', borderRadius: '2px', width: `${progress * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Play/Pause */}
        <button
          onClick={toggle}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: '#8C2257', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '14px', flexShrink: 0,
            touchAction: 'manipulation',
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </>
  )
}
