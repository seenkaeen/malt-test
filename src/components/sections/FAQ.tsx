import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { faqs } from '../../data/faqs'
import { track } from '../../lib/analytics'
import { EASE } from '../../lib/motion'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  const toggle = (i: number) => {
    const next = open === i ? null : i
    setOpen(next)
    track('faq_toggle', { index: i, open: next === i })
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="faq-title" className="mt-5 text-h2 text-ink">
              Good to know.
            </h2>
            <p className="mt-5 text-muted">
              Everything about how Malt works in Tallinn. Still curious? We&apos;re
              happy to help.
            </p>
            <Button
              href="mailto:hello@malt.ee"
              variant="secondary"
              className="mt-6"
            >
              Ask us anything
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-t border-line">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <div key={f.q} className="border-b border-line">
                    <dt>
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        className="flex w-full items-center justify-between gap-5 py-5 text-left"
                      >
                        <span className="text-base font-medium text-ink sm:text-lg">
                          {f.q}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? 'rotate-45 border-forest bg-forest text-cream'
                              : 'border-line text-ink'
                          }`}
                        >
                          <Plus className="h-4 w-4" aria-hidden />
                        </span>
                      </button>
                    </dt>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          key="content"
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-btn-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pr-6 text-muted">{f.a}</p>
                        </motion.dd>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
