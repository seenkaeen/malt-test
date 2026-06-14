import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin reading-progress bar pinned to the top — reacts both ways. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-forest via-meadow to-forest"
    />
  )
}
