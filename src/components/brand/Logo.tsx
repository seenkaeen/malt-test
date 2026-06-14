export function MaltMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Malt">
      <defs>
        <linearGradient id="maltTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15784F" />
          <stop offset="1" stopColor="#0A3D2A" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#maltTile)" />
      <g fill="#F5F4EE">
        <path d="M16 19 C 12.5 19.5, 8.8 16.5, 8 11 C 13 11.2, 16 14.8, 16 19 Z" />
        <path
          d="M16 16 C 19.5 16.5, 23.2 13.5, 24 8 C 19 8.2, 16 11.8, 16 16 Z"
          opacity="0.92"
        />
      </g>
      <path
        d="M16 26 C 16 21, 16 17, 16 12"
        fill="none"
        stroke="#F5F4EE"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({
  variant = 'ink',
  className = '',
}: {
  variant?: 'ink' | 'cream'
  className?: string
}) {
  const text = variant === 'cream' ? 'text-cream' : 'text-ink'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MaltMark className="h-8 w-8" />
      <span
        className={`font-display text-[1.6rem] font-semibold leading-none tracking-tight ${text}`}
      >
        Malt
      </span>
    </span>
  )
}
