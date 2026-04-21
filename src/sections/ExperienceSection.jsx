const EXPERIENCE = [
  {
    role: 'Campus Ambassador',
    company: 'Wyntrix',
    date: '13th August 2025',
    desc: 'Executing campus-wide digital marketing campaigns, driving brand awareness and engagement among student communities. Connecting peers with technology opportunities.',
    color: 'linear-gradient(135deg, var(--pink), var(--orange))',
    dotStyle: { background: 'linear-gradient(135deg, var(--orange), var(--pink))', boxShadow: '0 0 16px var(--orange)' },
  },
  {
    role: 'Software Engineer Intern',
    company: 'Airport Authority of India',
    date: 'June 2025',
    desc: 'Worked as an Intern at AAI with network, server operations, Data centers and emergency system. Monitored large-scale infrastructure, demonstrating operational excellence in a high-stakes enterprise environment.',
    color: 'linear-gradient(135deg, var(--purple), var(--cyan))',
    dotStyle: { background: 'linear-gradient(135deg, var(--purple), var(--pink))', boxShadow: '0 0 16px var(--purple)' },
  },
  {
    role: 'Front-End Developer Intern',
    company: 'ANS Technology',
    date: 'January 2025 – February 2025',
    desc: 'Collaborated in developing a website for course management and user interaction. Translated UI/UX designs into functional, responsive code focusing on scalability and performance.',
    color: 'linear-gradient(135deg, var(--cyan), var(--blue))',
    dotStyle: { background: 'linear-gradient(135deg, var(--cyan), var(--blue))', boxShadow: '0 0 16px var(--cyan)' },
  },
  {
    role: 'UI/UX Designer',
    company: 'Cafe',
    date: 'October 2023',
    desc: 'Assisted in development of unique logos that reflected cafe value and personality. First professional design experience blending creativity with business branding requirements.',
    color: 'linear-gradient(135deg, var(--orange), var(--pink))',
    dotStyle: { background: 'linear-gradient(135deg, var(--pink), var(--orange))', boxShadow: '0 0 16px var(--pink)' },
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Career Journey</div>
        <h2 className="section-title reveal">
          Work <span className="grad-cyan">Experience</span>
        </h2>
        <p className="section-sub reveal">
          A journey of building, learning, and leading across enterprise, startup, and research environments.
        </p>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot" style={exp.dotStyle} />
              <div className="tl-card">
                <div className="tl-role">{exp.role}</div>
                <div className="tl-company" style={{ background: exp.color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {exp.company}
                </div>
                <div className="tl-date">{exp.date}</div>
                <div className="tl-desc">{exp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
