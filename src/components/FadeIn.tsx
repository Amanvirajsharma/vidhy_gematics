import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

const ease = [0.22, 1, 0.36, 1] as const

export function FadeIn({ children, delay = 0, className, y = 40 }: FadeInProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden' }}
      initial={reduce ? false : { clipPath: 'inset(14% 14% 14% 14%)', opacity: 0.35 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.15, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
