import { motion } from 'framer-motion'
import { ArrowUpRight, Sun, Snowflake, CalendarDays, Check } from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Spotlight } from '../ui/Spotlight'
import { ServiceArt } from '../illustrations/ServiceArt'
import { services, type Service } from '../../data/services'
import { staggerParent, childUp } from '../../lib/motion'
import { useSpotlight } from '../../lib/useSpotlight'
import { track } from '../../lib/analytics'

function SeasonTag({ season }: { season: Service['season'] }) {
  const map = {
    summer: {
      cls: 'border-honey/30 bg-honey-100 text-[#9a6a1f]',
      Icon: Sun,
      label: 'Summer',
    },
    winter: {
      cls: 'border-sky-200 bg-sky-50 text-sky-700',
      Icon: Snowflake,
      label: 'Winter',
    },
    all: {
      cls: 'border-forest/15 bg-meadow-50 text-forest',
      Icon: CalendarDays,
      label: 'All seasons',
    },
  }[season]
  const { Icon } = map
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${map.cls}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {map.label}
    </span>
  )
}

const cardBase =
  'group/spot group card-surface relative flex flex-col overflow-hidden rounded-3xl transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-glow focus-visible:-translate-y-1'

function ServiceCard({ service }: { service: Service }) {
  const onMove = useSpotlight()
  return (
    <motion.a
      variants={childUp}
      href="#waitlist"
      onMouseMove={onMove}
      onClick={() =>
        track('service_card_click', { service: service.id, featured: false })
      }
      className={cardBase}
    >
      <Spotlight />
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
          <ServiceArt art={service.art} className="h-full w-full" />
        </div>
        <span className="absolute left-3 top-3">
          <SeasonTag season={service.season} />
        </span>
      </div>
      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="text-h3 text-ink">{service.shortName}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {service.blurb}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-lg font-semibold tracking-tight text-ink tnum">
            {service.priceNote}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Book
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

function FeatureCard({ service }: { service: Service }) {
  const onMove = useSpotlight()
  return (
    <motion.a
      variants={childUp}
      href="#waitlist"
      onMouseMove={onMove}
      onClick={() =>
        track('service_card_click', { service: service.id, featured: true })
      }
      className={`${cardBase} sm:col-span-2 lg:col-span-2`}
    >
      <Spotlight />
      <div className="relative grid sm:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-[300px]">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
            <ServiceArt art={service.art} className="h-full w-full" />
          </div>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
            Most booked
          </span>
        </div>
        <div className="flex flex-col p-6 sm:p-7">
          <SeasonTag season={service.season} />
          <h3 className="mt-3 text-h3 text-ink">{service.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {service.blurb}
          </p>
          <ul className="mt-4 space-y-1.5">
            {['Clean, even cut & edges', 'Clippings cleared away', 'One-off or weekly'].map(
              (f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-ink/80"
                >
                  <Check className="h-4 w-4 text-forest" aria-hidden />
                  {f}
                </li>
              ),
            )}
          </ul>
          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="font-display text-xl font-semibold tracking-tight text-ink tnum">
              {service.priceNote}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Book
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export function Services() {
  const [feature, ...rest] = services
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Services</Eyebrow>
            <h2 id="services-title" className="mt-5 text-h2 text-ink">
              Five services, one tap away.
            </h2>
          </div>
          <p className="max-w-md text-muted md:text-right">
            Starting prices below. The final price depends on the size and area
            of your home — and you always see it before you book.
          </p>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          <FeatureCard service={feature} />
          {rest.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted">
          Minimum order €30 · Tallinn transport included · Secure cashless
          payment
        </p>
      </Container>
    </section>
  )
}
