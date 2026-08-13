import { FadeIn } from './FadeIn'
import { clients } from '../data/content'

export function Clients() {
  return (
    <section className="section clients">
      <div className="container">
        <div className="clients-grid">
          {clients.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.04}>
              <div className="client-logo" title={c.name}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
