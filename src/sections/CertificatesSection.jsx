import { useState } from 'react'

const CERTIFICATES = [
  {
    id: 1,
    title: 'Spring Boot & Hibernate',
    org: 'Certification Course',
    color: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))',
    emoji: '☕',
  },
  {
    id: 2,
    title: 'Blockchain Application',
    org: 'Blockchain Certification',
    color: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(255,110,180,0.2))',
    emoji: '⛓️',
  },
  {
    id: 3,
    title: 'Paper Presentation',
    org: 'Academic Conference',
    color: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))',
    emoji: '📄',
  },
  {
    id: 4,
    title: 'UI/UX Design',
    org: 'Design Certification',
    color: 'linear-gradient(135deg, rgba(255,110,180,0.2), rgba(249,115,22,0.2))',
    emoji: '🎨',
  },
  {
    id: 5,
    title: 'Data Science & ML',
    org: 'ML Bootcamp',
    color: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(59,130,246,0.2))',
    emoji: '🤖',
  },
  {
    id: 6,
    title: 'Cloud Computing',
    org: 'Cloud Fundamentals',
    color: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))',
    emoji: '☁️',
  },
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
          maxWidth: '600px',
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
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>{cert.emoji}</div>
        <div style={{ background: cert.color, borderRadius: '16px', padding: '80px 20px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontFamily: 'Syne, sans-serif' }}>
            Certificate Preview
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Upload image via Admin Dashboard</div>
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
          {cert.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{cert.org}</p>
        <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(249,115,22,0.08)', border: '1px dashed rgba(249,115,22,0.3)', borderRadius: '12px', fontSize: '12px', color: 'rgba(249,115,22,0.7)' }}>
          📁 Add your certificate image to: <code style={{ color: 'var(--orange)' }}>/public/uploads/certificates/cert-{cert.id}.jpg</code>
        </div>
      </div>
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
          Continuous learning across blockchain, cloud, design, and development. Click any card to view fullscreen.
        </p>

        <div className="upload-hint-banner reveal">
          <span style={{ fontSize: '20px' }}>📸</span>
          <span>
            <strong>Upload Your Certificates:</strong> Add images to <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px' }}>/public/uploads/certificates/</code> and they'll appear here automatically
          </span>
        </div>

        <div className="cert-grid">
          {CERTIFICATES.map((cert, i) => (
            <div
              key={cert.id}
              className="cert-card reveal"
              style={{ cursor: 'none', transitionDelay: `${i * 0.05}s` }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-img-wrap">
                <div className="cert-placeholder" style={{ background: cert.color }}>
                  <span style={{ fontSize: '48px' }}>{cert.emoji}</span>
                  <span className="cert-placeholder-text">Click to view</span>
                </div>
              </div>
              <div className="cert-body">
                <div className="cert-title">{cert.title}</div>
                <div className="cert-org">{cert.org}</div>
                <div className="cert-upload-hint">📁 Add cert-{cert.id}.jpg to uploads/certificates/</div>
              </div>
            </div>
          ))}
        </div>

        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      </div>
    </section>
  )
}
