import type { ReactNode } from 'react'

export function Eyebrow({
  children,
  tone = 'forest',
  className = '',
}: {
  children: ReactNode
  tone?: 'forest' | 'light'
  className?: string
}) {
  const text = tone === 'light' ? 'text-meadow-300' : 'text-forest'
  const dot = tone === 'light' ? 'bg-meadow' : 'bg-forest'
  return (
    <span className={`eyebrow ${text} ${className}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  )
}
