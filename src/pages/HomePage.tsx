import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ScrollBridge } from '../components/ScrollBridge'
import { CylinderGallery } from '../components/CylinderGallery'
import { Spotlight } from '../components/Spotlight'
import { SectorsStrip } from '../components/SectorsStrip'
import { Stats } from '../components/Stats'
import { FeaturedWork } from '../components/FeaturedWork'
import { HomeCases } from '../components/HomeCases'
import { Values } from '../components/Values'
import { CtaBand } from '../components/CtaBand'
import { FadeIn, ImageReveal } from '../components/FadeIn'
import { Img } from '../components/Img'
import { aboutLong, site } from '../data/content'
import { siteImages } from '../data/siteImages'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <ScrollBridge />
      <CylinderGallery />
      <Spotlight />
      <SectorsStrip />

      <section className="spotlight home-about" id="home-promise">
        <div className="spotlight-grid">
          <ImageReveal className="spotlight-cell">
            <div className="spotlight-visual">
              <Img
                src={siteImages.promise.src}
                alt={siteImages.promise.alt}
                sizes="(min-width: 900px) 50vw, 100vw"
              />
              <div className="spotlight-corner-chip">
                <span className="spotlight-chip-dot" />
                <span>EXPERIENCE {site.experienceYears} YEARS</span>
              </div>
            </div>
          </ImageReveal>
          <FadeIn delay={0.15} className="spotlight-cell">
            <div className="spotlight-copy">
              <span className="section-badge-pill">OUR COMMITMENT</span>
              <p className="section-label">Our Promise</p>
              <h2 className="section-title">{site.name}</h2>
              <div className="accent-line" aria-hidden />
              <p className="about-quote">“{site.trustedLine}”</p>
              <p className="section-lead">{aboutLong[2]}</p>
              <Link to="/about" className="text-link with-arrow">
                <span>Read more about our work</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Values />
      <Stats />
      <FeaturedWork />
      <HomeCases />
      <CtaBand to="/contact" label="Contact now" />
    </div>
  )
}

