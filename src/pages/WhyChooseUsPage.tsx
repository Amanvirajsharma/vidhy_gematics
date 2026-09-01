import { PageBanner } from '../components/PageBanner'
import { Values } from '../components/Values'
import { FadeIn } from '../components/FadeIn'
import { CtaBand } from '../components/CtaBand'
import { healthSafety, site, whyChoosePoints } from '../data/content'

export function WhyChooseUsPage() {
  return (
    <>
      <PageBanner
        label="About Us"
        title="Why Choose Us"
        lead={`${site.tagline} — for Clients, Government Sectors, Consultants & Construction Companies.`}
      />

      <section className="section why-choose">
        <div className="container why-choose-grid">
          <FadeIn>
            <p className="section-label">Our promise</p>
            <h2 className="section-title">Built on trust & precision</h2>
            <div className="accent-line" aria-hidden />
            <p className="why-choose-tagline">“{site.trustedLine}”</p>
            <p className="why-choose-copy">
              Since {site.established}, {site.shortName} has delivered conscientious and
              reliable survey engineering across India — with more than{' '}
              {site.experienceYears} years of experience.
            </p>
            <ul className="why-choose-list">
              {whyChoosePoints.map((point, i) => (
                <li key={point}>
                  <span>{i + 1}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="why-choose-visual">
              <img
                src="/team/03.jpg"
                alt="Vidya Geomatics survey crew at project site"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <Values />

      <section className="section health-safety">
        <div className="container">
          <FadeIn>
            <p className="section-label">Health & safety</p>
            <h2 className="section-title">Everyone goes home safe</h2>
            <div className="accent-line" aria-hidden />
            <p className="section-lead">{healthSafety.intro}</p>
            <h3 className="health-safety-heading">{healthSafety.heading}</h3>
          </FadeIn>

          <div className="health-safety-grid">
            {healthSafety.items.map((item, i) => (
              <FadeIn key={item} delay={(i % 4) * 0.05}>
                <div className="health-safety-item">
                  <span aria-hidden>✓</span>
                  <p>{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
