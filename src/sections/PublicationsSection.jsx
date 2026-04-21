const PUBLICATIONS = [
  {
    num: '01',
    title: 'Advancing the Next Wave Biocomputers Using Brain Organoids',
    venue: 'LimeLight — Vol.5, Issue 1',
    year: 'June 2024',
  },
  {
    num: '02',
    title: 'Synthetic Lifeforms: Robotics Meet Biological Design',
    venue: 'LimeLight — Vol.5, Issue 2',
    year: 'November 2024',
  },
  {
    num: '03',
    title: 'QR-SAMS: A QR-Based Student Attendance & Management System',
    venue: 'Journal of Technology — Vol.14, Issue 3',
    year: 'March 2026',
  },
]

export default function PublicationsSection() {
  return (
    <section id="publications" className="section-wrap" style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-tag">Research</div>
        <h2 className="section-title reveal">
          Publications
        </h2>
        <p className="section-sub reveal">
          Peer-reviewed research spanning biocomputing, synthetic biology, and smart attendance systems.
        </p>

        <div className="pub-list">
          {PUBLICATIONS.map((pub, i) => (
            <div key={pub.num} className="pub-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="pub-num">{pub.num}</div>
              <div>
                <div className="pub-title">{pub.title}</div>
                <div className="pub-venue">{pub.venue}</div>
                <span className="pub-year">{pub.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
