import { FadeIn } from './FadeIn'
import { joinText, sustainabilityText, values } from '../data/content'

export function Values() {
  return (
    <section className="section values">
      <div className="container">
        <FadeIn>
          <p className="section-label">Why Vidya Geomatics</p>
          <h2 className="section-title">Commitment to quality, innovation & trust</h2>
          <p className="section-lead">{joinText}</p>
        </FadeIn>

        <div className="values-grid">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.07}>
              <article className="value-card">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <p className="sustain-note">{sustainabilityText}</p>
        </FadeIn>
      </div>
    </section>
  )
}
