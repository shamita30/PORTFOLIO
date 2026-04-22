const EVENTS = [
  {
    id: 1,
    icon: '🧑‍💻', // SIH Team Lead avatar
    title: 'SIH 2024 — Team Lead',
    sub: 'Smart India Hackathon Finalist. Led team to develop cryptocurrency transaction solutions.',
    color: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(255,110,180,0.2))',
    accent: '#a855f7',
  },
  {
    id: 2,
    icon: '👩‍💼', // Symposium Secretary avatar
    title: 'Symposium Secretary',
    sub: 'Collaborated with creative ideas for college event planning as an executive and organized events.',
    color: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.2))',
    accent: '#06b6d4',
  },
  {
    id: 3,
    icon: '👩‍🎤', // MUN Press avatar
    title: 'MUN — International Press',
    sub: 'Served as International Press in MUN club, covering global affairs and diplomatic discussions.',
    color: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(255,110,180,0.2))',
    accent: '#f97316',
  },
  {
    id: 4,
    icon: '👩‍🏫', // National Conference Coordinator avatar
    title: 'National Conference 2025',
    sub: 'Student Co-Ordinator for National conference 2025, managing sessions and participants.',
    color: 'linear-gradient(135deg, rgba(255,110,180,0.25), rgba(168,85,247,0.2))',
    accent: '#ff6eb4',
  },
  {
    id: 5,
    icon: '👩‍🎓', // Best Student avatar
    title: 'Best Student Award',
    sub: 'Recognized as Best Student by the institution for outstanding academic and extracurricular performance.',
    color: 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(6,182,212,0.2))',
    accent: '#22d3ee',
  },
  {
    id: 6,
    icon: '🥷', // Chess participant avatar
    title: 'Chess Tournament Participant',
    sub: 'Competitive chess player, representing the college in inter-college chess tournaments.',
    color: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.2))',
    accent: '#3b82f6',
  },
]

export default function LeadershipSection() {
  return (
    <section id="leadership" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,110,180,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Impact</div>
        <h2 className="section-title reveal">
          Leadership &{' '}
          <span className="grad-pink">Events</span>
        </h2>
        <p className="section-sub reveal">
          Beyond code — leading teams, organizing events, and making an impact in the community.
        </p>



        <div className="lead-grid">
          {EVENTS.map((event, i) => (
            <div key={event.id} className="lead-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              {/* Photo placeholder / real photo */}
              <div className="lead-photo-wrap">
                <div className="lead-placeholder" style={{ background: event.color }}>
                  <span style={{ fontSize: '64px', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))' }}>{event.icon}</span>
                </div>
                {/* Glow border */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${event.accent}, transparent)`,
                }} />
              </div>
              <div className="lead-body">
                <div className="lead-title">{event.title}</div>
                <div className="lead-sub">{event.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
