import type { ReactNode } from 'react'

export function Pill({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode
  tone?: 'default' | 'forest' | 'meadow' | 'honey' | 'frost'
  className?: string
}) {
  const tones: Record<string, string> = {
    default: 'border-line bg-cream text-muted',
    forest: 'border-forest/15 bg-meadow-50 text-forest',
    meadow: 'border-meadow/30 bg-meadow-100 text-forest',
    honey: 'border-honey/30 bg-honey-100 text-[#9a6a1f]',
    frost: 'border-white/15 bg-white/10 text-cream backdrop-blur-sm',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
