import { useRef, useEffect } from 'react'

const SKILLS = [
  {
    image: '/skills/languages.png',
    title: 'Languages',
    color: 'var(--pink)',
    tags: ['C', 'C++', 'Java', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Solidity'],
  },
  {
    image: '/skills/frameworks.png',
    title: 'Frameworks',
    color: 'var(--purple)',
    tags: ['Spring Boot', 'Hibernate', 'Node.js', 'React', 'TypeScript'],
  },
  {
    image: '/skills/tools.png',
    title: 'Tools & Platforms',
    color: 'var(--cyan)',
    tags: ['Figma', 'Blender', 'Firebase', 'Git', 'GitHub', 'MySQL', 'PowerPoint'],
  },
  {
    image: '/skills/iot.png',
    title: 'Embedded & IoT',
    color: 'var(--orange)',
    tags: ['Arduino', 'ESP32', 'NodeMCU', 'Embedded C'],
  },
  {
    image: '/skills/blockchain.png',
    title: 'Blockchain',
    color: 'var(--blue)',
    tags: ['Solidity', 'Smart Contracts', 'DApps', 'Cryptocurrency'],
  },
  {
    image: '/skills/soft_skills.png',
    title: 'Soft Skills',
    color: 'var(--pink)',
    tags: ['Leadership', 'Teamwork', 'Public Speaking', 'Problem Solving', 'Positive Influence'],
  },
  {
    image: '/skills/cs.png',
    title: 'CS Fundamentals',
    color: 'var(--cyan)',
    tags: ['DSA', 'OOP', 'OS', 'Computer Networks', 'Data Science', 'ML Basics'],
  },
]

// Mini radial orbit visualization
function OrbitRings() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let t = 0

    const skills = [
      { label: 'React', r: 60, speed: 0.8, color: '#06b6d4' },
      { label: 'Solidity', r: 90, speed: -0.5, color: '#a855f7' },
      { label: 'Python', r: 120, speed: 0.4, color: '#ff6eb4' },
      { label: 'Three.js', r: 150, speed: -0.3, color: '#f97316' },
      { label: 'Firebase', r: 50, speed: 1.1, color: '#3b82f6' },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      // Ring tracks
      skills.forEach(s => {
        ctx.beginPath()
        ctx.arc(cx, cy, s.r, 0, Math.PI * 2)
        ctx.strokeStyle = s.color + '20'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40)
      grad.addColorStop(0, 'rgba(168,85,247,0.6)')
      grad.addColorStop(1, 'rgba(168,85,247,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 40, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = '#a855f7'
      ctx.fill()

      // Center label
      ctx.font = 'bold 9px Syne, sans-serif'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('SR', cx, cy)

      // Orbiting skill dots
      skills.forEach(s => {
        const angle = t * s.speed
        const x = cx + Math.cos(angle) * s.r
        const y = cy + Math.sin(angle) * s.r

        // Glow
        const dotGrad = ctx.createRadialGradient(x, y, 0, x, y, 14)
        dotGrad.addColorStop(0, s.color + 'aa')
        dotGrad.addColorStop(1, s.color + '00')
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fillStyle = dotGrad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.fill()

        ctx.font = '9px DM Sans, sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.75)'
        ctx.textAlign = 'center'
        ctx.fillText(s.label, x, y + 16)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={320}
      style={{
        width: '100%',
        maxWidth: '320px',
        margin: '0 auto',
        display: 'block',
        opacity: 0.9,
      }}
    />
  )
}

function SkillOrbitSystem({ skill }) {
  const { image, title, color, tags } = skill;
  const radius = window.innerWidth < 600 ? 100 : 130; 
  
  return (
    <div className="skill-orbit-system" style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto 40px' }}>
      {/* Orbit ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: `${radius * 2}px`, height: `${radius * 2}px`, 
        border: `1px dashed ${color}50`, borderRadius: '50%'
      }} />

      {/* Central image */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden',
        boxShadow: `0 0 40px ${color}60`, border: `2px solid ${color}`,
        zIndex: 10
      }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Orbiting tags container */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 0, height: 0,
        animation: 'orbit-spin 25s linear infinite',
      }}>
        {tags.map((tag, i) => {
          const angle = (i / tags.length) * 360;
          return (
            <div key={tag} style={{
              position: 'absolute',
              transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
            }}>
              {/* Counter-spin so the text stays upright relative to the screen */}
              <div style={{ animation: 'orbit-counter-spin 25s linear infinite' }}>
                <div className="skill-tag" style={{
                  transform: 'translate(-50%, -50%)', // center exactly on orbital point
                  background: 'rgba(7,7,26,0.9)',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 0 15px ${color}30`,
                  border: `1px solid ${color}80`,
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '11px',
                  padding: '6px 12px'
                }}>
                  {tag}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Title */}
      <div style={{
        position: 'absolute', bottom: '0', width: '100%', textAlign: 'center',
        fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 800, color,
        textShadow: `0 0 10px ${color}`,
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        {title}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,110,180,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Galaxy of Expertise</div>
        <h2 className="section-title reveal">
          Skills &{' '}
          <span className="grad-pink">Tech Stack</span>
        </h2>
        <p className="section-sub reveal">
          A broad range of technologies orbiting my core expertise in full-stack, blockchain, and embedded systems.
        </p>

        {/* Orbit visualization */}
        <div className="reveal" style={{ marginBottom: '48px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(7,7,26,0.6)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '28px',
            display: 'inline-block',
          }}>
            <OrbitRings />
          </div>
        </div>

        <div className="skills-grid reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {SKILLS.map((skill) => (
            <SkillOrbitSystem key={skill.title} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
