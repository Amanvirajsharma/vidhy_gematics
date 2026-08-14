import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FadeIn } from './FadeIn'
import { site } from '../data/content'
import { siteImages } from '../data/siteImages'

type CtaBandProps = {
  to?: string
  label?: string
}

export function CtaBand({ to = '/quotation', label = 'Request quotation' }: CtaBandProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])

  return (
    <section className="cta-band cta-band-photo" ref={ref}>
      <motion.img
        src={siteImages.cta.src}
        alt=""
        className="cta-band-bg"
        style={{ y }}
      />
      <div className="cta-band-shade" />
      <div className="container cta-inner">
        <FadeIn>
          <div>
            <h2>Want to see what services we provide?</h2>
            <p>
              {site.rentalLine}. Get in touch with {site.shortName} for survey,
              mapping and rental support.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <Link to={to} className="btn btn-primary">
            {label}
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
