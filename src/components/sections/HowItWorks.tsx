import { Sprout, MapPin, CalendarClock, BadgeCheck } from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'

const steps = [
  {
    Icon: Sprout,
    title: 'Choose a service',
    desc: 'Pick lawn mowing, window washing, hedge trimming, snow removal or pressure washing.',
  },
  {
    Icon: MapPin,
    title: 'Confirm your address',
    desc: 'Add your Tallinn home. Transport is always included in the price.',
  },
  {
    Icon: CalendarClock,
    title: 'Pick a time window',
    desc: 'Choose from suggested slots that fit your week — and see the price first.',
  },
  {
    Icon: BadgeCheck,
    title: 'A verified worker arrives',
    desc: 'They bring their own tools, complete the job and finish with photos.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative scroll-mt-24 border-y border-line bg-cream py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>How it works</Eyebrow>
          </div>
          <h2 id="how-title" className="mt-5 text-h2 text-ink">
            Booked in under a minute.
          </h2>
          <p className="mt-5 text-lead text-muted">
            No calls, no quotes, no waiting around. Four simple steps from your
            phone to a finished job.
          </p>
        </Reveal>

        <div className="relative mt-14 lg:mt-20">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-line-strong lg:block"
            aria-hidden
          />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.08}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-cream shadow-soft">
                  <s.Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                  Step {i + 1}
                </span>
                <h3 className="mt-1.5 text-h3 text-ink">{s.title}</h3>
                <p className="mt-2 max-w-xs text-muted lg:max-w-none">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
