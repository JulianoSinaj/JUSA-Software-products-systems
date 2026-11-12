import { site } from '../data/site'

export interface ContactValues {
  name: string
  email: string
  company: string
  topic: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactErrors = Partial<Record<ContactField, string>>

export const emptyContact: ContactValues = { name: '', email: '', company: '', topic: '', message: '' }

export const topics = [
  'Full-stack web & API architecture',
  'Cloud deployment & DevOps',
  'Mobile application',
  'Hardware & IoT integration',
  'Something else',
]

export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 2000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Enter at least 2 characters.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email, like name@company.com.'

  if (!values.topic) errors.topic = 'Choose what the project is about.'

  if (!message) errors.message = 'Describe the project in a few sentences.'
  else if (message.length < MESSAGE_MIN) errors.message = `Add a little more detail (at least ${MESSAGE_MIN} characters).`
  else if (message.length > MESSAGE_MAX) errors.message = `Keep the message under ${MESSAGE_MAX} characters.`

  return errors
}

export type DeliveryResult = { via: 'endpoint' } | { via: 'mail-client' }

/** Thrown when no delivery channel is configured or the request fails. */
export class DeliveryError extends Error {}

/**
 * Delivers an inquiry.
 *  1. VITE_CONTACT_ENDPOINT set → JSON POST to that endpoint.
 *  2. Otherwise, `site.email` set → hand off to the visitor's mail client.
 *  3. Neither → DeliveryError, and the form points to the direct channels.
 */
export async function deliverContact(values: ContactValues): Promise<DeliveryResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

  if (endpoint) {
    let response: Response
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
    } catch {
      throw new DeliveryError('network')
    }
    if (!response.ok) throw new DeliveryError(`status ${response.status}`)
    return { via: 'endpoint' }
  }

  if (site.email) {
    const subject = `${site.name} inquiry — ${values.topic}`
    const body = [
      values.message.trim(),
      '',
      `— ${values.name.trim()}${values.company.trim() ? `, ${values.company.trim()}` : ''}`,
      values.email.trim(),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return { via: 'mail-client' }
  }

  throw new DeliveryError('not configured')
}
