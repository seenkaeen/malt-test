import { MapPin } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Logo } from '../brand/Logo'
import {
  AppleGlyph,
  GooglePlayGlyph,
  XGlyph,
  InstagramGlyph,
  LinkedInGlyph,
  FacebookGlyph,
} from '../brand/icons'
import { SITE } from '../../data/site'
import { track } from '../../lib/analytics'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Services', href: '#services' },
      { label: 'Trust & safety', href: '#trust' },
      { label: 'Seasonal', href: '#seasonal' },
    ],
  },
  {
    title: 'For workers',
    links: [
      { label: 'Apply as a worker', href: '#waitlist' },
      { label: 'Weekly payouts', href: '#workers' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: 'mailto:hello@malt.ee' },
      { label: 'Support', href: 'mailto:support@malt.ee' },
      { label: 'Early access', href: '#waitlist' },
    ],
  },
]

const socials = [
  { label: 'Malt on X', Glyph: XGlyph },
  { label: 'Malt on Instagram', Glyph: InstagramGlyph },
  { label: 'Malt on LinkedIn', Glyph: LinkedInGlyph },
  { label: 'Malt on Facebook', Glyph: FacebookGlyph },
]

function StoreBadge({
  Glyph,
  small,
  big,
}: {
  Glyph: ({ className }: { className?: string }) => JSX.Element
  small: string
  big: string
}) {
  return (
    <span
      className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-cream"
      aria-label={`${big} — coming soon`}
      title="Coming soon"
    >
      <Glyph className="h-6 w-6 text-cream" />
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-cream/55">
          {small}
        </span>
        <span className="block text-sm font-semibold">{big}</span>
      </span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream bg-grain">
      {/* final CTA band */}
      <div className="border-b border-white/10">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center lg:py-16">
            <h2 className="max-w-lg text-h2 text-cream">
              Hand off the home to-do list.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href="#waitlist"
                size="lg"
                withArrow
                onClick={() =>
                  track('cta_join_early_access', { location: 'footer' })
                }
              >
                Join early access
              </Button>
              <Button
                href="#workers"
                variant="light"
                size="lg"
                onClick={() => track('cta_work_with_malt', { location: 'footer' })}
              >
                Work with Malt
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* main footer */}
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8 lg:py-16">
          <div className="max-w-sm">
            <Logo variant="cream" />
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              Malt brings trusted, verified home services to your doorstep —
              ordered in seconds. Launching first in Tallinn, expanding across
              Estonia.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-cream/60">
              <MapPin className="h-4 w-4 text-meadow-300" aria-hidden />
              Tallinn, Estonia
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <StoreBadge Glyph={AppleGlyph} small="Coming soon" big="App Store" />
              <StoreBadge
                Glyph={GooglePlayGlyph}
                small="Coming soon"
                big="Google Play"
              />
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-cream">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-white/10 py-7 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 text-center text-xs text-cream/50 sm:items-start sm:text-left">
            <p>© {new Date().getFullYear()} Malt. Made in Tallinn, Estonia.</p>
            <p>
              Independent workers operate as contractors. Service availability
              varies by season and area.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-sm">
              <a href="#" className="text-cream/60 transition-colors hover:text-cream">
                Terms
              </a>
              <span className="text-cream/25" aria-hidden>
                ·
              </span>
              <a href="#" className="text-cream/60 transition-colors hover:text-cream">
                Privacy
              </a>
            </div>
            <div className="flex items-center gap-2">
              {socials.map(({ label, Glyph }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-white/30 hover:text-cream"
                >
                  <Glyph className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
