import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE, viewportOnce } from '../../lib/motion'

export function Reveal({
  children,
  delay = 0,
  y = 26,
  blur = true,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  blur?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
