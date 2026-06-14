import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ChevronLeft,
  Check,
  MapPin,
  Home,
  ShieldCheck,
  Star,
  CreditCard,
  Ban,
  Camera,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'
import { PhoneFrame, PhoneStatusBar } from '../illustrations/PhoneFrame'
import { ServiceArt } from '../illustrations/ServiceArt'
import { serviceIcon } from '../serviceIcons'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'
import { useParallax } from '../../lib/useParallax'

const AUTOPLAY_MS = 4200

/* ---------- shared screen chrome ---------- */
function ScreenShell({
  title,
  children,
  cta,
}: {
  title: string
  children: ReactNode
  cta: string
}) {
  return (
    <div className="flex h-full flex-col bg-canvas">
      <div className="flex items-center gap-2.5 px-4 pb-2 pt-1.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink shadow-soft">
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-[15px] font-semibold tracking-tight text-ink">
          {title}
        </p>
      </div>
      <div className="flex-1 overflow-hidden px-4">{children}</div>
      <div className="px-4 pb-6 pt-2">
        <div className="flex h-11 items-center justify-center rounded-full bg-forest text-sm font-semibold text-cream shadow-soft">
          {cta}
        </div>
      </div>
    </div>
  )
}

function Tile({ art }: { art: 'lawn' | 'window' | 'hedge' }) {
  const Icon = serviceIcon[art]
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest text-cream">
      <Icon className="h-[18px] w-[18px]" aria-hidden />
    </span>
  )
}

/* ---------- screens ---------- */
function ScreenService() {
  const rows = services.slice(0, 3)
  return (
    <ScreenShell title="Choose a service" cta="Continue">
      <p className="text-xs font-medium text-muted">Tallinn · Private house</p>
      <div className="mt-2.5 space-y-2">
        {rows.map((s, i) => {
          const sel = i === 0
          const art = s.art as 'lawn' | 'window' | 'hedge'
          return (
            <div
              key={s.id}
              className={`flex items-center gap-3 rounded-2xl border p-2.5 ${
                sel ? 'border-forest bg-meadow-50' : 'border-line bg-paper'
              }`}
            >
              <Tile art={art} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink">
                  {s.shortName}
                </p>
                <p className="text-[11px] text-muted tnum">{s.priceNote}</p>
              </div>
              {sel ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-cream">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
              ) : (
                <span className="h-5 w-5 rounded-full border border-line-strong" />
              )}
            </div>
          )
        })}
      </div>
    </ScreenShell>
  )
}

function ScreenAddress() {
  return (
    <ScreenShell title="Confirm address" cta="Continue">
      <div className="relative h-[148px] overflow-hidden rounded-2xl bg-mist">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-0 right-0 top-12 h-2 -rotate-6 bg-paper" />
          <div className="absolute left-0 right-0 top-24 h-3 rotate-3 bg-paper" />
          <div className="absolute bottom-0 left-16 top-0 w-2.5 rotate-6 bg-paper" />
          <div className="absolute bottom-0 right-10 top-0 w-2 -rotate-3 bg-paper" />
          <div className="absolute left-6 top-6 h-8 w-10 rounded bg-meadow-100" />
          <div className="absolute bottom-6 right-6 h-10 w-12 rounded bg-sand" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 rounded-full bg-forest/20 animate-pulse-ring" />
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-forest text-cream shadow-card">
            <MapPin className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-paper p-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-forest">
          <Home className="h-[18px] w-[18px]" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">
            Pärnasalu tee 14
          </p>
          <p className="text-[11px] text-muted">Mustamäe, 12915 Tallinn</p>
        </div>
      </div>
      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-meadow-50 px-3 py-1 text-[11px] font-semibold text-forest">
        <Check className="h-3 w-3" aria-hidden /> Tallinn transport included
      </div>
    </ScreenShell>
  )
}

function ScreenPrice() {
  return (
    <ScreenShell title="Your price" cta="Confirm & pay">
      <div className="mt-1 text-center">
        <p className="font-display text-[2.75rem] font-semibold leading-none tracking-tight text-ink tnum">
          €39
        </p>
        <p className="mt-1.5 text-[12px] text-muted">Lawn mowing · ~400 m²</p>
      </div>
      <div className="mt-4 space-y-2 rounded-2xl border border-line bg-paper p-3.5 text-[12px]">
        <Row label="Service" value="€35" />
        <Row label="Garden size" value="+€4" />
        <Row label="Tallinn transport" value="Included" accent />
        <div className="rule-fade my-1" />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-ink">Total</span>
          <span className="font-display text-base font-semibold text-ink tnum">
            €39
          </span>
        </div>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-muted">
        Final price is shown before you book.
      </p>
      <div className="mt-3 flex justify-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
          <Ban className="h-3 w-3" aria-hidden /> No cash
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
          <CreditCard className="h-3 w-3" aria-hidden /> Secure card
        </span>
      </div>
    </ScreenShell>
  )
}

function Row({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span
        className={`font-medium tnum ${accent ? 'text-forest' : 'text-ink'}`}
      >
        {value}
      </span>
    </div>
  )
}

function ScreenTime() {
  const days = ['Today', 'Tomorrow', 'Sat']
  const windows = ['08–10', '10–12', '12–14', '16–18']
  return (
    <ScreenShell title="Pick a time window" cta="Confirm time">
      <div className="flex gap-1.5">
        {days.map((d, i) => (
          <span
            key={d}
            className={`flex-1 rounded-full px-2 py-1.5 text-center text-[12px] font-semibold ${
              i === 1
                ? 'bg-forest text-cream'
                : 'border border-line bg-paper text-muted'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-2.5 space-y-2">
        {windows.map((w, i) => {
          const sel = i === 1
          return (
            <div
              key={w}
              className={`flex items-center justify-between rounded-2xl border p-3 text-[13px] ${
                sel ? 'border-forest bg-meadow-50' : 'border-line bg-paper'
              }`}
            >
              <span className="font-semibold text-ink tnum">{w}</span>
              {sel ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-cream">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
              ) : (
                <span className="h-5 w-5 rounded-full border border-line-strong" />
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-forest" aria-hidden />
        A verified worker is matched to your booking.
      </p>
    </ScreenShell>
  )
}

function ScreenDone() {
  return (
    <ScreenShell title="All done" cta="Leave a review">
      <div className="relative h-[150px] overflow-hidden rounded-2xl ring-1 ring-line">
        <ServiceArt art="lawn" className="absolute inset-0" />
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
          <Camera className="h-3 w-3" aria-hidden /> 2 photos
        </span>
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-cream">
          <Check className="h-3 w-3" aria-hidden /> Completed
        </span>
      </div>
      <p className="mt-3 text-[15px] font-semibold tracking-tight text-ink">
        Lawn mowing complete
      </p>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-[11px] font-semibold text-cream">
          MK
        </span>
        <div>
          <p className="text-[12px] font-medium text-ink">Marek K.</p>
          <p className="text-[11px] text-muted">41 min · Mustamäe</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-paper p-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-honey text-honey" aria-hidden />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-forest">
          <Check className="h-3 w-3" aria-hidden /> Paid €39
        </span>
      </div>
    </ScreenShell>
  )
}

const steps = [
  {
    title: 'Choose a service',
    desc: 'Pick from five home services, each with a clear starting price.',
    Screen: ScreenService,
  },
  {
    title: 'Confirm your address',
    desc: 'Tell us where. Tallinn transport is always included.',
    Screen: ScreenAddress,
  },
  {
    title: 'See the price',
    desc: 'Get the full price for your home — before you commit to anything.',
    Screen: ScreenPrice,
  },
  {
    title: 'Pick a time window',
    desc: 'Choose a suggested slot that fits your week.',
    Screen: ScreenTime,
  },
  {
    title: 'A worker completes the job',
    desc: 'They arrive with their own tools and finish with completion photos.',
    Screen: ScreenDone,
  },
]

export function AppPreview() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { ref: phoneRef, y: phoneY } = useParallax<HTMLDivElement>(48)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      AUTOPLAY_MS,
    )
    return () => clearTimeout(t)
  }, [active, reduce])

  const select = (i: number) => {
    setActive(i)
    track('app_preview_step_change', { step: i, title: steps[i].title })
  }

  const Screen = steps[active].Screen

  return (
    <section
      id="app"
      aria-labelledby="app-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-cream sm:py-24 lg:py-32 bg-grain"
    >
      <div className="spot-meadow pointer-events-none absolute inset-x-0 top-0 h-80" />
      <div className="aurora pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="light">The Malt app</Eyebrow>
          <h2 id="app-title" className="mt-5 text-h2 text-cream">
            Your whole home, handled from one app.
          </h2>
          <p className="mt-5 max-w-xl text-lead text-cream/65">
            From the first tap to completion photos, Malt keeps every booking
            simple, transparent and on your schedule. Here&apos;s the flow.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* steps */}
          <ol className="order-2 space-y-2.5 lg:order-1">
            {steps.map((s, i) => {
              const on = i === active
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={on}
                    className={`w-full rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                      on
                        ? 'border-meadow/30 bg-white/[0.07]'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                          on ? 'bg-meadow text-ink' : 'bg-white/10 text-cream'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium tracking-tight text-cream">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm text-cream/55">{s.desc}</p>
                        {on && !reduce && (
                          <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              key={active}
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{
                                duration: AUTOPLAY_MS / 1000,
                                ease: 'linear',
                              }}
                              className="h-full bg-meadow"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* phone */}
          <div
            ref={phoneRef}
            className="order-1 flex justify-center lg:order-2"
            aria-hidden
          >
            <motion.div style={{ y: phoneY }} className="will-change-transform">
              <PhoneFrame>
              <PhoneStatusBar />
              <div className="relative h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>
              </PhoneFrame>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
