import type { ReactNode } from 'react'
import { Signal, Wifi, BatteryFull } from 'lucide-react'

/** iOS-style status bar for the in-frame app screens. */
export function PhoneStatusBar({
  tone = 'ink',
}: {
  tone?: 'ink' | 'cream'
}) {
  const color = tone === 'cream' ? 'text-cream' : 'text-ink'
  return (
    <div
      className={`flex items-center justify-between px-6 pt-3.5 pb-1 text-[13px] font-semibold ${color}`}
    >
      <span className="tnum">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" aria-hidden />
        <Wifi className="h-3.5 w-3.5" aria-hidden />
        <BatteryFull className="h-4 w-4" aria-hidden />
      </div>
    </div>
  )
}

export function PhoneFrame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[270px] rounded-[2.9rem] bg-gradient-to-b from-ink-700 to-ink p-[10px] shadow-float ring-1 ring-black/25 sm:w-[290px]">
        {/* side buttons */}
        <span className="absolute -left-[2px] top-[116px] h-8 w-[3px] rounded-l bg-ink-600" />
        <span className="absolute -left-[2px] top-[158px] h-14 w-[3px] rounded-l bg-ink-600" />
        <span className="absolute -left-[2px] top-[224px] h-14 w-[3px] rounded-l bg-ink-600" />
        <span className="absolute -right-[2px] top-[176px] h-20 w-[3px] rounded-r bg-ink-600" />

        <div className="relative overflow-hidden rounded-[2.3rem] bg-canvas">
          {/* dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-[11px] z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-ink" />
          {/* screen glare */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-60"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 32%)',
            }}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
