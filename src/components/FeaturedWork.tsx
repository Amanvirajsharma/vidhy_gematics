import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { services } from '../data/content'
import { siteImages } from '../data/siteImages'

const featured = [
  { service: services[0], image: siteImages.featured[0], tab: 'Land Survey' },
  { service: services[3], image: siteImages.featured[1], tab: 'Drone Mapping' },
  { service: services[6], image: siteImages.featured[2], tab: 'Track Survey' },
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
        {featured.map((item, i) => (
          <motion.button
            key={item.tab}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? 'is-active' : undefined}
            onClick={() => setIndex(i)}
            whileTap={{ scale: 0.96 }}
          >
            {item.tab}
          </motion.button>
        ))}
      </div>

      <div className="featured-stage">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.tab}
            className="featured-panel"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="featured-visual"
              initial={reduce ? false : { clipPath: 'inset(8% 8% 8% 8%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.9, ease }}
            >
              <img src={current.image.src} alt={current.image.alt} />
            </motion.div>
            <div className="featured-copy">
              <h3>{current.service.title}</h3>
              <p>{current.service.summary}</p>
              <Link to="/services" className="text-link">
                Read more
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
