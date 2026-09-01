import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { serviceCategories } from '../data/content'

const ease = [0.22, 1, 0.36, 1] as const

export function Services() {
  const [openCategory, setOpenCategory] = useState<number | null>(0)
  const [openSub, setOpenSub] = useState<string | null>(null)

  const toggleCategory = (index: number) => {
    const next = openCategory === index ? null : index
    setOpenCategory(next)
    setOpenSub(null)
  }

  const toggleSub = (key: string) => {
    setOpenSub((current) => (current === key ? null : key))
  }

  return (
    <section className="section services">
      <div className="container">
        <div className="services-list">
          {serviceCategories.map((category, i) => {
            const isOpen = openCategory === i
            const index = String(i + 1).padStart(2, '0')

            return (
              <FadeIn key={category.title} delay={i * 0.04}>
                <article className={`service-acc ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="service-acc-head"
                    aria-expanded={isOpen}
                    onClick={() => toggleCategory(i)}
                  >
                    <span className="service-index-badge">{index}</span>
                    <div className="service-acc-main">
                      <h3>{category.title}</h3>
                      <div className="service-acc-tags" aria-hidden>
                        {category.subServices.map((sub) => (
                          <span key={sub.title} className="service-acc-tag">
                            {sub.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="service-toggle" aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        className="service-acc-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        <div className="service-acc-inner service-acc-inner-category">
                          <p className="service-category-lead">{category.summary}</p>

                          <div className="service-sub-list">
                            {category.subServices.map((sub, j) => {
                              const subKey = `${i}-${j}`
                              const subOpen = openSub === subKey

                              return (
                                <article
                                  key={sub.title}
                                  className={`service-sub-acc ${subOpen ? 'open' : ''}`}
                                >
                                  <button
                                    type="button"
                                    className="service-sub-head"
                                    aria-expanded={subOpen}
                                    onClick={() => toggleSub(subKey)}
                                  >
                                    <span>{sub.title}</span>
                                    <span className="service-chevron" aria-hidden>
                                      {subOpen ? '−' : '+'}
                                    </span>
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {subOpen ? (
                                      <motion.div
                                        className="service-sub-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease }}
                                      >
                                        <div className="service-sub-inner">
                                          <p>{sub.summary}</p>
                                          <ul>
                                            {sub.items.map((item) => (
                                              <li key={item}>{item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    ) : null}
                                  </AnimatePresence>
                                </article>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
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
