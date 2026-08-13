import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { FadeIn } from './FadeIn'
import { quotationServices, site } from '../data/content'

type ContactProps = {
  showIntro?: boolean
}

export function Contact({ showIntro = false }: ContactProps) {
  const uid = useId()
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const service = String(data.get('service') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !phone || !service || !message) return

    const subject = encodeURIComponent(`Enquiry from ${name} — ${site.name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section className="section contact">
      <div className="container">
        {showIntro ? (
          <FadeIn>
            <p className="section-label">GET IN TOUCH</p>
            <h2 className="section-title">Request for quotation</h2>
            <p className="section-lead">
              We want to work with you for your project. Please fill up the below
              form to get a quotation for your project.
            </p>
          </FadeIn>
        ) : null}

        <div className={`contact-grid ${showIntro ? '' : 'contact-grid-tight'}`}>
          <FadeIn delay={0.08}>
            <div className="contact-info">
              <div className="contact-block">
                <h3>{site.address.state}</h3>
                <p>
                  {site.address.line1}
                  <br />
                  {site.address.pin}
                  <br />
                  {site.address.city}
                </p>
              </div>
              <div className="contact-block">
                <h3>Contact</h3>
                <p>
                  {site.phones.map((p) => (
                    <span key={p.tel}>
                      <a href={`tel:${p.tel}`}>{p.display}</a>
                      <br />
                    </span>
                  ))}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
              <div className="contact-block">
                <h3>Working time</h3>
                <p>
                  {site.hours.days}
                  <br />
                  {site.hours.time} IST
                </p>
              </div>
              <a
                href={site.whatsapp.includes('?') ? site.whatsapp : `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor={`${uid}-name`}>Name</label>
                  <input
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-email`}>Your Email</label>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor={`${uid}-phone`}>Contact Number</label>
                  <input
                    id={`${uid}-phone`}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="9425412562"
                  />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-service`}>Select the service</label>
                  <select id={`${uid}-service`} name="service" defaultValue="" required>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {quotationServices.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor={`${uid}-message`}>Describe your Requirements</label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  required
                  placeholder="Project details and requirements…"
                />
              </div>
              {status === 'sent' ? (
                <p className="form-success" role="status">
                  Thank you! Your email app should open with the message ready.
                  If it did not, write to us at {site.email}.
                </p>
              ) : (
                <button type="submit" className="btn btn-ink">
                  SEND MESSAGE
                </button>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
