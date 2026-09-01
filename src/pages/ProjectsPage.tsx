import { Link } from 'react-router-dom'
import { PageBanner } from '../components/PageBanner'
import { FadeIn } from '../components/FadeIn'
import { CtaBand } from '../components/CtaBand'
import { Clients } from '../components/Clients'
import { companyProfilePdf, progress, workSamples } from '../data/content'

export function ProjectsPage() {
  return (
    <>
      <PageBanner
        label="Our progress"
        title="Projects & Deliverables"
        lead="Survey engineering delivered across infrastructure, railways, mining, energy and industrial projects in India."
      />

      <section className="section progress-section">
        <div className="container">
          <div className="progress-grid">
            {progress.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div className="progress-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="container">
          <FadeIn>
            <p className="section-label">From our project files</p>
            <h2 className="section-title">Work we have delivered</h2>
            <div className="accent-line" aria-hidden />
          </FadeIn>

          <div className="work-grid">
            {workSamples.map((item, i) => (
              <FadeIn key={item.src} delay={(i % 2) * 0.08}>
                <article className="work-card">
                  <div className="work-card-media">
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="work-card-body">
                    <p className="work-card-tag">{item.service}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <p className="work-note">
              Looking for a reference project in your sector?{' '}
              <Link to="/contact" className="text-link">
                Ask our team
              </Link>{' '}
              and we will share relevant deliverables.
            </p>
            <div className="btn-row">
              <a href={companyProfilePdf} download className="btn btn-outline">
                Download company profile (PDF)
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Clients />
      <CtaBand to="/quotation" label="Get quotation" />
    </>
  )
}
