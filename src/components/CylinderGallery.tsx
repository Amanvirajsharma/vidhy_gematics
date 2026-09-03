import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { siteImages } from '../data/siteImages'
import { Img } from './Img'

const slides = [
  { title: 'Land Surveying and Mapping', short: 'Land Survey', tag: 'Topographic', image: siteImages.services[0] },
  { title: '3D Laser Scanning Services', short: '3D Scanning', tag: 'Point Cloud', image: siteImages.services[1] },
  { title: 'As-Built Survey', short: 'As-Built', tag: 'Construction', image: siteImages.services[2] },
  { title: 'Aerial / Drone Mapping', short: 'Drone Mapping', tag: 'UAV Survey', image: siteImages.services[3] },
  { title: 'Geo Technical Investigation', short: 'Geotechnical', tag: 'Soil & Rock', image: siteImages.services[4] },
  { title: 'Tunnel Survey', short: 'Tunnel Survey', tag: 'Underground', image: siteImages.services[5] },
  { title: 'Track Surveying', short: 'Track Survey', tag: 'Railways', image: siteImages.featured[2] },
  { title: 'Infrastructure Mapping', short: 'Infrastructure', tag: 'Highways', image: siteImages.cases[0] },
]

export function CylinderGallery() {
  const reduce = useReducedMotion()
  const isReduce = !!reduce

  return (
    <section className="cyl-section" id="work-cylinder" aria-labelledby="cyl-heading">
      <div className="cyl-sticky">
        <div className="cyl-copy">
          <span className="section-badge-pill">FIELD DELIVERABLES</span>
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
                      <Img
                        src={slide.image.src}
                        alt={slide.image.alt}
                        sizes="(min-width: 900px) 30vw, 70vw"
                        loading={group === 0 && i < 2 ? 'eager' : 'lazy'}
                      />
                      <span className="cyl-card-shade" />
                      <span className="cyl-card-tag">{slide.tag}</span>
                      <div className="cyl-card-info">
                        <span className="cyl-card-label">{slide.short}</span>
                        <span className="cyl-card-arrow">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cyl-caption">
          <p className="cyl-caption-title">Survey, mapping, scanning, and infrastructure work highlights</p>
          <Link to="/services" className="text-link cyl-link with-arrow">
            <span>View services</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

