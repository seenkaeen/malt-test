import { motion } from 'framer-motion'
import {
  Clock,
  ListChecks,
  Wrench,
  Star,
  Wallet,
  Briefcase,
  Sprout,
  ArrowUpRight,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Counter } from '../ui/Counter'
import { track } from '../../lib/analytics'

const benefits = [
  { Icon: Clock, title: 'Flexible jobs', desc: 'Work when it suits you — no fixed shifts.' },
  { Icon: ListChecks, title: 'Choose your services', desc: 'Offer only the jobs you do best.' },
  { Icon: Wrench, title: 'Use your own tools', desc: 'Your kit, your standards, your craft.' },
  { Icon: Star, title: 'Build your rating', desc: 'Great work brings more bookings.' },
  { Icon: Wallet, title: 'Weekly payouts', desc: 'Reliable payments, straight to your account.' },
  { Icon: Briefcase, title: 'Be your own boss', desc: 'Independent contractor — run it your way.' },
]

const bars = [38, 52, 44, 70, 60, 88, 64]

function PayoutCard() {
  return (
    <div className="relative w-full max-w-sm rounded-[1.75rem] bg-paper p-6 text-ink shadow-float">
      <span className="absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full bg-meadow px-3 py-1.5 text-xs font-bold text-ink shadow-card">
        <Counter to={80} suffix="%" /> to you
      </span>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">This week</p>
        <span className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-forest">
          Payout · Fri
        </span>
      </div>
      <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink tnum">
        <Counter to={420} decimals={2} prefix="€" locale />
      </p>
      <p className="mt-1 text-xs font-medium text-forest">
        <Counter to={18} prefix="+" suffix="%" /> vs last week ·{' '}
        <Counter to={12} /> jobs
      </p>

      <div className="mt-5 flex h-20 items-end gap-1.5" aria-hidden>
        {bars.map((h, i) => (
          <div key={i} className="flex-1">
            <div
              className={`w-full rounded-t-md ${
                i === bars.length - 2 ? 'bg-forest' : 'bg-meadow/60'
              }`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>

      <div className="rule-fade my-4" />

      <div className="space-y-2.5">
        {[
          { name: 'Lawn mowing', area: 'Kristiine', total: '€39', keep: '€31.20' },
          { name: 'Hedge trimming', area: 'Nõmme', total: '€48', keep: '€38.40' },
        ].map((j) => (
          <div key={j.name} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-forest">
              <Sprout className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{j.name}</p>
              <p className="text-[11px] text-muted">{j.area} · Tallinn</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-semibold text-ink tnum">{j.total}</p>
              <p className="text-[11px] text-forest tnum">you keep {j.keep}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Workers() {
  return (
    <section
      id="workers"
      aria-labelledby="workers-title"
      className="relative scroll-mt-24 overflow-hidden bg-forest-900 py-20 text-cream sm:py-24 lg:py-32 bg-grain"
    >
      <div className="spot-meadow pointer-events-none absolute inset-x-0 top-0 h-80" />
      <div className="aurora pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow tone="light">Work with Malt</Eyebrow>
            <h2 id="workers-title" className="mt-5 text-h2 text-cream">
              Run your own home-services business.
            </h2>
            <p className="mt-5 max-w-xl text-lead text-cream/65">
              Malt brings you steady, nearby work in Tallinn — you bring the
              skill. Keep{' '}
              <span className="font-semibold text-meadow-300">
                80% of every job
              </span>
              , set your own schedule and grow your rating.
            </p>

            <dl className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-meadow-300 ring-1 ring-white/10">
                    <b.Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-medium text-cream">{b.title}</dt>
                    <dd className="mt-0.5 text-sm text-cream/55">{b.desc}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="#waitlist"
                variant="secondary"
                size="lg"
                withArrow
                onClick={() => track('cta_apply_worker', { location: 'workers' })}
              >
                Apply as a worker
              </Button>
              <p className="text-sm text-cream/55">
                Independent contractor · You keep 80%
              </p>
            </div>
          </div>

          <Reveal className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ rotate: -2 }}
              whileHover={{ rotate: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <PayoutCard />
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
