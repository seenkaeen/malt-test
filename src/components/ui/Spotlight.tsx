/**
 * Glow layer for a cursor-tracked spotlight card. Drop it in as the FIRST
 * child of a `group/spot` host (so following, positioned content paints over
 * it) and feed the host an `onMouseMove` from `useSpotlight`.
 */
export function Spotlight({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`spot-glow ${className}`} />
}
