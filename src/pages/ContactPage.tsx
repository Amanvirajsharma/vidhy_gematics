import { PageBanner } from '../components/PageBanner'
import { Contact } from '../components/Contact'
import { FadeIn } from '../components/FadeIn'
import { leadership, site } from '../data/content'

const mapQuery = encodeURIComponent(
  `${site.address.line1}, ${site.address.city}, ${site.address.pin}`,
)

export function ContactPage() {
  return (
    <>
      <PageBanner
        label="GET IN TOUCH"
        title="Contact Us"
        lead={`${site.address.city} · ${site.hours.days} ${site.hours.time}`}
      />
      <Contact />

      <section className="section leadership-section">
        <div className="container">
          <FadeIn>
            <div className="leadership-card">
              <div>
                <p className="section-label">Let's connect</p>
                <h2>{leadership.name}</h2>
                <p className="leadership-role">{leadership.role}</p>
              </div>
              <div className="leadership-contacts">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`}>
                    {p.display}
                  </a>
                ))}
                <a href={`mailto:${leadership.email}`}>{leadership.email}</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <FadeIn>
            <div className="map-frame">
              <iframe
                title={`Map — ${site.address.city}`}
                src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
