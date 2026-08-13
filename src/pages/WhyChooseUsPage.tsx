import { PageBanner } from '../components/PageBanner'
import { Values } from '../components/Values'
import { FadeIn } from '../components/FadeIn'
import { CtaBand } from '../components/CtaBand'
import { site, whyChoosePoints } from '../data/content'

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
      <CtaBand />
    </>
  )
}
