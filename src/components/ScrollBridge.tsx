import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Carries the dark hero into the light sections below. The gradient does the
 * bulk of the work so the colour change tracks scroll position exactly, while
 * the glow and lift add depth without extra paint cost.
 */
export function ScrollBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.5, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])

  return (
    <div className="scroll-bridge" ref={ref} aria-hidden>
      {reduce ? null : (
        <motion.span
          className="scroll-bridge-glow"
          style={{ opacity: glowOpacity, y: glowY }}
        />
      )}
    </div>
  )
}
