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
          </div>
        </ImageReveal>
        <FadeIn delay={0.15} className="spotlight-cell">
          <div className="spotlight-copy">
            <p className="section-label">About Us</p>
            <h2 className="section-title">{site.shortName}</h2>
            <p className="about-quote">“{site.trustedLine}”</p>
            <p className="section-lead">{aboutShort}</p>
            <Link to="/about" className="text-link">
              Read more
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
