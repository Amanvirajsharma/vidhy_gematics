import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { services } from '../data/content'
import { siteImages } from '../data/siteImages'
import { Img } from './Img'

const featured = [
  {
    service: services.find((s) => s.title === 'Land Surveying and Mapping')!,
    image: siteImages.featured[0],
    tab: 'Land Survey',
    badge: 'Precision Geodetic Control',
  },
  {
    service: services.find((s) => s.title === 'Aerial / Drone Mapping')!,
    image: siteImages.featured[1],
    tab: 'Drone Mapping',
    badge: 'High-Res Orthomosaic & DEM',
  },
  {
    service: services.find((s) => s.title === 'Track Surveying')!,
    image: siteImages.featured[2],
    tab: 'Track Survey',
    badge: 'Railway Alignment & Clearance',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function FeaturedWork() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const current = featured[index]

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % featured.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [index])

  return (
    <section className="featured-work">
      <div className="featured-tabs" role="tablist">
        {featured.map((item, i) => {
          const isActive = i === index
          return (
            <motion.button
              key={item.tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`featured-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              whileTap={{ scale: 0.96 }}
            >
              {isActive && !reduce && (
                <motion.span
                  className="featured-tab-pill"
                  layoutId="activeFeaturedTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                />
              )}
              <span className="featured-tab-text">{item.tab}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="featured-stage">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.tab}
            className="featured-panel"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease }}
          >
            <motion.div
              className="featured-visual"
              initial={reduce ? false : { clipPath: 'inset(6% 6% 6% 6%)', scale: 0.98 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              transition={{ duration: 0.85, ease }}
            >
              <Img
                src={current.image.src}
                alt={current.image.alt}
                sizes="(min-width: 900px) 55vw, 100vw"
              />
              <span className="featured-visual-badge">{current.badge}</span>
            </motion.div>
            <div className="featured-copy">
              <span className="featured-kicker">FEATURED CAPABILITY</span>
              <h3>{current.service.title}</h3>
              <p>{current.service.summary}</p>
              <Link to="/services" className="text-link with-arrow">
                <span>Read more</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}

