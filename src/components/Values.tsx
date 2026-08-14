import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { site, sustainabilityText, values } from '../data/content'

export function Values() {
  return (
    <section className="section values">
      <div className="container">
        <FadeIn>
          <p className="section-label">Why Vidya Geomatics</p>
          <h2 className="section-title">{site.tagline}</h2>
        </FadeIn>

        <div className="values-grid">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.08}>
              <motion.article
                className="value-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="value-index">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <p className="sustain-note">{sustainabilityText}</p>
        </FadeIn>
      </div>
    </section>
  )
}
