import React, { useRef, useState, useEffect } from 'react'
import profile from '../assets/yo.png'

export default function Hero() {
  const sceneRef = useRef(null)
  const heroRef = useRef(null)
    const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 })
  const [visible, setVisible] = useState(false)
  const [pointer, setPointer] = useState({ bx: 50, by: 50, nx: 50, ny: 50 })

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const handleLeave = () => setTilt({ rx: 0, ry: 0, s: 1 })
    el.addEventListener('mouseleave', handleLeave)
    return () => el.removeEventListener('mouseleave', handleLeave)
  }, [])

  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.2 })
    obs.observe(root)
    return () => obs.disconnect()
  }, [])

  function handleHeroMove(e){
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const bx = Math.round((x / rect.width) * 100)
    const by = Math.round((y / rect.height) * 100)
    const nx = Math.round((x / rect.width) * 100)
    const ny = Math.round((y / rect.height) * 100)
    setPointer({ bx, by, nx, ny })
  }

  function handleMove(e) {
    const el = sceneRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const ry = (px - 0.5) * 10
    const rx = (0.5 - py) * 10
    setTilt({ rx, ry, s: 1.02 })
  }

  function handleKey(e) {
  }

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
    ['--tilt-x']: `${tilt.ry * 1.6}px`,
    ['--tilt-y']: `${tilt.rx * 1.4}px`
  }

  const heroStyle = {
    ['--bg-x']: `${pointer.bx}%`,
    ['--bg-y']: `${pointer.by}%`,
    ['--name-x']: `${(pointer.nx - 50) * 0.6}px`,
    ['--name-y']: `${(pointer.ny - 50) * 0.35}px`,
    ['--role-y']: `${-70 - (pointer.ny - 50) * 0.4}%`
  }

  return (
    <header className={`hero ${visible ? 'is-visible' : ''}`} ref={heroRef} onMouseMove={handleHeroMove} style={heroStyle}>
      <div className="hero-bleed">
        <div className="hero-inner container">
          <div className="hero-side hero-left">
            <h2 className="role">designer</h2>
          </div>
          <div
            className="profile-scene"
            ref={sceneRef}
            onMouseMove={handleMove}
            style={tiltStyle}
          >
            <div className="profile-inner">
              <div className="profile-front">
                <img src={profile} alt="Kerin Gonzalez" className="profile-image" draggable={false} />
              </div>
            </div>
          </div>

          <div className="hero-name" aria-hidden="true">KERIN GONZALEZ</div>

          <div className="hero-side hero-right">
            <h2 className="role">&lt;coder&gt;</h2>
          </div>
        </div>
      </div>
        <div className="hero-separator" aria-hidden="true">
          <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(124,92,255,0.14)" />
                <stop offset="100%" stopColor="rgba(0,240,255,0.12)" />
              </linearGradient>
            </defs>
            
            <path d="M0,40 C360,10 1080,90 1440,40 L1440,120 L0,120 Z" fill="none" />
            <path d="M0,36 C360,6 1080,86 1440,36" fill="none" stroke="url(#g1)" strokeWidth="2" opacity="0.9" />
            <path className="glow" d="M0,36 C360,6 1080,86 1440,36" fill="none" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round" opacity="0.95" />
          </svg>
        </div>
    </header>
  )
}
