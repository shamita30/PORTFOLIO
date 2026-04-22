import { useState, useRef } from 'react'

const CERTIFICATES = [
  {
    id: 1,
    title: 'Biometric Integrated Attendance',
    org: 'Power Control & Computing Technologies \'25',
    image: '/certificates/power_control.jpg',
    color: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))',
  },
  {
    id: 2,
    title: 'Blockchain Applications',
    org: 'Value Added Course - SRM Valliammai',
    image: '/certificates/blockchain.jpg',
    color: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(255,110,180,0.2))',
  },
  {
    id: 3,
    title: 'NCEA-2023 Chemistry Applications',
    org: 'National Conference - SRM Valliammai',
    image: '/certificates/ncea.jpg',
    color: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))',
  },
  {
    id: 4,
    title: 'DRESTEIN \'24 Paper Presentation',
    org: 'Saveetha Engineering College',
    image: '/certificates/drestein.jpg',
    color: 'linear-gradient(135deg, rgba(255,110,180,0.2), rgba(249,115,22,0.2))',
  },
  {
    id: 5,
    title: 'BUGGY Technical Event',
    org: 'Vecoders Club - Information Technology',
    image: '/certificates/vecoders.jpg',
    color: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(59,130,246,0.2))',
  }
]

function CertModal({ cert, onClose }) {
  if (!cert) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(2,2,15,0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(7,7,26,0.95)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '800px', // Wider to accommodate landscape images better
          width: '100%',
          textAlign: 'center',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '24px',
            cursor: 'none',
          }}
        >
          ✕
        </button>
        
        <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', background: cert.color }}>
          <img 
            src={cert.image} 
            alt={cert.title} 
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '60vh', objectFit: 'contain' }} 
          />
        </div>
        
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
          {cert.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{cert.org}</p>
      </div>
    </div>
  )
}

function TiltCard({ cert, delay, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    
    setTilt({ x: rotateX, y: rotateY })
  }

  return (
    <div
      ref={cardRef}
      className="cert-card reveal"
      style={{
        cursor: 'none',
        transitionDelay: delay,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale(1.02)` 
          : 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
        zIndex: isHovered ? 10 : 1,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      <div className="cert-img-wrap" style={{ height: '220px', overflow: 'hidden' }}>
        <img 
          src={cert.image} 
          alt={cert.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div className="cert-body">
        <div className="cert-title">{cert.title}</div>
        <div className="cert-org">{cert.org}</div>
      </div>
      
      {/* 3D Glare effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255,255,255,0.15), transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        zIndex: 5,
        mixBlendMode: 'overlay',
      }} />
    </div>
  )
}

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(249,115,22,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Recognition</div>
        <h2 className="section-title reveal">
          Certifications &<br />
          <span className="grad-fire">Achievements</span>
        </h2>
        <p className="section-sub reveal">
          Continuous learning and participation across paper presentations, conferences, and technical events. Click any card to view fullscreen.
        </p>

        <div className="cert-grid">
          {CERTIFICATES.map((cert, i) => (
            <TiltCard 
              key={cert.id} 
              cert={cert} 
              delay={`${i * 0.05}s`} 
              onClick={() => setSelectedCert(cert)} 
            />
          ))}
        </div>

        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      </div>
    </section>
  )
}
