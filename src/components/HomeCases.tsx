import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { services } from '../data/content'
import { siteImages } from '../data/siteImages'

const cases = [
  { photo: siteImages.cases[0], service: services[1] },
  { photo: siteImages.cases[1], service: services[4] },
  { photo: siteImages.cases[2], service: services[5] },
]

export function HomeCases() {
  return (
    <section className="home-cases">
      <div className="container">
        <FadeIn>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Want to see what services we provide?</h2>
        </FadeIn>
      </div>
      <div className="home-cases-grid">
        {cases.map((item, i) => (
          <FadeIn key={item.photo.src} delay={i * 0.1} y={50}>
            <Link to="/services" className="home-case-card">
              <motion.img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <span>
                <strong>{item.service.title}</strong>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
      <div className="container">
        <FadeIn delay={0.15}>
          <Link to="/services" className="text-link">
            View more
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
