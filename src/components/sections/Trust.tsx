import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Star,
  CreditCard,
  Camera,
  LifeBuoy,
  MapPin,
  Check,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'
import { ServiceArt } from '../illustrations/ServiceArt'
import { staggerParent, childUp } from '../../lib/motion'
import { useParallax } from '../../lib/useParallax'

const pillars = [
  {
    Icon: BadgeCheck,
    title: 'Verified workers',
    desc: 'Every worker is identity-verified before they can take a single job.',
  },
  {
    Icon: Star,
    title: 'Rated providers',
    desc: 'Public ratings from real, completed work — so quality stays high.',
  },
  {
    Icon: CreditCard,
    title: 'Secure cashless payments',
    desc: 'Pay in-app on a card. No cash, no tips — the agreed price is the price.',
  },
  {
    Icon: Camera,
    title: 'Completion photos',
    desc: 'Each finished job comes with photos, sent straight to your phone.',
  },
  {
    Icon: LifeBuoy,
    title: 'Support & refunds',
    desc: 'Something off? In-app support and a clear refund flow have your back.',
  },
  {
    Icon: MapPin,
    title: 'Tallinn service area',
    desc: 'Focused on getting Tallinn right first — transport always included.',
  },
]

const guarantees = [
  'Identity-verified worker',
  'Photos delivered on completion',
  'Card payment, fully cashless',
  'Refund protection if it’s not right',
]

export function Trust() {
  const { ref: bannerRef, y: bannerY } = useParallax<HTMLDivElement>(28)
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Trust &amp; safety</Eyebrow>
          <h2 id="trust-title" className="mt-5 text-h2 text-ink">
            Trust, built into every booking.
          </h2>
          <p className="mt-5 text-lead text-muted">
            Inviting someone to your home is a big deal. Malt is designed so you
            feel safe before, during and after the job.
          </p>
        </Reveal>

        {/* proof banner */}
        <Reveal className="mt-12">
          <div className="card-surface grid overflow-hidden rounded-[1.75rem] md:grid-cols-2">
            <div ref={bannerRef} className="relative min-h-[220px] overflow-hidden">
              <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-110">
                <ServiceArt art="window" className="h-full w-full" />
              </motion.div>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-cream">
                <Check className="h-3.5 w-3.5" aria-hidden /> Completed
              </span>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-cream backdrop-blur-sm">
                <Camera className="h-3.5 w-3.5" aria-hidden /> 2 photos
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <h3 className="text-h3 text-ink">Every job ends with proof.</h3>
              <p className="mt-2 text-muted">
                You see who&apos;s coming, what was done and exactly what you
                paid — with support if anything isn&apos;t right.
              </p>
              <ul className="mt-5 space-y-2.5">
                {guarantees.map((g) => (
                  <li
                    key={g}
                    className="flex items-center gap-3 text-sm font-medium text-ink/85"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-meadow-100 text-forest">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* pillars */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={childUp}
              className="card-surface rounded-3xl p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-meadow-50 text-forest">
                <p.Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
