import { useRef, useState } from 'react'

const PROJECTS = [
  {
    num: '01',
    icon: '🔐',
    title: 'Biometric Attendance System',
    desc: 'Iris recognition + ID card integration with temperature sensor and CCTV connectivity. Optimized SQL schemas for real-time logging and retrieval. Reduced manual errors by 20%.',
    tags: ['Python', 'C++', 'SQL', 'Java', 'Embedded'],
    gradient: 'linear-gradient(135deg, rgba(255,110,180,0.25), rgba(168,85,247,0.25))',
    accent: '#ff6eb4',
    github: 'https://github.com/shamita30',
    highlight: '↓ Manual errors cut 20%',
    emoji: '🔐',
    bgColor: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(255,110,180,0.1) 100%)',
  },
  {
    num: '02',
    icon: '📱',
    title: 'QR-SAMS',
    desc: 'QR smartphone-based student attendance & management system. Reduced manual logging errors, improved data integrity, managed 100+ records. Published in a journal (2026).',
    tags: ['TypeScript', 'Firebase', 'Cloud', 'React Native'],
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.25))',
    accent: '#06b6d4',
    github: 'https://github.com/shamita30',
    highlight: '↑ 100+ records managed',
    emoji: '📱',
    bgColor: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.1) 100%)',
  },
  {
    num: '03',
    icon: '🎓',
    title: 'Online Learning Platform',
    desc: 'Full stack e-learning website with seamless user interaction and course management. Features clean UI, course navigation, and smooth experience across devices.',
    tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    gradient: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(234,179,8,0.25))',
    accent: '#f97316',
    github: 'https://github.com/shamita30',
    highlight: '✦ Full e-learning platform',
    emoji: '🎓',
    bgColor: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(168,85,247,0.1) 100%)',
  },
  {
    num: '04',
    icon: '✅',
    title: 'To-Do List Application',
    desc: 'Modern task tracker and to-do list application built with React Native, JSX, and Node.js. Features interactive UI and state management.',
    tags: ['React Native', 'JSX', 'Node.js'],
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(59,130,246,0.25))',
    accent: '#22d3ee',
    github: 'https://github.com/shamita30',
    highlight: '⚡ React Native + Node.js',
    emoji: '✅',
    bgColor: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.1) 100%)',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12
    setTilt({ x, y })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      className="project-card reveal"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease' : 'none',
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Project image placeholder */}
      <div className="project-img-wrap">
        <div
          className="project-placeholder-img"
          style={{ background: project.bgColor }}
        >
          <span style={{ fontSize: '64px' }}>{project.emoji}</span>
          <span>Upload project image via admin</span>
        </div>
        {/* Number overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontFamily: 'Syne, sans-serif',
          fontSize: '64px',
          fontWeight: 800,
          opacity: 0.08,
          lineHeight: 1,
          color: project.accent,
        }}>
          {project.num}
        </div>
        {/* Highlight badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          background: project.accent + '22',
          border: `1px solid ${project.accent}44`,
          color: project.accent,
          borderRadius: '10px',
          padding: '4px 12px',
          fontSize: '11px',
          fontWeight: 500,
          backdropFilter: 'blur(8px)',
        }}>
          {project.highlight}
        </div>
      </div>

      <div className="project-body">
        <div className="project-num">Project — {project.num}</div>
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.desc}</div>
      </div>

      <div className="project-footer">
        <div className="tech-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn">
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Work</div>
        <h2 className="section-title reveal">
          Featured <span className="grad-fire">Projects</span>
        </h2>
        <p className="section-sub reveal">
          Real-world solutions built with clean, scalable code — from biometric systems to blockchain platforms.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.num} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
