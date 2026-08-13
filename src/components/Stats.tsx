import { motion } from 'framer-motion'
import { stats } from '../data/content'

export function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            className="stat-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
