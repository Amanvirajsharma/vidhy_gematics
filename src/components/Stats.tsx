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
    const duration = 1600
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
      <div className="container stats-grid">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            className="stat-item"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <StatValue value={item.value} />
            <div className="stat-label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
