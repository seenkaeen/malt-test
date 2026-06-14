/**
 * Lightweight analytics dispatcher (placeholder).
 *
 * Every CTA click and form lifecycle event flows through `track()`.
 * Swap the body for your real provider when wiring a backend:
 *   - GA4:       window.gtag?.('event', event, props)
 *   - Plausible: window.plausible?.(event, { props })
 *   - Segment:   window.analytics?.track(event, props)
 *   - PostHog:   window.posthog?.capture(event, props)
 *
 * Until then events are pushed to window.dataLayer (GTM-ready) and
 * logged in development so the instrumentation is visible end-to-end.
 */

export type AnalyticsEvent =
  | 'cta_join_early_access'
  | 'cta_work_with_malt'
  | 'cta_apply_worker'
  | 'nav_cta_click'
  | 'service_card_click'
  | 'seasonal_toggle'
  | 'app_preview_step_change'
  | 'faq_toggle'
  | 'waitlist_submit'
  | 'waitlist_success'
  | 'waitlist_error'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(
  event: AnalyticsEvent | string,
  props: Record<string, unknown> = {},
): void {
  const payload = { event, ...props, ts: Date.now() }

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(payload)
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('%c[analytics]', 'color:#0E5C3F;font-weight:600', payload)
  }
}
