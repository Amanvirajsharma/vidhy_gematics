import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/content'
import { siteImages } from '../data/siteImages'

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { target: 0, suffix: value, numeric: false }
  return { target: Number(match[1]), suffix: match[2] ?? '', numeric: true }
}

function StatValue({ value }: { value: string }) {
  const parsed = parseStat(value)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce || !parsed.numeric ? parsed.target : 0)

  useEffect(() => {
    if (!inView || !parsed.numeric || reduce) return
    const start = performance.now()
    const duration = 1800
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setN(Math.round(parsed.target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, parsed.numeric, parsed.target, reduce])

  return (
    <div className="stat-value" ref={ref}>
      {parsed.numeric ? `${n}${parsed.suffix}` : value}
    </div>
  )
}

export function Stats() {
  return (
    <section className="stats stats-photo">
      <img src={siteImages.cases[1].src} alt="" className="stats-bg" />
      <div className="stats-grid-overlay" aria-hidden />
      <div className="container stats-container">
        <div className="stats-grid">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              className="stat-item stat-glass-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="stat-card-header">
                <span className="stat-radar-dot" />
                <span className="stat-index">0{i + 1}</span>
              </div>
              <StatValue value={item.value} />
              <div className="stat-label">{item.label}</div>
              <div className="stat-corner-accent" aria-hidden />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

