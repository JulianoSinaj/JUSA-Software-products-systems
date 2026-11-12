import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { site } from '../../data/site'
import {
  MESSAGE_MAX,
  deliverContact,
  emptyContact,
  topics,
  validateContact,
  type ContactField,
  type ContactValues,
  type DeliveryResult,
} from '../../lib/contact'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

type Status = { state: 'idle' } | { state: 'submitting' } | { state: 'sent'; result: DeliveryResult } | { state: 'failed' }

const fieldOrder: ContactField[] = ['name', 'email', 'company', 'topic', 'message']

const controlClass =
  'w-full rounded-xl border bg-canvas/70 px-3.5 py-3 text-[15px] text-ink placeholder:text-faint ' +
  'transition-[border-color,box-shadow] duration-200 outline-none ' +
  'focus:border-accent focus:shadow-[0_0_0_4px_rgb(99_102_241/0.18)]'

interface FieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  valid?: boolean
  hint?: ReactNode
  children: ReactNode
}

function Field({ id, label, optional, error, valid, hint, children }: FieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {optional && <span className="ml-2 font-normal text-faint">Optional</span>}
        </label>
        {valid && !error && <CircleCheck className="size-4 text-live" aria-hidden="true" />}
      </div>
      {children}
      <div className="mt-1.5 flex min-h-5 items-start justify-between gap-3 text-xs">
        {error ? (
          <p id={`${id}-error`} className="flex items-center gap-1.5 text-danger">
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint}
      </div>
    </div>
  )
}

export function ContactForm() {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<ContactValues>(emptyContact)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const errors = validateContact(values)
  const shown = (field: ContactField) => (touched[field] ? errors[field] : undefined)
  const isValid = (field: ContactField) => Boolean(touched[field] && values[field].trim() && !errors[field])
  const id = (field: string) => `${uid}-${field}`

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (status.state === 'failed') setStatus({ state: 'idle' })
  }

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({ name: true, email: true, company: true, topic: true, message: true })

    const firstInvalid = fieldOrder.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Bots fill every input; a filled honeypot is accepted and dropped.
    if (honeypot) {
      setStatus({ state: 'sent', result: { via: 'endpoint' } })
      return
    }

    setStatus({ state: 'submitting' })
    try {
      const result = await deliverContact(values)
      setStatus({ state: 'sent', result })
    } catch {
      setStatus({ state: 'failed' })
    }
  }

  const reset = () => {
    setValues(emptyContact)
    setTouched({})
    setStatus({ state: 'idle' })
  }

  if (status.state === 'sent') {
    const viaMail = status.result.via === 'mail-client'
    return (
      <div role="status" className="flex h-full min-h-[28rem] flex-col items-center justify-center px-6 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-live/40 bg-live/10 text-live-soft">
          <CircleCheck className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-xl font-semibold text-ink">{viaMail ? 'Your message is ready to send' : 'Message sent'}</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
          {viaMail
            ? 'Your mail app has opened with the inquiry filled in. Send it from there to complete the request.'
            : `Thank you, ${values.name.trim().split(' ')[0]}. Your inquiry has been delivered and a reply will follow by email.`}
        </p>
        <Button type="button" variant="secondary" size="sm" className="mt-8" onClick={reset}>
          Send another message
        </Button>
      </div>
    )
  }

  const submitting = status.state === 'submitting'
  const ariaFor = (field: ContactField) => ({
    'aria-invalid': shown(field) ? (true as const) : undefined,
    'aria-describedby': shown(field) ? `${id(field)}-error` : undefined,
  })
  const borderFor = (field: ContactField) =>
    shown(field) ? 'border-danger/70' : isValid(field) ? 'border-live/50' : 'border-line-strong'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="p-5 sm:p-8">
      <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <Field id={id('name')} label="Name" error={shown('name')} valid={isValid('name')}>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(controlClass, borderFor('name'))}
            {...ariaFor('name')}
          />
        </Field>

        <Field id={id('email')} label="Work email" error={shown('email')} valid={isValid('email')}>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ada@company.com"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(controlClass, borderFor('email'))}
            {...ariaFor('email')}
          />
        </Field>

        <Field id={id('company')} label="Company" optional>
          <input
            id={id('company')}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or organisation"
            value={values.company}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(controlClass, 'border-line-strong')}
          />
        </Field>

        <Field id={id('topic')} label="Project type" error={shown('topic')} valid={isValid('topic')}>
          <select
            id={id('topic')}
            name="topic"
            value={values.topic}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(controlClass, borderFor('topic'), !values.topic && 'text-faint')}
            {...ariaFor('topic')}
          >
            <option value="" disabled>
              Select a focus area
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic} className="bg-surface text-ink">
                {topic}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={id('message')}
            label="Project brief"
            error={shown('message')}
            valid={isValid('message')}
            hint={
              <span
                className={cn(
                  'ml-auto shrink-0 font-mono tabular-nums',
                  values.message.length > MESSAGE_MAX ? 'text-danger' : 'text-faint',
                )}
              >
                {values.message.length} / {MESSAGE_MAX}
              </span>
            }
          >
            <textarea
              id={id('message')}
              name="message"
              rows={5}
              placeholder="What are you building, who is it for, and when does it need to ship?"
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              className={cn(controlClass, 'resize-y', borderFor('message'))}
              {...ariaFor('message')}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, visible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
        </label>
      </div>

      {status.state === 'failed' && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-ink"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
          <span>
            Your message could not be sent and nothing was lost — it is still in the form. Try again, or reach out
            directly on{' '}
            <a href={site.links.github} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-faint">
          Your details are used only to reply to this inquiry.
        </p>
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
