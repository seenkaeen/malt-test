import { useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { serviceIcon } from '../serviceIcons'
import { services } from '../../data/services'
import { tallinnAreas, roles, type Role } from '../../data/site'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  phone: string
  role: Role
  area: string
  services: string[]
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  role: 'Customer',
  area: '',
  services: [],
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Mock submission. Replace with your backend:
 *   await fetch('/api/waitlist', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   })
 * To preview the error state, submit with an address ending in "@error.test".
 */
function submitWaitlist(payload: FormState): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email.trim().toLowerCase().endsWith('@error.test')) {
        reject(new Error('Simulated failure'))
      } else {
        resolve()
      }
    }, 1500)
  })
}

const reassurances = [
  'Priority access the moment booking goes live',
  'Launch pricing for your Tallinn area',
  'One email when we’re ready — no spam, ever',
]

export function Waitlist() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  )

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const areaRef = useRef<HTMLSelectElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleService = (id: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }))

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) e.email = 'Please enter your email.'
    else if (!isEmail(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.area) e.area = 'Please choose your area.'
    return e
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (status === 'submitting') return

    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      if (e.name) nameRef.current?.focus()
      else if (e.email) emailRef.current?.focus()
      else if (e.area) areaRef.current?.focus()
      return
    }

    setStatus('submitting')
    track('waitlist_submit', {
      role: form.role,
      area: form.area,
      services: form.services,
      hasPhone: Boolean(form.phone),
    })

    try {
      await submitWaitlist(form)
      setStatus('success')
      track('waitlist_success', { role: form.role, area: form.area })
      requestAnimationFrame(() => successRef.current?.focus())
    } catch {
      setStatus('error')
      track('waitlist_error', { role: form.role, area: form.area })
    }
  }

  function reset() {
    setForm(initial)
    setErrors({})
    setStatus('idle')
  }

  const inputBase =
    'mt-1.5 h-12 w-full rounded-2xl border bg-paper px-4 text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted-light focus:border-forest focus:ring-4 focus:ring-meadow-100'

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative scroll-mt-24 border-t border-line bg-cream py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* copy */}
          <Reveal className="lg:pt-4">
            <Eyebrow>Early access</Eyebrow>
            <h2 id="waitlist-title" className="mt-5 text-h2 text-ink">
              Be first when Malt opens in Tallinn.
            </h2>
            <p className="mt-5 text-lead text-muted">
              Join the early-access list and we&apos;ll let you know the moment
              you can book — or start taking jobs as a worker.
            </p>
            <ul className="mt-8 space-y-3.5">
              {reassurances.map((r) => (
                <li key={r} className="flex items-center gap-3 text-ink/85">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-meadow-100 text-forest">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-muted">
              <Sparkles className="h-4 w-4 text-forest" aria-hidden />
              Customers, workers &amp; partners all welcome
            </p>
          </Reveal>

          {/* form card */}
          <Reveal delay={0.1}>
            <div className="card-surface rounded-[1.75rem] p-6 shadow-card sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-meadow-100 text-forest">
                      <CheckCircle2 className="h-8 w-8" aria-hidden />
                    </span>
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-6 text-h3 text-ink outline-none"
                    >
                      You&apos;re on the list{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
                    </h3>
                    <p className="mt-3 max-w-sm text-muted">
                      Thanks for joining. We&apos;ll email you at{' '}
                      <span className="font-medium text-ink">{form.email}</span>{' '}
                      the moment Malt opens
                      {form.area ? ` in ${form.area}` : ' in Tallinn'}.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 text-sm font-semibold text-forest underline-offset-4 hover:underline"
                    >
                      Add another response
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={onSubmit}
                    noValidate
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label htmlFor="wl-name" className="text-sm font-medium text-ink">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          id="wl-name"
                          ref={nameRef}
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                          aria-required="true"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'wl-name-err' : undefined}
                          className={`${inputBase} ${errors.name ? 'border-danger' : 'border-line'}`}
                          placeholder="Liis Tamm"
                        />
                        {errors.name && (
                          <p id="wl-name-err" className="mt-1 flex items-center gap-1 text-xs text-danger">
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-1">
                        <label htmlFor="wl-email" className="text-sm font-medium text-ink">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          id="wl-email"
                          ref={emailRef}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                          aria-required="true"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'wl-email-err' : undefined}
                          className={`${inputBase} ${errors.email ? 'border-danger' : 'border-line'}`}
                          placeholder="liis@example.com"
                        />
                        {errors.email && (
                          <p id="wl-email-err" className="mt-1 flex items-center gap-1 text-xs text-danger">
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-1">
                        <label htmlFor="wl-phone" className="text-sm font-medium text-ink">
                          Phone{' '}
                          <span className="font-normal text-muted-light">(optional)</span>
                        </label>
                        <input
                          id="wl-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          className={`${inputBase} border-line`}
                          placeholder="+372 5xxx xxxx"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label htmlFor="wl-area" className="text-sm font-medium text-ink">
                          Tallinn area <span className="text-danger">*</span>
                        </label>
                        <select
                          id="wl-area"
                          ref={areaRef}
                          value={form.area}
                          onChange={(e) => set('area', e.target.value)}
                          aria-required="true"
                          aria-invalid={Boolean(errors.area)}
                          aria-describedby={errors.area ? 'wl-area-err' : undefined}
                          className={`${inputBase} appearance-none pr-10 ${errors.area ? 'border-danger' : 'border-line'}`}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2351605a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.1rem',
                          }}
                        >
                          <option value="" disabled>
                            Select your area
                          </option>
                          {tallinnAreas.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                        {errors.area && (
                          <p id="wl-area-err" className="mt-1 flex items-center gap-1 text-xs text-danger">
                            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                            {errors.area}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* role */}
                    <fieldset className="mt-5">
                      <legend className="text-sm font-medium text-ink">I&apos;m a…</legend>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {roles.map((r) => {
                          const on = form.role === r
                          return (
                            <label
                              key={r}
                              className={`flex cursor-pointer items-center justify-center rounded-2xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
                                on
                                  ? 'border-forest bg-meadow-50 text-forest'
                                  : 'border-line bg-paper text-muted hover:border-line-strong'
                              }`}
                            >
                              <input
                                type="radio"
                                name="role"
                                value={r}
                                checked={on}
                                onChange={() => set('role', r)}
                                className="sr-only"
                              />
                              {r}
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>

                    {/* services */}
                    <fieldset className="mt-5">
                      <legend className="text-sm font-medium text-ink">
                        Interested services{' '}
                        <span className="font-normal text-muted-light">(optional)</span>
                      </legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {services.map((s) => {
                          const on = form.services.includes(s.id)
                          const Icon = serviceIcon[s.art]
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => toggleService(s.id)}
                              aria-pressed={on}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                                on
                                  ? 'border-forest bg-forest text-cream'
                                  : 'border-line bg-paper text-muted hover:border-line-strong'
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" aria-hidden />
                              {s.shortName}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    {/* error banner */}
                    <div aria-live="polite">
                      {status === 'error' && (
                        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-danger-border bg-danger-bg px-4 py-3 text-sm text-danger">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                          <span>
                            Something went wrong on our end. Please try again — if
                            it keeps happening, email{' '}
                            <a href="mailto:hello@malt.ee" className="font-semibold underline">
                              hello@malt.ee
                            </a>
                            .
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      withArrow
                      loading={status === 'submitting'}
                      className="mt-6 w-full"
                    >
                      {status === 'submitting' ? 'Joining…' : 'Join early access'}
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted">
                      By joining you agree to our{' '}
                      <a href="#" className="underline underline-offset-2 hover:text-ink">
                        Terms
                      </a>{' '}
                      and{' '}
                      <a href="#" className="underline underline-offset-2 hover:text-ink">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
