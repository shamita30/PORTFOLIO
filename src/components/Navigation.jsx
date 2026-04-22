export default function Navigation({ theme, toggleTheme, sound, setSound }) {
  const scrollTo = (id) => {
    if (window.__lenis) {
      const el = document.getElementById(id)
      if (el) window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero') }}>
        SR
      </a>
      <ul className="nav-links">
        {[
          ['about', 'About'],
          ['skills', 'Skills'],
          ['projects', 'Projects'],
          ['certificates', 'Certs'],
          ['leadership', 'Events'],
          ['experience', 'Experience'],
          ['contact', 'Contact'],
        ].map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={e => { e.preventDefault(); scrollTo(id) }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button 
          className="sound-btn" 
          title={sound ? 'Mute space ambient' : 'Play space ambient'}
          onClick={() => {
            const el = document.getElementById('bg-music')
            if (el) {
              // 0.2 volume to be gentle
              el.volume = 0.2
              if (sound) {
                el.pause()
                setSound(false)
              } else {
                // Firing synchronously in the user-click thread explicitly
                el.play().then(() => setSound(true)).catch(e => console.warn(e))
              }
            } else {
              setSound(!sound)
            }
          }}
        >
          {sound ? '🔊' : '🔇'}
        </button>
        <button className="nav-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀ Light' : '🌑 Dark'}
        </button>
        <a
          href="/shamita_resume.pdf"
          className="btn-primary"
          style={{ padding: '8px 18px', fontSize: '12px' }}
          download
        >
          Resume ↓
        </a>
      </div>
    </nav>
  )
}
