import { PageBanner } from '../components/PageBanner'
import { QuotationForm } from '../components/QuotationForm'
import { FadeIn } from '../components/FadeIn'
import { site } from '../data/content'

const highlights = [
  { title: '24-hour response', text: 'We review quotation requests during business hours.' },
  { title: 'Survey-grade scope', text: 'Clear accuracy, deliverables and timeline in every quote.' },
  { title: 'India-wide delivery', text: 'Field teams and mapping support across project sites.' },
]

export function QuotationPage() {
  return (
    <>
      <PageBanner
        label="GET IN TOUCH WITH US"
        title="Request For Quotation"
        lead="We want to work with you for your project. Please fill up the below form to get a quotation for your project."
      />

      <section className="section quotation-highlights">
        <div className="container quotation-highlights-grid">
          {highlights.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <article className="quotation-highlight">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section quotation">
        <div className="container quotation-layout">
          <FadeIn>
            <aside className="quotation-aside">
              <p className="section-label">Why request a quote</p>
              <h2 className="quotation-aside-title">Tell us your project. We’ll scope it precisely.</h2>
              <p className="quotation-aside-lead">
                Share site details, accuracy needs and timeline — our survey team will
                respond with a clear proposal.
              </p>

              <ol className="quotation-steps">
                <li>
                  <strong>01</strong>
                  <div>
                    <h4>Fill project details</h4>
                    <p>Company, role and project name</p>
                  </div>
                </li>
                <li>
                  <strong>02</strong>
                  <div>
                    <h4>Select services</h4>
                    <p>Choose one or more survey needs</p>
                  </div>
                </li>
                <li>
                  <strong>03</strong>
                  <div>
                    <h4>Get your quotation</h4>
                    <p>We reply on email / WhatsApp</p>
                  </div>
                </li>
              </ol>

              <div className="quotation-aside-card">
                <h4>Direct contact</h4>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`}>
                    {p.display}
                  </a>
                ))}
                <a
                  href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
                  className="btn btn-primary quotation-aside-wa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </aside>
          </FadeIn>

          <QuotationForm />
        </div>
      </section>
    </>
  )
}
