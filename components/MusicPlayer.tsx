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
          /* Compact rounded-square card: title on top, vinyl + play below */
          .music-player-box {
            top: 96px;
            right: 8px;
            left: auto;
            transform: none;
            flex-direction: column !important;
            align-items: center !important;
            gap: 7px !important;
            width: 132px;
            padding: 11px 10px !important;
            border-radius: 18px !important;
            white-space: normal !important;
            text-align: center;
          }
          .music-player-box .mp-text { order: -1; }              /* title/artist on top */
          .music-player-box .mp-text p { text-align: center; }
          .music-player-box .mp-vinyl { order: 0; }              /* vinyl = play control, below */
          .music-player-box .mp-progress { width: 104px !important; margin: 0 auto; }
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
        {/* Vinyl IS the play/pause control — click it to toggle */}
        <button
          className="mp-vinyl"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          style={{
            position: 'relative', width: '46px', height: '46px', flexShrink: 0,
            border: 'none', padding: 0, background: 'transparent',
            cursor: 'pointer', borderRadius: '50%', touchAction: 'manipulation',
          }}
        >
          <div
            className={playing ? 'vinyl-spinning' : ''}
            style={{ width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden' }}
          >
            <Image src="/music/vinyl.jpg" alt="" width={52} height={52}
              style={{ width: '46px', height: '46px', objectFit: 'cover', display: 'block' }} />
          </div>
          {/* Cover ring */}
          <div style={{ position: 'absolute', top: '11px', left: '11px', width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden' }}>
            <Image src="/music/cover.jpg" alt="" width={28} height={28}
              style={{ width: '24px', height: '24px', objectFit: 'cover', display: 'block' }} />
          </div>
          {/* White play / pause glyph in the centre */}
          <span style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {playing
              ? <svg width="8" height="9" viewBox="0 0 8 9"><rect x="0.5" width="2.4" height="9" rx="0.6" fill="#fff"/><rect x="5.1" width="2.4" height="9" rx="0.6" fill="#fff"/></svg>
              : <svg width="9" height="9" viewBox="0 0 9 9"><polygon points="1.5,0.5 8.5,4.5 1.5,8.5" fill="#fff"/></svg>}
          </span>
        </button>

        {/* Track info + progress */}
        <div className="mp-text" style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: '#12101A', margin: 0 }}>
            Meeting You Once
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#888', margin: '1px 0 4px' }}>
            Natanya
          </p>
          <div className="mp-progress" style={{ height: '2px', background: '#e8e4f0', borderRadius: '2px', width: '112px' }}>
            <div style={{ height: '100%', background: '#8C2257', borderRadius: '2px', width: `${progress * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>
    </>
  )
}
