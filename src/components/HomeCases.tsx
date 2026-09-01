import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { workSamples } from '../data/content'
import { siteImages } from '../data/siteImages'

const cases = [
  { photo: workSamples[0], title: workSamples[0].title },
  { photo: workSamples[2], title: workSamples[2].title },
  { photo: siteImages.cases[2], title: 'Road and urban development survey' },
]

export function HomeCases() {
  return (
    <section className="home-cases">
      <div className="container">
        <FadeIn>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Deliverables from our recent work</h2>
        </FadeIn>
      </div>
      <div className="home-cases-grid">
        {cases.map((item, i) => (
          <FadeIn key={item.photo.src} delay={i * 0.1} y={50}>
            <Link to="/projects" className="home-case-card">
              <motion.img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <span>
                <strong>{item.title}</strong>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
      <div className="container">
        <FadeIn delay={0.15}>
          <Link to="/projects" className="text-link">
            View more
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
