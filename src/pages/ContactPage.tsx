import { PageBanner } from '../components/PageBanner'
import { Contact } from '../components/Contact'
import { FadeIn } from '../components/FadeIn'
import { site } from '../data/content'

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
