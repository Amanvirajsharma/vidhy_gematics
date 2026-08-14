import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { heroSlides, site } from '../data/content'
import { siteImages } from '../data/siteImages'

const ease = [0.22, 1, 0.36, 1] as const
const heroImages = siteImages.hero

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [slide, setSlide] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroImages.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [])

  const quote = heroSlides[slide].quote
  const [lead, rest] = quote.includes(', ')
    ? [quote.split(', ')[0], quote.split(', ').slice(1).join(', ')]
    : [quote, '']

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-media">
        <motion.div className="hero-media-pan" style={{ y }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={heroImages[slide].src}
              src={heroImages[slide].src}
              alt={heroImages[slide].alt}
              fetchPriority="high"
              className="hero-slide-img"
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1.14 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2, ease },
                scale: { duration: 14, ease: 'linear' },
              }}
            />
          </AnimatePresence>
        </motion.div>
        <div className="hero-overlay" />
      </div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-kicker"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          {site.brand}
        </motion.p>
        <AnimatePresence mode="wait">
          <motion.h1
            key={quote}
            className="hero-brand"
            initial={reduce ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.85, ease }}
          >
            {lead}
            {rest ? <span className="is-accent">{rest}</span> : null}
          </motion.h1>
        </AnimatePresence>
        <motion.p
          className="hero-support"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          {site.trustedLine}
        </motion.p>
        <motion.div
          className="btn-row hero-actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65, ease }}
        >
          <Link to="/quotation" className="btn btn-primary">
            Get quotation
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact now
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#home-spotlight"
        className="hero-scroll"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Scroll
        <span className="hero-scroll-line" />
      </motion.a>
    </section>
  )
}
