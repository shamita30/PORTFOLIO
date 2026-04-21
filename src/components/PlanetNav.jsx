export default function PlanetNav({ sections, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="planet-nav" aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          className={`planet-nav-dot ${activeSection === id ? 'active' : ''}`}
          onClick={() => scrollTo(id)}
          title={label}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && scrollTo(id)}
        >
          <span className="planet-nav-dot-label">{label}</span>
        </div>
      ))}
    </nav>
  )
}
