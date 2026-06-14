export const SITE = {
  name: 'Malt',
  domain: 'malt.ee',
  email: 'hello@malt.ee',
  support: 'support@malt.ee',
  city: 'Tallinn',
  tagline: 'Trusted home services to your doorstep.',
}

export const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Trust & safety', href: '#trust' },
  { label: 'For workers', href: '#workers' },
  { label: 'FAQ', href: '#faq' },
]

/** Tallinn districts for the early-access form. */
export const tallinnAreas = [
  'Kesklinn (City Centre)',
  'Põhja-Tallinn',
  'Kristiine',
  'Mustamäe',
  'Lasnamäe',
  'Haabersti',
  'Nõmme',
  'Pirita',
  'Near Tallinn',
]

export const roles = ['Customer', 'Worker', 'Partner'] as const
export type Role = (typeof roles)[number]
