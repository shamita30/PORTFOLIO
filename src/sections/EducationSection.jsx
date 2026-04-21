export default function EducationSection() {
  return (
    <section id="education" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Academic</div>
        <h2 className="section-title reveal">
          Education
        </h2>

        <div className="edu-grid">
          <div className="edu-card reveal">
            <div className="edu-icon">🎓</div>
            <div className="edu-deg">B.Tech — Information Technology</div>
            <div className="edu-inst">SRM Valliammai Engineering College</div>
            <div className="edu-gpa">Bachelor of Technology, IT</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="gpa-badge">CGPA: 9.0</span>
              <span className="gpa-badge" style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.25)', color: 'var(--purple)' }}>
                Overall: 8.8
              </span>
            </div>
          </div>

          <div className="edu-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="edu-icon">🏫</div>
            <div className="edu-deg">Higher Secondary Education (FIITJEE)</div>
            <div className="edu-inst">Senthil Public School</div>
            <div className="edu-gpa">12th Standard HSLC</div>
            <span className="gpa-badge" style={{ background: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.25)', color: 'var(--orange)' }}>
              82%
            </span>
          </div>

          <div className="edu-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="edu-icon">🏫</div>
            <div className="edu-deg">Secondary Education</div>
            <div className="edu-inst">Senthil Public School</div>
            <div className="edu-gpa">10th Standard HSE</div>
            <span className="gpa-badge" style={{ background: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.25)', color: 'var(--cyan)' }}>
              87.4%
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
