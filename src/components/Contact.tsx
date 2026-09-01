import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { FadeIn } from './FadeIn'
import { quotationServices, site } from '../data/content'
import { leadMailtoUrl, leadWhatsappUrl, submitLead } from '../lib/leads'
import type { LeadPayload } from '../lib/leads'
import { trackEvent } from '../lib/analytics'

type ContactProps = {
  showIntro?: boolean
}

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error'

export function Contact({ showIntro = false }: ContactProps) {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [payload, setPayload] = useState<LeadPayload | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const service = String(data.get('service') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !phone || !service || !message) return

    const lead: LeadPayload = {
      formName: 'Contact enquiry',
      subject: `Enquiry from ${name} — ${site.name}`,
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Service', value: service },
        { label: 'Message', value: message },
      ],
    }

    setPayload(lead)
    setStatus('sending')

    try {
      const result = await submitLead(lead)
      setStatus(result === 'sent' ? 'sent' : 'fallback')
      trackEvent('generate_lead', { form: 'contact', delivery: result })
      if (result === 'sent') form.reset()
    } catch {
      setStatus('error')
      trackEvent('form_error', { form: 'contact' })
    }
  }

  const showForm = status !== 'sent'

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
                      <a
                        href={`tel:${p.tel}`}
                        onClick={() => trackEvent('phone_click', { number: p.display })}
                      >
                        {p.display}
                      </a>
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
                onClick={() => trackEvent('whatsapp_click', { source: 'contact_info' })}
              >
                WhatsApp us
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            {showForm ? (
              <form className="contact-form" onSubmit={onSubmit}>
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

                {status === 'fallback' && payload ? (
                  <div className="form-notice" role="status">
                    <p>
                      Your enquiry is ready to send. Choose how you would like to reach
                      us — WhatsApp gets the fastest reply.
                    </p>
                    <div className="form-notice-actions">
                      <a
                        className="btn btn-primary"
                        href={leadWhatsappUrl(payload)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('whatsapp_click', { source: 'contact_fallback' })}
                      >
                        Send on WhatsApp
                      </a>
                      <a className="btn btn-outline" href={leadMailtoUrl(payload)}>
                        Send by email
                      </a>
                    </div>
                  </div>
                ) : null}

                {status === 'error' && payload ? (
                  <div className="form-notice is-error" role="alert">
                    <p>
                      We could not submit the form just now. Please send it on WhatsApp
                      or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
                    </p>
                    <div className="form-notice-actions">
                      <a
                        className="btn btn-primary"
                        href={leadWhatsappUrl(payload)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Send on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : null}

                <button type="submit" className="btn btn-ink" disabled={status === 'sending'}>
                  {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
                </button>
              </form>
            ) : (
              <div className="form-success" role="status">
                <h3>Thank you!</h3>
                <p>
                  Your enquiry has reached our team. We typically reply within one
                  business day on {site.hours.days}, {site.hours.time} IST.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setStatus('idle')
                    setPayload(null)
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
