import { Link } from 'react-router-dom'
import { PageBanner } from '../components/PageBanner'
import { FadeIn } from '../components/FadeIn'
import { CtaBand } from '../components/CtaBand'
import { rental, site, teamPhotos, teamUnits } from '../data/content'

function initials(title: string) {
  return title
    .split(/[\s/&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function OurTeamPage() {
  return (
    <>
      <PageBanner
        label="About Us"
        title="Our Team"
        lead="Meet the full-time professional staff behind Vidya Geomatics — land survey, laser scanning, drone mapping, tunnel and track surveying."
      />

      <section className="section team-page">
        <div className="container">
          <div className="team-intro-grid">
            <FadeIn>
              <div className="team-intro-visual">
                <img
                  src={teamPhotos[0].src}
                  alt={teamPhotos[0].alt}
                  loading="eager"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="section-label">People & capability</p>
              <h2 className="section-title">Professional survey teams</h2>
              <div className="accent-line" aria-hidden />
              <p className="section-lead">{rental.note}</p>
              <p className="team-intro-copy">{rental.intro}</p>
            </FadeIn>
          </div>

          <FadeIn>
            <p className="section-label">In the field</p>
            <h2 className="section-title">Our team at work</h2>
            <div className="accent-line" aria-hidden />
          </FadeIn>

          <div className="team-gallery">
            {teamPhotos.map((photo, i) => (
              <FadeIn key={photo.src} delay={(i % 3) * 0.05}>
                <figure>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </figure>
              </FadeIn>
            ))}
          </div>

          <div className="team-grid">
            {teamUnits.map((unit, i) => (
              <FadeIn key={unit.title} delay={i * 0.06}>
                <article className="team-card">
                  <span className="team-avatar">{initials(unit.title)}</span>
                  <h3>{unit.title}</h3>
                  <p>{unit.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12}>
            <div className="team-contact">
              <div>
                <h3>Reach the team</h3>
                <p>
                  Head office — {site.address.city}. {site.hours.days}, {site.hours.time} IST.
                </p>
              </div>
              <div className="team-contact-actions">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-outline">
                    {p.display}
                  </a>
                ))}
                <Link to="/contact" className="btn btn-ink">
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBand to="/rental" label="Hire survey teams" />
    </>
  )
}
