import { Sprout } from 'lucide-react'

const items = [
  'Lawn mowing',
  'Window washing',
  'Hedge trimming',
  'Snow removal',
  'Pressure washing',
  'Now serving Tallinn',
]

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={it} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-sm font-medium tracking-tight text-ink/65">
            {it}
          </span>
          <Sprout className="h-3.5 w-3.5 shrink-0 text-meadow" aria-hidden />
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-cream py-3.5"
      aria-hidden="true"
    >
      <div className="marquee-track hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent sm:w-32" />
    </div>
  )
}
