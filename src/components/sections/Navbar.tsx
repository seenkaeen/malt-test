import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, MapPin } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { navLinks } from '../../data/site'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-canvas/85 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container>
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]"
        >
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="rounded-lg focus-visible:outline-forest"
              aria-label="Malt — home"
            >
              <Logo />
            </a>
            <span className="hidden items-center gap-1 rounded-full border border-line bg-cream/70 px-2.5 py-1 text-xs font-medium text-muted sm:inline-flex">
              <MapPin className="h-3 w-3 text-forest" aria-hidden />
              Tallinn
            </span>
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/[0.05] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 md:flex">
            <Button
              href="#workers"
              variant="ghost"
              onClick={() => track('cta_work_with_malt', { location: 'navbar' })}
            >
              Work with Malt
            </Button>
            <Button
              href="#waitlist"
              variant="primary"
              onClick={() => track('cta_join_early_access', { location: 'navbar' })}
            >
              Join early access
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream/70 text-ink transition-colors hover:bg-cream md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <Container className="py-5">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/[0.05]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  href="#workers"
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    track('cta_work_with_malt', { location: 'mobile_menu' })
                    setOpen(false)
                  }}
                >
                  Work with Malt
                </Button>
                <Button
                  href="#waitlist"
                  variant="primary"
                  size="lg"
                  withArrow
                  onClick={() => {
                    track('cta_join_early_access', { location: 'mobile_menu' })
                    setOpen(false)
                  }}
                >
                  Join early access
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
