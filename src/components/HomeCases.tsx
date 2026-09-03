import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { workSamples } from '../data/content'
import { siteImages } from '../data/siteImages'

const cases = [
  { photo: workSamples[0], title: workSamples[0].title, tag: 'Infrastructure' },
  { photo: workSamples[2], title: workSamples[2].title, tag: 'Railways' },
  { photo: siteImages.cases[2], title: 'Road and urban development survey', tag: 'Urban Planning' },
]

export function HomeCases() {
  return (
    <section className="home-cases">
      <div className="container">
        <FadeIn>
          <span className="section-badge-pill">CASE STUDIES & DELIVERABLES</span>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Deliverables from our recent work</h2>
        </FadeIn>
      </div>
      <div className="home-cases-grid">
        {cases.map((item, i) => (
          <FadeIn key={item.photo.src} delay={i * 0.1} y={36}>
            <Link to="/projects" className="home-case-card">
              <motion.img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="home-case-tag">{item.tag}</span>
              <span className="home-case-info">
                <em>DELIVERED WORK</em>
                <strong>{item.title}</strong>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
      <div className="container">
        <FadeIn delay={0.15}>
          <Link to="/projects" className="text-link with-arrow">
            <span>View all projects</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

