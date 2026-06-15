import { useRef, type MouseEvent } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'
import {
  Sprout,
  MapPin,
  ShieldCheck,
  Star,
  Check,
  Clock,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Magnetic } from '../ui/Magnetic'
import { Eyebrow } from '../ui/Eyebrow'
import { HomeScene } from '../illustrations/HomeScene'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}
const wordsParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
}
const word = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}

const titleLead = ['Malt', 'brings', 'home', 'services', 'to', 'your']

function BookingCard() {
  return (
    <div className="w-[250px] rounded-3xl border border-line bg-paper/95 p-4 shadow-float backdrop-blur-sm sm:w-[280px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Booking summary
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-forest">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-meadow animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-meadow" />
          </span>
          Available today
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-mist/70 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-cream">
          <Sprout className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Lawn mowing</p>
          <p className="truncate text-xs text-muted">Front &amp; back · ~400 m²</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 text-xs text-muted">
        <MapPin className="h-3.5 w-3.5 text-forest" aria-hidden />
        Mustamäe, Tallinn
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-muted" aria-hidden />
        <span className="rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-cream">
          Tomorrow 10–12
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
          Sat AM
        </span>
      </div>

      <div className="rule-fade my-3.5" />

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-ink">Total</p>
          <p className="text-[11px] text-muted">Shown before you book</p>
        </div>
        <p className="font-display text-2xl font-semibold tracking-tight text-ink tnum">
          €39
        </p>
      </div>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        className="mt-3 h-11 w-full rounded-full bg-forest text-sm font-semibold text-cream shadow-soft"
      >
        Confirm booking
      </button>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const sceneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80])
  const sceneScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.08],
  )
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -46])
  const chipY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -86])
  const badgeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36])

  // gentle pointer parallax on the scene
  const mvx = useMotionValue(0)
  const mvy = useMotionValue(0)
  const px = useSpring(mvx, { stiffness: 150, damping: 20, mass: 0.4 })
  const py = useSpring(mvy, { stiffness: 150, damping: 20, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mvx.set(((e.clientX - r.left) / r.width - 0.5) * 22)
    mvy.set(((e.clientY - r.top) / r.height - 0.5) * 22)
  }
  const onLeave = () => {
    mvx.set(0)
    mvy.set(0)
  }

  return (
    <section
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* soft ambient wash — slowly drifting for subtle life */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-meadow-100 opacity-50 blur-3xl animate-drift will-change-transform" />
        <div className="absolute top-40 left-[-12%] h-[420px] w-[420px] rounded-full bg-sand opacity-50 blur-3xl animate-drift-slow will-change-transform" />
        <div
          className="absolute bottom-[-12%] left-[34%] h-[360px] w-[360px] rounded-full bg-honey-100 opacity-30 blur-3xl animate-drift will-change-transform"
          style={{ animationDelay: '-13s' }}
        />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* ── Copy ── */}
          <motion.div
            variants={container}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="max-w-xl"
          >
            <motion.div variants={item}>
              <Eyebrow>Home services · Tallinn</Eyebrow>
            </motion.div>

            <motion.h1
              variants={wordsParent}
              id="hero-title"
              className="mt-5 text-display text-ink"
            >
              {titleLead.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="mr-[0.24em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                variants={word}
                className="inline-block italic text-forest"
              >
                doorstep.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-lead text-muted"
            >
              Book verified independent workers for lawn mowing, window washing,
              hedge trimming, snow removal and pressure washing — ordered in
              seconds. Launching first in&nbsp;Tallinn.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <Button
                  href="#waitlist"
                  size="lg"
                  withArrow
                  onClick={() =>
                    track('cta_join_early_access', { location: 'hero' })
                  }
                >
                  Join early access
                </Button>
              </Magnetic>
              <Magnetic strength={0.16}>
                <Button
                  href="#workers"
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    track('cta_work_with_malt', { location: 'hero' })
                  }
                >
                  Work with Malt
                </Button>
              </Magnetic>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
            >
              {['Verified workers', 'Cashless payments', 'Price before you book'].map(
                (t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-forest" aria-hidden />
                    {t}
                  </li>
                ),
              )}
            </motion.ul>
          </motion.div>

          {/* ── Visual ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
          >
            <motion.div
              style={{ y: sceneY, scale: sceneScale }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-grain shadow-float ring-1 ring-line will-change-transform sm:aspect-[5/6]"
            >
              <motion.div style={{ x: px, y: py }} className="absolute inset-0">
                <HomeScene className="absolute inset-0 h-full w-full scale-105" />
              </motion.div>
            </motion.div>

            {/* rating chip */}
            <motion.div
              style={{ y: chipY }}
              className="absolute -right-2 top-6 sm:right-4"
            >
              <div className="flex items-center gap-2 rounded-full border border-line bg-paper/95 py-2 pl-2 pr-3.5 shadow-card backdrop-blur-sm animate-float">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-semibold text-cream">
                  MK
                </span>
                <div className="leading-tight">
                  <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                    <Star className="h-3.5 w-3.5 fill-honey text-honey" aria-hidden />
                    4.9
                  </p>
                  <p className="text-[11px] text-muted">Verified worker</p>
                </div>
              </div>
            </motion.div>

            {/* price badge */}
            <motion.div
              style={{ y: badgeY }}
              className="absolute right-2 top-1/2 hidden sm:block"
            >
              <div
                className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-meadow-50 px-3 py-1.5 text-xs font-semibold text-forest shadow-soft animate-float-slow"
                style={{ animationDelay: '0.8s' }}
              >
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Price upfront
              </div>
            </motion.div>

            {/* booking card */}
            <motion.div
              style={{ y: cardY }}
              className="absolute -bottom-6 -left-2 sm:-left-6"
            >
              <div className="animate-float-slow">
                <BookingCard />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
