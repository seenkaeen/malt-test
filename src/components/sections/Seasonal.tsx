import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sun, Snowflake } from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'
import { SeasonScene } from '../illustrations/SeasonScene'
import { serviceIcon } from '../serviceIcons'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'

type SeasonKey = 'summer' | 'winter'

const copy: Record<SeasonKey, { title: string; body: string }> = {
  summer: {
    title: 'Summer in Tallinn',
    body: 'When the days stretch out, Malt keeps your garden sharp — fresh-cut lawns, shaped hedges and pressure-washed terraces, all season long.',
  },
  winter: {
    title: 'Winter in Tallinn',
    body: 'When the snow arrives, Malt clears the way — driveways, paths and steps handled before your morning starts, all winter long.',
  },
}

function chipsFor(season: SeasonKey) {
  return services.filter((s) =>
    season === 'summer'
      ? s.season === 'summer' || s.season === 'all'
      : s.season === 'winter' || s.season === 'all',
  )
}

export function Seasonal() {
  const [season, setSeason] = useState<SeasonKey>('summer')
  const chips = chipsFor(season)

  const change = (s: SeasonKey) => {
    if (s === season) return
    setSeason(s)
    track('seasonal_toggle', { season: s })
  }

  return (
    <section
      id="seasonal"
      aria-labelledby="seasonal-title"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Seasonal</Eyebrow>
          </div>
          <h2 id="seasonal-title" className="mt-5 text-h2 text-ink">
            Built for every Estonian season.
          </h2>
          <p className="mt-5 text-lead text-muted">
            One app, all year round. Malt shifts with the seasons so your home
            is cared for — rain, shine or snow.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] shadow-float ring-1 ring-line">
              <div className="aspect-[4/3] sm:aspect-[3/2]">
                <SeasonScene season={season} className="h-full w-full" />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            {/* toggle */}
            <div
              className="inline-flex rounded-full bg-mist p-1"
              role="group"
              aria-label="Choose a season"
            >
              {(['summer', 'winter'] as const).map((s) => {
                const on = s === season
                const Icon = s === 'summer' ? Sun : Snowflake
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => change(s)}
                    aria-pressed={on}
                    className="relative rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    {on && (
                      <motion.span
                        layoutId="seasonToggle"
                        className="absolute inset-0 rounded-full bg-forest shadow-soft"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 inline-flex items-center gap-1.5 capitalize transition-colors ${
                        on ? 'text-cream' : 'text-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {s}
                    </span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={season}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="mt-7 text-h3 text-ink">{copy[season].title}</h3>
                <p className="mt-3 max-w-md text-muted">{copy[season].body}</p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {chips.map((c) => {
                    const Icon = serviceIcon[c.art]
                    return (
                      <li key={c.id}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper py-2 pl-2.5 pr-3.5 text-sm font-medium text-ink shadow-soft">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-meadow-50 text-forest">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          {c.shortName}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
