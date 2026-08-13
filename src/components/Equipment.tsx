import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { rental } from '../data/content'

export function Equipment() {
  return (
    <section className="section equipment">
      <div className="container">
        <FadeIn>
          <p className="section-lead lead-flush">{rental.intro}</p>
        </FadeIn>

        <div className="equip-grid rental-grid">
          {rental.items.map((item, i) => (
            <FadeIn key={item} delay={i * 0.06}>
              <article className="equip-item">
                <div className="rental-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{item.replace(/\.$/, '')}</h3>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="rental-note">{rental.note}</p>
          <Link to="/quotation" className="btn btn-ink btn-mt">
            Enquire for rental
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
