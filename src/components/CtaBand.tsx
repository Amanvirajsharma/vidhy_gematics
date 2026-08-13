import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { site } from '../data/content'

type CtaBandProps = {
  to?: string
  label?: string
}

export function CtaBand({ to = '/quotation', label = 'Request quotation' }: CtaBandProps) {
  return (
    <section className="cta-band">
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
