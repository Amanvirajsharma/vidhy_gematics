import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { site, sustainabilityText, values } from '../data/content'

export function Values() {
  return (
    <section className="section values">
      <div className="container">
        <FadeIn>
          <div className="values-header">
            <span className="section-badge-pill">CORE VALUES & PRINCIPLES</span>
            <p className="section-label">Why Vidya Geomatics</p>
            <h2 className="section-title">{site.tagline}</h2>
          </div>
        </FadeIn>

        <div className="values-grid">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.08}>
              <motion.article
                className="value-card"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="value-card-top">
                  <span className="value-index">0{i + 1}</span>
                  <span className="value-dot" />
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
                <div className="value-card-bar" aria-hidden />
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <div className="sustain-box">
            <div className="sustain-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p className="sustain-note">{sustainabilityText}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

