import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { CylinderGallery } from '../components/CylinderGallery'
import { Spotlight } from '../components/Spotlight'
import { SectorsStrip } from '../components/SectorsStrip'
import { Stats } from '../components/Stats'
import { FeaturedWork } from '../components/FeaturedWork'
import { HomeCases } from '../components/HomeCases'
import { Values } from '../components/Values'
import { CtaBand } from '../components/CtaBand'
import { FadeIn, ImageReveal } from '../components/FadeIn'
import { aboutLong, site } from '../data/content'
import { siteImages } from '../data/siteImages'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <CylinderGallery />
      <Spotlight />
      <SectorsStrip />

      <section className="spotlight home-about" id="home-promise">
        <div className="spotlight-grid">
          <ImageReveal className="spotlight-cell">
            <div className="spotlight-visual">
              <img src={siteImages.promise.src} alt={siteImages.promise.alt} />
            </div>
          </ImageReveal>
          <FadeIn delay={0.15} className="spotlight-cell">
            <div className="spotlight-copy">
              <p className="section-label">Our Promise</p>
              <h2 className="section-title">{site.name}</h2>
              <p className="about-quote">“{site.trustedLine}”</p>
              <p className="section-lead">{aboutLong[2]}</p>
              <Link to="/about" className="text-link">
                Read more
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
