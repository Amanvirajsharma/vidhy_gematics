import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { heroSlides, site } from '../data/content'
import { siteImages } from '../data/siteImages'

const ease = [0.22, 1, 0.36, 1] as const
const heroImages = siteImages.hero
const SLIDE_DURATION = 7000

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
      setSlide((s) => (s + 1) % heroSlides.length)
    }, SLIDE_DURATION)
    return () => window.clearInterval(id)
  }, [slide])

  const currentSlide = heroSlides[slide % heroSlides.length]
  const image = heroImages[slide % heroImages.length]
  const quote = currentSlide.quote
  const [lead, rest] = quote.includes(', ')
    ? [quote.split(', ')[0], quote.split(', ').slice(1).join(', ')]
    : [quote, '']

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-media">
        <motion.div className="hero-media-pan" style={{ y }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={`${image.src}-${slide}`}
              src={image.src}
              alt={image.alt}
              fetchPriority="high"
              className="hero-slide-img"
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2, ease },
                scale: { duration: 12, ease: 'linear' },
              }}
            />
          </AnimatePresence>
        </motion.div>
        <div className="hero-overlay" />
        <div className="hero-lidar-line" aria-hidden />
        <div className="hero-grid-overlay" aria-hidden />
      </div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.div
          className="hero-badge-wrap"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <span className="hero-kicker">{site.brand}</span>
          <span className="hero-kicker-dot" />
          <span className="hero-kicker-sub">EST. {site.established}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={quote}
            className="hero-brand"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.85, ease }}
          >
            {currentSlide.leadLines ? (
              <>
                {currentSlide.leadLines.map((line, idx) => (
                  <span key={idx} className="hero-lead-line">
                    {line}
                  </span>
                ))}
                <span className="is-accent">{currentSlide.accent}</span>
              </>
            ) : (
              <>
                {lead}
                {rest ? <span className="is-accent">{rest}</span> : null}
              </>
            )}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          className="hero-support"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          {site.trustedLine}
        </motion.p>

        {/* Slide navigation controls */}
        <motion.div
          className="hero-slide-nav"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease }}
        >
          {heroSlides.map((s, idx) => (
            <button
              key={s.word}
              type="button"
              className={`hero-slide-dot ${slide === idx ? 'is-active' : ''}`}
              onClick={() => setSlide(idx)}
              aria-label={`Show slide ${idx + 1}: ${s.word}`}
            >
              <span className="hero-dot-label">0{idx + 1} {s.word}</span>
              <span className="hero-dot-bar">
                {slide === idx && !reduce ? (
                  <motion.span
                    className="hero-dot-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          className="btn-row hero-actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease }}
        >
          <Link to="/quotation" className="btn btn-primary btn-glow">
            <span>Get quotation</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact now
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work-cylinder"
        className="hero-scroll"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        aria-label="Scroll to explore showcase"
      >
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </motion.a>
    </section>
  )
}

