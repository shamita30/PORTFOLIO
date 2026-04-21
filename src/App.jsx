import { useEffect, useRef, useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import useGitHubStats from './hooks/useGitHubStats'
import SpaceCanvas from './components/SpaceCanvas'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import PlanetNav from './components/PlanetNav'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import CertificatesSection from './sections/CertificatesSection'
import LeadershipSection from './sections/LeadershipSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import AchievementsSection from './sections/AchievementsSection'
import PublicationsSection from './sections/PublicationsSection'
import ContactSection from './sections/ContactSection'

const SECTIONS = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'certificates', label: 'Certs' },
  { id: 'leadership',   label: 'Events' },
  { id: 'experience',   label: 'Experience' },
  { id: 'contact',      label: 'Contact' },
]

// ── Helper: resolve initial theme ───────────────────────────────
function getInitialTheme() {
  try {
    const stored = localStorage.getItem('sr-theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch {/* SSR / private browsing */ }
  // System preference
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

export default function App() {
  const [loaded,        setLoaded]        = useState(false)
  const [theme,         setTheme]         = useState(getInitialTheme)
  const [sound,         setSound]         = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollPct,     setScrollPct]     = useState(0)
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 })

  // ── GitHub Stats (drives 3D crystal in scene) ─────────────────
  const ghStats = useGitHubStats('shamita30')

  const cursorRef  = useRef(null)
  const ringRef    = useRef(null)
  const ringPos    = useRef({ x: 0, y: 0 })
  const audioRef   = useRef(null)
  const rafRef     = useRef(null)

  // ── Loading ─────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2400)
    return () => clearTimeout(t)
  }, [])

  // ── Apply theme to <html data-theme="..."> ─────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('sr-theme', theme) } catch {/* */ }
  }, [theme])

  // ── Listen for OS theme changes (only if user hasn't overridden) ─
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e) => {
      // Only auto-update if no stored preference
      try {
        if (!localStorage.getItem('sr-theme')) {
          setTheme(e.matches ? 'light' : 'dark')
        }
      } catch {
        setTheme(e.matches ? 'light' : 'dark')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ── Custom cursor ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX, y = e.clientY
      setMousePos({ x, y })
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px'
        cursorRef.current.style.top  = y + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    const animRing = () => {
      if (ringRef.current) {
        ringPos.current.x += (mousePos.x - ringPos.current.x) * 0.1
        ringPos.current.y += (mousePos.y - ringPos.current.y) * 0.1
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animRing)
    }
    rafRef.current = requestAnimationFrame(animRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [mousePos])

  // ── Cursor scale on hover ──────────────────────────────────────
  useEffect(() => {
    const selectors = 'a,button,.project-card,.skill-cat,.cert-card,.lead-card,.pub-item,.tl-card,.ach-card,.edu-card,.mini-card'
    const over = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width  = '20px'
        cursorRef.current.style.height = '20px'
        cursorRef.current.style.background = 'var(--purple)'
      }
    }
    const out = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width  = '12px'
        cursorRef.current.style.height = '12px'
        cursorRef.current.style.background = 'var(--pink)'
      }
    }
    const els = document.querySelectorAll(selectors)
    els.forEach(el => { el.addEventListener('mouseenter', over); el.addEventListener('mouseleave', out) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', over); el.removeEventListener('mouseleave', out) })
  })

  // ── Scroll progress + active section via Lenis ────────────────
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setScrollPct(pct)
      const sectionEls = document.querySelectorAll('section[id]')
      sectionEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(el.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Scroll reveal ──────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal, .tl-item').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  // ── Space ambient sound ────────────────────────────────────────
  useEffect(() => {
    if (sound) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const createDrone = (freq, gain) => {
        const osc = ctx.createOscillator()
        const g   = ctx.createGain()
        osc.frequency.value = freq
        osc.type = 'sine'
        g.gain.value = gain
        osc.connect(g); g.connect(ctx.destination); osc.start()
        return { osc, gain: g }
      }
      const drones = [
        createDrone(55,    0.03),
        createDrone(82.4,  0.02),
        createDrone(110,   0.015),
        createDrone(146.8, 0.01),
      ]
      audioRef.current = { ctx, drones }
    } else {
      if (audioRef.current) {
        audioRef.current.drones.forEach(d => { d.osc.stop(); d.osc.disconnect() })
        audioRef.current.ctx.close()
        audioRef.current = null
      }
    }
  }, [sound])

  // ── Toggle theme (stores user preference, overrides system) ───
  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('sr-theme', next) } catch {/* */ }
      return next
    })
  }

  return (
    <SmoothScroll>
      {/* Loading */}
      <LoadingScreen visible={!loaded} />

      {/* Custom cursor */}
      <div id="cursor"      ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef}   />
      <div id="noise" />

      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* 3D Christmas Background */}
      <SpaceCanvas mousePos={mousePos} loaded={loaded} theme={theme} ghStats={ghStats} />

      {/* Navigation */}
      <Navigation theme={theme} toggleTheme={toggleTheme} sound={sound} setSound={setSound} />

      {/* Side planet nav dots */}
      <PlanetNav sections={SECTIONS} activeSection={activeSection} />

      {/* Content sections */}
      <div className="sections-wrapper">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <LeadershipSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <PublicationsSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="footer">
        {/* GitHub Stats Badge */}
        {!ghStats.loading && (
          <div className="gh-stats-badge">
            <span>🎄 {ghStats.repos} repos</span>
            <span>⭐ {ghStats.stars} stars</span>
            <span>🔥 {ghStats.contributions} contributions</span>
          </div>
        )}
        <p>
          Designed &amp; built with{' '}
          <span style={{ color: 'var(--crimson, #dc2626)', WebkitTextFillColor: 'var(--crimson, #dc2626)' }}>♥</span>
          {' '}by <span>Shamita Rathinaraj</span> · Chennai, India
        </p>
        <div className="social-links">
          <a href="https://github.com/shamita30"             target="_blank" rel="noreferrer" className="social-link" title="GitHub">⚡</a>
          <a href="mailto:shami2230sr12@gmail.com"           className="social-link" title="Email">✉️</a>
          <a href="https://portfolio-st7f.onrender.com/"     target="_blank" rel="noreferrer" className="social-link" title="Portfolio">🌐</a>
          <a href="tel:+919786619687"                        className="social-link" title="Phone">📞</a>
        </div>
        <p style={{ marginTop: 12, fontSize: '11px', opacity: 0.4 }}>
          © 2025 Shamita Rathinaraj. All rights reserved.
        </p>
      </footer>
    </SmoothScroll>
  )
}
