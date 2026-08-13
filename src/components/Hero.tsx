import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AboutSubnav } from './AboutSubnav'
import { heroSlides, site } from '../data/content'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [slide, setSlide] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [slide])

  const current = heroSlides[slide]

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-media">
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80"
          alt="Aerial terrain suitable for survey and mapping"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-topo" aria-hidden />
      </div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.h1
          className="hero-brand"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Vidya <em>Geomatics</em>
        </motion.h1>

        <div className="hero-slide-wrap" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.word}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <p className="hero-headline">{current.word}</p>
              <p className="hero-support">“{current.quote}”</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.metaDescription} · Est. {site.established} · {site.country}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/services" className="btn btn-primary">
            View services
          </Link>
          <Link to="/quotation" className="btn btn-ghost">
            Request quotation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutSubnav />
        </motion.div>

        <div className="hero-dots" role="tablist" aria-label="Hero highlights">
          {heroSlides.map((s, i) => (
            <button
              key={s.word}
              type="button"
              role="tab"
              aria-selected={i === slide}
              aria-label={s.word}
              className={i === slide ? 'active' : ''}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
