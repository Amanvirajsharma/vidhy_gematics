import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { serviceCategories } from '../data/content'
import { siteImages } from '../data/siteImages'

const sectorImages = [
  siteImages.services[1],
  siteImages.services[0],
  siteImages.services[2],
  siteImages.services[4],
]

export function SectorsStrip() {
  const cards = serviceCategories.map((category, i) => ({
    title: category.title,
    image: sectorImages[i] ?? siteImages.services[0],
  }))

  return (
    <section className="sectors-strip" aria-labelledby="sectors-heading">
      <div className="container">
        <FadeIn>
          <p className="section-label">Services</p>
          <h2 className="section-title" id="sectors-heading">
            Want to see what services we provide?
          </h2>
        </FadeIn>
      </div>
      <div className="sectors-grid">
        {cards.map((card, i) => (
          <FadeIn key={card.title} delay={i * 0.08} className="sectors-cell" y={48}>
            <Link to="/services" className="sector-card">
              <motion.img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="sector-card-shade" />
              <span className="sector-card-copy">
                <strong>{card.title}</strong>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
