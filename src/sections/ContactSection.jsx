import { useState, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────
//  Python backend URL — set to your Render backend service URL
//  If the frontend and backend run on the same Render domain,
//  use a relative path like '/api/contact'
// ─────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/contact`
  : '/api/contact'         // relative path for same-origin deployment

export default function ContactSection() {
  const formRef = useRef(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')  // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, message } = form

    if (!name || !email || !message) {
      setErrMsg('Please fill in all fields.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrMsg('')

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else if (data.configure) {
        // Backend is deployed but Gmail credentials not set — fall back to mailto
        const mailto = `mailto:shami2230sr12@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + '\nReply to: ' + email)}`
        window.open(mailto, '_blank')
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setErrMsg(data.errors?.join(' ') || data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      // Network failure — fall back to mailto so user can still reach you
      const mailto = `mailto:shami2230sr12@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + '\nReply to: ' + email)}`
      window.open(mailto, '_blank')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    }

    if (status !== 'idle') {
      setTimeout(() => { setStatus('idle'); setErrMsg('') }, 6000)
    }
  }

  return (
    <section id="contact" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.05))' }}>
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Let's Connect</div>
          <h2 className="section-title reveal">
            Get In <span className="grad-pink">Touch</span>
          </h2>
          <p className="section-sub reveal" style={{ margin: '0 auto' }}>
            Have a project in mind, or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '28px',
            padding: '48px',
            backdropFilter: 'blur(20px)',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          <div className="contact-grid">
            {/* LEFT: Contact info */}
            <div className="contact-info">
              <h3 style={{ color: 'var(--text-primary)' }}>Say Hello 👋</h3>
              <p className="contact-tagline">
                Based in Chennai, India. Open to remote and on-site opportunities.
                Let's build something amazing together.
              </p>

              {[
                { icon: '✉️', label: 'shami2230sr12@gmail.com', href: 'mailto:shami2230sr12@gmail.com', color: 'rgba(214,0,127,0.15)' },
                { icon: '📞', label: '+91 9786619687', href: 'tel:+919786619687',  color: 'rgba(8,145,178,0.15)' },
                { icon: '⚡', label: 'github.com/shamita30',  href: 'https://github.com/shamita30', color: 'rgba(124,58,237,0.15)', target: '_blank' },
                { icon: '🌐', label: 'shamitaportfolio.netlify.app', href: 'https://shamitaportfolio.netlify.app/', color: 'rgba(234,88,12,0.15)', target: '_blank' },
                { icon: '💼', label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/shamita-rathinaraj-3a52b0275?utm_source=share_via&utm_content=profile&utm_medium=member_android', color: 'rgba(37,99,235,0.15)', target: '_blank' },
              ].map(({ icon, label, href, color, target }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                  target={target}
                  rel={target ? 'noreferrer' : undefined}
                >
                  <div className="contact-link-icon" style={{ background: color }}>{icon}</div>
                  <span>{label}</span>
                </a>
              ))}

              {/* Availability */}
              <div style={{
                marginTop: '24px',
                padding: '14px 18px',
                background: 'rgba(8,145,178,0.08)',
                border: '1px solid rgba(8,145,178,0.25)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--cyan)',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cyan)', animation: 'pulse-dot 1.5s ease-in-out infinite', flexShrink: 0 }} />
                Currently available for freelance &amp; internship opportunities
              </div>

              {/* Security badge */}
              <div style={{
                marginTop: '12px',
                padding: '10px 14px',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.18)',
                borderRadius: '10px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}>
                🔒 Messages are sent securely via Gmail API&nbsp;OAuth2
              </div>
            </div>

            {/* RIGHT: Form */}
            <div>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    maxLength={100}
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-control"
                    placeholder="Hi Shamita, I'd love to connect about..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    maxLength={3000}
                  />
                  <div style={{ fontSize: '11px', color: 'var(--text-disabled)', textAlign: 'right', marginTop: '4px' }}>
                    {form.message.length} / 3000
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? '⏳ Sending securely...' : '🔒 Send Message'}
                </button>
              </form>

              {status === 'success' && (
                <div className="submit-msg success">
                  ✓ Message sent! I'll get back to you soon 🚀
                </div>
              )}
              {status === 'error' && (
                <div className="submit-msg error">
                  ✕ {errMsg || 'Something went wrong. Please try again.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
