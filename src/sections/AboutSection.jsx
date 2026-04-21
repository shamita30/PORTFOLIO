export default function AboutSection() {
  return (
    <section id="about" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.03), transparent)' }}>
      <div className="section-inner reveal">
        <div className="section-tag">Who I Am</div>
        <h2 className="section-title">
          Passionate Builder &<br />
          <span className="grad-cyan">Published Researcher</span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a UI/UX Full-Stack Developer and Blockchain enthusiast based in Chennai, India.
              Currently pursuing B.Tech in Information Technology at SRM Valliammai Engineering College
              with a strong CGPA of 9.0.
            </p>
            <p>
              My expertise spans Full Stack Development, Blockchain (Solidity &amp; Smart Contracts),
              Cloud Integration, and IoT Embedded Systems. I've interned at the Airport Authority of India,
              ANS Technology, and Wyntrix — building real-world enterprise solutions.
            </p>
            <p>
              I'm a published researcher with 3 papers covering biocomputing, synthetic biology,
              and attendance management systems. An SIH 2024 Finalist, Best Student awardee,
              and active MUN International Press member.
            </p>
            <div className="about-pills">
              {['Chennai, India', 'SRM Valliammai EC', 'B.Tech IT', 'CGPA 9.0', 'Open to Opportunities', 'Remote / On-site'].map(p => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>

          <div className="about-cards">
            {[
              { icon: '🧠', title: 'Full Stack', sub: 'End-to-end web solutions with React, Node.js & Spring Boot' },
              { icon: '⛓️', title: 'Blockchain', sub: 'Smart contracts & DApps using Solidity' },
              { icon: '☁️', title: 'Cloud & IoT', sub: 'Firebase, ESP32 & embedded systems' },
              { icon: '📝', title: 'Research', sub: 'Published in 3 peer-reviewed journals' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="mini-card">
                <div className="mini-card-icon">{icon}</div>
                <div className="mini-card-title">{title}</div>
                <div className="mini-card-sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
