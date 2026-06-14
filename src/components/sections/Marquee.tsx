import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from 'framer-motion'
import { Sprout } from 'lucide-react'

const items = [
  'Lawn mowing',
  'Window washing',
  'Hedge trimming',
  'Snow removal',
  'Pressure washing',
  'Now serving Tallinn',
]

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={it} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-sm font-medium tracking-tight text-ink/65">
            {it}
          </span>
          <Sprout className="h-3.5 w-3.5 shrink-0 text-meadow" aria-hidden />
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  })
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [-5, 5], {
    clamp: true,
  })

  // Four copies → one copy == 25% of the track; wrap over that for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * 1.6 * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-cream py-3.5"
      aria-hidden="true"
    >
      {reduce ? (
        <div className="flex justify-center opacity-80">
          <Row />
        </div>
      ) : (
        <motion.div style={{ x, skewX }} className="flex w-max will-change-transform">
          <Row />
          <Row />
          <Row />
          <Row />
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent sm:w-32" />
    </div>
  )
}
