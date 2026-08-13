import { Link } from 'react-router-dom'
import { useId, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FadeIn } from './FadeIn'
import { quotationRoles, quotationServices, site } from '../data/content'

type FormState = {
  name: string
  companyName: string
  email: string
  contactNumber: string
  subject: string
  projectName: string
  role: string
  selectedServices: string[]
  requirements: string
}

const initial: FormState = {
  name: '',
  companyName: '',
  email: '',
  contactNumber: '',
  subject: '',
  projectName: '',
  role: '',
  selectedServices: [],
  requirements: '',
}

export function QuotationForm() {
  const uid = useId()
  const [form, setForm] = useState<FormState>(initial)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const progress = useMemo(() => {
    const checks = [
      form.name,
      form.companyName,
      form.email,
      form.contactNumber.length === 10,
      form.subject,
      form.projectName,
      form.role,
      form.selectedServices.length > 0,
      form.requirements,
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [form])

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked
      const service = value
      setForm((prev) => ({
        ...prev,
        selectedServices: checked
          ? [...prev.selectedServices, service]
          : prev.selectedServices.filter((s) => s !== service),
      }))
      setError('')
      return
    }

    if (name === 'contactNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setForm((prev) => ({ ...prev, contactNumber: digits }))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.selectedServices.length === 0) {
      setError('Please select at least one service.')
      return
    }

    if (form.contactNumber.length !== 10) {
      setError('Please enter a valid 10-digit contact number.')
      return
    }

    setError('')

    const mailSubject = encodeURIComponent(
      form.subject || `Quotation request — ${form.projectName || form.name}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company Name: ${form.companyName}`,
        `Email: ${form.email}`,
        `Contact Number: ${form.contactNumber}`,
        `Subject: ${form.subject}`,
        `Project Name: ${form.projectName}`,
        `Role: ${form.role}`,
        `Selected Services:\n${form.selectedServices.map((s) => `• ${s}`).join('\n')}`,
        '',
        `Requirements:\n${form.requirements}`,
      ].join('\n'),
    )

    window.location.href = `mailto:${site.email}?subject=${mailSubject}&body=${body}`
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <FadeIn>
        <div className="quotation-thanks">
          <div className="quotation-thanks-icon" aria-hidden>
            ✓
          </div>
          <h2>Thank You!</h2>
          <p>Your request has been submitted successfully.</p>
          <p className="quotation-thanks-note">
            If your email app did not open, please write to{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <div className="quotation-thanks-actions">
            <Link to="/" className="btn btn-ink">
              Go To Home Page
            </Link>
            <Link to="/services" className="btn btn-outline">
              Browse services
            </Link>
          </div>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn delay={0.08}>
      <form className="quotation-form" onSubmit={onSubmit}>
        <div className="quotation-form-head">
          <div>
            <p className="section-label">Quotation form</p>
            <h3>Project details</h3>
          </div>
          <div className="quotation-progress" aria-label={`Form ${progress}% complete`}>
            <span>{progress}%</span>
            <div className="quotation-progress-track">
              <div className="quotation-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="quotation-block">
          <h4>
            <span>01</span> Your details
          </h4>
          <div className="quotation-grid">
            <div className="field">
              <label htmlFor={`${uid}-name`}>Name:</label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-company`}>Company Name:</label>
              <input
                id={`${uid}-company`}
                name="companyName"
                type="text"
                placeholder="Company Name"
                value={form.companyName}
                onChange={onChange}
                required
                autoComplete="organization"
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-email`}>Your Email:</label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-phone`}>Contact Number:</label>
              <input
                id={`${uid}-phone`}
                name="contactNumber"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.contactNumber}
                onChange={onChange}
                required
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter a valid 10-digit contact number"
                autoComplete="tel"
              />
            </div>
          </div>
        </div>

        <div className="quotation-block">
          <h4>
            <span>02</span> Project information
          </h4>
          <div className="quotation-grid">
            <div className="field">
              <label htmlFor={`${uid}-subject`}>Subject:</label>
              <input
                id={`${uid}-subject`}
                name="subject"
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={onChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor={`${uid}-project`}>Project Name:</label>
              <input
                id={`${uid}-project`}
                name="projectName"
                type="text"
                placeholder="Project Name"
                value={form.projectName}
                onChange={onChange}
                required
              />
            </div>
            <div className="field quotation-grid-full">
              <label htmlFor={`${uid}-role`}>Select Role:</label>
              <select
                id={`${uid}-role`}
                name="role"
                value={form.role}
                onChange={onChange}
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                {quotationRoles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="quotation-block">
          <h4>
            <span>03</span> Select the service
            {form.selectedServices.length > 0 ? (
              <em>{form.selectedServices.length} selected</em>
            ) : null}
          </h4>
          <div className="checkbox-group">
            {quotationServices.map((service, index) => {
              const id = `${uid}-service-${index}`
              const checked = form.selectedServices.includes(service)
              return (
                <label
                  key={service}
                  className={`checkbox-option ${checked ? 'is-checked' : ''}`}
                  htmlFor={id}
                >
                  <input
                    id={id}
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={checked}
                    onChange={onChange}
                  />
                  <span>{service}</span>
                </label>
              )
            })}
          </div>
        </div>

        {error ? (
          <p className="quotation-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="quotation-block">
          <h4>
            <span>04</span> Describe your Requirements
          </h4>
          <div className="field">
            <label htmlFor={`${uid}-requirements`} className="sr-only">
              Describe your Requirements:
            </label>
            <textarea
              id={`${uid}-requirements`}
              name="requirements"
              placeholder="Site location, area size, accuracy needs, timeline…"
              value={form.requirements}
              onChange={onChange}
              required
              className="quotation-message"
            />
          </div>
        </div>

        <div className="quotation-form-actions">
          <button type="submit" className="btn btn-ink quotation-submit">
            Submit quotation request
          </button>
          <p>We typically reply within one business day.</p>
        </div>
      </form>
    </FadeIn>
  )
}
