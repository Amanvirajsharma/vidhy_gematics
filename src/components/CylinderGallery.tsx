import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { siteImages } from '../data/siteImages'

const slides = [
  { title: 'Land Surveying and Mapping', short: 'Land Survey', image: siteImages.services[0] },
  { title: '3D Laser Scanning Services', short: '3D Scanning', image: siteImages.services[1] },
  { title: 'As-Built Survey', short: 'As-Built', image: siteImages.services[2] },
  { title: 'Aerial / Drone Mapping', short: 'Drone Mapping', image: siteImages.services[3] },
  { title: 'Geo Technical Investigation', short: 'Geotechnical', image: siteImages.services[4] },
  { title: 'Tunnel Survey', short: 'Tunnel Survey', image: siteImages.services[5] },
  { title: 'Track Surveying', short: 'Track Survey', image: siteImages.featured[2] },
  { title: 'Infrastructure Mapping', short: 'Infrastructure', image: siteImages.cases[0] },
]

export function CylinderGallery() {
  const reduce = useReducedMotion()
  const isReduce = !!reduce

  return (
    <section className="cyl-section" id="work-cylinder" aria-labelledby="cyl-heading">
      <div className="cyl-sticky">
        <div className="cyl-copy">
          <p className="section-label cyl-label">Field work</p>
          <h2 className="section-title cyl-title" id="cyl-heading">
            Sliding project showcase
          </h2>
        </div>

        <div className="cyl-stage">
          <div className="side-slider-mask">
            <div className={`side-slider-track${isReduce ? '' : ' is-animated'}`}>
              {[0, 1].map((group) => (
                <div className="side-slider-group" key={group} aria-hidden={group === 1}>
                  {slides.map((slide, i) => (
                    <Link
                      key={`${slide.short}-${group}`}
                      to="/services"
                      className="side-slide-card"
                      aria-label={`${slide.title} service details`}
                      tabIndex={group === 1 ? -1 : 0}
                    >
                      <img
                        src={slide.image.src}
                        alt={slide.image.alt}
                        loading={group === 0 && i < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <span className="cyl-card-shade" />
                      <span className="cyl-card-label">{slide.short}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cyl-caption">
          <p className="cyl-caption-title">Survey, mapping, scanning, and infrastructure work highlights</p>
          <Link to="/services" className="text-link cyl-link">
            View services
          </Link>
        </div>
      </div>
    </section>
  )
}
