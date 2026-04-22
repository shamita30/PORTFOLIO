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

        <div className="skills-grid reveal">
          {SKILLS.map(({ image, title, color, tags }) => (
            <div
              key={title}
              className="skill-cat"
              style={{ '--cat-color': color, color }}
            >
              <div className="skill-cat-img-wrap" style={{ 
                width: '80px', height: '80px', marginBottom: '16px', borderRadius: '50%',
                boxShadow: `0 0 20px ${color}40`, overflow: 'hidden', padding: '2px', background: `${color}20` 
              }}>
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', animation: 'slow-revolve 12s linear infinite' }} />
              </div>
              <div className="skill-cat-title" style={{ color }}>{title}</div>
              <div className="skill-tags">
                {tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
