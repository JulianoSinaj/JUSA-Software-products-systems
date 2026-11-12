import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, ChevronDown, CircleAlert, LoaderCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
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
import { easeInOut, easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

type Status = { state: 'idle' } | { state: 'submitting' } | { state: 'sent'; result: DeliveryResult } | { state: 'failed' }

const fieldOrder: ContactField[] = ['name', 'email', 'company', 'topic', 'message']

/* Controls carry `placeholder=" "` so :placeholder-shown tells the
   label whether the field is empty, without any extra state. */
const controlClass =
  'peer w-full rounded-xl border bg-canvas/60 px-4 text-[15px] text-ink outline-none placeholder:text-transparent ' +
  'transition-[border-color,background-color,box-shadow] duration-300 ' +
  'hover:border-white/20 focus:border-accent/60 focus:bg-canvas focus:shadow-[0_0_0_4px_rgb(245_158_11/0.08)]'

/* Label rests inside the field and floats to the top edge, shrinking,
   on focus or once the field has a value. */
const labelBase =
  'pointer-events-none absolute left-4 origin-left text-[15px] text-faint ' +
  'transition-[top,translate,scale,color] duration-300 ease-out-soft ' +
  'peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-[0.78] peer-focus:text-accent ' +
  'peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-muted'
const labelFloated = 'top-2.5 translate-y-0 scale-[0.78] text-muted'

interface FieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  /** Text areas rest their label at the top instead of centred. */
  multiline?: boolean
  /** Force the floated label (selects, which have no placeholder state). */
  floated?: boolean
  hint?: ReactNode
  children: ReactNode
}

function Field({ id, label, optional, error, multiline, floated, hint, children }: FieldProps) {
  return (
    <div>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={cn(labelBase, floated ? labelFloated : multiline ? 'top-4' : 'top-1/2 -translate-y-1/2')}
        >
          {label}
          {optional && <span className="ml-1.5 text-faint">(optional)</span>}
        </label>
      </div>
      <div className="mt-1.5 flex min-h-5 items-start justify-between gap-3 text-xs">
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              id={`${id}-error`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 text-danger"
            >
              <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {hint}
      </div>
    </div>
  )
}

/** Drawn check with two expanding rings — the "it's done" moment. */
function SuccessMark() {
  return (
    <div className="relative flex size-20 items-center justify-center">
      {[0.45, 0.7].map((delay) => (
        <motion.span
          key={delay}
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-accent/60"
          initial={{ scale: 0.7, opacity: 0.9 }}
          animate={{ scale: 2.1, opacity: 0 }}
          transition={{ duration: 1.4, ease: easeOut, delay }}
        />
      ))}
      <svg viewBox="0 0 80 80" className="size-20" aria-hidden="true">
        <motion.circle
          cx="40"
          cy="40"
          r="38"
          fill="rgb(245 158 11 / 0.06)"
          stroke="rgb(245 158 11 / 0.9)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: easeInOut }}
          style={{ rotate: -90, transformOrigin: '50% 50%' }}
        />
        <motion.path
          d="M27 41 l9 9 l18 -20"
          fill="none"
          stroke="#ededef"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.6 }}
        />
      </svg>
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

  const submitting = status.state === 'submitting'
  const ariaFor = (field: ContactField) => ({
    'aria-invalid': shown(field) ? (true as const) : undefined,
    'aria-describedby': shown(field) ? `${id(field)}-error` : undefined,
  })
  const borderFor = (field: ContactField) => (shown(field) ? 'border-danger/60' : 'border-white/[0.08]')

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.state === 'sent' ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex min-h-[36rem] flex-col items-center justify-center px-8 py-16 text-center"
        >
          <SuccessMark />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.75 }}
            className="flex flex-col items-center"
          >
            <h3 className="display mt-10 text-4xl text-ink">
              {status.result.via === 'mail-client' ? 'Ready to send' : 'Message received'}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
              {status.result.via === 'mail-client'
                ? 'Your mail app has opened with the inquiry filled in. Send it from there to complete the request.'
                : `Thank you, ${values.name.trim().split(' ')[0]}. Your inquiry has been delivered and a reply will follow by email.`}
            </p>
            <Button type="button" variant="secondary" size="sm" className="mt-10" onClick={reset}>
              Send another message
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="p-7 sm:p-10"
        >
          <p className="meta mb-8 flex items-center justify-between text-faint">
            New inquiry
            <span className="text-muted">{site.name} Studio</span>
          </p>

          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            <Field id={id('name')} label="Name" error={shown('name')}>
              <input
                id={id('name')}
                name="name"
                type="text"
                autoComplete="name"
                placeholder=" "
                value={values.name}
                onChange={onChange}
                onBlur={onBlur}
                className={cn(controlClass, 'h-14 pt-5', borderFor('name'))}
                {...ariaFor('name')}
              />
            </Field>

            <Field id={id('email')} label="Work email" error={shown('email')}>
              <input
                id={id('email')}
                name="email"
                type="email"
                autoComplete="email"
                placeholder=" "
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                className={cn(controlClass, 'h-14 pt-5', borderFor('email'))}
                {...ariaFor('email')}
              />
            </Field>

            <Field id={id('company')} label="Company" optional>
              <input
                id={id('company')}
                name="company"
                type="text"
                autoComplete="organization"
                placeholder=" "
                value={values.company}
                onChange={onChange}
                onBlur={onBlur}
                className={cn(controlClass, 'h-14 pt-5', 'border-white/[0.08]')}
              />
            </Field>

            <Field id={id('topic')} label="Project type" error={shown('topic')} floated={Boolean(values.topic)}>
              <select
                id={id('topic')}
                name="topic"
                value={values.topic}
                onChange={onChange}
                onBlur={onBlur}
                className={cn(controlClass, 'h-14 appearance-none pt-5 pr-10', borderFor('topic'))}
                {...ariaFor('topic')}
              >
                <option value="" disabled hidden />
                {topics.map((topic) => (
                  <option key={topic} value={topic} className="bg-surface text-ink">
                    {topic}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-faint transition-transform duration-300 peer-focus:rotate-180 peer-focus:text-accent"
                aria-hidden="true"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field
                id={id('message')}
                label="Tell me about the project"
                multiline
                error={shown('message')}
                hint={
                  <span
                    className={cn(
                      'ml-auto shrink-0 font-mono text-[11px] tabular-nums',
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
                  placeholder=" "
                  value={values.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={cn(controlClass, 'resize-y pt-8 pb-3 leading-relaxed', borderFor('message'))}
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

          <AnimatePresence>
            {status.state === 'failed' && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <span className="mt-4 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/[0.06] px-4 py-3 text-sm leading-relaxed text-ink">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                  <span>
                    Your message could not be sent and nothing was lost — it is still in the form. Try again, or reach
                    out directly on{' '}
                    <a
                      href={site.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-line-strong underline-offset-4 hover:decoration-current"
                    >
                      GitHub
                    </a>
                    .
                  </span>
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col-reverse gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[28ch] text-xs leading-relaxed text-faint">Your details are used only to reply to this inquiry.</p>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={submitting ? 'sending' : 'idle'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2.5"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send inquiry
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
