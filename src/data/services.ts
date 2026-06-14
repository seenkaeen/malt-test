export type Season = 'summer' | 'winter' | 'all'
export type ServiceArt = 'lawn' | 'window' | 'hedge' | 'snow' | 'pressure'

export interface Service {
  id: string
  name: string
  shortName: string
  from: number
  priceNote: string
  season: Season
  seasonLabel: string
  blurb: string
  art: ServiceArt
}

export const services: Service[] = [
  {
    id: 'lawn-mowing',
    name: 'Lawn mowing',
    shortName: 'Lawn mowing',
    from: 35,
    priceNote: 'from €35',
    season: 'summer',
    seasonLabel: 'Summer',
    blurb:
      'A crisp, even cut with clean edges. Clippings cleared and your lawn left tidy — one-off or on a weekly rhythm.',
    art: 'lawn',
  },
  {
    id: 'window-washing',
    name: 'Private-house window washing',
    shortName: 'Window washing',
    from: 30,
    priceNote: 'from €30 min. order',
    season: 'all',
    seasonLabel: 'All seasons',
    blurb:
      'Streak-free glass inside and out, with frames and sills wiped down. Built for private houses, not high-rises.',
    art: 'window',
  },
  {
    id: 'hedge-trimming',
    name: 'Hedge trimming',
    shortName: 'Hedge trimming',
    from: 35,
    priceNote: 'from €35',
    season: 'summer',
    seasonLabel: 'Summer',
    blurb:
      'Level, well-shaped hedges and shrubs. Trimmings bagged and taken away, edges tidied around beds and paths.',
    art: 'hedge',
  },
  {
    id: 'snow-removal',
    name: 'Snow removal',
    shortName: 'Snow removal',
    from: 35,
    priceNote: 'from €35',
    season: 'winter',
    seasonLabel: 'Winter',
    blurb:
      'Cleared driveways, paths and steps, booked around the next snowfall so you wake up to a clear way out.',
    art: 'snow',
  },
  {
    id: 'pressure-washing',
    name: 'Pressure washing',
    shortName: 'Pressure washing',
    from: 45,
    priceNote: 'from €45',
    season: 'summer',
    seasonLabel: 'Summer',
    blurb:
      'Driveways, terraces, façades and patios brought back to fresh — grime, moss and winter grey lifted away.',
    art: 'pressure',
  },
]
