import { useRef } from 'react'
import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Scroll-linked parallax. Attach `ref` to a STABLE wrapper (no transform)
 * and apply the returned `y` to an inner element, so the measurement and the
 * movement live on different nodes (avoids feedback jitter).
 *
 * Because the value is tied to scroll progress, it animates continuously in
 * BOTH directions — scrolling up reverses it. Honors reduced-motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 60,
) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  )
  return { ref, y }
}
