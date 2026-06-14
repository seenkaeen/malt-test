# Malt — marketing website

> Trusted home services to your doorstep. Launching in Tallinn, Estonia.

A premium, production-ready public website for **Malt**, a Bolt-style on-demand
platform that connects Tallinn households with verified independent workers for
outdoor & home maintenance — lawn mowing, private-house window washing, hedge
trimming, snow removal and pressure washing.

This is the **marketing site only** (explain the product, build trust, collect
early-access interest). It is not the booking app.

---

## Tech stack

| Concern    | Choice                                                |
| ---------- | ----------------------------------------------------- |
| Build      | [Vite 6](https://vite.dev) + React 18 + TypeScript    |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (`@theme`) |
| Motion     | [Framer Motion](https://www.framer.com/motion/)       |
| Icons      | [Lucide](https://lucide.dev) + custom SVG brand marks |
| Visuals    | 100% handcrafted SVG/CSS (no external images)         |

Everything is self-contained: illustrations, app mockups and the brand mark are
all SVG, so there are no broken images, no licensing concerns and the page stays
fast and crisp at any resolution.

## Getting started

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck + production build → dist/
npm run preview    # preview the production build
```

## Project structure

```
index.html                     SEO + Open Graph + JSON-LD (LocalBusiness)
public/
  favicon.svg                  Malt sprout mark
  og.svg                       Social share image (see "OG image" below)
src/
  index.css                    Design tokens (@theme), base styles, utilities
  App.tsx                      Page composition, skip link, reduced-motion config
  data/                        services, faqs, site config (nav, Tallinn areas)
  lib/
    analytics.ts               track() event dispatcher (integration point)
    motion.ts                  shared animation variants / easing
  components/
    ui/                        Button, Container, Section, Eyebrow, Reveal, Pill
    brand/                     Logo, brand glyphs (Apple, Play, socials)
    illustrations/             HomeScene, SeasonScene, PhoneFrame, ServiceArt
    sections/                  Navbar, Hero, Marquee, AppPreview, Services,
                               HowItWorks, Trust, Workers, Seasonal, Waitlist,
                               FAQ, Footer
```

## Design system (at a glance)

- **Palette** — warm bone canvas `#F5F4EE`, deep forest green `#0E5C3F`, fresh
  meadow accent `#46C98B`, green-charcoal ink `#0C1410`, rare honey/malt warmth.
  Tokens live in `src/index.css` under `@theme` (`--color-*`, `--text-*`, etc.).
- **Type** — Fraunces (optical serif) for display headlines, Inter for UI/app
  mockups. Loaded from Google Fonts in `index.html`.
- **Motion** — long ease-out entrances, scroll reveals, tasteful hover lifts.
  Respects `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">`
  and a CSS fallback.

---

## Integration notes (handoff)

### 1. Backend — early-access form

The form in `src/components/sections/Waitlist.tsx` is fully wired (validation,
loading / success / error states, accessibility) but submits to a **mock**.
Replace `submitWaitlist()` with a real call:

```ts
await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload), // { name, email, phone, role, area, services }
})
```

Good no-backend options: Formspree, Resend, Supabase, Airtable, or a serverless
function. _Tip: submit with an email ending in `@error.test` to preview the
error state during QA._

### 2. Analytics

All CTA clicks and form lifecycle events flow through `track()` in
`src/lib/analytics.ts` (events: `cta_join_early_access`, `cta_work_with_malt`,
`cta_apply_worker`, `service_card_click`, `seasonal_toggle`,
`app_preview_step_change`, `faq_toggle`, `waitlist_submit/success/error`).
Events are pushed to `window.dataLayer` (GTM-ready) and logged in dev. Swap the
body of `track()` for GA4 / Plausible / Segment / PostHog.

### 3. Legal pages

Terms & Privacy are placeholder `#` links (footer + form consent line). Add real
pages — either static routes (introduce `react-router`) or standalone HTML — and
update the hrefs. Search the codebase for `href="#"`.

### 4. App store links

The app is pre-launch, so the footer shows "Coming soon" App Store / Google Play
badges (`src/components/sections/Footer.tsx`) and the hero notes iOS & Android
are coming. When the apps ship, point the badges at the real store URLs and make
them real links.

### 5. Localization (et / en)

Copy is currently English with Tallinn/Estonian context. To add Estonian:

- Extract strings to `src/data/*` and a locale dictionary (or add `react-i18next`).
- Set `<html lang>` per locale; add `hreflang` alternates in `index.html`.
- Estonian is the primary market language — plan `et` as default, `en` secondary.
- Number/price formatting via `Intl.NumberFormat('et-EE', { currency: 'EUR' })`.

### 6. Visuals / assets

Illustrations are SVG components in `src/components/illustrations/`. If you later
prefer photography (Nordic homes, lawns, clean windows, workers), swap the
`HomeScene` / `ServiceArt` / `SeasonScene` usages for `<img>` with proper
`alt`, `width`/`height`, `loading="lazy"` and `srcset`. Keep the floating app
cards — they read as "the product already exists".

### 7. OG image

`public/og.svg` is the social share image referenced by the meta tags. Some
scrapers don't rasterize SVG — for best results export a **1200×630 PNG**
(`og.png`) and update the `og:image` / `twitter:image` URLs in `index.html`.

### 8. SEO

`index.html` includes title/description/canonical, Open Graph, Twitter Card and
LocalBusiness JSON-LD; the FAQ section injects FAQPage structured data. Update
the canonical/OG URLs from `https://malt.ee/` to the real domain, and add a
`sitemap.xml` + `robots.txt` to `public/` at launch.

## Accessibility

Semantic landmarks, a skip link, labelled form fields with inline + `aria-live`
errors, `aria-expanded` accordions, keyboard-operable controls, visible focus
rings, `prefers-reduced-motion` support, and AA-contrast color pairings.

## Performance

No external images or icon fonts; SVG everywhere; fonts use `display=swap` with
preconnect; motion is transform/opacity only. Consider self-hosting the fonts
and adding `sitemap.xml` / caching headers at deploy.
