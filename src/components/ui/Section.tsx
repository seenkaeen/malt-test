import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  labelledBy?: string
  className?: string
  children: ReactNode
}

export function Section({
  id,
  labelledBy,
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-24 py-20 sm:py-24 lg:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
