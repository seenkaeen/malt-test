import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Gives its child a subtle magnetic pull toward the cursor — a restrained,
 * premium hover affordance reserved for primary CTAs. Honors reduced-motion
 * (renders an inert wrapper) and never swallows clicks.
 */
export function Magnetic({
  children,
  strength = 0.24,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  if (reduce) {
    return <span className={`inline-flex ${className}`}>{children}</span>
  }

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  )
}
