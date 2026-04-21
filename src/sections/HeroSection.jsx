import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const chipRefs = useRef([])

  useEffect(() => {
    // Staggered entrance animation
    chipRefs.current.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        setTimeout(() => {
          el.style.transition = `opacity 0.7s ease ${i * 0.1 + 0.3}s, transform 0.7s ease ${i * 0.1 + 0.3}s`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, 100)
      }
    })
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        {/* LEFT: Text content */}
        <div className="hero-content">
          <div className="badge" ref={el => chipRefs.current[0] = el} style={{ marginBottom: '20px', display: 'inline-flex' }}>
            <span className="badge-dot" />
            Available for Opportunities
          </div>

          <h1 className="hero-name" ref={el => chipRefs.current[1] = el}>
            Shamita
            <span className="hero-name-sub">Rathinaraj</span>
          </h1>

          <p className="hero-role" ref={el => chipRefs.current[2] = el}>
            UI/UX Full-Stack Developer
            <span className="hero-role-dot" />
            Blockchain Developer
          </p>

          <p className="hero-tagline" ref={el => chipRefs.current[3] = el}>
            "Building intelligent, scalable,<br />
            and secure digital solutions"
          </p>

          <div className="hero-btns" ref={el => chipRefs.current[4] = el}>
            <a
              href="#projects"
              className="btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              🚀 Explore Projects
            </a>
            <a
              href="#contact"
              className="btn-outline"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Contact Me
            </a>
            <a href="https://github.com/shamita30" target="_blank" rel="noreferrer" className="btn-outline">
              GitHub ↗
            </a>
          </div>

          <div className="hero-stats" ref={el => chipRefs.current[5] = el}>
            {[
              { num: '4+', label: 'Internships' },
              { num: '3', label: 'Publications' },
              { num: '9.0', label: 'GPA' },
              { num: 'SIH', label: 'Finalist' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Avatar */}
        <div className="hero-visual">
          <div className="avatar-ring-wrap">
            {/* Spinning orbit ring SVG */}
            <svg className="avatar-ring-svg" viewBox="0 0 380 380" fill="none">
              <circle cx="190" cy="190" r="178" stroke="url(#ring-grad)" strokeWidth="1.5" strokeDasharray="12 8" opacity="0.6" />
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="380" y2="380" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff6eb4" />
                  <stop offset="0.33" stopColor="#a855f7" />
                  <stop offset="0.66" stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180
                const x = 190 + 178 * Math.cos(rad)
                const y = 190 + 178 * Math.sin(rad)
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 2 === 0 ? 4 : 2.5}
                    fill={['#ff6eb4','#a855f7','#06b6d4','#3b82f6','#f97316','#22d3ee'][i]}
                  />
                )
              })}
            </svg>

            {/* Second inner ring */}
            <svg
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                animation: 'ring-spin 8s linear infinite reverse',
              }}
              viewBox="0 0 380 380"
              fill="none"
            >
              <circle cx="190" cy="190" r="140" stroke="rgba(168,85,247,0.25)" strokeWidth="1" strokeDasharray="4 6" />
            </svg>

            {/* Glow */}
            <div className="avatar-glow" />

            {/* Avatar photo */}
            <img
              src="/avatar.png"
              alt="Shamita Rathinaraj"
              className="avatar-img"
            />
          </div>

          {/* Floating info chips */}
          <div
            className="floating-chip"
            style={{ top: '10%', right: '-10%', animationDelay: '0s', borderColor: 'rgba(168,85,247,0.3)' }}
          >
            <span style={{ color: 'var(--purple)', fontWeight: 600 }}>⚡</span> Blockchain Dev
          </div>
          <div
            className="floating-chip"
            style={{ bottom: '18%', left: '-8%', animationDelay: '1.5s', borderColor: 'rgba(6,182,212,0.3)' }}
          >
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>🎨</span> UI/UX Design
          </div>
          <div
            className="floating-chip"
            style={{ bottom: '5%', right: '0%', animationDelay: '0.8s', borderColor: 'rgba(249,115,22,0.3)' }}
          >
            <span style={{ color: 'var(--orange)', fontWeight: 600 }}>📍</span> Chennai, India
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.4,
          animation: 'float-bob 2s ease-in-out infinite',
        }}
      >
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Scroll to Explore
        </div>
        <div style={{ fontSize: '20px' }}>↓</div>
      </div>
    </section>
  )
}
