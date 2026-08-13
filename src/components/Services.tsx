import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { services } from '../data/content'

export function Services() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section services">
      <div className="container">
        <div className="services-list">
          {services.map((s, i) => {
            const isOpen = open === i
            const index = String(i + 1).padStart(2, '0')
            return (
              <FadeIn key={s.title} delay={i * 0.04}>
                <article className={`service-acc ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="service-acc-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="service-index">{index}</span>
                    <h3>{s.title}</h3>
                    <span className="service-chevron" aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="service-acc-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="service-acc-inner">
                          <p>{s.summary}</p>
                          <ul>
                            {s.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
