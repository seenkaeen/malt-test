import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'

interface CounterProps {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  locale?: boolean
  className?: string
}

/** Counts up to `to` once it scrolls into view. Honors reduced-motion. */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  locale = false,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(from)

  const format = (v: number) => {
    const fixed = v.toFixed(decimals)
    const num = locale
      ? Number(fixed).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixed
    return `${prefix}${num}${suffix}`
  }

  useEffect(() => {
    if (!ref.current) return
    if (reduce || !inView) {
      if (reduce && ref.current) ref.current.textContent = format(to)
      return
    }
    const controls = animate(mv, to, { duration, ease: EASE })
    const unsub = mv.on('change', (v) => {
      if (ref.current) ref.current.textContent = format(v)
    })
    return () => {
      controls.stop()
      unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to])

  return (
    <span ref={ref} className={className}>
      {format(reduce ? to : from)}
    </span>
  )
}
