import { FadeIn } from './FadeIn'
import { aboutLong, aboutShort, mission, site, stats, vision } from '../data/content'

export function About() {
  return (
    <section className="section about about-page">
      <div className="container">
        <div className="about-grid">
          <FadeIn>
            <div className="about-visual">
              <img
                src="/team/01.jpg"
                alt="Vidya Geomatics survey team on site"
                loading="lazy"
              />
              <div className="about-badge">
                Est. {site.established}
                <span>{site.address.city}</span>
              </div>
            </div>
          </FadeIn>

          <div className="about-copy">
            <FadeIn delay={0.08}>
              <p className="section-label">Our Company</p>
              <h2 className="section-title">{site.shortName}</h2>
              <div className="accent-line" aria-hidden />
              <p className="about-quote">“{site.trustedLine}”</p>
              <p>{aboutShort}</p>
              {aboutLong.slice(1).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </FadeIn>
          </div>
        </div>

        <div className="about-highlights">
          {stats.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.06}>
              <article className="about-highlight">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mission-grid">
          <FadeIn delay={0.1}>
            <article className="mission-card">
              <p className="section-label">Purpose</p>
              <h3>Our Mission</h3>
              <div className="accent-line" aria-hidden />
              <p>{mission}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.16}>
            <article className="mission-card">
              <p className="section-label">Direction</p>
              <h3>Our Vision</h3>
              <div className="accent-line" aria-hidden />
              <p>{vision}</p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
