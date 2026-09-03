import { Link } from 'react-router-dom'
import { FadeIn, ImageReveal } from './FadeIn'
import { aboutShort, site } from '../data/content'
import { siteImages } from '../data/siteImages'

export function Spotlight() {
  return (
    <section className="spotlight" id="home-spotlight">
      <div className="spotlight-grid">
        <ImageReveal className="spotlight-cell">
          <div className="spotlight-visual">
            <img src={siteImages.about.src} alt={siteImages.about.alt} />
            <div className="spotlight-corner-chip">
              <span className="spotlight-chip-dot" />
              <span>ESTABLISHED {site.established}</span>
            </div>
          </div>
        </ImageReveal>
        <FadeIn delay={0.15} className="spotlight-cell">
          <div className="spotlight-copy">
            <span className="section-badge-pill">COMPANY OVERVIEW</span>
            <p className="section-label">About Us</p>
            <h2 className="section-title">{site.shortName}</h2>
            <div className="accent-line" aria-hidden />
            <p className="about-quote">“{site.trustedLine}”</p>
            <p className="section-lead">{aboutShort}</p>
            <Link to="/about" className="text-link with-arrow">
              <span>Read more about us</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

