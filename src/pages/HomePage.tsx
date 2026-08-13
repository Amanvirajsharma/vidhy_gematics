import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Stats } from '../components/Stats'
import { CtaBand } from '../components/CtaBand'
import { FadeIn } from '../components/FadeIn'
import { aboutShort, services, site } from '../data/content'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />

      <section className="section about home-about">
        <div className="container about-grid">
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
            <FadeIn delay={0.1}>
              <p className="section-label">About Us</p>
              <h2 className="section-title">{site.shortName}</h2>
              <p className="about-quote">“{site.trustedLine}”</p>
              <p>{aboutShort}</p>
              <div className="btn-row">
                <Link to="/about" className="btn btn-ink">
                  Show more
                </Link>
                <Link to="/services" className="btn btn-outline">
                  Our services
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Stats />

      <section className="section home-services">
        <div className="container">
          <div className="home-services-head">
            <FadeIn>
              <p className="section-label">What we do</p>
              <h2 className="section-title">Core survey services</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Link to="/services" className="btn btn-outline">
                View all services
              </Link>
            </FadeIn>
          </div>

          <div className="home-services-grid">
            {services.slice(0, 4).map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.06}>
                <Link to="/services" className="home-service-card">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
