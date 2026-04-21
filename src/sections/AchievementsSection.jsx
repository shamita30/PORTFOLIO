const ACHIEVEMENTS = [
  { emoji: '🏆', title: 'SIH 2024 Finalist', sub: 'Smart India Hackathon — Crypto transaction solutions' },
  { emoji: '⭐', title: 'Best Student Award', sub: 'Recognized as Best Student by institution' },
  { emoji: '💡', title: 'Debugging Champion', sub: 'Competitive coding — Debugging competitions' },
  { emoji: '🎤', title: 'Speech Competition', sub: 'Winner at college speech competitions' },
  { emoji: '✍️', title: 'Writing Competition', sub: 'Academic writing and essay competitions' },
  { emoji: '♟️', title: 'Chess Tournament', sub: 'Competitive chess tournament participant' },
]

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Highlights</div>
        <h2 className="section-title reveal">
          Achievements
        </h2>

        <div className="ach-grid">
          {ACHIEVEMENTS.map(({ emoji, title, sub }, i) => (
            <div key={title} className="ach-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <span className="ach-emoji">{emoji}</span>
              <div className="ach-title">{title}</div>
              <div className="ach-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
