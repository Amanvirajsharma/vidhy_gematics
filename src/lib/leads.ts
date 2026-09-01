import { site } from '../data/content'

export type LeadField = {
  label: string
  value: string
}

export type LeadPayload = {
  formName: string
  subject: string
  fields: LeadField[]
}

export type LeadResult = 'sent' | 'fallback'

const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim()
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim()

export const isLeadBackendConfigured = Boolean(endpoint || accessKey)

export function leadToText(payload: LeadPayload) {
  return payload.fields
    .filter((f) => f.value.trim().length > 0)
    .map((f) => `${f.label}: ${f.value}`)
    .join('\n')
}

export function leadMailtoUrl(payload: LeadPayload) {
  const subject = encodeURIComponent(payload.subject)
  const body = encodeURIComponent(leadToText(payload))
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}

export function leadWhatsappUrl(payload: LeadPayload) {
  const text = encodeURIComponent(`${payload.subject}\n\n${leadToText(payload)}`)
  return `https://wa.me/${site.whatsappNumber}?text=${text}`
}

/**
 * Posts to a Web3Forms-compatible endpoint. Without a configured key the caller
 * must fall back to mail/WhatsApp, otherwise the enquiry is silently lost.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!isLeadBackendConfigured) return 'fallback'

  const url = endpoint || 'https://api.web3forms.com/submit'
  const body: Record<string, string> = {
    subject: payload.subject,
    from_name: site.name,
    form_name: payload.formName,
    message: leadToText(payload),
  }

  if (accessKey) body.access_key = accessKey
  for (const field of payload.fields) body[field.label] = field.value

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`Lead submission failed with status ${res.status}`)

  return 'sent'
}
